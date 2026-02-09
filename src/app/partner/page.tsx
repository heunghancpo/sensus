'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { clsx } from 'clsx';

// 협업 유형 정의
const PARTNER_TYPES = [
  { id: 'wholesale', label: 'Bean Wholesale', desc: '원두 납품 및 정기 구독' },
  { id: 'tech', label: 'Tech Solution', desc: '결점두 선별기/로스팅 솔루션 도입' },
  { id: 'franchise', label: 'Space & Franchise', desc: '가맹 및 공간 컨설팅' },
  { id: 'invest', label: 'Investment', desc: '투자 및 IR 관련' },
];

export default function PartnerPage() {
  const [selectedType, setSelectedType] = useState(PARTNER_TYPES[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // API 호출 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-20 bg-[#050505] flex flex-col md:flex-row">
      
      {/* Left Column: Context & Process (Information) */}
      <section className="w-full md:w-5/12 p-8 md:p-20 border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_#1a1a1a_0%,_#050505_60%)] -z-10"></div>

        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest block mb-4">
              Partnership
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Let’s Brew<br/>
              <span className="italic text-gray-500">The Future.</span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Sensus는 단순한 거래처가 아닌, 
              기술과 맛의 기준을 함께 만들어갈 파트너를 기다립니다.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-8 hidden md:block">
            <h3 className="text-xs text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6">
              Working Process
            </h3>
            {[
              { step: '01', title: 'Inquiry', desc: '파트너십 유형 선택 및 문의 접수' },
              { step: '02', title: 'Consultation', desc: '담당자 배정 및 1:1 맞춤 상담 (온/오프라인)' },
              { step: '03', title: 'PoC / Sample', desc: '샘플 테스트 및 기술 검증 (Proof of Concept)' },
              { step: '04', title: 'Launch', desc: '계약 체결 및 온보딩 솔루션 제공' },
            ].map((proc, i) => (
              <motion.div 
                key={proc.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex gap-4 group"
              >
                <span className="font-mono text-[#d4af37] text-sm pt-1">{proc.step}</span>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1 group-hover:text-[#d4af37] transition-colors">
                    {proc.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{proc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Info Footer */}
        <div className="mt-12 md:mt-0 pt-8 border-t border-white/10 text-xs text-gray-500 space-y-2 font-mono">
          <div className="flex items-center gap-2">
            <Mail size={14} /> partner@sensus.com
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} /> +82 02-1234-5678 (B2B Team)
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> Seoul, Yeouido Park-One 22F
          </div>
        </div>
      </section>


      {/* Right Column: Interactive Form */}
      <section className="w-full md:w-7/12 p-8 md:p-20 bg-[#0a0a0a] flex items-center">
        <div className="w-full max-w-xl mx-auto">
          
          {isSent ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="text-center py-20 bg-[#111] border border-[#d4af37]/30 rounded-sm"
            >
              <CheckCircle2 className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
              <h2 className="text-2xl font-serif text-white mb-2">Inquiry Sent</h2>
              <p className="text-gray-400 text-sm mb-8">
                문의가 성공적으로 접수되었습니다.<br/>
                영업일 기준 24시간 이내에 담당자가 연락드리겠습니다.
              </p>
              <button 
                onClick={() => setIsSent(false)}
                className="text-xs text-gray-500 underline hover:text-white"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. Partnership Type Selection */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
                  01. Interest Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PARTNER_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={clsx(
                        "p-4 text-left border transition-all duration-300 rounded-sm",
                        selectedType === type.id
                          ? "bg-[#d4af37] border-[#d4af37] text-black"
                          : "bg-[#111] border-white/10 text-gray-400 hover:border-white/30"
                      )}
                    >
                      <div className="font-bold text-sm mb-1">{type.label}</div>
                      <div className={clsx("text-xs", selectedType === type.id ? "text-black/70" : "text-gray-600")}>
                        {type.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Basic Info */}
              <div className="space-y-6">
                 <label className="text-xs text-gray-500 uppercase tracking-widest block border-b border-white/10 pb-2">
                  02. Basic Information
                </label>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <input required type="text" placeholder="Company Name" 
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors" 
                    />
                  </div>
                  <div className="group">
                    <input required type="text" placeholder="Contact Person" 
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors" 
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <input required type="email" placeholder="Email Address" 
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors" 
                    />
                  </div>
                  <div className="group">
                    <input required type="tel" placeholder="Phone Number" 
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors" 
                    />
                  </div>
                </div>
              </div>

              {/* 3. Details */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-4 border-b border-white/10 pb-2">
                  03. Message
                </label>
                <textarea 
                  rows={4} 
                  placeholder="예상 물량, 현재 운영 현황, 혹은 궁금하신 점을 자유롭게 적어주세요."
                  className="w-full bg-[#111] border border-white/10 p-4 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors rounded-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold uppercase py-4 hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Processing...
                  </>
                ) : (
                  <>
                    Send Inquiry <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-600 text-center">
                제출해주신 정보는 파트너십 검토 목적으로만 사용되며, 
                <a href="#" className="underline hover:text-gray-400 ml-1">개인정보처리방침</a>에 따라 보호됩니다.
              </p>
            </form>
          )}
        </div>
      </section>

    </main>
  );
}