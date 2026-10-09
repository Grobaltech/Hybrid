import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, d as formatWhen, p as money, r as Page, t as Banner } from "./ui-B3DByBpp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/purchases-CpQi-kg1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PurchasesPage() {
	const products = useShop((state) => state.products);
	const suppliers = useShop((state) => state.suppliers);
	const purchases = useShop((state) => state.purchases);
	const settings = useShop((state) => state.settings);
	const createPurchase = useShop((state) => state.createPurchase);
	const receivePurchase = useShop((state) => state.receivePurchase);
	const [supplierId, setSupplierId] = (0, import_react.useState)(suppliers[0]?.id ?? "");
	const [reference, setReference] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("received");
	const [lines, setLines] = (0, import_react.useState)([{
		productId: products[0]?.id ?? "",
		packs: 1,
		packSize: 1,
		loose: 0,
		unitCost: products[0]?.priceCost ?? 0
	}]);
	const [error, setError] = (0, import_react.useState)("");
	function save() {
		const result = createPurchase({
			supplierId,
			reference,
			status,
			items: lines
		});
		if (!result.ok) {
			setError(result.error);
			return;
		}
		toast.success(status === "received" ? "Stock received" : "Order saved");
		setReference("");
		setError("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Stock",
		title: "Purchases",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold",
								children: "Supplier"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "field",
								value: supplierId,
								onChange: (event) => setSupplierId(event.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "No supplier"
								}), suppliers.map((supplier) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: supplier.id,
									children: supplier.name
								}, supplier.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold",
								children: "Reference"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: reference,
								onChange: (event) => setReference(event.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "field",
								value: status,
								onChange: (event) => setStatus(event.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "received",
									children: "Receive now"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ordered",
									children: "Order only"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-3",
					children: lines.map((line, index) => {
						const qty = Math.max(0, line.packs) * Math.max(1, line.packSize) + Math.max(0, line.loose);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-2 rounded-xl bg-paper p-3 sm:grid-cols-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block font-semibold",
										children: "Product"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "field",
										value: line.productId,
										onChange: (event) => {
											const product = products.find((row) => row.id === event.target.value);
											setLines((rows) => rows.map((row, i) => i === index ? {
												...row,
												productId: event.target.value,
												unitCost: product?.priceCost ?? row.unitCost
											} : row));
										},
										children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: product.id,
											children: product.name
										}, product.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "Packs",
									value: line.packs,
									onChange: (packs) => setLines((rows) => rows.map((row, i) => i === index ? {
										...row,
										packs
									} : row))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "Pack size",
									value: line.packSize,
									onChange: (packSize) => setLines((rows) => rows.map((row, i) => i === index ? {
										...row,
										packSize
									} : row))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "Loose",
									value: line.loose,
									onChange: (loose) => setLines((rows) => rows.map((row, i) => i === index ? {
										...row,
										loose
									} : row))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "Unit cost",
									value: line.unitCost,
									onChange: (unitCost) => setLines((rows) => rows.map((row, i) => i === index ? {
										...row,
										unitCost
									} : row))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted sm:col-span-6",
									children: [
										qty,
										" units · ",
										money(qty * line.unitCost, settings.currency)
									]
								})
							]
						}, index);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => setLines((rows) => [...rows, {
							productId: products[0]?.id ?? "",
							packs: 1,
							packSize: 1,
							loose: 0,
							unitCost: products[0]?.priceCost ?? 0
						}]),
						children: "Add line"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: save,
						children: "Save purchase"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
						tone: "danger",
						children: error
					})
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-3",
			children: purchases.map((purchase) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-semibold",
							children: [
								purchase.reference || "No reference",
								" · ",
								purchase.supplierName
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								formatWhen(purchase.createdAt),
								" · ",
								purchase.status
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num text-lg font-semibold",
							children: money(purchase.total, settings.currency)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 text-sm text-muted",
						children: purchase.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							item.name,
							" · ",
							item.quantity,
							" @ ",
							money(item.unitCost, settings.currency)
						] }, item.id))
					}),
					purchase.status === "ordered" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-navy btn-sm mt-3",
						onClick: () => {
							const result = receivePurchase(purchase.id);
							if (!result.ok) toast.error(result.error);
							else toast.success("Stock updated");
						},
						children: "Receive into stock"
					}) : null
				]
			}, purchase.id))
		})]
	});
}
function Num({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block font-semibold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "field",
			type: "number",
			min: 0,
			value,
			onChange: (event) => onChange(Number(event.target.value))
		})]
	});
}
//#endregion
export { PurchasesPage as component };
