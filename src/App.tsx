import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";

import { AnimatePresence } from "framer-motion";

import AmbientBackground from "./components/AmbientBackground";
import CustomContextMenu from "./components/CustomContextMenu";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import Preloader from "./components/Preloader";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creations from "./pages/Creations";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import YouTube from "./pages/YouTube";

/* buttery smooth scrolling across the whole site */
function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    // expose the instance so other parts (e.g. the context menu) can animate scrolls
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);
  return null;
}

/* per-tab browser titles */
const titles: Record<string, string> = {
  "/": "Lakshya Gupta Portfolio",
  "/about": "About — Lakshya Gupta",
  "/gallery": "Gallery — Lakshya Gupta",
  "/youtube": "Blockwise — Lakshya Gupta",
  "/creations": "My creations — Lakshya Gupta",
  "/contact": "Contact — Lakshya Gupta",
};

function Layout() {
  const location = useLocation();
  const { pathname } = location;

  // reset scroll on every page change + set the tab title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = titles[pathname] ?? "404 — Page Not Found — Lakshya Gupta";
  }, [pathname]);

  // the gallery is full-bleed — no footer there
  const hideFooter = pathname.startsWith("/gallery");

  return (
    <div className="relative flex min-h-screen flex-col">
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/creations" element={<PageTransition><Creations /></PageTransition>} />
            <Route path="/youtube" element={<PageTransition><YouTube /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <SmoothScroll />
      <Preloader />
      <CustomContextMenu />
      <CustomCursor />
      <Layout />
    </HashRouter>
  );
}
