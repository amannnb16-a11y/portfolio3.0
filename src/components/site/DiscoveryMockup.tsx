import frontPageImage1 from "../../assets/image/front-page-1.webp";
import frontPageImage2 from "../../assets/image/front-page-2.webp";
import frontPageImage3 from "../../assets/image/front-page-3.webp";
import frontPageImage4 from "../../assets/image/front-page-4.webp";
import frontPageImage5 from "../../assets/image/front-page-5.webp";
import frontPageImage6 from "../../assets/image/front-page-6.webp";

/**
 * Roblox-discovery-inspired mockup. Generic-on-purpose: not an official UI.
 * Uses replaceable image files from src/assets/image for all 6 front-page tiles.
 */
const tiles = [
  { id: 0, image: frontPageImage1, featured: false, title: "Game 1" },
  { id: 1, image: frontPageImage2, featured: true, title: "Featured Launch" },
  { id: 2, image: frontPageImage3, featured: false, title: "Game 3" },
  { id: 3, image: frontPageImage4, featured: false, title: "Game 4" },
  { id: 4, image: frontPageImage5, featured: true, title: "Featured Launch" },
  { id: 5, image: frontPageImage6, featured: false, title: "Game 6" },
];

export function DiscoveryMockup() {
  return (
    <div className="relative rounded-2xl border border-border bg-gradient-card p-4 sm:p-5 glow-soft">
      {/* fake browser chrome */}
      <div className="flex items-center gap-1.5 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan/70" />
        <div className="ml-3 h-5 flex-1 rounded-md bg-background/50 border border-border" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Popular Today</div>
        <div className="text-xs text-muted-foreground">Discovery</div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {tiles.map((tile) => (
          <Tile key={tile.id} featured={tile.featured} image={tile.image} title={tile.title} index={tile.id} />
        ))}
      </div>
    </div>
  );
}

function Tile({
  featured,
  image,
  title,
  index,
}: {
  featured: boolean;
  image: string;
  title: string;
  index: number;
}) {
  return (
    <div className="relative">
      <div
        className={`relative aspect-video overflow-hidden rounded-xl border ${
          featured
            ? "border-cyan/60 glow-cyan ring-1 ring-gold/30"
            : "border-border opacity-70"
        } transition-all`}
        style={featured ? { transform: "scale(1.03)" } : undefined}
      >
        <img
          src={image}
          alt={`Front page discovery preview ${index + 1}`}
          className="h-full w-full object-cover"
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        {featured && (
          <div className="absolute left-2 top-2 rounded-full bg-cyan/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
            Premium GFX
          </div>
        )}
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[10px]">
        <span className={`truncate ${featured ? "text-white font-semibold" : "text-muted-foreground"}`}>
          {title}
        </span>
        <span className="text-muted-foreground">·</span>
      </div>
    </div>
  );
}
