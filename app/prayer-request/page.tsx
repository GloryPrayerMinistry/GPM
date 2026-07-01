'use client';

import { motion } from 'framer-motion';
import PrayerRequestForm from '../components/PrayerRequestForm';
import { Mail, Phone } from 'lucide-react';
import { CONTACT } from '../lib/constants';

export default function PrayerRequestPage() {
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
            Prayer Request
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-cream/75 max-w-2xl mx-auto leading-relaxed"
          >
            We would be honoured to pray with you and stand with you in faith.
          </motion.p>
        </div>
      </section>

      {/* Form & Contact */}
      <section className="py-20 md:py-28 bg-cream-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-cream-dark"
              >
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Submit Your Prayer Request
                </h2>
                <div className="w-12 h-1 bg-gold rounded-full mb-6" />
                <PrayerRequestForm />
              </motion.div>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-navy rounded-2xl p-8 text-cream"
              >
                <h3 className="text-xl font-bold text-gold-light mb-4">
                  Contact Us
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed mb-6">
                  Prefer to reach out directly? We&apos;d love to hear from you.
                  Our ministry team is here to support you in prayer and faith.
                </p>
                <div className="space-y-4">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 text-cream/80 hover:text-gold-light transition-colors"
                  >
                    <Mail size={18} className="text-gold flex-shrink-0" />
                    <span className="text-sm">{CONTACT.email}</span>
                  </a>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 text-cream/80 hover:text-gold-light transition-colors"
                  >
                    <Phone size={18} className="text-gold flex-shrink-0" />
                    <span className="text-sm">{CONTACT.phone}</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-cream-dark"
              >
                <h3 className="text-xl font-bold text-navy mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3 text-navy/70 text-sm">
                  <li className="flex gap-2">
                    <span className="text-gold">✦</span>
                    Your request will be treated with confidentiality and care.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold">✦</span>
                    Our prayer team will intercede on your behalf.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold">✦</span>
                    If requested, a team member will reach out to you directly.
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
