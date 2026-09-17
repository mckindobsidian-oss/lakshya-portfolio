import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CounterProps = {
  value: string;
  className?: string;
};

/**
 * Counter smoothly rolls up numbers when scrolled into view.
 * Handles strings like "1150", "1500", "30+", "1800".
 */
export default function Counter({ value, className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const hasAnimated = useRef(false);

  const match = value.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] || "" : "";

  const [displayValue, setDisplayValue] = useState(() => (match ? `0${suffix}` : value));

  useEffect(() => {
    if (!isInView || hasAnimated.current || !match) return;
    hasAnimated.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo curve
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(targetNumber * eased);
      setDisplayValue(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value, targetNumber, suffix, match]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
