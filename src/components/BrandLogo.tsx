import logoImg from "../assets/logo.png";

type BrandLogoProps = {
  className?: string;
  size?: number;
};

/**
 * Clean Minimalist "LG" Logo for Lakshya Gupta (from uploaded image).
 */
export default function BrandLogo({ className = "h-12 w-12", size = 48 }: BrandLogoProps) {
  return (
    <img
      src={logoImg}
      alt="Lakshya Gupta"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`object-contain shrink-0 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] ${className}`}
    />
  );
}
