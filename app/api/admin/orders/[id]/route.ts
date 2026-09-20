import { withDb } from "@/db/client";
import { changeOrderStatus } from "@/lib/commerce/order-transaction";
import { isAdmin } from "@/lib/server/auth";
import { sameOrigin, readJson } from "@/lib/server/http";
import { z } from "zod";
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!sameOrigin(request) || !await isAdmin()) return new Response(null, { status: 403 });
  try {
    const id = z.uuid().parse((await params).id);
    const { status } = z.object({ status: z.enum(["confirmed", "shipped", "cancelled"]) }).parse(await readJson(request, 1000));
    await withDb((db) => changeOrderStatus(db, id, status));
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Status tidak dapat diubah." }, { status: 409 }); }
}
