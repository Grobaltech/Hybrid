import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-B3DByBpp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var HASH = {
	hybrid: "3155726a3658d32f571c51bf5137e0a0fb7aa5e584435897a999dac193398842",
	till: "dd8e3a547e53075fe4613d843b4c28b05da71f0bb061f8dbcc7e88887ead042b",
	floor: "e7541d30287bf053109cc9f06774c6fb55b632a0b1eea01579c7d24e55c5d0f2"
};
function line(id, product, quantity, actualPrice) {
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
		lineProfit: lineTotal - lineCost
	};
}
function sale(partial) {
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
		grandTotal: subtotal + taxAmount
	};
}
var a05 = {
	id: "p1",
	sku: "SMA05",
	name: "Samsung Galaxy A05",
	category: "Screens",
	priceCost: 45e3,
	priceSell: 6e4,
	stock: 29,
	barcode: "",
	createdAt: "2025-10-15T17:16:41"
};
var a06 = {
	id: "p2",
	sku: "SMA06",
	name: "Samsung Galaxy A06",
	category: "Screens",
	priceCost: 45e3,
	priceSell: 6e4,
	stock: 17,
	barcode: "",
	createdAt: "2025-10-15T17:17:42"
};
var SEED = {
	users: [
		{
			id: "u1",
			username: "Grobaltech",
			passwordHash: HASH.hybrid,
			role: "admin",
			phone: "+256707836076",
			email: "hybriphoneservicecenter@gmail.com",
			about: "Shop owner",
			createdAt: "2025-10-16T08:12:08"
		},
		{
			id: "u2",
			username: "amina",
			passwordHash: HASH.till,
			role: "cashier",
			phone: "",
			email: "",
			about: "Counter",
			createdAt: "2025-10-16T09:00:00"
		},
		{
			id: "u3",
			username: "moses",
			passwordHash: HASH.floor,
			role: "manager",
			phone: "",
			email: "",
			about: "Floor manager",
			createdAt: "2025-10-16T09:05:00"
		}
	],
	products: [a05, a06],
	suppliers: [{
		id: "sup1",
		name: "Grobaltech",
		phone: "+256707836076",
		email: "babwicos@gmail.com",
		createdAt: "2025-10-22T22:13:44"
	}],
	sales: [
		sale({
			id: "sale5",
			receiptNo: "RCPT-20251015-000005",
			customerName: "Walk-in",
			items: [line("si1", a05, 1, 6e4)],
			paymentMethod: "cash",
			notes: "",
			createdAt: "2025-10-15T17:39:23",
			username: "Grobaltech"
		}),
		sale({
			id: "sale6",
			receiptNo: "RCPT-20251015-000006",
			customerName: "Walk-in",
			items: [line("si2", a05, 1, 6e4), line("si3", a06, 11, 6e4)],
			paymentMethod: "cash",
			notes: "",
			createdAt: "2025-10-15T17:40:18",
			username: "Grobaltech"
		}),
		sale({
			id: "sale7",
			receiptNo: "RCPT-20251015-000007",
			customerName: "Walk-in",
			items: [line("si4", a05, 3, 6e4), line("si5", a06, 1, 6e4)],
			paymentMethod: "cash",
			notes: "",
			createdAt: "2025-10-15T17:43:15",
			username: "Grobaltech"
		}),
		sale({
			id: "sale9",
			receiptNo: "RCPT-20251017-000009",
			customerName: "Walk-in",
			items: [line("si7", a05, 1, 6e4), line("si8", a06, 2, 85e3)],
			paymentMethod: "cash",
			notes: "",
			createdAt: "2025-10-17T14:25:24",
			username: "Grobaltech"
		}),
		sale({
			id: "sale10",
			receiptNo: "RCPT-20251017-000010",
			customerName: "Walk-in",
			items: [line("si9", a06, 1, 6e4)],
			paymentMethod: "credit",
			notes: "",
			createdAt: "2025-10-17T14:28:18",
			username: "Grobaltech"
		}),
		sale({
			id: "sale11",
			receiptNo: "RCPT-20251017-000011",
			customerName: "Walk-in",
			items: [line("si10", a06, 1, 6e4)],
			paymentMethod: "credit",
			notes: "",
			createdAt: "2025-10-17T19:09:23",
			username: "Grobaltech"
		}),
		sale({
			id: "sale12",
			receiptNo: "RCPT-20251017-000012",
			customerName: "Walk-in",
			items: [line("si11", a06, 1, 6e4)],
			paymentMethod: "credit",
			notes: "",
			createdAt: "2025-10-17T19:17:20",
			username: "Grobaltech"
		}),
		sale({
			id: "sale13",
			receiptNo: "RCPT-20251022-000013",
			customerName: "Walk-in",
			items: [line("si12", a06, 1, 6e4)],
			paymentMethod: "cash",
			notes: "",
			createdAt: "2025-10-22T20:26:34",
			username: "Grobaltech"
		}),
		sale({
			id: "sale14",
			receiptNo: "RCPT-20251022-000014",
			customerName: "Walk-in",
			items: [line("si13", a05, 1, 6e4)],
			paymentMethod: "credit",
			notes: "",
			createdAt: "2025-10-22T20:27:17",
			username: "Grobaltech"
		})
	],
	credits: [
		{
			id: "cr1",
			saleId: "sale10",
			receiptNo: "RCPT-20251017-000010",
			customerName: "Walk-in",
			amount: 6e4,
			balance: 0,
			status: "closed",
			createdAt: "2025-10-17T14:28:18",
			payments: [{
				id: "cp1",
				amount: 25e3,
				paidAt: "2025-10-17T14:28:58",
				note: ""
			}, {
				id: "cp2",
				amount: 35e3,
				paidAt: "2025-10-17T14:31:20",
				note: "Cleared"
			}]
		},
		{
			id: "cr2",
			saleId: "sale11",
			receiptNo: "RCPT-20251017-000011",
			customerName: "Walk-in",
			amount: 6e4,
			balance: 6e4,
			status: "open",
			createdAt: "2025-10-17T19:09:23",
			payments: []
		},
		{
			id: "cr3",
			saleId: "sale12",
			receiptNo: "RCPT-20251017-000012",
			customerName: "Walk-in",
			amount: 6e4,
			balance: 6e4,
			status: "open",
			createdAt: "2025-10-17T19:17:21",
			payments: []
		},
		{
			id: "cr4",
			saleId: "sale14",
			receiptNo: "RCPT-20251022-000014",
			customerName: "Walk-in",
			amount: 6e4,
			balance: 6e4,
			status: "open",
			createdAt: "2025-10-22T20:27:17",
			payments: []
		}
	],
	expenses: [{
		id: "ex1",
		date: "2025-10-17",
		category: "Lunch",
		amount: 45e3,
		note: "All bills",
		createdAt: "2025-10-17T14:33:24"
	}],
	purchases: [{
		id: "pur1",
		supplierId: "sup1",
		supplierName: "Grobaltech",
		reference: "Gtc90487",
		total: 42e4,
		status: "ordered",
		createdAt: "2025-10-22T22:40:32",
		receivedAt: null,
		items: [{
			id: "pi1",
			productId: "p2",
			sku: "SMA06",
			name: "Samsung Galaxy A06",
			packs: 1,
			packSize: 12,
			loose: 2,
			quantity: 14,
			unitCost: 3e4,
			lineCost: 42e4
		}]
	}, {
		id: "pur2",
		supplierId: "sup1",
		supplierName: "Grobaltech",
		reference: "Gtc90487",
		total: 42e4,
		status: "ordered",
		createdAt: "2025-10-22T22:53:07",
		receivedAt: null,
		items: [{
			id: "pi2",
			productId: "p2",
			sku: "SMA06",
			name: "Samsung Galaxy A06",
			packs: 1,
			packSize: 12,
			loose: 2,
			quantity: 14,
			unitCost: 3e4,
			lineCost: 42e4
		}]
	}],
	creditors: [{
		id: "cred1",
		name: "Jjuko",
		phone: "",
		description: "Daily customer",
		totalCredit: 6e4,
		amountPaid: 6e4,
		balance: 0,
		createdAt: "2025-10-17T17:27:44",
		payments: [{
			id: "crp1",
			amount: 6e4,
			paidAt: "2025-10-17T17:30:00",
			note: "Screen"
		}]
	}],
	audit: [{
		id: "aud1",
		at: "2025-10-22T23:12:00",
		username: "Grobaltech",
		action: "import",
		message: "Counter books carried over from the shop",
		page: "settings"
	}],
	settings: {
		companyName: "Hybrid Phone S/C",
		companyAddress: "New pioneer Mall shop NO PC 90",
		companyPhone: "0754475028",
		companyEmail: "hybriphoneservicecenter@gmail.com",
		currency: "UGX",
		taxRate: 0,
		lowStock: 5,
		theme: "light"
	}
};
function freshData() {
	return structuredClone(SEED);
}
var STAFF_HINTS = [
	{
		username: "Grobaltech",
		password: "hybrid",
		role: "Admin"
	},
	{
		username: "moses",
		password: "floor",
		role: "Manager"
	},
	{
		username: "amina",
		password: "till",
		role: "Cashier"
	}
];
function roundMoney(amount) {
	return Math.round((Number.isFinite(amount) ? amount : 0) * 100) / 100;
}
function money(amount, currency = "UGX") {
	const n = roundMoney(amount);
	return `${currency} ${Math.round(n).toLocaleString("en-UG")}`;
}
function sum(values) {
	return roundMoney(values.reduce((total, value) => total + value, 0));
}
function dayKey(input) {
	const date = typeof input === "string" ? new Date(input) : input;
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function todayKey(now = /* @__PURE__ */ new Date()) {
	return dayKey(now);
}
function formatWhen(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleString("en-UG", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function formatDay(isoOrKey) {
	const date = isoOrKey.length <= 10 ? /* @__PURE__ */ new Date(`${isoOrKey}T12:00:00`) : new Date(isoOrKey);
	if (Number.isNaN(date.getTime())) return isoOrKey;
	return date.toLocaleDateString("en-UG", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function spanRange(span, now = /* @__PURE__ */ new Date()) {
	if (span === "all") return null;
	if (span === "today") {
		const key = todayKey(now);
		return {
			from: key,
			to: key
		};
	}
	if (span === "month") {
		const start = new Date(now.getFullYear(), now.getMonth(), 1);
		const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
		return {
			from: dayKey(start),
			to: dayKey(end)
		};
	}
	const start = new Date(now.getFullYear(), 0, 1);
	const end = new Date(now.getFullYear(), 11, 31);
	return {
		from: dayKey(start),
		to: dayKey(end)
	};
}
function inSpan(iso, span, now = /* @__PURE__ */ new Date()) {
	const range = spanRange(span, now);
	if (!range) return true;
	const key = dayKey(iso);
	return key >= range.from && key <= range.to;
}
function uid(prefix) {
	return `${prefix}_${crypto.randomUUID()}`;
}
function pushAudit(audit, username, action, message, page) {
	return [{
		id: uid("aud"),
		at: (/* @__PURE__ */ new Date()).toISOString(),
		username,
		action,
		message,
		page
	}, ...audit].slice(0, 200);
}
function actor(state) {
	return state.users.find((user) => user.id === state.sessionUserId);
}
function nextReceipt(sales) {
	const day = todayKey().replaceAll("-", "");
	const seq = sales.reduce((max, sale) => {
		const match = /-(\d+)$/.exec(sale.receiptNo);
		return Math.max(max, match ? Number(match[1]) : 0);
	}, 0);
	return `RCPT-${day}-${String(seq + 1).padStart(6, "0")}`;
}
function backupShape(raw) {
	if (!raw || typeof raw !== "object") return null;
	const data = raw;
	const body = data.users ? data : data.data;
	if (!body?.users || !body.products || !body.settings) return null;
	return body;
}
var empty = freshData();
var useShop = create()(persist((set, get) => ({
	...empty,
	sessionUserId: null,
	_hydrated: false,
	setHydrated: (value) => set({ _hydrated: value }),
	loginWithHash: (username, passwordHash) => {
		const user = get().users.find((row) => row.username.toLowerCase() === username.trim().toLowerCase());
		if (!user || user.passwordHash !== passwordHash) return {
			ok: false,
			error: "Username or password doesn't match a staff account on this device."
		};
		set((state) => ({
			sessionUserId: user.id,
			audit: pushAudit(state.audit, user.username, "login", "Signed in", "account")
		}));
		return { ok: true };
	},
	logout: () => {
		const user = actor(get());
		set((state) => ({
			sessionUserId: null,
			audit: user ? pushAudit(state.audit, user.username, "logout", "Signed out", "account") : state.audit
		}));
	},
	completeSale: (draft) => {
		const state = get();
		const user = actor(state);
		if (!user) return {
			ok: false,
			error: "Sign in first."
		};
		if (!draft.items.length) return {
			ok: false,
			error: "Add at least one item."
		};
		const customerName = draft.customerName.trim() || "Walk-in";
		if (draft.payment === "credit" && customerName === "Walk-in") return {
			ok: false,
			error: "Add the customer's name for a credit sale."
		};
		const products = state.products.map((product) => ({ ...product }));
		const items = [];
		for (const line of draft.items) {
			const product = products.find((row) => row.id === line.productId);
			if (!product) return {
				ok: false,
				error: "A product in the cart is no longer on the shelf."
			};
			const qty = Math.max(1, Math.round(line.qty));
			if (qty > product.stock) return {
				ok: false,
				error: `${product.name} only has ${product.stock} in stock.`
			};
			const actual = roundMoney(line.actualPrice);
			if (actual < 0) return {
				ok: false,
				error: "Price can't be negative."
			};
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
				lineProfit: roundMoney(lineTotal - lineCost)
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
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			username: user.username
		};
		const credit = draft.payment === "credit" ? {
			id: uid("cr"),
			saleId: sale.id,
			receiptNo: sale.receiptNo,
			customerName,
			amount: grandTotal,
			balance: grandTotal,
			status: "open",
			createdAt: sale.createdAt,
			payments: []
		} : null;
		set({
			products,
			sales: [sale, ...state.sales],
			credits: credit ? [credit, ...state.credits] : state.credits,
			audit: pushAudit(state.audit, user.username, "sale.create", `${sale.receiptNo} · ${customerName}`, "sales")
		});
		return {
			ok: true,
			saleId: sale.id
		};
	},
	upsertProduct: (product) => {
		const state = get();
		const user = actor(state);
		const sku = product.sku.trim().toUpperCase();
		const name = product.name.trim();
		if (!sku || !name) return {
			ok: false,
			error: "SKU and name are required."
		};
		if (state.products.some((row) => row.sku.toLowerCase() === sku.toLowerCase() && row.id !== product.id)) return {
			ok: false,
			error: "That SKU is already on the shelf."
		};
		const next = {
			id: product.id || uid("p"),
			sku,
			name,
			category: product.category.trim() || "General",
			priceCost: roundMoney(product.priceCost),
			priceSell: roundMoney(product.priceSell),
			stock: Math.max(0, Math.round(product.stock)),
			barcode: product.barcode.trim(),
			createdAt: product.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
		};
		const exists = state.products.some((row) => row.id === next.id);
		set({
			products: exists ? state.products.map((row) => row.id === next.id ? next : row) : [next, ...state.products],
			audit: pushAudit(state.audit, user?.username ?? "staff", exists ? "product.update" : "product.create", `${next.sku} ${next.name}`, "products")
		});
		return { ok: true };
	},
	deleteProduct: (id) => {
		const state = get();
		const product = state.products.find((row) => row.id === id);
		if (!product) return {
			ok: false,
			error: "Product not found."
		};
		set({
			products: state.products.filter((row) => row.id !== id),
			audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "product.delete", product.sku, "products")
		});
		return { ok: true };
	},
	createPurchase: (draft) => {
		const state = get();
		const user = actor(state);
		if (!draft.items.length) return {
			ok: false,
			error: "Add at least one line."
		};
		const supplier = state.suppliers.find((row) => row.id === draft.supplierId);
		const products = state.products.map((product) => ({ ...product }));
		const items = [];
		for (const line of draft.items) {
			const product = products.find((row) => row.id === line.productId);
			if (!product) return {
				ok: false,
				error: "Pick a product on every line."
			};
			const packs = Math.max(0, Math.round(line.packs));
			const packSize = Math.max(1, Math.round(line.packSize));
			const loose = Math.max(0, Math.round(line.loose));
			const quantity = packs * packSize + loose;
			if (quantity <= 0) return {
				ok: false,
				error: `${product.name} needs a quantity.`
			};
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
				lineCost: roundMoney(unitCost * quantity)
			});
		}
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const purchase = {
			id: uid("pur"),
			supplierId: supplier?.id ?? "",
			supplierName: supplier?.name ?? "No supplier",
			reference: draft.reference.trim(),
			total: roundMoney(items.reduce((total, item) => total + item.lineCost, 0)),
			status: draft.status,
			createdAt: now,
			receivedAt: draft.status === "received" ? now : null,
			items
		};
		set({
			products,
			purchases: [purchase, ...state.purchases],
			audit: pushAudit(state.audit, user?.username ?? "staff", "purchase.create", `${purchase.reference || purchase.id} · ${purchase.status}`, "purchases")
		});
		return { ok: true };
	},
	receivePurchase: (id) => {
		const state = get();
		const purchase = state.purchases.find((row) => row.id === id);
		if (!purchase) return {
			ok: false,
			error: "Purchase not found."
		};
		if (purchase.status === "received") return {
			ok: false,
			error: "Already received."
		};
		const products = state.products.map((product) => ({ ...product }));
		for (const item of purchase.items) {
			const product = products.find((row) => row.id === item.productId);
			if (!product) continue;
			product.stock += item.quantity;
			if (item.unitCost > 0) product.priceCost = item.unitCost;
		}
		const now = (/* @__PURE__ */ new Date()).toISOString();
		set({
			products,
			purchases: state.purchases.map((row) => row.id === id ? {
				...row,
				status: "received",
				receivedAt: now
			} : row),
			audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "purchase.receive", purchase.reference || purchase.id, "purchases")
		});
		return { ok: true };
	},
	payCredit: (creditId, amount, note) => {
		const state = get();
		const credit = state.credits.find((row) => row.id === creditId);
		if (!credit) return {
			ok: false,
			error: "Credit not found."
		};
		const pay = roundMoney(amount);
		if (pay <= 0) return {
			ok: false,
			error: "Enter an amount greater than zero."
		};
		if (pay > credit.balance) return {
			ok: false,
			error: "That's more than the open balance."
		};
		const balance = roundMoney(credit.balance - pay);
		set({
			credits: state.credits.map((row) => row.id === creditId ? {
				...row,
				balance,
				status: balance <= 0 ? "closed" : "open",
				payments: [{
					id: uid("cp"),
					amount: pay,
					paidAt: (/* @__PURE__ */ new Date()).toISOString(),
					note: note.trim()
				}, ...row.payments]
			} : row),
			audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "credit.pay", `${credit.receiptNo} · ${pay}`, "credits")
		});
		return { ok: true };
	},
	addExpense: (expense) => {
		if (!expense.category.trim()) return {
			ok: false,
			error: "Category is required."
		};
		if (expense.amount <= 0) return {
			ok: false,
			error: "Amount must be greater than zero."
		};
		const state = get();
		const row = {
			id: uid("ex"),
			date: expense.date || todayKey(),
			category: expense.category.trim(),
			amount: roundMoney(expense.amount),
			note: expense.note.trim(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set({
			expenses: [row, ...state.expenses],
			audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "expense.create", row.category, "expenses")
		});
		return { ok: true };
	},
	deleteExpense: (id) => {
		const state = get();
		set({
			expenses: state.expenses.filter((row) => row.id !== id),
			audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "expense.delete", id, "expenses")
		});
		return { ok: true };
	},
	upsertSupplier: (supplier) => {
		const name = supplier.name.trim();
		if (!name) return {
			ok: false,
			error: "Supplier name is required."
		};
		const state = get();
		const id = supplier.id || uid("sup");
		const next = {
			id,
			name,
			phone: supplier.phone.trim(),
			email: supplier.email.trim(),
			createdAt: state.suppliers.find((row) => row.id === id)?.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
		};
		set({ suppliers: state.suppliers.some((row) => row.id === id) ? state.suppliers.map((row) => row.id === id ? next : row) : [next, ...state.suppliers] });
		return { ok: true };
	},
	deleteSupplier: (id) => {
		set((state) => ({ suppliers: state.suppliers.filter((row) => row.id !== id) }));
		return { ok: true };
	},
	addCreditor: (input) => {
		const name = input.name.trim();
		if (!name) return {
			ok: false,
			error: "Name is required."
		};
		const total = roundMoney(Math.max(0, input.totalCredit));
		const paid = roundMoney(Math.min(total, Math.max(0, input.amountPaid)));
		const state = get();
		set({ creditors: [{
			id: uid("cred"),
			name,
			phone: input.phone.trim(),
			description: input.description.trim(),
			totalCredit: total,
			amountPaid: paid,
			balance: roundMoney(total - paid),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			payments: paid > 0 ? [{
				id: uid("crp"),
				amount: paid,
				paidAt: (/* @__PURE__ */ new Date()).toISOString(),
				note: "Opening payment"
			}] : []
		}, ...state.creditors] });
		return { ok: true };
	},
	payCreditor: (id, amount, note) => {
		const state = get();
		const creditor = state.creditors.find((row) => row.id === id);
		if (!creditor) return {
			ok: false,
			error: "Creditor not found."
		};
		const pay = roundMoney(amount);
		if (pay <= 0) return {
			ok: false,
			error: "Enter an amount greater than zero."
		};
		if (pay > creditor.balance) return {
			ok: false,
			error: "That's more than the balance."
		};
		set({ creditors: state.creditors.map((row) => row.id === id ? {
			...row,
			amountPaid: roundMoney(row.amountPaid + pay),
			balance: roundMoney(row.balance - pay),
			payments: [{
				id: uid("crp"),
				amount: pay,
				paidAt: (/* @__PURE__ */ new Date()).toISOString(),
				note: note.trim()
			}, ...row.payments]
		} : row) });
		return { ok: true };
	},
	addUser: (input) => {
		const username = input.username.trim();
		if (username.length < 2) return {
			ok: false,
			error: "Username is too short."
		};
		const state = get();
		if (state.users.some((row) => row.username.toLowerCase() === username.toLowerCase())) return {
			ok: false,
			error: "That username is already used."
		};
		const row = {
			id: uid("u"),
			username,
			passwordHash: input.passwordHash,
			role: input.role,
			phone: input.phone.trim(),
			email: input.email.trim(),
			about: "",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set({
			users: [...state.users, row],
			audit: pushAudit(state.audit, actor(state)?.username ?? "staff", "user.create", username, "users")
		});
		return { ok: true };
	},
	updateUser: (id, patch) => {
		set((state) => ({ users: state.users.map((row) => row.id === id ? {
			...row,
			...patch
		} : row) }));
		return { ok: true };
	},
	setPasswordHash: (id, passwordHash) => {
		set((state) => ({ users: state.users.map((row) => row.id === id ? {
			...row,
			passwordHash
		} : row) }));
		return { ok: true };
	},
	deleteUser: (id) => {
		const state = get();
		if (id === state.sessionUserId) return {
			ok: false,
			error: "You can't remove the account you're using."
		};
		const user = state.users.find((row) => row.id === id);
		if (!user) return {
			ok: false,
			error: "User not found."
		};
		const admins = state.users.filter((row) => row.role === "admin");
		if (user.role === "admin" && admins.length <= 1) return {
			ok: false,
			error: "Keep at least one admin."
		};
		set({ users: state.users.filter((row) => row.id !== id) });
		return { ok: true };
	},
	updateSettings: (patch) => {
		set((state) => ({ settings: {
			...state.settings,
			...patch
		} }));
	},
	importBackup: (raw) => {
		const body = backupShape(raw);
		if (!body) return {
			ok: false,
			error: "That file isn't a Hybrid counter backup."
		};
		set({
			...freshData(),
			...body,
			settings: {
				...freshData().settings,
				...body.settings
			},
			sessionUserId: null,
			_hydrated: true
		});
		return { ok: true };
	},
	resetBooks: () => {
		const sessionUserId = get().sessionUserId;
		const next = freshData();
		const stillThere = next.users.some((user) => user.id === sessionUserId);
		set({
			...next,
			sessionUserId: stillThere ? sessionUserId : null,
			_hydrated: true
		});
	}
}), {
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
		sessionUserId: state.sessionUserId
	})
}));
function Page({ kicker, title, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-5 pb-28 sm:px-6 lg:pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: kicker
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold text-ink",
				children: title
			})] }), action]
		}), children]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1 block font-semibold text-ink",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
function TextField({ label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "field",
			...props
		})
	});
}
function Modal({ open, title, onClose, children }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-navy/50 p-3 sm:items-center",
		role: "presentation",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: "card max-h-[90dvh] w-full max-w-lg overflow-auto p-5",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-ghost btn-sm",
					onClick: onClose,
					children: "Close"
				})]
			}), children]
		})
	});
}
function Banner({ tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("rounded-card px-3 py-2 text-sm font-semibold", tone === "ok" && "bg-ok-soft text-ok", tone === "warn" && "bg-warn-soft text-warn", tone === "danger" && "bg-danger-soft text-danger"),
		children
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num mt-1 text-2xl font-semibold text-ink",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
function SpanChips({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			["today", "Today"],
			["month", "This month"],
			["year", "This year"],
			["all", "All books"]
		].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: cn("btn btn-sm", value === key ? "btn-navy" : "btn-line"),
			onClick: () => onChange(key),
			children: label
		}, key))
	});
}
//#endregion
export { useShop as _, SpanChips as a, cn as c, formatWhen as d, inSpan as f, todayKey as g, sum as h, STAFF_HINTS as i, dayKey as l, roundMoney as m, Modal as n, Stat as o, money as p, Page as r, TextField as s, Banner as t, formatDay as u };
