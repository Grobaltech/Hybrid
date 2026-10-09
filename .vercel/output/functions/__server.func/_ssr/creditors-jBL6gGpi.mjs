import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, p as money, r as Page, s as TextField, t as Banner } from "./ui-B3DByBpp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/creditors-jBL6gGpi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreditorsPage() {
	const creditors = useShop((state) => state.creditors);
	const settings = useShop((state) => state.settings);
	const addCreditor = useShop((state) => state.addCreditor);
	const payCreditor = useShop((state) => state.payCreditor);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [total, setTotal] = (0, import_react.useState)(0);
	const [paid, setPaid] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Books",
		title: "Creditors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card grid gap-3 p-4 sm:grid-cols-2",
			onSubmit: (event) => {
				event.preventDefault();
				const result = addCreditor({
					name,
					phone,
					description,
					totalCredit: total,
					amountPaid: paid
				});
				if (!result.ok) {
					setError(result.error);
					return;
				}
				setName("");
				setPhone("");
				setDescription("");
				setTotal(0);
				setPaid(0);
				setError("");
				toast.success("Creditor saved");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Name",
					value: name,
					onChange: (event) => setName(event.target.value),
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Phone",
					value: phone,
					onChange: (event) => setPhone(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Note",
					value: description,
					onChange: (event) => setDescription(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Total owed to them",
					type: "number",
					min: 0,
					value: total,
					onChange: (event) => setTotal(Number(event.target.value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Already paid",
					type: "number",
					min: 0,
					value: paid,
					onChange: (event) => setPaid(Number(event.target.value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						type: "submit",
						children: "Save creditor"
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
						tone: "danger",
						children: error
					})
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-3",
			children: creditors.map((creditor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: creditor.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							creditor.description || "No note",
							" ",
							creditor.phone ? `· ${creditor.phone}` : ""
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num text-lg font-semibold",
						children: money(creditor.balance, settings.currency)
					})]
				}), creditor.balance > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 flex flex-wrap gap-2",
					onSubmit: (event) => {
						event.preventDefault();
						const data = new FormData(event.currentTarget);
						const result = payCreditor(creditor.id, Number(data.get("amount")), String(data.get("note") ?? ""));
						if (!result.ok) {
							toast.error(result.error);
							return;
						}
						event.currentTarget.reset();
						toast.success("Repayment saved");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field max-w-40",
							name: "amount",
							type: "number",
							min: 1,
							placeholder: "Pay",
							"aria-label": "Repayment amount",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field max-w-56",
							name: "note",
							placeholder: "Note"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-navy",
							type: "submit",
							children: "Pay"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ok",
					children: "Settled"
				})]
			}, creditor.id))
		})]
	});
}
//#endregion
export { CreditorsPage as component };
