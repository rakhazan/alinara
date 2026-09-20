"use client";
import type { ComponentProps } from "react";
import { Tabs as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export const Tabs = Primitive.Root;
export function TabsList({ className, ...props }: ComponentProps<typeof Primitive.List>) { return <Primitive.List {...props} className={cn("flex flex-wrap gap-1 border-b border-outline-variant", className)} />; }
export function TabsTrigger({ className, ...props }: ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Trigger {...props} className={cn("border-b-2 border-transparent px-4 py-3 text-sm text-on-surface-variant transition-colors data-[state=active]:border-secondary data-[state=active]:text-primary disabled:opacity-50", className)} />; }
export function TabsContent({ className, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Content {...props} className={cn("mt-6 focus-visible:outline-none", className)} />; }
