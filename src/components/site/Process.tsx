import { FileText, Lightbulb, Palette, Send } from "lucide-react";
import { SectionHeader } from "./Portfolio";

const steps = [
  { icon: FileText, title: "Send Your Game Details", desc: "Send your game link, genre, deadline, required assets and references." },
  { icon: Lightbulb, title: "Creative Direction", desc: "We identify the strongest visual hook: action, reward, mystery, character, progression or atmosphere." },
  { icon: Palette, title: "GFX Production", desc: "I build the scene, lighting, composition and Photoshop polish." },
  { icon: Send, title: "Delivery & Revisions", desc: "You receive .png files with included minor revisions." },
];

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Process"
          title="A simple 4-step flow"
          subtitle="No mystery. No back-and-forth on basics. Send what's needed up front and the work moves fast."
          center
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card-premium card-premium-hover p-6 relative">
              <div className="absolute top-4 right-5 font-display text-5xl font-bold text-cyan/10">0{i + 1}</div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/10 border border-cyan/30 text-cyan">
                <s.icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
