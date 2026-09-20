import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const cardVariants = cva("rounded-2xl text-on-surface", { variants: { variant: { default: "border border-outline-variant/50 bg-surface-container-lowest shadow-sm", muted: "bg-surface-container-low", elevated: "border border-outline-variant/50 bg-surface-container-lowest shadow-lg" } }, defaultVariants: { variant: "default" } });
export function Card({ className, variant, ...props }: ComponentProps<"div"> & VariantProps<typeof cardVariants>) { return <div {...props} className={cn(cardVariants({ variant }), className)} />; }
export function CardHeader({ className, ...props }: ComponentProps<"div">) { return <div {...props} className={cn("space-y-2 p-6", className)} />; }
export function CardTitle({ className, ...props }: ComponentProps<"h2">) { return <h2 {...props} className={cn("font-display text-xl text-primary", className)} />; }
export function CardDescription({ className, ...props }: ComponentProps<"p">) { return <p {...props} className={cn("text-sm leading-relaxed text-on-surface-variant", className)} />; }
export function CardContent({ className, ...props }: ComponentProps<"div">) { return <div {...props} className={cn("p-6 pt-0", className)} />; }
export function CardFooter({ className, ...props }: ComponentProps<"div">) { return <div {...props} className={cn("flex items-center gap-3 p-6 pt-0", className)} />; }
