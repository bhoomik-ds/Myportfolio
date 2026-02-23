// client/src/components/Hero/Background3D.jsx
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, Torus, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

// 1. Camera Parallax (Disabled on mobile for touch stability)
const CinematicCamera = ({ isMobile }) => {
  useFrame((state) => {
    const targetX = isMobile ? 0 : state.pointer.x * 2;
    const targetY = isMobile ? 5 : state.pointer.y * 2 + 5; 
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// 2. The Sun - FIXED FLICKERING BUG
const Sun = ({ isMobile }) => {
  const sunRef = useRef();
  const coronaRef = useRef();
  
  const resolution = isMobile ? 32 : 64;

  useFrame((state, delta) => {
    sunRef.current.rotation.y += delta * 0.065; 
    coronaRef.current.rotation.y -= delta * 0.08; 
  });

  return (
    <group>
      {/* Shrink inner core slightly to stop Z-fighting, added toneMapped=false */}
      <mesh ref={sunRef}>
        <Sphere args={[2.0, resolution, resolution]}>
          <meshBasicMaterial color="#ffff00" toneMapped={false} />
        </Sphere>
      </mesh>
      
      {/* Reduced distortion on mobile to stop clipping, added depthWrite=false and toneMapped=false */}
      <mesh ref={coronaRef}>
        <Sphere args={[2.5, resolution, resolution]}>
          <MeshDistortMaterial 
            color="#fcd34d" 
            emissive="#f59e0b" 
            emissiveIntensity={2}
            distort={isMobile ? 0.15 : 0.25} 
            speed={2.5}    
            transparent 
            opacity={0.85} 
            toneMapped={false}
            depthWrite={false}
          />
        </Sphere>
      </mesh>

      {/* Added depthWrite=false and toneMapped=false to the outer halo */}
      <mesh>
        <Sphere args={[2.9, 16, 16]}>
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.15} blending={2} depthWrite={false} toneMapped={false} />
        </Sphere>
      </mesh>

      <pointLight intensity={100} distance={200} color="#fbbf24" decay={1.5} />
    </group>
  );
};

// 3. Reusable Planet
const Planet = ({ size, radius, orbitSpeed, rotationSpeed, color, metalness = 0.1, roughness = 0.8, tilt = 0, hasAtmosphere = false, isMobile }) => {
  const orbitGroupRef = useRef();
  const planetMeshRef = useRef();
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  const resolution = isMobile ? 32 : 64;
  const ringResolution = isMobile ? 64 : 128; 

  useFrame((state, delta) => {
    orbitGroupRef.current.rotation.y += delta * orbitSpeed;
    planetMeshRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={orbitGroupRef} rotation={[0, randomOffset, 0]}>
      <Torus args={[radius, 0.005, 16, ringResolution]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </Torus>
      
      <group position={[radius, 0, 0]} rotation={[0, 0, tilt]}>
        <mesh ref={planetMeshRef}>
          <Sphere args={[size, resolution, resolution]}>
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
          </Sphere>
          {hasAtmosphere && (
            <Sphere args={[size * 1.05, 16, 16]}>
              <meshStandardMaterial color="#60a5fa" transparent opacity={0.15} roughness={1} depthWrite={false} />
            </Sphere>
          )}
        </mesh>
      </group>
    </group>
  );
};

// 4. Scene Assembly
const UniverseScene = ({ isMobile }) => {
  const systemRef = useRef();
  
  useFrame((state, delta) => {
    systemRef.current.rotation.y += delta * 0.013; 
  });

  return (
    <group ref={systemRef} scale={isMobile ? 0.6 : 1} rotation={[0.2, 0, -0.1]} position={[0, -2, -8]}>
      <Sun isMobile={isMobile} />
      <Planet isMobile={isMobile} size={0.5} radius={7} orbitSpeed={0.13} rotationSpeed={1.04} color="#2563eb" metalness={0.4} roughness={0.6} tilt={0.41} hasAtmosphere={true} />
      <Planet isMobile={isMobile} size={0.35} radius={10} orbitSpeed={0.104} rotationSpeed={0.91} color="#dc2626" roughness={0.9} />
      <Planet isMobile={isMobile} size={1.2} radius={16} orbitSpeed={0.052} rotationSpeed={2.6} color="#b45309" roughness={0.7} />
    </group>
  );
};

const Background3D = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#020205]">
      <Canvas camera={{ position: [0, 5, 20], fov: 45 }} dpr={isMobile ? [1, 1.2] : [1, 1.5]} gl={{ antialias: false }}>
        
        <color attach="background" args={['#020205']} />
        <fog attach="fog" args={['#020205', 10, 40]} />
        <ambientLight intensity={0.02} color="#ffffff" />
        
        <CinematicCamera isMobile={isMobile} />
        <UniverseScene isMobile={isMobile} />
        
        <Stars radius={100} depth={50} count={isMobile ? 2500 : 8000} factor={3} saturation={0.5} fade speed={0.65} />
        <Sparkles count={isMobile ? 50 : 200} scale={30} size={4} speed={0.13} opacity={0.05} color="#4c1d95" />
        <Sparkles count={isMobile ? 50 : 200} scale={40} size={6} speed={0.26} opacity={0.03} color="#9333ea" />
        
        <EffectComposer disableNormalPass>
          {/* Lowered threshold slightly more to guarantee consistent glow */}
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
          {!isMobile && <Noise opacity={0.03} />}
          {!isMobile && <Vignette eskil={false} offset={0.1} darkness={1.1} />}
        </EffectComposer>

      </Canvas>
    </div>
  );
};

export default Background3D;