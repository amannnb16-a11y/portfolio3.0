import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Portfolio } from "@/components/site/Portfolio";
import { Packages } from "@/components/site/Packages";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Trust } from "@/components/site/Trust";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
  meta: [
    { title: "Indentina GFX — Premium Roblox Icons, Thumbnails & Ad Creatives" },
    { name: "description", content: "Premium Roblox GFX for launches, updates and ad testing. Icons, thumbnails and ad creatives designed for genre fit, small-size readability and click appeal." },
    { property: "og:title", content: "Indentina GFX — Premium Roblox GFX" },
    { property: "og:description", content: "High-impact Roblox icons, thumbnails and ad creatives. Built for serious launches and ad testing." },
  ],
  links: [
    { rel: "icon", type: "image/webp", href: "/favicon.webp" },
  ],
}),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Portfolio />
        <Packages />
        <BeforeAfter />
        <Process />
        <Testimonials />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
