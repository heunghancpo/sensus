// src/types.ts
export type CoffeeId = 'geisha' | 'pink_bourbon' | 'kenya' | 'blue_mountain';

export interface CoffeeData {
  id: CoffeeId;
  name: string;
  subName: string;
  tags: string[];
  description: string;
  color: string;
  roastingProfile: {
    acid: number;
    body: number;
    sweetness: number;
  };
}

export type AppPhase = 'INTRO' | 'SELECTION' | 'DETAIL';