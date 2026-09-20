"use client";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
export default function UIProvider({ children }: { children: ReactNode }) { return <MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}><TooltipProvider delayDuration={400}>{children}<Toaster /></TooltipProvider></MotionConfig>; }
