'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, CloudRain, Fingerprint, ChevronDown } from 'lucide-react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-[#e0e0e0] overflow-x-hidden">
      
      {/* 1. Hero Section: Brand Identity */}
      <section className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] z-0" />
        
        {/* Animated Background Lines (Tech feel) */}
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
              The Logic of Taste
            </p>
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tighter mb-6">
              SENSUS
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              감각(Sense)을 데이터로 읽고,<br className="md:hidden" /> 기술(Tech)로 완벽함을 증명합니다.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 z-10 animate-bounce text-gray-500"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>


      {/* 2. Philosophy Section: Why Sensus? */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8 text-white">
              We don't create taste.<br/>
              <span className="text-[#d4af37] italic">We preserve it.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-gray-400 leading-relaxed text-lg"
          >
            <p>
              커피의 맛은 수천 가지 변수에 의해 흔들립니다.
              날씨, 습도, 로스터의 컨디션, 그리고 추출되는 순간의 분위기까지.
            </p>
            <p>
              <strong className="text-white">SENSUS</strong>는 이 '흔들림'을 줄이는 쪽을 선택했습니다.
              전 세계의 스페셜티 원두를 AI 기술로 선별하고, 
              환경 변수를 통제하여 언제나 의도된 완벽한 한 잔을 제공합니다.
            </p>
          </motion.div>
        </div>
      </section>


      {/* 3. Core Features (Card Grid) */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest">Core Competency</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-4">Invisible Tech, Visible Taste</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-[#111] border border-white/5 hover:border-[#d4af37] transition-all group"
            >
              <Cpu className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-4">Quiet Tech</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                사람이 놓칠 수 있는 미세한 결점두를 딥러닝 알고리즘이 99.9% 선별합니다. 
                우리의 기술은 드러나지 않고 맛 뒤에 숨어있습니다.
              </p>
              <Link href="/tech" className="text-xs uppercase tracking-widest text-white flex items-center gap-2 group-hover:text-[#d4af37]">
                View Technology <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-[#111] border border-white/5 hover:border-[#d4af37] transition-all group"
            >
              <CloudRain className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-4">Weather-Aware</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                오늘의 기온과 습도를 분석해 로스팅 프로파일을 실시간으로 보정합니다.
                환경이 변해도 당신이 사랑하는 맛은 변하지 않습니다.
              </p>
              <Link href="/tech" className="text-xs uppercase tracking-widest text-white flex items-center gap-2 group-hover:text-[#d4af37]">
                See Data <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-[#111] border border-white/5 hover:border-[#d4af37] transition-all group"
            >
              <Fingerprint className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-4">Personalized</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                당신의 기분, 날씨, 그리고 선호하는 색채를 분석하여
                가장 완벽한 원두와 추출 방식을 제안하는 공감각적 큐레이션.
              </p>
              <Link href="/curation" className="text-xs uppercase tracking-widest text-white flex items-center gap-2 group-hover:text-[#d4af37]">
                Start Curation <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 4. Dual CTA: B2C & B2B */}
      <section className="min-h-[60vh] flex flex-col md:flex-row">
        
        {/* Left: Consumer (Menu) */}
        <Link href="/menu" className="group w-full md:w-1/2 bg-[#111] relative overflow-hidden flex flex-col items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/10 hover:bg-[#161616] transition-colors">
          <div className="text-center z-10">
            <h3 className="text-4xl font-serif text-white mb-4 group-hover:scale-105 transition-transform">Experience</h3>
            <p className="text-gray-400 mb-8">센서스가 제안하는<br/>커피와 공간의 미학</p>
            <span className="inline-flex items-center gap-2 text-[#d4af37] text-xs uppercase tracking-widest">
              View Menu <ArrowRight size={16} />
            </span>
          </div>
          {/* Decorative Circle */}
          <div className="absolute w-64 h-64 rounded-full border border-white/5 group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
        </Link>

        {/* Right: Business (Partner) */}
        <Link href="/partner" className="group w-full md:w-1/2 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center p-12 hover:bg-[#0a0a0a] transition-colors">
           <div className="text-center z-10">
            <h3 className="text-4xl font-serif text-white mb-4 group-hover:scale-105 transition-transform">Partnership</h3>
            <p className="text-gray-400 mb-8">기술 기반 로스팅 솔루션과<br/>비즈니스 협업</p>
            <span className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-widest group-hover:text-[#d4af37] transition-colors">
              Business Inquiry <ArrowRight size={16} />
            </span>
          </div>
          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </Link>
        
      </section>

    </main>
  );
}