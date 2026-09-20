"use client";

import { Slot } from "radix-ui";
import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "border-transparent bg-primary text-on-primary enabled:hover:bg-primary-container",
  secondary:
    "border-transparent bg-secondary text-on-secondary enabled:hover:bg-on-secondary-fixed-variant",
  outline:
    "border-outline bg-transparent text-primary enabled:hover:bg-surface-container",
  ghost:
    "border-transparent bg-transparent text-primary enabled:hover:bg-surface-container",
  destructive:
    "border-transparent bg-error text-on-error enabled:hover:bg-on-error-container",
} as const;

const sizes = {
  sm: "h-9 gap-2 px-3 text-xs",
  md: "h-11 gap-2 px-5 text-sm",
  lg: "h-12 gap-3 px-7 text-base",
  icon: "size-11 p-0",
  "icon-sm": "size-9 p-0",
} as const;

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm border font-semibold transition-[color,background-color,border-color,transform] duration-200 enabled:active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: variants,
      size: sizes,
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

/** Icon-only buttons must include an accessible name via aria-label. */
export function Button({
  asChild = false,
  variant,
  size,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";
  return (
    <Component
      {...props}
      {...(!asChild ? { type } : {})}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}

export default Button;
