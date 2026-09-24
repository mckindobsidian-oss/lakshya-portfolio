import { Link } from "react-router-dom";
import InterestsDiagram from "../components/InterestsDiagram";
import Reveal from "../components/Reveal";
import { ArrowRightIcon, ChessBoardIcon, YouTubeBrandIcon } from "../components/Icons";
import { site } from "../content";

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-[#332820]/70">
        <div className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center px-6 py-12 sm:py-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_1.25fr] lg:gap-12">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#332820] bg-[#1a1410]/80 px-3.5 py-1.5 shadow-2xs backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-accent status-live-dot" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a39a8e]">
                    Chess Competitor · Strategic Explorer
                  </p>
                </div>
              </Reveal>

              <Reveal delay={70}>
                <h1 className="on-photo mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-[3.9rem] lg:leading-[1.04]">
                  {site.name}
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="on-photo-soft mt-5 max-w-xl text-base leading-relaxed sm:text-[1.15rem]">
                  {site.heroSub}
                </p>
              </Reveal>

              <Reveal delay={210}>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Link to="/about" className="btn-primary group text-center">
                    <ChessBoardIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                    <span>Explore Chess Pathway</span>
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <Link to="/youtube" className="btn-ghost group text-center">
                    <YouTubeBrandIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>Watch on Blockwise</span>
                  </Link>
                </div>
              </Reveal>

              {/* Quick glance metrics */}
              <Reveal delay={280}>
                <div className="on-photo-soft mt-10 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-[#332820]/80 pt-5 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="on-photo font-display font-bold">13yo</span>
                    <span>Age</span>
                  </div>
                  <span className="on-photo-soft">•</span>
                  <div className="flex items-center gap-2">
                    <span className="on-photo font-display font-bold">Pursuing IM</span>
                    <span>Chess Title Target</span>
                  </div>
                  <span className="on-photo-soft">•</span>
                  <div className="flex items-center gap-2">
                    <span className="on-photo font-display font-bold">Blockwise</span>
                    <span>Video Production</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Embedded Diagram — fully integrated directly into background */}
            <Reveal delay={160} className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] sm:max-w-[440px] lg:w-[min(38vw,520px)]">
                <InterestsDiagram className="mx-auto w-full" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
