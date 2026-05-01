import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { ExtinguisherModel } from "./ExtinguisherModel";

gsap.registerPlugin(ScrollTrigger);

// Camera dolly: macro close-up → full view across the first 100vh of section.
const CinematicCamera = ({ progress }: { progress: { current: number } }) => {
  useFrame(({ camera }) => {
    const p = progress.current;
    // Dolly out from very close (z=2) to wide shot (z=6.5)
    const targetZ = 2.0 + p * 4.5;
    const targetY = 0.2 - p * 0.2;
    camera.position.z += (targetZ - camera.position.z) * 0.1;
    camera.position.y += (targetY - camera.position.y) * 0.1;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// Spot/Point lights that orbit the model based on scroll → metallic glints.
const DynamicLights = ({ progress }: { progress: { current: number } }) => {
  const spot = useRef<THREE.SpotLight>(null);
  const point = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const p = progress.current;
    const t = clock.elapsedTime;
    if (spot.current) {
      const a = p * Math.PI * 2 + t * 0.3;
      spot.current.position.set(Math.cos(a) * 4, 2 + p * 1.5, Math.sin(a) * 4);
      spot.current.intensity = 25 + p * 25;
    }
    if (point.current) {
      const a = -p * Math.PI * 2 + t * 0.2;
      point.current.position.set(Math.cos(a) * 3, -1 + p * 2, Math.sin(a) * 3);
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight
        ref={spot}
        position={[3, 3, 3]}
        angle={0.5}
        penumbra={0.7}
        intensity={30}
        color="#ffd9b8"
        castShadow
      />
      <pointLight ref={point} intensity={20} color="#dc2626" distance={10} />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#7dd3fc" />
    </>
  );
};

const ModelDriver = ({ progress }: { progress: { current: number } }) => {
  const [p, setP] = useState(0);
  useFrame(() => setP(progress.current));
  return <ExtinguisherModel progress={p} />;
};

export const Hero3DScene = ({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) => {
  const progress = useRef(0);

  useEffect(() => {
    if (!targetRef.current) return;
    const st = ScrollTrigger.create({
      trigger: targetRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    return () => st.kill();
  }, [targetRef]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0.2, 2], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#0a0a0a", 6, 14]} />

      <CinematicCamera progress={progress} />
      <DynamicLights progress={progress} />

      <ModelDriver progress={progress} />

      <Environment preset="warehouse" />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.85} luminanceThreshold={0.55} luminanceSmoothing={0.25} mipmapBlur />
        <Noise opacity={0.06} />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
};
