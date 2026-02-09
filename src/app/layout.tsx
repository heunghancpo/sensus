import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from "next/link";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: "Sensus | Your Sense to Coffee by Tech",
  description: "당신의 하루를 읽는 감각, 세계를 담은 커피",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${playfair.variable} ${roboto.variable}`}>
      <body className="bg-[#050505] text-[#e0e0e0] font-sans antialiased selection:bg-[#d4af37] selection:text-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}