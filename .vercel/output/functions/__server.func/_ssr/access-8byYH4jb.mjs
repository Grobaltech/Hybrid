//#region node_modules/.nitro/vite/services/ssr/assets/access-8byYH4jb.js
var MAP = {
	dashboard: "*",
	search: "*",
	sales: [
		"admin",
		"cashier",
		"manager"
	],
	receipts: [
		"admin",
		"cashier",
		"manager"
	],
	products: ["admin", "manager"],
	purchases: ["admin", "manager"],
	suppliers: ["admin", "manager"],
	credits: [
		"admin",
		"cashier",
		"manager"
	],
	creditors: ["admin", "manager"],
	expenses: ["admin", "manager"],
	reports: ["admin", "manager"],
	balance: ["admin", "manager"],
	settings: ["admin"],
	users: ["admin"],
	account: [
		"admin",
		"cashier",
		"manager"
	],
	activity: ["admin"],
	install: "*"
};
function canAccess(role, page) {
	if (role === "admin") return true;
	const allowed = MAP[page];
	return allowed === "*" || allowed.includes(role);
}
function canSeeCost(role) {
	return role === "admin" || role === "manager";
}
function pageFromPath(path) {
	if (path.startsWith("/sell")) return "sales";
	if (path.startsWith("/receipts")) return "receipts";
	if (path.startsWith("/products")) return "products";
	if (path.startsWith("/purchases")) return "purchases";
	if (path.startsWith("/suppliers")) return "suppliers";
	if (path.startsWith("/credits")) return "credits";
	if (path.startsWith("/creditors")) return "creditors";
	if (path.startsWith("/expenses")) return "expenses";
	if (path.startsWith("/reports")) return "reports";
	if (path.startsWith("/balance")) return "balance";
	if (path.startsWith("/settings")) return "settings";
	if (path.startsWith("/users")) return "users";
	if (path.startsWith("/account")) return "account";
	if (path.startsWith("/activity")) return "activity";
	if (path.startsWith("/install")) return "install";
	if (path.startsWith("/search")) return "search";
	return "dashboard";
}
//#endregion
export { canSeeCost as n, pageFromPath as r, canAccess as t };
