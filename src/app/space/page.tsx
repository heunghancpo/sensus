'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, Coffee, Server, MousePointer2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

// --- 다국어 텍스트 데이터 ---
const TEXT = {
  KO: {
    hero: {
      tag: "Spatial Design",
      title: "The Space as a System",
      desc: "SENSUS의 공간은 단순한 인테리어가 아닙니다.\n최고의 효율과 최상의 경험이 공존하는 정밀한 시스템입니다."
    },
    hotspots: [
      {
        id: 1,
        title: "Roasting Lab",
        desc: "투명 유리 너머로 보이는 신뢰. 자체 결점두 선별 기술이 적용된 로스팅 과정을 투명하게 공개합니다.",
        top: "25%", left: "55%" 
      },
      {
        id: 2,
        title: "AI Atelier Table",
        desc: "Track B: Experience. 고객의 기분과 취향을 분석하여 최적의 원두를 매칭하는 인터랙티브 큐레이션 존입니다.",
        top: "60%", left: "40%"
      },
      {
        id: 3,
        title: "Precision Brewing Bar",
        desc: "Track A: Speed. 데이터로 세팅된 배치 브루 시스템을 통해 피크타임에도 90초 이내에 균일한 맛을 제공합니다.",
        top: "45%", left: "85%"
      }
    ],
    tracks: {
      title: "Two-Track Operation",
      a: {
        title: "Track A: Speed & Consistency",
        subtitle: "For Commuters",
        desc: "바쁜 점심시간, 기다림은 사치입니다. 미리 계산된 추출 데이터와 고성능 배치 브루 머신(Batch Brew)이 결합되어, 주문 즉시 완벽한 퀄리티의 커피를 제공합니다.",
        stat: "90s Avg. Service Time"
      },
      b: {
        title: "Track B: Deep Experience",
        subtitle: "For Connoisseurs",
        desc: "중앙의 AI 아틀리에 테이블에서 여유롭게 자신의 취향을 탐색하세요. 음악, 향기, 그리고 커피가 어우러진 공감각적 코스를 경험할 수 있습니다.",
        stat: "Personalized Curation"
      }
    }
  },
  JP: {
    hero: {
      tag: "Spatial Design",
      title: "The Shop as a System",
      desc: "SENSUSの空間は単なるインテリアではありません。\n最高の効率と最上の経験が共存する精密なシステムです。"
    },
    hotspots: [
      {
        id: 1,
        title: "Roasting Lab",
        desc: "ガラス越しに見える信頼。独自の欠点豆選別技術が適用された焙煎過程を透明に公開します。",
        top: "25%", left: "55%"
      },
      {
        id: 2,
        title: "AI Atelier Table",
        desc: "Track B: Experience。顧客の気分と好みを分析し、最適な豆をマッチングするインタラクティブ・キュレーションゾーンです。",
        top: "60%", left: "40%"
      },
      {
        id: 3,
        title: "Precision Brewing Bar",
        desc: "Track A: Speed。データで設定されたバッチブリューシステムにより、ピークタイムでも90秒以内に均一な味を提供します。",
        top: "45%", left: "85%"
      }
    ],
    tracks: {
      title: "Two-Track Operation",
      a: {
        title: "Track A: Speed & Consistency",
        subtitle: "For Commuters",
        desc: "忙しいランチタイム、待つことは贅沢です。あらかじめ計算された抽出データと高性能バッチブリューマシンが結合し、注文即時に完璧なクオリティのコーヒーを提供します。",
        stat: "90s Avg. Service Time"
      },
      b: {
        title: "Track B: Deep Experience",
        subtitle: "For Connoisseurs",
        desc: "中央のAIアトリエテーブルでゆったりと自分の好みを探求してください。音楽、香り、そしてコーヒーが調和した共感覚的コースを体験できます。",
        stat: "Personalized Curation"
      }
    }
  }
};

export default function SpacePage() {
  const { language } = useStore();
  const t = TEXT[language];
  const [activeSpot, setActiveSpot] = useState<number | null>(null);

  return (
    <main className="pt-20 min-h-screen bg-[#050505]">
      
      {/* 1. Header */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-[#d4af37] text-xs font-mono uppercase tracking-widest mb-4 block"
        >
          {t.hero.tag}
        </motion.span>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-serif text-white mb-8"
        >
          {t.hero.title}
        </motion.h1>
        <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
          {t.hero.desc}
        </p>
      </section>

      {/* 2. Interactive Visual (Hotspots) */}
      <section className="w-full max-w-7xl mx-auto px-0 md:px-6 mb-32">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#111] rounded-lg overflow-hidden border border-white/10 group">
          {/* Background Image */}
          <Image 
            src="/cafe1.png" 
            alt="Sensus Cafe Interior" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

          {/* Guide Text */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 text-xs font-mono bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            <MousePointer2 size={12} className="animate-bounce" />
            <span>Click points to explore</span>
          </div>

          {/* Hotspots */}
          {t.hotspots.map((spot) => (
            <div 
              key={spot.id}
              className="absolute z-20"
              style={{ top: spot.top, left: spot.left }}
            >
              <button
                onClick={() => setActiveSpot(activeSpot === spot.id ? null : spot.id)}
                className="relative w-8 h-8 flex items-center justify-center group/btn"
              >
                <span className="absolute w-full h-full bg-[#d4af37] rounded-full animate-ping opacity-75" />
                <span className="relative w-3 h-3 bg-[#d4af37] rounded-full border border-black shadow-lg transition-transform group-hover/btn:scale-150" />
              </button>

              <AnimatePresence>
                {activeSpot === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-md border border-[#d4af37]/50 p-5 rounded-sm text-left shadow-2xl z-30"
                  >
                    <div className="text-[#d4af37] text-xs font-bold uppercase mb-1 tracking-wider">Zone 0{spot.id}</div>
                    <h3 className="text-white font-serif text-lg mb-2">{spot.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{spot.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Two-Track Strategy Detail */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-serif text-white">{t.tracks.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Track A */}
            <div className="bg-[#111] p-10 border border-white/5 hover:border-blue-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 bg-blue-500/10 rounded-full text-blue-500"><Clock size={20} /></span>
                  <span className="text-blue-500 font-mono text-xs uppercase tracking-widest">{t.tracks.a.subtitle}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.tracks.a.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 h-20">{t.tracks.a.desc}</p>
                <div className="inline-block border border-blue-500/30 bg-blue-500/5 px-4 py-2 rounded text-xs text-blue-400 font-mono">
                  KPI: {t.tracks.a.stat}
                </div>
              </div>
            </div>

            {/* Track B */}
            <div className="bg-[#111] p-10 border border-white/5 hover:border-[#d4af37]/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Server size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 bg-[#d4af37]/10 rounded-full text-[#d4af37]"><Coffee size={20} /></span>
                  <span className="text-[#d4af37] font-mono text-xs uppercase tracking-widest">{t.tracks.b.subtitle}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.tracks.b.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 h-20">{t.tracks.b.desc}</p>
                <div className="inline-block border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-2 rounded text-xs text-[#d4af37] font-mono">
                  Value: {t.tracks.b.stat}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}