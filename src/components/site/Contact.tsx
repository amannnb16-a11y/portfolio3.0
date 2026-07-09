import { MessageCircle, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

const checklist = [
  "Game link",
  "Genre",
  "Assets needed",
  "Deadline",
  "References / examples",
  "Characters, maps, logos or models needed",
  "Where the visuals will be used: icon, thumbnail, ad, Discord, social, launch page",
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("indentina");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="card-premium relative overflow-hidden p-8 sm:p-12">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-cyan/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-cyan">Get In Touch</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
                Ready to make your game look <span className="text-gradient-cyan">more clickable</span>?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Send your project details on Discord for the fastest reply, or email if that's easier. Quotes usually go out same-day.
              </p>

              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-2xl border border-cyan/40 bg-gradient-to-br from-cyan/20 via-cyan/10 to-surface p-4 shadow-[0_0_28px_rgba(0,209,255,0.18)] flex items-center gap-3">
                  <div className="absolute inset-0 bg-gradient-cyan opacity-10 pointer-events-none" />
                  <div className="relative grid h-11 w-11 place-items-center rounded-lg bg-cyan/20 border border-cyan/40 text-cyan">
                    <MessageCircle size={18} />
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-wider text-cyan font-bold">Discord</div>
                    <div className="font-semibold truncate text-foreground">indentina</div>
                  </div>
                  <button onClick={copy} className="relative shrink-0 rounded-lg bg-gradient-cyan px-3 py-2 text-xs font-bold text-primary-foreground glow-cyan inline-flex items-center gap-1 transition-transform hover:-translate-y-0.5">
                    {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                  </button>
                </div>

                <a href="mailto:indentinaGFX@gmail.com" className="card-premium card-premium-hover p-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-gold/10 border border-gold/30 text-gold">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                    <div className="font-semibold truncate">indentinaGFX@gmail.com</div>
                  </div>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#packages" className="rounded-lg bg-gradient-cyan px-5 py-3 text-sm font-semibold text-primary-foreground glow-cyan">
                  Book a Launch Pack
                </a>
                <a href="#work" className="rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold hover:border-cyan/40">
                  See Portfolio
                </a>
              </div>
            </div>

            <div className="card-premium p-6 bg-surface-2/40">
              <div className="text-xs font-semibold uppercase tracking-widest text-gold">Order Checklist</div>
              <h3 className="mt-2 font-display text-xl font-bold">To get a quote, send me:</h3>
              <ol className="mt-4 space-y-2.5">
                {checklist.map((c, i) => (
                  <li key={c} className="flex gap-3 text-sm">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-cyan/10 border border-cyan/30 text-[11px] font-bold text-cyan">
                      {i + 1}
                    </span>
                    <span className="text-foreground/90 pt-0.5">{c}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
