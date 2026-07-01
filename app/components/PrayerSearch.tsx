'use client';

import { Search } from 'lucide-react';

interface PrayerSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PrayerSearch({ value, onChange }: PrayerSearchProps) {
  return (
    <div className="relative max-w-xl mx-auto">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-light/60"
        size={20}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search prayers…"
        aria-label="Search prayers"
        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-gold/20 text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all backdrop-blur-sm"
      />
    </div>
  );
}
