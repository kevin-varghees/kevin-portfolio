import { sessions } from "../data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./Shared";

export function Classroom() {
  return (
    <section id="experience" className="bg-white py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>WORKSHOPS & TECHNICAL SESSIONS</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">Beyond The Classroom</h2>
          <p className="mt-5 text-[15px] text-mute">
            Learning, exploring, and keeping up with emerging technologies.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {sessions.map((s, i) => (
            <Reveal key={s.id} delay={i * 90}>
              <div className="h-full border border-black/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">{s.tag}</span>
                <h4 className="mt-3 text-base font-bold leading-snug">{s.name}</h4>
                {s.organizer && <p className="mt-1 text-xs text-mute">By {s.organizer}</p>}
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
