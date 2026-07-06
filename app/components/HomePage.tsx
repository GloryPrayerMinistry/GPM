'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  BookOpen,
  Users,
  HandHeart,
  Calendar,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import Hero from './Hero';
import SectionHeading from './SectionHeading';
import MissionSection from './MissionSection';
import PlaceholderImage from './PlaceholderImage';
import DailyDevotionalCard, { type DailyDevotionalData } from './DailyDevotionalCard';
import FlyerBanner, { type FlyerData } from './FlyerBanner';

const ministryAreas = [
  {
    title: 'Prayer & Worship',
    description:
      'Gathering together in prayer and worship, seeking the presence of God and interceding for one another with faith and expectation.',
    icon: Heart,
    image: '/images/prayer.jpg',
  },
  {
    title: 'Discipleship & Teaching',
    description:
      'Teaching the Word of God with clarity and compassion, helping believers grow in faith, knowledge, and obedience to Christ.',
    icon: BookOpen,
    image: '/images/worship.jpg',
  },
  {
    title: 'Outreach & Charity Work',
    description:
      'Serving communities with practical support, sharing the Gospel, and demonstrating the love of Christ through action.',
    icon: HandHeart,
    image: '/images/outreach.jpg',
  },
  {
    title: 'Community Support',
    description:
      'Building a caring community where people find encouragement, fellowship, and a place to belong in the family of God.',
    icon: Users,
    image: '/images/community.jpg',
  },
];

const upcomingEvents = [
  {
    title: 'Weekly Prayer Gathering',
    date: 'Every Monday, 7:00 PM',
    description: 'Join us online for an evening of prayer, worship, and fellowship.',
  },
  {
    title: 'Discipleship Bible Study',
    date: 'Every Wednesday, 12:00 PM',
    description: 'Deepen your faith through guided Bible study and group discussion.',
  },
  {
    title: 'Community Outreach Day',
    date: 'Scheduled as Needed',
    description: 'Serve alongside us as we reach out to those in need in our community.',
  },
];

interface HomePageProps {
  devotional: DailyDevotionalData | null;
  flyer?: FlyerData | null;
  showFlyer?: boolean;
}

export default function HomePage({ devotional, flyer, showFlyer }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <DailyDevotionalCard devotional={devotional} />
      {showFlyer && flyer && <FlyerBanner flyer={flyer} inline />}
      <Hero />

      <MissionSection />

      {/* Ministry Areas */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Do"
            subtitle="Serving God through prayer, teaching, outreach, and community."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {ministryAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-hover rounded-2xl overflow-hidden shadow-md border border-cream-dark bg-white"
                >
                  <div className="relative h-48">
                    <PlaceholderImage src={area.image} alt={area.title} fill />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gold/90 flex items-center justify-center">
                      <Icon className="text-navy" size={24} />
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-navy mb-3">{area.title}</h3>
                    <p className="text-navy/70 leading-relaxed">{area.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative overflow-hidden bg-navy-gradient">

{/* Base gradient layer */}
<div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0b1b3a] to-black" />

{/* Pattern overlay */}
<div className="absolute inset-0 pattern-cross opacity-20" />

{/* Yellow glow (top-left) */}
<div className="absolute top-[-120px] left-[-100px] w-[450px] h-[450px] bg-yellow-400/15 blur-3xl rounded-full" />

{/* Blue glow (bottom-right) */}
<div className="absolute bottom-[-140px] right-[-120px] w-[500px] h-[500px] bg-blue-500/15 blur-3xl rounded-full" />

{/* Content container */}
<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

  <div className="grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-gold" size={28} />
        <span className="text-gold-light uppercase tracking-widest text-sm font-semibold">
          Our Calling
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-6">
        Called to Glorify God
      </h2>

      <p className="text-cream/75 text-lg leading-relaxed mb-6">
        Glory Prayer Ministry exists to share the good news, encourage prayer,
        build disciples, support communities, and glorify God in all that we do.
        We are committed to serving with integrity, compassion, and unwavering faith.
      </p>

      <p className="text-cream/60 leading-relaxed mb-8">
        We believe that through prayer, the teaching of God's Word, and practical
        acts of service, lives are transformed and communities are renewed by the
        power of the Holy Spirit.
      </p>

      <Link href="/about">
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 rounded-xl font-semibold btn-primary"
        >
          Learn More About Us
        </motion.span>
      </Link>
    </motion.div>

    {/* RIGHT IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
    >
      <PlaceholderImage
        src="/images/ctg.png"
        alt="Glory Prayer Ministry"
        fill
        className="rounded-2xl object-cover"
      />

      {/* Image soft overlay for polish */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Border glow */}
      <div className="absolute inset-0 border-2 border-yellow-400/20 rounded-2xl" />
    </motion.div>

  </div>
</div>
</section>
      {/* Upcoming Events */}
      <section className="py-20 md:py-28 bg-cream-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Join Us in Prayer"
            subtitle="Upcoming ministry gatherings and events — all are welcome."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover bg-white rounded-2xl p-8 shadow-md border border-cream-dark"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-5">
                  <Calendar className="text-gold" size={24} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{event.title}</h3>
                <p className="text-gold font-semibold text-sm mb-3">{event.date}</p>
                <p className="text-navy/70 text-sm leading-relaxed">{event.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/resources">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 rounded-xl font-semibold btn-outline-dark"
              >
                View All Meeting Links
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Support the Mission */}
      <section className="py-20 md:py-28 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Support the Mission"
            subtitle="Every gift helps us continue the work of prayer, discipleship, outreach, and service."
            light
          />
          <Link href="/donate">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 rounded-xl font-semibold text-lg btn-primary shadow-lg"
            >
              Give Today
            </motion.span>
          </Link>
        </div>
      </section>

      {/* Shop with Purpose */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1"
            >
              <PlaceholderImage
                src="/images/shop.png"
                alt="Shop with Purpose"
                fill
                className="rounded-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="text-gold" size={28} />
                <span className="text-gold uppercase tracking-widest text-sm font-semibold">
                  Ministry Shop
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Shop with Purpose
              </h2>
              <p className="text-navy/70 text-lg leading-relaxed mb-8">
                Every purchase helps support the mission and outreach of Glory Prayer
                Ministry. Browse books, devotionals, apparel, and prayer resources
                crafted with faith and purpose.
              </p>
              <Link href="/shop">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 rounded-xl font-semibold btn-primary"
                >
                  Browse the Shop
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
