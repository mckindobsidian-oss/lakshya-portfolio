import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import logoImg from "../assets/logo.png";
import { site } from "../content";

const tabs = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/creations", label: "Creations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/youtube", label: "YouTube" },
  { to: "/contact", label: "Contact" },
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
    <header className="relative z-40">
      <nav className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Clean brand title with logo */}
        <Link
          to="/"
          onClick={() => {
            close();
            scrollTop();
          }}
          className="flex items-center gap-2.5 select-none group"
        >
          <img
            src={logoImg}
            alt="Lakshya Gupta"
            className="h-7 w-7 object-contain transition-transform duration-200 group-hover:scale-108"
          />
          <span className="font-display text-lg font-bold tracking-tight text-[#f0ebe3]">
            {site.name}
          </span>
        </Link>

        {/* desktop tabs with animated layoutId pill */}
        <div className="hidden items-center gap-1 md:flex">
          {tabs.map((t) => {
            const active = isActive(pathname, t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                onClick={scrollTop}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  active ? "text-white font-semibold" : "text-white/65 hover:text-white"
                }`}
              >
                {/* sliding active pill indicator */}
                {active && (
                  <motion.span
                    layoutId="activeTabPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 z-0 rounded-full bg-white/15 border border-white/25 shadow-xs"
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
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#332820] bg-[#1a1410]/80 text-[#f0ebe3] shadow-xs transition-colors hover:bg-[#261d17] md:hidden"
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
              className="absolute inset-x-0 top-16 z-50 border-b border-[#332820] bg-[#130f0c]/98 px-6 py-4 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-1.5">
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
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                          active
                            ? "bg-[#1e1813] text-[#f0ebe3] border-l-2 border-accent font-semibold shadow-xs"
                            : "text-[#a39a8e] hover:bg-[#1a1410] hover:text-[#f0ebe3]"
                        }`}
                      >
                        <span>{t.label}</span>
                        {active && <span className="text-xs font-mono text-accent">Active</span>}
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
