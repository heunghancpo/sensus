'use client';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Factory, BarChart3, Users } from 'lucide-react';

export default function BusinessPage() {
  return (
    <main className="pt-20 min-h-screen bg-[#050505]">
      
      {/* 1. Header: 확장성 강조 */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-[#d4af37] text-xs font-mono uppercase tracking-widest mb-4"
        >
          Scalable Business Model
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-serif text-white mb-8"
        >
          From a Cafe<br/>to a <span className="text-gray-600 italic">Coffee System.</span>
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Sensus는 단순한 F&B 브랜드가 아닙니다. <br/>
          검증된 맛의 기준을 하드웨어와 소프트웨어로 확장하여 커피 산업의 새로운 표준을 제안합니다.
        </p>
      </section>

      {/* 2. Solutions Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Solution A: Wholesale */}
        <div className="bg-[#111] border border-white/5 p-8 hover:border-[#d4af37] transition-all group">
          <Factory className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />
          <h3 className="text-2xl text-white font-serif mb-4">Bean Wholesale</h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            데이터 기반 로스팅으로 편차 없는 원두를 공급합니다.
            카페 운영자가 '맛'에 대한 고민 없이 '접객'에만 집중할 수 있도록 돕습니다.
          </p>
          <ul className="space-y-3 mb-8">
            {['House Blend 공급', 'Guest Bean 큐레이션', '추출 레시피 가이드 제공'].map(item => (
              <li key={item} className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Solution B: Tech Module */}
        <div className="bg-[#111] border border-white/5 p-8 hover:border-[#d4af37] transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#d4af37] text-black text-[10px] font-bold px-3 py-1">CORE TECH</div>
          <BarChart3 className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />
          <h3 className="text-2xl text-white font-serif mb-4">Defect Scouter</h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            자체 개발한 결점두 선별 모듈(H-Vision)을 로스터리 카페에 판매합니다.
            소규모 로스터리도 대기업 수준의 품질 관리가 가능해집니다.
          </p>
          <ul className="space-y-3 mb-8">
            {['99.9% 결점두 제거', '시간당 5kg 처리 속도', '클라우드 데이터 연동'].map(item => (
              <li key={item} className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Solution C: Consulting */}
        <div className="bg-[#111] border border-white/5 p-8 hover:border-[#d4af37] transition-all group">
          <Users className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />
          <h3 className="text-2xl text-white font-serif mb-4">Space Consulting</h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            '조용한 기술'이 녹아든 공간을 설계합니다.
            동선 효율화부터 AI 추천 시스템 도입까지, Tech-driven 카페 창업을 지원합니다.
          </p>
          <ul className="space-y-3 mb-8">
            {['시스템 동선 설계', 'AI 키오스크 솔루션', '브랜드 아이덴티티 구축'].map(item => (
              <li key={item} className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Inquiry Form (IR Call to Action) */}
      <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-white mb-6">Partner with Sensus</h2>
          <p className="text-gray-400 mb-12">
            커피 산업의 미래를 함께 만들 파트너를 찾습니다.<br/>
            B2B 납품 및 투자 관련 문의는 아래로 연락주세요.
          </p>
          
          <form className="max-w-md mx-auto space-y-4 text-left">
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Company / Name</label>
              <input type="text" className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-[#d4af37] outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Inquiry Type</label>
              <select className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-[#d4af37] outline-none transition-colors">
                <option>Bean Wholesale (원두 납품)</option>
                <option>Tech Solution (장비 도입)</option>
                <option>Investment (투자 관련)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Message</label>
              <textarea rows={4} className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-[#d4af37] outline-none transition-colors"></textarea>
            </div>
            <button type="button" className="w-full bg-[#d4af37] text-black font-bold uppercase py-4 hover:bg-white transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}