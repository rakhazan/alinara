import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const badgeVariants = cva("inline-flex rounded-full px-3 py-1 text-xs font-medium", { variants: { variant: { default: "bg-primary-container text-on-primary", muted: "bg-surface-container-high text-on-surface-variant", accent: "bg-secondary-container text-on-secondary-fixed", destructive: "bg-error-container text-on-error-container" } }, defaultVariants: { variant: "default" } });
export function Badge({ className, variant, ...props }: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) { return <span {...props} className={cn(badgeVariants({ variant }), className)} />; }
