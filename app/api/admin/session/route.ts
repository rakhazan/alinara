import { cookies } from "next/headers";
import { authConfigured, COOKIE, createSession, validKey } from "@/lib/server/auth";
import { readJson, sameOrigin } from "@/lib/server/http";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Permintaan tidak diizinkan." }, { status: 403 });
  if (!authConfigured()) return Response.json({ error: "Akses admin belum dikonfigurasi." }, { status: 503 });
  try {
    const body = await readJson(request, 2000) as { key?: unknown };
    if (typeof body?.key !== "string" || !validKey(body.key)) return Response.json({ error: "Kunci akses tidak valid." }, { status: 401 });
    (await cookies()).set(COOKIE, await createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 28800 });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Tidak dapat masuk." }, { status: 400 }); }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  (await cookies()).delete(COOKIE);
  return Response.json({ ok: true });
}
