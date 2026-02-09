'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Factory, BarChart3, Users } from 'lucide-react';
import { useStore } from '@/store/useStore';

const TEXT = {
  KO: {
    header: {
      tag: "Scalable Business Model",
      title: <>From a Cafe<br/>to a <span className="text-gray-600 italic">Coffee System.</span></>,
      desc: "Sensus는 단순한 F&B 브랜드가 아닙니다. 검증된 맛의 기준을 하드웨어와 소프트웨어로 확장하여 커피 산업의 새로운 표준을 제안합니다."
    },
    solutions: [
      {
        icon: Factory,
        title: "Bean Wholesale",
        desc: "데이터 기반 로스팅으로 편차 없는 원두를 공급합니다. 카페 운영자가 '맛'에 대한 고민 없이 '접객'에만 집중할 수 있도록 돕습니다.",
        points: ['House Blend 공급', 'Guest Bean 큐레이션', '추출 레시피 가이드 제공']
      },
      {
        icon: BarChart3,
        title: "Defect Scouter",
        desc: "자체 개발한 결점두 선별 모듈(H-Vision)을 로스터리 카페에 판매합니다. 소규모 로스터리도 대기업 수준의 품질 관리가 가능해집니다.",
        points: ['99.9% 결점두 제거', '시간당 5kg 처리 속도', '클라우드 데이터 연동'],
        badge: "CORE TECH"
      },
      {
        icon: Users,
        title: "Space Consulting",
        desc: "'조용한 기술'이 녹아든 공간을 설계합니다. 동선 효율화부터 AI 추천 시스템 도입까지, Tech-driven 카페 창업을 지원합니다.",
        points: ['시스템 동선 설계', 'AI 키오스크 솔루션', '브랜드 아이덴티티 구축']
      }
    ],
    cta: {
      title: "Partner with Sensus",
      desc: "커피 산업의 미래를 함께 만들 파트너를 찾습니다.\nB2B 납품 및 투자 관련 문의는 아래로 연락주세요."
    }
  },
  JP: {
    header: {
      tag: "Scalable Business Model",
      title: <>From a Cafe<br/>to a <span className="text-gray-600 italic">Coffee System.</span></>,
      desc: "Sensusは単なるF&Bブランドではありません。検証された味の基準をハードウェアとソフトウェアに拡張し、コーヒー産業の新しい標準を提案します。"
    },
    solutions: [
      {
        icon: Factory,
        title: "Bean Wholesale",
        desc: "データに基づいた焙煎で偏差のない豆を供給します。カフェ運営者が「味」に悩むことなく「接客」にのみ集中できるよう支援します。",
        points: ['House Blend 供給', 'Guest Bean キュレーション', '抽出レシピガイド提供']
      },
      {
        icon: BarChart3,
        title: "Defect Scouter",
        desc: "独自開発した欠点豆選別モジュール(H-Vision)をロースタリーカフェに販売します。小規模ロースタリーでも大企業レベルの品質管理が可能になります。",
        points: ['99.9% 欠点豆除去', '時間当たり5kg処理速度', 'クラウドデータ連動'],
        badge: "CORE TECH"
      },
      {
        icon: Users,
        title: "Space Consulting",
        desc: "「静かな技術」が溶け込んだ空間を設計します。動線の効率化からAI推薦システムの導入まで、Tech-drivenカフェの創業を支援します。",
        points: ['システム動線設計', 'AIキオスクソリューション', 'ブランドアイデンティティ構築']
      }
    ],
    cta: {
      title: "Partner with Sensus",
      desc: "コーヒー産業の未来を共に創るパートナーを探しています。\nB2B納品および投資に関するお問い合わせは下記までご連絡ください。"
    }
  }
};

export default function BusinessPage() {
  const { language } = useStore();
  const t = TEXT[language];

  return (
    <main className="pt-20 min-h-screen bg-[#050505]">
      
      {/* 1. Header */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-[#d4af37] text-xs font-mono uppercase tracking-widest mb-4"
        >
          {t.header.tag}
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-serif text-white mb-8"
        >
          {t.header.title}
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {t.header.desc}
        </p>
      </section>

      {/* 2. Solutions Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {t.solutions.map((item, i) => (
          <div key={i} className="bg-[#111] border border-white/5 p-8 hover:border-[#d4af37] transition-all group relative overflow-hidden">
            {item.badge && (
              <div className="absolute top-0 right-0 bg-[#d4af37] text-black text-[10px] font-bold px-3 py-1">{item.badge}</div>
            )}
            <item.icon className="w-10 h-10 text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors" />
            <h3 className="text-2xl text-white font-serif mb-4">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed h-24">
              {item.desc}
            </p>
            <ul className="space-y-3 mb-8">
              {item.points.map(pt => (
                <li key={pt} className="flex items-center gap-3 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 3. Inquiry Form (Static Area) */}
      <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-white mb-6">{t.cta.title}</h2>
          <p className="text-gray-400 mb-12 whitespace-pre-line">
            {t.cta.desc}
          </p>
          {/* Form UI 생략 (Partner Page로 유도) */}
        </div>
      </section>

    </main>
  );
}