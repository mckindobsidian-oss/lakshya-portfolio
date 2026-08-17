import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";

import CustomContextMenu from "./components/CustomContextMenu";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creations from "./pages/Creations";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
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
  "/": "Lakshya Gupta — Chess, Minecraft & Code",
  "/about": "About — Lakshya Gupta",
  "/gallery": "Gallery — Lakshya Gupta",
  "/youtube": "Blockwise — Lakshya Gupta",
  "/creations": "My creations — Lakshya Gupta",
  "/contact": "Contact — Lakshya Gupta",
};

function Layout() {
  const { pathname } = useLocation();

  // reset scroll on every page change + set the tab title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = titles[pathname] ?? titles["/"];
  }, [pathname]);

  // the gallery is full-bleed — no footer there
  const hideFooter = pathname.startsWith("/gallery");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/creations" element={<Creations />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="*" element={<Home />} />
        </Routes>
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
