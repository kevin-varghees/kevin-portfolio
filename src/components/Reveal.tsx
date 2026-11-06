import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { IS_ARTIFACT, useEnv } from "../lib/env";
import { Tilt } from "./Motion";

/** Scroll-triggered reveal. Pass `tilt` (degrees) to also give the content a pointer tilt. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  tilt,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  tilt?: number;
}) {
  const { reduce } = useEnv();
  const inner = tilt ? <Tilt max={tilt}>{children}</Tilt> : children;

  if (reduce) return <div className={className}>{inner}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: IS_ARTIFACT ? 0.45 : 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.75, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {inner}
    </motion.div>
  );
}
