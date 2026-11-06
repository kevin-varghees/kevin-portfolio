import { useEffect, useState } from "react";

/** True for the single-file preview build, which must look complete before any scroll. */
export const IS_ARTIFACT = import.meta.env.MODE === "artifact";

export type Env = { reduce: boolean; fine: boolean; mobile: boolean };

function read(): Env {
  if (typeof window === "undefined") return { reduce: false, fine: true, mobile: false };
  return {
    reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    fine: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    mobile: window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches,
  };
}

/** Reduced-motion, fine-pointer and mobile flags, kept in sync with the browser. */
export function useEnv(): Env {
  const [env, setEnv] = useState<Env>(read);
  useEffect(() => {
    const update = () => setEnv(read());
    const queries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(hover: hover) and (pointer: fine)"),
      window.matchMedia("(pointer: coarse)"),
    ];
    queries.forEach((q) => q.addEventListener("change", update));
    window.addEventListener("resize", update);
    return () => {
      queries.forEach((q) => q.removeEventListener("change", update));
      window.removeEventListener("resize", update);
    };
  }, []);
  return env;
}

export function canWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
