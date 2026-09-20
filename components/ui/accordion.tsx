"use client";
import type { ComponentProps } from "react";
import { Accordion as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export const Accordion = Primitive.Root;
export function AccordionItem({ className, ...props }: ComponentProps<typeof Primitive.Item>) { return <Primitive.Item {...props} className={cn("border-b border-outline-variant", className)} />; }
export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Header><Primitive.Trigger {...props} className={cn("group flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold disabled:opacity-50", className)}>{children}<span aria-hidden="true" className="transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none">⌄</span></Primitive.Trigger></Primitive.Header>; }
export function AccordionContent({ className, children, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Content {...props} className="ui-accordion overflow-hidden"><div className={cn("pb-5 text-sm leading-relaxed text-on-surface-variant", className)}>{children}</div></Primitive.Content>; }
