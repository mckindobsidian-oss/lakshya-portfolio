import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import Counter from "../components/Counter";
import LightboxModal from "../components/LightboxModal";
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

const principles = [
  { name: "Chess", headline: "Every move has a purpose.", detail: "Deep calculation, patient preparation, and lessons from every tournament. The next move starts with understanding the position.", to: "#chess-pathway", action: "Explore my chess pathway", photo: images.aboutChessDesk },
  { name: "Strategy", headline: "Think deeper. Build better.", detail: "The same curiosity carries into writing and creating: explore an idea, test it, and keep refining. From Life Beyond Earth to Blockwise.", to: "/creations", action: "See what I create", photo: images.bookMockup },
  { name: "Explore", headline: "Stay curious beyond the board.", detail: "New places, fresh perspectives, and moments worth keeping. A visual record of the world between tournaments.", to: "/gallery", action: "Explore the photo vault", photo: images.brahmaSarovarWide },
];

export default function About() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);

  const [activePrinciple, setActivePrinciple] = useState(0);
  const touchStart = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const principle = principles[activePrinciple];

  const currentItem = achievements[activePhotoIdx];

  const handleNext = () => {
    setActivePhotoIdx((prev) => (prev + 1) % achievements.length);
  };

  const handlePrev = () => {
    setActivePhotoIdx((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  return (
    <>
      <LightboxModal
        item={isPhotoOpen ? currentItem : null}
        onClose={() => setIsPhotoOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={true}
        hasNext={true}
      />

      <LightboxModal
        item={certificateOpen ? { title: "Arena Candidate Master", tag: "FIDE · 2026", detail: "Diploma awarded to Lakshya Gupta of India for obtaining the Arena Candidate Master title in 2026.", photo: images.acmCertificate } : null}
        onClose={() => setCertificateOpen(false)}
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

      <section className="border-b border-white/10" aria-labelledby="chess-titles">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow on-photo">Chess Credentials</p>
            <h2 id="chess-titles" className="h2 on-photo">Titles</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#332820] bg-[#16120e]/90 p-6 sm:p-8">
                <p className="eyebrow">Arena Title</p>
                <p className="mt-4 font-display text-4xl font-bold text-accent">{site.chess.title}</p>
                <h3 className="mt-3 text-sm text-soft">{site.chess.titleName}</h3>
                <button type="button" onClick={() => setCertificateOpen(true)} className="group mt-5 flex w-full items-center gap-4 rounded-xl border border-line bg-black/20 p-3 text-left transition-colors hover:border-accent focus-visible:outline-accent">
                  <img src={images.acmCertificate} alt="FIDE Arena Candidate Master diploma for Lakshya Gupta, 2026" className="h-20 w-14 shrink-0 rounded bg-white object-contain" loading="lazy" />
                  <span><span className="block text-sm font-medium text-ink">View ACM certificate ↗</span><span className="mt-1 block text-xs text-soft">FIDE diploma · 2026</span></span>
                </button>
              </div>
              <div className="rounded-2xl border border-[#332820] bg-[#16120e]/90 p-6 sm:p-8" aria-labelledby="world-chess-rating">
                <h3 id="world-chess-rating" className="eyebrow">World Chess Rating</h3>
                <p className="mt-4 font-display text-4xl font-bold text-accent"><Counter value={site.chess.worldRating} /></p>
                <p className="mt-3 text-sm text-soft">Along the pathway to {site.chess.goal}</p>
              </div>
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

          <div className="mt-6 grid gap-6">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-line bg-surface">
                <div className="grid grid-cols-3 border-b border-line" role="group" aria-label="Explore my operating principles">
                  {principles.map((item, index) => (
                    <button key={item.name} type="button" aria-pressed={activePrinciple === index} onClick={() => setActivePrinciple(index)} className={`min-h-16 border-b-2 px-4 py-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-4px] ${activePrinciple === index ? "border-accent bg-accent/10 text-accent" : "border-transparent text-soft hover:bg-white/5 hover:text-ink"}`}>
                      <span className="mr-2 font-mono text-xs opacity-60">0{index + 1}</span>{item.name}
                    </button>
                  ))}
                </div>
                <div className="grid sm:grid-cols-[1.1fr_1fr]">
                  <div className="flex min-h-72 flex-col items-start justify-center p-7 sm:p-10" aria-live="polite" aria-atomic="true">
                    <h2 className="font-display text-3xl font-bold leading-tight text-ink">{principle.headline}</h2>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-soft">{principle.detail}</p>
                    {principle.to.startsWith("#") ? <button type="button" onClick={() => document.getElementById("chess-pathway")?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" })} className="mt-7 inline-flex items-center gap-2 text-sm text-accent">{principle.action}<ArrowRightIcon /></button> : <Link to={principle.to} className="mt-7 inline-flex items-center gap-2 text-sm text-accent">{principle.action}<ArrowRightIcon /></Link>}
                  </div>
                  <div className="relative min-h-56 overflow-hidden border-t border-line sm:border-l sm:border-t-0">
                    <motion.img key={principle.photo} src={principle.photo} alt={principle.name === "Chess" ? "Chess study desk" : principle.name === "Strategy" ? "Life Beyond Earth book" : "Brahma Sarovar panorama"} initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>
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
                      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#332820] pb-2">
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
      <section id="chess-pathway" className="scroll-mt-24 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 rounded-3xl border border-[#332820] bg-[#16120e]/90 backdrop-blur-md p-6 shadow-md sm:p-10">
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
              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <a href={site.links.fide} target="_blank" rel="noreferrer" className="btn-primary text-center">FIDE Profile ↗</a>
                <a
                  href={site.links.chesscom}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-center"
                >
                  Chess.com
                </a>
                <a
                  href={site.links.lichess}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost text-center"
                >
                  Lichess
                </a>
              </div>
            </div>
          </Reveal>

          {/* Animated ratings counters rolling from 0 */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {site.chess.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="rounded-2xl border border-[#332820] bg-[#16120e]/90 backdrop-blur-md p-4 sm:p-6 shadow-xs transition-all hover:border-accent hover:shadow-[0_8px_24px_rgba(198,161,91,0.2)]">
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

          <Reveal delay={100}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-surface" role="region" aria-roledescription="carousel" aria-label="Selected achievements" tabIndex={0}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === "ArrowRight") { event.preventDefault(); handleNext(); }
                if (event.key === "ArrowLeft") { event.preventDefault(); handlePrev(); }
              }}
              onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
              onTouchEnd={(event) => {
                if (touchStart.current === null) return;
                const distance = touchStart.current - event.changedTouches[0].clientX;
                if (Math.abs(distance) > 50) distance > 0 ? handleNext() : handlePrev();
                touchStart.current = null;
              }}>
              <div className="grid md:grid-cols-[1.1fr_1fr]">
                <button type="button" onClick={() => setIsPhotoOpen(true)} aria-label={`View full photo: ${currentItem.title}`} className="group relative aspect-[4/3] overflow-hidden bg-[#0e0b09] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-4px]">
                  <motion.img key={currentItem.photo} src={currentItem.photo} alt={currentItem.title} initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]" />
                  <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/75 px-4 py-2 text-xs text-white">View full photo ↗</span>
                </button>
                <div className="flex flex-col justify-center border-t border-line p-7 md:border-l md:border-t-0 sm:p-9" aria-live="polite" aria-atomic="true">
                  <p className="font-mono text-xs text-accent">{String(activePhotoIdx + 1).padStart(2, "0")} / {String(achievements.length).padStart(2, "0")}</p>
                  <p className="mt-6 text-xs uppercase tracking-widest text-soft">{currentItem.tag}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">{currentItem.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-soft">{currentItem.detail}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 border-t border-line sm:grid-cols-3">
                {achievements.map((item, index) => (
                  <button key={item.title} type="button" onClick={() => setActivePhotoIdx(index)} aria-pressed={activePhotoIdx === index} className={`flex min-h-20 items-center gap-3 border-b border-r border-line p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-4px] sm:p-4 ${activePhotoIdx === index ? "bg-accent/10 text-accent" : "text-soft hover:bg-white/5 hover:text-ink"}`}>
                    <img src={item.photo} alt="" loading="lazy" className={`h-11 w-11 shrink-0 rounded-lg object-cover ${activePhotoIdx === index ? "ring-1 ring-accent" : "opacity-65"}`} />
                    <span className="text-xs font-medium leading-relaxed">{item.title}</span>
                  </button>
                ))}
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
