import { Swords, TrendingUp, Ghost, Crosshair, Building2, PawPrint } from "lucide-react";
import { SectionHeader } from "./Portfolio";

const genres = [
  { icon: Swords, name: "Anime / Fighting / Battlegrounds", desc: "Impact poses, strong effects, dramatic lighting and readable action.", palette: "from-rose-600 via-fuchsia-700 to-indigo-900" },
  { icon: TrendingUp, name: "Simulator / Progression / Clicker", desc: "Clear Level 0 → Level 99 hooks, rewards, coins, pets and progression.", palette: "from-amber-500 via-orange-600 to-rose-700" },
  { icon: Ghost, name: "Horror / Mystery / Escape", desc: "Atmosphere, contrast, tension, darkness and curiosity.", palette: "from-slate-800 via-emerald-900 to-black" },
  { icon: Crosshair, name: "Military / Action / RP", desc: "Cinematic lighting, weapons, vehicles, uniforms and faction identity.", palette: "from-stone-700 via-zinc-800 to-slate-900" },
  { icon: Building2, name: "City / Lifestyle / RP", desc: "Soft neon, lifestyle framing and a clear social hook.", palette: "from-cyan-500 via-blue-600 to-purple-800" },
  { icon: PawPrint, name: "Pet / Casual / Social", desc: "Bright collection, progression sparkle and clean readable foreground.", palette: "from-pink-400 via-rose-500 to-amber-400" },
];

export function Genres() {
  return (
    <section id="genres" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Specialization"
          title="Best for these Roblox genres"
          subtitle="Each genre needs a different visual strategy. I design the hook around your audience — not a one-size template."
          center
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {genres.map((g) => (
            <article key={g.name} className="card-premium card-premium-hover overflow-hidden">
              <div className={`relative aspect-[16/9] bg-gradient-to-br ${g.palette}`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 grid place-items-center">
                  <g.icon size={42} className="text-white drop-shadow-lg" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg leading-tight">{g.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Other genres available if the project fits.
        </p>
      </div>
    </section>
  );
}
