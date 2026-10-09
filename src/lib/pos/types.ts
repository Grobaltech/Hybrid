export type Role = "admin" | "manager" | "cashier";

export type ThemeName = "light" | "dark";

export type User = {
  id: string;
  username: string;
  passwordHash: string;
  role: Role;
  phone: string;
  email: string;
  about: string;
  createdAt: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  priceCost: number;
  priceSell: number;
  stock: number;
  barcode: string;
  createdAt: string;
};

export type Supplier = {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
};

export type SaleItem = {
  id: string;
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  priceSell: number;
  actualPrice: number;
  priceCost: number;
  lineTotal: number;
  lineCost: number;
  lineProfit: number;
};

export type Sale = {
  id: string;
  receiptNo: string;
  customerName: string;
  items: SaleItem[];
  subtotal: number;
  totalCost: number;
  profit: number;
  taxRate: number;
  taxAmount: number;
  grandTotal: number;
  paymentMethod: "cash" | "credit";
  notes: string;
  createdAt: string;
  username: string;
};

export type CreditPayment = {
  id: string;
  amount: number;
  paidAt: string;
  note: string;
};

export type Credit = {
  id: string;
  saleId: string;
  receiptNo: string;
  customerName: string;
  amount: number;
  balance: number;
  status: "open" | "closed";
  createdAt: string;
  payments: CreditPayment[];
};

export type Expense = {
  id: string;
  date: string;
  category: string;
  amount: number;
  note: string;
  createdAt: string;
};

export type PurchaseItem = {
  id: string;
  productId: string;
  sku: string;
  name: string;
  packs: number;
  packSize: number;
  loose: number;
  quantity: number;
  unitCost: number;
  lineCost: number;
};

export type Purchase = {
  id: string;
  supplierId: string;
  supplierName: string;
  reference: string;
  total: number;
  status: "ordered" | "received";
  createdAt: string;
  receivedAt: string | null;
  items: PurchaseItem[];
};

export type CreditorPayment = {
  id: string;
  amount: number;
  paidAt: string;
  note: string;
};

export type Creditor = {
  id: string;
  name: string;
  phone: string;
  description: string;
  totalCredit: number;
  amountPaid: number;
  balance: number;
  createdAt: string;
  payments: CreditorPayment[];
};

export type Audit = {
  id: string;
  at: string;
  username: string;
  action: string;
  message: string;
  page: string;
};

export type Settings = {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  currency: string;
  taxRate: number;
  lowStock: number;
  theme: ThemeName;
};

export type ShopData = {
  users: User[];
  products: Product[];
  suppliers: Supplier[];
  sales: Sale[];
  credits: Credit[];
  expenses: Expense[];
  purchases: Purchase[];
  creditors: Creditor[];
  audit: Audit[];
  settings: Settings;
};

export type Result = { ok: true } | { ok: false; error: string };
export type SaleResult = { ok: true; saleId: string } | { ok: false; error: string };
