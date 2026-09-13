import { Size } from "@/lib/types";

type LogoProps = {
  className?: string;
  size?: Exclude<Size, "xs" | "xl">; // Exclude "xs" and "xl" sizes
};

const Logo = ({ size = "md", className }: LogoProps) => {
  const logoSize: Record<Exclude<Size, "xs" | "xl">, string> = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <h1
      className={`uppercase ${logoSize[size]} tracking-wider font-display ${className}`}
    >
      ALINARA
    </h1>
  );
};

export default Logo;
