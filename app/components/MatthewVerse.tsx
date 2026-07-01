'use client';

import { motion } from 'framer-motion';
import { MATTHEW_28_18_20 } from '../lib/constants';

interface MatthewVerseProps {
  variant?: 'light' | 'dark' | 'card';
  showHeading?: boolean;
}

export default function MatthewVerse({
  variant = 'dark',
  showHeading = true,
}: MatthewVerseProps) {
  const styles = {
    light: {
      container: 'text-cream',
      reference: 'text-gold-light',
      quote: 'border-gold/30',
    },
    dark: {
      container: 'text-navy',
      reference: 'text-gold',
      quote: 'border-gold/40',
    },
    card: {
      container: 'text-navy bg-white rounded-2xl shadow-lg p-8 md:p-10',
      reference: 'text-gold',
      quote: 'border-gold/30',
    },
  };

  const s = styles[variant];

  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${s.container} ${variant === 'card' ? s.container : ''}`}
    >
      {showHeading && (
        <p className={`text-sm uppercase tracking-widest font-semibold mb-4 ${s.reference}`}>
          Our Foundation
        </p>
      )}
      <div className={`border-l-4 pl-6 md:pl-8 ${s.quote}`}>
        <p className="text-lg md:text-xl leading-relaxed italic font-light mb-4">
          {MATTHEW_28_18_20.text}
        </p>
        <cite className={`text-sm font-semibold not-italic ${s.reference}`}>
          — {MATTHEW_28_18_20.reference}
        </cite>
      </div>
    </motion.blockquote>
  );
}
