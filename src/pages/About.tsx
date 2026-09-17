import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Counter from "../components/Counter";
import LightboxModal, { type LightboxItem } from "../components/LightboxModal";
import Reveal from "../components/Reveal";
import { ArrowRightIcon, ChessBoardIcon, YouTubeBrandIcon } from "../components/Icons";
import { achievements, site } from "../content";
import { images } from "../assets/images";

const facts = [
  "13 years old",
  "Competitive Chess",
  `Target: ${site.chess.goal}`,
  "Blockwise Creator",
  "Student",
];

const education = [
  { name: "Academic Schooling", years: "2019 — 2026", detail: "Class 8 · Focused on strategic studies" },
  { name: "Chess & Strategy", years: "2023 — Present", detail: "FIDE rated tournament circuit & master preparation" },
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
            <p className="eyebrow">Profile</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Focus & Pathway
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">{site.bio}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {facts.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-line bg-white/90 px-4 py-1.5 text-sm font-medium text-ink shadow-2xs backdrop-blur-sm"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- BOXED SECTIONS (Banner & Foundations) ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Operating Principle</p>
          </Reveal>

          {/* Luxury Reference Banner Image with Rounded Corners */}
          <div className="mt-8 grid gap-6">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black">
                <img
                  src={images.aboutBanner}
                  alt="Chess. Strategy. Explore. — Lakshya Gupta"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>

            {/* Foundations & Education card */}
            <Reveal delay={100}>
              <div className="rounded-3xl border border-line bg-surface/90 backdrop-blur-md p-8 shadow-xs sm:p-10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                    Foundations & Timeline
                  </p>
                  <span className="text-xs font-bold font-mono text-accent">MILESTONES</span>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {education.map((e) => (
                    <div key={e.name} className="rounded-2xl border border-line bg-white/70 backdrop-blur-xs p-5">
                      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
                        <p className="font-display text-base font-bold text-ink">{e.name}</p>
                        <p className="text-xs font-semibold text-soft">{e.years}</p>
                      </div>
                      <p className="mt-2.5 text-sm text-soft">{e.detail}</p>
                    </div>
                  ))}
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
            <div className="flex flex-wrap items-start justify-between gap-6 rounded-3xl border border-line bg-surface/90 backdrop-blur-md p-8 shadow-xs sm:p-10">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-paper shadow-sm">
                  <ChessBoardIcon className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <p className="eyebrow">Competitive Pathway</p>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl text-ink">
                    Pursuit of {site.chess.goal}
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
                  Chess.com Profile
                </a>
                <a
                  href={site.links.lichess}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Lichess Profile
                </a>
              </div>
            </div>
          </Reveal>

          {/* Animated ratings counters rolling from 0 */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {site.chess.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="rounded-2xl border border-line bg-surface/90 backdrop-blur-md p-6 shadow-2xs transition-all hover:border-accent hover:shadow-md">
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

      {/* ---------- MOMENTS & ACHIEVEMENTS (Sideways Carousel) ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Tournament Milestones</p>
                <h2 className="h2">Selected Achievements</h2>
                <p className="mt-3 max-w-2xl text-soft">
                  Key moments and credentials across state, national, and FIDE rated circuits.
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
                  aria-label="Previous milestone"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-xs transition-colors hover:bg-accent hover:border-accent"
                  aria-label="Next milestone"
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>

          {/* Interactive Sideways Showcase */}
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

      {/* ---------- EXPLORATIONS ---------- */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Creative Outlets</p>
            <h2 className="h2">Strategy & Visual Archive</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface/90 backdrop-blur-md p-8 shadow-2xs transition-shadow hover:shadow-lg hover:border-accent">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-ink shadow-xs">
                    <YouTubeBrandIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
                    Blockwise
                  </h3>
                  <p className="mt-3 leading-relaxed text-soft">
                    YouTube channel focusing on Minecraft PvP mechanics, systems, and game optimization.
                  </p>
                </div>
                <Link
                  to="/youtube"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  <span>Visit Channel</span>
                  <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface/90 backdrop-blur-md p-8 shadow-2xs transition-shadow hover:shadow-lg hover:border-accent">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-ink shadow-xs">
                    <ChessBoardIcon className="h-6 w-6 text-ink" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
                    Photo Vault & Archive
                  </h3>
                  <p className="mt-3 leading-relaxed text-soft">
                    Photographic log documenting classical tournaments, national travels, and milestones.
                  </p>
                </div>
                <Link
                  to="/gallery"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  <span>Explore Vault</span>
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
