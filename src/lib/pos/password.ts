export async function digestPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`hybrid-pos:${password}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
