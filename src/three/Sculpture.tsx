import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointerX, pointerY } from "../lib/pointer";
import { StudioEnv, type SceneProps } from "./shared";

function Piece() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 2.5);
    if (group.current) {
      const ty = t * 0.28 + pointerX.get() * 0.9;
      const tx = Math.sin(t * 0.35) * 0.25 + pointerY.get() * 0.6;
      group.current.rotation.y += (ty - group.current.rotation.y) * k;
      group.current.rotation.x += (tx - group.current.rotation.x) * k;
      group.current.position.y = Math.sin(t * 0.9) * 0.12;
    }
    if (ring.current) ring.current.rotation.z = -t * 0.45;
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.78, 0.25, 220, 28, 2, 3]} />
        <meshStandardMaterial color="#0b0b0b" metalness={1} roughness={0.2} envMapIntensity={1.6} />
      </mesh>
      <group ref={ring} rotation={[1.15, 0.3, 0]}>
        <mesh castShadow>
          <torusGeometry args={[1.4, 0.05, 20, 140]} />
          <meshStandardMaterial color="#F36B0A" metalness={0.55} roughness={0.28} />
        </mesh>
        <mesh position={[1.4, 0, 0]} castShadow>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#F36B0A" metalness={0.3} roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

export default function Sculpture({ active, mobile, onReady }: SceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      shadows={!mobile}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady?.();
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <StudioEnv intensity={1} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, -1, 2]} intensity={5} color="#ffb27a" distance={12} />
      <Piece />
    </Canvas>
  );
}
