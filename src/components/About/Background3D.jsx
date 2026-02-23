// client/src/components/About/Background3D.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Icosahedron, Stars } from '@react-three/drei';

// Top-Right: Premium Dark Sphere with Subtle Violet Glow
const PremiumSphere = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[5, 2, -3]}>
        <meshPhysicalMaterial 
          color="#0b0f1a" 
          roughness={0.2} 
          metalness={0.8} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
          emissive="#7c3aed"
          emissiveIntensity={0.15}
        />
      </Sphere>
    </Float>
  );
};

// Bottom-Left: Corporate Wireframe Geometry
const WireframeGeometry = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x -= delta * 0.05;
    meshRef.current.rotation.y -= delta * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[1.4, 0]} position={[-5, -2, -2]}>
        <meshStandardMaterial 
          color="#6366f1" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Icosahedron>
    </Float>
  );
};

export default function Background3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        {/* Soft Corporate Lighting */}
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 5]} intensity={1.5} color="#7c3aed" penumbra={1} />
        <spotLight position={[-10, -10, -5]} intensity={1} color="#6366f1" penumbra={1} />
        
        {/* Subtle Background Particles */}
        <Stars radius={40} depth={30} count={1500} factor={3} saturation={0} fade speed={0.5} opacity={0.4} />
        
        <PremiumSphere />
        <WireframeGeometry />
      </Canvas>
    </div>
  );
}