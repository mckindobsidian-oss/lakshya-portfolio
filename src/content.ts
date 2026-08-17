// ============================================================================
//  ⭐ YOUR SITE CONTENT — edit everything here and the whole site updates.
//  Anything marked TODO is a placeholder: replace it with your real info.
// ============================================================================

import { images } from "./assets/images";

export const site = {
  name: "Lakshya Gupta",
  heroSub:
    "Thirteen, endlessly curious, and never quite done. By day a school student; by choice a chess player chasing the International Master title, a Minecraft creator building worlds for Blockwise, and a young coder teaching himself to bring ideas to life. This is where all of that lives.",
  bio: "I'm Lakshya, 13 years old. Chess is my main thing — I play on chess.com and lichess every day, and my goal is International Master. When I'm off the board, I make Minecraft content on Blockwise, my YouTube channel. Two hobbies, one site.",

  links: {
    youtube: "https://www.youtube.com/@blockwise15",
    email: "lakshyagupta652@gmail.com",
    discord: "https://discord.com/users/mossmirage_", // TODO: replace with a server invite if you have one
    instagram: "https://instagram.com/its.montague",
    chesscom: "https://www.chess.com/member/lakshya_gupta_vic",
    lichess: "https://lichess.org/@/lakshyagupta15",
  },

  youtube: {
    channelName: "Blockwise",
    handle: "@blockwise15",
    // TODO: your real subscriber count, e.g. "12K" (empty shows "coming soon")
    subscribers: "",
  },

  chess: {
    goal: "International Master",
    stats: [
      { label: "Chess.com rating", value: "1150" },
      { label: "Lichess rating", value: "1500" },
      { label: "Tournaments played", value: "30+" },
      { label: "Best win (rated)", value: "1800" },
    ],
  },

  // shown in the footer bar, like "AI-FIRST · FINANCE-SMART · SYSTEMS-MINDED"
  footerMotto: "ONE MOVE AT A TIME · ONE BUILD AT A TIME · ONE DREAM AT A TIME",

  web3forms: {
    // Web3Forms access key — emails lakshyagupta652@gmail.com directly
    accessKey: "35490032-a6a5-4b3a-bb68-d17c585c981f",
  },
};

// ---- ACHIEVEMENTS (shown as a sliding carousel on the About page) ----------
// Drop your photos into src/assets/photos/ and put the path here,
// e.g. photo: "/src/assets/photos/my-photo.jpg".
export const achievements = [
  {
    title: "CBSE Nationals",
    tag: "Nationals · 2025",
    detail:
      "Placed 9th at the CBSE Nationals 2025 — my first time on the national stage, facing the best young players from across India.",
    photo: images.cbse,
  },
  {
    title: "Haryana State",
    tag: "State · 2023",
    detail:
      "Runner-up at the Haryana State Championship 2023 — 2nd place among the strongest players my state has to offer.",
    photo: images.haryana,
  },
  {
    title: "Chess badge",
    tag: "FIDE rated",
    detail: "A badge from a FIDE-rated tournament — stepping into official rated chess for the first time.",
    photo: images.chessBadge,
  },
  {
    title: "Lakshya Gupta badge",
    tag: "Delhi",
    detail:
      "My first FIDE-rated tournament, in Delhi — the badge that marks where the serious chess began.",
    photo: images.badge,
  },
  {
    title: "The website",
    tag: "First code",
    detail:
      "My first self-coded website — this very portfolio, built line by line from a blank page.",
    photo: images.website,
  },
  {
    title: "Life Beyond Earth",
    tag: "Book · briBooks",
    detail:
      "Certificate for writing my first book, Life Beyond Earth — published on briBooks, written for dreamers who stare at the night sky.",
    photo: images.bookCert,
  },
];

// ---- GALLERY (scroll dive) -------------------------------------------------
// Photos coming soon — drop them into src/assets/photos/ and add entries here,
// e.g. { title, tag, description, photo: "/src/assets/photos/my-photo.jpg" }.
export const gallery: {
  title: string;
  tag: string;
  description: string;
  photo: string;
}[] = [];

// ---- MY CREATIONS ----------------------------------------------------------
export const creations = [
  {
    title: "Life Beyond Earth",
    tag: "Book",
    detail:
      "My first book, published on briBooks — a journey into what lies beyond our planet, written for dreamers who stare at the night sky.",
    href: "https://www.bribooks.com/bookstore/life-beyond-earth-by-lakshya-gupta/",
    cover: images.bookCover,
  },
];

// ---- YOUTUBE / VIDEOS ------------------------------------------------------
// Just the video IDs — the thumbnail is fetched straight from YouTube and the
// card links to the video. No descriptions, exactly as asked.
export const videos = [
  { id: "ZUsTbJAdICQ" },
  { id: "wrdGqyJZVxY" },
  { id: "GmuzeWZ_7S8" },
  { id: "Nu_PZKnj15A" },
];
