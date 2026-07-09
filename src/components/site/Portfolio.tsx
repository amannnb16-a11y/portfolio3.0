import { useState } from "react";

import animeFightingThumbnail1 from "../../assets/image/anime-fighting-thumbnail-1.webp";
import animeFightingThumbnail2 from "../../assets/image/anime-fighting-thumbnail-2.webp";
import animeFightingThumbnail3 from "../../assets/image/anime-fighting-thumbnail-3.webp";
import animeFightingThumbnail4 from "../../assets/image/anime-fighting-thumbnail-4.webp";
import animeFightingThumbnail5 from "../../assets/image/anime-fighting-thumbnail-5.webp";
import simulatorProgressionThumbnail1 from "../../assets/image/simulator-progression-thumbnail-1.webp";
import simulatorProgressionThumbnail2 from "../../assets/image/simulator-progression-thumbnail-2.webp";
import simulatorProgressionThumbnail3 from "../../assets/image/simulator-progression-thumbnail-3.webp";
import simulatorProgressionThumbnail4 from "../../assets/image/simulator-progression-thumbnail-4.webp";
import simulatorProgressionThumbnail5 from "../../assets/image/simulator-progression-thumbnail-5.webp";
import horrorMysteryThumbnail1 from "../../assets/image/horror-mystery-thumbnail-1.webp";
import horrorMysteryThumbnail2 from "../../assets/image/horror-mystery-thumbnail-2.webp";
import horrorMysteryThumbnail3 from "../../assets/image/horror-mystery-thumbnail-3.webp";
import militaryActionRpThumbnail1 from "../../assets/image/military-action-rp-thumbnail-1.webp";
import militaryActionRpThumbnail2 from "../../assets/image/military-action-rp-thumbnail-2.webp";
import militaryActionRpThumbnail3 from "../../assets/image/military-action-rp-thumbnail-3.webp";
import cityLifestyleRpThumbnail1 from "../../assets/image/city-lifestyle-rp-thumbnail-1.webp";
import cityLifestyleRpThumbnail2 from "../../assets/image/city-lifestyle-rp-thumbnail-2.webp";
import cityLifestyleRpThumbnail3 from "../../assets/image/city-lifestyle-rp-thumbnail-3.webp";
import cityLifestyleRpThumbnail4 from "../../assets/image/city-lifestyle-rp-thumbnail-4.webp";
import cityLifestyleRpThumbnail5 from "../../assets/image/city-lifestyle-rp-thumbnail-5.webp";
import cityLifestyleRpThumbnail6 from "../../assets/image/city-lifestyle-rp-thumbnail-6.webp";
import animeFightingIcon1 from "../../assets/image/anime-fighting-icon-1.webp";
import cityLifestyleRpIcon1 from "../../assets/image/city-lifestyle-rp-icon-1.webp";
import simulatorProgressionIcon1 from "../../assets/image/simulator-progression-icon-1.webp";
import simulatorProgressionIcon2 from "../../assets/image/simulator-progression-icon-2.webp";

type Item = {
  id: string;
  title: string;
  genre: string;
  type: "Icon" | "Thumbnail";
  image: string;
};

const items: Item[] = [
  { id: "anime-thumb-1", title: "Anime/Fighting Thumbnail 1", genre: "Anime/Fighting", type: "Thumbnail", image: animeFightingThumbnail1 },
  { id: "anime-thumb-2", title: "Anime/Fighting Thumbnail 2", genre: "Anime/Fighting", type: "Thumbnail", image: animeFightingThumbnail2 },
  { id: "anime-thumb-3", title: "Anime/Fighting Thumbnail 3", genre: "Anime/Fighting", type: "Thumbnail", image: animeFightingThumbnail3 },
  { id: "anime-thumb-4", title: "Anime/Fighting Thumbnail 4", genre: "Anime/Fighting", type: "Thumbnail", image: animeFightingThumbnail4 },
  { id: "anime-thumb-5", title: "Anime/Fighting Thumbnail 5", genre: "Anime/Fighting", type: "Thumbnail", image: animeFightingThumbnail5 },
  { id: "sim-thumb-1", title: "Simulator/Progression Thumbnail 1", genre: "Simulator/Progression", type: "Thumbnail", image: simulatorProgressionThumbnail1 },
  { id: "sim-thumb-2", title: "Simulator/Progression Thumbnail 2", genre: "Simulator/Progression", type: "Thumbnail", image: simulatorProgressionThumbnail2 },
  { id: "sim-thumb-3", title: "Simulator/Progression Thumbnail 3", genre: "Simulator/Progression", type: "Thumbnail", image: simulatorProgressionThumbnail3 },
  { id: "sim-thumb-4", title: "Simulator/Progression Thumbnail 4", genre: "Simulator/Progression", type: "Thumbnail", image: simulatorProgressionThumbnail4 },
  { id: "sim-thumb-5", title: "Simulator/Progression Thumbnail 5", genre: "Simulator/Progression", type: "Thumbnail", image: simulatorProgressionThumbnail5 },
  { id: "horror-thumb-1", title: "Horror/Mystery Thumbnail 1", genre: "Horror/Mystery", type: "Thumbnail", image: horrorMysteryThumbnail1 },
  { id: "horror-thumb-2", title: "Horror/Mystery Thumbnail 2", genre: "Horror/Mystery", type: "Thumbnail", image: horrorMysteryThumbnail2 },
  { id: "horror-thumb-3", title: "Horror/Mystery Thumbnail 3", genre: "Horror/Mystery", type: "Thumbnail", image: horrorMysteryThumbnail3 },
  { id: "military-thumb-1", title: "Military/Action/RP Thumbnail 1", genre: "Military/Action/RP", type: "Thumbnail", image: militaryActionRpThumbnail1 },
  { id: "military-thumb-2", title: "Military/Action/RP Thumbnail 2", genre: "Military/Action/RP", type: "Thumbnail", image: militaryActionRpThumbnail2 },
  { id: "military-thumb-3", title: "Military/Action/RP Thumbnail 3", genre: "Military/Action/RP", type: "Thumbnail", image: militaryActionRpThumbnail3 },
  { id: "city-thumb-1", title: "City/Lifestyle/RP Thumbnail 1", genre: "City/Lifestyle/RP", type: "Thumbnail", image: cityLifestyleRpThumbnail1 },
  { id: "city-thumb-2", title: "City/Lifestyle/RP Thumbnail 2", genre: "City/Lifestyle/RP", type: "Thumbnail", image: cityLifestyleRpThumbnail2 },
  { id: "city-thumb-3", title: "City/Lifestyle/RP Thumbnail 3", genre: "City/Lifestyle/RP", type: "Thumbnail", image: cityLifestyleRpThumbnail3 },
  { id: "city-thumb-4", title: "City/Lifestyle/RP Thumbnail 4", genre: "City/Lifestyle/RP", type: "Thumbnail", image: cityLifestyleRpThumbnail4 },
  { id: "city-thumb-5", title: "City/Lifestyle/RP Thumbnail 5", genre: "City/Lifestyle/RP", type: "Thumbnail", image: cityLifestyleRpThumbnail5 },
  { id: "city-thumb-6", title: "City/Lifestyle/RP Thumbnail 6", genre: "City/Lifestyle/RP", type: "Thumbnail", image: cityLifestyleRpThumbnail6 },
  { id: "anime-icon-1", title: "Anime/Fighting Icon 1", genre: "Anime/Fighting", type: "Icon", image: animeFightingIcon1 },
  { id: "city-icon-1", title: "City/Lifestyle/RP Icon 1", genre: "City/Lifestyle/RP", type: "Icon", image: cityLifestyleRpIcon1 },
  { id: "sim-icon-1", title: "Simulator/Progression Icon 1", genre: "Simulator/Progression", type: "Icon", image: simulatorProgressionIcon1 },
  { id: "sim-icon-2", title: "Simulator/Progression Icon 2", genre: "Simulator/Progression", type: "Icon", image: simulatorProgressionIcon2 },
];

const categories = ["Featured", "Anime/Fighting", "Simulator/Progression", "Horror/Mystery", "Military/Action/RP", "City/Lifestyle/RP", "Icons", "Thumbnails"] as const;
type Category = typeof categories[number];

function matches(item: Item, cat: Category) {
  if (cat === "Featured") return item.type === "Thumbnail";
  if (cat === "Icons") return item.type === "Icon";
  if (cat === "Thumbnails") return item.type === "Thumbnail";
  return item.type === "Thumbnail" && item.genre === cat;
}

export function Portfolio() {
  const [cat, setCat] = useState<Category>("Featured");
  const visible = items.filter((i) => matches(i, cat));

  return (
    <section id="work" className="py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Curated work, organized by genre"
        />

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                cat === c
                  ? "bg-gradient-cyan text-primary-foreground glow-cyan"
                  : "border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-cyan/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-gradient-cyan px-5 py-3 text-sm font-semibold text-primary-foreground glow-cyan">
            DM Me on Discord
          </a>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item }: { item: Item }) {
  return (
    <article className="card-premium card-premium-hover overflow-hidden">
      <div className={`relative overflow-hidden bg-surface ${item.type === "Icon" ? "aspect-square" : "aspect-video"}`}>
        <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-black/50 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white border border-white/10">{item.genre}</span>
          <span className="rounded-full bg-cyan/90 text-primary-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">{item.type}</span>
        </div>
        <div className="absolute inset-x-4 bottom-4">
          <h3 className="font-display font-bold text-white text-xl leading-tight">{item.title}</h3>
        </div>
      </div>
    </article>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = false }: { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}>
      <div className="text-xs font-semibold uppercase tracking-widest text-cyan">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
