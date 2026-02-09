// src/components/HeroSection.tsx
"use client";

import dynamic from 'next/dynamic';

// 여기서 dynamic import를 수행합니다.
// 클라이언트 컴포넌트 내부이므로 ssr: false가 정상 작동합니다.
const ThreeHero = dynamic(() => import('./ThreeHero'), { 
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" /> // 로딩 중 검은 화면 유지
});

export default function HeroSection() {
  return <ThreeHero />;
}