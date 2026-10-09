import { i as __toESM } from "../_runtime.mjs";
import { n as canSeeCost } from "./access-8byYH4jb.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, n as Modal, p as money, r as Page, s as TextField, t as Banner } from "./ui-B3DByBpp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-Bs2ZnLpE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var blank = {
	id: "",
	sku: "",
	name: "",
	category: "Screens",
	priceCost: 0,
	priceSell: 0,
	stock: 0,
	barcode: ""
};
function ProductsPage() {
	const products = useShop((state) => state.products);
	const settings = useShop((state) => state.settings);
	const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
	const upsertProduct = useShop((state) => state.upsertProduct);
	const deleteProduct = useShop((state) => state.deleteProduct);
	const seeCost = user ? canSeeCost(user.role) : false;
	const [query, setQuery] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const shown = products.filter((product) => `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase()));
	function open(product) {
		setError("");
		setDraft(product ? {
			id: product.id,
			sku: product.sku,
			name: product.name,
			category: product.category,
			priceCost: product.priceCost,
			priceSell: product.priceSell,
			stock: product.stock,
			barcode: product.barcode
		} : { ...blank });
	}
	function save() {
		if (!draft) return;
		const result = upsertProduct(draft);
		if (!result.ok) {
			setError(result.error);
			return;
		}
		toast.success("Product saved");
		setDraft(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Stock",
		title: "Products",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn btn-primary",
			onClick: () => open(),
			children: "Add product"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "field mb-4 max-w-md",
				placeholder: "Filter the shelf",
				value: query,
				onChange: (event) => setQuery(event.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: shown.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "card w-full p-4 text-left",
					onClick: () => open(product),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: product.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								product.sku,
								" · ",
								product.category
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num text-lg font-semibold",
							children: money(product.priceSell, settings.currency)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							"In stock ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: product.stock <= settings.lowStock ? "num font-semibold text-warn" : "num font-semibold",
								children: product.stock
							}),
							seeCost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · cost ", money(product.priceCost, settings.currency)]
							}) : null
						]
					})]
				}) }, product.id))
			}),
			shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "No products match."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: Boolean(draft),
				title: draft?.id ? "Edit product" : "New product",
				onClose: () => setDraft(null),
				children: draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "SKU",
							value: draft.sku,
							onChange: (event) => setDraft({
								...draft,
								sku: event.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Name",
							value: draft.name,
							onChange: (event) => setDraft({
								...draft,
								name: event.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Category",
							list: "categories",
							value: draft.category,
							onChange: (event) => setDraft({
								...draft,
								category: event.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("datalist", {
							id: "categories",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Screens" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Batteries" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Ports" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Accessories" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [
								seeCost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Cost",
									type: "number",
									min: 0,
									value: draft.priceCost,
									onChange: (event) => setDraft({
										...draft,
										priceCost: Number(event.target.value)
									})
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Sell price",
									type: "number",
									min: 0,
									value: draft.priceSell,
									onChange: (event) => setDraft({
										...draft,
										priceSell: Number(event.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Stock",
									type: "number",
									min: 0,
									value: draft.stock,
									onChange: (event) => setDraft({
										...draft,
										stock: Number(event.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Barcode",
									value: draft.barcode,
									onChange: (event) => setDraft({
										...draft,
										barcode: event.target.value
									})
								})
							]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
							tone: "danger",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-primary",
								onClick: save,
								children: "Save"
							}), draft.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-danger",
								onClick: () => {
									const result = deleteProduct(draft.id);
									if (!result.ok) {
										setError(result.error);
										return;
									}
									toast.success("Product removed");
									setDraft(null);
								},
								children: "Delete"
							}) : null]
						})
					]
				}) : null
			})
		]
	});
}
//#endregion
export { ProductsPage as component };
