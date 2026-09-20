import "server-only";
export { sameOrigin } from "@/lib/commerce/origin";
export async function readJson(request: Request, maxBytes = 50000): Promise<unknown> {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new Error("INVALID_BODY");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("INVALID_BODY");
  const chunks: Uint8Array[] = []; let total = 0;
  for (;;) { const { value, done } = await reader.read(); if (done) break; total += value.byteLength; if (total > maxBytes) { await reader.cancel(); throw new Error("INVALID_BODY"); } chunks.push(value); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
