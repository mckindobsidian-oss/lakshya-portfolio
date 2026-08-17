import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import Reveal from "../components/Reveal";
import { ChessBoardIcon } from "../components/Icons";
import { gallery } from "../content";

type GalleryItem = (typeof gallery)[number];

function ScrollPhoto({
  progress,
  active,
  i,
  count,
  item,
}: {
  progress: MotionValue<number>;
  active: boolean;
  i: number;
  count: number;
  item: GalleryItem;
}) {
  const start = i / count;
  const end = (i + 1) / count;
  const mid = (start + end) / 2;

  // "diving in": photo grows from behind, then zooms past as it leaves
  const scale = useTransform(progress, [start, mid, end], [0.9, 1, 1.06]);
  const y = useTransform(progress, [start, mid, end], [40, 0, -40]);
  const blurScale = useTransform(progress, [start, mid, end], [1.12, 1.05, 1]);

  // description slides in from the side
  const textX = useTransform(progress, [start, mid], [36, 0]);

  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0"
    >
      {/* blurred background that matches this photo */}
      <div className="absolute inset-0 overflow-hidden">
        {item.photo && (
          <motion.img
            src={item.photo}
            alt=""
            style={{ scale: blurScale }}
            className="h-full w-full object-cover blur-3xl"
          />
        )}
        <div className="absolute inset-0 bg-paper/80" />
      </div>

      {/* photo + description */}
      <div className="relative z-10 flex h-full items-center px-6">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <motion.div style={{ scale, y }} className="flex justify-center">
            {item.photo ? (
              <img
                src={item.photo}
                alt={item.title}
                className="max-h-[42vh] w-auto max-w-full rounded-2xl border border-line bg-surface object-contain shadow-2xl sm:max-h-[62vh] lg:max-h-[66vh]"
              />
            ) : (
              <div className="aspect-[4/3] w-full max-w-md rounded-2xl border border-line bg-card" />
            )}
          </motion.div>

          <motion.div
            style={{ x: textX }}
            className="rounded-2xl border border-line bg-card/90 p-6 backdrop-blur sm:p-8"
          >
            <p className="eyebrow">{item.tag}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 leading-relaxed text-soft">{item.description}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {i + 1} / {count}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ScrollGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const count = gallery.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  return (
    <section ref={ref} style={{ height: `${count * 80}vh` }} className="relative">
      <div className="sticky top-0 relative flex h-screen flex-col items-center justify-center overflow-hidden bg-paper">
        {gallery.map((g, i) => (
          <ScrollPhoto
            key={i}
            progress={scrollYProgress}
            active={i === active}
            i={i}
            count={count}
            item={g}
          />
        ))}

        {/* dive hint */}
        <p className="absolute top-8 z-20 text-xs font-semibold uppercase tracking-[0.25em] text-soft">
          Scroll to dive in ↓
        </p>

        {/* progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-0 z-20 h-1 w-full origin-left bg-ink"
        />
      </div>
    </section>
  );
}

export default function Gallery() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              My chess journey
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              Scroll through the moments — certificates, badges, and the story behind each one.
            </p>
          </Reveal>
        </div>
      </section>

      {gallery.length > 0 ? (
        /* the scroll dive */
        <ScrollGallery />
      ) : (
        /* photos coming soon */
        <section>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
            <Reveal>
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-card px-6 py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-ink">
                  <ChessBoardIcon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
                  Photos coming soon
                </h2>
                <p className="mt-3 max-w-md leading-relaxed text-soft">
                  I'm gathering my best chess moments — certificates, boards, and wins. They'll
                  land here shortly.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
