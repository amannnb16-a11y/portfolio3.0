import { Check, Crown } from "lucide-react";
import { SectionHeader } from "./Portfolio";

const packages = [
  {
    name: "Single Asset",
    price: "from $45",
    best: "Simple updates or one-off needs",
    features: ["1 icon OR 1 thumbnail", "PNG delivery", "2 minor revisions"],
    cta: "DM to Book",
    featured: false,
  },
  {
    name: "Starter Bundle",
    price: "$65",
    best: "Small launches or visual refreshes",
    features: ["1 icon", "1 thumbnail", "PNG delivery", "2 minor revisions"],
    cta: "Request This Package",
    featured: false,
  },
  {
    name: "Launch Pack",
    price: "$150",
    best: "Serious launches and updates",
    features: ["1 icon", "3 thumbnails", "Clear visual hook exploration", "PNG delivery", "2 revision rounds"],
    cta: "Book Launch Pack",
    featured: true,
  },
  {
    name: "Ad Testing Pack",
    price: "from $300",
    best: "Games running ads or testing hooks",
    features: ["5–8 creative variants", "Action, reward, progression, character, mystery angles", "Designed for launch/update/ad use", "PNG delivery"],
    cta: "Request This Package",
    featured: false,
  },
];

const monthly = {
  name: "Monthly Creative Slot",
  price: "from $399/mo",
  best: "Active games needing recurring update visuals",
  features: ["Recurring icons/thumbnails/social assets", "Priority slot", "Monthly refreshes"],
};

export function Packages() {
  return (
    <section id="packages" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Packages"
          title="Premium packages, not commission roulette"
          subtitle="Clear scopes priced for serious Roblox teams. The Launch Pack is the recommended choice for new releases and major updates."
          center
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <article
              key={p.name}
              className={`relative card-premium card-premium-hover p-6 flex flex-col ${
                p.featured ? "ring-1 ring-cyan/50 glow-cyan" : ""
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  <Crown size={11} /> Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <div className={`mt-2 text-3xl font-bold ${p.featured ? "text-gradient-cyan" : ""}`}>{p.price}</div>
              <p className="mt-2 text-xs text-muted-foreground">Best for: {p.best}</p>

              <ul className="mt-5 space-y-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  p.featured
                    ? "bg-gradient-cyan text-primary-foreground glow-cyan hover:opacity-95"
                    : "border border-border bg-surface hover:border-cyan/40"
                }`}
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-6 card-premium p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-gold">Optional</div>
            <h3 className="mt-1 font-display text-xl font-bold">{monthly.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">Best for: {monthly.best}</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              {monthly.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-foreground/90">
                  <Check size={14} className="text-gold" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gradient-gold">{monthly.price}</div>
            <a href="#contact" className="rounded-lg border border-gold/40 bg-gold/5 px-4 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10">
              Request Slot
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Rush delivery: +50% (3–5 days). Super rush: +100% (2–3 days). Source files quoted separately.
        </p>
      </div>
    </section>
  );
}
