import { cva, type VariantProps } from "class-variance-authority";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export const iconVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type HIconProps = VariantProps<typeof iconVariants> & {
  className?: string;
  icon: IconSvgElement;
  color?: string;
  stroke?: number;
};

export const HIcon = ({ icon, size, className, color, stroke }: HIconProps) => {
  return (
    <HugeiconsIcon
      className={cn(iconVariants({ size }), className)}
      icon={icon}
      color={color || "currentColor"}
      strokeWidth={stroke || 1}
    />
  );
};
