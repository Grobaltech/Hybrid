import { n as canSeeCost } from "./_ssr/access-8byYH4jb.mjs";
import { Y as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, d as formatWhen, f as inSpan, h as sum, o as Stat, p as money, r as Page } from "./_ssr/ui-B3DByBpp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_pos-Dx1AUugE.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const settings = useShop((state) => state.settings);
	const products = useShop((state) => state.products);
	const sales = useShop((state) => state.sales);
	const credits = useShop((state) => state.credits);
	const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
	const seeCost = user ? canSeeCost(user.role) : false;
	const todaySales = sales.filter((sale) => inSpan(sale.createdAt, "today"));
	const openCredits = credits.filter((credit) => credit.status === "open");
	const low = products.filter((product) => product.stock <= settings.lowStock);
	const currency = settings.currency;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: settings.companyAddress,
		title: `Good day, ${user?.username ?? "team"}`,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/sell",
			className: "btn btn-primary",
			children: "New sale"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Today's sales",
					value: money(sum(todaySales.map((sale) => sale.grandTotal)), currency),
					hint: `${todaySales.length} receipt${todaySales.length === 1 ? "" : "s"}`
				}),
				seeCost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Today's profit",
					value: money(sum(todaySales.map((sale) => sale.profit)), currency)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Cash today",
					value: money(sum(todaySales.filter((sale) => sale.paymentMethod === "cash").map((sale) => sale.grandTotal)), currency)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Open credit",
					value: money(sum(openCredits.map((credit) => credit.balance)), currency),
					hint: `${openCredits.length} open`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Low stock",
					value: String(low.length),
					hint: `At or under ${settings.lowStock}`
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Recent receipts"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/receipts",
						className: "text-sm font-semibold text-primary",
						children: "All"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: sales.slice(0, 6).map((sale) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/receipts/$id",
						params: { id: sale.id },
						className: "flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-paper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-semibold",
							children: sale.receiptNo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted",
							children: [
								sale.customerName,
								" · ",
								formatWhen(sale.createdAt)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num font-semibold",
							children: money(sale.grandTotal, currency)
						})]
					}) }, sale.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Still on credit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/credits",
							className: "text-sm font-semibold text-primary",
							children: "Collect"
						})]
					}),
					openCredits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No open balances."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2",
						children: openCredits.slice(0, 6).map((credit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold",
								children: credit.customerName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: credit.receiptNo
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num font-semibold",
								children: money(credit.balance, currency)
							})]
						}, credit.id))
					}),
					low.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 border-t border-line pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-semibold",
							children: "Reorder soon"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-1 text-sm",
							children: low.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: product.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "num text-warn",
									children: [product.stock, " left"]
								})]
							}, product.id))
						})]
					}) : null
				]
			})]
		})]
	});
}
//#endregion
export { Dashboard as component };
