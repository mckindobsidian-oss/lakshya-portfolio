import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
  // mouse-glide: the strip follows the cursor's horizontal position, smoothly
  const trackRef = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const glide = useRef(0);
  const interval = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // timeout-driven (not rAF) so the glide runs even in throttled tabs
    interval.current = window.setInterval(() => {
      const t = trackRef.current;
      if (!t) return;
      const diff = target.current - glide.current;
      if (Math.abs(diff) < 0.5) return; // settled — stay still
      glide.current += diff * 0.1;
      if (Math.abs(diff) < 1) glide.current = target.current;
      t.scrollLeft = glide.current;
    }, 24);

    const onMouseMove = (e: MouseEvent) => {
      const t = trackRef.current;
      if (!t) return;
      const rect = t.getBoundingClientRect();
      // only glide while the cursor is over the strip
      if (e.clientY < rect.top - 60 || e.clientY > rect.bottom + 60) return;
      const max = t.scrollWidth - t.clientWidth;
      if (max <= 0) return;
      const progress = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      target.current = progress * max;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.clearInterval(interval.current);
    };
  }, []);

  return (
    <>
      {/* ---------- BIO ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Who I am
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">{site.bio}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-2">
              {facts.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-brown"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- BOXED SECTIONS (dark principle + lime education) ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">The short version</p>
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            {/* dark box — operating principle */}
            <Reveal>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-[#141714] p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  {principle.eyebrow}
                </p>
                <div className="mt-8 font-serif text-2xl leading-snug text-[#f3f1e7] sm:text-[2rem] sm:leading-[1.25]">
                  {principle.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* lime box — education */}
            <Reveal delay={100}>
              <div className="flex h-full flex-col rounded-2xl bg-accent p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                  Education
                </p>
                <div className="mt-6 flex flex-1 flex-col justify-between gap-6">
                  {education.map((e) => (
                    <div key={e.name}>
                      <div className="flex items-baseline justify-between gap-4 border-b border-ink/25 pb-2">
                        <p className="font-display text-lg font-semibold text-ink">{e.name}</p>
                        <p className="text-sm font-medium text-ink/70">{e.years}</p>
                      </div>
                      <p className="mt-2 text-sm text-ink/75">{e.detail}</p>
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
            <div className="flex flex-wrap items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-8">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-ink">
                  <ChessBoardIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="eyebrow">Chess</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    Going for {site.chess.goal}
                  </h2>
                </div>
              </div>
              <div className="flex gap-3">
                <a href={site.links.chesscom} target="_blank" rel="noreferrer" className="btn-primary">
                  Chess.com
                </a>
                <a href={site.links.lichess} target="_blank" rel="noreferrer" className="btn-ghost">
                  Lichess
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {site.chess.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <p className="font-display text-4xl font-semibold tracking-tight text-ink">
                    {s.value || "—"}
                  </p>
                  <p className="mt-2 text-sm font-medium text-soft">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ACHIEVEMENTS (sliding carousel) ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Achievements</p>
            <h2 className="h2">Moments that matter</h2>
            <p className="mt-4 max-w-2xl text-soft">
              Move your mouse across the strip and it glides with you — the certificates, badges,
              and moments that made me.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div
              ref={trackRef}
              className="mt-10 flex gap-5 overflow-x-auto py-3 [scrollbar-width:none]"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {achievements.map((a, i) => (
                <figure
                  key={a.title}
                  className="float-card group w-[min(84vw,340px)] shrink-0 overflow-hidden rounded-2xl border border-line bg-surface"
                  style={{ animationDelay: `${(i % 3) * 0.6}s` }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={a.photo}
                      alt={a.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="p-5">
                    <p className="eyebrow">{a.tag}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-soft">{a.detail}</p>
                  </figcaption>
                </figure>
              ))}
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
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-8">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink">
                    <YouTubeBrandIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                    Blockwise
                  </h3>
                  <p className="mt-3 leading-relaxed text-soft">
                    My Minecraft YouTube channel — optimization, PvP, and mods.
                  </p>
                </div>
                <Link
                  to="/youtube"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brown"
                >
                  Visit the channel
                  <ArrowRightIcon />
                </Link>
              </div>

              <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-8">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink">
                    <ChessBoardIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                    My chess journey
                  </h3>
                  <p className="mt-3 leading-relaxed text-soft">
                    Certificates, ratings, and the climb toward International Master.
                  </p>
                </div>
                <Link
                  to="/gallery"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brown"
                >
                  See the moments
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
