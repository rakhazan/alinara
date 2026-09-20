import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const alertVariants = cva("rounded-xl border p-4 text-sm leading-relaxed", { variants: { variant: { default: "border-outline-variant bg-surface-container-low text-on-surface", success: "border-secondary-container bg-secondary-container/40 text-on-secondary-fixed", destructive: "border-error/25 bg-error-container/40 text-on-error-container" } }, defaultVariants: { variant: "default" } });
export function Alert({ className, variant, role = "status", ...props }: ComponentProps<"div"> & VariantProps<typeof alertVariants>) { return <div role={role} {...props} className={cn(alertVariants({ variant }), className)} />; }
export function AlertTitle({ className, ...props }: ComponentProps<"h3">) { return <h3 {...props} className={cn("mb-1 font-semibold", className)} />; }
export function AlertDescription({ className, ...props }: ComponentProps<"div">) { return <div {...props} className={cn("text-sm", className)} />; }
