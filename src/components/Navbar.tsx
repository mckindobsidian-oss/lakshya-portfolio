import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import BrandLogo from "./BrandLogo";
import Magnetic from "./Magnetic";
import { site } from "../content";

const tabs = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/youtube", label: "YouTube" },
  { to: "/creations", label: "My creations" },
  { to: "/contact", label: "Contact me" },
];

function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  // clicking a tab you're already on takes you back to the top of that page
  const scrollTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
      window.setTimeout(() => {
        if (window.scrollY > 0) window.scrollTo(0, 0);
      }, 600);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/80 backdrop-blur-lg transition-all duration-300">
      <nav className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Magnetic strength={0.15}>
          <Link
            to="/"
            onClick={() => {
              close();
              scrollTop();
            }}
            className="group flex items-center gap-2.5"
          >
            <motion.div
              whileHover={{ scale: 1.06, rotate: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <BrandLogo className="h-9 w-9 shadow-sm group-hover:shadow-md" />
            </motion.div>
            <span className="hidden font-display text-base font-semibold tracking-tight text-ink sm:block">
              {site.name}
            </span>
          </Link>
        </Magnetic>

        {/* desktop tabs with animated layoutId pill */}
        <div className="hidden items-center gap-1 md:flex">
          {tabs.map((t) => {
            const active = isActive(pathname, t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                onClick={scrollTop}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  active ? "text-ink" : "text-soft hover:text-ink"
                }`}
              >
                {/* sliding active pill indicator */}
                {active && (
                  <motion.span
                    layoutId="activeTabPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 z-0 rounded-full bg-surface border border-line shadow-xs"
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </Link>
            );
          })}
        </div>

        {/* mobile menu button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-xs transition-colors hover:bg-line/40 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </motion.button>

        {/* animated mobile dropdown drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-16 border-b border-line bg-paper/95 px-6 py-4 shadow-lg backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {tabs.map((t, idx) => {
                  const active = isActive(pathname, t.to);
                  return (
                    <motion.div
                      key={t.to}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.2 }}
                    >
                      <Link
                        to={t.to}
                        onClick={() => {
                          close();
                          scrollTop();
                        }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                          active
                            ? "bg-surface text-ink border-l-3 border-brown font-semibold shadow-xs"
                            : "text-soft hover:bg-surface/70 hover:text-ink"
                        }`}
                      >
                        <span>{t.label}</span>
                        {active && <span className="text-xs font-semibold text-slate-900">Current</span>}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
