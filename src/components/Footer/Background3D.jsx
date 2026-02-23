// client/src/components/Footer/Background3D.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// 1. A subtle glowing horizon line stretching across the background
const HorizonLine = () => {
  return (
    <mesh position={[0, -1, -5]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.01, 0.01, 50, 16]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} />
    </mesh>
  );
};

// 2. A soft vertical light beam fading downward
const VerticalLightBeam = () => {
  const meshRef = useRef();

  useFrame((state) => {
    // Subtle pulsing effect for the light beam
    meshRef.current.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
  });

  return (
    <mesh position={[0, 2, -6]}>
      <planeGeometry args={[4, 15]} />
      <meshBasicMaterial 
        ref={meshRef}
        color="#4f46e5" 
        transparent 
        opacity={0.05} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </mesh>
  );
};

// 3. Floating geometric particles
const FloatingParticles = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i} 
          position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 5, -8]}
          rotation={[Math.random(), Math.random(), 0]}
        >
          <octahedronGeometry args={[0.1, 0]} />
          <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

export default function Background3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Stars radius={40} depth={20} count={1000} factor={2} saturation={0} fade opacity={0.3} />
        <HorizonLine />
        <VerticalLightBeam />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}