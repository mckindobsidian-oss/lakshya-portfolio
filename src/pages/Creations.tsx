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
            <p className="eyebrow">My creations</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Things I've made
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              Everything I've built, in one place. Right now that's one thing — and it's a book.
            </p>
          </Reveal>

          {book && (
            <Reveal delay={120}>
              <a
                href={book.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-12 grid overflow-hidden rounded-3xl border border-line bg-surface transition-shadow duration-200 hover:shadow-lg lg:grid-cols-[0.9fr_1.1fr]"
              >
                {/* book cover panel */}
                <div className="flex items-center justify-center bg-[#141714] p-10 sm:p-14">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={`${book.title} — book cover`}
                      className="w-full max-w-[280px] rotate-[-3deg] rounded-lg shadow-2xl ring-1 ring-white/15 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="relative w-full max-w-[260px] rotate-[-3deg] rounded-lg border border-white/15 bg-[#f3f1e7] p-8 shadow-2xl">
                      <p className="font-serif text-5xl text-[#141714]">📖</p>
                      <p className="mt-6 font-serif text-2xl font-semibold leading-tight text-[#141714]">
                        {book.title}
                      </p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6d4a2f]">
                        by Lakshya Gupta
                      </p>
                    </div>
                  )}
                </div>

                {/* details */}
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="eyebrow">Published on briBooks</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {book.title}
                  </h2>
                  <p className="mt-5 max-w-xl leading-relaxed text-soft">{book.detail}</p>
                  <div className="mt-9">
                    <span className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors group-hover:bg-brown">
                      Read it on briBooks
                      <ExternalIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
