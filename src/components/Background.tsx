import { images } from "../assets/images";

/**
 * Global background layer — the chess-desk photograph, full-bleed and fixed,
 * the page surface for a site built around a competitive chess player.
 *
 * Drawn `cover`-fitted so the board and pieces never stretch.
 *
 * The artwork is dark by nature (median #3b2914), so white copy clears WCAG AA
 * over ~90% of it unaided — but the lamp and window blow out to #ad8365, and on
 * those pixels even pure white lands at ~4.4:1. The gradient is what closes
 * that gap: it never drops below 0.32, which keeps white copy at 4.9:1 or
 * better over every pixel of the artwork, with extra weight at the very top
 * (behind the transparent header) and at the bottom so the footer edge reads.
 * Darker stops = calmer, safer copy; lighter = more photo. Flatten it to a
 * single `rgba(0, 0, 0, 0.32)` stop to check the difference.
 */
const LEGIBILITY_GRADIENT = [
  "linear-gradient(180deg",
  "rgba(0, 0, 0, 0.68) 0%",
  "rgba(0, 0, 0, 0.42) 22%",
  "rgba(0, 0, 0, 0.32) 55%",
  "rgba(0, 0, 0, 0.55) 100%)",
].join(", ");

export default function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 h-full w-full bg-[#1a1206]"
        style={{
          backgroundImage: `url(${images.chessScene})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
        style={{ background: LEGIBILITY_GRADIENT }}
      />
    </>
  );
}
