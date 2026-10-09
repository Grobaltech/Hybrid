import { Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, d as formatWhen, r as Page } from "./ui-B3DByBpp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activity-BNKtx1a7.js
var import_jsx_runtime = require_jsx_runtime();
function ActivityPage() {
	const audit = useShop((state) => state.audit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Shop",
		title: "Activity",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2",
			children: audit.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold",
						children: [
							row.username,
							" · ",
							row.action
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: row.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							formatWhen(row.at),
							" · ",
							row.page
						]
					})
				]
			}, row.id))
		})
	});
}
//#endregion
export { ActivityPage as component };
