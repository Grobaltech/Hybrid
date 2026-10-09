import { i as __toESM } from "../_runtime.mjs";
import { n as canSeeCost } from "./access-8byYH4jb.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, a as SpanChips, f as inSpan, h as sum, l as dayKey, o as Stat, p as money, r as Page, u as formatDay } from "./ui-B3DByBpp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/balance-NbpBiaM-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BalancePage() {
	const sales = useShop((state) => state.sales);
	const expenses = useShop((state) => state.expenses);
	const products = useShop((state) => state.products);
	const settings = useShop((state) => state.settings);
	const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
	const [span, setSpan] = (0, import_react.useState)("all");
	const seeCost = user ? canSeeCost(user.role) : false;
	const inSales = sales.filter((sale) => inSpan(sale.createdAt, span));
	const inExpenses = expenses.filter((expense) => inSpan(`${expense.date}T12:00:00`, span));
	const totalSales = sum(inSales.map((sale) => sale.grandTotal));
	const creditSales = sum(inSales.filter((sale) => sale.paymentMethod === "credit").map((sale) => sale.grandTotal));
	const cashSales = totalSales - creditSales;
	const expenseSum = sum(inExpenses.map((expense) => expense.amount));
	const cashAtHand = cashSales - expenseSum;
	const stockCost = sum(products.map((product) => product.priceCost * product.stock));
	const days = /* @__PURE__ */ new Map();
	for (const sale of inSales) {
		const key = dayKey(sale.createdAt);
		const row = days.get(key) ?? {
			cash: 0,
			credit: 0,
			profit: 0
		};
		if (sale.paymentMethod === "cash") row.cash += sale.grandTotal;
		else row.credit += sale.grandTotal;
		row.profit += sale.profit;
		days.set(key, row);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Books",
		title: "Balance",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpanChips, {
			value: span,
			onChange: setSpan
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Cash sales",
						value: money(cashSales, settings.currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Credit sales",
						value: money(creditSales, settings.currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Expenses",
						value: money(expenseSum, settings.currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Cash at hand",
						value: money(cashAtHand, settings.currency),
						hint: "Cash sales minus expenses"
					})
				]
			}),
			seeCost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Stock on hand, at cost",
					value: money(stockCost, settings.currency),
					hint: "Not subtracted from cash"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-2",
				children: [...days.entries()].sort(([a], [b]) => b.localeCompare(a)).map(([key, row]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card grid gap-1 px-4 py-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: formatDay(key)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Cash ", money(row.cash, settings.currency)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Credit ", money(row.credit, settings.currency)]
						}),
						seeCost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Profit ", money(row.profit, settings.currency)]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {})
					]
				}, key))
			})
		]
	});
}
//#endregion
export { BalancePage as component };
