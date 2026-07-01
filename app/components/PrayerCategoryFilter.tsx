'use client';

import { PRAYER_CATEGORIES } from '../lib/prayers';

interface PrayerCategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function PrayerCategoryFilter({
  activeCategory,
  onCategoryChange,
}: PrayerCategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
      {PRAYER_CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.id
              ? 'bg-gold text-navy shadow-md'
              : 'bg-white/10 text-cream/80 hover:bg-white/15 border border-gold/15'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
