"use client";
import type { ComponentProps } from "react";
import { Tooltip as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export const TooltipProvider = Primitive.Provider;
export const Tooltip = Primitive.Root;
export const TooltipTrigger = Primitive.Trigger;
export function TooltipContent({ className, sideOffset = 6, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Portal><Primitive.Content sideOffset={sideOffset} {...props} className={cn("ui-popup z-[130] max-w-64 rounded-lg bg-primary px-3 py-2 text-xs text-on-primary shadow-md", className)} /></Primitive.Portal>; }
