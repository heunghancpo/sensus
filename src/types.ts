// src/types.ts
export type CoffeeId = 
  | 'geisha' 
  | 'pink_bourbon' 
  | 'kenya' 
  | 'blue_mountain'
  | 'ethiopia_yirgacheffe'
  | 'guatemala_antigua'
  | 'costa_rica_tarrazu'
  | 'indonesia_mandheling';

export interface CoffeeData {
  id: CoffeeId;
  name: string;
  subName: string;
  tags: string[];
  description: string;   // 한국어 설명
  descriptionJP: string; // 일본어 설명 (추가)
  color: string;
  roastingProfile: {
    acid: number;
    body: number;
    sweetness: number;
  };
  price?: string;
  isGuest?: boolean;
}

export type AppPhase = 'INTRO' | 'SELECTION' | 'DETAIL';