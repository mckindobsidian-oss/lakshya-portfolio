import { useEffect, useRef } from "react";

/**
 * High-Visibility 3D Elevated Terrain Dot-Mesh Canvas.
 * - Dark, sharp, clearly visible dots across the entire screen.
 * - Continuous ambient topographic wave motion.
 * - Moving the mouse lifts the ground in 3D perspective with neon green elevation,
 *   scaled point sizes, and dynamic topographic elevation rings.
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
      maxElevation: 32,
    };

    const SPACING = 32;
    type Point = {
      ox: number;
      oy: number;
      x: number;
      y: number;
      elevation: number;
      targetElevation: number;
      col: number;
      row: number;
    };

    let points: Point[] = [];
    let cols = 0;
    let rows = 0;

    const initGrid = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points = [];

      cols = Math.ceil(width / SPACING) + 2;
      rows = Math.ceil(height / SPACING) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * SPACING;
          const oy = r * SPACING;
          points.push({
            ox,
            oy,
            x: ox,
            y: oy,
            elevation: 0,
            targetElevation: 0,
            col: c,
            row: r,
          });
        }
      }
    };

    initGrid();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      time += 0.035;

      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      ctx.clearRect(0, 0, width, height);

      // Elevated 3D mesh rendering
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Ambient ground wave
        const ambientWave =
          Math.sin(p.ox * 0.008 + time) * Math.cos(p.oy * 0.008 + time * 0.8) * 4;

        // Mouse proximity 3D dome & ripple
        const dx = mouse.x - p.ox;
        const dy = mouse.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let mouseWave = 0;
        if (dist < mouse.radius * 1.5 && mouse.x > 0) {
          const norm = dist / mouse.radius;
          const dome = Math.exp(-Math.pow(norm * 1.3, 2)) * mouse.maxElevation;
          const ripple = Math.sin(dist * 0.08 - time * 4) * Math.exp(-norm) * 8;
          mouseWave = dome + ripple;
        }

        p.targetElevation = ambientWave + mouseWave;
        p.elevation += (p.targetElevation - p.elevation) * 0.16;

        // 3D displacement: elevated height pulls dot upward
        p.x = p.ox;
        p.y = p.oy - p.elevation;

        const elevationRatio = Math.max(0, p.elevation / mouse.maxElevation);
        const radius = 1.4 + elevationRatio * 2.2;

        if (elevationRatio > 0.18) {
          // Elevated ground peak in Neon Green
          ctx.fillStyle = `rgba(154, 230, 52, ${0.5 + elevationRatio * 0.5})`;
        } else {
          // Sharp visible dark dot
          ctx.fillStyle = "rgba(18, 19, 18, 0.38)";
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw subtle elevation topographic rings around cursor when active
      if (mouse.x > 0 && mouse.y > 0) {
        for (let ring = 1; ring <= 3; ring++) {
          const ringR = (ring * 35 + (time * 20) % 35);
          const alpha = Math.max(0, 0.25 - ringR / 150);
          ctx.strokeStyle = `rgba(154, 230, 52, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, ringR, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
