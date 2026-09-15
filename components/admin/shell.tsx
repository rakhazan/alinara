"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/lib/admin/data";
import { cn } from "@/lib/utils";
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div className="min-h-dvh bg-surface lg:grid lg:grid-cols-[240px_1fr]">
    <aside className="bg-primary-container p-5 text-on-primary lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:p-7"><Link href="/admin" className="font-display text-2xl tracking-wider">ALINARA<span className="mt-1 block font-sans text-[10px] tracking-[.25em] text-secondary-container">ADMIN STUDIO</span></Link><nav aria-label="Navigasi admin" className="mt-6 flex gap-2 overflow-x-auto lg:flex-col">{[{ href: "/admin", title: "Overview" }, ...Object.entries(sections).map(([key, item]) => ({ href: `/admin/${key}`, title: item.title }))].map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={cn("shrink-0 rounded-lg px-3 py-3 text-sm hover:bg-white/10", pathname === item.href && "bg-secondary text-on-secondary")}>{item.title}</Link>)}</nav><Link href="/" className="mt-8 hidden text-xs text-secondary-container lg:block">↗ Lihat situs publik</Link></aside>
    <div className="min-w-0"><header className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/50 px-5 py-4 lg:px-10"><p className="text-xs text-on-surface-variant">Mode prototipe · Data tersimpan di browser · Belum terhubung ke situs publik</p><Link href="/" className="text-xs font-semibold text-secondary">Lihat situs ↗</Link></header><main className="mx-auto max-w-[1500px] p-5 lg:p-10">{children}</main></div>
  </div>;
}
