import { useEffect, useState } from "react";

import { site } from "../content";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "fading" | "gone">("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 250 : 1100;
    const start = performance.now();
    let interval = 0;
    let timer = 0;

    // timeouts (not rAF) so progress runs even in throttled/backgrounded tabs
    interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const p = Math.min(100, Math.round((elapsed / total) * 100));
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(interval);
        setPhase("fading");
        // hard unmount after the CSS fade — no rAF dependency
        timer = window.setTimeout(() => setPhase("gone"), 700);
      }
    }, 40);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`preloader ${phase === "fading" ? "preloader-fading" : ""}`} aria-hidden="true">
      <p className="preloader-name">{site.name}</p>
      <div className="preloader-track">
        <div className="preloader-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="preloader-pct">{progress}%</p>
    </div>
  );
}
