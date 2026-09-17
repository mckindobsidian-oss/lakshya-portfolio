// ============================================================================
//  ⭐ YOUR SITE CONTENT — edit everything here and the whole site updates.
//  Anything marked TODO is a placeholder: replace it with your real info.
// ============================================================================

import { images } from "./assets/images";

export const site = {
  name: "Lakshya Gupta",
  heroSub:
    "Thirteen years old. Pursuing the International Master title in chess. Dedicated to deep calculation, quiet discipline, and continuous exploration.",
  bio: "A competitive chess player pursuing the International Master title, balancing tournament circuits with deep tactical study, creative writing, and digital strategy on Blockwise.",

  links: {
    youtube: "https://www.youtube.com/@blockwise15",
    email: "lakshyagupta652@gmail.com",
    chesscom: "https://www.chess.com/member/lakshya_gupta_vic",
    lichess: "https://lichess.org/@/lakshyagupta15",
  },

  youtube: {
    channelName: "Blockwise",
    handle: "@blockwise15",
    subscribers: "",
  },

  chess: {
    goal: "International Master",
    stats: [
      { label: "Chess.com Rating", value: "1400" },
      { label: "Lichess Rating", value: "1500" },
      { label: "Rated Tournaments", value: "30+" },
      { label: "Peak Rated Win", value: "1800" },
    ],
  },

  footerMotto: "STILL EXPLORING.",

  web3forms: {
    accessKey: "35490032-a6a5-4b3a-bb68-d17c585c981f",
  },
};

// ---- ACHIEVEMENTS (shown as a sliding carousel on the About page) ----------
export const achievements = [
  {
    title: "CBSE Nationals",
    tag: "National Stage · 2025",
    detail:
      "Secured 9th place at the CBSE National Championship, competing against India's elite junior circuit.",
    photo: images.cbse,
  },
  {
    title: "Haryana State Runner-Up",
    tag: "State Championship · 2023",
    detail:
      "Silver medalist at the Haryana State Championship, marking a definitive breakthrough in competitive play.",
    photo: images.haryana,
  },
  {
    title: "Official FIDE Rating",
    tag: "International Circuit",
    detail:
      "Official credentials from FIDE-rated over-the-board play, initiating the formal quest for International Master.",
    photo: images.chessBadge,
  },
  {
    title: "Delhi FIDE Championship",
    tag: "FIDE Rated · Delhi",
    detail:
      "Over-the-board tournament badge from high-intensity classical time controls in Delhi.",
    photo: images.badge,
  },
  {
    title: "This Space",
    tag: "Personal Archive · 2026",
    detail:
      "A tailored digital portfolio engineered to document milestones, strategy, and chess progression.",
    photo: images.website,
  },
  {
    title: "Published Author",
    tag: "Publication · briBooks",
    detail:
      "Author certificate for 'Life Beyond Earth', exploring astrophysics and speculative planetary exploration.",
    photo: images.bookCert,
  },
];

// ---- GALLERY (scroll dive & photo showcase) -------------------------------
export const gallery = [
  {
    title: "CBSE Nationals 2025",
    tag: "National Championship",
    category: "Chess",
    description:
      "Secured 9th place at the national junior level, testing preparation against seasoned competitors.",
    photo: images.cbse,
  },
  {
    title: "Haryana State Championship",
    tag: "State Championship",
    category: "Chess",
    description:
      "Silver medal finish at the Haryana State Championship 2023.",
    photo: images.haryana,
  },
  {
    title: "Official FIDE Rating Badge",
    tag: "FIDE Classical",
    category: "Milestones",
    description:
      "Credentials marking the entry into the international FIDE classical rating ladder.",
    photo: images.chessBadge,
  },
  {
    title: "Delhi FIDE Circuit",
    tag: "Delhi Circuit",
    category: "Milestones",
    description:
      "Over-the-board badge from competitive tournament rounds in Delhi.",
    photo: images.badge,
  },
  {
    title: "Life Beyond Earth Certificate",
    tag: "Publication",
    category: "Creations",
    description:
      "Author certificate awarded for the release of 'Life Beyond Earth' on briBooks.",
    photo: images.bookCert,
  },
  {
    title: "Personal Portfolio",
    tag: "Digital Archive",
    category: "Creations",
    description:
      "A personal space cataloging competitive chess milestones, publications, and creative projects.",
    photo: images.website,
  },
];

// ---- MY CREATIONS ----------------------------------------------------------
export const creations = [
  {
    title: "Life Beyond Earth",
    tag: "Hardcover & Digital",
    detail:
      "An exploratory volume on astrophysics, planetary science, and the prospective horizons of humanity beyond our atmosphere.",
    href: "https://www.bribooks.com/bookstore/life-beyond-earth-by-lakshya-gupta/",
    cover: images.bookMockup,
  },
];

// ---- YOUTUBE / VIDEOS ------------------------------------------------------
export const videos = [
  { id: "ZUsTbJAdICQ" },
  { id: "wrdGqyJZVxY" },
  { id: "GmuzeWZ_7S8" },
  { id: "Nu_PZKnj15A" },
];
