import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const loaderVariants = cva("inline-block shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none", { variants: { size: { sm: "size-4", md: "size-6", lg: "size-10" } }, defaultVariants: { size: "md" } });
export function Loader({ size, className, label = "Memuat…", ...props }: ComponentProps<"span"> & VariantProps<typeof loaderVariants> & { label?: string }) { return <span role="status" {...props} className={cn("inline-flex items-center justify-center", className)}><span aria-hidden="true" className={loaderVariants({ size })} /><span className="sr-only">{label}</span></span>; }
export function Skeleton({ className, ...props }: ComponentProps<"div">) { return <div aria-hidden="true" {...props} className={cn("animate-pulse rounded-lg bg-surface-container motion-reduce:animate-none", className)} />; }
