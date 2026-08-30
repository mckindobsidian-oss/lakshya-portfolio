import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { ArrowRightIcon } from "../components/Icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-20">
      <div className="mx-auto w-full max-w-2xl text-center">
        <Reveal>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs">
            <span className="h-2 w-2 rounded-full bg-accent status-live-dot" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
              404 · Out of Bounds
            </p>
          </div>

          {/* Large Hero 404 Graphic */}
          <h1 className="mt-8 font-display text-7xl font-extrabold tracking-tight text-ink sm:text-9xl">
            4<span className="text-accent">0</span>4
          </h1>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Lost on the board?
          </h2>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-soft">
            The page you are looking for doesn't exist, has been moved, or this move is out of bounds. Let's get you back into the game.
          </p>

          {/* Action Navigation Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link to="/" className="btn-primary group">
                <span>Return to Home</span>
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link to="/about" className="btn-ghost">
                <span>About Me</span>
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
