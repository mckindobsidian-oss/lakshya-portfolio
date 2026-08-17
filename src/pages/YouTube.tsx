import Reveal from "../components/Reveal";
import { ExternalIcon, PlayIcon, YouTubeBrandIcon } from "../components/Icons";
import { site, videos } from "../content";

export default function YouTube() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">YouTube</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {site.youtube.channelName}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              Blockwise — Minecraft tips, PvP, and mods. All my videos live on the channel.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-8">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <YouTubeBrandIcon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    {site.youtube.channelName} <span className="text-soft">{site.youtube.handle}</span>
                  </h2>
                  <p className="mt-1 text-sm text-soft">
                    {site.youtube.subscribers
                      ? `${site.youtube.subscribers} subscribers`
                      : "Subscriber count coming soon"}
                  </p>
                </div>
              </div>
              <a href={site.links.youtube} target="_blank" rel="noreferrer" className="btn-primary">
                <YouTubeBrandIcon className="h-4 w-4" />
                Visit channel
                <ExternalIcon />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Recent videos</p>
            <h2 className="h2">Latest shorts</h2>
          </Reveal>

          {/* just the preview — tap to watch, no descriptions, bigger cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 70}>
                <a
                  href={`https://www.youtube.com/shorts/${v.id}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Watch short on YouTube"
                  className="group relative block overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-200 hover:shadow-lg"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt="YouTube short preview"
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-ink opacity-0 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      <PlayIcon className="h-5 w-5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
