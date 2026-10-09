//#region node_modules/.nitro/vite/services/ssr/assets/password-Mxz4nyqg.js
async function digestPassword(password) {
	const data = new TextEncoder().encode(`hybrid-pos:${password}`);
	const buf = await crypto.subtle.digest("SHA-256", data);
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
//#endregion
export { digestPassword as t };
