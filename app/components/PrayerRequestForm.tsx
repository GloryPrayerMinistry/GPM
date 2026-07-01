'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart } from 'lucide-react';

export default function PrayerRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    contactMe: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO: Integrate form submission logic here.
    // Options: Send to email service (e.g. Resend, SendGrid),
    // store in database, or connect to a form handler (e.g. Formspree).
    // Example:
    // await fetch('/api/prayer-request', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    console.log('Prayer request submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
          <Heart className="text-gold" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-3">Thank You</h3>
        <p className="text-navy/70 max-w-md mx-auto">
          Your prayer request has been received. Our ministry team will be praying
          with you and standing with you in faith.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <p className="text-navy/70 text-center mb-8 leading-relaxed">
        We would be honoured to pray with you and stand with you in faith.
      </p>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="request" className="block text-sm font-semibold text-navy mb-2">
          Prayer Request
        </label>
        <textarea
          id="request"
          required
          rows={5}
          value={formData.request}
          onChange={(e) => setFormData({ ...formData, request: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none"
          placeholder="Share your prayer request with us..."
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.contactMe}
          onChange={(e) => setFormData({ ...formData, contactMe: e.target.checked })}
          className="w-5 h-5 rounded border-cream-dark text-gold focus:ring-gold/50"
        />
        <span className="text-sm text-navy/70">
          I would like someone to contact me
        </span>
      </label>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-4 rounded-xl font-semibold text-lg btn-primary flex items-center justify-center gap-2"
      >
        <Send size={20} />
        Submit Prayer Request
      </motion.button>
    </motion.form>
  );
}
