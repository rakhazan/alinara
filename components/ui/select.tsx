import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { inputStyles } from "./input";
/** Native select preserves mobile pickers, form submission and keyboard navigation. */
export function Select({ className, children, ...props }: ComponentProps<"select">) { return <select {...props} className={cn(inputStyles, "cursor-pointer", className)}>{children}</select>; }
