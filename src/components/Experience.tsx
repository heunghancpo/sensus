'use client';
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import CoffeeCup from './CoffeeCup';
import { useStore } from '@/store/useStore';
import { coffeeDB } from '@/data';

export default function Experience() {
  const { camera } = useThree();
  const { phase } = useStore();
  const trayRef = useRef<THREE.Group>(null!);

  // Camera & Tray Logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. INTRO
      if (phase === 'INTRO') {
        gsap.to(camera.position, { x: 0, y: 12, z: 8, duration: 2, ease: 'power2.inOut' });
        gsap.to(camera.rotation, { x: -Math.PI / 3, y: 0, z: 0, duration: 2 });
      } 
      // 2. SELECTION
      else if (phase === 'SELECTION') {
        // 카메라 정면 뷰
        gsap.to(camera.position, { x: 0, y: 2, z: 8, duration: 1.5, ease: 'power2.inOut' });
        gsap.to(camera.rotation, { x: -0.1, y: 0, z: 0, duration: 1.5 });

        // 중요: 트레이 회전 멈추고 정면 정렬
        if (trayRef.current) {
           gsap.to(trayRef.current.rotation, { y: 0, duration: 1 });
        }
      } 
      // 3. DETAIL
      else if (phase === 'DETAIL') {
         // 카메라는 살짝 더 줌인하거나 현재 위치 유지
      }
    });
    return () => ctx.revert();
  }, [phase, camera]);

  // Tray Rotation (Only in INTRO)
  useFrame((state, delta) => {
    if (phase === 'INTRO' && trayRef.current) {
      trayRef.current.rotation.y += delta * 0.2; // 천천히 회전
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={100} castShadow />
      <Environment preset="city" />

      {/* Tray Group */}
      <group ref={trayRef}>
        {/* Tray Mesh (Optional visual) */}
        {phase === 'INTRO' && (
             <mesh position={[0, -0.1, 0]} receiveShadow rotation={[-Math.PI/2, 0, 0]}>
                <circleGeometry args={[4, 64]} />
                <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
             </mesh>
        )}

        {coffeeDB.map((coffee, i) => (
          <CoffeeCup 
            key={coffee.id} 
            data={coffee} 
            index={i} 
            total={coffeeDB.length} 
          />
        ))}
      </group>

      <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />
    </>
  );
}