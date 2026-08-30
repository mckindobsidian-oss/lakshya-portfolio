import { motion } from "framer-motion";

import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { ExternalIcon, PlayIcon, YouTubeBrandIcon } from "../components/Icons";
import { site, videos } from "../content";

export default function YouTube() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF0000] shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#FF0000] status-live-dot" />
              <span>YouTube Creator</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {site.youtube.channelName}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              Blockwise — Minecraft PvP, optimization tips, mods, and high-energy gameplay. All my short-form and long-form video content lives on the channel.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-line bg-surface/90 p-8 shadow-xs backdrop-blur-xs sm:p-10">
              <div className="flex items-center gap-5">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xs"
                >
                  <YouTubeBrandIcon className="h-8 w-8" />
                </motion.div>
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {site.youtube.channelName}{" "}
                    <span className="text-base font-medium text-soft">{site.youtube.handle}</span>
                  </h2>
                  <p className="mt-1 text-sm font-medium text-soft">
                    {site.youtube.subscribers
                      ? `${site.youtube.subscribers} subscribers`
                      : "Minecraft PvP & Mods"}
                  </p>
                </div>
              </div>

              <Magnetic strength={0.2}>
                <a
                  href={site.links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary group"
                >
                  <YouTubeBrandIcon className="h-4 w-4" />
                  <span>Visit channel</span>
                  <ExternalIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Recent videos</p>
                <h2 className="h2">Latest shorts & uploads</h2>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-soft">
                Tap to watch on YouTube ↗
              </span>
            </div>
          </Reveal>

          {/* Video preview grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 80}>
                <motion.a
                  href={`https://www.youtube.com/shorts/${v.id}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Watch short on YouTube"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="group relative block overflow-hidden rounded-3xl border border-line bg-surface shadow-xs transition-shadow duration-300 hover:border-[#FF0000]/40 hover:shadow-xl"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                      alt="YouTube short preview"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
                    />

                    {/* Dark gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Hover play button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-2xl transition-all duration-300 group-hover:scale-115">
                        <PlayIcon className="h-6 w-6 text-[#FF0000] ml-0.5" />
                      </span>
                    </div>

                    {/* YouTube badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      <YouTubeBrandIcon className="h-3.5 w-3.5" />
                      <span>YouTube Short</span>
                    </div>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
