import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, p as money, r as Page } from "./ui-B3DByBpp.mjs";
import { r as Route$5 } from "./router-BcHH9Nlw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-B10kz_qO.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q } = Route$5.useSearch();
	const products = useShop((state) => state.products);
	const sales = useShop((state) => state.sales);
	const settings = useShop((state) => state.settings);
	const needle = q.trim().toLowerCase();
	const productHits = needle ? products.filter((product) => `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(needle)) : products;
	const saleHits = needle ? sales.filter((sale) => `${sale.receiptNo} ${sale.customerName}`.toLowerCase().includes(needle)) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Floor",
		title: needle ? `Results for “${q.trim()}”` : "Search",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-lg font-semibold",
				children: "Products"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2",
				children: productHits.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card flex items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-semibold",
						children: product.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted",
						children: [
							product.sku,
							" · ",
							product.stock,
							" in stock"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num",
						children: money(product.priceSell, settings.currency)
					})]
				}, product.id))
			}),
			productHits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No products."
			}) : null,
			saleHits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 mb-2 text-lg font-semibold",
				children: "Receipts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2",
				children: saleHits.map((sale) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/receipts/$id",
					params: { id: sale.id },
					className: "card flex items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						sale.receiptNo,
						" · ",
						sale.customerName
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num",
						children: money(sale.grandTotal, settings.currency)
					})]
				}) }, sale.id))
			})] }) : null
		]
	});
}
//#endregion
export { SearchPage as component };
