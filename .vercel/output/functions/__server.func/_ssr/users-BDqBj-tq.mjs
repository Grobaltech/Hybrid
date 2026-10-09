import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, r as Page, s as TextField, t as Banner } from "./ui-B3DByBpp.mjs";
import { t as digestPassword } from "./password-Mxz4nyqg.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-BDqBj-tq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UsersPage() {
	const users = useShop((state) => state.users);
	const addUser = useShop((state) => state.addUser);
	const updateUser = useShop((state) => state.updateUser);
	const deleteUser = useShop((state) => state.deleteUser);
	const setPasswordHash = useShop((state) => state.setPasswordHash);
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("cashier");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Shop",
		title: "Staff",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card grid gap-3 p-4 sm:grid-cols-2",
			onSubmit: (event) => {
				event.preventDefault();
				(async () => {
					const result = addUser({
						username,
						passwordHash: await digestPassword(password),
						role,
						phone,
						email: ""
					});
					if (!result.ok) {
						setError(result.error);
						return;
					}
					setUsername("");
					setPassword("");
					setPhone("");
					setError("");
					toast.success("Staff account added");
				})();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Username",
					value: username,
					onChange: (event) => setUsername(event.target.value),
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Password",
					type: "password",
					value: password,
					onChange: (event) => setPassword(event.target.value),
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1 block font-semibold",
						children: "Role"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "field",
						value: role,
						onChange: (event) => setRole(event.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "cashier",
								children: "Cashier — sell and collect credit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "manager",
								children: "Manager — stock and books"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "admin",
								children: "Admin — everything"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Phone",
					value: phone,
					onChange: (event) => setPhone(event.target.value)
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
						tone: "danger",
						children: error
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary",
					type: "submit",
					children: "Add staff"
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-3",
			children: users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card flex flex-wrap items-center justify-between gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: user.username
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: user.phone || "No phone"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "field w-auto",
							value: user.role,
							"aria-label": `Role for ${user.username}`,
							onChange: (event) => updateUser(user.id, { role: event.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cashier",
									children: "Cashier"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "manager",
									children: "Manager"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "admin",
									children: "Admin"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-line btn-sm",
							onClick: () => {
								const next = window.prompt(`New password for ${user.username}`);
								if (!next) return;
								digestPassword(next).then((hash) => {
									setPasswordHash(user.id, hash);
									toast.success("Password updated");
								});
							},
							children: "Reset password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost btn-sm",
							onClick: () => {
								const result = deleteUser(user.id);
								if (!result.ok) toast.error(result.error);
							},
							children: "Remove"
						})
					]
				})]
			}, user.id))
		})]
	});
}
//#endregion
export { UsersPage as component };
