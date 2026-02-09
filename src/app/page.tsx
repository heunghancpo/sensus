'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, CloudRain, Fingerprint, ChevronDown, Layers, Anchor } from 'lucide-react';
import { useStore } from '@/store/useStore';

// --- 다국어 콘텐츠 데이터 (감각적/철학적 톤앤매너) ---
const CONTENT = {
  KO: {
    hero: {
      tag: "Data Meets Sense",
      // title: "SENSUS", // 애니메이션으로 대체
      desc: "감각과 우리의 만남으로 완성되는 커피.\n당신의 고유한 감각을\n정밀한 데이터로 표현합니다.",
    },
    philosophy: {
      title: <>We don't create taste.<br/><span className="text-[#d4af37] italic">We translate it.</span></>,
      p1: "맛은 단순한 미각이 아닙니다. 그날의 기분, 날씨, 그리고 당신의 취향이 결합된 복합적인 경험입니다.",
      p2: "SENSUS는 당신의 감각을 데이터로 해석합니다. 모호한 취향을 명확한 수치로 변환하고, 기술을 통해 당신이 원하는 그 맛을 정확하게 구현해냅니다.",
    },
    features: {
      title: "The Logic of Taste",
      cards: [
        {
          title: "Quiet Tech",
          desc: "타협 없는 퀄리티 컨트롤. 독자적인 AI 비전 센서가 500ms 안에 결점두를 식별하고 제거합니다.",
          link: "View Technology"
        },
        {
          title: "Weather-Aware",
          desc: "환경을 이기는 데이터. 기압과 습도의 변화를 예측하여 로스팅 프로파일을 실시간으로 재설계합니다.",
          link: "See Data"
        },
        {
          title: "Synesthesia",
          desc: "감각의 전이. 당신의 무드를 분석해 음악, 향, 그리고 맛이 완벽하게 동기화된 경험을 선사합니다.",
          link: "Start Curation"
        }
      ]
    },
    system: {
      tag: "Systematic Excellence",
      title: "Blueprint for Consistency",
      desc: "우리는 카페를 운영하지 않습니다.\n완벽한 한 잔이 반복 재생산되는 '시스템'을 가동합니다.",
      points: [
        { title: "Precision Brewing", text: "0.1g 단위의 추출 제어" },
        { title: "Time-Sync Batch", text: "가장 맛있는 골든 타임 유지" },
        { title: "Seamless Flow", text: "동선까지 설계된 엔지니어링" }
      ]
    },
    cta: {
      b2c: { title: "The Experience", desc: "데이터로 증명된\n가장 완벽한 취향", btn: "View Menu" },
      b2b: { title: "Partnership", desc: "이 완벽한 시스템을\n당신의 비즈니스에", btn: "Business Inquiry" }
    }
  },
  JP: {
    hero: {
      tag: "Data Meets Sense",
      desc: "感覚と私たちの出会いで完成するコーヒー。\nあなたの固有な感覚を\n精密なデータで表現します。",
    },
    philosophy: {
      title: <>We don't create taste.<br/><span className="text-[#d4af37] italic">We translate it.</span></>,
      p1: "味は単なる味覚ではありません。その日の気分、天気、そしてあなたの好みが結合された複合的な経験です。",
      p2: "SENSUSはあなたの感覚をデータで解釈します。曖昧な好みを明確な数値に変換し、技術を通じてあなたが望むその味を正確に具現します。",
    },
    features: {
      title: "The Logic of Taste",
      cards: [
        {
          title: "Quiet Tech",
          desc: "妥協のないクオリティコントロール。独自のAIビジョンセンサーが500ms以内に欠点豆を識別し除去します。",
          link: "View Technology"
        },
        {
          title: "Weather-Aware",
          desc: "環境に打ち勝つデータ。気圧と湿度の変化を予測し、ロースティングプロファイルをリアルタイムで再設計します。",
          link: "See Data"
        },
        {
          title: "Synesthesia",
          desc: "感覚の転移。あなたのムードを分析し、音楽、香り、そして味が完璧に同期した経験を贈ります。",
          link: "Start Curation"
        }
      ]
    },
    system: {
      tag: "Systematic Excellence",
      title: "Blueprint for Consistency",
      desc: "私たちはカフェを運営しているのではありません。\n完璧な一杯が反復再生産される「システム」を稼動しています。",
      points: [
        { title: "Precision Brewing", text: "0.1g単位の抽出制御" },
        { title: "Time-Sync Batch", text: "最も美味しいゴールデンタイムの維持" },
        { title: "Seamless Flow", text: "動線まで設計されたエンジニアリング" }
      ]
    },
    cta: {
      b2c: { title: "The Experience", desc: "データで証明された\n最も完璧な好み", btn: "View Menu" },
      b2b: { title: "Partnership", desc: "この完璧なシステムを\nあなたのビジネスに", btn: "Business Inquiry" }
    }
  }
};

export default function Home() {
  const containerRef = useRef(null);
  const { language } = useStore();
  const t = CONTENT[language];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]); 
  
  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-[#e0e0e0] overflow-x-hidden font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* 1. Hero Section: Cinematic Impact */}
      <section className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
        {/* Dynamic Background Image with Zoom Effect */}
        <motion.div 
          style={{ scale: heroScale, opacity: 0.5 }} 
          className="absolute inset-0 z-0"
        >
           {/* Dark, Moody Coffee Texture Image */}
           <div 
             className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2940&auto=format&fit=crop')" }} 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505]" /> 
        </motion.div>
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none mix-blend-overlay"></div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
                <span className="w-8 md:w-16 h-[1px] bg-[#d4af37]/70"></span>
                <p className="text-[#d4af37] text-[10px] md:text-sm tracking-[0.4em] uppercase font-mono font-bold">
                {t.hero.tag}
                </p>
                <span className="w-8 md:w-16 h-[1px] bg-[#d4af37]/70"></span>
            </div>
            
            {/* Animation: SENS + US Merge */}
            <div className="flex justify-center items-center mb-8 mix-blend-difference overflow-hidden py-4">
               {/* SENS: 제자리에 묵직하게 등장 */}
               <motion.span
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1.2, ease: "easeOut" }}
                 className="text-7xl md:text-[11rem] font-serif font-bold text-white tracking-tighter leading-none z-10 relative"
               >
                 SENS
               </motion.span>
               
               {/* US: S 뒤쪽(왼쪽)에서 오른쪽으로 스르륵 빠져나옴 */}
               <motion.span
                 initial={{ x: -150, opacity: 0 }} // SENS 쪽으로 숨겨둠
                 animate={{ x: 0, opacity: 1 }}    // 제자리로 이동
                 transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} // SENS 등장 후 0.5초 뒤 시작
                 className="text-7xl md:text-[11rem] font-serif font-bold text-white tracking-tighter leading-none relative -ml-2" // -ml-2로 시각적 간격 미세 조정
               >
                 US
               </motion.span>
            </div>

            <p className="text-white/80 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed whitespace-pre-line drop-shadow-2xl">
              {t.hero.desc}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 z-10 animate-bounce text-white/30"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>


      {/* 2. Philosophy Section: Deep Dive */}
      <section className="py-40 md:py-60 px-6 max-w-7xl mx-auto border-b border-white/5 relative">
        <div className="grid md:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-10 text-white">
              {t.philosophy.title}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-gray-300 leading-relaxed text-xl font-light"
          >
            <p className="border-l-2 border-[#d4af37] pl-6">{t.philosophy.p1}</p>
            <p className="pl-6 text-gray-500">
              {t.philosophy.p2}
            </p>
          </motion.div>
        </div>
        
        {/* Background Typography (Subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] z-0 pointer-events-none whitespace-nowrap overflow-hidden select-none font-serif tracking-widest">
            TRANSLATE
        </div>
      </section>

      {/* 2.5 The System: Blueprint Graphic */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-[#080808]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="order-2 md:order-1 space-y-8">
              <div className="inline-block border border-[#d4af37] text-[#d4af37] px-4 py-1 text-xs font-mono uppercase tracking-widest mb-4 rounded-full">
                {t.system.tag}
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                {t.system.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                {t.system.desc}
              </p>
              <div className="grid gap-6 pt-6">
                {t.system.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-5 p-4 border-b border-white/10 hover:border-[#d4af37] transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all">
                      {i === 0 ? <Layers size={20} /> : i === 1 ? <Cpu size={20} /> : <Anchor size={20} />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1 group-hover:text-[#d4af37] transition-colors">{point.title}</h4>
                      <p className="text-sm text-gray-500">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           
           {/* Mockup Graphic Area: Blueprint Style */}
           <div className="order-1 md:order-2 h-[500px] bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden group">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              {/* Image with Blue Tint */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto=format&fit=crop')] bg-cover opacity-40 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"></div>
              
              <div className="relative z-10 border-2 border-[#d4af37] p-8 bg-black/80 backdrop-blur-md max-w-xs text-center">
                <p className="text-[#d4af37] font-mono text-xs mb-2">SYSTEM in COFFEE</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">{/*텍스트 추가*/}</p>
              </div>
           </div>
        </div>
      </section>


      {/* 3. Core Features: Dark Cards */}
      <section className="py-32 bg-[#0a0a0a] border-y border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_#1a1a1a_0%,_#000000_60%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-white/30 text-sm font-mono uppercase tracking-[0.3em]">Core Competency</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mt-6">{t.features.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {t.features.cards.map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="relative p-10 bg-[#0f0f0f] border border-white/5 hover:border-[#d4af37] transition-all duration-500 group flex flex-col h-full overflow-hidden"
              >
                {/* Background Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                    <div className="w-14 h-14 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 group-hover:border-[#d4af37] transition-colors">
                        {i === 0 && <Cpu className="w-6 h-6 text-white group-hover:text-[#d4af37]" />}
                        {i === 1 && <CloudRain className="w-6 h-6 text-white group-hover:text-[#d4af37]" />}
                        {i === 2 && <Fingerprint className="w-6 h-6 text-white group-hover:text-[#d4af37]" />}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-10 flex-grow font-light">
                    {card.desc}
                    </p>
                    
                    <Link href={i === 0 || i === 1 ? "/tech" : "/curation"} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white border-b border-transparent hover:border-[#d4af37] pb-1 transition-all">
                    {card.link} <ArrowRight size={12} />
                    </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. Dual CTA: Impactful Split */}
      <section className="h-[70vh] flex flex-col md:flex-row">
        
        {/* Left: Consumer */}
        <Link href="/menu" className="group w-full md:w-1/2 bg-[#111] relative overflow-hidden flex flex-col items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/10">
          {/* Background Image Effect */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2561&auto=format&fit=crop')] bg-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 grayscale"></div>
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-5xl font-serif text-white mb-6 group-hover:translate-y-[-5px] transition-transform">{t.cta.b2c.title}</h3>
            <p className="text-gray-300 mb-10 whitespace-pre-line text-lg font-light">{t.cta.b2c.desc}</p>
            <span className="inline-block px-8 py-4 border border-white text-white text-xs uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all duration-300">
              {t.cta.b2c.btn}
            </span>
          </div>
        </Link>

        {/* Right: Business */}
        <Link href="/partner" className="group w-full md:w-1/2 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center p-12">
           {/* Background Video/Image Effect */}
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop')] bg-cover opacity-10 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 grayscale"></div>
           
           <div className="relative z-10 text-center">
            <h3 className="text-5xl font-serif text-white mb-6 group-hover:translate-y-[-5px] transition-transform">{t.cta.b2b.title}</h3>
            <p className="text-gray-400 mb-10 whitespace-pre-line text-lg font-light">{t.cta.b2b.desc}</p>
            <span className="inline-block px-8 py-4 bg-[#d4af37] text-black text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 font-bold">
              {t.cta.b2b.btn}
            </span>
          </div>
        </Link>
        
      </section>

    </main>
  );
}