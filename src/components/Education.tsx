import { GraduationCap } from "lucide-react";
import { education } from "../data";
import { Float } from "./Motion";
import { Reveal } from "./Reveal";
import { Asterisk, SectionLabel } from "./Shared";

export function Education() {
  return (
    <section id="education" className="relative overflow-hidden bg-ink py-24 text-white md:py-28">
      <Float className="pointer-events-none absolute right-[8%] top-14 hidden text-brand md:block" distance={14} duration={8}>
        <Asterisk className="h-12 w-12" />
      </Float>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <SectionLabel light>EDUCATION</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">My Education</h2>
        </Reveal>

        <Reveal delay={100} tilt={3}>
          <div className="relative mt-14 pl-10">
            <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-2 w-px bg-white/20" />
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 h-6 w-6 rounded-full border-4 border-ink bg-brand ring-1 ring-brand"
            />
            <div className="bg-cream p-8 text-ink">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-ink text-white">
                  <GraduationCap size={26} strokeWidth={1.6} />
                </div>
                <div>
                  <span className="inline-block bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Current · {education.status}
                  </span>
                  <h3 className="mt-3 text-xl font-bold leading-snug">{education.degree}</h3>
                  <p className="mt-1 text-sm text-mute">{education.school}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
