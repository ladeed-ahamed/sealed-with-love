import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Line } from "@react-three/drei";

export function DrawnEnvelope({ onClick }: { onClick?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  // Dynamically calculate responsive scale multiplier for the envelope
  const scaleMultiplier = viewport.width < 4.5 ? (viewport.width / 4.5) * 0.95 : 1.0;
  const baseScale = scaleMultiplier;
  const activeScale = hovered ? baseScale * 1.08 : baseScale;

  // Simple floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef} 
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={activeScale}
      // Add cursor pointer style when hovering
      onPointerEnter={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
      onPointerLeave={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
    >
      {/* Hand-drawn style Envelope Background */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      
      {/* Thick Outline for Back */}
      <Line
        points={[
          [-1.5, 1, 0], [1.5, 1, 0], [1.5, -1, 0], [-1.5, -1, 0], [-1.5, 1, 0]
        ]}
        color="#1a1a1a"
        lineWidth={5}
      />

      {/* Retro Postage Stamp in Top Right */}
      <mesh position={[0.95, 0.55, 0.015]} rotation={[0, 0, 0.05]}>
        <planeGeometry args={[0.5, 0.6]} />
        <meshBasicMaterial color="#fafaf9" />
      </mesh>
      <Line
        points={[
          [0.7, 0.85, 0.016], [1.2, 0.85, 0.016], [1.2, 0.25, 0.016], [0.7, 0.25, 0.016], [0.7, 0.85, 0.016]
        ]}
        color="#1a1a1a"
        lineWidth={3}
      />
      <Text
        position={[0.95, 0.55, 0.017]}
        color="#e11d48"
        fontSize={0.28}
        anchorX="center"
        anchorY="middle"
      >
        ♥
      </Text>

      {/* Wavy Postmark Cancellation Lines */}
      <Line
        points={[
          [0.4, 0.7, 0.018], [0.65, 0.65, 0.018], [0.9, 0.7, 0.018], [1.15, 0.65, 0.018], [1.4, 0.7, 0.018]
        ]}
        color="#1a1a1a"
        lineWidth={2}
        opacity={0.4}
        transparent
      />
      <Line
        points={[
          [0.4, 0.5, 0.018], [0.65, 0.45, 0.018], [0.9, 0.5, 0.018], [1.15, 0.45, 0.018], [1.4, 0.5, 0.018]
        ]}
        color="#1a1a1a"
        lineWidth={2}
        opacity={0.4}
        transparent
      />
      
      {/* Flap Outline */}
      <Line
        points={[
          [-1.5, 1, 0.01], [0, 0, 0.01], [1.5, 1, 0.01]
        ]}
        color="#1a1a1a"
        lineWidth={5}
      />

      {/* Cross lines to look like an envelope */}
      <Line
        points={[
          [-1.5, -1, 0.01], [0, 0, 0.01], [1.5, -1, 0.01]
        ]}
        color="#1a1a1a"
        lineWidth={5}
      />

      {/* Red Wax Seal in Center */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[0.32, 32]} />
        <meshBasicMaterial color="#991b1b" />
      </mesh>
      <Line
        points={Array.from({ length: 33 }, (_, i) => {
          const theta = (i / 32) * Math.PI * 2;
          const r = 0.32 + Math.sin(theta * 10) * 0.015 + Math.cos(theta * 6) * 0.01;
          return [Math.cos(theta) * r, Math.sin(theta) * r, 0.022] as [number, number, number];
        })}
        color="#1a1a1a"
        lineWidth={4}
      />
      <Text
        position={[0, 0.01, 0.025]}
        color="#ffe4e6"
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
      >
        A & A
      </Text>

      {/* Loading Text below the envelope */}
      <Text
        position={[0, -1.8, 0]}
        color="#1a1a1a"
        fontSize={0.4}
        anchorX="center"
        anchorY="middle"
      >
        {onClick ? "TAP TO OPEN" : "LOADING..."}
      </Text>
    </group>
  );
}
