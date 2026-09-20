"use client";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
export default function UIProvider({ children }: { children: ReactNode }) { return <TooltipProvider delayDuration={400}>{children}<Toaster /></TooltipProvider>; }
