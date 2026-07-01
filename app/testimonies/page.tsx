'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

interface Testimony {
  id: string;
  title: string;
  content: string;
  authorName: string | null;
  createdAt: string;
}

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', authorName: '' });

  useEffect(() => {
    fetch('/api/testimonies')
      .then((res) => res.json())
      .then((data) => {
        setTestimonies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/testimonies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSubmitted(true);
      setForm({ title: '', content: '', authorName: '' });
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-cross opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-cream mb-6"
          >
            Testimonies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-cream/75 max-w-2xl mx-auto"
          >
            Stories of faith, healing, and transformation through the power of prayer.
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-navy/50 py-12">Loading testimonies…</p>
          ) : testimonies.length > 0 ? (
            <div className="space-y-6 mb-20">
              {testimonies.map((t, i) => (
                <motion.blockquote
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-8 shadow-md border border-cream-dark"
                >
                  <MessageSquareQuote className="text-gold mb-4" size={28} />
                  <h3 className="text-xl font-bold text-navy mb-3">{t.title}</h3>
                  <p className="text-navy/70 leading-relaxed mb-4">{t.content}</p>
                  {t.authorName && (
                    <cite className="text-gold text-sm font-semibold not-italic">
                      — {t.authorName}
                    </cite>
                  )}
                </motion.blockquote>
              ))}
            </div>
          ) : (
            <p className="text-center text-navy/50 py-12 mb-20">
              Testimonies will appear here once approved.
            </p>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-cream-dark">
            <SectionHeading
              title="Share Your Testimony"
              subtitle="Your story could encourage someone else in their walk of faith."
              centered
            />

            {submitted ? (
              <div className="text-center py-8">
                <p className="text-navy font-semibold mb-2">Thank you for sharing!</p>
                <p className="text-navy/60 text-sm">
                  Your testimony has been submitted and will be reviewed by our team before being published.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-navy focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Give your testimony a title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Your Name (optional)</label>
                  <input
                    value={form.authorName}
                    onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-navy focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="First name or initials"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Your Testimony</label>
                  <textarea
                    required
                    rows={5}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                    placeholder="Share what God has done in your life…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold btn-primary flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Submit Testimony
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
