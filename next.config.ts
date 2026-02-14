import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화를 끄고 원본을 그대로 서빙 (Firebase Hosting에 최적화)
  images: {
    unoptimized: true,
  },
  // 배포 시 호환성을 높이는 설정
  output: 'standalone', 
};

export default nextConfig;