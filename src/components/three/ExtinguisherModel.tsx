import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * Fire extinguisher built from primitives — gives us a real 3D mesh we can
 * rotate, light, and bloom. Materials are physically-based for premium feel.
 */
export const ExtinguisherModel = ({ progress = 0 }: { progress?: number }) => {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    // Drive rotation directly from scroll progress (scrub-style) — full
    // showcase rotation across the section.
    const target = group.current.rotation;
    const desiredY = progress * Math.PI * 2.2; // ~2 turns
    const desiredX = -0.15 + progress * 0.45;  // subtle tilt
    target.y += (desiredY - target.y) * 0.12;
    target.x += (desiredX - target.x) * 0.12;
  });

  const red = new THREE.Color("#dc2626");
  const darkRed = new THREE.Color("#7f1d1d");
  const chrome = new THREE.Color("#cbd5e1");

  return (
    <group ref={group} scale={1.1} position={[0, -0.2, 0]}>
      {/* Bottom cap */}
      <mesh position={[0, -1.55, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.9, 0.18, 64]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Main cylinder body */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.85, 2.6, 64]} />
        <meshPhysicalMaterial
          color={red}
          metalness={0.55}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Subtle bands */}
      <mesh position={[0, -0.85, 0]}>
        <torusGeometry args={[0.86, 0.012, 16, 96]} />
        <meshStandardMaterial color={darkRed} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[0.86, 0.012, 16, 96]} />
        <meshStandardMaterial color={darkRed} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Top dome */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <sphereGeometry args={[0.85, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color={red} metalness={0.6} roughness={0.2} clearcoat={1} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.3, 32]} />
        <meshStandardMaterial color={chrome} metalness={1} roughness={0.18} />
      </mesh>

      {/* Valve / handle assembly */}
      <group position={[0, 1.78, 0]}>
        <mesh>
          <boxGeometry args={[0.7, 0.18, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Trigger lever */}
        <mesh position={[0.15, 0.18, 0]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.55, 0.08, 0.16]} />
          <meshStandardMaterial color={red} metalness={0.7} roughness={0.25} />
        </mesh>
        {/* Pressure gauge */}
        <mesh position={[-0.45, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
          <meshStandardMaterial color={chrome} metalness={1} roughness={0.15} />
        </mesh>
      </group>

      {/* Hose curving down */}
      <mesh position={[0.55, 1.2, 0]} rotation={[0, 0, -0.4]}>
        <torusGeometry args={[0.45, 0.05, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Nozzle */}
      <mesh position={[1.0, 0.45, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.08, 0.05, 0.35, 24]} />
        <meshStandardMaterial color={chrome} metalness={1} roughness={0.2} />
      </mesh>

      {/* Front label panel */}
      <mesh position={[0, 0, 0.86]}>
        <planeGeometry args={[1.0, 0.6]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.7} />
      </mesh>
    </group>
  );
};
