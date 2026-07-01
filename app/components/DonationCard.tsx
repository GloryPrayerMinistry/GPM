'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DonationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index?: number;
}

export default function DonationCard({
  title,
  description,
  icon: Icon,
  index = 0,
}: DonationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-hover bg-white rounded-2xl p-6 md:p-8 shadow-md border border-cream-dark"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold-warm/10 flex items-center justify-center mb-5">
        <Icon className="text-gold" size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
      <p className="text-navy/70 leading-relaxed">{description}</p>
    </motion.div>
  );
}
