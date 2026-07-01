'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  light = false,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? 'text-cream' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-20 h-1 rounded-full mb-4 ${
          centered ? 'mx-auto' : ''
        } bg-gradient-to-r from-gold via-gold-warm to-gold`}
      />
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-3xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-gold-light/80' : 'text-navy/70'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
