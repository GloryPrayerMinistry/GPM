'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, CalendarDays, Sun, ChevronDown } from 'lucide-react';
import { formatDisplayDate } from '../lib/dates';
import {
  DEFAULT_DEVOTIONAL_DECLARATION_IMAGE,
  DEFAULT_DEVOTIONAL_FOCUS_IMAGE,
} from '../lib/constants';
import DevotionalImage from './DevotionalImage';

export interface DailyDevotionalData {
  id: string;
  date: string;
  dailyFocusImage: string;
  dailyFocus: string;
  dailyDeclarationImage: string;
  verseText: string;
  verseReference: string;
}

interface DailyDevotionalCardProps {
  devotional: DailyDevotionalData | null;
}

interface PortraitImageCardProps {
  label: string;
  src: string;
  alt: string;
  fallback: string;
  priority?: boolean;
  delay?: number;
}

function PortraitImageCard({
  label,
  src,
  alt,
  fallback,
  priority = false,
  delay = 0,
}: PortraitImageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex-1 min-w-0 max-w-[220px] sm:max-w-[250px]"
    >
      <div
        className="absolute -inset-0.5 rounded-[1.35rem] bg-gradient-to-b from-gold/50 via-gold/15 to-purple/20 opacity-70 blur-[1px] group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden
      />
      <div className="relative h-full rounded-[1.25rem] bg-navy-light/90 backdrop-blur-md p-3 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-r from-gold to-gold-warm text-navy text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] shadow-lg shadow-gold/25">
          {label}
        </span>
        <div className="relative mt-3 aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-gold/20">
          <DevotionalImage
            src={src}
            fallback={fallback}
            alt={alt}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 48vw, 250px"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-gold/5 pointer-events-none" />
        </div>
      </div>
    </motion.article>
  );
}

// function ThumbnailPeek({
//   src,
//   fallback,
//   alt,
//   className = '',
// }: {
//   src: string;
//   fallback: string;
//   alt: string;
//   className?: string;
// }) {
//   return (
//     <div
//       className={`relative w-14 sm:w-16 aspect-[3/4] rounded-lg overflow-hidden ring-2 ring-gold/30 shadow-lg shadow-black/30 ${className}`}
//     >
//       <DevotionalImage
//         src={src}
//         fallback={fallback}
//         alt={alt}
//         fill
//         className="object-cover"
//         sizes="64px"
//       />
//     </div>
//   );
// }

export default function DailyDevotionalCard({ devotional }: DailyDevotionalCardProps) {
  const [open, setOpen] = useState(false);
  const dateLabel = formatDisplayDate();

  if (!devotional) {
    return (
      <section className="relative pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 bg-navy-gradient overflow-hidden">
        <div className="absolute inset-0 pattern-cross opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center py-16 md:py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/15 border border-gold/30 mb-6">
            <Sparkles className="text-gold" size={32} />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">
            Daily Devotional
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-cream mb-4">
            Today&apos;s Word
          </h1>
          <p className="text-cream/60 text-base md:text-lg leading-relaxed">
            Today&apos;s devotional will be available soon. Check back later for
            fresh encouragement from God&apos;s Word.
          </p>
        </div>
      </section>
    );
  }

  const versePreview =
    devotional.verseText.length > 120
      ? `${devotional.verseText.slice(0, 120).trim()}…`
      : devotional.verseText;

  return (
    <section
      id="daily-devotional"
      className="relative pt-24 pb-14 md:pb-16 px-4 sm:px-6 lg:px-8 bg-navy-gradient overflow-hidden"
      aria-labelledby="devotional-heading"
    >
      <div className="absolute inset-0 pattern-cross opacity-15 pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gold/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] bg-gradient-to-br from-gold/45 via-gold/15 to-purple/35 p-[1px] shadow-[0_0_60px_rgba(201,162,39,0.35)]"
        >
          <div className="rounded-[calc(2rem-1px)] bg-navy-light/95 backdrop-blur-xl overflow-hidden">
            {/* Clickable teaser / toggle header */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="devotional-panel"
              className="group w-full text-left p-5 sm:p-7 md:p-8 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-inset"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                {/* Thumbnail stack */}
              <div className="relative shrink-0 w-[4.5rem] sm:w-20 h-[5.5rem] sm:h-24 flex items-center justify-center">
  <img
    src="/images/lion.jpeg"
    alt="lion"
    className="w-full h-full object-contain drop-shadow-lg"
  />
</div>

                {/* Teaser copy */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-gold-light text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                      <Sun size={11} className="text-gold" />
                      Today&apos;s Devotional
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cream/60 text-[10px] sm:text-xs">
                      <CalendarDays size={10} />
                      {dateLabel}
                    </span>
                  </div>

                  <h2
                    id="devotional-heading"
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-gold leading-tight mb-2 sm:mb-3"
                  >
                    {devotional.dailyFocus}
                  </h2>

                  {!open && (
                    <div className="space-y-1.5">
                      <p className="text-cream/65 text-sm sm:text-base leading-relaxed italic line-clamp-2">
                        &ldquo;{versePreview}&rdquo;
                      </p>
                      <p className="text-gold/80 text-xs font-semibold">
                        {devotional.verseReference}
                      </p>
                    </div>
                  )}
                </div>

                {/* Chevron toggle */}
                <div
                  className={`shrink-0 mt-1 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 shadow-inner transition-all duration-300 group-hover:from-gold/35 group-hover:border-gold/50 ${
                    open ? 'bg-gold/25' : ''
                  }`}
                >
                  <ChevronDown
                    size={22}
                    className={`text-gold transition-transform duration-300 ${
                      open ? 'rotate-180' : 'group-hover:translate-y-0.5'
                    }`}
                  />
                </div>
              </div>

              {/* CTA strip — only when collapsed */}
              <AnimatePresence>
                {!open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-gold/15 via-gold/10 to-gold/15 border border-gold/25 text-gold-light text-sm font-semibold group-hover:from-gold/25 group-hover:border-gold/40 transition-all">
                      <BookOpen size={16} className="text-gold" />
                      <span>Open Today&apos;s Devotional</span>
                      <ChevronDown size={16} className="text-gold animate-bounce" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Expandable panel */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id="devotional-panel"
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-7 md:px-8 pb-6 sm:pb-8 md:pb-10 pt-0 border-t border-gold/10">
                    {/* Portrait images row */}
                    <div className="flex justify-center items-stretch gap-5 sm:gap-7 md:gap-8 mb-7 md:mb-9 max-w-xl mx-auto pt-6 sm:pt-8">
                      <PortraitImageCard
                        label="Daily Focus"
                        src={devotional.dailyFocusImage}
                        fallback={DEFAULT_DEVOTIONAL_FOCUS_IMAGE}
                        alt={`Daily Focus: ${devotional.dailyFocus}`}
                        priority
                        delay={0.05}
                      />
                      <PortraitImageCard
                        label="Declaration"
                        src={devotional.dailyDeclarationImage}
                        fallback={DEFAULT_DEVOTIONAL_DECLARATION_IMAGE}
                        alt="Daily Declaration"
                        delay={0.12}
                      />
                    </div>

                    {/* Full verse */}
                    <motion.article
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="relative rounded-2xl p-px bg-gradient-to-r from-gold/60 via-gold-warm/40 to-gold/20 shadow-[0_12px_40px_rgba(201,162,39,0.12)]"
                    >
                      <div className="relative rounded-2xl bg-navy/70 backdrop-blur-md px-6 py-7 sm:px-8 sm:py-9 overflow-hidden">
                        <span
                          className="absolute -top-2 left-4 text-[5rem] sm:text-[6rem] leading-none text-gold/[0.07] font-serif select-none pointer-events-none"
                          aria-hidden
                        >
                          &ldquo;
                        </span>

                        <div className="relative flex items-start gap-4">
                          <div className="hidden sm:flex shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-gold to-gold-warm items-center justify-center shadow-lg shadow-gold/30">
                            <BookOpen size={20} className="text-navy" />
                          </div>

                          <div className="flex-1 min-w-0 text-center sm:text-left">
                            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4 flex items-center justify-center sm:justify-start gap-2">
                              <BookOpen size={14} className="sm:hidden" />
                              Verse of the Day
                            </p>
                            <blockquote>
                              <p className="text-cream text-lg sm:text-xl md:text-2xl leading-relaxed italic font-light">
                                &ldquo;{devotional.verseText}&rdquo;
                              </p>
                              <cite className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-sm font-semibold not-italic">
                                {devotional.verseReference}
                              </cite>
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
