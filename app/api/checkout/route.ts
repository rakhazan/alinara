import { readJson, sameOrigin } from "@/lib/server/http";
import { checkoutSchema } from "@/lib/commerce/validation";
import { placeOrder, CheckoutError, checkoutConfig } from "@/lib/server/checkout";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  if (!checkoutConfig().enabled) return Response.json({ error: "Pemesanan belum tersedia." }, { status: 503 });
  let input;
  try { input = checkoutSchema.parse(await readJson(request, 20000)); } catch { return Response.json({ error: "Periksa alamat, kontak, dan isi keranjang." }, { status: 400 }); }
  try { return Response.json(await placeOrder(input, request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"), { status: 201 }); }
  catch (error) { return Response.json({ error: error instanceof CheckoutError ? error.message : "Pesanan belum dapat diproses. Coba kembali dengan form yang sama." }, { status: error instanceof CheckoutError ? 409 : 500 }); }
}
