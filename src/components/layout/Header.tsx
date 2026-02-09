'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useStore } from '@/store/useStore'; // Store import

const links = [
  { href: '/menu', label: 'Menu' },
  { href: '/curation', label: 'AI Curation' },
  { href: '/tech', label: 'Technology' },
  { href: '/business', label: 'Business' },
];

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage } = useStore(); // 언어 상태 사용

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-[#d4af37]">
          Sensus
        </Link>

        <nav className="hidden md:flex gap-10 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-xs uppercase tracking-[0.2em] transition-colors hover:text-[#d4af37]",
                pathname === link.href ? "text-[#d4af37]" : "text-gray-400"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* 언어 전환 스위치 (Language Toggle) */}
          <div className="flex items-center gap-2 ml-4 border-l border-white/20 pl-6">
            <button 
              onClick={() => setLanguage('KO')}
              className={clsx("text-xs font-bold transition-colors", language === 'KO' ? "text-white" : "text-gray-600 hover:text-gray-400")}
            >
              KO
            </button>
            <span className="text-gray-700 text-[10px]">/</span>
            <button 
              onClick={() => setLanguage('JP')}
              className={clsx("text-xs font-bold transition-colors", language === 'JP' ? "text-white" : "text-gray-600 hover:text-gray-400")}
            >
              JP
            </button>
          </div>
        </nav>
        
        {/* 모바일 대응 등 필요시 추가 */}
      </div>
    </motion.header>
  );
}