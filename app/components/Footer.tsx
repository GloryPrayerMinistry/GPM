'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, Facebook, Instagram, Youtube, Twitter } from './Icons';
import { MINISTRY_TAGLINE, CHARITY_NUMBER, CONTACT } from '../lib/constants';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Prayers', href: '/prayers' },
  { name: 'Bible Plan', href: '/bible-plan' },
  { name: 'Testimonies', href: '/testimonies' },
  { name: 'Donate', href: '/donate' },
  { name: 'Shop', href: '/shop' },
  { name: 'Meetings', href: '/resources' },
  { name: 'Prayer Request', href: '/prayer-request' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', Icon: Facebook },
  { name: 'Instagram', href: '#', Icon: Instagram },
  { name: 'YouTube', href: '#', Icon: Youtube },
  { name: 'Twitter', href: '#', Icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="bg-navy-gradient text-cream mt-0 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Ministry info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4 text-gold-light">
              Glory Prayer Ministry
            </h3>
            <p className="mb-4 text-cream/70 leading-relaxed text-sm">
              {MINISTRY_TAGLINE}
            </p>
            <p className="text-gold/80 text-sm font-medium">
              Registered Charity No: {CHARITY_NUMBER}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4 text-gold-light">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-gold-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4 text-gold-light">Contact</h3>
            <div className="space-y-3 text-cream/70 text-sm">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 hover:text-gold-light transition-colors"
              >
                <Mail size={16} className="flex-shrink-0 text-gold" />
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 hover:text-gold-light transition-colors"
              >
                <Phone size={16} className="flex-shrink-0 text-gold" />
                {CONTACT.phone}
              </a>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4 text-gold-light">Stay Connected</h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const SocialIcon = social.Icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg bg-white/5 text-cream/70 hover:text-gold-light hover:bg-white/10 transition-colors"
                    aria-label={social.name}
                  >
                    <SocialIcon size={20} strokeWidth={1.5} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gold/10 mt-10 pt-8 text-center text-cream/50 text-sm"
        >
          <p>
            &copy; {new Date().getFullYear()} Glory Prayer Ministry. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
