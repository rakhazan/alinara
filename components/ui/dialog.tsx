"use client";
import type { ComponentProps } from "react";
import { Dialog as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;
export function DialogContent({ className, children, variant = "default", ...props }: ComponentProps<typeof Primitive.Content> & { variant?: "default" | "custom" }) { return <Primitive.Portal><Primitive.Overlay className="ui-overlay fixed inset-0 z-[100] bg-primary/45 backdrop-blur-sm" /><Primitive.Content {...props} className={cn("fixed z-[101] outline-none", variant === "default" && "ui-modal left-1/2 top-1/2 max-h-[90dvh] w-[min(640px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-surface p-6 text-primary shadow-xl", className)}>{children}</Primitive.Content></Primitive.Portal>; }
export function DialogTitle({ className, ...props }: ComponentProps<typeof Primitive.Title>) { return <Primitive.Title {...props} className={cn("font-display text-2xl text-primary", className)} />; }
export function DialogDescription({ className, ...props }: ComponentProps<typeof Primitive.Description>) { return <Primitive.Description {...props} className={cn("mt-2 text-sm leading-relaxed text-on-surface-variant", className)} />; }
export function DialogHeader({ className, ...props }: ComponentProps<"div">) { return <div {...props} className={cn("mb-6", className)} />; }
export function DialogFooter({ className, ...props }: ComponentProps<"div">) { return <div {...props} className={cn("mt-6 flex justify-end gap-3", className)} />; }
