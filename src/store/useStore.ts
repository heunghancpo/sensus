import { create } from 'zustand';
import { AppPhase, CoffeeId } from '@/types';

// 언어 타입 정의
export type Language = 'KO' | 'JP';

interface AppState {
  // 기존 상태
  phase: AppPhase;
  selectedCoffee: CoffeeId | null;
  setPhase: (phase: AppPhase) => void;
  selectCoffee: (id: CoffeeId | null) => void;

  // 추가된 언어 상태
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useStore = create<AppState>((set) => ({
  phase: 'INTRO',
  selectedCoffee: null,
  setPhase: (phase) => set({ phase }),
  selectCoffee: (id) => set({ selectedCoffee: id }),

  // 언어 초기값: 한국어
  language: 'KO',
  setLanguage: (lang) => set({ language: lang }),
}));