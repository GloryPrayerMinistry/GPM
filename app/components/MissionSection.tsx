'use client';

import { motion, Variants } from 'framer-motion';
import { Globe, Users, BookOpen, Sparkles, Quote } from 'lucide-react';
import { MATTHEW_28_18_20 } from '../lib/constants';
import PlaceholderImage from './PlaceholderImage';

const pillars = [
  {
    icon: Globe,
    label: 'Go',
    text: 'Make disciples of all nations',
  },
  {
    icon: Users,
    label: 'Baptize',
    text: 'In the name of the Father, Son & Holy Spirit',
  },
  {
    icon: BookOpen,
    label: 'Teach',
    text: 'Observe all things He commanded',
  },
  {
    icon: Sparkles,
    label: 'Promise',
    text: 'He is with us always',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function MissionSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-cream">
      {/* Ambient mesh */}
      <div className="absolute inset-0 pattern-dots opacity-40 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[480px] h-[480px] bg-gold/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left — mission narrative + pillars */}
          <div className="lg:col-span-5 space-y-8">
          <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55 }}
>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-navy/70 text-xs font-semibold uppercase tracking-[0.15em] mb-5">
                <Sparkles size={13} className="text-gold" />
                The Great Commission
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-navy leading-[1.08] mb-4">
                Our{' '}
                <span className="text-gradient-gold">Mission</span>
              </h2>
              <p className="text-navy/65 text-lg leading-relaxed">
                Rooted in Matthew 28, we go forth to make disciples of all nations —
                baptizing, teaching, and walking in the assurance that Christ is with
                us to the end of the age.
              </p>
            </motion.div>

            <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55 }}
className="grid grid-cols-2 gap-3 sm:gap-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.label}
                    className="group relative rounded-2xl bg-white/80 backdrop-blur-sm border border-navy/5 p-4 shadow-sm hover:shadow-md hover:border-gold/25 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 group-hover:from-gold/30 transition-colors">
                        <Icon size={15} className="text-gold" />
                      </span>
                      <span className="text-sm font-bold text-navy">{pillar.label}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-navy/55 leading-snug">{pillar.text}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right — verse showcase + visual */}
          <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55 }}
 className="lg:col-span-7 relative">
            <div className="relative rounded-[2rem] bg-gradient-to-br from-navy via-navy-light to-navy-mid p-[1px] shadow-[0_24px_80px_rgba(10,22,40,0.35)]">
              <div className="relative rounded-[calc(2rem-1px)] overflow-hidden">
                {/* Background image strip */}
                <div className="absolute inset-0 opacity-20">
                  <PlaceholderImage
                    src="/images/ministry-1.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-navy-mid/95" />
                </div>

                <div className="relative p-7 sm:p-9 md:p-11">
                  {/* Watermark reference */}
                  <span
                    className="absolute top-4 right-6 text-7xl sm:text-8xl font-bold text-white/[0.04] select-none pointer-events-none leading-none"
                    aria-hidden
                  >
                    28
                  </span>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 border border-gold/30">
                      <Quote size={18} className="text-gold" />
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                      Our Foundation
                    </span>
                  </div>

                  <blockquote>
                    <p className="text-cream/90 text-lg sm:text-xl md:text-[1.35rem] leading-relaxed italic font-light mb-6">
                      {MATTHEW_28_18_20.text}
                    </p>
                    <footer className="flex flex-wrap items-center gap-3">
                      <cite className="inline-flex items-center px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-sm font-semibold not-italic">
                        {MATTHEW_28_18_20.reference}
                      </cite>
                      <span className="text-cream/40 text-xs hidden sm:inline">
                        The heart of everything we do
                      </span>
                    </footer>
                  </blockquote>

                  {/* Accent line */}
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <p className="mt-4 text-center text-cream/45 text-xs uppercase tracking-[0.25em] font-medium">
                    Go · Disciple · Baptize · Teach
                  </p>
                </div>
              </div>
            </div>

            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
