import { Bot, Brain, LineChart, MessageSquare, Plug, Rocket, Sparkles, SquareTerminal, type LucideIcon } from "lucide-react";
import { levelInfo, skillGroups, type Level, type SkillGroup, type SkillItem } from "../data";
import { SplitText } from "./Motion";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./Shared";
import { TechIcon } from "./TechIcon";

const glyphs: Record<NonNullable<SkillItem["glyph"]>, LucideIcon> = {
  sparkles: Sparkles,
  message: MessageSquare,
  bot: Bot,
  plug: Plug,
  rocket: Rocket,
  brain: Brain,
  terminal: SquareTerminal,
  chart: LineChart,
  api: Plug,
};

const levelStyle: Record<Level, string> = {
  "Project Experience": "bg-brand text-white",
  Learning: "bg-ink text-white",
  Fundamentals: "bg-transparent text-ink ring-1 ring-ink/40",
};

function LevelPill({ level }: { level: Level }) {
  return (
    <span
      className={`shrink-0 whitespace-nowrap px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${levelStyle[level]}`}
    >
      {level}
    </span>
  );
}

function ItemIcon({ item, className = "h-4 w-4" }: { item: SkillItem; className?: string }) {
  if (item.icon) return <TechIcon name={item.icon} className={className} />;
  const G = item.glyph ? glyphs[item.glyph] : null;
  return G ? <G className={className} strokeWidth={1.8} /> : <span className="h-1.5 w-1.5 rounded-full bg-brand" />;
}

/** Standard minimal card used for the three regular categories. */
function CategoryCard({ g }: { g: SkillGroup }) {
  return (
    <div className="h-full bg-cream p-7 text-ink transition-transform duration-300 hover:-translate-y-1">
      <h3 className="border-b border-black/10 pb-4 text-lg font-semibold">{g.title}</h3>
      <ul className="mt-2">
        {g.items.map((it) => (
          <li
            key={it.name}
            className="flex items-center justify-between gap-3 border-b border-black/5 py-3 last:border-0"
          >
            <span className="flex min-w-0 items-center gap-3 text-sm font-medium">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                <ItemIcon item={it} />
              </span>
              <span className="min-w-0">{it.name}</span>
            </span>
            <LevelPill level={it.level} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Featured card: AI-Assisted Development, with Vibe Coding as the lead skill. */
function FeaturedCard({ g }: { g: SkillGroup }) {
  const [lead, ...rest] = g.items;
  return (
    <div className="grid gap-8 bg-brand p-7 text-white md:p-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
      <div>
        <span className="inline-flex items-center gap-2 bg-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
          <Sparkles size={12} /> Core focus
        </span>
        <h3 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">{g.title}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90">{g.blurb}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Lead skill */}
        <div className="bg-ink p-6 sm:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center bg-brand text-white">
                <ItemIcon item={lead} className="h-6 w-6" />
              </span>
              <span className="font-display text-2xl font-bold">{lead.name}</span>
            </span>
            <LevelPill level={lead.level} />
          </div>
          {lead.note && <p className="mt-4 text-sm text-white/70">{lead.note}</p>}
        </div>

        {rest.map((it, i) => (
          <div
            key={it.name}
            className={`flex flex-col justify-between gap-4 bg-white p-5 text-ink transition-transform duration-300 hover:-translate-y-1 ${
              i === rest.length - 1 && rest.length % 2 === 1 ? "sm:col-span-2" : ""
            }`}
          >
            <span className="flex items-start gap-3 text-sm font-semibold">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                <ItemIcon item={it} />
              </span>
              <span className="min-w-0 pt-1.5 leading-snug">{it.name}</span>
            </span>
            <span className="self-start">
              <LevelPill level={it.level} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const featured = skillGroups.find((g) => g.featured);
  const regular = skillGroups.filter((g) => !g.featured);

  return (
    <section id="skills" className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel light>SKILLS / TECHNICAL JOURNEY</SectionLabel>
          <h2 aria-label="My Skills & Technical Journey" className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            <SplitText parts={["My", "Skills", "&", "Technical", "Journey"]} />
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            An aspiring developer who combines programming knowledge, AI tools, creativity and
            problem-solving to build practical applications.
          </p>
        </Reveal>

        {/* Level legend */}
        <Reveal delay={80}>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {levelInfo.map((l) => (
              <li key={l.level} className="flex flex-col items-center gap-2 text-center">
                <span
                  className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    l.level === "Fundamentals"
                      ? "text-white ring-1 ring-white/50"
                      : l.level === "Learning"
                        ? "bg-white text-ink"
                        : "bg-brand text-white"
                  }`}
                >
                  {l.level}
                </span>
                <span className="text-xs text-white/50">{l.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {featured && (
          <Reveal delay={120} className="mt-14" tilt={2}>
            <FeaturedCard g={featured} />
          </Reveal>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regular.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 90} tilt={5}>
              <CategoryCard g={g} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
