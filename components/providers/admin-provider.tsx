"use client";
import { createContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { AdminRecord } from "@/lib/admin/data";
type AdminStore = { data: Record<string, AdminRecord[]>; save: (section: string, record: AdminRecord) => Promise<boolean>; remove: (section: string, id: string) => Promise<boolean> };
export const AdminContext = createContext<AdminStore | null>(null);
export default function AdminProvider({ initial, children }: { initial: Record<string, AdminRecord[]> | null; children: ReactNode }) {
  const [data, setData] = useState(initial);
  const router = useRouter();
  useEffect(() => { // Server refreshes must not overwrite unsaved form input; only records update.
    queueMicrotask(() => setData(initial));
  }, [initial]);
  if (!data) return children;
  async function mutate(section: string, body: unknown, method: string) { try { const response = await fetch(`/api/admin/data/${section}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); if (!response.ok) return false; router.refresh(); return true; } catch { return false; } }
  return <AdminContext.Provider value={{ data, async save(section, record) { const ok = await mutate(section, record, "POST"); if (ok) setData((current) => current && ({ ...current, [section]: [record, ...current[section].filter((item) => item.id !== record.id)] })); return ok; }, async remove(section, id) { const ok = await mutate(section, { id }, "DELETE"); if (ok) setData((current) => current && ({ ...current, [section]: section === "products" ? current[section].map((item) => item.id === id ? { ...item, status: "draft" } : item) : current[section].filter((item) => item.id !== id) })); return ok; } }}>{children}</AdminContext.Provider>;
}
