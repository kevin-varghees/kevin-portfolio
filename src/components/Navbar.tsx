import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-black/10 bg-cream/95 backdrop-blur" : "border-transparent bg-cream"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <a href="#home" className="font-display text-2xl font-bold tracking-tight">
          <span className="text-brand">K</span>EVIN
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-black/10 bg-cream transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96 border-t" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-3">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-black/5 py-4 text-sm font-semibold uppercase tracking-[0.14em] hover:text-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
