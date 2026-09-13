import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const logoVariants = cva("uppercase tracking-wider font-display", {
  variants: {
    size: {
      sm: "text-xl",
      md: "text-3xl",
      lg: "text-5xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type LogoProps = VariantProps<typeof logoVariants> & {
  className?: string;
};

const Logo = ({ size, className }: LogoProps) => {
  return <h1 className={cn(logoVariants({ size }), className)}>ALINARA</h1>;
};

export default Logo;
