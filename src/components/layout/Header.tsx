'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Menu, X } from 'lucide-react'; // 아이콘 추가
import { useStore } from '@/store/useStore';

const links = [
  { href: '/space', label: 'Space' },
  { href: '/menu', label: 'Menu' },
  { href: '/curation', label: 'AI Curation' },
  { href: '/tech', label: 'Technology' },
  { href: '/business', label: 'Business' },
  { href: '/partner', label: 'Partnership'}
];

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // 모바일 메뉴 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-[#d4af37] z-50 relative">
            Sensus
          </Link>

          {/* Desktop Navigation */}
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

            {/* Language Toggle (Desktop) */}
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white z-50 relative p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-32 px-6 md:hidden flex flex-col"
          >
            {/* Menu Links */}
            <nav className="flex flex-col gap-8 mb-12">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-3xl font-serif block",
                      pathname === link.href ? "text-[#d4af37]" : "text-white/80"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer Area */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto pb-12 border-t border-white/10 pt-8"
            >
              {/* Language Toggle (Mobile) */}
              <div className="flex gap-6 text-sm font-mono mb-8">
                <button 
                  onClick={() => setLanguage('KO')}
                  className={clsx(language === 'KO' ? "text-[#d4af37]" : "text-gray-500")}
                >
                  KR (한국어)
                </button>
                <button 
                  onClick={() => setLanguage('JP')}
                  className={clsx(language === 'JP' ? "text-[#d4af37]" : "text-gray-500")}
                >
                  JP (日本語)
                </button>
              </div>

              <div className="text-gray-500 text-xs">
                <p>Tech meets Taste.</p>
                <p className="mt-2">&copy; Sensus Inc.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}