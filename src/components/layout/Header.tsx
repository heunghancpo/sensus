'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const links = [
  { href: '/menu', label: 'Menu' },
  { href: '/curation', label: 'AI Curation' },
  { href: '/tech', label: 'Technology' },
  { href: '/business', label: 'Business' }, // Store -> Business 변경
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

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

        <nav className="hidden md:flex gap-10">
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
        </nav>
        
        {/* IR용 문의 버튼 */}
        <Link 
        href="/partner" 
        className="hidden md:block px-6 py-2 border border-white/20 text-xs text-white uppercase tracking-wider hover:bg-white hover:text-black transition-all"
        >
        Partner Inquiry
        </Link>
      </div>
    </motion.header>
  );
}