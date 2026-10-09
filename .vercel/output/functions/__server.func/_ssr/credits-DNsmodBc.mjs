import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, d as formatWhen, p as money, r as Page, t as Banner } from "./ui-B3DByBpp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/credits-DNsmodBc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreditsPage() {
	const credits = useShop((state) => state.credits);
	const settings = useShop((state) => state.settings);
	const payCredit = useShop((state) => state.payCredit);
	const [amounts, setAmounts] = (0, import_react.useState)({});
	const [notes, setNotes] = (0, import_react.useState)({});
	const [error, setError] = (0, import_react.useState)("");
	const open = credits.filter((credit) => credit.status === "open");
	const closed = credits.filter((credit) => credit.status === "closed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Books",
		title: "Customer credit",
		children: [
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
				tone: "danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3",
				children: open.map((credit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: credit.customerName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/receipts/$id",
									params: { id: credit.saleId },
									className: "text-primary",
									children: credit.receiptNo
								}),
								" ",
								"· opened ",
								formatWhen(credit.createdAt)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num text-xl font-semibold",
							children: money(credit.balance, settings.currency)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-3 flex flex-wrap gap-2",
						onSubmit: (event) => {
							event.preventDefault();
							const result = payCredit(credit.id, Number(amounts[credit.id] ?? 0), notes[credit.id] ?? "");
							if (!result.ok) {
								setError(result.error);
								return;
							}
							setError("");
							setAmounts((current) => ({
								...current,
								[credit.id]: ""
							}));
							toast.success("Payment recorded");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field max-w-40",
								type: "number",
								min: 1,
								placeholder: "Amount",
								"aria-label": `Payment for ${credit.customerName}`,
								value: amounts[credit.id] ?? "",
								onChange: (event) => setAmounts((current) => ({
									...current,
									[credit.id]: event.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field max-w-56",
								placeholder: "Note",
								value: notes[credit.id] ?? "",
								onChange: (event) => setNotes((current) => ({
									...current,
									[credit.id]: event.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary",
								type: "submit",
								children: "Record payment"
							})
						]
					})]
				}, credit.id))
			}),
			open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No open credit."
			}) : null,
			closed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-lg font-semibold",
					children: "Cleared"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: closed.map((credit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							credit.customerName,
							" · ",
							credit.receiptNo
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num",
							children: money(credit.amount, settings.currency)
						})]
					}, credit.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { CreditsPage as component };
