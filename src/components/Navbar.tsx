import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
      // guarantee: if the smooth scroll is blocked (throttled frames), jump instantly
      window.setTimeout(() => {
        if (window.scrollY > 0) window.scrollTo(0, 0);
      }, 700);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link to="/" onClick={() => { close(); scrollTop(); }} className="flex items-center gap-2.5">
          <img
            src="/src/assets/logo.png"
            alt="LG logo"
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-line"
          />
          <span className="hidden font-display text-base font-semibold tracking-tight text-ink sm:block">
            {site.name}
          </span>
        </Link>

        {/* desktop tabs */}
        <div className="hidden items-center gap-1 md:flex">
          {tabs.map((t) => {
            const active = isActive(pathname, t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                onClick={scrollTop}
                className={`relative px-3.5 py-2 text-sm transition-colors ${
                  active ? "font-medium text-ink" : "text-soft hover:text-ink"
                }`}
              >
                {t.label}
                {/* active tab underline */}
                <span
                  className={`absolute inset-x-3.5 -bottom-[1px] h-[2.5px] rounded-full bg-brown transition-all duration-200 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:bg-surface md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        {/* mobile dropdown */}
        {open && (
          <div className="absolute inset-x-0 top-16 border-b border-line bg-paper px-6 py-3 shadow-sm md:hidden">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                onClick={() => {
                  close();
                  scrollTop();
                }}
                className={`block border-l-2 px-4 py-3 text-sm transition-colors ${
                  isActive(pathname, t.to)
                    ? "border-brown font-medium text-ink"
                    : "border-transparent text-ink hover:bg-surface"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
