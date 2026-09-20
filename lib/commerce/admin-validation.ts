import { z } from "zod";
import { sections } from "@/lib/admin/data";
import { colorsSchema, imagePath, safeHref } from "./validation";
export function parseAdminRecord(section: string, input: unknown) {
  const config = sections[section];
  if (!config) throw new Error("Modul tidak dikenal.");
  const shape: Record<string, z.ZodType> = { id: z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/), title: z.string().trim().min(1).max(200), status: z.enum(["draft", "published"]), updatedAt: z.string().optional() };
  for (const field of config.fields) {
    if (field.key.startsWith("image")) shape[field.key] = imagePath.default("");
    else if (field.key === "href") shape[field.key] = safeHref.default("");
    else if (field.type === "number") shape[field.key] = z.string().regex(/^\d+$/).refine((value) => Number.isSafeInteger(Number(value)) && Number(value) <= (field.key === "rating" ? 5 : 100000000) && Number(value) >= (field.key === "rating" ? 1 : 0));
    else shape[field.key] = z.string().trim().min(field.required ? 1 : 0).max(20000).default("");
  }
  const result = z.object(shape).parse(input) as Record<string, string>;
  if (section === "products") result.colors = JSON.stringify(colorsSchema.parse(JSON.parse(result.colors)));
  return result;
}
