'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, CalendarDays, CalendarRange } from 'lucide-react';
import {
  periodKeyForType,
  formatDisplayDate,
  type BiblePlanType,
} from '../lib/dates';
import { resolveMediaUrl } from '../lib/mediaUrl';

interface BiblePlan {
  id: string;
  type: string;
  periodKey: string;
  title: string | null;
  imageUrl: string;
  description: string | null;
}

const tabs: { id: BiblePlanType; label: string; icon: typeof BookOpen }[] = [
  { id: 'DAILY', label: 'Daily', icon: Calendar },
  { id: 'MONTHLY', label: 'Monthly', icon: CalendarDays },
  { id: 'YEARLY', label: 'Yearly', icon: CalendarRange },
];

function periodLabel(type: BiblePlanType, key: string): string {
  if (type === 'DAILY') {
    const [y, m, d] = key.split('-');
    return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  if (type === 'MONTHLY') {
    const [y, m] = key.split('-');
    return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
  }
  return key;
}

export default function BiblePlanPageClient() {
  const [activeTab, setActiveTab] = useState<BiblePlanType>('DAILY');
  const [plan, setPlan] = useState<BiblePlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const period = periodKeyForType(activeTab);
    void fetch(`/api/bible-plans?type=${activeTab}&period=${period}`)
      .then((res) => res.json())
      .then((data) => {
        setPlan(data.plan);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  const handleTabChange = (tab: BiblePlanType) => {
    setLoading(true);
    setPlan(null);
    setActiveTab(tab);
  };

  const currentPeriod = periodKeyForType(activeTab);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-cross opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <BookOpen className="mx-auto text-gold mb-4" size={36} />
            <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4">
              Bible Plan
            </h1>
            <p className="text-lg text-cream/75 max-w-2xl mx-auto">
              Walk through God&apos;s Word with our daily, monthly, and yearly reading plans.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-cream-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === id
                    ? 'bg-navy text-gold-light shadow-md'
                    : 'bg-white text-navy/70 border border-cream-dark hover:bg-navy/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl shadow-lg border border-cream-dark overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-gold via-gold-warm to-gold" />
            <div className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-1">
                {activeTab.charAt(0) + activeTab.slice(1).toLowerCase()} Plan
              </p>
              <h2 className="text-xl font-bold text-navy mb-6">
                {periodLabel(activeTab, currentPeriod)}
              </h2>

              {loading ? (
                <p className="text-navy/50 text-center py-16">Loading plan…</p>
              ) : plan ? (
                <>
                  {plan.title && (
                    <h3 className="text-lg font-semibold text-navy mb-4">{plan.title}</h3>
                  )}
                  <div className="relative aspect-[3/4] max-h-[600px] rounded-xl overflow-hidden bg-cream border border-cream-dark mb-6">
                    <Image
                      src={resolveMediaUrl(plan.imageUrl)}
                      alt={plan.title || `${activeTab} Bible Plan`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                  {plan.description && (
                    <p className="text-navy/70 leading-relaxed">{plan.description}</p>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="mx-auto text-gold/40 mb-4" size={40} />
                  <p className="text-navy/60">
                    No {activeTab.toLowerCase()} bible plan available for this period yet.
                  </p>
                  <p className="text-navy/40 text-sm mt-2">Please check back soon.</p>
                </div>
              )}
            </div>
          </motion.div>

          {activeTab === 'DAILY' && (
            <p className="text-center text-navy/40 text-xs mt-6">
              Showing plan for {formatDisplayDate()}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
