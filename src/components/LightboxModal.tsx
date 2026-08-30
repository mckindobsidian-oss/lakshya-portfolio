import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type LightboxItem = {
  title: string;
  tag: string;
  detail: string;
  photo: string;
};

type LightboxProps = {
  item: LightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
};

export default function LightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: LightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // prevent background scrolling when modal is active
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md"
        >
          {/* Main Modal Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-paper shadow-2xl lg:flex-row"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image modal"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ink/75 text-paper backdrop-blur-md transition-all hover:scale-110 hover:bg-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Photo preview container */}
            <div className="relative flex flex-1 items-center justify-center bg-[#141414] p-4 sm:p-8">
              <img
                src={item.photo}
                alt={item.title}
                className="max-h-[50vh] w-auto max-w-full rounded-xl object-contain shadow-2xl lg:max-h-[75vh]"
              />

              {/* Prev / Next controls */}
              {hasPrev && onPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous item"
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/90"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}

              {hasNext && onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next item"
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/90"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>

            {/* Details panel */}
            <div className="flex w-full flex-col justify-between border-t border-line bg-surface p-6 lg:w-[320px] lg:border-l lg:border-t-0 lg:p-8">
              <div>
                <span className="eyebrow">{item.tag}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-soft">{item.detail}</p>
              </div>

              <div className="mt-8 border-t border-line/60 pt-4 text-xs font-semibold uppercase tracking-wider text-brown">
                Official Milestone
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
