'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '@/store/useStore';

const TEXT = {
  KO: {
    hero: {
      tag: "Partnership",
      title: <>Let’s Brew<br/><span className="italic text-gray-500">The Future.</span></>,
      desc: "Sensus는 단순한 거래처가 아닌, 기술과 맛의 기준을 함께 만들어갈 파트너를 기다립니다."
    },
    process: {
      title: "Working Process",
      steps: [
        { step: '01', title: 'Inquiry', desc: '파트너십 유형 선택 및 문의 접수' },
        { step: '02', title: 'Consultation', desc: '담당자 배정 및 1:1 맞춤 상담' },
        { step: '03', title: 'PoC / Sample', desc: '샘플 테스트 및 기술 검증' },
        { step: '04', title: 'Launch', desc: '계약 체결 및 온보딩 솔루션 제공' },
      ]
    },
    form: {
      types: [
        { id: 'wholesale', label: 'Bean Wholesale', desc: '원두 납품 및 정기 구독' },
        { id: 'tech', label: 'Tech Solution', desc: '결점두 선별기/로스팅 솔루션' },
        { id: 'franchise', label: 'Space & Franchise', desc: '가맹 및 공간 컨설팅' },
        { id: 'invest', label: 'Investment', desc: '투자 및 IR 관련' },
      ],
      labels: {
        step1: "01. Interest Type",
        step2: "02. Basic Information",
        step3: "03. Message",
        company: "Company Name",
        name: "Contact Person",
        email: "Email Address",
        phone: "Phone Number",
        msgPlaceholder: "예상 물량, 현재 운영 현황, 혹은 궁금하신 점을 자유롭게 적어주세요.",
        submit: "Send Inquiry",
        privacy: "제출해주신 정보는 파트너십 검토 목적으로만 사용되며, 개인정보처리방침에 따라 보호됩니다."
      }
    }
  },
  JP: {
    hero: {
      tag: "Partnership",
      title: <>Let’s Brew<br/><span className="italic text-gray-500">The Future.</span></>,
      desc: "Sensusは単なる取引先ではなく、技術と味の基準を共に作り上げていくパートナーをお待ちしています。"
    },
    process: {
      title: "Working Process",
      steps: [
        { step: '01', title: 'Inquiry', desc: 'パートナーシップ類型の選択および問い合わせ' },
        { step: '02', title: 'Consultation', desc: '担当者配属および1:1カスタマイズ相談' },
        { step: '03', title: 'PoC / Sample', desc: 'サンプルテストおよび技術検証' },
        { step: '04', title: 'Launch', desc: '契約締結およびオンボーディングソリューション提供' },
      ]
    },
    form: {
      types: [
        { id: 'wholesale', label: 'Bean Wholesale', desc: '豆の納品および定期購読' },
        { id: 'tech', label: 'Tech Solution', desc: '欠点豆選別機/焙煎ソリューション' },
        { id: 'franchise', label: 'Space & Franchise', desc: '加盟および空間コンサルティング' },
        { id: 'invest', label: 'Investment', desc: '投資およびIR関連' },
      ],
      labels: {
        step1: "01. Interest Type",
        step2: "02. Basic Information",
        step3: "03. Message",
        company: "会社名",
        name: "担当者名",
        email: "メールアドレス",
        phone: "電話番号",
        msgPlaceholder: "予想数量、現在の運営状況、またはご質問を自由にご記入ください。",
        submit: "Send Inquiry",
        privacy: "提出された情報はパートナーシップ検討の目的でのみ使用され、個人情報処理方針に従って保護されます。"
      }
    }
  }
};

export default function PartnerPage() {
  const { language } = useStore();
  const t = TEXT[language];
  const [selectedType, setSelectedType] = useState(t.form.types[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-20 bg-[#050505] flex flex-col md:flex-row">
      
      {/* Left Column */}
      <section className="w-full md:w-5/12 p-8 md:p-20 border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_#1a1a1a_0%,_#050505_60%)] -z-10"></div>

        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest block mb-4">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t.hero.desc}
            </p>
          </motion.div>

          <div className="space-y-8 hidden md:block">
            <h3 className="text-xs text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6">
              {t.process.title}
            </h3>
            {t.process.steps.map((proc, i) => (
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

        <div className="mt-12 md:mt-0 pt-8 border-t border-white/10 text-xs text-gray-500 space-y-2 font-mono">
          <div className="flex items-center gap-2"><Mail size={14} /> partner@sensus.com</div>
          <div className="flex items-center gap-2"><Phone size={14} /> +82 02-1234-5678 (B2B Team)</div>
          <div className="flex items-center gap-2"><MapPin size={14} /> Seoul, Yeouido Park-One 22F</div>
        </div>
      </section>

      {/* Right Column: Form */}
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
                {language === 'KO' ? "문의가 성공적으로 접수되었습니다." : "お問い合わせが正常に受け付けられました。"}
              </p>
              <button onClick={() => setIsSent(false)} className="text-xs text-gray-500 underline hover:text-white">
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-4">{t.form.labels.step1}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {t.form.types.map((type) => (
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
                      <div className={clsx("text-xs", selectedType === type.id ? "text-black/70" : "text-gray-600")}>{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                 <label className="text-xs text-gray-500 uppercase tracking-widest block border-b border-white/10 pb-2">{t.form.labels.step2}</label>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group"><input required type="text" placeholder={t.form.labels.company} className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors" /></div>
                  <div className="group"><input required type="text" placeholder={t.form.labels.name} className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group"><input required type="email" placeholder={t.form.labels.email} className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors" /></div>
                  <div className="group"><input required type="tel" placeholder={t.form.labels.phone} className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors" /></div>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-4 border-b border-white/10 pb-2">{t.form.labels.step3}</label>
                <textarea rows={4} placeholder={t.form.labels.msgPlaceholder} className="w-full bg-[#111] border border-white/10 p-4 text-white placeholder-gray-600 focus:border-[#d4af37] outline-none transition-colors rounded-sm"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black font-bold uppercase py-4 hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : <>{t.form.labels.submit} <ArrowRight size={18} /></>}
              </button>

              <p className="text-[10px] text-gray-600 text-center">{t.form.labels.privacy}</p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}