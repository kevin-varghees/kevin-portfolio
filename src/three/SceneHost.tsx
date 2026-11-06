import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { canWebGL, useEnv } from "../lib/env";

const HeroScene = lazy(() => import("./HeroScene"));
const Sculpture = lazy(() => import("./Sculpture"));

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Mounts a 3D scene only when it is wanted and safe:
 * not with reduced motion, not without WebGL, never for the sculpture on phones,
 * and the render loop pauses whenever the scene is off screen.
 */
export function SceneHost({
  kind,
  className = "",
  onReady,
}: {
  kind: "hero" | "sculpture";
  className?: string;
  onReady?: () => void;
}) {
  const { reduce, mobile } = useEnv();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [everVisible, setEverVisible] = useState(false);
  const [webgl] = useState(canWebGL);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true);
      setEverVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setEverVisible(true);
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const enabled = !reduce && webgl && !(kind === "sculpture" && mobile);
  const Scene = kind === "hero" ? HeroScene : Sculpture;

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {enabled && everVisible && (
        <Boundary>
          <Suspense fallback={null}>
            <Scene active={visible} mobile={mobile} onReady={onReady} />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
}
