import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { pointerX, pointerY } from "../lib/pointer";
import { StudioEnv, type SceneProps } from "./shared";

const ORANGE = "#F36B0A";

function Bar({ length, thickness, depth = thickness }: { length: number; thickness: number; depth?: number }) {
  const geo = useMemo(
    () => new RoundedBoxGeometry(length, thickness, depth, 4, Math.min(thickness, depth) * 0.22),
    [length, thickness, depth],
  );
  return (
    <mesh geometry={geo} castShadow>
      <meshStandardMaterial color={ORANGE} roughness={0.45} metalness={0.1} />
    </mesh>
  );
}

function Rig({ mobile }: { mobile: boolean }) {
  const main = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const accents = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const px = mobile ? 0 : pointerX.get();
    const py = mobile ? 0 : pointerY.get();
    const k = 1 - Math.exp(-dt * 3);

    if (main.current) {
      main.current.rotation.y += (px * 0.5 + Math.sin(t * 0.5) * 0.2 - main.current.rotation.y) * k;
      main.current.rotation.x += (py * 0.32 + Math.sin(t * 0.4) * 0.09 - main.current.rotation.x) * k;
      main.current.position.y = 0.55 + Math.sin(t * 0.8) * 0.07;
    }
    if (spin.current) spin.current.rotation.z = 0.25 + t * 0.12;
    if (accents.current) {
      accents.current.position.x += (px * 0.35 - accents.current.position.x) * k;
      accents.current.position.y += (-py * 0.2 + Math.sin(t * 0.6) * 0.06 - accents.current.position.y) * k;
      accents.current.rotation.y += (px * 0.7 - accents.current.rotation.y) * k;
    }
  });

  return (
    <>
      <group ref={main} position={[0, 0.55, 0]}>
        <group ref={spin}>
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
              <Bar length={4.5} thickness={0.62} depth={0.62 - i * 0.04} />
            </group>
          ))}
        </group>
      </group>

      <group ref={accents}>
        <group position={[1.55, -1.75, 0.35]} rotation={[0, 0, -0.9]}>
          <Bar length={1.5} thickness={0.42} />
        </group>
        <group position={[-1.7, -0.95, -0.2]} rotation={[0, 0, 0.7]}>
          <Bar length={0.95} thickness={0.3} />
        </group>
      </group>

      {/* Receives the shadows so the shapes feel like they float in front of a wall */}
      <mesh position={[0, 0, -1.3]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <shadowMaterial transparent opacity={0.13} />
      </mesh>
    </>
  );
}

export default function HeroScene({ active, mobile, onReady }: SceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      shadows={!mobile}
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 35 }}
      gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady?.();
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <StudioEnv intensity={0.4} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[2.2, 4, 8]}
        intensity={2.2}
        castShadow={!mobile}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-radius={6}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-4, -2, 3]} intensity={6} color="#ffb27a" distance={14} />
      <Rig mobile={mobile} />
    </Canvas>
  );
}
