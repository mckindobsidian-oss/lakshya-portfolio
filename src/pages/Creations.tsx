import Reveal from "../components/Reveal";
import { ExternalIcon } from "../components/Icons";
import { creations } from "../content";

export default function Creations() {
  const book = creations[0];

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-accent status-live-dot" />
              <span>Published Works & Projects</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Things I've made
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              Everything I've built, written, and published — starting with my first book, with more digital creations in progress.
            </p>
          </Reveal>

          {book && (
            <Reveal delay={120}>
              <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-white shadow-md transition-shadow duration-300 hover:shadow-xl hover:border-accent">
                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                  {/* book cover showcase panel */}
                  <div className="relative flex items-center justify-center overflow-hidden bg-black p-10 sm:p-14">
                    <div className="w-full max-w-[280px]">
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={`${book.title} — book cover`}
                          className="w-full rounded-xl shadow-2xl ring-1 ring-white/10"
                        />
                      ) : (
                        <div className="relative w-full rounded-xl border border-white/15 bg-slate-900 p-8 shadow-2xl text-white">
                          <p className="font-serif text-5xl">📖</p>
                          <p className="mt-6 font-serif text-2xl font-bold leading-tight">
                            {book.title}
                          </p>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                            by Lakshya Gupta
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* book description & details */}
                  <div className="flex flex-col justify-between p-8 sm:p-12">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="eyebrow">briBooks Publication</span>
                        <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-bold text-ink">
                          Author
                        </span>
                      </div>

                      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                        {book.title}
                      </h2>

                      <p className="mt-4 max-w-xl leading-relaxed text-soft sm:text-base">
                        {book.detail}
                      </p>

                      {/* Editorial quote block */}
                      <div className="mt-6 rounded-2xl border-l-2 border-accent bg-surface p-4 text-sm italic text-soft">
                        "A journey into what lies beyond our planet, written for dreamers who stare at the night sky and wonder what comes next."
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4 pt-4">
                      <a
                        href={book.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary group"
                      >
                        <span>Read on briBooks</span>
                        <ExternalIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* Up next / Roadmap card */}
          <Reveal delay={180}>
            <div className="mt-12 rounded-3xl border-2 border-dashed border-line bg-surface/60 p-8 sm:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="eyebrow">Next up</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink">
                    Interactive Web & Coding Projects
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-soft">
                    Currently experimenting with algorithms, chess tools, and web apps. New code releases will be showcased right here.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-accent status-live-dot" />
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
