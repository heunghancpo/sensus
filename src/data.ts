// src/data.ts
import { CoffeeData } from './types';

export const coffeeDB: CoffeeData[] = [
  // --- GUEST BEANS ---
  {
    id: 'geisha',
    name: 'Esmeralda Geisha',
    subName: 'Panama Geisha',
    tags: ['Jasmine', 'Bergamot', 'Honey'],
    description: '안개 낀 고산지대의 아침, 이슬 맺힌 재스민 꽃밭을 거니는 듯한 우아함. 베르가못의 섬세한 산미와 꿀 같은 단맛이 긴 여운을 남깁니다.',
    descriptionJP: '霧が立ち込める高山地帯の朝、露に濡れたジャスミン畑を歩くような優雅さ。ベルガモットの繊細な酸味と蜂蜜のような甘みが長い余韻を残します。',
    color: '#6f4e37',
    roastingProfile: { acid: 5, body: 3, sweetness: 4 },
    price: '12.0',
    isGuest: true
  },
  {
    id: 'pink_bourbon',
    name: 'Pink Bourbon',
    subName: 'Colombia Huila',
    tags: ['Grapefruit', 'Melon', 'Floral'],
    description: '따스한 봄 햇살 아래 잘 익은 핑크 자몽과 멜론을 한 입 베어 문 듯한 싱그러움. 화사하게 피어오르는 꽃향기가 기분을 환기시킵니다.',
    descriptionJP: '暖かい春の日差しの下、熟したピンクグレープフルーツとメロンを一口かじったような爽やかさ。華やかに広がる花の香りが気分を明るくしてくれます。',
    color: '#8d6e63',
    roastingProfile: { acid: 4, body: 3, sweetness: 5 },
    price: '8.5',
    isGuest: true
  },
  {
    id: 'ethiopia_yirgacheffe',
    name: 'Ethiopia Yirgacheffe',
    subName: 'G2 Washed',
    tags: ['Lemon', 'Earl Grey', 'White Flower'],
    description: '산들바람이 불어오는 정원, 갓 우려낸 홍차 한 잔의 여유. 레몬의 산뜻함과 하얀 꽃향기가 지친 마음에 생기를 불어넣습니다.',
    descriptionJP: 'そよ風が吹く庭園、淹れたての紅茶一杯の余裕。レモンの爽やかさと白い花の香りが疲れた心に生気を吹き込みます。',
    color: '#F4A460',
    roastingProfile: { acid: 5, body: 2, sweetness: 4 },
    price: '7.0',
    isGuest: true
  },
  {
    id: 'costa_rica_tarrazu',
    name: 'Costa Rica Tarrazu',
    subName: 'SHB',
    tags: ['Apple', 'Walnut', 'Clean Cup'],
    description: '투명하고 맑은 계곡물처럼 깨끗한 뒷맛. 아삭한 사과의 산미와 호두의 고소함이 어우러져 매일 마셔도 질리지 않는 편안함을 줍니다.',
    descriptionJP: '透明で澄んだ渓谷の水のようにきれいな後味。シャキシャキしたリンゴの酸味とクルミの香ばしさが調和し、毎日飲んでも飽きない心地よさを与えます。',
    color: '#D2691E',
    roastingProfile: { acid: 4, body: 3, sweetness: 4 },
    price: '7.5',
    isGuest: true
  },

  // --- HOUSE BEANS ---
  {
    id: 'blue_mountain',
    name: 'Blue Mountain',
    subName: 'Jamaica No.1',
    tags: ['Chocolate', 'Spices', 'Smooth'],
    description: '영국 왕실의 티타임처럼 고요하고 기품 있는 밸런스. 부드러운 밀크 초콜릿과 은은한 스파이스가 완벽한 조화를 이룹니다.',
    descriptionJP: '英国王室のティータイムのように静かで気品のあるバランス。滑らかなミルクチョコレートとほのかなスパイスが完璧な調和を成します。',
    color: '#5d4037',
    roastingProfile: { acid: 2, body: 4, sweetness: 4 },
    price: '9.0',
    isGuest: false
  },
  {
    id: 'kenya',
    name: 'Kenya AA Top',
    subName: 'SL28 / SL34',
    tags: ['Blackcurrant', 'Tomato', 'Winey'],
    description: '석양 아래 붉게 물든 사바나의 강렬함. 블랙커런트의 진한 과즙과 와인 같은 풍미가 입안 가득 묵직하게 차오릅니다.',
    descriptionJP: '夕日の下、赤く染まったサバンナの強烈さ。ブラックカラントの濃い果汁とワインのような風味が口いっぱいに重厚に広がります。',
    color: '#3e2723',
    roastingProfile: { acid: 5, body: 5, sweetness: 3 },
    price: '7.0',
    isGuest: false
  },
  {
    id: 'guatemala_antigua',
    name: 'Guatemala Antigua',
    subName: 'SHB',
    tags: ['Smoky', 'Roasted Nut', 'Caramel'],
    description: '타닥타닥 타오르는 장작불 앞에서의 깊은 휴식. 화산토가 길러낸 스모키한 향과 구운 견과류의 고소함이 마음을 차분하게 감싸줍니다.',
    descriptionJP: 'パチパチと燃える薪の火の前での深い休息。火山土が育てたスモーキーな香りと焼いたナッツの香ばしさが心を落ち着かせます。',
    color: '#8B4513',
    roastingProfile: { acid: 2, body: 4, sweetness: 3 },
    price: '6.5',
    isGuest: false
  },
  {
    id: 'indonesia_mandheling',
    name: 'Indonesia Mandheling',
    subName: 'G1',
    tags: ['Earthy', 'Herbal', 'Dark Chocolate'],
    description: '비 온 뒤 젖은 흙내음과 울창한 숲의 깊이. 묵직한 바디감과 허브의 알싸함이 복잡한 머릿속을 깊고 진하게 정리해줍니다.',
    descriptionJP: '雨上がりの湿った土の匂いと鬱蒼とした森の深み。重厚なボディ感とハーブのほろ苦さが複雑な頭の中を深く濃く整理してくれます。',
    color: '#556B2F',
    roastingProfile: { acid: 1, body: 5, sweetness: 2 },
    price: '6.0',
    isGuest: false
  }
];