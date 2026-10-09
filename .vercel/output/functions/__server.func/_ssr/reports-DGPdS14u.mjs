import { i as __toESM } from "../_runtime.mjs";
import { n as canSeeCost } from "./access-8byYH4jb.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, a as SpanChips, f as inSpan, h as sum, l as dayKey, o as Stat, p as money, r as Page, u as formatDay } from "./ui-B3DByBpp.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-DGPdS14u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const sales = useShop((state) => state.sales);
	const settings = useShop((state) => state.settings);
	const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
	const [span, setSpan] = (0, import_react.useState)("all");
	const rows = sales.filter((sale) => inSpan(sale.createdAt, span));
	const seeCost = user ? canSeeCost(user.role) : false;
	const byDay = /* @__PURE__ */ new Map();
	for (const sale of rows) {
		const key = dayKey(sale.createdAt);
		const current = byDay.get(key) ?? {
			day: formatDay(key),
			sales: 0,
			profit: 0
		};
		current.sales += sale.grandTotal;
		current.profit += sale.profit;
		byDay.set(key, current);
	}
	const chart = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, value]) => value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Books",
		title: "Reports",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpanChips, {
			value: span,
			onChange: setSpan
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Sales",
					value: money(sum(rows.map((sale) => sale.grandTotal)), settings.currency),
					hint: `${rows.length} receipts`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Cash",
					value: money(sum(rows.filter((sale) => sale.paymentMethod === "cash").map((sale) => sale.grandTotal)), settings.currency)
				}),
				seeCost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Profit",
					value: money(sum(rows.map((sale) => sale.profit)), settings.currency)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Credit",
					value: money(sum(rows.filter((sale) => sale.paymentMethod === "credit").map((sale) => sale.grandTotal)), settings.currency)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card mt-4 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: "Sales by day"
			}), chart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No sales in this range."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-64 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chart,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								tick: { fontSize: 12 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: { fontSize: 12 },
								width: 48
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (value) => money(Number(value), settings.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "sales",
								fill: "var(--color-primary)",
								radius: 6
							})
						]
					})
				})
			})]
		})]
	});
}
//#endregion
export { ReportsPage as component };
