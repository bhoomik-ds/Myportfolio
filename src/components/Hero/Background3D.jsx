// client/src/components/Hero/Background3D.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Sphere } from '@react-three/drei';

// Individual animated shape components
const AnimatedIcosahedron = () => {
  const meshRef = useRef();
  // Rotate the shape smoothly on every frame
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 0]} position={[-4, 1, -2]}>
        <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.6} transparent />
      </Icosahedron>
    </Float>
  );
};

const AnimatedTorus = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x -= delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[1.2, 0.4, 16, 32]} position={[5, -1, -3]}>
        <meshStandardMaterial color="#d946ef" wireframe opacity={0.4} transparent />
      </Torus>
    </Float>
  );
};

const AnimatedSphere = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.y -= delta * 0.1;
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.6, 32, 32]} position={[-3, -2, -1]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.8} opacity={0.8} transparent />
      </Sphere>
    </Float>
  );
};

const Background3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Soft lighting setup for a neon/futuristic vibe */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        
        {/* 3D Objects */}
        <AnimatedIcosahedron />
        <AnimatedTorus />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
};

export default Background3D;