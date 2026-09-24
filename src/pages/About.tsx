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
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow on-photo">Profile</p>
            <h1 className="on-photo mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Focus & Pathway
            </h1>
            <p className="on-photo-soft mt-6 max-w-2xl text-lg leading-relaxed">{site.bio}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {facts.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-[#332820] bg-[#1a1410]/80 px-4 py-1.5 text-sm font-medium text-[#f0ebe3] shadow-2xs backdrop-blur-md"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- BOXED SECTIONS (Banner & Foundations) ---------- */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow on-photo">Operating Principle</p>
          </Reveal>

          {/* Luxury Reference Banner Image with Rounded Corners */}
          <div className="mt-8 grid gap-6">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-[#332820] shadow-2xl bg-[#130f0c]">
                <img
                  src={images.aboutBanner}
                  alt="Chess. Strategy. Explore. — Lakshya Gupta"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>

            {/* Foundations & Education card */}
            <Reveal delay={100}>
              <div className="rounded-3xl border border-[#332820] bg-[#16120e]/90 backdrop-blur-md p-6 shadow-md sm:p-10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a39a8e]">
                    Foundations & Timeline
                  </p>
                  <span className="text-xs font-bold font-mono text-accent">MILESTONES</span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {education.map((e) => (
                    <div key={e.name} className="rounded-2xl border border-[#332820]/70 bg-[#1e1813]/80 backdrop-blur-xs p-4 sm:p-5">
                      <div className="flex items-baseline justify-between gap-4 border-b border-[#332820] pb-2">
                        <p className="font-display text-base font-bold text-[#f0ebe3]">{e.name}</p>
                        <p className="text-xs font-semibold text-accent">{e.years}</p>
                      </div>
                      <p className="mt-2.5 text-sm text-[#a39a8e]">{e.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CHESS (the main thing) ---------- */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl border border-[#332820] bg-[#16120e]/90 backdrop-blur-md p-6 shadow-md sm:p-10">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#241c16] text-[#f0ebe3] border border-[#332820] shadow-sm">
                  <ChessBoardIcon className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                </div>
                <div>
                  <p className="eyebrow">Competitive Pathway</p>
                  <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f0ebe3]">
                    Pursuit of {site.chess.goal}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={site.links.chesscom}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-center"
                >
                  Chess.com Profile
                </a>
                <a
                  href={site.links.lichess}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost text-center"
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
                <div className="rounded-2xl border border-[#332820] bg-[#16120e]/90 backdrop-blur-md p-6 shadow-xs transition-all hover:border-accent hover:shadow-[0_8px_24px_rgba(198,161,91,0.2)]">
                  <p className="font-display text-3xl font-bold tracking-tight text-[#f0ebe3] sm:text-4xl">
                    <Counter value={s.value || "—"} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#a39a8e]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MOMENTS & ACHIEVEMENTS (Sideways Carousel) ---------- */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow on-photo">Tournament Milestones</p>
                <h2 className="h2 on-photo">Selected Achievements</h2>
                <p className="on-photo-soft mt-3 max-w-2xl">
                  Key moments and credentials across state, national, and FIDE rated circuits.
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <span className="on-photo-soft font-mono text-xs">
                  {activePhotoIdx + 1} / {achievements.length}
                </span>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#332820] bg-[#1a1410] text-[#f0ebe3] shadow-xs transition-colors hover:bg-accent hover:text-black hover:border-accent"
                  aria-label="Previous milestone"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#332820] bg-[#1a1410] text-[#f0ebe3] shadow-xs transition-colors hover:bg-accent hover:text-black hover:border-accent"
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
              className="mt-10 overflow-hidden rounded-3xl border border-[#332820] bg-[#16120e] shadow-2xl cursor-ew-resize"
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
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black opacity-0 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
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
                      <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                        {currentItem.tag}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#f0ebe3] sm:text-3xl">
                        {currentItem.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-[#a39a8e]">
                        {currentItem.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between border-t border-[#332820] pt-6">
                    {/* Thumbnail dots */}
                    <div className="flex gap-2">
                      {achievements.map((a, i) => (
                        <button
                          key={a.title}
                          type="button"
                          onClick={() => setActivePhotoIdx(i)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            i === activePhotoIdx ? "w-8 bg-accent" : "w-2.5 bg-[#332820] hover:bg-[#a39a8e]"
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
            <p className="eyebrow on-photo">Creative Outlets</p>
            <h2 className="h2 on-photo">Strategy & Visual Archive</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="group flex h-full flex-col justify-between rounded-3xl border border-[#332820] bg-[#16120e]/90 backdrop-blur-md p-8 shadow-xs transition-all duration-200 hover:shadow-xl hover:border-accent">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#241c16] text-[#f0ebe3] border border-[#332820] shadow-xs">
                    <YouTubeBrandIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#f0ebe3]">
                    Blockwise
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#a39a8e]">
                    YouTube channel focusing on Minecraft PvP mechanics, systems, and game optimization.
                  </p>
                </div>
                <Link
                  to="/youtube"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#f0ebe3] transition-colors hover:text-accent"
                >
                  <span>Visit Channel</span>
                  <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="group flex h-full flex-col justify-between rounded-3xl border border-[#332820] bg-[#16120e]/90 backdrop-blur-md p-8 shadow-xs transition-all duration-200 hover:shadow-xl hover:border-accent">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#241c16] text-[#f0ebe3] border border-[#332820] shadow-xs">
                    <ChessBoardIcon className="h-6 w-6 text-[#f0ebe3]" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#f0ebe3]">
                    Photo Vault & Archive
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#a39a8e]">
                    Photographic log documenting classical tournaments, national travels, and milestones.
                  </p>
                </div>
                <Link
                  to="/gallery"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#f0ebe3] transition-colors hover:text-accent"
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
