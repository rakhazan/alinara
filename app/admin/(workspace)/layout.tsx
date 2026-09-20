import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/auth";
import { getAdminData } from "@/lib/server/admin";
import AdminShell from "@/components/admin/shell";
import AdminProvider from "@/components/providers/admin-provider";
export const dynamic = "force-dynamic";
export default async function Layout({ children }: { children: React.ReactNode }) {
  if (!await isAdmin()) redirect("/admin/login");
  const initial = process.env.DATABASE_URL ? await getAdminData() : null;
  return <AdminProvider initial={initial}><AdminShell>{children}</AdminShell></AdminProvider>;
}
