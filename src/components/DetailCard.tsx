'use client';
import { useStore } from '@/store/useStore';
import { coffeeDB } from '@/data';
import clsx from 'clsx';

export default function DetailCard() {
  const { phase, selectedCoffee, setPhase, selectCoffee } = useStore();
  const coffee = coffeeDB.find(c => c.id === selectedCoffee);

  const isActive = phase === 'DETAIL' && coffee;

  const handleBack = () => {
    setPhase('SELECTION');
    setTimeout(() => selectCoffee(null), 500); // 애니메이션 후 선택 해제
  };

  return (
    <div
      className={clsx(
        "absolute top-0 right-0 h-full w-full md:w-[450px] bg-black/60 backdrop-blur-2xl border-l border-white/10 p-10 flex flex-col justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]  pointer-events-auto",
        isActive ? "translate-x-0" : "translate-x-full"
      )}
    >
      {coffee && (
        <>
          <div className="mb-2 text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">
            Premium Specialty
          </div>
          <h2 className="text-5xl font-serif text-white mb-2 leading-tight">
            {coffee.name}
          </h2>
          <p className="text-neutral-400 text-lg mb-8 font-light">{coffee.subName}</p>

          {/* 테이스팅 노트 태그 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {coffee.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 border border-white/5 rounded-full text-xs text-neutral-200">
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-neutral-300 leading-relaxed mb-10 font-light border-l-2 border-amber-500 pl-4">
            {coffee.description}
          </p>

          {/* 데이터 시각화 (간단한 바 차트) */}
          <div className="space-y-3 mb-12">
            {Object.entries(coffee.roastingProfile).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4 text-xs font-mono text-neutral-500 uppercase">
                <span className="w-16 text-right">{key}</span>
                <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500/80" 
                    style={{ width: `${value * 20}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex gap-4">
            <button className="flex-1 py-4 bg-amber-500 text-black font-bold tracking-wide hover:bg-amber-400 transition-colors">
              ORDER NOW
            </button>
            <button 
              onClick={handleBack}
              className="px-6 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              BACK
            </button>
          </div>
        </>
      )}
    </div>
  );
}