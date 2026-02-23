// client/src/components/Skills/Background3D.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Sphere, Stars } from '@react-three/drei';

const FloatingWireframe = ({ position, speed, rotationIntensity }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1.5, 0]} position={position}>
        <meshStandardMaterial color="#4f46e5" wireframe transparent opacity={0.15} />
      </Icosahedron>
    </Float>
  );
};

const Background3D = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        {/* Soft Ambient & Rim Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} intensity={1.5} color="#7c3aed" penumbra={1} />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" penumbra={1} />
        
        {/* Deep Space Particles */}
        <Stars radius={50} depth={40} count={2000} factor={3} saturation={0} fade opacity={0.3} />

        {/* Minimal Floating Geometry */}
        <FloatingWireframe position={[-6, 3, -5]} speed={1.5} rotationIntensity={0.5} />
        <FloatingWireframe position={[6, -4, -8]} speed={2} rotationIntensity={0.3} />
        
        {/* Subtle background glow sphere */}
        <Float speed={1} floatIntensity={0.5}>
          <Sphere args={[2, 32, 32]} position={[0, 0, -10]}>
            <meshBasicMaterial color="#7c3aed" transparent opacity={0.05} wireframe />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
};

export default Background3D;