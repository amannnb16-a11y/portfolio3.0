import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./Portfolio";

const faqs = [
  { q: "Do you only make Roblox GFX?", a: "My main focus is Roblox icons, thumbnails and ad creatives. I can also create Discord banners and launch/social assets on request." },
  { q: "What do I need to send before ordering?", a: "Game link, genre, asset type, deadline, references, logo/text, characters/assets and any specific visual ideas." },
  { q: "Can you match my game's style?", a: "Yes. Each piece is designed around the game's genre, audience and visual hook." },
  { q: "Do you offer rush delivery?", a: "Yes — rush at +50% (3–5 days) and super rush at +100% (2–3 days), depending on scope." },
  { q: "Do you work for revenue share?", a: "No. I only accept paid projects." },
  { q: "Are source files included?", a: "PNG delivery is included. Source files are quoted separately." },
  { q: "Can you make multiple thumbnail variants for ads?", a: "Yes. The Ad Testing Pack is designed for teams that want several creative directions for launches, updates or ads." },
  { q: "Can you guarantee more clicks?", a: "No one can honestly guarantee performance without testing. My work is designed to improve first impression, readability and visual hook — actual performance depends on the game, audience, placement and offer." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeader eyebrow="FAQ" title="Common questions" center />
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="card-premium overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display font-semibold text-base">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-cyan transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`grid transition-all ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
