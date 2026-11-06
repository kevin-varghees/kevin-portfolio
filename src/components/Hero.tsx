import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { profile } from "../data";
import { IS_ARTIFACT, useEnv } from "../lib/env";
import { pointerX, pointerY } from "../lib/pointer";
import { SceneHost } from "../three/SceneHost";
import { Magnetic, SplitText, Tilt } from "./Motion";
import { Portrait } from "./Portrait";
import { SectionLabel, XIcon } from "./Shared";

const EASE = [0.22, 1, 0.36, 1] as const;

function Enter({ delay, children, className = "" }: { delay: number; children: React.ReactNode; className?: string }) {
  const { reduce } = useEnv();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: IS_ARTIFACT ? 0.4 : 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { reduce } = useEnv();
  const [sceneReady, setSceneReady] = useState(false);

  // Layered parallax: shapes move more than the portrait, in opposite directions.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sx = useSpring(pointerX, { stiffness: 70, damping: 20 });
  const sy = useSpring(pointerY, { stiffness: 70, damping: 20 });
  const k = reduce ? 0 : 1;
  const shapesX = useTransform(sx, (v) => v * 22 * k);
  const shapesY = useTransform([sy, scrollYProgress], ([v, s]: number[]) => v * 14 * k - s * 40 * k);
  const portraitX = useTransform(sx, (v) => v * -9 * k);
  const portraitY = useTransform([sy, scrollYProgress], ([v, s]: number[]) => v * -6 * k + s * 50 * k);

  return (
    <section ref={ref} id="home" className="bg-cream pb-32 md:pb-40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-12 md:grid-cols-2 md:pt-0">
        <div className="order-2 md:order-1">
          <Enter delay={0.1}>
            <SectionLabel>COMPUTER SCIENCE & AI DEVELOPER</SectionLabel>
          </Enter>
          <h1
            aria-label="Hello! I'm Kevin Varghees"
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <SplitText parts={["Hello!", "I'm", "\n", "Kevin", "Varghees"]} delay={0.2} stagger={0.09} />
          </h1>
          <Enter delay={0.7}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute">
              Exploring technology, building projects, and turning innovative ideas into meaningful digital
              experiences.
            </p>
          </Enter>

          <Enter delay={0.85} className="mt-9 flex flex-wrap items-center gap-6">
            <Magnetic>
              <a href="#contact" className="btn bg-brand text-white hover:bg-ink">
                LET'S CONNECT <ArrowUpRight size={14} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#hackathons"
                className="group inline-flex items-center gap-2 px-2 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:text-brand"
              >
                VIEW HACKATHONS
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
          </Enter>

          <Enter delay={1} className="mt-12 flex items-center gap-4">
            <span className="text-sm font-medium">Find me on</span>
            <span className="h-px w-16 bg-black/20" />
            {[
              { href: profile.github, label: "GitHub", icon: <Github size={16} /> },
              { href: profile.linkedin, label: "LinkedIn", icon: <Linkedin size={16} /> },
              { href: profile.twitter, label: "X (Twitter)", icon: <XIcon size={14} /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:shadow-[0_10px_18px_-8px_rgba(243,107,10,0.7)]"
              >
                {s.icon}
              </a>
            ))}
          </Enter>
        </div>

        {/* Portrait with 3D orange shapes behind it */}
        <div className="relative order-1 mx-auto flex h-[420px] w-full max-w-md items-end justify-center md:order-2 md:h-[600px] md:max-w-none">
          <motion.div style={{ x: shapesX, y: shapesY }} className="absolute -inset-x-6 -inset-y-4">
            {/* Flat shapes: shown until the 3D scene is ready, and kept for reduced motion / no WebGL */}
            <div
              aria-hidden="true"
              className={`absolute inset-x-6 inset-y-4 transition-opacity duration-700 ${sceneReady ? "opacity-0" : "opacity-100"}`}
            >
              <div className="absolute left-[8%] top-[22%] h-12 w-[55%] -rotate-[28deg] bg-brand md:h-16" />
              <div className="absolute right-[2%] top-[18%] h-12 w-[50%] rotate-[32deg] bg-brand md:h-16" />
              <div className="absolute left-[4%] top-[48%] h-12 w-[52%] -rotate-[4deg] bg-brand md:h-16" />
              <div className="absolute bottom-[8%] right-[6%] h-10 w-[28%] -rotate-[52deg] bg-brand" />
            </div>
            <SceneHost
              kind="hero"
              className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              onReady={() => setSceneReady(true)}
            />
          </motion.div>

          <motion.div style={{ x: portraitX, y: portraitY }} className="relative z-10 h-[88%] w-[70%] max-w-sm">
            <Tilt max={5} className="h-full w-full">
              <Portrait className="h-full w-full shadow-[0_34px_60px_-28px_rgba(0,0,0,0.55)]" />
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
