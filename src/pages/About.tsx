import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Counter from "../components/Counter";
import LightboxModal, { type LightboxItem } from "../components/LightboxModal";
import Reveal from "../components/Reveal";
import { ArrowRightIcon, ChessBoardIcon, YouTubeBrandIcon } from "../components/Icons";
import { achievements, site } from "../content";

const facts = [
  "13 years old",
  "Chess player",
  `Aiming: ${site.chess.goal}`,
  "Minecraft creator",
  "Student",
];

const principle = {
  eyebrow: "Current operating principle",
  lines: ["Chess every day.", "Code something new.", "Create without waiting for perfect."],
};

const education = [
  { name: "School", years: "2019 — 2026", detail: "Student · Class 8" },
  { name: "Self-taught", years: "2023 — now", detail: "Coding · Chess · Content" },
];

export default function About() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<LightboxItem | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const currentItem = achievements[activePhotoIdx];

  const handleNext = () => {
    setActivePhotoIdx((prev) => (prev + 1) % achievements.length);
  };

  const handlePrev = () => {
    setActivePhotoIdx((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  // Lock page scrolling when mouse wheel is over carousel, and smoothly change photos sideways
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Stop the window/page from scrolling up or down
      e.preventDefault();
      e.stopPropagation();

      if (isScrollingRef.current) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 15) return;

      isScrollingRef.current = true;
      if (delta > 0) {
        setActivePhotoIdx((prev) => (prev + 1) % achievements.length);
      } else {
        setActivePhotoIdx((prev) => (prev - 1 + achievements.length) % achievements.length);
      }

      // Smooth cooldown so one scroll gesture cleanly steps 1 slide
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 350);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <>
      <LightboxModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={true}
        hasNext={true}
      />

      {/* ---------- BIO ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Who I am
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">{site.bio}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {facts.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink shadow-2xs"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- BOXED SECTIONS (Still, crisp cards — No Tilt) ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">The short version</p>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* dark box — operating principle (solid still card) */}
            <Reveal>
              <div className="group flex h-full flex-col justify-between rounded-3xl bg-[#121412] p-8 text-paper shadow-xl border border-white/10 sm:p-10 transition-colors hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {principle.eyebrow}
                  </p>
                  <span className="text-xl text-accent">✦</span>
                </div>
                <div className="mt-8 font-serif text-2xl leading-snug text-slate-100 sm:text-[2.1rem] sm:leading-[1.25]">
                  {principle.lines.map((l) => (
                    <p key={l} className="transition-colors duration-200 hover:text-accent">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* neon green box — education (solid still card) */}
            <Reveal delay={100}>
              <div className="flex h-full flex-col justify-between rounded-3xl bg-accent p-8 text-ink shadow-md sm:p-10 transition-shadow hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                      Education
                    </p>
                    <span className="text-xs font-bold text-ink/60">MILESTONES</span>
                  </div>
                  <div className="mt-6 flex flex-1 flex-col justify-between gap-6">
                    {education.map((e) => (
                      <div key={e.name}>
                        <div className="flex items-baseline justify-between gap-4 border-b border-ink/20 pb-2">
                          <p className="font-display text-lg font-bold text-ink">{e.name}</p>
                          <p className="text-sm font-semibold text-ink/75">{e.years}</p>
                        </div>
                        <p className="mt-2 text-sm text-ink/80">{e.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CHESS (the main thing) ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-start justify-between gap-6 rounded-3xl border border-line bg-white p-8 shadow-xs sm:p-10">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-ink shadow-sm">
                  <ChessBoardIcon className="h-7 w-7 text-ink" />
                </div>
                <div>
                  <p className="eyebrow">Chess</p>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl text-ink">
                    Going for {site.chess.goal}
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={site.links.chesscom}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Chess.com
                </a>
                <a
                  href={site.links.lichess}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Lichess
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {site.chess.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs transition-all hover:border-accent hover:shadow-md">
                  <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    <Counter value={s.value || "—"} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-soft">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MOMENTS THAT REALLY MATTER (Sideways Scroll Carousel with Page Scroll Lock) ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Milestones</p>
                <h2 className="h2">Moments that really matter</h2>
                <p className="mt-3 max-w-2xl text-soft">
                  Scroll with your mouse wheel over the card or use controls to browse photos and details sideways.
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-soft">
                  {activePhotoIdx + 1} / {achievements.length}
                </span>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-xs transition-colors hover:bg-accent hover:border-accent"
                  aria-label="Previous photo"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-xs transition-colors hover:bg-accent hover:border-accent"
                  aria-label="Next photo"
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>

          {/* Interactive Sideways Showcase with Non-Passive Wheel Lock */}
          <Reveal delay={100}>
            <div
              ref={carouselRef}
              className="mt-10 overflow-hidden rounded-3xl border border-line bg-white shadow-lg cursor-ew-resize"
            >
              <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                {/* Photo showcase with click to open lightbox */}
                <div
                  onClick={() => setSelectedPhoto(currentItem)}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-black lg:aspect-auto lg:min-h-[420px]"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentItem.photo}
                      src={currentItem.photo}
                      alt={currentItem.title}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35 }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-ink opacity-0 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      ↗
                    </span>
                  </div>
                </div>

                {/* Description updating sideways */}
                <div className="flex flex-col justify-between p-8 sm:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-ink">
                        {currentItem.tag}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        {currentItem.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-soft">
                        {currentItem.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                    {/* Thumbnail dots */}
                    <div className="flex gap-2">
                      {achievements.map((a, i) => (
                        <button
                          key={a.title}
                          type="button"
                          onClick={() => setActivePhotoIdx(i)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            i === activePhotoIdx ? "w-8 bg-accent" : "w-2.5 bg-line hover:bg-soft"
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SIDE PROJECT ---------- */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">The side project</p>
            <h2 className="h2">Also, I make videos</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-8 shadow-2xs transition-shadow hover:shadow-lg hover:border-accent">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-ink shadow-xs">
                    <YouTubeBrandIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
                    Blockwise
                  </h3>
                  <p className="mt-3 leading-relaxed text-soft">
                    My Minecraft YouTube channel — optimization, PvP, and mods.
                  </p>
                </div>
                <Link
                  to="/youtube"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  <span>Visit the channel</span>
                  <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-8 shadow-2xs transition-shadow hover:shadow-lg hover:border-accent">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-ink shadow-xs">
                    <ChessBoardIcon className="h-6 w-6 text-ink" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
                    Photo Vault & Gallery
                  </h3>
                  <p className="mt-3 leading-relaxed text-soft">
                    Interactive photo vault, tournament proof, and upcoming drops.
                  </p>
                </div>
                <Link
                  to="/gallery"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  <span>Explore Photo Vault</span>
                  <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
