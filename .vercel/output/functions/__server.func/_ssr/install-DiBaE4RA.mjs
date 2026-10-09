import { t as canAccess } from "./access-8byYH4jb.mjs";
import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, r as Page } from "./ui-B3DByBpp.mjs";
import { C as Laptop, T as Globe, c as Smartphone, v as Monitor } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/install-DiBaE4RA.js
var import_jsx_runtime = require_jsx_runtime();
var GUIDES = [
	{
		icon: Globe,
		title: "Web",
		steps: [
			"Open the shop address in Chrome, Edge, or Safari.",
			"Sign in. The books stay in that browser until you export them.",
			"Bookmark the page so the counter is one tap away."
		]
	},
	{
		icon: Monitor,
		title: "Windows",
		steps: [
			"Open the shop in Edge or Chrome.",
			"Use the install icon in the address bar (a monitor with a down arrow).",
			"Hybrid opens in its own window, like any other desktop app. Pin it to the taskbar."
		]
	},
	{
		icon: Laptop,
		title: "Mac",
		steps: [
			"Chrome or Edge: use the install icon in the address bar, then keep it in the Dock.",
			"Safari: Share, then Add to Dock.",
			"The installed app uses the same books as that browser profile."
		]
	},
	{
		icon: Smartphone,
		title: "Android",
		steps: [
			"Open the shop in Chrome.",
			"Menu, then Install app or Add to Home screen.",
			"The icon sits with your other apps and opens full screen."
		]
	},
	{
		icon: Smartphone,
		title: "iPhone & iPad",
		steps: [
			"Open the shop in Safari.",
			"Tap Share, then Add to Home Screen.",
			"Name it Hybrid and open it from the icon. iOS keeps the books on that device."
		]
	}
];
function InstallPage() {
	const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
	const canBackup = user ? canAccess(user.role, "settings") : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Shop",
		title: "Install on every counter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted",
				children: "This is one app. Publish it once, then install that same address on the shop PC, a Mac, and the phones. Books are stored on each device — download a backup in Settings and import it where you need the same till."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-3 lg:grid-cols-2",
				children: GUIDES.map((guide) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-lg font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(guide.icon, {
							className: "size-5 text-primary",
							"aria-hidden": "true"
						}), guide.title]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 grid list-decimal gap-2 pl-5 text-sm",
						children: guide.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step))
					})]
				}, guide.title))
			}),
			canBackup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/settings",
				className: "btn btn-primary mt-5",
				children: "Open backup settings"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm text-muted",
				children: "Ask an admin to export a backup from Settings when this phone should match the shop PC."
			})
		]
	});
}
//#endregion
export { InstallPage as component };
