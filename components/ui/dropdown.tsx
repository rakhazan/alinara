"use client";
import type { ComponentProps } from "react";
import { DropdownMenu as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export const Dropdown = Primitive.Root;
export const DropdownTrigger = Primitive.Trigger;
export function DropdownContent({ className, sideOffset = 8, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Portal><Primitive.Content sideOffset={sideOffset} collisionPadding={12} {...props} className={cn("ui-popup z-[120] min-w-44 rounded-xl border border-outline-variant bg-surface p-1.5 shadow-lg", className)} /></Primitive.Portal>; }
export function DropdownItem({ className, destructive, ...props }: ComponentProps<typeof Primitive.Item> & { destructive?: boolean }) { return <Primitive.Item {...props} className={cn("cursor-pointer rounded-lg px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-surface-container data-[disabled]:pointer-events-none data-[disabled]:opacity-50", destructive ? "text-error" : "text-primary", className)} />; }
export function DropdownSeparator({ className, ...props }: ComponentProps<typeof Primitive.Separator>) { return <Primitive.Separator {...props} className={cn("my-1 h-px bg-outline-variant", className)} />; }
