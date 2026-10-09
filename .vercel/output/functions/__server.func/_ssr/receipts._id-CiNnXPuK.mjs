import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, d as formatWhen, p as money, r as Page } from "./ui-B3DByBpp.mjs";
import { m as Printer } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-BcHH9Nlw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receipts._id-CiNnXPuK.js
var import_jsx_runtime = require_jsx_runtime();
function ReceiptPage() {
	const { id } = Route.useParams();
	const sale = useShop((state) => state.sales.find((row) => row.id === id));
	const credit = useShop((state) => state.credits.find((row) => row.saleId === id));
	const settings = useShop((state) => state.settings);
	if (!sale) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		title: "Receipt missing",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "That receipt isn't on this device."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/receipts",
			className: "btn btn-line mt-4",
			children: "All receipts"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Floor",
		title: sale.receiptNo,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "btn btn-navy no-print",
			onClick: () => window.print(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Print"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "receipt-sheet card mx-auto max-w-md p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo.png",
					alt: "",
					className: "mx-auto h-14 w-auto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-center text-xl font-semibold",
					children: settings.companyName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm text-muted",
					children: settings.companyAddress
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-sm text-muted",
					children: [settings.companyPhone, settings.companyEmail ? ` · ${settings.companyEmail}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid gap-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "When"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatWhen(sale.createdAt) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Cashier"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: sale.username })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Customer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: sale.customerName })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Payment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "capitalize",
								children: sale.paymentMethod
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line border-y border-line",
					children: sale.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-semibold",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								item.sku,
								" · ",
								item.quantity,
								" × ",
								money(item.actualPrice, settings.currency)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num",
							children: money(item.lineTotal, settings.currency)
						})]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 grid gap-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "num",
								children: money(sale.subtotal, settings.currency)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [
								"Tax (",
								sale.taxRate,
								"%)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "num",
								children: money(sale.taxAmount, settings.currency)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-base font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "num",
								children: money(sale.grandTotal, settings.currency)
							})]
						})
					]
				}),
				credit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm",
					children: [
						"Credit balance ",
						money(credit.balance, settings.currency),
						" · ",
						credit.status
					]
				}) : null,
				sale.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: sale.notes
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-sm",
					children: "Thank you. Pioneer Mall, shop PC 90."
				})
			]
		})
	});
}
//#endregion
export { ReceiptPage as component };
