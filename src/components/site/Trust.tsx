import { Check, X } from "lucide-react";
import { SectionHeader } from "./Portfolio";

const trust = [
  "50% upfront or 100% upfront",
  "No revenue share / percentages",
  "Standard delivery: 5–7 days",
  "Rush available at added cost",
  "2 minor revisions included",
  "Source files quoted separately",
  "PNG delivery included",
  "Clear communication and updates",
  "Terms & Conditions available on request",
];

const notFit = [
  "Revshare-only projects",
  "Unlimited revisions",
  "Vague projects with no playable progress",
  "Same-day rush without rush fee",
  "Extremely low-budget commissions",
];

export function Trust() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Trust & Terms"
          title="How I work"
          subtitle="I work best with serious games, launches, updates and teams that value polished presentation."
          center
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <div className="card-premium p-7">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan">What's included</div>
            <ul className="mt-4 space-y-2.5">
              {trust.map((t) => (
                <li key={t} className="flex gap-3 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-premium p-7 border-destructive/20">
            <div className="text-xs font-semibold uppercase tracking-widest text-destructive">Not a fit</div>
            <ul className="mt-4 space-y-2.5">
              {notFit.map((t) => (
                <li key={t} className="flex gap-3 text-sm">
                  <X size={16} className="mt-0.5 shrink-0 text-destructive" />
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
