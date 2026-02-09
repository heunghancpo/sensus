'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { coffeeDB } from '@/data';
import { useStore } from '@/store/useStore';

const ThreeHero = dynamic(() => import('@/components/ThreeHero'), { 
  ssr: false,
  loading: () => <div className="w-full h-[60vh] bg-[#050505] flex items-center justify-center text-gray-500">Loading...</div>
});

const TEXT = {
  KO: {
    title: "Our Collections",
    desc: "우리의 기준을 담은 House Bean과\n다양한 해석을 존중하는 Guest Bean을 소개합니다.",
    limited: "LIMITED"
  },
  JP: {
    title: "Our Collections",
    desc: "私たちの基準を込めたHouse Beanと\n多様な解釈を尊重するGuest Beanをご紹介します。",
    limited: "限定販売"
  }
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<'HOUSE' | 'GUEST'>('HOUSE');
  const { language } = useStore();
  const t = TEXT[language];

  const houseBeans = coffeeDB.filter(bean => !bean.isGuest);
  const guestBeans = coffeeDB.filter(bean => bean.isGuest);
  const currentBeans = activeTab === 'HOUSE' ? houseBeans : guestBeans;

  return (
    <main className="min-h-screen bg-[#050505]">
      
      {/* 1. 3D Menu Showcase */}
      <section className="relative h-[60vh] w-full border-b border-white/5 overflow-hidden z-0">
         <ThreeHero />
      </section>

      {/* 2. Menu List */}
      <section className="relative z-10 bg-[#050505] pt-20 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif text-white mb-6">{t.title}</h1>
          <p className="text-gray-400 max-w-xl mx-auto whitespace-pre-line">
            {t.desc}
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

        {/* Content */}
        <div className="min-h-[400px]">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {currentBeans.map((bean) => (
                        <div
                            key={bean.id}
                            className="group relative bg-[#111] border border-white/5 p-8 hover:border-[#d4af37] transition-colors"
                        >
                            {bean.isGuest && (
                                <span className="absolute top-4 right-4 text-[10px] bg-[#d4af37] text-black px-2 py-1 font-bold">
                                    {t.limited}
                                </span>
                            )}

                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                                {bean.subName}
                            </div>
                            <h3 className="text-3xl font-serif text-white mb-4">{bean.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {bean.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 border border-white/10 rounded-full text-xs text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 min-h-[3em] break-keep">
                                {language === 'KO' ? bean.description : bean.descriptionJP}
                            </p>
                            <div className="flex justify-between items-end border-t border-white/10 pt-6">
                                <div className="flex gap-1">
                                  {/* 로스팅 포인트 */}
                                  {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-1 h-3 rounded-full ${i < (bean.roastingProfile.body) ? 'bg-white/40' : 'bg-white/5'}`} />
                                  ))}
                                </div>
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