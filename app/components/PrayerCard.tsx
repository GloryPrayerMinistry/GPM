'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';
import type { Prayer } from '../lib/prayers';

interface PrayerCardProps {
  prayer: Prayer;
  index?: number;
}

export default function PrayerCard({ prayer, index = 0 }: PrayerCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className={`card-hover bg-white rounded-2xl shadow-md border overflow-hidden transition-colors ${
        expanded ? 'border-gold/40 ring-1 ring-gold/20' : 'border-cream-dark'
      }`}
    >
      <div className="p-6 md:p-7">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-gold/20 to-gold-warm/10 flex items-center justify-center">
            <BookOpen className="text-gold" size={22} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-navy mb-1">
              {prayer.title}
            </h3>
            <p className="text-navy/60 text-sm leading-relaxed">
              {prayer.description}
            </p>
          </div>
        </div>

        <p className="text-sm font-semibold text-gold mb-5">
          {prayer.scripture}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all btn-primary text-navy"
        >
          {expanded ? 'Hide Prayer' : 'Read Prayer'}
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-6 md:pb-7 pt-0">
              <div className="border-t border-cream-dark pt-5">
                <p className="text-navy/80 leading-relaxed italic text-sm md:text-base">
                  &ldquo;{prayer.text}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
