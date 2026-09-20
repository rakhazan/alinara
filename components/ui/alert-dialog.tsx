"use client";
import type { ComponentProps } from "react";
import { AlertDialog as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
export const AlertDialog = Primitive.Root;
export const AlertDialogTrigger = Primitive.Trigger;
export function AlertDialogContent({ className, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Portal><Primitive.Overlay className="ui-overlay fixed inset-0 z-[110] bg-primary/45 backdrop-blur-sm" /><Primitive.Content {...props} className={cn("ui-modal fixed left-1/2 top-1/2 z-[111] max-h-[90dvh] w-[min(440px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-surface p-6 text-primary shadow-xl", className)} /></Primitive.Portal>; }
export function AlertDialogTitle({ className, ...props }: ComponentProps<typeof Primitive.Title>) { return <Primitive.Title {...props} className={cn("font-display text-xl", className)} />; }
export function AlertDialogDescription({ className, ...props }: ComponentProps<typeof Primitive.Description>) { return <Primitive.Description {...props} className={cn("mt-4 text-sm leading-relaxed text-on-surface-variant", className)} />; }
export function AlertDialogCancel({ className, ...props }: ComponentProps<typeof Primitive.Cancel>) { return <Primitive.Cancel {...props} className={cn(buttonVariants({ variant: "outline" }), className)} />; }
export function AlertDialogAction({ className, ...props }: ComponentProps<typeof Primitive.Action>) { return <Primitive.Action {...props} className={cn(buttonVariants({ variant: "destructive" }), className)} />; }
