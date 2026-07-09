import { Star, User } from "lucide-react";
import { SectionHeader } from "./Portfolio";

// 7 placeholder review slots — replace text + image with real client feedback.
const slots = Array.from({ length: 7 }).map((_, i) => ({
  id: i,
  username: `client_${i + 1}`,
  rating: 5,
  quote: "Add a real testimonial here. Replace this text with the client's actual words.",
}));

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Testimonials"
          title="What clients say"
          subtitle="Real reviews go here — replace the placeholder cards with actual client feedback, pfps and usernames."
          center
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((s) => (
            <article key={s.id} className="card-premium p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-surface-2 border border-border text-muted-foreground">
                  <User size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{s.username}</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={12} className={idx < s.rating ? "text-gold fill-gold" : "text-muted-foreground"} />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="mt-4 text-sm text-muted-foreground leading-relaxed">
                "{s.quote}"
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
