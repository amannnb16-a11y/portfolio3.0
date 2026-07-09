import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Indentina GFX" },
      {
        name: "description",
        content: "Terms and conditions for commissioning Indentina GFX, including pricing, revisions, delivery, licensing and communication.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

const sections = [
  {
    number: "1",
    title: "Scope & Deliverables",
    body: [
      "Primarily Roblox thumbnails and icons; I may also take Discord banners, YouTube thumbnails, and Steam capsule art on request.",
      "Final format: PNG (sRGB).",
      "Source files (PSD/AI): not included by default; available for +$40 USD.",
    ],
  },
  {
    number: "2",
    title: "Pricing & Payment",
    body: [
      "Flat price: $45 USD per asset (thumbnail or icon).",
      "Deposit: 50% upfront to start.",
      "Remainder: due on final approval before delivery of unwatermarked/high-res files.",
      "Payment method: PayPal.",
      "Late payment: $20 USD flat fee if unpaid after 3 days from due date.",
    ],
  },
  {
    number: "3",
    title: "Timelines & Rush",
    body: [
      "Standard turnaround: 5-7 days after deposit and receipt of a complete brief/assets.",
      "Rush delivery: +50% (3-5 days). Super rush: +100% (2-3 days), minimum 24h notice, subject to availability.",
    ],
  },
  {
    number: "4",
    title: "Revisions",
    body: [
      "Included: up to 2 minor revision rounds.",
      "Major revisions: $10 USD per round.",
      "Minor examples: small color tweaks, minor text edits, slight repositioning, simple effects/lighting touch-ups.",
      "Major examples: new concept/brief, major layout/composition change, adding new assets/elements or new sizes/versions.",
      "Whether a change is minor or major is at my discretion; I will explain before proceeding.",
    ],
  },
  {
    number: "5",
    title: "Client Responsibilities",
    body: [
      "Provide a clear brief, references, logos/text and any required assets at project start.",
      "Feedback window: please reply within 48 hours for each revision round to keep timelines on track.",
    ],
  },
  {
    number: "6",
    title: "Approvals & Delivery",
    body: [
      "Point of contact: one person should provide final approvals via Discord (@indentina).",
      "Final delivery: PNG files, plus any additional agreed sizes. Source files are only included if purchased.",
    ],
  },
  {
    number: "7",
    title: "Licensing & Rights",
    body: [
      "Not permitted: reselling, sublicensing, or distributing the artwork as standalone assets/templates.",
      "Portfolio: I may showcase the work after delivery/launch.",
    ],
  },
  {
    number: "8",
    title: "Content Policy",
    body: [
      "No NSFW, hate, illegal content, or any work I am uncomfortable with.",
      "I reserve the right to reject any commission or discontinue service at any time without obligation to provide a reason.",
    ],
  },
  {
    number: "9",
    title: "Cancellations & Refunds",
    body: [
      "Before work starts: cancellation allowed; 10% admin fee applies.",
      "After work starts / after concept delivery: no refunds.",
    ],
  },
  {
    number: "10",
    title: "AI & Third-Party Assets",
    body: ["AI policy: no AI-generated final imagery. Moodboard/ideation references only."],
  },
  {
    number: "11",
    title: "Post-Delivery & File Retention",
    body: [
      "Support: up to 7 days for minor export issues/typos, not new design changes.",
      "Retention: I delete all client-provided assets within 7 days after project completion/closure. I may retain flattened versions of the final artwork for portfolio display only.",
    ],
  },
  {
    number: "12",
    title: "Communication",
    body: [
      "Primary communication: Discord (@indentina).",
      "Secondary communication: Email (indentinaGFX@gmail.com).",
      "Typical response time: within 24 hours on business days.",
    ],
  },
];

function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-5xl px-5">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
            <ArrowLeft size={14} /> Back to main site
          </Link>

          <section className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-gradient-card p-6 shadow-2xl md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan">Client Terms</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">
              Terms <span className="text-gradient-cyan">& Conditions</span>
            </h1>
            <p className="mt-4 text-sm font-semibold text-gold">Last updated: July 2nd, 2026</p>
            <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
              Please read these terms before commissioning Indentina GFX. By commissioning me, you confirm that you have read and agree to these Terms.
            </p>
          </section>

          <section className="mt-8 grid gap-5">
            {sections.map((section) => (
              <article key={section.number} className="card-premium p-6 md:p-7">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  <span className="text-cyan">{section.number})</span> {section.title}
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {section.body.map((item) => {
                    const [label, ...rest] = item.split(":");
                    const hasLabel = rest.length > 0 && label.length < 42;
                    return (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        <span>
                          {hasLabel ? <strong className="text-foreground">{label}:</strong> : null}{" "}
                          {hasLabel ? rest.join(":").trim() : item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan/30 bg-cyan/5 p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold">Acceptance</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              By commissioning me, you confirm you have read and agree to these Terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
