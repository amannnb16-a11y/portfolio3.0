import { SectionHeader } from "./Portfolio";

const cases = [
  {
    title: "Simulator Thumbnail Refresh",
    type: "Simulator / Progression",
    goal: "Make the game loop instantly understandable.",
    challenge: "Existing thumbnail buried the reward and read as generic at small sizes.",
    choices: [
      "Larger central character",
      "Stronger before/after progression",
      "Brighter reward icons",
      "Simplified background",
      "Stronger contrast for mobile readability",
    ],
    deliverables: "1 icon, 3 thumbnails, ad crops",
    result: "Refreshed visuals built around a clear Level 0 → 99 hook.",
    cta: "Need a visual refresh like this? DM me.",
    palette: "from-amber-500 via-orange-600 to-rose-700",
  },
  {
    title: "Anime Battlegrounds Launch Pack",
    type: "Anime / Fighting",
    goal: "Communicate genre, power fantasy and roster in one glance.",
    challenge: "Crowded category — needed a clear focal hero and impact moment.",
    choices: [
      "Single hero focal subject",
      "Rim-light + chromatic effect to sell power",
      "Faction-color secondary roster band",
      "Mobile-readable composition test at thumbnail scale",
    ],
    deliverables: "1 icon, 3 thumbnails, 2 ad variants",
    result: "Genre-fit visual set ready for launch day and ad rotation.",
    cta: "Launching soon? DM me.",
    palette: "from-rose-600 via-fuchsia-700 to-indigo-900",
  },
  {
    title: "Horror Update Visual Hook",
    type: "Horror / Mystery",
    goal: "Sell atmosphere without spoiling the scare.",
    challenge: "Previous thumbnails over-explained and killed curiosity.",
    choices: [
      "Single warm light source in deep shadow",
      "Negative space to imply threat",
      "Cropped silhouette as the hook",
      "Cool/warm contrast for instant readability",
    ],
    deliverables: "1 icon, 2 thumbnails",
    result: "A tense, curiosity-led visual built around restraint.",
    cta: "Want this energy? DM me.",
    palette: "from-slate-800 via-emerald-900 to-black",
  },
];

export function CaseStudies() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Case Studies"
          title="Creative rationale, not just pretty renders"
          subtitle="Every package starts with a clear hypothesis about what the player needs to feel before they click."
          center
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <article key={c.title} className="card-premium card-premium-hover overflow-hidden flex flex-col">
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${c.palette}`}>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-x-4 bottom-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-cyan">{c.type}</div>
                  <h3 className="font-display font-bold text-white text-lg leading-tight mt-1">{c.title}</h3>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <Detail label="Goal" value={c.goal} />
                <Detail label="Challenge" value={c.challenge} />
                <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Creative Choices</div>
                <ul className="mt-1.5 space-y-1 text-sm">
                  {c.choices.map((ch) => (
                    <li key={ch} className="flex gap-2 text-foreground/90">
                      <span className="text-cyan">→</span> {ch}
                    </li>
                  ))}
                </ul>
                <Detail label="Deliverables" value={c.deliverables} className="mt-3" />
                <Detail label="Result" value={c.result} />
                <a href="#contact" className="mt-5 inline-flex items-center justify-center rounded-lg border border-cyan/40 bg-cyan/5 px-4 py-2.5 text-sm font-semibold text-cyan hover:bg-cyan/10">
                  {c.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`${className} mt-2`}>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <p className="text-sm text-foreground/90 mt-0.5">{value}</p>
    </div>
  );
}
