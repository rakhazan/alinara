"use client";
import type { ComponentProps } from "react";
import { Checkbox as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export function Checkbox({ className, ...props }: ComponentProps<typeof Primitive.Root>) { return <Primitive.Root {...props} className={cn("grid size-5 shrink-0 place-items-center rounded border border-outline data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-on-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-on-primary disabled:opacity-50", className)}><Primitive.Indicator aria-hidden="true" className="text-xs">✓</Primitive.Indicator></Primitive.Root>; }
