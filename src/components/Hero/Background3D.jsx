// client/src/components/Hero/Background3D.jsx
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, Torus, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

// 1. Cinematic Camera with Smooth Mouse Parallax
const CinematicCamera = () => {
  useFrame((state) => {
    const targetX = state.pointer.x * 2;
    const targetY = state.pointer.y * 2 + 5; 
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// 2. The Sun: Upgraded Boiling Plasma & Intense Glow (Now Yellow)
const Sun = () => {
  const sunRef = useRef();
  const coronaRef = useRef();
  
  useFrame((state, delta) => {
    sunRef.current.rotation.y += delta * 0.065; 
    coronaRef.current.rotation.y -= delta * 0.08; 
  });

  return (
    <group>
      {/* Super-hot solid inner core - Changed to bright yellow */}
      <mesh ref={sunRef}>
        <Sphere args={[2.3, 64, 64]}>
          <meshBasicMaterial color="#ffff00" />
        </Sphere>
      </mesh>
      
      {/* Boiling, rippling plasma surface - Changed to yellow/gold */}
      <mesh ref={coronaRef}>
        <Sphere args={[2.5, 64, 64]}>
          <MeshDistortMaterial 
            color="#fcd34d" // Rich yellow-gold
            emissive="#f59e0b" // Amber emissive glow
            emissiveIntensity={2}
            distort={0.25} 
            speed={2.5}    
            transparent 
            opacity={0.85} 
          />
        </Sphere>
      </mesh>

      {/* Smooth outer atmospheric glow / Corona - Changed to warm yellow */}
      <mesh>
        <Sphere args={[2.8, 32, 32]}>
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.15} blending={2} />
        </Sphere>
      </mesh>

      {/* Primary dynamic light source - Changed to yellow */}
      <pointLight intensity={100} distance={200} color="#fbbf24" decay={1.5} />
    </group>
  );
};

// 3. Ultra-Realistic Planets with Orbit Rings
const Planet = ({ size, radius, orbitSpeed, rotationSpeed, color, metalness = 0.1, roughness = 0.8, tilt = 0, hasAtmosphere = false }) => {
  const orbitGroupRef = useRef();
  const planetMeshRef = useRef();
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    orbitGroupRef.current.rotation.y += delta * orbitSpeed;
    planetMeshRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={orbitGroupRef} rotation={[0, randomOffset, 0]}>
      <Torus args={[radius, 0.005, 16, 128]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </Torus>
      <group position={[radius, 0, 0]} rotation={[0, 0, tilt]}>
        <mesh ref={planetMeshRef}>
          <Sphere args={[size, 64, 64]}>
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
          </Sphere>
          {hasAtmosphere && (
            <Sphere args={[size * 1.05, 32, 32]}>
              <meshStandardMaterial color="#60a5fa" transparent opacity={0.15} roughness={1} />
            </Sphere>
          )}
        </mesh>
      </group>
    </group>
  );
};

// 4. Scene Assembly
const UniverseScene = () => {
  const systemRef = useRef();
  useFrame((state, delta) => {
    systemRef.current.rotation.y += delta * 0.013; 
  });

  return (
    <group ref={systemRef} rotation={[0.2, 0, -0.1]} position={[0, -2, -8]}>
      <Sun />
      <Planet size={0.5} radius={7} orbitSpeed={0.13} rotationSpeed={1.04} color="#2563eb" metalness={0.4} roughness={0.6} tilt={0.41} hasAtmosphere={true} />
      <Planet size={0.35} radius={10} orbitSpeed={0.104} rotationSpeed={0.91} color="#dc2626" roughness={0.9} />
      <Planet size={1.2} radius={16} orbitSpeed={0.052} rotationSpeed={2.6} color="#b45309" roughness={0.7} />
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#020205]">
      <Canvas camera={{ position: [0, 5, 20], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false }}>
        <color attach="background" args={['#020205']} />
        <fog attach="fog" args={['#020205', 10, 40]} />
        <ambientLight intensity={0.02} color="#ffffff" />
        <CinematicCamera />
        <UniverseScene />
        <Stars radius={100} depth={50} count={8000} factor={3} saturation={0.5} fade speed={0.65} />
        <Sparkles count={200} scale={30} size={4} speed={0.13} opacity={0.05} color="#4c1d95" />
        <Sparkles count={200} scale={40} size={6} speed={0.26} opacity={0.03} color="#9333ea" />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Background3D;