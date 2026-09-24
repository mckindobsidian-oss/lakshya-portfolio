import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Reveal from "../components/Reveal";
import {
  CheckIcon,
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
    copyValue: site.links.email,
  },
  {
    icon: <YouTubeBrandIcon className="h-5 w-5" />,
    title: "YouTube",
    sub: site.youtube.handle,
    href: site.links.youtube,
    external: true,
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
    sub: "lakshyagupta15",
    href: site.links.chesscom,
    external: true,
  },
  {
    icon: <LichessIcon className="h-5 w-5" />,
    title: "Lichess",
    sub: "lakshyagupta15",
    href: site.links.lichess,
    external: true,
  },
];

const inputCls =
  "w-full rounded-2xl border border-[#332820] bg-[#1e1813] px-4 py-3.5 text-sm text-[#f0ebe3] placeholder:text-[#a39a8e]/60 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/40";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    showToast(`Copied ${label} to clipboard!`);
  };

  // sends the message straight to Web3Forms — TEMPORARY DEBUG BUILD v2
  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const accessKey = site.web3forms.accessKey;
    const endpoint = "https://api.web3forms.com/submit";

    console.log("=== Web3Forms Debug v2 ===");
    console.log("Endpoint:", endpoint);
    console.log("Access key exists:", Boolean(accessKey));
    console.log("Access key length:", accessKey?.length ?? 0);
    console.log("Access key type:", typeof accessKey);
    console.log("Access key first 4 chars:", accessKey?.slice(0, 4));

    // Log payload field metadata (never log actual values)
    const nameVal = name.trim();
    const emailVal = email.trim();
    const messageVal = message.trim();
    console.log("--- Payload fields ---");
    console.log("name exists:", Boolean(nameVal), "| length:", nameVal.length);
    console.log("email exists:", Boolean(emailVal), "| length:", emailVal.length);
    console.log("email looks valid:", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal));
    console.log("message exists:", Boolean(messageVal), "| length:", messageVal.length);

    try {
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("subject", `Message from ${nameVal || "a visitor"} — ${site.name}`);
      formData.append("name", nameVal);
      formData.append("email", emailVal);
      formData.append("message", messageVal);
      formData.append("from_name", nameVal || "Website visitor");
      if (emailVal) formData.append("_replyto", emailVal);
      formData.append("botcheck", "");

      // Log all FormData keys
      const keys: string[] = [];
      formData.forEach((_val, key) => keys.push(key));
      console.log("FormData keys:", keys);

      console.log("Sending fetch...");
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      console.log("Web3Forms status:", res.status);
      console.log("Web3Forms ok:", res.ok);
      console.log("Web3Forms content-type:", res.headers.get("content-type"));

      const raw = await res.text();
      console.log("Web3Forms raw response:", raw);

      let data: { success?: boolean; message?: string };
      try {
        data = JSON.parse(raw);
        console.log("Web3Forms parsed JSON:", data);
      } catch (parseErr) {
        console.error("Web3Forms JSON parse error:", parseErr);
        console.error("Raw was not JSON. First 500 chars:", raw.slice(0, 500));
        setStatus("error");
        return;
      }

      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.warn("Web3Forms returned success=false:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Web3Forms fetch/network error:", err);
      console.error("Error name:", (err as Error)?.name);
      console.error("Error message:", (err as Error)?.message);
      setStatus("error");
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#130f0c] px-4 py-2.5 text-xs font-semibold text-[#f0ebe3] shadow-2xl backdrop-blur-md border border-[#332820]"
          >
            <CheckIcon className="h-4 w-4 text-accent" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- STATEMENT HERO ---------- */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow on-photo">Contact</p>
            <h1 className="on-photo mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl sm:leading-[1.05]">
              Let's talk.{" "}
              <span className="rounded-2xl border border-[#332820] bg-accent px-3.5 py-1 text-black font-semibold shadow-2xs">
                Or play a game.
              </span>
            </h1>
            <p className="on-photo-soft mt-6 max-w-2xl text-lg leading-relaxed">
              Chess challenges, collaboration ideas, or inquiries — I read everything. Reach me directly via email or connect through any of the platforms below.
            </p>
          </Reveal>

          {/* Direct quick channel pills */}
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-3">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-[#332820] bg-[#1a1410]/80 py-2.5 pl-3.5 pr-5 text-sm font-medium text-[#f0ebe3] shadow-2xs backdrop-blur-md transition-all duration-200 hover:border-accent hover:bg-[#221a14]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#241c16] text-[#f0ebe3] border border-[#332820] shadow-xs transition-colors duration-200 group-hover:bg-accent group-hover:text-black">
                    {c.icon}
                  </span>
                  <span>{c.title}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- EMAIL FORM (Warm Dark Panel + Web3Forms) ---------- */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <div className="flex h-full flex-col justify-between rounded-3xl bg-[#16120e] p-8 text-[#f0ebe3] shadow-xl border border-[#332820] sm:p-10 transition-colors hover:border-accent/50">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Email me
                    </p>
                    <span className="text-accent text-base">✦</span>
                  </div>
                  <h2 className="mt-6 font-serif text-3xl leading-snug text-[#f0ebe3] sm:text-4xl">
                    One message away.
                  </h2>
                  <p className="mt-5 leading-relaxed text-[#a39a8e]">
                    Write a few lines and they'll land straight in my inbox. No forms lost in
                    space — I actually read and reply.
                  </p>
                </div>
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={() => handleCopy(site.links.email, "Email")}
                    className="group inline-flex items-center gap-2 rounded-xl border border-[#332820] bg-[#1e1813] px-4 py-2.5 text-sm font-medium text-[#f0ebe3] transition-all hover:bg-accent hover:text-black hover:border-accent"
                  >
                    <span>{site.links.email}</span>
                    <span className="text-xs opacity-80 group-hover:opacity-100">📋 Copy</span>
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              {status === "sent" ? (
                /* success — message delivered */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center rounded-3xl bg-[#16120e] p-8 text-center border border-[#332820] shadow-xl sm:p-10"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-black shadow-md">
                    <CheckIcon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-[#f0ebe3]">
                    Message sent!
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-[#a39a8e]">
                    Thanks for reaching out — I'll get back to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 rounded-full border border-[#332820] px-6 py-2.5 text-sm font-medium text-[#f0ebe3] transition-colors hover:bg-accent hover:text-black hover:border-accent"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={sendEmail}
                  className="flex h-full flex-col gap-5 rounded-3xl border border-[#332820] bg-[#16120e] p-8 shadow-xl sm:p-10"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-[#f0ebe3]">
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
                      <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-[#f0ebe3]">
                        Your email <span className="font-normal text-[#a39a8e]">(optional)</span>
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
                    <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-[#f0ebe3]">
                      Message
                    </label>
                    <textarea
                      id="cf-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Want a game? A collab? Or just to say hi?"
                      className={`${inputCls} flex-1 resize-y`}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary"
                    >
                      <MailIcon className="h-4 w-4" />
                      <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                    </button>

                    {status === "error" && (
                      <p className="text-xs font-medium text-red-400">
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

      {/* ---------- CHANNELS ---------- */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow on-photo">Elsewhere</p>
            <h2 className="h2 on-photo">Pick your platform</h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 50}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-[#332820] bg-[#16120e] p-6 shadow-xs transition-all duration-200 hover:border-accent hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#241c16] text-[#f0ebe3] border border-[#332820] transition-colors duration-200 group-hover:bg-accent group-hover:text-black">
                      {c.icon}
                    </span>
                    <span className="text-xs font-mono text-[#a39a8e] group-hover:text-accent">↗</span>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-bold text-[#f0ebe3]">{c.title}</h3>
                    <p className="mt-1 truncate text-sm text-[#a39a8e]">{c.sub}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center gap-2 text-sm text-[#a39a8e]">
              <span className="font-display text-2xl text-[#f0ebe3]">♞</span>
              <span>Challenge me on</span>
              <a
                href={site.links.chesscom}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#f0ebe3] underline underline-offset-4 hover:text-accent"
              >
                chess.com/lakshyagupta15
              </a>
              <span>— I don't lose easily.</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
