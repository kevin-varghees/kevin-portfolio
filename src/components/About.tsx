import { Brain, Code2, GraduationCap, LineChart, Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { education, hackathons, sessions } from "../data";
import { SceneHost } from "../three/SceneHost";
import { Parallax, SplitText, Tilt } from "./Motion";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./Shared";
import { TechIcon } from "./TechIcon";

// Only stats that can be counted straight from the content in data.ts
const stats = [
  { value: String(hackathons.length), label: "Hackathons" },
  { value: "1", label: "First Prize" },
  { value: String(sessions.length), label: "Workshops & Sessions" },
];

const interests: { title: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: "Programming & Development",
    icon: Code2,
    items: ["Python", "C", "C++", "HTML", "CSS", "JavaScript", "React", "Flask"],
  },
  {
    title: "Artificial Intelligence & Data Science",
    icon: Brain,
    items: ["AI Fundamentals", "Machine Learning", "NumPy", "Pandas", "Data Analysis", "LLMs"],
  },
  {
    title: "Modern Development Practices",
    icon: Sparkles,
    items: [
      "AI-Assisted Development",
      "Vibe Coding",
      "Prompt Engineering",
      "API Integration",
      "Git & GitHub",
      "AI Dev Tools",
    ],
  },
];

const exploring: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Artificial Intelligence",
    text: "Learning how AI can solve real-world problems.",
    icon: <Brain size={20} strokeWidth={1.7} />,
  },
  {
    title: "Machine Learning",
    text: "Understanding core concepts through hands-on practice.",
    icon: <LineChart size={20} strokeWidth={1.7} />,
  },
  {
    title: "Python",
    text: "Strengthening my programming fundamentals.",
    icon: <TechIcon name="Python" className="h-5 w-5" />,
  },
  {
    title: "AI-Assisted Development",
    text: "Using AI tools to improve my workflow and build ideas.",
    icon: <Sparkles size={20} strokeWidth={1.7} />,
  },
];

const journey = [
  {
    when: "First Year",
    title: "Started B.Tech CSE (AI & DS)",
    text: "Began the Computer Science and Engineering journey at Marwadi University.",
    state: "done",
  },
  {
    when: "Second Year · Now",
    title: "Strengthening the foundation",
    text: "Improving programming fundamentals, exploring AI-powered development and taking part in hackathons.",
    state: "current",
  },
  {
    when: "Ahead",
    title: "Continuing to grow",
    text: "Building deeper knowledge of Computer Science, Artificial Intelligence and Data Science.",
    state: "next",
  },
] as const;

const body = "text-[15px] leading-relaxed text-mute";

export function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="relative">
          {/* Floating 3D sculpture in the empty space beside the heading (hidden on phones) */}
          <Parallax range={30} className="pointer-events-none absolute -top-10 right-0 hidden h-[190px] w-[190px] md:block lg:h-[300px] lg:w-[300px]">
            <SceneHost kind="sculpture" className="absolute inset-0" />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-1/2 h-4 w-1/2 -translate-x-1/2 rounded-[50%] bg-black/20 blur-md"
            />
          </Parallax>
          <Reveal>
            <SectionLabel>WHO I AM</SectionLabel>
          </Reveal>
          <h2
            aria-label="A little about me."
            className="mt-6 max-w-4xl text-5xl font-bold uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl"
          >
            <SplitText parts={["A", "little", "about", ["me.", "text-brand"]]} stagger={0.1} />
          </h2>
        </div>

        {/* Intro + education */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              I'm Kevin Varghees, a second-year B.Tech Computer Science and Engineering student specializing
              in Artificial Intelligence and Data Science at Marwadi University.
            </p>
            <div className="mt-8 space-y-4">
              <p className={body}>
                My academic journey revolves around understanding how technology works, exploring new
                possibilities in software development, and learning how Artificial Intelligence can solve
                real-world problems.
              </p>
              <p className={body}>
                I'm currently strengthening my programming fundamentals while exploring modern development
                technologies and AI-powered applications. I enjoy experimenting with new tools, understanding
                different approaches to problem-solving, and transforming ideas into functional digital
                experiences.
              </p>
            </div>

            <h3 className="mt-12 text-xl font-bold">How I Learn &amp; Build</h3>
            <div className="mt-4 space-y-4">
              <p className={body}>
                I believe learning technology goes beyond understanding theory. I enjoy applying what I learn
                through practical experimentation, hackathons, collaborative development, and building small
                applications.
              </p>
              <p className={body}>
                I also explore AI-assisted development tools to improve my workflow, experiment with ideas, and
                understand how modern applications are developed. Through these experiences, I'm working
                towards improving my technical confidence, programming knowledge, debugging skills, and
                ability to build useful applications.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Tilt max={4}>
            <div className="group relative overflow-hidden bg-ink p-8 text-white transition-transform duration-500 hover:-translate-y-1.5 md:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-40 w-40 rotate-12 bg-brand transition-transform duration-700 group-hover:rotate-45"
              />
              <GraduationCap size={30} strokeWidth={1.5} className="relative text-white" />
              <span className="relative mt-8 block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Education
              </span>
              <h3 className="relative mt-3 text-2xl font-bold leading-snug">Bachelor of Technology (B.Tech)</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/80">
                Computer Science and Engineering – Artificial Intelligence &amp; Data Science
              </p>
              <dl className="relative mt-8 space-y-4 border-t border-white/15 pt-6 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-white/50">University</dt>
                  <dd className="text-right font-medium">Marwadi University</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-white/50">Current year</dt>
                  <dd className="text-right font-medium">{education.status}</dd>
                </div>
              </dl>
              <p className="relative mt-6 border-t border-white/15 pt-6 text-sm leading-relaxed text-white/60">
                My studies help me develop an understanding of programming, computational thinking, data
                handling, algorithms, and emerging AI technologies.
              </p>
            </div>
            </Tilt>

            <dl className="mt-5 grid grid-cols-3 gap-4 bg-white p-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-bold">
                    {s.value}
                    <span className="ml-0.5 text-brand">+</span>
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-mute">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Technical interests */}
        <Reveal className="mt-28">
          <SectionLabel>TECHNICAL INTERESTS &amp; LEARNING AREAS</SectionLabel>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {interests.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} tilt={5}>
              <div className="group h-full border-t-2 border-ink bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center bg-ink text-white transition-colors duration-300 group-hover:bg-brand">
                    <c.icon size={18} strokeWidth={1.7} />
                  </span>
                  <h4 className="text-base font-semibold leading-snug">{c.title}</h4>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.items.map((it) => (
                    <li
                      key={it}
                      className="border border-black/15 px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Journey + currently exploring */}
        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionLabel>ACADEMIC JOURNEY</SectionLabel>
            <ol className="relative mt-8 space-y-9 pl-10">
              <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-black/20" />
              {journey.map((j) => (
                <li key={j.when} className="group relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-cream ${
                      j.state === "current"
                        ? "bg-brand"
                        : j.state === "done"
                          ? "bg-ink"
                          : "bg-white ring-2 ring-black/25"
                    }`}
                  >
                    {j.state === "current" && (
                      <span className="absolute h-6 w-6 rounded-full bg-brand/40 motion-safe:animate-ping" />
                    )}
                  </span>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                      j.state === "current" ? "text-brand" : "text-mute"
                    }`}
                  >
                    {j.when}
                  </span>
                  <h4 className="mt-1 text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
                    {j.title}
                  </h4>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mute">{j.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <SectionLabel>CURRENTLY EXPLORING</SectionLabel>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {exploring.map((e) => (
                <li key={e.title}>
                  <Tilt max={9}>
                <div className="group h-full bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:text-white hover:shadow-[0_22px_40px_-22px_rgba(0,0,0,0.5)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-brand">
                    {e.icon}
                  </span>
                  <h4 className="mt-4 text-base font-semibold leading-snug">{e.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-mute transition-colors group-hover:text-white/70">
                    {e.text}
                  </p>
                </div>
                  </Tilt>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Current goal + statement */}
        <Reveal className="mt-24">
          <div className="grid gap-10 bg-ink px-8 py-12 text-white md:px-14 md:py-16 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                My Current Goal
              </span>
              <p className="mt-4 text-[15px] leading-relaxed text-white/75">
                My current focus is to build a strong foundation in Computer Science, improve my programming and
                problem-solving abilities, and develop deeper knowledge of Artificial Intelligence and Data
                Science. I'm continuously learning, experimenting, and exploring opportunities that help me grow
                as a developer.
              </p>
            </div>
            <p className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Always learning.
              <br />
              Always building.
              <br />
              <span className="text-brand">Always improving.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
