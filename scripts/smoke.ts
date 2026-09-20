// Run against a local production server with checkout disabled and no admin credentials.
export {};
const base = process.env.SMOKE_URL ?? "http://localhost:3100";
const pages = ["/", "/products", "/products/mulberry-silk", "/cart", "/checkout", "/admin/login"];
for (const path of pages) { const response = await fetch(base + path); if (response.status !== 200) throw new Error(`${path}: ${response.status}`); console.log(`PASS ${path}`); }
for (const path of ["/admin", "/admin/products"]) { const response = await fetch(base + path); if (!response.url.endsWith("/admin/login")) throw new Error(`Admin not protected: ${path}`); console.log(`PASS ${path} redirects to login`); }
for (const [path, expected] of [["/api/checkout", 503], ["/api/admin/data/products", 403], ["/api/admin/session", 503]] as const) {
  const response = await fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: base }, body: JSON.stringify({ key: "invalid" }) });
  if (response.status !== expected) throw new Error(`${path}: expected ${expected}, got ${response.status}`);
  console.log(`PASS ${path}: ${response.status}`);
}
const crossOrigin = await fetch(base + "/api/checkout", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://example.invalid" }, body: "{}" });
if (crossOrigin.status !== 403) throw new Error("Cross-origin checkout must be rejected");
console.log("PASS cross-origin checkout rejected");
