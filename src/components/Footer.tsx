import { site } from "../content";

export default function Footer() {
  return (
    <footer className="bg-[#191a14] px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 sm:flex-row">
        <p>© 2026 {site.name.toUpperCase()}</p>
        <p className="text-center">{site.footerMotto}</p>
      </div>
    </footer>
  );
}
