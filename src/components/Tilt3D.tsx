import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

/**
 * Wraps content in a 3D perspective that tilts toward the mouse cursor.
 * Uses a native window listener (bulletproof across browsers/webviews),
 * with rotateX/rotateY driven by spring-smoothed motion values.
 */
export default function Tilt3D({ children, className = "", maxTilt = 9 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 140,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 140,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        return;
      }
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    };

    const onLeave = () => {
      mx.set(0.5);
      my.set(0.5);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [mx, my]);

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
