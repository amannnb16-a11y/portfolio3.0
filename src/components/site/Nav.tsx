import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import brandIcon from "../../assets/image/brand-icon.webp";

const links = [
  { href: "#work", label: "Work" },
  { href: "#packages", label: "Packages" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrolled = () => {
      setScrolled((current) => {
        const next = window.scrollY > 12;
        return current === next ? current : next;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    };

    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 will-change-auto ${
        scrolled ? "bg-background/90 border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-surface border border-cyan/30">
            <img src={brandIcon} alt="Indentina GFX logo" className="h-full w-full object-cover" />
          </span>
          <span>Indentina<span className="text-gradient-cyan"> GFX</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
          <Link to="/clients" className="font-semibold text-cyan hover:text-cyan/80 transition-colors">Client Portal</Link>
          <Link to="/terms-and-conditions" className="hover:text-foreground transition-colors">T&amp;C</Link>
          <Link to="/beyond-roblox" className="font-semibold text-gold hover:text-gold/80 transition-colors">Steam Art</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-lg bg-gradient-cyan px-4 py-2 text-sm font-semibold text-primary-foreground glow-cyan hover:opacity-95"
          >
            DM on Discord
          </a>
        </div>

        <button className="md:hidden p-2 text-foreground" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <div className="px-5 py-4 grid gap-3 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
            <Link to="/clients" onClick={() => setOpen(false)} className="font-semibold text-cyan hover:text-cyan/80">
              Client Portal
            </Link>
            <Link to="/terms-and-conditions" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              T&amp;C
            </Link>
            <Link to="/beyond-roblox" onClick={() => setOpen(false)} className="font-semibold text-gold hover:text-gold/80">
              Steam Art
            </Link>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-lg bg-gradient-cyan px-4 py-2.5 font-semibold text-primary-foreground glow-cyan">
              DM on Discord
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
