"use client";
import type { ComponentProps } from "react";
import { RadioGroup as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export function RadioGroup({ className, ...props }: ComponentProps<typeof Primitive.Root>) { return <Primitive.Root {...props} className={cn("grid gap-3", className)} />; }
export function Radio({ className, children, ...props }: ComponentProps<typeof Primitive.Item>) { return <Primitive.Item {...props} className={cn("grid size-5 shrink-0 place-items-center rounded-full border border-outline text-primary data-[state=checked]:border-primary disabled:opacity-50", className)}>{children ?? <Primitive.Indicator className="size-2.5 rounded-full bg-current" />}</Primitive.Item>; }
