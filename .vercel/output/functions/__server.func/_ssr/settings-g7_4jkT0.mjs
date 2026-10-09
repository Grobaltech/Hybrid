import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, r as Page, s as TextField, t as Banner } from "./ui-B3DByBpp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-g7_4jkT0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const settings = useShop((state) => state.settings);
	const updateSettings = useShop((state) => state.updateSettings);
	const importBackup = useShop((state) => state.importBackup);
	const resetBooks = useShop((state) => state.resetBooks);
	const snapshot = useShop((state) => state);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	function exportBooks() {
		const payload = {
			schema: 1,
			users: snapshot.users,
			products: snapshot.products,
			suppliers: snapshot.suppliers,
			sales: snapshot.sales,
			credits: snapshot.credits,
			expenses: snapshot.expenses,
			purchases: snapshot.purchases,
			creditors: snapshot.creditors,
			audit: snapshot.audit,
			settings: snapshot.settings,
			sessionUserId: null
		};
		const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "hybrid-phone-counter.json";
		link.click();
		URL.revokeObjectURL(url);
		toast.success("Backup downloaded");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Shop",
		title: "Settings",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card grid gap-3 p-4 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					const data = new FormData(event.currentTarget);
					updateSettings({
						companyName: String(data.get("companyName") ?? ""),
						companyAddress: String(data.get("companyAddress") ?? ""),
						companyPhone: String(data.get("companyPhone") ?? ""),
						companyEmail: String(data.get("companyEmail") ?? ""),
						currency: String(data.get("currency") ?? "UGX"),
						taxRate: Number(data.get("taxRate") ?? 0),
						lowStock: Number(data.get("lowStock") ?? 5)
					});
					setNotice("Shop details saved on this device.");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Shop name",
						name: "companyName",
						defaultValue: settings.companyName,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Address",
						name: "companyAddress",
						defaultValue: settings.companyAddress
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Phone",
						name: "companyPhone",
						defaultValue: settings.companyPhone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Email",
						name: "companyEmail",
						type: "email",
						defaultValue: settings.companyEmail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Currency",
						name: "currency",
						defaultValue: settings.currency
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Default tax %",
						name: "taxRate",
						type: "number",
						min: 0,
						step: "0.01",
						defaultValue: settings.taxRate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Low stock at",
						name: "lowStock",
						type: "number",
						min: 0,
						defaultValue: settings.lowStock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary",
							type: "submit",
							children: "Save details"
						})
					}),
					notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
							tone: "ok",
							children: notice
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Move the books"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Each phone, PC, and browser keeps its own copy. Download a backup here, then import it on the other device. Staff passwords travel with the file."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-navy",
							onClick: exportBooks,
							children: "Download backup"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "btn btn-line",
							children: ["Import backup", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "sr-only",
								type: "file",
								accept: "application/json",
								onChange: (event) => {
									const file = event.target.files?.[0];
									if (!file) return;
									file.text().then((text) => {
										try {
											const result = importBackup(JSON.parse(text));
											if (!result.ok) setError(result.error);
											else {
												setError("");
												toast.success("Backup imported. Sign in again.");
											}
										} catch {
											setError("Couldn't read that file.");
										}
									});
								}
							})]
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Restore the original books"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Puts back the Pioneer Mall snapshot and drops sales made on this device."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-danger mt-3",
						onClick: () => {
							if (window.confirm("Replace the books on this device with the original shop snapshot?")) {
								resetBooks();
								toast.success("Books restored");
							}
						},
						children: "Restore snapshot"
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
