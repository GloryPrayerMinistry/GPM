'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import PrayerSearch from '../components/PrayerSearch';
import PrayerCategoryFilter from '../components/PrayerCategoryFilter';
import PrayerCard from '../components/PrayerCard';
import type { Prayer } from '../lib/prayers';
import { partitionPrayers, sortPrayers } from '../lib/prayers';

export default function PrayersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/prayers')
      .then((res) => res.json())
      .then((data) => setPrayers(data))
      .catch(() => setPrayers([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredPrayers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matches = prayers.filter((prayer) => {
      const matchesCategory =
        activeCategory === 'all' || prayer.category === activeCategory;

      const matchesSearch =
        !query ||
        prayer.title.toLowerCase().includes(query) ||
        prayer.description.toLowerCase().includes(query) ||
        prayer.scripture.toLowerCase().includes(query) ||
        prayer.text.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    return sortPrayers(matches);
  }, [prayers, searchQuery, activeCategory]);

  const { pinned: pinnedPrayers, regular: regularPrayers } = useMemo(
    () => partitionPrayers(filteredPrayers),
    [filteredPrayers]
  );

  const renderPrayerGrid = (items: Prayer[], startIndex = 0) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((prayer, index) => (
        <PrayerCard key={prayer.id} prayer={prayer} index={startIndex + index} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-cross opacity-20" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c9a227, transparent 70%)' }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-5"
          >
            Prayers for Every Season
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-cream/75 max-w-2xl mx-auto leading-relaxed mb-6"
          >
            Find words of faith, comfort, healing, and strength as you seek God
            in prayer.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gold-light italic text-base md:text-lg mb-10"
          >
            &ldquo;Draw near to God, and He will draw near to you.&rdquo;
            <span className="block text-sm text-gold/70 not-italic mt-1">
              — James 4:8
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8"
          >
            <PrayerSearch value={searchQuery} onChange={setSearchQuery} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <PrayerCategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>
        </div>
      </section>

      {/* Prayer library */}
      <section className="py-16 md:py-24 bg-cream-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-navy/50 py-16">Loading prayers…</p>
          ) : filteredPrayers.length > 0 ? (
            <div className="space-y-14 md:space-y-16">
              {pinnedPrayers.length > 0 && (
                <div>
                  <div className="text-center mb-8 md:mb-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-2">
                      Featured
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-navy">
                      Ministry Prayers
                    </h2>
                    <p className="text-navy/60 text-sm md:text-base mt-2 max-w-2xl mx-auto">
                      Prayers added by Glory Prayer Ministry — shown first for easy access.
                    </p>
                  </div>
                  {renderPrayerGrid(pinnedPrayers, 0)}
                </div>
              )}

              {regularPrayers.length > 0 && (
                <div>
                  {pinnedPrayers.length > 0 && (
                    <div className="text-center mb-8 md:mb-10 pt-2 border-t border-cream-dark">
                      <p className="text-xs uppercase tracking-[0.2em] text-navy/45 font-semibold mb-2 mt-8">
                        Library
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold text-navy">
                        All Prayers
                      </h2>
                    </div>
                  )}
                  {renderPrayerGrid(regularPrayers, pinnedPrayers.length)}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-navy/60 text-lg mb-4">
                No prayers found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-gold font-semibold hover:text-gold-warm transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Submit a Prayer Request */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/15 flex items-center justify-center">
            <Heart className="text-gold" size={28} />
          </div>
          <SectionHeading
            title="Submit a Prayer Request"
            subtitle="If you would like someone to stand with you in prayer, we would be honoured to pray for you."
          />
          <Link href="/prayer-request">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3.5 rounded-xl font-semibold btn-primary shadow-md"
            >
              Send a Prayer Request
            </motion.span>
          </Link>
        </div>
      </section>

      {/* Pray With Us */}
      <section className="py-16 md:py-20 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-cross opacity-15" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
            <Users className="text-gold-light" size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
            Pray With Us
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-gold-warm rounded-full mx-auto mb-6" />
          <p className="text-cream/75 text-lg leading-relaxed">
            Glory Prayer Ministry believes in the power of prayer, discipleship,
            and standing together in faith.
          </p>
        </div>
      </section>

      {/* Bottom CTAs */}
      <section className="py-16 md:py-20 bg-cream-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Link href="/donate">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3.5 rounded-xl font-semibold btn-primary shadow-md w-full sm:w-auto text-center"
              >
                Donate to Support the Ministry
              </motion.span>
            </Link>
            <Link href="/shop">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3.5 rounded-xl font-semibold btn-outline-dark w-full sm:w-auto text-center"
              >
                Visit the Shop
              </motion.span>
            </Link>
            <Link href="/prayer-request">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3.5 rounded-xl font-semibold border-2 border-gold text-navy hover:bg-gold/10 transition-all w-full sm:w-auto text-center"
              >
                Send a Prayer Request
              </motion.span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
