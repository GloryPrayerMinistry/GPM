'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Video } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Prayers', href: '/prayers' },
  { name: 'Testimonies', href: '/testimonies' },
  { name: 'Shop', href: '/shop' },
  { name: 'Donate', href: '/donate' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/90 backdrop-blur-xl shadow-lg border-b border-gold/10'
          : 'bg-navy/70 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem] gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative h-9 w-9 lg:h-10 lg:w-10">
              <Image
                src="/logo.png"
                alt="Glory Prayer Ministry"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base lg:text-lg font-bold text-cream hidden md:block leading-tight">
              Glory Prayer Ministry
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-navy bg-gold shadow-sm'
                        : 'text-cream/75 hover:text-cream hover:bg-white/8'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs — right */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            <Link href="/resources">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gold/40 text-gold-light hover:bg-gold/10 transition-colors"
              >
                <Video size={16} />
                Meetings
              </motion.span>
            </Link>
            <Link href="/prayer-request">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex px-4 py-2.5 rounded-xl text-sm font-semibold text-cream/80 hover:text-cream hover:bg-white/8 transition-colors"
              >
                Prayer Request
              </motion.span>
            </Link>
            <Link href="/donate">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold btn-primary shadow-md"
              >
                Donate
              </motion.span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-cream hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy/95 backdrop-blur-xl border-t border-gold/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              <Link
                href="/resources"
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-navy bg-gold mb-2"
              >
                <Video size={18} />
                Meetings
              </Link>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive ? 'text-navy bg-gold' : 'text-cream/80 hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link href="/prayer-request" className="block px-4 py-3 text-cream/80">
                Prayer Request
              </Link>
              <Link href="/donate" className="block mt-2">
                <span className="block text-center px-4 py-3 rounded-xl font-semibold btn-primary">
                  Donate
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
