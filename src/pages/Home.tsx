import { Link } from "react-router-dom";

import InterestsDiagram from "../components/InterestsDiagram";
import Reveal from "../components/Reveal";
import Tilt3D from "../components/Tilt3D";
import { ChessBoardIcon, YouTubeBrandIcon } from "../components/Icons";
import { site } from "../content";

export default function Home() {
  return (
    <>
      {/* ---------- HERO (everything fits on the first screen) ---------- */}
      <section className="overflow-hidden border-b border-line">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-6 py-12 sm:py-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-8">
            <div>
              <Reveal>
                <p className="eyebrow">Welcome to my corner of the internet</p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl lg:text-[3.8rem] lg:leading-[1.05]">
                  {site.name}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
                  {site.heroSub}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/about" className="btn-primary">
                    <ChessBoardIcon className="h-4 w-4" />
                    My chess journey
                  </Link>
                  <Link to="/youtube" className="btn-ghost">
                    <YouTubeBrandIcon className="h-4 w-4" />
                    Watch on YouTube
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* diagram — sized by height so it fits the first screen, 3D-tilts with the mouse */}
            <Reveal delay={200} className="flex justify-center lg:justify-end">
              <Tilt3D className="w-full max-w-[420px] sm:max-w-[520px] lg:w-[min(38vw,560px)]">
                <InterestsDiagram className="mx-auto w-full" />
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
