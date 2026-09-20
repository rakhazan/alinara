import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { createHash, timingSafeEqual } from "node:crypto";
export const COOKIE = "alinara_admin";
export function authConfigured() { return (process.env.ADMIN_ACCESS_KEY?.length ?? 0) >= 32 && (process.env.AUTH_SECRET?.length ?? 0) >= 32; }
export function isLocalDemo() { return process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL && !authConfigured(); }
export function validKey(value: string) {
  return authConfigured() && timingSafeEqual(createHash("sha256").update(value).digest(), createHash("sha256").update(process.env.ADMIN_ACCESS_KEY!).digest());
}
export async function createSession() {
  if (!authConfigured()) throw new Error("AUTH_NOT_CONFIGURED");
  return new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setSubject("admin").setIssuer("alinara").setAudience("admin").setIssuedAt().setExpirationTime("8h").sign(new TextEncoder().encode(process.env.AUTH_SECRET));
}
export async function isAdmin() {
  if (isLocalDemo()) return true;
  if (!authConfigured()) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  try { const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET), { algorithms: ["HS256"], issuer: "alinara", audience: "admin" }); return payload.role === "admin"; } catch { return false; }
}
