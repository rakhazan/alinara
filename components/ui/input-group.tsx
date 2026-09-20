import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function InputGroup({ className, ...props }: ComponentProps<"div">) { return <div {...props} className={cn("flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary [&_input]:border-0 [&_input]:bg-transparent [&_input]:focus-visible:outline-none", className)} />; }
export function InputGroupAddon({ className, ...props }: ComponentProps<"span">) { return <span {...props} className={cn("flex shrink-0 items-center px-3 text-sm text-on-surface-variant", className)} />; }
