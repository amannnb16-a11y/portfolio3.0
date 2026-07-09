import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-cyan text-primary-foreground glow-cyan">I</span>
              Indentina<span className="text-gradient-cyan">GFX</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Premium Roblox icons, thumbnails and ad creatives for launches, updates and growth. Built for serious Roblox teams.
            </p>
          </div>
          <FooterCol title="Site" links={[
            { href: "#work", label: "Work" },
            { href: "#packages", label: "Packages" },
            { href: "#genres", label: "Genres" },
            { href: "#process", label: "Process" },
            { href: "#faq", label: "FAQ" },
          ]} />
          <FooterCol title="Contact" links={[
            { href: "#contact", label: "Discord: indentina" },
            { href: "mailto:indentinaGFX@gmail.com", label: "indentinaGFX@gmail.com" },
          ]} />
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan">More</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/beyond-roblox" className="text-muted-foreground hover:text-foreground">Game Launch Art Beyond Roblox</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Indentina GFX. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <span>50% / 100% upfront</span>
            <span>No revshare</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-cyan">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-muted-foreground hover:text-foreground">{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
