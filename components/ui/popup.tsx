"use client";
import type { ComponentProps } from "react";
import { Popover as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export const Popup = Primitive.Root;
export const PopupTrigger = Primitive.Trigger;
export const PopupClose = Primitive.Close;
export function PopupContent({ className, sideOffset = 12, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Portal><Primitive.Content sideOffset={sideOffset} collisionPadding={16} {...props} className={cn("ui-popup z-[120] max-h-[var(--radix-popover-content-available-height)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-outline-variant bg-surface p-5 text-primary shadow-xl outline-none", className)} /></Primitive.Portal>; }
