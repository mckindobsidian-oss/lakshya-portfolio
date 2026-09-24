import { site } from "../content";

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts?: object) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-[#332820]/70 bg-[#130f0c] px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.18em] text-[#a39a8e] sm:flex-row">
        <p>© 2026 {site.name.toUpperCase()}</p>
        <p className="text-center text-[#f0ebe3]">{site.footerMotto}</p>
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex items-center gap-1.5 text-accent transition-colors hover:text-[#f0ebe3]"
        >
          <span>Top</span>
          <span className="transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
        </button>
      </div>
    </footer>
  );
}
