import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const itemVariants = cva("flex items-center gap-4 rounded-xl p-4", { variants: { variant: { default: "bg-transparent", muted: "bg-surface-container-low", outline: "border border-outline-variant" } }, defaultVariants: { variant: "default" } });
export function Item({ className, variant, ...props }: ComponentProps<"div"> & VariantProps<typeof itemVariants>) { return <div {...props} className={cn(itemVariants({ variant }), className)} />; }
export function ItemContent({ className, ...props }: ComponentProps<"div">) { return <div {...props} className={cn("min-w-0 flex-1", className)} />; }
export function ItemTitle({ className, ...props }: ComponentProps<"p">) { return <p {...props} className={cn("text-sm font-semibold text-primary", className)} />; }
export function ItemDescription({ className, ...props }: ComponentProps<"p">) { return <p {...props} className={cn("mt-1 text-xs text-on-surface-variant", className)} />; }
