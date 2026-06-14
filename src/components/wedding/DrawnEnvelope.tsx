import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Line } from "@react-three/drei";

export function DrawnEnvelope({ onClick }: { onClick?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

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
      scale={hovered ? 1.1 : 1}
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
