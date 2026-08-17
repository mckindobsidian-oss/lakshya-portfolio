import { useState, type FormEvent } from "react";

import Reveal from "../components/Reveal";
import {
  CheckIcon,
  DiscordIcon,
  InstagramBrandIcon,
  LichessIcon,
  MailIcon,
  YouTubeBrandIcon,
} from "../components/Icons";
import { images } from "../assets/images";
import { site } from "../content";

const channels = [
  {
    icon: <MailIcon className="h-5 w-5" />,
    title: "Email",
    sub: "lakshyagupta652@gmail.com",
    href: `mailto:${site.links.email}`,
    external: false,
    color: "#141414",
  },
  {
    icon: <DiscordIcon className="h-5 w-5" />,
    title: "Discord",
    sub: "mossmirage_",
    href: site.links.discord,
    external: true,
    color: "#5865F2",
  },
  {
    icon: <InstagramBrandIcon className="h-5 w-5" />,
    title: "Instagram",
    sub: "its.montague",
    href: site.links.instagram,
    external: true,
    color: "#E1306C",
  },
  {
    icon: <YouTubeBrandIcon className="h-5 w-5" />,
    title: "YouTube",
    sub: site.youtube.handle,
    href: site.links.youtube,
    external: true,
    color: "#FF0000",
  },
  {
    icon: (
      <img
        src={images.chesscomLogo}
        alt=""
        className="h-5 w-5 object-contain"
      />
    ),
    title: "Chess.com",
    sub: "lakshya_gupta_vic",
    href: site.links.chesscom,
    external: true,
    color: "#7FA650",
  },
  {
    icon: <LichessIcon className="h-5 w-5" />,
    title: "Lichess",
    sub: "lakshyagupta15",
    href: site.links.lichess,
    external: true,
    color: "#2b2b2b",
  },
];

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-soft/60 outline-none transition-colors focus:border-[#b1e533]";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  // sends the message straight to Web3Forms, which emails it to you
  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3forms.accessKey,
          subject: `Message from ${name.trim() || "a visitor"} — ${site.name}`,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          from_name: name.trim() || "Website visitor",
          _replyto: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ---------- STATEMENT HERO ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl sm:leading-[1.05]">
              Let's talk.{" "}
              <span className="bg-accent px-2 text-ink">Or play a game.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">
              Chess challenge, a collab, or just to say hi — I read everything. Reach me however
              you like, but Discord and email get the fastest answer.
            </p>
          </Reveal>

          {/* one of each, no duplicates */}
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-3">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-2.5 pl-3.5 pr-5 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ ["--brand" as string]: c.color }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{ color: c.color }}
                  >
                    {c.icon}
                  </span>
                  {c.title}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- EMAIL FORM (lime panel + Web3Forms) ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <div className="flex h-full flex-col justify-between rounded-3xl bg-accent p-8 sm:p-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                    Email me
                  </p>
                  <h2 className="mt-6 font-serif text-3xl leading-snug text-ink sm:text-4xl">
                    One message away.
                  </h2>
                  <p className="mt-5 leading-relaxed text-ink/75">
                    Write a few lines and they'll land straight in my inbox. No forms lost in
                    space — I actually reply.
                  </p>
                </div>
                <a
                  href={`mailto:${site.links.email}`}
                  className="mt-10 break-all text-sm font-semibold text-ink underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {site.links.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              {status === "sent" ? (
                /* success — message delivered */
                <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-accent p-8 text-center sm:p-10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
                    <CheckIcon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
                    Message sent!
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-ink/75">
                    Thanks for reaching out — I'll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 rounded-full border border-ink/30 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={sendEmail}
                  className="flex h-full flex-col gap-5 rounded-3xl border border-line bg-surface p-8 sm:p-10"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-ink">
                        Your name
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What should I call you?"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-ink">
                        Your email <span className="font-normal text-soft">(optional)</span>
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-ink">
                      Message
                    </label>
                    <textarea
                      id="cf-message"
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Want a game? A collab? Or just to say hi?"
                      className={`${inputCls} flex-1 resize-y`}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <button type="submit" disabled={status === "sending"} className="btn-primary">
                      <MailIcon className="h-4 w-4" />
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                    {status === "error" && (
                      <p className="text-xs font-medium text-[#b3452f]">
                        Something went wrong — please try again.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CHANNELS (brand-colored cards) ---------- */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Elsewhere</p>
            <h2 className="h2">Pick your platform</h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{ ["--brand" as string]: c.color }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-125"
                      style={{ color: c.color, backgroundColor: `${c.color}14` }}
                    >
                      {c.icon}
                    </span>
                    <span
                      className="h-2 w-2 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{ backgroundColor: c.color }}
                    />
                  </div>
                  <div className="mt-10">
                    <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-1 truncate text-sm text-soft">{c.sub}</p>
                  </div>
                  <span
                    className="mt-6 block h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: c.color }}
                  />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center gap-2 text-sm text-soft">
              <span className="font-display text-2xl text-ink">♞</span>
              <span>Challenge me on</span>
              <a
                href={site.links.chesscom}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brown underline underline-offset-4 hover:text-ink"
              >
                chess.com/lakshya_gupta_vic
              </a>
              <span>— I don't lose easily.</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
