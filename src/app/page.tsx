'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, CloudRain, Fingerprint, ChevronDown, Layers, Anchor } from 'lucide-react';
import { useStore } from '@/store/useStore';

// --- 다국어 콘텐츠 데이터 (Expanded Content) ---
const CONTENT = {
  KO: {
    hero: {
      tag: "The Logic of Taste",
      title: "SENSUS",
      desc: "불확실한 감각을 정밀한 데이터로.\nSENSUS는 커피의 모든 변수를 통제하여\n의도된 완벽함을 설계합니다.",
    },
    philosophy: {
      title: <>We don't create taste.<br/><span className="text-[#d4af37] italic">We preserve it.</span></>,
      p1: "커피의 맛은 수천 가지 변수에 의해 흔들립니다. 날씨, 습도, 로스터의 컨디션, 그리고 추출되는 순간의 분위기까지.",
      p2: "SENSUS는 이 '흔들림'을 줄이는 쪽을 선택했습니다. 딥러닝 기술로 결점을 제거하고, 환경 변수를 실시간으로 통제하여 언제나 의도된 기준(Baseline)을 지켜냅니다.",
    },
    features: {
      title: "Invisible Tech, Visible Taste",
      cards: [
        {
          title: "Quiet Tech",
          desc: "보이지 않는 곳에서 완벽을 만듭니다. 자체 개발한 CNN 기반 결점두 선별기가 99.9%의 정확도로 맛을 저해하는 요소를 제거합니다.",
          link: "View Technology"
        },
        {
          title: "Weather-Aware",
          desc: "오늘의 날씨가 커피의 맛을 방해하지 않도록. 기온과 습도 데이터를 실시간으로 분석하여 로스팅 프로파일을 미세 조정합니다.",
          link: "See Data"
        },
        {
          title: "The Atelier",
          desc: "당신의 취향, 기분, 그리고 감각. 음악과 향, 맛이 어우러진 공감각적 큐레이션으로 단순한 음료 이상의 경험을 설계합니다.",
          link: "Start Curation"
        }
      ]
    },
    system: {
      tag: "The Shop as a System",
      title: "Designed for Consistency",
      desc: "우리는 매장을 '멋진 공간'이기 전에, 기준이 유지되는 '시스템'으로 설계합니다.",
      points: [
        { title: "Brewing Zone", text: "핵심 설비가 집중된 정밀 추출 구역" },
        { title: "Batch Brew Line", text: "데이터 기반으로 세팅된 고속 제공 라인" },
        { title: "Flow Control", text: "입장부터 픽업까지 직관적인 동선 설계" }
      ]
    },
    cta: {
      b2c: { title: "Experience", desc: "센서스가 제안하는\n커피와 공간의 미학", btn: "View Menu" },
      b2b: { title: "Partnership", desc: "기술 기반 로스팅 솔루션과\n비즈니스 협업", btn: "Business Inquiry" }
    }
  },
  JP: {
    hero: {
      tag: "The Logic of Taste",
      title: "SENSUS",
      desc: "不確かな感覚を精密なデータで。\nSENSUSはコーヒーのすべての変数を制御し、\n意図された完璧さを設計します。",
    },
    philosophy: {
      title: <>We don't create taste.<br/><span className="text-[#d4af37] italic">We preserve it.</span></>,
      p1: "コーヒーの味は数千の変数によって揺らぎます。天気、湿度、焙煎士のコンディション、そして抽出される瞬間の雰囲気まで。",
      p2: "SENSUSはその「揺らぎ」を減らすことを選びました。ディープラーニング技術で欠点を除去し、環境変数をリアルタイムで制御して、常に意図された基準(Baseline)を守り抜きます。",
    },
    features: {
      title: "Invisible Tech, Visible Taste",
      cards: [
        {
          title: "Quiet Tech",
          desc: "見えないところで完璧を作ります。独自開発したCNNベースの欠点豆選別機が99.9%の精度で味を損なう要素を除去します。",
          link: "View Technology"
        },
        {
          title: "Weather-Aware",
          desc: "今日の天気がコーヒーの味を邪魔しないように。気温と湿度データをリアルタイムで分析し、ロースティングプロファイルを微調整します。",
          link: "See Data"
        },
        {
          title: "The Atelier",
          desc: "あなたの好み、気分、そして感覚。音楽と香り、味が調和した共感覚的キュレーションで、単なる飲み物以上の経験を設計します。",
          link: "Start Curation"
        }
      ]
    },
    system: {
      tag: "The Shop as a System",
      title: "Designed for Consistency",
      desc: "私たちは店舗を「素敵な空間」である前に、基準が維持される「システム」として設計します。",
      points: [
        { title: "Brewing Zone", text: "核心設備が集中した精密抽出エリア" },
        { title: "Batch Brew Line", text: "データに基づいて設定された高速提供ライン" },
        { title: "Flow Control", text: "入場からピックアップまで直感的な動線設計" }
      ]
    },
    cta: {
      b2c: { title: "Experience", desc: "Sensusが提案する\nコーヒーと空間の美学", btn: "View Menu" },
      b2b: { title: "Partnership", desc: "技術ベースの焙煎ソリューションと\nビジネス協業", btn: "Business Inquiry" }
    }
  }
};

export default function Home() {
  const containerRef = useRef(null);
  const { language } = useStore(); // 언어 상태 가져오기
  const t = CONTENT[language]; // 현재 언어에 맞는 텍스트 선택

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-[#e0e0e0] overflow-x-hidden font-sans">
      
      {/* 1. Hero Section */}
      <section className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] z-0" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none"></div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#d4af37] text-xs md:text-sm tracking-[0.4em] uppercase mb-6 font-mono">
              {t.hero.tag}
            </p>
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tighter mb-8">
              {t.hero.title}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line">
              {t.hero.desc}
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 z-10 animate-bounce text-gray-500"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>


      {/* 2. Philosophy Section */}
      <section className="py-32 px-6 max-w-6xl mx-auto border-b border-white/5">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8 text-white">
              {t.philosophy.title}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-gray-400 leading-relaxed text-lg"
          >
            <p>{t.philosophy.p1}</p>
            <p>
              <strong className="text-white font-medium">SENSUS</strong>{language === 'KO' ? '는' : 'は'} {t.philosophy.p2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2.5 New Section: The Shop as a System (Systematic Cafe) */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-[#080808]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
              <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest block mb-4">
                {t.system.tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                {t.system.title}
              </h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                {t.system.desc}
              </p>
              <div className="space-y-6">
                {t.system.points.map((point, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37]">
                      {i === 0 ? <Layers size={18} /> : i === 1 ? <Cpu size={18} /> : <Anchor size={18} />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{point.title}</h4>
                      <p className="text-xs text-gray-500">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           {/* Mockup Graphic Area */}
           <div className="order-1 md:order-2 h-[400px] bg-[#111] border border-white/5 rounded-lg flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto=format&fit=crop')] bg-cover opacity-20 group-hover:opacity-30 transition-opacity grayscale"></div>
              <div className="relative z-10 border border-[#d4af37]/30 px-6 py-2 bg-black/50 backdrop-blur-sm text-[#d4af37] font-mono text-xs">
                SYSTEM BLUEPRINT v1.0
              </div>
           </div>
        </div>
      </section>


      {/* 3. Core Features */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest">Core Competency</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-4">{t.features.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cards */}
            {t.features.cards.map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-[#111] border border-white/5 hover:border-[#d4af37] transition-all group flex flex-col"
              >
                {i === 0 && <Cpu className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />}
                {i === 1 && <CloudRain className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />}
                {i === 2 && <Fingerprint className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />}
                
                <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">
                  {card.desc}
                </p>
                <Link href={i === 0 || i === 1 ? "/tech" : "/curation"} className="text-xs uppercase tracking-widest text-white flex items-center gap-2 group-hover:text-[#d4af37] mt-auto">
                  {card.link} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. Dual CTA */}
      <section className="min-h-[60vh] flex flex-col md:flex-row">
        
        {/* Left: Consumer */}
        <Link href="/menu" className="group w-full md:w-1/2 bg-[#111] relative overflow-hidden flex flex-col items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/10 hover:bg-[#161616] transition-colors">
          <div className="text-center z-10">
            <h3 className="text-4xl font-serif text-white mb-4 group-hover:scale-105 transition-transform">{t.cta.b2c.title}</h3>
            <p className="text-gray-400 mb-8 whitespace-pre-line">{t.cta.b2c.desc}</p>
            <span className="inline-flex items-center gap-2 text-[#d4af37] text-xs uppercase tracking-widest">
              {t.cta.b2c.btn} <ArrowRight size={16} />
            </span>
          </div>
          <div className="absolute w-64 h-64 rounded-full border border-white/5 group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
        </Link>

        {/* Right: Business */}
        <Link href="/partner" className="group w-full md:w-1/2 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center p-12 hover:bg-[#0a0a0a] transition-colors">
           <div className="text-center z-10">
            <h3 className="text-4xl font-serif text-white mb-4 group-hover:scale-105 transition-transform">{t.cta.b2b.title}</h3>
            <p className="text-gray-400 mb-8 whitespace-pre-line">{t.cta.b2b.desc}</p>
            <span className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-widest group-hover:text-[#d4af37] transition-colors">
              {t.cta.b2b.btn} <ArrowRight size={16} />
            </span>
          </div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </Link>
        
      </section>

    </main>
  );
}