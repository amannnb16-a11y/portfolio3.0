import { Star } from "lucide-react";
import { SectionHeader } from "./Portfolio";

const reviews = [
  {
    id: 1,
    username: "@MatiasGrief",
    avatar: "/images/profiles/user-one.webp",
    rating: 5,
    review: '"This so bussin, he the only one I want 😍."',
  },
  {
    id: 2,
    username: "@RockysValor",
    avatar: "/images/profiles/user-two.webp",
    rating: 5,
    review: "His talents and services are worth every penny. A truly amazing person.",
  },
  {
    id: 3,
    username: "UserThree",
    avatar: "/images/profiles/user-three.webp",
    rating: 3,
    review: "Good communication.",
  },
  {
    id: 4,
    username: "UserFour",
    avatar: "/images/profiles/user-four.webp",
    rating: 5,
    review: "Five stars, would hire again!",
  },
  {
    id: 5,
    username: "UserFive",
    avatar: "/images/profiles/user-five.webp",
    rating: 2,
    review: "Delivered as promised.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="Testimonials" title="What clients say" center />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="card-premium p-6">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={`${review.username} profile picture`}
                  className="h-11 w-11 rounded-full border border-border object-cover shadow-glow"
                  loading="lazy"
                  decoding="async"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{review.username}</div>
                  <div className="flex gap-0.5 mt-0.5" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={12}
                        className={idx < review.rating ? "text-gold fill-gold" : "text-muted-foreground"}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {review.review}
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
