// src/data.ts
import { CoffeeData } from './types';

export const coffeeDB: CoffeeData[] = [
  {
    id: 'geisha',
    name: 'Esmeralda Geisha',
    subName: 'Panama Geisha',
    tags: ['Jasmine', 'Bergamot', 'Honey'],
    description: '세계 최고의 커피로 불리는 파나마 게이샤. 재스민의 우아한 꽃향기와 베르가못의 산미, 꿀 같은 단맛이 완벽한 조화를 이룹니다.',
    color: '#6f4e37',
    roastingProfile: { acid: 5, body: 3, sweetness: 4 }
  },
  {
    id: 'pink_bourbon',
    name: 'Pink Bourbon',
    subName: 'Colombia Huila',
    tags: ['Grapefruit', 'Melon', 'Floral'],
    description: '희귀 품종인 핑크 버번. 핑크 자몽의 상큼함과 멜론의 부드러운 단맛, 화사한 뒷맛이 특징입니다.',
    color: '#8d6e63',
    roastingProfile: { acid: 4, body: 3, sweetness: 5 }
  },
  {
    id: 'kenya',
    name: 'Kenya AA Top',
    subName: 'SL28 / SL34',
    tags: ['Blackcurrant', 'Tomato', 'Winey'],
    description: '케냐 커피 특유의 강렬한 바디감. 블랙커런트의 진한 과일 향과 와인 같은 풍미가 입안 가득 긴 여운을 남깁니다.',
    color: '#3e2723',
    roastingProfile: { acid: 5, body: 5, sweetness: 3 }
  },
  {
    id: 'blue_mountain',
    name: 'Blue Mountain',
    subName: 'Jamaica No.1',
    tags: ['Chocolate', 'Spices', 'Smooth'],
    description: '영국 왕실이 사랑한 커피. 쓴맛이 적고 부드러우며, 밀크 초콜릿의 달콤함과 은은한 스파이스 밸런스.',
    color: '#5d4037',
    roastingProfile: { acid: 2, body: 4, sweetness: 4 }
  },
];