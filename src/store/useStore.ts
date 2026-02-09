import { create } from 'zustand';
import { AppPhase, CoffeeId } from '@/types';

interface AppState {
  phase: AppPhase;
  selectedCoffee: CoffeeId | null;
  setPhase: (phase: AppPhase) => void;
  selectCoffee: (id: CoffeeId | null) => void;
}

export const useStore = create<AppState>((set) => ({
  phase: 'INTRO',
  selectedCoffee: null,
  setPhase: (phase) => set({ phase }),
  selectCoffee: (id) => set({ selectedCoffee: id }),
}));