import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Portfolio";
import beforeAfter1Stage1 from "../../assets/image/before-after-stage-1.webp";
import beforeAfter1Stage2 from "../../assets/image/before-after-stage-2.webp";
import beforeAfter1Stage3 from "../../assets/image/before-after-stage-3.webp";
import beforeAfter1Stage4 from "../../assets/image/before-after-stage-4.webp";
import beforeAfter2Stage1 from "../../assets/image/before-after-2-stage-1.webp";
import beforeAfter2Stage2 from "../../assets/image/before-after-2-stage-2.webp";
import beforeAfter2Stage3 from "../../assets/image/before-after-2-stage-3.webp";
import beforeAfter2Stage4 from "../../assets/image/before-after-2-stage-4.webp";

const panels = [
  {
    id: "before-after-1",
    label: "Before / After 1",
    layers: [
      {
        id: 0,
        label: "Base Render",
        desc: "Plain render — clean subject, neutral lighting.",
        image: beforeAfter1Stage1,
      },
      {
        id: 1,
        label: "Lighting",
        desc: "Rim light, key light and contrast pass.",
        image: beforeAfter1Stage2,
      },
      {
        id: 2,
        label: "Background",
        desc: "Genre-fit environment and depth.",
        image: beforeAfter1Stage3,
      },
      {
        id: 3,
        label: "After Effects",
        desc: "Polish, color grade and final hook.",
        image: beforeAfter1Stage4,
      },
    ],
  },
  {
    id: "before-after-2",
    label: "Before / After 2",
    layers: [
      {
        id: 0,
        label: "Base Render",
        desc: "Plain render — clean subject, neutral lighting.",
        image: beforeAfter2Stage1,
      },
      {
        id: 1,
        label: "Lighting",
        desc: "Rim light, key light and contrast pass.",
        image: beforeAfter2Stage2,
      },
      {
        id: 2,
        label: "Background",
        desc: "Genre-fit environment and depth.",
        image: beforeAfter2Stage3,
      },
      {
        id: 3,
        label: "After Effects",
        desc: "Polish, color grade and final hook.",
        image: beforeAfter2Stage4,
      },
    ],
  },
];

export function BeforeAfter() {
  const [panel, setPanel] = useState(0);
  const [layer, setLayer] = useState(0);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [fadeKey, setFadeKey] = useState(0);
  const fadeTimer = useRef<number | null>(null);

  const activePanel = panels[panel];
  const activeLayer = activePanel.layers[layer];

  useEffect(() => {
    return () => {
      if (fadeTimer.current) {
        window.clearTimeout(fadeTimer.current);
      }
    };
  }, []);

  const showPanelLayer = (nextPanel: number, nextLayer: number) => {
    const nextImage = panels[nextPanel].layers[nextLayer].image;

    if (nextPanel === panel && nextLayer === layer) {
      return;
    }

    if (fadeTimer.current) {
      window.clearTimeout(fadeTimer.current);
    }

    setPreviousImage(activeLayer.image);
    setPanel(nextPanel);
    setLayer(nextLayer);
    setFadeKey((current) => current + 1);

    fadeTimer.current = window.setTimeout(() => {
      setPreviousImage(null);
    }, 320);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Before / After"
          title="From Generic to Clickable"
          subtitle="Many games have solid gameplay but weak first impressions. I rebuild the visual hook so the game's genre, reward and action are clearer before the player clicks."
          center
        />

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-surface p-1 shadow-sm">
            {panels.map((p, index) => (
              <button
                key={p.id}
                onClick={() => showPanelLayer(index, 0)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all md:px-5 ${
                  panel === index
                    ? "bg-cyan text-primary-foreground glow-cyan"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div className="card-premium overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden">
              {previousImage && (
                <img
                  src={previousImage}
                  alt="Previous before and after stage"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <img
                key={`${activePanel.id}-${activeLayer.id}-${fadeKey}`}
                src={activeLayer.image}
                alt={`${activePanel.label} ${activeLayer.label} stage`}
                className="before-after-image-fade relative z-10 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute left-4 top-4 z-20 rounded-full bg-cyan/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                {activePanel.label} · Stage 0{layer + 1}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan">
              {activePanel.label} · Layer {layer + 1} of {activePanel.layers.length}
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold">{activeLayer.label}</h3>
            <p className="mt-2 text-muted-foreground">{activeLayer.desc}</p>

            <div className="mt-6 space-y-2">
              {activePanel.layers.map((l) => (
                <button
                  key={l.id}
                  onClick={() => showPanelLayer(panel, l.id)}
                  className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-all ${
                    layer === l.id
                      ? "border-cyan/50 bg-cyan/10 text-foreground glow-cyan"
                      : "border-border bg-surface text-muted-foreground hover:border-cyan/30 hover:text-foreground"
                  }`}
                >
                  <span className="font-semibold mr-2">0{l.id + 1}</span> {l.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <span>Slide to progress stages</span>
                <span className="text-gold">Drag →</span>
              </div>
              <input
                type="range"
                min={0}
                max={activePanel.layers.length - 1}
                value={layer}
                onChange={(e) => showPanelLayer(panel, parseInt(e.target.value, 10))}
                className="stage-range w-full"
                aria-label="Slide to progress stages"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
