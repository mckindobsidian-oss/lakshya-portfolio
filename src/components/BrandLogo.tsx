import logoImg from "../assets/logo.png";

type BrandLogoProps = {
  className?: string;
  size?: number;
  variant?: "badge" | "raw";
};

/**
 * Clean Minimalist "LG" Logo for Lakshya Gupta with high-contrast dark badge.
 */
export default function BrandLogo({
  className = "h-11 w-11",
  size = 44,
  variant = "badge",
}: BrandLogoProps) {
  if (variant === "badge") {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-[#18130f] border border-[#332820] shadow-md shrink-0 overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={logoImg}
          alt="Lakshya Gupta"
          className="h-[78%] w-[78%] object-contain select-none"
        />
      </div>
    );
  }

  return (
    <img
      src={logoImg}
      alt="Lakshya Gupta"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`object-contain shrink-0 select-none ${className}`}
    />
  );
}
