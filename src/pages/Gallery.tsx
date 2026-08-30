import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightboxModal, { type LightboxItem } from "../components/LightboxModal";
import Reveal from "../components/Reveal";
import { images } from "../assets/images";

type GalleryPhoto = {
  id: string;
  title: string;
  category: string;
  tag: string;
  desc: string;
  photo: string;
};

const photos: GalleryPhoto[] = [
  {
    id: "photo-1",
    title: "Shri Krishna Arjun Kapidhwaj Rath",
    category: "Landmarks",
    tag: "Kurukshetra · Monument",
    desc: "The monumental bronze chariot statue depicting Lord Krishna delivering the Gita to Arjuna at Kurukshetra.",
    photo: images.krishnaArjunRath,
  },
  {
    id: "photo-2",
    title: "Brahma Sarovar Sacred Waters",
    category: "Landmarks",
    tag: "Kurukshetra · Heritage",
    desc: "Expansive panoramic view across the sacred water reservoir of Brahma Sarovar with distant temple shrines.",
    photo: images.brahmaSarovarWide,
  },
  {
    id: "photo-3",
    title: "Sarovar Bridge Promenade",
    category: "Landmarks",
    tag: "Kurukshetra · Walkway",
    desc: "The wide bridge walkway with decorative railings and vintage lamp posts connecting sacred ghats.",
    photo: images.sarovarBridge,
  },
  {
    id: "photo-4",
    title: "Sunset at Sarveshwar Mahadev Temple",
    category: "Travel",
    tag: "Kurukshetra · Golden Hour",
    desc: "Evening view of the ancient temple situated in the center of Brahma Sarovar during golden hour.",
    photo: images.sunsetTemple,
  },
  {
    id: "photo-5",
    title: "Kurukshetra Heritage & Science Centre",
    category: "Travel",
    tag: "Science & Heritage",
    desc: "Exploring historic dioramas, ancient history exhibits, and heritage at the science center.",
    photo: images.museumSelfie,
  },
  {
    id: "photo-6",
    title: "Brahma Sarovar Ghats",
    category: "Travel",
    tag: "Kurukshetra · Travel",
    desc: "Selfie by the historic water ghats of Brahma Sarovar during travels in Haryana.",
    photo: images.lakeSelfie,
  },
  {
    id: "photo-7",
    title: "Kurukshetra Roadways at Dusk",
    category: "Travel",
    tag: "Road Journey",
    desc: "Evening transit through Kurukshetra along Pipli-Ladwa road and Mathana Chowki.",
    photo: images.kurukshetraRoad,
  },
  {
    id: "photo-8",
    title: "Sunlit Garden Walkway",
    category: "Nature",
    tag: "Gardens · Nature",
    desc: "A peaceful paved walkway sheltered under tall green trees with warm sunlight breaking through the canopy.",
    photo: images.gardenPath,
  },
  {
    id: "photo-9",
    title: "Twilight Canopy & Nightfall",
    category: "Nature",
    tag: "Atmosphere",
    desc: "Moody silhouettes of towering trees against the evening twilight sky with distant glowing streetlights.",
    photo: images.twilightTrees,
  },
];

const categories = ["All Photos", "Landmarks", "Travel", "Nature"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [selectedPhoto, setSelectedPhoto] = useState<LightboxItem | null>(null);

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === "All Photos") return true;
    return p.category === activeCategory;
  });

  const handleOpenPhoto = (p: GalleryPhoto) => {
    setSelectedPhoto({
      title: p.title,
      tag: p.tag,
      detail: p.desc,
      photo: p.photo,
    });
  };

  return (
    <>
      <LightboxModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* ---------- HERO ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-accent status-live-dot" />
              <span>Photo Vault · Visual Journey</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Photo Vault
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              Real moments, travels, and photographic captures. Click any card to inspect the full-resolution photo.
            </p>
          </Reveal>

          {/* Filter Pills */}
          <Reveal delay={90}>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-ink text-paper shadow-xs"
                      : "border border-line bg-white text-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- PHOTOS GRID ---------- */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => handleOpenPhoto(item)}
                whileHover={{ y: -6 }}
                className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white shadow-xs transition-all duration-300 hover:border-accent hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                  <img
                    src={item.photo}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      ↗
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-block rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-bold text-ink">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-soft">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-line pt-3 text-xs font-semibold text-accent">
                    View Photo ↗
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
