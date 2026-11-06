import { Github, Linkedin } from "lucide-react";
import { profile } from "../data";
import { XIcon } from "./Shared";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              <span className="text-brand">K</span>EVIN VARGHEES
            </p>
            <p className="mt-3 text-sm text-white/50">Building. Learning. Innovating.</p>
          </div>

          <nav aria-label="Footer">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Quick links</h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/70 transition-colors hover:text-brand">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Social</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-brand"
                >
                  <Github size={15} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-brand"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-brand"
                >
                  <XIcon size={14} /> X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-xs text-white/40">
          © 2026 Kevin Varghees. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
