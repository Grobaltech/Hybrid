import type { Product, Sale, SaleItem, ShopData } from "./types";

const HASH = {
  hybrid: "3155726a3658d32f571c51bf5137e0a0fb7aa5e584435897a999dac193398842",
  till: "dd8e3a547e53075fe4613d843b4c28b05da71f0bb061f8dbcc7e88887ead042b",
  floor: "e7541d30287bf053109cc9f06774c6fb55b632a0b1eea01579c7d24e55c5d0f2",
};

function line(
  id: string,
  product: Product,
  quantity: number,
  actualPrice: number,
): SaleItem {
  const lineTotal = actualPrice * quantity;
  const lineCost = product.priceCost * quantity;
  return {
    id,
    productId: product.id,
    sku: product.sku,
    name: product.name,
    quantity,
    priceSell: product.priceSell,
    actualPrice,
    priceCost: product.priceCost,
    lineTotal,
    lineCost,
    lineProfit: lineTotal - lineCost,
  };
}

function sale(
  partial: Omit<Sale, "subtotal" | "totalCost" | "profit" | "taxAmount" | "grandTotal" | "taxRate"> & {
    taxRate?: number;
  },
): Sale {
  const subtotal = partial.items.reduce((sum, item) => sum + item.lineTotal, 0);
  const totalCost = partial.items.reduce((sum, item) => sum + item.lineCost, 0);
  const profit = subtotal - totalCost;
  const taxRate = partial.taxRate ?? 0;
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  return {
    ...partial,
    taxRate,
    subtotal,
    totalCost,
    profit,
    taxAmount,
    grandTotal: subtotal + taxAmount,
  };
}

const a05: Product = {
  id: "p1",
  sku: "SMA05",
  name: "Samsung Galaxy A05",
  category: "Screens",
  priceCost: 45000,
  priceSell: 60000,
  stock: 29,
  barcode: "",
  createdAt: "2025-10-15T17:16:41",
};

const a06: Product = {
  id: "p2",
  sku: "SMA06",
  name: "Samsung Galaxy A06",
  category: "Screens",
  priceCost: 45000,
  priceSell: 60000,
  stock: 17,
  barcode: "",
  createdAt: "2025-10-15T17:17:42",
};

const SEED: ShopData = {
  users: [
    {
      id: "u1",
      username: "Grobaltech",
      passwordHash: HASH.hybrid,
      role: "admin",
      phone: "+256707836076",
      email: "hybriphoneservicecenter@gmail.com",
      about: "Shop owner",
      createdAt: "2025-10-16T08:12:08",
    },
    {
      id: "u2",
      username: "amina",
      passwordHash: HASH.till,
      role: "cashier",
      phone: "",
      email: "",
      about: "Counter",
      createdAt: "2025-10-16T09:00:00",
    },
    {
      id: "u3",
      username: "moses",
      passwordHash: HASH.floor,
      role: "manager",
      phone: "",
      email: "",
      about: "Floor manager",
      createdAt: "2025-10-16T09:05:00",
    },
  ],
  products: [a05, a06],
  suppliers: [
    {
      id: "sup1",
      name: "Grobaltech",
      phone: "+256707836076",
      email: "babwicos@gmail.com",
      createdAt: "2025-10-22T22:13:44",
    },
  ],
  sales: [
    sale({
      id: "sale5",
      receiptNo: "RCPT-20251015-000005",
      customerName: "Walk-in",
      items: [line("si1", a05, 1, 60000)],
      paymentMethod: "cash",
      notes: "",
      createdAt: "2025-10-15T17:39:23",
      username: "Grobaltech",
    }),
    sale({
      id: "sale6",
      receiptNo: "RCPT-20251015-000006",
      customerName: "Walk-in",
      items: [line("si2", a05, 1, 60000), line("si3", a06, 11, 60000)],
      paymentMethod: "cash",
      notes: "",
      createdAt: "2025-10-15T17:40:18",
      username: "Grobaltech",
    }),
    sale({
      id: "sale7",
      receiptNo: "RCPT-20251015-000007",
      customerName: "Walk-in",
      items: [line("si4", a05, 3, 60000), line("si5", a06, 1, 60000)],
      paymentMethod: "cash",
      notes: "",
      createdAt: "2025-10-15T17:43:15",
      username: "Grobaltech",
    }),
    sale({
      id: "sale9",
      receiptNo: "RCPT-20251017-000009",
      customerName: "Walk-in",
      items: [line("si7", a05, 1, 60000), line("si8", a06, 2, 85000)],
      paymentMethod: "cash",
      notes: "",
      createdAt: "2025-10-17T14:25:24",
      username: "Grobaltech",
    }),
    sale({
      id: "sale10",
      receiptNo: "RCPT-20251017-000010",
      customerName: "Walk-in",
      items: [line("si9", a06, 1, 60000)],
      paymentMethod: "credit",
      notes: "",
      createdAt: "2025-10-17T14:28:18",
      username: "Grobaltech",
    }),
    sale({
      id: "sale11",
      receiptNo: "RCPT-20251017-000011",
      customerName: "Walk-in",
      items: [line("si10", a06, 1, 60000)],
      paymentMethod: "credit",
      notes: "",
      createdAt: "2025-10-17T19:09:23",
      username: "Grobaltech",
    }),
    sale({
      id: "sale12",
      receiptNo: "RCPT-20251017-000012",
      customerName: "Walk-in",
      items: [line("si11", a06, 1, 60000)],
      paymentMethod: "credit",
      notes: "",
      createdAt: "2025-10-17T19:17:20",
      username: "Grobaltech",
    }),
    sale({
      id: "sale13",
      receiptNo: "RCPT-20251022-000013",
      customerName: "Walk-in",
      items: [line("si12", a06, 1, 60000)],
      paymentMethod: "cash",
      notes: "",
      createdAt: "2025-10-22T20:26:34",
      username: "Grobaltech",
    }),
    sale({
      id: "sale14",
      receiptNo: "RCPT-20251022-000014",
      customerName: "Walk-in",
      items: [line("si13", a05, 1, 60000)],
      paymentMethod: "credit",
      notes: "",
      createdAt: "2025-10-22T20:27:17",
      username: "Grobaltech",
    }),
  ],
  credits: [
    {
      id: "cr1",
      saleId: "sale10",
      receiptNo: "RCPT-20251017-000010",
      customerName: "Walk-in",
      amount: 60000,
      balance: 0,
      status: "closed",
      createdAt: "2025-10-17T14:28:18",
      payments: [
        { id: "cp1", amount: 25000, paidAt: "2025-10-17T14:28:58", note: "" },
        { id: "cp2", amount: 35000, paidAt: "2025-10-17T14:31:20", note: "Cleared" },
      ],
    },
    {
      id: "cr2",
      saleId: "sale11",
      receiptNo: "RCPT-20251017-000011",
      customerName: "Walk-in",
      amount: 60000,
      balance: 60000,
      status: "open",
      createdAt: "2025-10-17T19:09:23",
      payments: [],
    },
    {
      id: "cr3",
      saleId: "sale12",
      receiptNo: "RCPT-20251017-000012",
      customerName: "Walk-in",
      amount: 60000,
      balance: 60000,
      status: "open",
      createdAt: "2025-10-17T19:17:21",
      payments: [],
    },
    {
      id: "cr4",
      saleId: "sale14",
      receiptNo: "RCPT-20251022-000014",
      customerName: "Walk-in",
      amount: 60000,
      balance: 60000,
      status: "open",
      createdAt: "2025-10-22T20:27:17",
      payments: [],
    },
  ],
  expenses: [
    {
      id: "ex1",
      date: "2025-10-17",
      category: "Lunch",
      amount: 45000,
      note: "All bills",
      createdAt: "2025-10-17T14:33:24",
    },
  ],
  purchases: [
    {
      id: "pur1",
      supplierId: "sup1",
      supplierName: "Grobaltech",
      reference: "Gtc90487",
      total: 420000,
      status: "ordered",
      createdAt: "2025-10-22T22:40:32",
      receivedAt: null,
      items: [
        {
          id: "pi1",
          productId: "p2",
          sku: "SMA06",
          name: "Samsung Galaxy A06",
          packs: 1,
          packSize: 12,
          loose: 2,
          quantity: 14,
          unitCost: 30000,
          lineCost: 420000,
        },
      ],
    },
    {
      id: "pur2",
      supplierId: "sup1",
      supplierName: "Grobaltech",
      reference: "Gtc90487",
      total: 420000,
      status: "ordered",
      createdAt: "2025-10-22T22:53:07",
      receivedAt: null,
      items: [
        {
          id: "pi2",
          productId: "p2",
          sku: "SMA06",
          name: "Samsung Galaxy A06",
          packs: 1,
          packSize: 12,
          loose: 2,
          quantity: 14,
          unitCost: 30000,
          lineCost: 420000,
        },
      ],
    },
  ],
  creditors: [
    {
      id: "cred1",
      name: "Jjuko",
      phone: "",
      description: "Daily customer",
      totalCredit: 60000,
      amountPaid: 60000,
      balance: 0,
      createdAt: "2025-10-17T17:27:44",
      payments: [{ id: "crp1", amount: 60000, paidAt: "2025-10-17T17:30:00", note: "Screen" }],
    },
  ],
  audit: [
    {
      id: "aud1",
      at: "2025-10-22T23:12:00",
      username: "Grobaltech",
      action: "import",
      message: "Counter books carried over from the shop",
      page: "settings",
    },
  ],
  settings: {
    companyName: "Hybrid Phone S/C",
    companyAddress: "New pioneer Mall shop NO PC 90",
    companyPhone: "0754475028",
    companyEmail: "hybriphoneservicecenter@gmail.com",
    currency: "UGX",
    taxRate: 0,
    lowStock: 5,
    theme: "light",
  },
};

export function freshData(): ShopData {
  return structuredClone(SEED);
}

export const STAFF_HINTS = [
  { username: "Grobaltech", password: "hybrid", role: "Admin" },
  { username: "moses", password: "floor", role: "Manager" },
  { username: "amina", password: "till", role: "Cashier" },
] as const;
