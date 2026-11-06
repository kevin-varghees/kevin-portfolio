import { Award, Building2, Lightbulb, Timer, Trophy, Users } from "lucide-react";
import type { ReactNode } from "react";
import { hackathons, type Hackathon } from "../data";
import { SplitText } from "./Motion";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./Shared";

function Row({
  icon,
  label,
  value,
  editable,
  dark,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  editable?: boolean;
  dark?: boolean;
}) {
  if (!value && !editable) return null;
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      <span className="min-w-0">
        <span className={dark ? "text-white/50" : "text-mute"}>{label}: </span>
        {value ? (
          <span className="font-medium">{value}</span>
        ) : (
          <span className={`italic ${dark ? "text-white/40" : "text-mute/70"}`}>To be added</span>
        )}
      </span>
    </div>
  );
}

function Card({ h }: { h: Hackathon }) {
  const dark = !!h.highlight;
  return (
    <article
      className={`group relative flex h-full flex-col transition-all duration-300 hover:-translate-y-1.5 ${
        dark
          ? "bg-ink text-white ring-2 ring-brand shadow-[0_24px_60px_-24px_rgba(243,107,10,0.65)]"
          : "bg-white hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]"
      }`}
    >
      {dark && (
        <div className="flex items-center gap-2 bg-brand px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
          <Trophy size={14} /> First Prize
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-5xl font-bold leading-none text-brand">{h.num}</span>
          {h.duration && (
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ${
                h.id === "carnival" ? "bg-brand text-white" : dark ? "bg-white/10 text-white" : "bg-ink text-white"
              }`}
            >
              <Timer size={13} /> {h.duration}
            </span>
          )}
        </div>

        <h3 className={`mt-5 text-xl font-bold leading-snug ${dark ? "md:text-2xl" : ""}`}>{h.name}</h3>
        <p className={`mt-1.5 text-sm ${dark ? "text-white/60" : "text-mute"}`}>{h.category}</p>

        {h.achievement && (
          <p
            className={`mt-4 inline-flex w-fit items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] ${
              dark ? "bg-brand text-white" : "border border-brand text-brand"
            }`}
          >
            <Award size={14} className="shrink-0" /> {h.achievement}
          </p>
        )}
        {h.editable && !h.achievement && (
          <p className="mt-4 inline-flex w-fit items-center gap-2 border border-dashed border-black/25 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-mute">
            <Award size={14} /> Achievement: to be added
          </p>
        )}

        <p className={`mt-4 flex-1 text-sm leading-relaxed ${dark ? "text-white/70" : "text-ink/70"}`}>
          {h.description}
        </p>

        <div className="mt-5 space-y-2.5 border-t border-current/10 pt-5">
          <Row dark={dark} icon={<Lightbulb size={15} />} label="Project" value={h.project} editable={h.editable} />
          {h.projectSummary && (
            <p className={`pl-[25px] text-[13px] leading-relaxed ${dark ? "text-white/60" : "text-mute"}`}>
              {h.projectSummary}
            </p>
          )}
          <Row dark={dark} icon={<Users size={15} />} label="Team" value={h.team} editable={h.editable} />
          <Row dark={dark} icon={<Building2 size={15} />} label="Organized by" value={h.organizer} editable={h.editable} />
          <Row dark={dark} icon={<Award size={15} />} label="My contribution" value={h.contribution} />
        </div>

        {h.tags && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {h.tags.map((t) => (
              <li key={t} className={`px-2.5 py-1 text-[11px] font-medium ${dark ? "bg-white/10" : "bg-cream text-ink/80"}`}>
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function Hackathons() {
  return (
    <section id="hackathons" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>HACKATHONS & EXPERIENCES</SectionLabel>
          <h2
            aria-label="My Hackathons & Experiences"
            className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            <SplitText parts={["My", "Hackathons", "&", "Experiences"]} />
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-mute">
            Turning ideas into reality through collaboration, innovation, and rapid development.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {hackathons.map((h, i) => (
            <Reveal key={h.id} delay={(i % 2) * 100} tilt={h.highlight ? 6 : 4}>
              <Card h={h} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
