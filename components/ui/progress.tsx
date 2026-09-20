"use client";
import type { ComponentProps } from "react";
import { Progress as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export function Progress({ className, value = 0, max = 100, ...props }: ComponentProps<typeof Primitive.Root>) { const maximum = max > 0 ? max : 100; const normalized = value == null ? null : Math.min(maximum, Math.max(0, value)); return <Primitive.Root {...props} max={maximum} value={normalized} className={cn("h-2 overflow-hidden rounded-full bg-surface-container-high", className)}><Primitive.Indicator className={cn("h-full rounded-full bg-secondary transition-[width] duration-300 motion-reduce:transition-none", normalized === null && "animate-pulse motion-reduce:animate-none")} style={{ width: normalized === null ? "40%" : `${normalized / maximum * 100}%` }} /></Primitive.Root>; }
