import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "./BrandLogo";
import { site } from "../content";

/**
 * Animated High-Energy Preloader (White Background Theme).
 * Extended duration (+1s), clean white canvas, kinetic progress counter,
 * and smooth explosion reveal.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exploding" | "gone">("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Appears for 1 second longer (~2200ms)
    const total = reduced ? 400 : 2200;
    const start = performance.now();
    let interval = 0;
    let timer = 0;

    interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const p = Math.min(100, Math.round((elapsed / total) * 100));
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(interval);
        setPhase("exploding");
        timer = window.setTimeout(() => setPhase("gone"), 600);
      }
    }, 25);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === "exploding" ? 0 : 1,
          scale: phase === "exploding" ? 1.05 : 1,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-white px-6 text-ink"
        aria-hidden="true"
      >
        {/* Subtle background radar circles on white */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
          <div
            className="h-[400px] w-[400px] rounded-full border border-black animate-ping"
            style={{ animationDuration: "3.5s" }}
          />
          <div className="absolute h-[600px] w-[600px] rounded-full border border-black/30" />
        </div>

        <div className="relative flex flex-col items-center gap-6">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <BrandLogo size={64} className="h-16 w-16 shadow-xl ring-2 ring-line" />
            <div className="absolute -inset-2 rounded-2xl bg-accent/25 blur-lg -z-10 animate-pulse" />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            {site.name}
          </motion.h1>

          {/* Progress track on white */}
          <div className="w-64 max-w-[70vw]">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200 p-0.5">
              <motion.div
                className="h-full rounded-full bg-accent shadow-[0_0_8px_#9ae634]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs font-mono text-soft">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent status-live-dot" />
                INITIALIZING
              </span>
              <span className="font-bold text-ink">{progress}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
