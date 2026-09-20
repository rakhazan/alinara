import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
export function StatusBadge({ status }: { status: "draft" | "published" }) { return <Badge variant={status === "published" ? "accent" : "muted"}>{status === "published" ? "Published" : "Draft"}</Badge>; }
export function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) { return <div className="mb-8 flex flex-wrap items-start justify-between gap-4"><div><p className="mb-2 text-xs uppercase tracking-[.18em] text-secondary">Alinara Studio</p><h1 className="font-display text-3xl text-primary">{title}</h1><p className="mt-3 max-w-xl text-sm text-on-surface-variant">{description}</p></div>{action}</div>; }
export function StatCard({ label, value, note }: { label: string; value: number; note: string }) { return <Card className="p-6"><p className="text-sm text-on-surface-variant">{label}</p><p className="mt-4 font-display text-4xl text-primary">{value}</p><p className="mt-3 text-xs text-secondary">{note}</p></Card>; }
export { Input } from "@/components/ui/input";
export { FormField } from "@/components/ui/field";
export { DataTable } from "@/components/ui/data-table";
