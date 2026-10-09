import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, r as Page, s as TextField, t as Banner } from "./ui-B3DByBpp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suppliers-BI0oulUt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SuppliersPage() {
	const suppliers = useShop((state) => state.suppliers);
	const upsertSupplier = useShop((state) => state.upsertSupplier);
	const deleteSupplier = useShop((state) => state.deleteSupplier);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Stock",
		title: "Suppliers",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card grid gap-3 p-4 sm:grid-cols-4",
			onSubmit: (event) => {
				event.preventDefault();
				const result = upsertSupplier({
					name,
					phone,
					email
				});
				if (!result.ok) {
					setError(result.error);
					return;
				}
				setName("");
				setPhone("");
				setEmail("");
				setError("");
				toast.success("Supplier saved");
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
					label: "Email",
					type: "email",
					value: email,
					onChange: (event) => setEmail(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary w-full",
						type: "submit",
						children: "Add supplier"
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
						tone: "danger",
						children: error
					})
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-3 sm:grid-cols-2",
			children: suppliers.map((supplier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card flex items-start justify-between gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: supplier.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: supplier.phone || "No phone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: supplier.email || "No email"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-ghost btn-sm",
					onClick: () => deleteSupplier(supplier.id),
					children: "Remove"
				})]
			}, supplier.id))
		})]
	});
}
//#endregion
export { SuppliersPage as component };
