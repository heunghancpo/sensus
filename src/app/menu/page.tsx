'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// 3D 컴포넌트 동적 로딩
const ThreeHero = dynamic(() => import('@/components/ThreeHero'), { 
  ssr: false,
  loading: () => <div className="w-full h-[60vh] bg-[#050505] flex items-center justify-center text-gray-500">Loading Experience...</div>
});

const BEANS = {
  HOUSE: [
    {
      name: "The Standard",
      origin: "Brazil & Colombia Blend",
      notes: ["Dark Chocolate", "Roasted Nut", "Heavy Body"],
      desc: "센서스(SENSUS)의 기준. 묵직한 바디감과 고소함, 매일 마셔도 질리지 않는 편안함.",
      price: "6.0"
    },
    {
      name: "Mild Sunset",
      origin: "Ethiopia & Guatemala",
      notes: ["Berry", "Earl Grey", "Brown Sugar"],
      desc: "오후 4시의 햇살 같은 커피. 은은한 산미와 홍차 같은 여운이 특징.",
      price: "6.5"
    }
  ],
  GUEST: [
    {
      name: "Finca Deborah",
      roaster: "Onyx Coffee Lab (USA)",
      origin: "Panama Geisha",
      notes: ["Jasmine", "Bergamot", "Honey"],
      desc: "이번 달의 초청 로스터리. 세계 대회 우승 농장의 최고급 게이샤.",
      price: "12.0",
      limited: true
    }
  ]
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<'HOUSE' | 'GUEST'>('HOUSE');

  return (
    <main className="min-h-screen bg-[#050505]">
      
      {/* 1. 3D Menu Showcase Section */}
      {/* 중요: pointer-events-auto가 있어야 3D 인터랙션 가능, relative로 스크롤 흐름 따름 */}
      <section className="relative h-[60vh] w-full border-b border-white/5 overflow-hidden z-0">
         <ThreeHero />
         
         <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none z-10">
          <p className="text-[#d4af37] text-xs uppercase tracking-widest animate-pulse">
            Interactive Menu Preview
          </p>
        </div>
      </section>


      {/* 2. Detailed Text Menu Section */}
      <section className="relative z-10 bg-[#050505] pt-20 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif text-white mb-6">Our Collections</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            우리의 기준을 담은 House Bean과<br/>
            다양한 해석을 존중하는 Guest Bean을 소개합니다.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16 gap-12">
          {(['HOUSE', 'GUEST'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm tracking-[0.3em] uppercase pb-2 border-b-2 transition-all ${
                activeTab === tab 
                  ? 'text-[#d4af37] border-[#d4af37]' 
                  : 'text-gray-600 border-transparent hover:text-white'
              }`}
            >
              {tab} Bean
            </button>
          ))}
        </div>

        {/* Content - AnimatePresence 수정 */}
        <div className="min-h-[400px]"> {/* 높이 확보하여 레이아웃 흔들림 방지 */}
            <AnimatePresence mode='wait'>
                {/* 중요: key를 최상위 motion.div에 주어서 탭 변경 시 전체가 교체되도록 함 */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {BEANS[activeTab].map((bean, i) => (
                        <div
                            key={bean.name}
                            className="group relative bg-[#111] border border-white/5 p-8 hover:border-[#d4af37] transition-colors"
                        >
                            {(bean as any).limited && (
                                <span className="absolute top-4 right-4 text-[10px] bg-[#d4af37] text-black px-2 py-1 font-bold">LIMITED</span>
                            )}

                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                                {(bean as any).roaster || "Sensus Roastery"}
                            </div>
                            <h3 className="text-3xl font-serif text-white mb-4">{bean.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {bean.notes.map(note => (
                                    <span key={note} className="px-3 py-1 border border-white/10 rounded-full text-xs text-gray-300">
                                        {note}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 min-h-[3em]">
                                {bean.desc}
                            </p>
                            <div className="flex justify-between items-end border-t border-white/10 pt-6">
                                <span className="text-xs text-gray-500">{bean.origin}</span>
                                <span className="text-xl font-serif text-[#d4af37]">{bean.price}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
      </section>
    </main>
  );
}