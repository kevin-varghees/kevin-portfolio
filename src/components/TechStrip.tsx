import { motion } from "framer-motion";
import { techStrip } from "../data";
import { Reveal } from "./Reveal";
import { Tilt } from "./Motion";
import { TechIcon } from "./TechIcon";

export function TechStrip() {
  return (
    <div className="relative z-20 mx-auto -mt-24 max-w-6xl px-6 md:-mt-28">
      <Reveal>
        <div className="grid items-center gap-6 bg-ink px-8 py-8 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:grid-cols-[260px_1fr] md:gap-0 md:px-10">
          <div className="md:border-r md:border-white/15 md:pr-8">
            <h2 className="text-xl font-semibold leading-snug">Technologies I Work With</h2>
            <p className="mt-2 text-xs text-white/50">Tools I use to build projects</p>
          </div>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5 md:pl-10 lg:grid-cols-9">
            {techStrip.map((t) => (
              <li key={t}>
                <Tilt max={20} className="h-full">
                  <motion.div
                    whileHover={{ y: -9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="group flex cursor-default flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
                  >
                    <TechIcon
                      name={t}
                      className="h-7 w-7 transition-all duration-300 group-hover:text-brand group-hover:drop-shadow-[0_8px_8px_rgba(243,107,10,0.45)]"
                    />
                    <span className="text-[10px] font-medium uppercase tracking-wider">{t}</span>
                    <span className="h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-6" />
                  </motion.div>
                </Tilt>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
