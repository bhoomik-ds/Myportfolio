// client/src/components/Projects/Background3D.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

// Abstract glowing "screen" representing a digital project
const AbstractDevice = ({ position, rotation, speed }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Subtle, elegant orbit/rotation
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Device Body */}
        <Box args={[3, 2, 0.1]} radius={0.1}>
          <meshPhysicalMaterial 
            color="#0b0f1a" 
            metalness={0.8} 
            roughness={0.2} 
            clearcoat={1} 
            transmission={0.5} 
          />
        </Box>
        {/* Glowing Screen Face */}
        <Plane args={[2.8, 1.8]} position={[0, 0, 0.06]}>
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.15} />
        </Plane>
      </group>
    </Float>
  );
};

export default function Background3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        {/* Ambient Corporate Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 20, 10]} intensity={1.5} color="#7c3aed" penumbra={1} />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" penumbra={1} />
        
        {/* Deep Space Particles */}
        <Stars radius={60} depth={40} count={2500} factor={3} saturation={0} fade opacity={0.4} />

        {/* Orbiting Abstract Devices */}
        <AbstractDevice position={[-8, 4, -5]} rotation={[0, Math.PI / 4, 0]} speed={1.5} />
        <AbstractDevice position={[8, -2, -8]} rotation={[0, -Math.PI / 6, 0]} speed={2} />
        <AbstractDevice position={[0, 8, -10]} rotation={[0.2, 0, 0]} speed={1} />

        {/* Soft Glowing Grid Floor Perspective */}
        <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100, 40, 40]} />
          <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.05} />
        </mesh>
      </Canvas>
    </div>
  );
}