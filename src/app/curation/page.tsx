'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudRain, Cloud, Wind, Music, Droplets, Wind as AirIcon, Disc } from 'lucide-react';
import { clsx } from 'clsx';
import { coffeeDB } from '@/data';
import { useStore } from '@/store/useStore';

// --- 데이터 정의 ---

// 1. Mood에 따른 공감각적 매핑 (Music, Scent, Coffee)
const MOOD_MAP: Record<string, { music: string; artist: string; scent: string; scentJP: string; coffeeId: string }> = {
  'Creative': { 
    music: 'Midnight Jazz Club', 
    artist: 'Sensus Original Playlist', 
    scent: 'Fresh Eucalyptus & Lemon',
    scentJP: 'フレッシュユーカリ & レモン',
    coffeeId: 'ethiopia_yirgacheffe' 
  },
  'Melancholy': { 
    music: 'Rainy Day Piano', 
    artist: 'Acoustic Labs', 
    scent: 'Petrichor (Wet Earth)',
    scentJP: 'ペトリコール (雨上がりの土の匂い)',
    coffeeId: 'guatemala_antigua' 
  },
  'Focused': { 
    music: 'Deep Focus Alpha Waves', 
    artist: 'Brain Flow', 
    scent: 'Rosemary & Cedarwood',
    scentJP: 'ローズマリー & シダーウッド',
    coffeeId: 'indonesia_mandheling' 
  },
  'Energetic': { 
    music: 'Upbeat Funk & Soul', 
    artist: 'Groove Collective', 
    scent: 'Orange Blossom & Ginger',
    scentJP: 'オレンジブロッサム & ジンジャー',
    coffeeId: 'costa_rica_tarrazu' 
  },
  'Relaxed': { 
    music: 'Forest Sounds Vol.2', 
    artist: 'Nature Ambience', 
    scent: 'Lavender & Sandalwood',
    scentJP: 'ラベンダー & サンダルウッド',
    coffeeId: 'blue_mountain' 
  },
  'Romantic': { 
    music: 'Late Night R&B', 
    artist: 'Soul Vibes', 
    scent: 'Rose & Vanilla Bean',
    scentJP: 'ローズ & バニラビーンズ',
    coffeeId: 'geisha' 
  }
};

// 2. Color Palette
const COLORS = [
  { 
    hex: '#FF6B6B', mood: 'Passion', flavor: 'Berry & Acidity', 
    desc: '강렬한 에너지와 새로운 영감이 필요할 때',
    descJP: '強烈なエネルギーと新しいインスピレーションが必要な時'
  },
  { 
    hex: '#FFD93D', mood: 'Joy', flavor: 'Citrus & Sweet', 
    desc: '일상의 즐거움과 톡 쏘는 활기를 찾고 싶을 때',
    descJP: '日常の楽しさと弾けるような活気を見つけたい時'
  },
  { 
    hex: '#6BCB77', mood: 'Refresh', flavor: 'Herb & Clean', 
    desc: '복잡한 머릿속을 맑고 깨끗하게 비우고 싶을 때',
    descJP: '複雑な頭の中を澄んだ空気のように空っぽにしたい時'
  },
  { 
    hex: '#4D96FF', mood: 'Calm', flavor: 'Smooth Body', 
    desc: '지친 하루 끝, 차분한 위로와 휴식이 필요할 때',
    descJP: '疲れた一日の終わり、落ち着いた慰めと休息が必要な時'
  },
  { 
    hex: '#2C3E50', mood: 'Deep', flavor: 'Dark Chocolate', 
    desc: '깊은 사색과 온전한 집중이 필요할 때',
    descJP: '深い思索と完全な集中が必要な時'
  },
];

const WEATHER_ICONS = {
  Sunny: Sun,
  Rainy: CloudRain,
  Cloudy: Cloud,
  Windy: Wind,
};

// 3. 다국어 텍스트 리소스
const TEXT = {
  KO: {
    step1: { step: "Step 01. Context", title: "How is the sky today?" },
    step2: { step: "Step 02. Emotion", title: "Define your vibe." },
    step3: { step: "Step 03. Synesthesia", title: "What color tastes like today?", desc: "당신의 감각을 색으로 표현해주세요. 그 색의 맛을 찾아드립니다." },
    analyzing: {
      title: "SENSUS AI AGENT v2.1",
      audio: "Audio Mixing",
      scent: "Scent Blending",
      bean: "Bean Matching",
      processing: "Processing",
      ok: "OK",
      ready: "ALL SYSTEMS READY."
    },
    result: {
      header: "The Atelier Experience",
      vibe: "Your Vibe",
      todaysCup: "Today's Cup",
      pairing: "Pairing Music",
      aroma: "Aroma Note",
      moodSuffix: "Mood",
      recipe: "Brewing Tip",
      recipeDetail: "Hand Drip Extraction",
      orderBtn: "Order This Course",
      restartBtn: "Restart",
      footer: "Tech meets Taste · Sensus Atelier"
    }
  },
  JP: {
    step1: { step: "Step 01. Context", title: "How is the sky today?", desc: "今日の空模様はいかがですか？" }, // 영문 타이틀 유지하되 뉘앙스 전달
    step2: { step: "Step 02. Emotion", title: "Define your vibe.", desc: "今の気分を教えてください。" },
    step3: { step: "Step 03. Synesthesia", title: "What color tastes like today?", desc: "あなたの感覚を色で表現してください。その色の味を見つけます。" },
    analyzing: {
      title: "SENSUS AI AGENT v2.1",
      audio: "Audio Mixing",
      scent: "Scent Blending",
      bean: "Bean Matching",
      processing: "Processing",
      ok: "OK",
      ready: "ALL SYSTEMS READY."
    },
    result: {
      header: "The Atelier Experience",
      vibe: "Your Vibe",
      todaysCup: "Today's Cup",
      pairing: "Pairing Music",
      aroma: "Aroma Note",
      moodSuffix: "Mood",
      recipe: "Brewing Tip",
      recipeDetail: "Hand Drip Extraction",
      orderBtn: "このコースを注文する",
      restartBtn: "最初に戻る",
      footer: "Tech meets Taste · Sensus Atelier"
    }
  }
};

type Step = 'WEATHER' | 'MOOD' | 'COLOR' | 'ANALYZING' | 'RESULT';

export default function CurationPage() {
  const [step, setStep] = useState<Step>('WEATHER');
  const [selection, setSelection] = useState({
    weather: 'Sunny',
    mood: 'Creative',
    color: COLORS[0],
  });

  const { language } = useStore();
  const t = TEXT[language];

  // 배경색 동적 전환
  const bgStyle = {
    background: step === 'RESULT' 
      ? '#0a0a0a' 
      : `radial-gradient(circle at 50% 50%, ${selection.color.hex}20 0%, #050505 70%)`
  };

  const nextStep = (next: Step) => setStep(next);

  useEffect(() => {
    if (step === 'ANALYZING') {
      const timer = setTimeout(() => setStep('RESULT'), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const resultData = MOOD_MAP[selection.mood];
  const matchedCoffee = coffeeDB.find(c => c.id === resultData?.coffeeId) || coffeeDB[0];

  return (
    <main className="min-h-screen pt-20 px-6 transition-colors duration-1000 flex flex-col justify-center" style={bgStyle}>
      <div className="max-w-3xl mx-auto w-full">
        
        {/* Progress Bar */}
        <div className="mb-12 flex gap-2 max-w-xs mx-auto">
          {['WEATHER', 'MOOD', 'COLOR'].map((s, i) => (
            <div key={s} className={clsx(
              "h-1 flex-1 rounded-full transition-all duration-500",
              ['WEATHER', 'MOOD', 'COLOR', 'ANALYZING', 'RESULT'].indexOf(step) >= i ? "bg-[#d4af37]" : "bg-white/10"
            )} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: Weather */}
          {step === 'WEATHER' && (
            <motion.div 
              key="weather"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-xs text-[#d4af37] tracking-widest uppercase mb-4 font-mono">{t.step1.step}</h2>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-12">{t.step1.title}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(WEATHER_ICONS).map(([label, Icon]) => (
                  <button
                    key={label}
                    onClick={() => {
                      setSelection({ ...selection, weather: label });
                      nextStep('MOOD');
                    }}
                    className="p-8 border border-white/10 hover:border-[#d4af37] hover:bg-white/5 transition-all flex flex-col items-center gap-4 group rounded-sm"
                  >
                    <Icon className="w-8 h-8 text-gray-400 group-hover:text-[#d4af37] transition-colors" />
                    <span className="text-sm text-gray-300 font-light">{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Mood */}
          {step === 'MOOD' && (
            <motion.div 
              key="mood"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-xs text-[#d4af37] tracking-widest uppercase mb-4 font-mono">{t.step2.step}</h2>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-12">{t.step2.title}</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {Object.keys(MOOD_MAP).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelection({ ...selection, mood: m });
                      nextStep('COLOR');
                    }}
                    className="py-4 border border-white/10 rounded-full text-sm text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-white/5 transition-all"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Color */}
          {step === 'COLOR' && (
            <motion.div 
              key="color"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-xs text-[#d4af37] tracking-widest uppercase mb-4 font-mono">{t.step3.step}</h2>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">{t.step3.title}</h1>
              <p className="text-gray-500 mb-12 text-sm font-light">{t.step3.desc}</p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onMouseEnter={() => setSelection({ ...selection, color: c })}
                    onClick={() => {
                      setSelection({ ...selection, color: c });
                      nextStep('ANALYZING');
                    }}
                    className="relative w-16 h-16 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-4 ring-offset-black ring-transparent hover:ring-white/50"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span className="sr-only">{c.mood}</span>
                  </button>
                ))}
              </div>
              <div className="h-16 flex flex-col items-center justify-center gap-1">
                <div className="text-sm text-gray-300 font-bold" style={{ color: selection.color.hex }}>
                  ● {selection.color.mood}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'KO' ? selection.color.desc : selection.color.descJP}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Analyzing */}
          {step === 'ANALYZING' && (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-mono text-xs text-[#d4af37] text-left max-w-sm mx-auto bg-black/50 p-8 border border-[#d4af37]/30 rounded-sm shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              <div className="space-y-3">
                <p className="border-b border-[#d4af37]/20 pb-2 mb-4 text-[#d4af37] font-bold">{t.analyzing.title}</p>
                <p>{`> Input.Weather .... ${selection.weather}`}</p>
                <p>{`> Input.Mood ....... ${selection.mood}`}</p>
                <p>{`> Input.Color ...... ${selection.color.hex}`}</p>
                <p className="mt-4 text-white/70 animate-pulse">{`> ${t.analyzing.audio}...... ${t.analyzing.processing}`}</p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className="text-white/70"
                >{`> ${t.analyzing.scent}.... ${t.analyzing.ok}`}</motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                  className="text-white/70"
                >{`> ${t.analyzing.bean}..... ${t.analyzing.ok}`}</motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                  className="text-[#d4af37] mt-4"
                >{`> ${t.analyzing.ready}`}</motion.p>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Result */}
          {step === 'RESULT' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative max-w-md mx-auto bg-[#fffbf0] text-black p-8 shadow-2xl rotate-1 rounded-sm"
            >
              <div className="absolute top-0 left-0 w-full h-4 bg-[#0a0a0a]" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>

              <div className="text-center border-b-2 border-dashed border-black/10 pb-6 mb-6 pt-4">
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center font-serif italic">S</div>
                </div>
                <h2 className="font-serif text-2xl mb-1">CURATION #0251</h2>
                <p className="font-mono text-[10px] uppercase text-gray-500 tracking-wider">{t.result.header}</p>
                <div className="mt-2 text-[10px] font-mono text-gray-400">
                  {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 bg-black/5 p-3 rounded text-xs font-mono">
                <span className="text-gray-500">{t.result.vibe}</span>
                <span className="font-bold">{selection.weather} &middot; {selection.mood} &middot; {selection.color.mood}</span>
              </div>

              {/* Coffee Card */}
              <div className="bg-black text-[#fffbf0] p-6 mb-6 text-center relative overflow-hidden group">
                <div className="absolute inset-0 border border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-2 text-[#d4af37]">{t.result.todaysCup}</p>
                <h3 className="text-2xl font-serif mb-2">{matchedCoffee.name}</h3>
                <p className="text-[10px] text-gray-400 mb-4">{matchedCoffee.subName}</p>
                <p className="text-xs text-gray-300 leading-relaxed font-light px-2 break-keep">
                  {language === 'KO' ? matchedCoffee.description : matchedCoffee.descriptionJP}
                </p>
              </div>

              {/* Sensory Pairing */}
              <div className="grid grid-cols-1 gap-0 border-t-2 border-dashed border-black/10">
                <div className="py-4 flex items-center gap-4 border-b border-dashed border-black/10">
                  <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                    <Disc className="w-5 h-5 text-gray-700 animate-[spin_4s_linear_infinite]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-0.5">{t.result.pairing}</span>
                    <span className="block text-sm font-serif font-bold">{resultData.music}</span>
                    <span className="text-[10px] text-gray-500">{resultData.artist}</span>
                  </div>
                </div>

                <div className="py-4 flex items-center gap-4 border-b border-dashed border-black/10">
                  <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                    <AirIcon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-0.5">{t.result.aroma}</span>
                    {/* 향 정보 다국어 처리 */}
                    <span className="block text-sm font-serif font-bold">{language === 'KO' ? resultData.scent : resultData.scentJP}</span>
                    <span className="text-[10px] text-gray-500">For {selection.mood} {t.result.moodSuffix}</span>
                  </div>
                </div>

                <div className="py-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-0.5">{t.result.recipe}</span>
                    <span className="block text-sm font-serif font-bold">93°C Water / Ratio 1:16</span>
                    <span className="text-[10px] text-gray-500">{t.result.recipeDetail}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button className="w-full py-3 bg-black text-[#d4af37] text-xs font-bold uppercase tracking-widest hover:bg-[#222] transition-colors">
                  {t.result.orderBtn}
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full py-3 border border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-black/5 transition-colors"
                >
                  {t.result.restartBtn}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="font-mono text-[9px] text-gray-400 uppercase">{t.result.footer}</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}