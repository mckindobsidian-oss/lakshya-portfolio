import logoImg from "../assets/logo.png";

type BrandLogoProps = {
  className?: string;
  size?: number;
};

/**
 * Clean Minimalist "LG" Logo for Lakshya Gupta (from uploaded image).
 */
export default function BrandLogo({ className = "h-9 w-9", size = 36 }: BrandLogoProps) {
  return (
    <img
      src={logoImg}
      alt="Lakshya Gupta Logo"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`rounded-xl object-contain bg-black shadow-xs shrink-0 select-none transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
    />
  );
}
