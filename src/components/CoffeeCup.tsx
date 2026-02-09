'use client';
import { useRef, useEffect, useState } from 'react';
import { Cylinder, Circle, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { CoffeeData } from '@/types';
import { useStore } from '@/store/useStore';

interface CoffeeCupProps {
  data: CoffeeData;
  index: number;
  total: number;
}

export default function CoffeeCup({ data, index, total }: CoffeeCupProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { phase, selectedCoffee, selectCoffee, setPhase } = useStore();
  const [hovered, setHovered] = useState(false);

  // 호버 시 커서 변경 (drei 유틸리티 사용)
  useCursor(hovered && phase === 'SELECTION');

  const isSelected = selectedCoffee === data.id;

  // GSAP Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!groupRef.current) return;

      // 1. INTRO: 원형 배치
      if (phase === 'INTRO') {
        const angle = (index / total) * Math.PI * 2;
        const radius = 2.5;
        
        gsap.to(groupRef.current.position, {
          x: Math.cos(angle) * radius,
          y: 0,
          z: Math.sin(angle) * radius,
          duration: 1.5,
          ease: 'power3.inOut'
        });
        gsap.to(groupRef.current.rotation, { y: 0, duration: 1 });
      }
      
      // 2. SELECTION: 일렬 정렬
      else if (phase === 'SELECTION') {
        const spacing = 2.0;
        // 중앙 정렬을 위한 시작점 계산
        const startX = -((total - 1) * spacing) / 2; 

        gsap.to(groupRef.current.position, {
          x: startX + index * spacing,
          y: 0,
          z: 0,
          duration: 1.2,
          ease: 'back.out(1.2)',
          delay: index * 0.1
        });
        
        gsap.to(groupRef.current.rotation, { y: 0, duration: 0.5 });
      }

      // 3. DETAIL: 선택된 컵 강조
      else if (phase === 'DETAIL') {
        if (isSelected) {
          gsap.to(groupRef.current.position, { 
            x: -2, // 왼쪽으로 이동 (오른쪽에 텍스트 공간 확보)
            y: 0.5, 
            z: 3, 
            duration: 1, 
            ease: 'power2.out' 
          });
          gsap.to(groupRef.current.rotation, { 
            x: 0.2, 
            y: 0.5, 
            z: 0, 
            duration: 1 
          });
        } else {
          // 선택되지 않은 컵은 멀리 보내기
          gsap.to(groupRef.current.position, { y: -5, duration: 0.8 });
        }
      }
    }, groupRef); // Scope to this component

    return () => ctx.revert();
  }, [phase, isSelected, index, total, data.id]);

  // Interaction Handlers
  const handleClick = (e: any) => {
    e.stopPropagation(); // 중요: 이벤트 버블링 방지
    if (phase === 'SELECTION') {
      selectCoffee(data.id);
      setPhase('DETAIL');
    }
  };

  return (
    <group 
      ref={groupRef} 
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cup Body */}
      <Cylinder args={[0.55, 0.45, 1.2, 32]} position={[0, 0.6, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2} 
          metalness={0.1} 
        />
      </Cylinder>
      
      {/* Coffee Liquid */}
      <Circle args={[0.5, 32]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.15, 0]}>
        <meshStandardMaterial color={data.color} roughness={0.2} metalness={0.0} />
      </Circle>
    </group>
  );
}