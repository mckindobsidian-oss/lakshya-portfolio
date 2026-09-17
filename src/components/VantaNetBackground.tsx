import { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

/**
 * Authentic Vanta.NET 3D Background
 * 
 * - Full-viewport dense interconnected 3D particle network.
 * - Light neutral gray background (#dde2e8) with neon-lime (#82ff3f) nodes & fine connecting lines.
 * - Real-time mouse POV parallax and smooth scroll-depth reactivity.
 * - Preserves the 70% white translucent sheet overlay sitting directly above it.
 */
export default function VantaNetBackground() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let effect: any = null;

    try {
      effect = NET({
        el,
        THREE,
        mouseControls: true,
        touchControls: !prefersReducedMotion,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x82ff3f,
        backgroundColor: 0x0a0b0a,
        points: isMobile ? 9.0 : 13.0,
        maxDistance: isMobile ? 18.0 : 21.0,
        spacing: isMobile ? 17.0 : 15.0,
        showDots: true,
      });
    } catch (err) {
      console.warn("[VantaNet] Initialization warning:", err);
    }

    // Dynamic scroll perspective response
    const onScroll = () => {
      if (prefersReducedMotion || !effect?.scene) return;
      const scrollY = window.scrollY || window.pageYOffset;
      effect.scene.rotation.y = scrollY * 0.0012;
      effect.scene.rotation.x = scrollY * 0.0006;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      try {
        effect?.destroy?.();
      } catch {
        // ignore cleanup error
      }
    };
  }, []);

  return (
    <>
      {/* Vanta.NET canvas — dense 3D particle web */}
      <div
        ref={elRef}
        className="fixed inset-0 -z-20 h-full w-full"
        aria-hidden="true"
      />
      {/* 70% White Translucent Sheet Overlay — PRESERVED EXACTLY AS REQUESTED */}
      <div
        className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
        style={{ background: "rgba(255, 255, 255, 0.70)" }}
        aria-hidden="true"
      />
    </>
  );
}