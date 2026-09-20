// Disposable local credentials: never reads or prints real admin secrets.
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
const key = randomBytes(32).toString("hex");
const base = "http://127.0.0.1:3101";
const server = spawn("node", ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3101"], { env: { ...process.env, NODE_ENV: "production", DATABASE_URL: "", ADMIN_ACCESS_KEY: key, AUTH_SECRET: randomBytes(32).toString("hex"), CHECKOUT_ENABLED: "false" }, stdio: "ignore" });
try {
  let ready = false;
  for (let i = 0; i < 100; i++) { try { const response = await fetch(base + "/admin/login"); if (response.ok) { ready = true; break; } } catch {} await new Promise((resolve) => setTimeout(resolve, 100)); }
  if (!ready) throw new Error("Local server did not start");
  const denied = await fetch(base + "/admin", { redirect: "manual" });
  if (denied.status !== 307) throw new Error(`Expected redirect, got ${denied.status}`);
  const login = await fetch(base + "/api/admin/session", { method: "POST", headers: { Origin: base, "Content-Type": "application/json" }, body: JSON.stringify({ key }) });
  if (!login.ok) throw new Error(`Login failed: ${login.status}`);
  const cookie = login.headers.get("set-cookie")?.split(";")[0];
  if (!cookie) throw new Error("Missing session cookie");
  const admin = await fetch(base + "/admin", { headers: { Cookie: cookie }, redirect: "manual" });
  if (admin.status !== 200) throw new Error(`Authenticated admin failed: ${admin.status}`);
  const forged = await fetch(base + "/admin", { headers: { Cookie: "alinara_admin=forged" }, redirect: "manual" });
  if (forged.status !== 307) throw new Error("Forged session accepted");
  const logout = await fetch(base + "/api/admin/session", { method: "DELETE", headers: { Origin: base, Cookie: cookie } });
  if (!logout.ok || !logout.headers.get("set-cookie")?.includes("alinara_admin=")) throw new Error("Logout failed");
  console.log("PASS unauthenticated redirect, valid login, authenticated admin, forged token rejection, logout");
} finally { server.kill("SIGTERM"); }
