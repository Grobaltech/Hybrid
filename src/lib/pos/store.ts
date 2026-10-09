import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { freshData } from "./seed";
import { roundMoney, todayKey, uid } from "./money";
import type {
  Creditor,
  Expense,
  Product,
  PurchaseItem,
  Result,
  Role,
  SaleItem,
  SaleResult,
  Settings,
  ShopData,
  Supplier,
  User,
} from "./types";

type Persisted = ShopData & { sessionUserId: string | null };

export type SaleDraft = {
  items: { productId: string; qty: number; actualPrice: number }[];
  customerName: string;
  payment: "cash" | "credit";
  taxRate: number;
  notes: string;
};

export type PurchaseDraft = {
  supplierId: string;
  reference: string;
  status: "ordered" | "received";
  items: { productId: string; packs: number; packSize: number; loose: number; unitCost: number }[];
};

type Actions = {
  _hydrated: boolean;
  setHydrated: (value: boolean) => void;
  loginWithHash: (username: string, passwordHash: string) => Result;
  logout: () => void;
  completeSale: (draft: SaleDraft) => SaleResult;
  upsertProduct: (product: Omit<Product, "createdAt"> & { createdAt?: string }) => Result;
  deleteProduct: (id: string) => Result;
  createPurchase: (draft: PurchaseDraft) => Result;
  receivePurchase: (id: string) => Result;
  payCredit: (creditId: string, amount: number, note: string) => Result;
  addExpense: (expense: Omit<Expense, "id" | "createdAt">) => Result;
  deleteExpense: (id: string) => Result;
  upsertSupplier: (supplier: Omit<Supplier, "createdAt" | "id"> & { id?: string }) => Result;
  deleteSupplier: (id: string) => Result;
  addCreditor: (input: {
    name: string;
    phone: string;
    description: string;
    totalCredit: number;
    amountPaid: number;
  }) => Result;
  payCreditor: (id: string, amount: number, note: string) => Result;
  addUser: (input: {
    username: string;
    passwordHash: string;
    role: Role;
    phone: string;
    email: string;
  }) => Result;
  updateUser: (id: string, patch: Partial<Pick<User, "role" | "phone" | "email" | "about">>) => Result;
  setPasswordHash: (id: string, passwordHash: string) => Result;
  deleteUser: (id: string) => Result;
  updateSettings: (patch: Partial<Settings>) => void;
  importBackup: (raw: unknown) => Result;
  resetBooks: () => void;
};

export type ShopState = Persisted & Actions;

function pushAudit(
  audit: ShopData["audit"],
  username: string,
  action: string,
  message: string,
  page: string,
) {
  return [
    { id: uid("aud"), at: new Date().toISOString(), username, action, message, page },
    ...audit,
  ].slice(0, 200);
}

function actor(state: Persisted): User | undefined {
  return state.users.find((user) => user.id === state.sessionUserId);
}

function nextReceipt(sales: ShopData["sales"]): string {
  const day = todayKey().replaceAll("-", "");
  const seq = sales.reduce((max, sale) => {
    const match = /-(\d+)$/.exec(sale.receiptNo);
    return Math.max(max, match ? Number(match[1]) : 0);
  }, 0);
  return `RCPT-${day}-${String(seq + 1).padStart(6, "0")}`;
}

function backupShape(raw: unknown): Persisted | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Partial<Persisted> & { data?: Persisted };
  const body = data.users ? (data as Persisted) : data.data;
  if (!body?.users || !body.products || !body.settings) return null;
  return body;
}

const empty = freshData();

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      ...empty,
      sessionUserId: null,
      _hydrated: false,
      setHydrated: (value) => set({ _hydrated: value }),

      loginWithHash: (username, passwordHash) => {
        const user = get().users.find(
          (row) => row.username.toLowerCase() === username.trim().toLowerCase(),
        );
        if (!user || user.passwordHash !== passwordHash) {
          return { ok: false, error: "Username or password doesn't match a staff account on this device." };
        }
        set((state) => ({
          sessionUserId: user.id,
          audit: pushAudit(state.audit, user.username, "login", "Signed in", "account"),
        }));
        return { ok: true };
      },

      logout: () => {
        const user = actor(get());
        set((state) => ({
          sessionUserId: null,
          audit: user
            ? pushAudit(state.audit, user.username, "logout", "Signed out", "account")
            : state.audit,
        }));
      },

      completeSale: (draft) => {
        const state = get();
        const user = actor(state);
        if (!user) return { ok: false, error: "Sign in first." };
        if (!draft.items.length) return { ok: false, error: "Add at least one item." };
        const customerName = draft.customerName.trim() || "Walk-in";
        if (draft.payment === "credit" && customerName === "Walk-in") {
          return { ok: false, error: "Add the customer's name for a credit sale." };
        }
        const products = state.products.map((product) => ({ ...product }));
        const items: SaleItem[] = [];
        for (const line of draft.items) {
          const product = products.find((row) => row.id === line.productId);
          if (!product) return { ok: false, error: "A product in the cart is no longer on the shelf." };
          const qty = Math.max(1, Math.round(line.qty));
          if (qty > product.stock) {
            return { ok: false, error: `${product.name} only has ${product.stock} in stock.` };
          }
          const actual = roundMoney(line.actualPrice);
          if (actual < 0) return { ok: false, error: "Price can't be negative." };
          product.stock -= qty;
          const lineTotal = roundMoney(actual * qty);
          const lineCost = roundMoney(product.priceCost * qty);
          items.push({
            id: uid("si"),
            productId: product.id,
            sku: product.sku,
            name: product.name,
            quantity: qty,
            priceSell: product.priceSell,
            actualPrice: actual,
            priceCost: product.priceCost,
            lineTotal,
            lineCost,
            lineProfit: roundMoney(lineTotal - lineCost),
          });
        }
        const subtotal = roundMoney(items.reduce((total, item) => total + item.lineTotal, 0));
        const totalCost = roundMoney(items.reduce((total, item) => total + item.lineCost, 0));
        const taxRate = Math.max(0, draft.taxRate);
        const taxAmount = roundMoney(subtotal * (taxRate / 100));
        const grandTotal = roundMoney(subtotal + taxAmount);
        const sale = {
          id: uid("sale"),
          receiptNo: nextReceipt(state.sales),
          customerName,
          items,
          subtotal,
          totalCost,
          profit: roundMoney(subtotal - totalCost),
          taxRate,
          taxAmount,
          grandTotal,
          paymentMethod: draft.payment,
          notes: draft.notes.trim(),
          createdAt: new Date().toISOString(),
          username: user.username,
        };
        const credit =
          draft.payment === "credit"
            ? {
                id: uid("cr"),
                saleId: sale.id,
                receiptNo: sale.receiptNo,
                customerName,
                amount: grandTotal,
                balance: grandTotal,
                status: "open" as const,
                createdAt: sale.createdAt,
                payments: [],
              }
            : null;
        set({
          products,
          sales: [sale, ...state.sales],
          credits: credit ? [credit, ...state.credits] : state.credits,
          audit: pushAudit(
            state.audit,
            user.username,
            "sale.create",
            `${sale.receiptNo} · ${customerName}`,
            "sales",
          ),
        });
        return { ok: true, saleId: sale.id };
      },

      upsertProduct: (product) => {
        const state = get();
        const user = actor(state);
        const sku = product.sku.trim().toUpperCase();
        const name = product.name.trim();
        if (!sku || !name) return { ok: false, error: "SKU and name are required." };
        if (state.products.some((row) => row.sku.toLowerCase() === sku.toLowerCase() && row.id !== product.id)) {
          return { ok: false, error: "That SKU is already on the shelf." };
        }
        const next: Product = {
          id: product.id || uid("p"),
          sku,
          name,
          category: product.category.trim() || "General",
          priceCost: roundMoney(product.priceCost),
          priceSell: roundMoney(product.priceSell),
          stock: Math.max(0, Math.round(product.stock)),
          barcode: product.barcode.trim(),
          createdAt: product.createdAt ?? new Date().toISOString(),
        };
        const exists = state.products.some((row) => row.id === next.id);
        set({
          products: exists
            ? state.products.map((row) => (row.id === next.id ? next : row))
            : [next, ...state.products],
          audit: pushAudit(
            state.audit,
            user?.username ?? "staff",
            exists ? "product.update" : "product.create",
            `${next.sku} ${next.name}`,
            "products",
          ),
        });
        return { ok: true };
      },

      deleteProduct: (id) => {
        const state = get();
        const product = state.products.find((row) => row.id === id);
        if (!product) return { ok: false, error: "Product not found." };
        set({
          products: state.products.filter((row) => row.id !== id),
          audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "product.delete", product.sku, "products"),
        });
        return { ok: true };
      },

      createPurchase: (draft) => {
        const state = get();
        const user = actor(state);
        if (!draft.items.length) return { ok: false, error: "Add at least one line." };
        const supplier = state.suppliers.find((row) => row.id === draft.supplierId);
        const products = state.products.map((product) => ({ ...product }));
        const items: PurchaseItem[] = [];
        for (const line of draft.items) {
          const product = products.find((row) => row.id === line.productId);
          if (!product) return { ok: false, error: "Pick a product on every line." };
          const packs = Math.max(0, Math.round(line.packs));
          const packSize = Math.max(1, Math.round(line.packSize));
          const loose = Math.max(0, Math.round(line.loose));
          const quantity = packs * packSize + loose;
          if (quantity <= 0) return { ok: false, error: `${product.name} needs a quantity.` };
          const unitCost = roundMoney(line.unitCost);
          if (draft.status === "received") {
            product.stock += quantity;
            if (unitCost > 0) product.priceCost = unitCost;
          }
          items.push({
            id: uid("pi"),
            productId: product.id,
            sku: product.sku,
            name: product.name,
            packs,
            packSize,
            loose,
            quantity,
            unitCost,
            lineCost: roundMoney(unitCost * quantity),
          });
        }
        const now = new Date().toISOString();
        const purchase = {
          id: uid("pur"),
          supplierId: supplier?.id ?? "",
          supplierName: supplier?.name ?? "No supplier",
          reference: draft.reference.trim(),
          total: roundMoney(items.reduce((total, item) => total + item.lineCost, 0)),
          status: draft.status,
          createdAt: now,
          receivedAt: draft.status === "received" ? now : null,
          items,
        };
        set({
          products,
          purchases: [purchase, ...state.purchases],
          audit: pushAudit(
            state.audit,
            user?.username ?? "staff",
            "purchase.create",
            `${purchase.reference || purchase.id} · ${purchase.status}`,
            "purchases",
          ),
        });
        return { ok: true };
      },

      receivePurchase: (id) => {
        const state = get();
        const purchase = state.purchases.find((row) => row.id === id);
        if (!purchase) return { ok: false, error: "Purchase not found." };
        if (purchase.status === "received") return { ok: false, error: "Already received." };
        const products = state.products.map((product) => ({ ...product }));
        for (const item of purchase.items) {
          const product = products.find((row) => row.id === item.productId);
          if (!product) continue;
          product.stock += item.quantity;
          if (item.unitCost > 0) product.priceCost = item.unitCost;
        }
        const now = new Date().toISOString();
        set({
          products,
          purchases: state.purchases.map((row) =>
            row.id === id ? { ...row, status: "received", receivedAt: now } : row,
          ),
          audit: pushAudit(
            state.audit,
            actor(state)?.username ?? "staff",
            "purchase.receive",
            purchase.reference || purchase.id,
            "purchases",
          ),
        });
        return { ok: true };
      },

      payCredit: (creditId, amount, note) => {
        const state = get();
        const credit = state.credits.find((row) => row.id === creditId);
        if (!credit) return { ok: false, error: "Credit not found." };
        const pay = roundMoney(amount);
        if (pay <= 0) return { ok: false, error: "Enter an amount greater than zero." };
        if (pay > credit.balance) return { ok: false, error: "That's more than the open balance." };
        const balance = roundMoney(credit.balance - pay);
        set({
          credits: state.credits.map((row) =>
            row.id === creditId
              ? {
                  ...row,
                  balance,
                  status: balance <= 0 ? "closed" : "open",
                  payments: [
                    { id: uid("cp"), amount: pay, paidAt: new Date().toISOString(), note: note.trim() },
                    ...row.payments,
                  ],
                }
              : row,
          ),
          audit: pushAudit(
            state.audit,
            actor(state)?.username ?? "staff",
            "credit.pay",
            `${credit.receiptNo} · ${pay}`,
            "credits",
          ),
        });
        return { ok: true };
      },

      addExpense: (expense) => {
        if (!expense.category.trim()) return { ok: false, error: "Category is required." };
        if (expense.amount <= 0) return { ok: false, error: "Amount must be greater than zero." };
        const state = get();
        const row: Expense = {
          id: uid("ex"),
          date: expense.date || todayKey(),
          category: expense.category.trim(),
          amount: roundMoney(expense.amount),
          note: expense.note.trim(),
          createdAt: new Date().toISOString(),
        };
        set({
          expenses: [row, ...state.expenses],
          audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "expense.create", row.category, "expenses"),
        });
        return { ok: true };
      },

      deleteExpense: (id) => {
        const state = get();
        set({
          expenses: state.expenses.filter((row) => row.id !== id),
          audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "expense.delete", id, "expenses"),
        });
        return { ok: true };
      },

      upsertSupplier: (supplier) => {
        const name = supplier.name.trim();
        if (!name) return { ok: false, error: "Supplier name is required." };
        const state = get();
        const id = supplier.id || uid("sup");
        const next: Supplier = {
          id,
          name,
          phone: supplier.phone.trim(),
          email: supplier.email.trim(),
          createdAt: state.suppliers.find((row) => row.id === id)?.createdAt ?? new Date().toISOString(),
        };
        const exists = state.suppliers.some((row) => row.id === id);
        set({
          suppliers: exists
            ? state.suppliers.map((row) => (row.id === id ? next : row))
            : [next, ...state.suppliers],
        });
        return { ok: true };
      },

      deleteSupplier: (id) => {
        set((state) => ({ suppliers: state.suppliers.filter((row) => row.id !== id) }));
        return { ok: true };
      },

      addCreditor: (input) => {
        const name = input.name.trim();
        if (!name) return { ok: false, error: "Name is required." };
        const total = roundMoney(Math.max(0, input.totalCredit));
        const paid = roundMoney(Math.min(total, Math.max(0, input.amountPaid)));
        const state = get();
        const row: Creditor = {
          id: uid("cred"),
          name,
          phone: input.phone.trim(),
          description: input.description.trim(),
          totalCredit: total,
          amountPaid: paid,
          balance: roundMoney(total - paid),
          createdAt: new Date().toISOString(),
          payments:
            paid > 0
              ? [{ id: uid("crp"), amount: paid, paidAt: new Date().toISOString(), note: "Opening payment" }]
              : [],
        };
        set({ creditors: [row, ...state.creditors] });
        return { ok: true };
      },

      payCreditor: (id, amount, note) => {
        const state = get();
        const creditor = state.creditors.find((row) => row.id === id);
        if (!creditor) return { ok: false, error: "Creditor not found." };
        const pay = roundMoney(amount);
        if (pay <= 0) return { ok: false, error: "Enter an amount greater than zero." };
        if (pay > creditor.balance) return { ok: false, error: "That's more than the balance." };
        set({
          creditors: state.creditors.map((row) =>
            row.id === id
              ? {
                  ...row,
                  amountPaid: roundMoney(row.amountPaid + pay),
                  balance: roundMoney(row.balance - pay),
                  payments: [
                    { id: uid("crp"), amount: pay, paidAt: new Date().toISOString(), note: note.trim() },
                    ...row.payments,
                  ],
                }
              : row,
          ),
        });
        return { ok: true };
      },

      addUser: (input) => {
        const username = input.username.trim();
        if (username.length < 2) return { ok: false, error: "Username is too short." };
        const state = get();
        if (state.users.some((row) => row.username.toLowerCase() === username.toLowerCase())) {
          return { ok: false, error: "That username is already used." };
        }
        const row: User = {
          id: uid("u"),
          username,
          passwordHash: input.passwordHash,
          role: input.role,
          phone: input.phone.trim(),
          email: input.email.trim(),
          about: "",
          createdAt: new Date().toISOString(),
        };
        set({
          users: [...state.users, row],
          audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "user.create", username, "users"),
        });
        return { ok: true };
      },

      updateUser: (id, patch) => {
        set((state) => ({
          users: state.users.map((row) => (row.id === id ? { ...row, ...patch } : row)),
        }));
        return { ok: true };
      },

      setPasswordHash: (id, passwordHash) => {
        set((state) => ({
          users: state.users.map((row) => (row.id === id ? { ...row, passwordHash } : row)),
        }));
        return { ok: true };
      },

      deleteUser: (id) => {
        const state = get();
        if (id === state.sessionUserId) return { ok: false, error: "You can't remove the account you're using." };
        const user = state.users.find((row) => row.id === id);
        if (!user) return { ok: false, error: "User not found." };
        const admins = state.users.filter((row) => row.role === "admin");
        if (user.role === "admin" && admins.length <= 1) {
          return { ok: false, error: "Keep at least one admin." };
        }
        set({ users: state.users.filter((row) => row.id !== id) });
        return { ok: true };
      },

      updateSettings: (patch) => {
        set((state) => ({ settings: { ...state.settings, ...patch } }));
      },

      importBackup: (raw) => {
        const body = backupShape(raw);
        if (!body) return { ok: false, error: "That file isn't a Hybrid counter backup." };
        set({
          ...freshData(),
          ...body,
          settings: { ...freshData().settings, ...body.settings },
          sessionUserId: null,
          _hydrated: true,
        });
        return { ok: true };
      },

      resetBooks: () => {
        const sessionUserId = get().sessionUserId;
        const next = freshData();
        const stillThere = next.users.some((user) => user.id === sessionUserId);
        set({ ...next, sessionUserId: stillThere ? sessionUserId : null, _hydrated: true });
      },
    }),
    {
      name: "hybrid-phone-pos-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        users: state.users,
        products: state.products,
        suppliers: state.suppliers,
        sales: state.sales,
        credits: state.credits,
        expenses: state.expenses,
        purchases: state.purchases,
        creditors: state.creditors,
        audit: state.audit,
        settings: state.settings,
        sessionUserId: state.sessionUserId,
      }),
    },
  ),
);
