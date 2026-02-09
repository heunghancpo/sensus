'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudRain, Cloud, Wind, RefreshCw, CheckCircle2, Music, Droplets } from 'lucide-react';
import { clsx } from 'clsx';

// --- 데이터 정의 ---
const COLORS = [
  { hex: '#FF6B6B', mood: 'Passion', flavor: 'Berry & Acidity' }, // Red -> 산미
  { hex: '#FFD93D', mood: 'Joy', flavor: 'Citrus & Sweet' },      // Yellow -> 단맛
  { hex: '#6BCB77', mood: 'Refresh', flavor: 'Herb & Clean' },     // Green -> 클린컵
  { hex: '#4D96FF', mood: 'Calm', flavor: 'Smooth Body' },         // Blue -> 바디감
  { hex: '#2C3E50', mood: 'Deep', flavor: 'Dark Chocolate' },      // Dark -> 쓴맛/중후함
];

const WEATHER_ICONS = {
  Sunny: Sun,
  Rainy: CloudRain,
  Cloudy: Cloud,
  Windy: Wind,
};

type Step = 'WEATHER' | 'MOOD' | 'COLOR' | 'ANALYZING' | 'RESULT';

export default function CurationPage() {
  const [step, setStep] = useState<Step>('WEATHER');
  const [selection, setSelection] = useState({
    weather: 'Sunny',
    mood: '',
    color: COLORS[0],
  });

  // 색상 선택 시 배경 분위기 전환 효과
  const bgStyle = {
    background: `radial-gradient(circle at 50% 50%, ${selection.color.hex}20 0%, #050505 70%)`
  };

  const nextStep = (next: Step) => setStep(next);

  // 분석 시뮬레이션
  useEffect(() => {
    if (step === 'ANALYZING') {
      const timer = setTimeout(() => setStep('RESULT'), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <main className="min-h-screen pt-20 px-6 transition-colors duration-1000" style={bgStyle}>
      <div className="max-w-3xl mx-auto h-[80vh] flex flex-col justify-center">
        
        {/* Progress Bar */}
        <div className="mb-12 flex gap-2">
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
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h2 className="text-sm text-[#d4af37] tracking-widest uppercase mb-4">Step 01. Context</h2>
              <h1 className="text-4xl font-serif text-white mb-12">How is the sky today?</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(WEATHER_ICONS).map(([label, Icon]) => (
                  <button
                    key={label}
                    onClick={() => {
                      setSelection({ ...selection, weather: label });
                      nextStep('MOOD');
                    }}
                    className="p-6 border border-white/10 hover:border-[#d4af37] hover:bg-white/5 transition-all flex flex-col items-center gap-4 group"
                  >
                    <Icon className="w-8 h-8 text-gray-400 group-hover:text-[#d4af37]" />
                    <span className="text-sm text-gray-300">{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Mood */}
          {step === 'MOOD' && (
            <motion.div 
              key="mood"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h2 className="text-sm text-[#d4af37] tracking-widest uppercase mb-4">Step 02. Emotion</h2>
              <h1 className="text-4xl font-serif text-white mb-12">Define your vibe.</h1>
              <div className="flex flex-wrap justify-center gap-3">
                {['Creative', 'Melancholy', 'Focused', 'Energetic', 'Relaxed', 'Romantic'].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelection({ ...selection, mood: m });
                      nextStep('COLOR');
                    }}
                    className="px-6 py-3 border border-white/10 rounded-full text-sm text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Color (Synesthesia) */}
          {step === 'COLOR' && (
            <motion.div 
              key="color"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h2 className="text-sm text-[#d4af37] tracking-widest uppercase mb-4">Step 03. Synesthesia</h2>
              <h1 className="text-4xl font-serif text-white mb-8">What color tastes like today?</h1>
              <p className="text-gray-500 mb-12 text-sm">당신이 생각하는 색깔을 선택하면, 그 색의 맛을 찾아드립니다.</p>
              
              <div className="flex justify-center gap-6">
                {COLORS.map((c) => (
                  <button
                    key={c.hex}
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
              <div className="mt-8 text-sm text-gray-400 font-mono">
                Selected: <span style={{ color: selection.color.hex }}>{selection.color.mood}</span>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Analyzing (Terminal Effect) */}
          {step === 'ANALYZING' && (
            <motion.div 
              key="analyzing"
              className="font-mono text-xs text-[#d4af37] text-left max-w-sm mx-auto bg-black/50 p-6 border border-[#d4af37]/30 rounded"
            >
              <p className="mb-2">{`> Input.Weather: ${selection.weather}`}</p>
              <p className="mb-2">{`> Input.Mood: ${selection.mood}`}</p>
              <p className="mb-2">{`> Input.Color: ${selection.color.hex} (${selection.color.flavor})`}</p>
              <p className="mb-2 animate-pulse">{`> Running Inference Model...`}</p>
              <p className="mb-2 opacity-50">{`> Matching Bean Database... OK`}</p>
              <p className="mb-2 opacity-50">{`> Adjusting Extraction Recipe... OK`}</p>
            </motion.div>
          )}

          {/* STEP 5: Result (Receipt Design) */}
          {step === 'RESULT' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-md mx-auto bg-[#fffbf0] text-black p-8 shadow-2xl rotate-1"
            >
              {/* 구멍 뚫린 효과 */}
              <div className="absolute top-0 left-0 w-full h-4 bg-[#050505]" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>

              <div className="text-center border-b-2 border-dashed border-black/20 pb-6 mb-6 pt-4">
                <h2 className="font-serif text-3xl mb-2">CURATION #0251</h2>
                <p className="font-mono text-xs uppercase text-gray-500">Sensus AI System</p>
              </div>

              <div className="space-y-4 mb-8 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Condition</span>
                  <span className="font-bold">{selection.weather} / {selection.mood}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Color Profile</span>
                  <span className="font-bold" style={{ color: selection.color.hex }}>■ {selection.color.flavor}</span>
                </div>
              </div>

              <div className="bg-black text-[#fffbf0] p-6 mb-6 text-center">
                <p className="text-xs uppercase tracking-widest mb-2 text-[#d4af37]">Best Match</p>
                <h3 className="text-2xl font-serif">Ethiopia Yirgacheffe</h3>
                <p className="text-xs text-gray-400 mt-2">Light Roast / Drip</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t-2 border-dashed border-black/20 pt-6">
                <div className="flex items-start gap-2">
                  <Music className="w-4 h-4" />
                  <div>
                    <span className="block font-bold mb-1">Pairing Music</span>
                    <span className="text-gray-600">Jazz Vibes Vol.4<br/>(Track 03)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Droplets className="w-4 h-4" />
                  <div>
                    <span className="block font-bold mb-1">Brewing Tip</span>
                    <span className="text-gray-600">93°C Water<br/>Ratio 1:16</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full mt-8 py-3 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Save as Image
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}