import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ArrowLeft, Gamepad2, Rocket, Image as ImageIcon, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/beyond-roblox")({
  head: () => ({
    meta: [
      { title: "Game Launch Art Beyond Roblox — Indentina GFX" },
      { name: "description", content: "Steam capsule art, indie game key art and product launch visuals. Same premium standard, beyond Roblox." },
      { property: "og:title", content: "Game Launch Art Beyond Roblox — Indentina GFX" },
      { property: "og:description", content: "Steam capsule art, indie key art and launch visuals — premium creative beyond Roblox." },
    ],
  }),
  component: BeyondRoblox,
});

const offerings = [
  { icon: Gamepad2, title: "Steam Capsule Art", desc: "Header capsules, library art and store visuals built for Steam discovery." },
  { icon: Rocket, title: "Indie Game Key Art", desc: "Hero artwork for game pages, press kits and trailers." },
  { icon: ImageIcon, title: "Product / Game Launch Visuals", desc: "Launch banners, marketing creative, social and ad-ready exports." },
];

function BeyondRoblox() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-5xl px-5">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={14} /> Back to Roblox work
          </Link>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold">
            Expansion
          </div>

          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Game Launch Art <span className="text-gradient-gold">Beyond Roblox</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Same premium standard as my Roblox work, applied to Steam capsules, indie key art and broader game launch visuals. Roblox is still the main focus — this is for select projects outside that scope.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {offerings.map((o) => (
              <div key={o.title} className="card-premium card-premium-hover p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 border border-gold/30 text-gold">
                  <o.icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 card-premium p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">Working on a non-Roblox launch?</h2>
              <p className="mt-2 text-muted-foreground">DM on Discord with project details — happy to quote if it's the right fit.</p>
            </div>
            <Link to="/" hash="contact" className="inline-flex items-center gap-2 rounded-lg bg-gradient-cyan px-5 py-3 text-sm font-semibold text-primary-foreground glow-cyan">
              <MessageCircle size={16} /> Get In Touch
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
