'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { resolveMediaUrl } from '../lib/mediaUrl';

export interface FlyerData {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string | null;
}

interface FlyerBannerProps {
  flyer: FlyerData;
  /** When true, flyer sits below another section — less top padding. */
  inline?: boolean;
}

export default function FlyerBanner({ flyer, inline = false }: FlyerBannerProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full overflow-hidden bg-navy"
    >
      <div className="absolute inset-0 pattern-cross opacity-10 pointer-events-none" />
      <div className={`relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${inline ? 'pt-8 pb-6' : 'pt-24 pb-6'}`}>
        <p className="text-center text-xs uppercase tracking-widest text-gold font-semibold mb-3">
          Ministry Flyer
        </p>
        <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-gold/25 mx-auto">
          <Image
            src={resolveMediaUrl(flyer.imageUrl)}
            alt={flyer.title}
            fill
            className="object-contain bg-navy-light"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        {flyer.linkUrl && (
          <p className="text-center mt-3 text-gold-light/70 text-sm flex items-center justify-center gap-1">
            <ExternalLink size={14} />
            Tap to learn more
          </p>
        )}
      </div>
    </motion.div>
  );

  if (flyer.linkUrl) {
    return (
      <Link href={flyer.linkUrl} target="_blank" rel="noopener noreferrer" className="block hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
