'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, Sparkles } from 'lucide-react';
import { formatDisplayDate } from '../lib/dates';

export interface DailyDevotionalData {
  id: string;
  date: string;
  dailyFocusImage: string;
  dailyFocus: string;
  dailyDeclaration: string;
  verseText: string;
  verseReference: string;
}

interface DailyDevotionalCardProps {
  devotional: DailyDevotionalData | null;
  compactTop?: boolean;
}

export default function DailyDevotionalCard({
  devotional,
  compactTop = false,
}: DailyDevotionalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const dateLabel = formatDisplayDate();

  if (!devotional) {
    return (
      <section className={`${compactTop ? 'pt-6' : 'pt-24'} pb-4 px-4 sm:px-6 lg:px-8 bg-navy-gradient`}>
        <div className="max-w-4xl mx-auto text-center py-8">
          <Sparkles className="mx-auto text-gold/50 mb-3" size={28} />
          <p className="text-cream/60 text-sm">
            Today&apos;s devotional will be available soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${compactTop ? 'pt-6 pb-2' : 'pt-24 pb-2'} px-4 sm:px-6 lg:px-8 bg-navy-gradient relative overflow-hidden`}>
      <div className="absolute inset-0 pattern-cross opacity-10 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gold/20 overflow-hidden"
        >
          <div className="h-1 bg-gradient-to-r from-gold via-gold-warm to-gold" />

          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left p-5 md:p-6 flex items-center gap-4 md:gap-6 hover:bg-cream/30 transition-colors"
            aria-expanded={expanded}
          >
            <div className="relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-cream border border-gold/20">
              <Image
                src={devotional.dailyFocusImage}
                alt="Daily Focus"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-0.5">
                Daily Devotional
              </p>
              <h2 className="text-lg md:text-xl font-bold text-navy truncate">
                {devotional.dailyFocus}
              </h2>
              <p className="text-navy/50 text-xs md:text-sm">{dateLabel}</p>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2 text-gold">
              <span className="hidden sm:inline text-sm font-medium">
                {expanded ? 'Close' : 'Open'}
              </span>
              <ChevronDown
                size={22}
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 md:px-6 pb-6 border-t border-cream-dark">
                  <div className="grid md:grid-cols-2 gap-6 pt-5">
                    <div className="relative aspect-square max-w-xs mx-auto md:mx-0 rounded-xl overflow-hidden bg-cream border border-cream-dark">
                      <Image
                        src={devotional.dailyFocusImage}
                        alt="Daily Focus"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw, 320px"
                      />
                    </div>

                    <div className="space-y-5">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-1">
                          Daily Focus
                        </p>
                        <p className="text-navy font-bold text-xl">{devotional.dailyFocus}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 flex items-center gap-1.5">
                          <BookOpen size={14} /> Verse of the Day
                        </p>
                        <blockquote className="border-l-4 border-gold/40 pl-4">
                          <p className="text-navy/80 italic text-sm leading-relaxed">
                            &ldquo;{devotional.verseText}&rdquo;
                          </p>
                          <cite className="text-gold text-xs font-semibold not-italic mt-1 block">
                            — {devotional.verseReference}
                          </cite>
                        </blockquote>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-cream-dark">
                    <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
                      Daily Declaration
                    </p>
                    <p className="text-navy/80 leading-relaxed text-sm md:text-base italic">
                      &ldquo;{devotional.dailyDeclaration}&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
