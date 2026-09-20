"use client";
import { Toaster as Sonner, toast } from "sonner";
export { toast };
export function Toaster() { return <Sonner position="bottom-right" closeButton toastOptions={{ classNames: { toast: "!border-outline-variant !bg-surface !text-primary !rounded-xl !shadow-lg", description: "!text-on-surface-variant", actionButton: "!bg-primary !text-on-primary" } }} />; }
