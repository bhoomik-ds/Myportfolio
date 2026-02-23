// client/src/components/Contact/Background3D.jsx
import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Grid, Icosahedron, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Premium glass-like floating geometry
const FloatingGeometry = () => {
  const icoRef = useRef();
  const sphereRef = useRef();

  useFrame((state, delta) => {
    // Slow, elegant rotation
    icoRef.current.rotation.x += delta * 0.1;
    icoRef.current.rotation.y += delta * 0.15;
    sphereRef.current.rotation.y -= delta * 0.05;
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron ref={icoRef} args={[1.5, 0]} position={[-5, 2, -4]}>
          <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.15} />
        </Icosahedron>
      </Float>
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <Sphere ref={sphereRef} args={[1, 32, 32]} position={[5, -1, -6]}>
          <meshPhysicalMaterial 
            color="#0b0f1a" 
            metalness={0.9} 
            roughness={0.1} 
            clearcoat={1} 
            emissive="#7c3aed"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>
    </>
  );
};

// Smooth Mouse Parallax Camera Rig
const CameraRig = ({ children }) => {
  const group = useRef();
  const { camera } = useThree();

  useFrame((state) => {
    // Lerp camera position based on mouse for smooth 60fps parallax
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 1);
    
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return <group ref={group}>{children}</group>;
};

export default function Background3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 1, 8], fov: 45 }} dpr={[1, 2]}>
        {/* Soft Corporate Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 5]} intensity={1.5} color="#7c3aed" penumbra={1} />
        <spotLight position={[-10, -10, -5]} intensity={1} color="#6366f1" penumbra={1} />
        
        <CameraRig>
          <Stars radius={50} depth={40} count={1500} factor={3} saturation={0} fade opacity={0.3} />
          <FloatingGeometry />
          
          {/* Subtle Fading Grid Floor */}
          <Grid 
            position={[0, -3, 0]} 
            args={[30, 30]} 
            cellSize={1} 
            cellThickness={1} 
            cellColor="#4f46e5" 
            sectionSize={3} 
            sectionThickness={1.5} 
            sectionColor="#7c3aed" 
            fadeDistance={25} 
            fadeStrength={1} 
            transparent 
            opacity={0.15}
          />
        </CameraRig>
      </Canvas>
    </div>
  );
}