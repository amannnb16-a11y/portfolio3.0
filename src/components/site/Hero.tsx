import { MessageCircle, Mail, Package, Images, Sparkles } from "lucide-react";
import { DiscoveryMockup } from "./DiscoveryMockup";

const trust = [
  "Creating Roblox GFX since 2020",
  "5–7 day standard delivery",
  "Icons • Thumbnails • Ad Variants",
  "No revshare projects",
];

function smoothScrollTo(sectionId: string) {
  const target = document.querySelector(sectionId);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute top-40 right-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 text-xs font-medium text-cyan">
              <Sparkles size={12} /> Premium Roblox Launch & Ad Creative
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Premium Roblox <span className="text-gradient-cyan">Icons</span> &{" "}
              <span className="text-gradient-gold">Thumbnails</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              High-impact GFX packages for Roblox games launching, updating, or running ads — designed for genre fit, small-size readability and click appeal.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-gradient-cyan px-5 py-3 text-sm font-semibold text-primary-foreground glow-cyan hover:opacity-95">
                <MessageCircle size={16} /> DM on Discord
              </a>
              <a href="mailto:indentinaGFX@gmail.com" className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold hover:border-cyan/40">
                <Mail size={16} /> Email
              </a>
              <a href="#packages" onClick={(event) => { event.preventDefault(); smoothScrollTo("#packages"); }} className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold hover:border-cyan/40">
                <Package size={16} /> View Packages
              </a>
              <a href="#work" onClick={(event) => { event.preventDefault(); smoothScrollTo("#work"); }} className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold hover:border-cyan/40">
                <Images size={16} /> See Portfolio
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <DiscoveryMockup />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Designed to stand out in crowded game feeds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
