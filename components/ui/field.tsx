import type { ReactNode } from "react";
export function FormField({ label, children, htmlFor }: { label: string; children: ReactNode; htmlFor?: string }) { return <label htmlFor={htmlFor} className="grid gap-2 text-sm font-medium text-primary">{label}{children}</label>; }
