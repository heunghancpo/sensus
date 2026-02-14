'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, CloudRain, Fingerprint, ChevronDown, Droplets } from 'lucide-react';
import { useStore } from '@/store/useStore';

// --- [변경됨] 로컬 이미지 경로 적용 (public 폴더 기준) ---
const IMAGES = {
  heroBg: '/images/hero-bg.jpg',
  sensoryBg: '/images/sensory-bg.jpg',
  milkImg: '/images/milk-pour.jpg',
  expBg: '/images/menu-bg.jpg',
  partBg: '/images/roasting-bg.jpg'
};

const CONTENT = {
  KO: {
    hero: {
      tag: "Tech meets Taste",
      title: "SENSUS",
      catchphrase: "Does Coffee Makes Sense?",
      desc: "공간의 온도, 음악의 선율, 그리고 커피의 향기.\n우리는 당신의 감각이 온전히 깨어나는 순간을 설계합니다.",
    },
    sensory: {
      title: "Awaken Your Senses",
      desc: "커피는 단순한 카페인 섭취가 아닙니다. 혀끝에 닿는 질감, 코를 감싸는 아로마, 그리고 공간을 채우는 공기까지. SENSUS는 이 모든 것이 조화를 이루는 '감각의 경험'을 지향합니다.",
      cards: [
        { title: "Atmosphere", text: "기분과 날씨에 반응하는 공간 무드" },
        { title: "Sound", text: "미각을 방해하지 않는 청각적 큐레이션" },
        { title: "Scent", text: "커피의 향미를 극대화하는 아로마 노트" }
      ]
    },
    philosophy: {
      title: <>We don't create taste.<br/><span className="text-[#d4af37] italic">We preserve it.</span></>,
      paragraphs: [
        "우리는 커피를 새롭게 정의하려 하지 않습니다.\n이미 커피는 충분히 깊고, 잘 해석되어 있다고 생각합니다.",
        "하지만 우리의 감각은\n시간, 공간, 그리고 사람에 따라 결과가 달라집니다.",
        <>우리가 관심을 두는 지점은<br/>그 해석이 얼마나 특별한가가 아니라,<br/><span className="text-[#d4af37] font-bold text-xl md:text-2xl mt-4 block">얼마나 흔들리지 않고 전달되는가입니다.</span></>
      ]
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
    milk: {
      tag: "Local Collaboration",
      title: "Precision in Fluid",
      desc: "완벽한 라떼는 완벽한 우유에서 시작됩니다.\n우리는 '한산'을 비롯한 국내 로컬 목장과 협업하여, 생산 일자와 유지방률이 데이터로 검증된 최상의 밀크 베이스만을 사용합니다.",
      btn: "Our Milk Standard"
    },
    cta: {
      b2c: { title: "Experience", desc: "센서스가 제안하는\n커피와 공간의 미학", btn: "View Menu" },
      b2b: { title: "Partnership", desc: "기술 기반 로스팅 솔루션과\n비즈니스 협업", btn: "Business Inquiry" }
    }
  },
  JP: {
    hero: {
      tag: "Tech meets Taste",
      title: "SENSUS",
      catchphrase: "Does Coffee Makes Sense?",
      desc: "空間の温度、音楽の旋律、そしてコーヒーの香り。\n私たちはあなたの感覚が完全に目覚める瞬間を設計します。",
    },
    sensory: {
      title: "Awaken Your Senses",
      desc: "コーヒーは単なるカフェイン摂取ではありません。舌先に触れる質感、鼻を包むアロマ、そして空間を満たす空気まで。SENSUSはこれらすべてが調和する「感覚の経験」を目指します。",
      cards: [
        { title: "Atmosphere", text: "気分と天気に反応する空間ムード" },
        { title: "Sound", text: "味覚を邪魔しない聴覚的キュレーション" },
        { title: "Scent", text: "コーヒーの風味を最大化するアロマノート" }
      ]
    },
    philosophy: {
      title: <>We don't create taste.<br/><span className="text-[#d4af37] italic">We preserve it.</span></>,
      paragraphs: [
        "私たちはコーヒーを新しく定義しようとはしません。\nすでにコーヒーは十分に深く、よく解釈されていると考えるからです。",
        "しかし、私たちの感覚は\n時間、空間、そして人によって結果が変わります。",
        <>私たちが関心を寄せるのは、その解釈がいかに特別かではなく、<br/><span className="text-[#d4af37] font-bold text-xl md:text-2xl mt-4 block">いかに揺らぐことなく伝わるかなのです。</span></>
      ]
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
    milk: {
      tag: "Local Collaboration",
      title: "Precision in Fluid",
      desc: "完璧なラテは完璧な牛乳から始まります。\n私たちは「ハンサン」をはじめとする国内ローカル牧場と協力し、生産日と乳脂肪率がデータで検証された最上のミルクベースのみを使用します。",
      btn: "Our Milk Standard"
    },
    cta: {
      b2c: { title: "Experience", desc: "Sensusが提案する\nコーヒーと空間の美学", btn: "View Menu" },
      b2b: { title: "Partnership", desc: "技術ベースの焙煎ソリューションと\nビジネス協業", btn: "Business Inquiry" }
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
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-[#e0e0e0] overflow-x-hidden font-sans">
      
      {/* 1. Hero Section */}
      <section className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={IMAGES.heroBg} 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-30 blur-[2px] scale-105" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505]" />
        </div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none"></div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-6 flex flex-col items-center drop-shadow-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-[#d4af37] text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-mono">
              {t.hero.tag}
            </p>
            <h1 className="text-7xl md:text-[10rem] font-serif font-bold text-white tracking-tighter mb-2 leading-none">
              {t.hero.title}
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-serif text-gray-200 italic mb-8"
          >
            {t.hero.catchphrase}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-gray-300 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed whitespace-pre-line"
          >
            {t.hero.desc}
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-12 z-10 animate-bounce text-gray-400"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>


      {/* 2. Sensory Space */}
      <section className="relative py-32 px-6 border-b border-white/5 bg-[#0a0a0a] overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={IMAGES.sensoryBg} 
            alt="Sensory Background" 
            fill 
            className="object-cover opacity-15 blur-md scale-110"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-md"
            >
              {t.sensory.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed break-keep drop-shadow-sm"
            >
              {t.sensory.desc}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.sensory.cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="text-center p-8 border border-white/10 rounded-full aspect-square flex flex-col items-center justify-center hover:border-[#d4af37]/50 transition-colors bg-black/50 backdrop-blur-md group hover:bg-white/5"
              >
                <div className="text-[#d4af37] text-xs font-mono uppercase tracking-widest mb-4 group-hover:text-white transition-colors">0{i+1}</div>
                <h3 className="text-2xl font-serif text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm px-4 break-keep group-hover:text-gray-300 transition-colors">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 3. Philosophy Section */}
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
          
          <div className="space-y-8 text-gray-400 leading-relaxed text-lg">
            {t.philosophy.paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                className="whitespace-pre-line"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>


      {/* 4. Core Features */}
      <section className="py-24 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest">Core Competency</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-4">{t.features.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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


      {/* 5. Milk & Local Collaboration */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full rounded-lg overflow-hidden group border border-white/10"
          >
             <Image 
               src={IMAGES.milkImg} 
               alt="Milk pouring" 
               fill 
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
             
             {/* 아이콘 오버레이 */}
             <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/80">
                <div className="p-2 bg-black/50 backdrop-blur-md rounded-full">
                    <Droplets size={16} />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-mono">Local Farm Direct</span>
             </div>
          </motion.div>

          <div className="space-y-8">
            <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest">
              {t.milk.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              {t.milk.title}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
              {t.milk.desc}
            </p>
            <button className="px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              {t.milk.btn}
            </button>
          </div>
        </div>
      </section>


      {/* 6. Dual CTA */}
      <section className="min-h-[60vh] flex flex-col md:flex-row border-t border-white/10">
        {/* Left: Consumer */}
        <Link href="/menu" className="group w-full md:w-1/2 relative overflow-hidden flex flex-col items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/10">
          <Image 
            src={IMAGES.expBg} 
            alt="Experience Background" 
            fill 
            className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
          
          <div className="relative z-10 text-center drop-shadow-md">
            <h3 className="text-4xl font-serif text-white mb-4 group-hover:text-[#d4af37] transition-colors duration-500">{t.cta.b2c.title}</h3>
            <p className="text-gray-300 mb-8 whitespace-pre-line">{t.cta.b2c.desc}</p>
            <span className="inline-flex items-center gap-2 text-[#d4af37] text-xs uppercase tracking-widest group-hover:text-white transition-colors">
              {t.cta.b2c.btn} <ArrowRight size={16} />
            </span>
          </div>
        </Link>

        {/* Right: Business */}
        <Link href="/partner" className="group w-full md:w-1/2 relative overflow-hidden flex flex-col items-center justify-center p-12">
           <Image 
            src={IMAGES.partBg} 
            alt="Partnership Background" 
            fill 
            className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors" />

           <div className="relative z-10 text-center drop-shadow-md">
            <h3 className="text-4xl font-serif text-white mb-4 group-hover:text-[#d4af37] transition-colors duration-500">{t.cta.b2b.title}</h3>
            <p className="text-gray-300 mb-8 whitespace-pre-line">{t.cta.b2b.desc}</p>
            <span className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-widest group-hover:text-[#d4af37] transition-colors">
              {t.cta.b2b.btn} <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </section>

    </main>
  );
}