import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, d as formatWhen, p as money, r as Page } from "./ui-B3DByBpp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receipts-BHMzFNK6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReceiptsPage() {
	const sales = useShop((state) => state.sales);
	const settings = useShop((state) => state.settings);
	const [query, setQuery] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("all");
	const shown = sales.filter((sale) => {
		return `${sale.receiptNo} ${sale.customerName} ${sale.username}`.toLowerCase().includes(query.trim().toLowerCase()) && (method === "all" || sale.paymentMethod === method);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Floor",
		title: "Receipts",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field max-w-sm",
					placeholder: "Receipt, customer, cashier",
					value: query,
					onChange: (event) => setQuery(event.target.value)
				}), [
					"all",
					"cash",
					"credit"
				].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: method === option ? "btn btn-navy btn-sm" : "btn btn-line btn-sm",
					onClick: () => setMethod(option),
					children: option
				}, option))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2",
				children: shown.map((sale) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/receipts/$id",
					params: { id: sale.id },
					className: "card flex items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-semibold",
						children: sale.receiptNo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted",
						children: [
							sale.customerName,
							" · ",
							sale.paymentMethod,
							" · ",
							formatWhen(sale.createdAt)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num font-semibold",
						children: money(sale.grandTotal, settings.currency)
					})]
				}) }, sale.id))
			}),
			shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "No receipts match."
			}) : null
		]
	});
}
//#endregion
export { ReceiptsPage as component };
