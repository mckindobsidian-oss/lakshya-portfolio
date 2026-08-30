import { Link } from "react-router-dom";
import InterestsDiagram from "../components/InterestsDiagram";
import Reveal from "../components/Reveal";
import { ArrowRightIcon, ChessBoardIcon, YouTubeBrandIcon } from "../components/Icons";
import { site } from "../content";

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center px-6 py-12 sm:py-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_1.25fr] lg:gap-12">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs">
                  <span className="h-2 w-2 rounded-full bg-accent status-live-dot" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">
                    Student · Chess Competitor · Creator
                  </p>
                </div>
              </Reveal>

              <Reveal delay={70}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl lg:text-[3.9rem] lg:leading-[1.04]">
                  {site.name}
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft sm:text-[1.15rem]">
                  {site.heroSub}
                </p>
              </Reveal>

              <Reveal delay={210}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link to="/about" className="btn-primary group">
                    <ChessBoardIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                    <span>My chess journey</span>
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <Link to="/youtube" className="btn-ghost group">
                    <YouTubeBrandIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>Watch on YouTube</span>
                  </Link>
                </div>
              </Reveal>

              {/* Quick glance metrics */}
              <Reveal delay={280}>
                <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line pt-6 text-sm text-soft">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-ink">13yo</span>
                    <span>Student & Coder</span>
                  </div>
                  <span className="text-line">•</span>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-ink">Aiming IM</span>
                    <span>Chess Competitor</span>
                  </div>
                  <span className="text-line">•</span>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-ink">Blockwise</span>
                    <span>Content Creator</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Embedded Diagram — fully integrated directly into background */}
            <Reveal delay={160} className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[420px] sm:max-w-[480px] lg:w-[min(38vw,520px)]">
                <InterestsDiagram className="mx-auto w-full" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
