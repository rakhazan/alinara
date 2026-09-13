import { Size } from "@/lib/types";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

type HIconProps = {
  className?: string;
  icon: IconSvgElement;
  size?: Size;
  color?: string;
  stroke?: number;
};

export const HIcon = ({
  icon,
  size = "md",
  className,
  color,
  stroke,
}: HIconProps) => {
  const iconSize: Record<Size, number> = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  return (
    <HugeiconsIcon
      className={className}
      icon={icon}
      size={iconSize[size] || 24}
      color={color || "currentColor"}
      strokeWidth={stroke || 1}
    />
  );
};
