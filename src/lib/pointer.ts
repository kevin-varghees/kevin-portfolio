import { motionValue } from "framer-motion";

// One shared, normalised (-1..1) pointer position for every parallax / 3D effect.
export const pointerX = motionValue(0);
export const pointerY = motionValue(0);

let started = false;
export function startPointer() {
  if (started || typeof window === "undefined") return;
  started = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
}
