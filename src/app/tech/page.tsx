'use client';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { time: '10:00', humidity: 45, profile: 210 },
  { time: '11:00', humidity: 48, profile: 208 },
  { time: '12:00', humidity: 55, profile: 205 },
  { time: '13:00', humidity: 60, profile: 204 },
  { time: '14:00', humidity: 58, profile: 206 },
  { time: '15:00', humidity: 50, profile: 209 },
];

export default function TechPage() {
  return (
    <main className="pt-20 min-h-screen">
      {/* 1. Hero: Vision */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif text-white mb-8"
        >
          Invisible Tech,<br />
          <span className="text-[#d4af37] italic">Visible Taste.</span>
        </motion.h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          우리는 맛을 창조하지 않습니다. 변수를 통제할 뿐입니다.<br/>
          사람이 놓칠 수 있는 0.01%의 오차를 기술로 보정하여<br/>
          가장 완벽한 기준(Baseline)을 유지합니다.
        </p>
      </section>

      {/* 2. Defect Control System (B2B Product) */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#d4af37] text-xs font-mono uppercase mb-4">Proprietary Technology</div>
            <h2 className="text-4xl font-serif mb-6">Deep Learning<br/>Defect Control</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              자체 개발한 CNN 기반 이미지 처리 알고리즘이 초당 500개의 원두를 스캔합니다.
              곰팡이, 벌레 먹은 자국, 미성숙두 등 맛에 부정적인 영향을 주는 결점두를 
              <strong>99.9%의 정확도</strong>로 선별합니다.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="text-3xl font-bold text-white mb-2">99.9<span className="text-sm text-[#d4af37]">%</span></div>
                <div className="text-xs text-gray-500 uppercase">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">0.05<span className="text-sm text-[#d4af37]">s</span></div>
                <div className="text-xs text-gray-500 uppercase">Processing Time</div>
              </div>
            </div>
          </div>
          
          {/* Mock Visualization */}
          <div className="relative h-[400px] bg-black border border-white/10 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552346988-7521c70e0600?q=80&w=2940&auto=format&fit=crop')] bg-cover opacity-20 grayscale"></div>
            <div className="relative z-10 w-64 h-64 border-2 border-[#d4af37] rounded-lg animate-pulse flex items-center justify-center">
              <span className="text-[#d4af37] font-mono text-xs bg-black px-2">SCANNING...</span>
              <div className="absolute top-0 left-0 w-full h-1 bg-[#d4af37] shadow-[0_0_15px_#d4af37] animate-[scan_2s_linear_infinite]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Weather-Aware Roasting */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 h-[300px] w-full bg-white/5 rounded-lg p-6">
            <h3 className="text-xs text-gray-400 uppercase mb-4 font-mono">Real-time Calibration (Yeouido HQ)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorProfile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#555" fontSize={12} tickLine={false} />
                <YAxis stroke="#555" fontSize={12} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                  itemStyle={{ color: '#d4af37' }}
                />
                <Area type="monotone" dataKey="profile" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorProfile)" />
                <Line type="monotone" dataKey="humidity" stroke="#4a55ff" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4 justify-center text-xs">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#d4af37]"></div>Roast Temp</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#4a55ff]"></div>Humidity</div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="text-[#4a55ff] text-xs font-mono uppercase mb-4">Adaptive Algorithm</div>
            <h2 className="text-4xl font-serif mb-6">Weather-Aware<br/>Roasting</h2>
            <p className="text-gray-400 leading-relaxed">
              로스팅은 오늘을 위한 작업이 아니라, 커피가 소비될 3일 뒤를 준비하는 과정입니다.
              기상청 API와 연동된 로스팅 프로파일러가 기온, 습도, 기압 변화를 예측하여
              배기량과 투입 온도를 미세하게 자동 보정합니다.
              <br/><br/>
              비 오는 날에도, 맑은 날에도 당신의 커피 맛은 변하지 않습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}