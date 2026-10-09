import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, r as Page, s as TextField, t as Banner } from "./ui-B3DByBpp.mjs";
import { t as digestPassword } from "./password-Mxz4nyqg.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-a7E4BHLp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
	const updateUser = useShop((state) => state.updateUser);
	const setPasswordHash = useShop((state) => state.setPasswordHash);
	const [phone, setPhone] = (0, import_react.useState)(user?.phone ?? "");
	const [email, setEmail] = (0, import_react.useState)(user?.email ?? "");
	const [about, setAbout] = (0, import_react.useState)(user?.about ?? "");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Shop",
		title: "My account",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card grid max-w-xl gap-3 p-4",
			onSubmit: (event) => {
				event.preventDefault();
				(async () => {
					updateUser(user.id, {
						phone,
						email,
						about
					});
					if (password.trim()) {
						if (password.trim().length < 4) {
							setError("Use at least 4 characters.");
							return;
						}
						setPasswordHash(user.id, await digestPassword(password.trim()));
						setPassword("");
					}
					setError("");
					toast.success("Account saved");
				})();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Signed in as ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-ink",
							children: user.username
						}),
						" · ",
						user.role
					]
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "About",
					value: about,
					onChange: (event) => setAbout(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "New password",
					type: "password",
					value: password,
					onChange: (event) => setPassword(event.target.value),
					placeholder: "Leave blank to keep the current one"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
					tone: "danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary",
					type: "submit",
					children: "Save account"
				})
			]
		})
	});
}
//#endregion
export { AccountPage as component };
