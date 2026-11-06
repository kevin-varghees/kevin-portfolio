import { Fragment, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { IS_ARTIFACT, useEnv } from "../lib/env";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Perspective tilt that follows the pointer. Falls back to a plain div on touch / reduced motion. */
export function Tilt({
  children,
  className = "h-full",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const { reduce, fine } = useEnv();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 170, damping: 18, mass: 0.4 };
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), spring);
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), spring);
  const ref = useRef<HTMLDivElement>(null);

  if (reduce || !fine) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Slow, gentle bobbing for small decorative elements. */
export function Float({
  children,
  className = "",
  distance = 10,
  duration = 6,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  const { reduce } = useEnv();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0], rotate: [0, 4, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Scroll-linked vertical drift. */
export function Parallax({
  children,
  className = "",
  range = 40,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
}) {
  const { reduce } = useEnv();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <motion.div ref={ref} className={className} style={{ y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}

/** Buttons that lean slightly toward the pointer. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const { reduce, fine } = useEnv();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.3 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.3 });

  if (reduce || !fine) return <div className="inline-block">{children}</div>;

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

type Part = string | [string, string];

/** Word-by-word masked text reveal. Use "\n" for a line break; [word, className] to style a word. */
export function SplitText({
  parts,
  delay = 0,
  stagger = 0.07,
}: {
  parts: Part[];
  delay?: number;
  stagger?: number;
}) {
  const { reduce } = useEnv();
  let n = 0;
  const from = IS_ARTIFACT ? { y: "40%", opacity: 0.35 } : { y: "105%", opacity: 0 };

  return (
    <>
      {parts.map((p, i) => {
        if (p === "\n") return <br key={i} aria-hidden="true" />;
        const [word, cls] = typeof p === "string" ? [p, ""] : p;
        if (reduce)
          return (
            <Fragment key={i}>
              <span className={cls}>{word}</span>{" "}
            </Fragment>
          );
        const idx = n++;
        // The mask is the observed element: a clipped child would never count as "in view".
        return (
          <Fragment key={i}>
            <motion.span
              aria-hidden="true"
              className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delayChildren: delay + idx * stagger }}
            >
              <motion.span
                className={`inline-block ${cls}`}
                variants={{ hidden: from, shown: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.85, delay: delay + idx * stagger, ease: EASE }}
              >
                {word}
              </motion.span>
            </motion.span>{" "}
          </Fragment>
        );
      })}
    </>
  );
}

/** Thin orange reading-progress bar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand"
    />
  );
}
