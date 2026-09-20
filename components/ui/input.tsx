import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export const inputStyles = "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm text-primary transition-colors placeholder:text-on-surface-variant/70 focus-visible:outline-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error motion-reduce:transition-none";
export function Input({ className, ...props }: ComponentProps<"input">) { return <input {...props} className={cn(inputStyles, className)} />; }
export function Textarea({ className, ...props }: ComponentProps<"textarea">) { return <textarea {...props} className={cn(inputStyles, "min-h-28 resize-y", className)} />; }
