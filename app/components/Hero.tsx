'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PlaceholderImage from './PlaceholderImage';
import HeroRays from './HeroRays';
import { ChevronDown } from './Icons';
import { MINISTRY_TAGLINE } from '../lib/constants';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 pattern-cross opacity-60" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #c9a227, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #4a306d, transparent)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Lion image with rays + glowing frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8 w-40 h-40 md:w-56 md:h-56"
        >
          <HeroRays className="absolute -inset-20 sm:-inset-24 md:-inset-32 lg:-inset-36 z-0" />
          <div className="absolute inset-0 rounded-full hero-glow border-4 border-gold/60 z-10" />
          <div className="absolute -inset-3 rounded-full border border-gold/20 z-10" />
          <div className="absolute -inset-6 rounded-full border border-gold/10 z-10" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gold/80 z-20">
            <PlaceholderImage
              src="/images/lion.jpeg"
              alt="Lion of Judah"
              fill
              className="rounded-full"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-wide text-gradient-gold"
        >
          YHWH IS MY GOD
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-cream/80 mb-8 max-w-2xl leading-relaxed"
        >
          {MINISTRY_TAGLINE}
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center w-full max-w-lg sm:max-w-none"
        >
          <Link href="/donate" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block px-8 py-3.5 rounded-xl font-semibold text-lg btn-primary shadow-lg text-center"
            >
              Donate Now
            </motion.span>
          </Link>
          <Link href="/shop" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block px-8 py-3.5 rounded-xl font-semibold text-lg btn-secondary text-center"
            >
              Visit Shop
            </motion.span>
          </Link>
          <Link href="/bible-plan" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block px-8 py-3.5 rounded-xl font-semibold text-lg bg-gradient-to-r from-gold via-gold-warm to-gold text-navy shadow-lg shadow-gold/30 text-center ring-2 ring-gold/40 ring-offset-2 ring-offset-navy"
            >
              View Bible Plan
            </motion.span>
          </Link>
          <Link href="/prayer-request" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block px-8 py-3.5 rounded-xl font-semibold text-lg border border-gold/30 text-gold-light hover:bg-gold/10 transition-all text-center"
            >
              Send a Prayer Request
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom right, away from CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-10 flex flex-col items-center text-gold-light/50 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest mb-1">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={22} strokeWidth={2} />
        </motion.div>
      </motion.div>
    </section>
  );
}
