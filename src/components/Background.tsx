import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { images } from "../assets/images";

export default function Background() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 45, damping: 25 });
  const y = useSpring(pointerY, { stiffness: 45, damping: 25 });
  const rotateY = useTransform(x, [-10, 10], [-1.8, 1.8]);
  const rotateX = useTransform(y, [-8, 8], [1.3, -1.3]);
  const foregroundX = useTransform(x, value => value * 2);
  const foregroundY = useTransform(y, value => value * 2);
  const glowX = useTransform(x, [-10, 10], ["25%", "75%"]);
  const glowY = useTransform(y, [-8, 8], ["25%", "75%"]);

  useEffect(() => {
    if (reducedMotion) return;
    const move = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 20);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 16);
    };
    const reset = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [reducedMotion, pointerX, pointerY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#1a1206]" style={{ perspective: 1100 }}>
      <motion.div className="absolute -inset-10 bg-cover bg-center" style={{ x, y, rotateX, rotateY, scale: 1.06, backgroundImage: `url(${images.chessScene})` }} />
      <motion.div className="wallpaper-foreground absolute -inset-10 bg-cover bg-center" style={{ x: foregroundX, y: foregroundY, rotateX, rotateY, scale: 1.06, backgroundImage: `url(${images.chessScene})`, maskImage: "linear-gradient(transparent 48%, black 78%)" }} />
      <div className="wallpaper-lamplight absolute -inset-10" />
      <div className="wallpaper-motes absolute inset-0">
        {Array.from({ length: 10 }, (_, i) => <span key={i} style={{ left: `${9 + i * 9}%`, top: `${18 + (i * 17) % 65}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${12 + i % 4 * 3}s` }} />)}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72),rgba(0,0,0,0.48)_35%,rgba(0,0,0,0.55))]" />
      <motion.div className="ambient-glow absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(198,161,91,0.13), transparent 65%)", backgroundPositionX: glowX, backgroundPositionY: glowY, x, y, backgroundSize: "160% 160%" }} />
      <div className="ambient-drift absolute -inset-20 opacity-20" style={{ background: "radial-gradient(ellipse at 25% 30%, #c6a15b40, transparent 45%), radial-gradient(ellipse at 80% 75%, #9c663030, transparent 40%)" }} />
    </div>
  );
}
