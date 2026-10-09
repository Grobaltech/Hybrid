import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, m as roundMoney, p as money, r as Page, t as Banner } from "./ui-B3DByBpp.mjs";
import { h as Plus, o as Trash2, y as Minus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sell-a3oXM2EU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellPage() {
	const products = useShop((state) => state.products);
	const settings = useShop((state) => state.settings);
	const completeSale = useShop((state) => state.completeSale);
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [customer, setCustomer] = (0, import_react.useState)("");
	const [payment, setPayment] = (0, import_react.useState)("cash");
	const [tax, setTax] = (0, import_react.useState)(settings.taxRate);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const matches = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		return (needle ? products.filter((product) => `${product.name} ${product.sku} ${product.barcode} ${product.category}`.toLowerCase().includes(needle)) : products).slice(0, 8);
	}, [products, query]);
	function add(productId) {
		const product = products.find((row) => row.id === productId);
		if (!product || product.stock <= 0) return;
		setCart((lines) => {
			if (lines.find((line) => line.productId === productId)) return lines.map((line) => line.productId === productId ? {
				...line,
				qty: Math.min(product.stock, line.qty + 1)
			} : line);
			return [...lines, {
				productId,
				qty: 1,
				actualPrice: product.priceSell
			}];
		});
		setQuery("");
		setError("");
	}
	const detailed = cart.map((line) => {
		const product = products.find((row) => row.id === line.productId);
		if (!product) return null;
		return {
			...line,
			product,
			lineTotal: roundMoney(line.actualPrice * line.qty)
		};
	}).filter((line) => Boolean(line));
	const subtotal = roundMoney(detailed.reduce((total, line) => total + line.lineTotal, 0));
	const taxAmount = roundMoney(subtotal * (Math.max(0, tax) / 100));
	const grand = roundMoney(subtotal + taxAmount);
	function charge() {
		const result = completeSale({
			items: detailed.map((line) => ({
				productId: line.productId,
				qty: line.qty,
				actualPrice: line.actualPrice
			})),
			customerName: customer,
			payment,
			taxRate: tax,
			notes
		});
		if (!result.ok) {
			setError(result.error);
			return;
		}
		toast.success("Sale saved");
		navigate({
			to: "/receipts/$id",
			params: { id: result.saleId }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Floor",
		title: "New sale",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-semibold",
							children: "Find a product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: query,
							autoFocus: true,
							placeholder: "Name or SKU",
							onChange: (event) => setQuery(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 grid gap-2",
						children: [matches.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn btn-line w-full justify-between",
							disabled: product.stock <= 0,
							onClick: () => add(product.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-medium text-muted",
									children: [
										product.sku,
										" · ",
										product.stock,
										" in stock"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num",
								children: money(product.priceSell, settings.currency)
							})]
						}) }, product.id)), matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "Nothing matches that search."
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3",
						children: [detailed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Cart is empty."
						}) : null, detailed.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl border border-line p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: line.product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: line.product.sku
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-ghost btn-sm",
									"aria-label": `Remove ${line.product.name}`,
									onClick: () => setCart((rows) => rows.filter((row) => row.productId !== line.productId)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "btn btn-line btn-sm",
												"aria-label": "Decrease quantity",
												onClick: () => setCart((rows) => rows.map((row) => row.productId === line.productId ? {
													...row,
													qty: Math.max(1, row.qty - 1)
												} : row)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "num w-8 text-center",
												children: line.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "btn btn-line btn-sm",
												"aria-label": "Increase quantity",
												onClick: () => setCart((rows) => rows.map((row) => row.productId === line.productId ? {
													...row,
													qty: Math.min(line.product.stock, row.qty + 1)
												} : row)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Actual price"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field w-32",
											type: "number",
											min: 0,
											inputMode: "decimal",
											value: line.actualPrice,
											onChange: (event) => setCart((rows) => rows.map((row) => row.productId === line.productId ? {
												...row,
												actualPrice: Number(event.target.value)
											} : row))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "num ml-auto font-semibold",
										children: money(line.lineTotal, settings.currency)
									})
								]
							})]
						}, line.productId))]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "card h-fit p-4 lg:sticky lg:top-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-semibold",
							children: "Customer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: customer,
							placeholder: "Walk-in if empty",
							onChange: (event) => setCustomer(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: ["cash", "credit"].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: payment === method ? "btn btn-navy" : "btn btn-line",
							onClick: () => setPayment(method),
							children: method === "cash" ? "Cash" : "Credit"
						}, method))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-semibold",
							children: "Tax %"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							type: "number",
							min: 0,
							step: "0.01",
							value: tax,
							onChange: (event) => setTax(Number(event.target.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block font-semibold",
							children: "Note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: notes,
							onChange: (event) => setNotes(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "num",
									children: money(subtotal, settings.currency)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Tax"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "num",
									children: money(taxAmount, settings.currency)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-base font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "num",
									children: money(grand, settings.currency)
								})]
							})
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
							tone: "danger",
							children: error
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-primary mt-4 w-full",
						disabled: detailed.length === 0,
						onClick: charge,
						children: ["Charge ", money(grand, settings.currency)]
					})
				]
			})]
		})
	});
}
//#endregion
export { SellPage as component };
