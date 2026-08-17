import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { images } from "../assets/images";
import { site } from "../content";

type MenuState = { x: number; y: number } | null;

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/youtube", label: "YouTube" },
  { to: "/creations", label: "My creations" },
  { to: "/contact", label: "Contact me" },
];

const MENU_W = 240;
const MENU_H = 400;

export default function CustomContextMenu() {
  const [menu, setMenu] = useState<MenuState>(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const selectedText = useRef("");
  const navigate = useNavigate();
  const copiedTimer = useRef<number | undefined>(undefined);

  const close = () => setMenu(null);

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      // let the native menu work inside text fields
      const t = e.target;
      if (t instanceof HTMLElement && t.closest("input, textarea, select, [contenteditable='true']")) return;
      e.preventDefault();

      const sel = window.getSelection()?.toString().trim() ?? "";
      selectedText.current = sel; // capture now — the click itself clears the selection
      setHasSelection(sel.length > 0);
      setCopiedText(false);

      const pad = 10;
      const x = Math.min(e.clientX, window.innerWidth - MENU_W - pad);
      const y = Math.min(e.clientY, window.innerHeight - MENU_H - pad);
      setMenu({ x: Math.max(pad, x), y: Math.max(pad, y) });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("click", close);
    window.addEventListener("resize", close);
    window.addEventListener("blur", close);
    window.addEventListener("scroll", close, true);
    document.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("click", close);
      window.removeEventListener("resize", close);
      window.removeEventListener("blur", close);
      window.removeEventListener("scroll", close, true);
      document.removeEventListener("keydown", onKey);
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
    };
  }, []);

  const go = (to: string) => {
    close();
    navigate(to);
  };

  const copySelectedText = async () => {
    const text = selectedText.current;
    if (!text.trim()) return;
    const done = () => {
      setCopiedText(true);
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopiedText(false), 1600);
    };
    try {
      await navigator.clipboard.writeText(text);
      done();
    } catch {
      // clipboard API blocked (older browsers / webviews) — fall back to execCommand
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done();
      } catch {
        // both paths failed — ignore
      }
    }
  };

  const backToTop = () => {
    close();
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          key="ctx-menu"
          role="menu"
          initial={{ opacity: 0, scale: 0.95, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -3 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          style={{ left: menu.x, top: menu.y, width: MENU_W }}
          onContextMenu={(e) => e.preventDefault()}
          className="fixed z-[100] max-h-[calc(100vh-20px)] overflow-y-auto rounded-2xl border border-line bg-white p-2 shadow-2xl shadow-ink/20"
        >
          {/* header */}
          <div className="flex items-center gap-2.5 rounded-xl bg-surface px-3 py-2.5">
            <img
              src={images.logo}
              alt=""
              className="h-8 w-8 shrink-0 rounded-md object-cover"
            />
            <p className="truncate font-display text-sm font-semibold leading-tight tracking-tight text-ink">
              {site.name}
            </p>
          </div>

          {/* navigation */}
          <div className="mt-2 space-y-0.5">
            {navItems.map((n) => (
              <button
                key={n.to}
                type="button"
                role="menuitem"
                onClick={() => go(n.to)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-surface"
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="my-2 h-px bg-line" />

          {/* actions */}
          {hasSelection && (
            <button
              type="button"
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation(); // keep the menu open so "Copied!" shows
                copySelectedText();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-surface"
            >
              <CopyIcon className="h-4 w-4 shrink-0 text-soft" />
              {copiedText ? "Copied!" : "Copy selected text"}
            </button>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={backToTop}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-surface"
          >
            <TopIcon className="h-4 w-4 shrink-0 text-soft" />
            Back to top
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function TopIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 19V5m-6 6 6-6 6 6" />
    </svg>
  );
}
