'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Users,
  BookOpen,
  HandHeart,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import DonationCard from '../components/DonationCard';

const impactAreas = [
  {
    title: 'Prayer Gatherings & Ministry Events',
    description:
      'Funding weekly prayer meetings, worship gatherings, and special ministry events that bring people together in faith.',
    icon: Heart,
  },
  {
    title: 'Outreach & Community Support',
    description:
      'Providing practical help, food support, and fellowship to individuals and families in our community.',
    icon: Users,
  },
  {
    title: 'Teaching & Discipleship Resources',
    description:
      'Creating and distributing Bible study materials, devotionals, and teaching resources for spiritual growth.',
    icon: BookOpen,
  },
  {
    title: 'Charity Work & Practical Support',
    description:
      'Supporting registered charity initiatives that serve the vulnerable and demonstrate the love of Christ.',
    icon: HandHeart,
  },
];

const presetAmounts = [10, 25, 50, 100];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const activeAmount = customAmount
    ? parseFloat(customAmount)
    : selectedAmount;

  const handleDonate = () => {
    if (!activeAmount || activeAmount <= 0) return;

    setIsProcessing(true);

    // TODO: Integrate payment processing here.
    // Options: Stripe Checkout, PayPal, or a charity donation platform.
    // Example with Stripe:
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount: activeAmount * 100, currency: 'gbp' }),
    // });
    // const { url } = await response.json();
    // window.location.href = url;

    console.log(`Processing donation of £${activeAmount.toFixed(2)}`);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-cross opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6"
          >
            Support the Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-cream/75 max-w-2xl mx-auto leading-relaxed"
          >
            Every gift helps us continue the work of prayer, discipleship, outreach,
            and service.
          </motion.p>
        </div>
      </section>

      {/* Why Give */}
      <section className="py-20 md:py-28 bg-cream-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Your Giving Helps Us Serve"
            subtitle="As a registered charity, your donations directly support our ministry work and community outreach."
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-navy/70 text-lg leading-relaxed text-center max-w-3xl mx-auto"
          >
            When you give to Glory Prayer Ministry, you become a partner in the
            Great Commission. Your generosity enables us to gather in prayer, teach
            God&apos;s Word, reach those in need, and build a community rooted in
            faith and love.
          </motion.p>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Ways Your Donation Can Help"
            subtitle="See how your gift makes a difference in the lives of others."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => (
              <DonationCard
                key={area.title}
                title={area.title}
                description={area.description}
                icon={area.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 md:py-28 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold blur-3xl" />
        </div>
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Make a Donation"
            subtitle="Choose an amount or enter a custom gift."
            light
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-navy-light/60 backdrop-blur-sm rounded-2xl p-8 border border-gold/20"
          >
            {/* Preset amounts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-xl font-semibold text-lg transition-all ${
                    selectedAmount === amount && !customAmount
                      ? 'bg-gold text-navy shadow-lg'
                      : 'bg-white/10 text-cream hover:bg-white/20'
                  }`}
                >
                  £{amount}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-8">
              <label
                htmlFor="custom-amount"
                className="block text-sm font-semibold text-gold-light mb-2"
              >
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/60 font-semibold">
                  £
                </span>
                <input
                  id="custom-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/10 border border-gold/20 text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Donate button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDonate}
              disabled={isProcessing || !activeAmount || activeAmount <= 0}
              className="w-full py-4 rounded-xl font-semibold text-lg btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? 'Processing...'
                : activeAmount
                  ? `Donate £${activeAmount.toFixed(2)}`
                  : 'Select an Amount'}
            </motion.button>

            <p className="text-cream/50 text-xs text-center mt-4">
              {/* TODO: Replace with secure payment badge once Stripe/payment is integrated */}
              Secure payment processing will be available soon.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
