import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number; // pull strength (default 0.22)
};

/**
 * Magnetic interaction wrapper.
 * Gives a subtle, high-end pull toward the cursor when hovering over buttons/chips.
 * Smoothly snaps back with spring physics when mouse leaves.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.22,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 16, stiffness: 180, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
