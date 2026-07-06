'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import MatthewVerse from '../components/MatthewVerse';
import MinistryCoverflowCarousel from '../components/MinistryCoverflowCarousel';
import PlaceholderImage from '../components/PlaceholderImage';
import { MINISTRY_CAROUSEL_IMAGES } from '../lib/ministryImages';

export default function AboutPage() {
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
            About Glory Prayer Ministry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-cream/75 max-w-2xl mx-auto leading-relaxed"
          >
            A charity dedicated to prayer, discipleship, outreach, and
            glorifying God through faithful service.
          </motion.p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 md:py-28 bg-cream-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl aspect-[4/3] border-2 border-transparent overflow-hidden"
            >
              <MinistryCoverflowCarousel images={MINISTRY_CAROUSEL_IMAGES} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Who We Are
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold to-gold-warm rounded-full mb-6" />
              <p className="text-navy/70 leading-relaxed mb-4">
                Glory Prayer Ministry is a Christian prayer ministry and registered
                charity committed to sharing the Gospel, encouraging prayer, building
                disciples, supporting communities, and glorifying God in all that we do.
              </p>
              <p className="text-navy/70 leading-relaxed mb-4">
                We are a community of believers united by a shared passion for prayer,
                worship, and the transformative power of God&apos;s Word. Our ministry
                welcomes people from all walks of life who seek to grow in faith and
                serve others with love.
              </p>
              <p className="text-navy/70 leading-relaxed">
                Through weekly prayer gatherings, Bible teaching, outreach initiatives,
                and practical community support, we seek to be faithful stewards of the
                calling God has placed upon us.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-hover bg-cream/50 rounded-2xl p-8 md:p-10 border border-cream-dark"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Our Vision
              </h2>
              <div className="w-12 h-1 bg-gold rounded-full mb-6" />
              <p className="text-navy/70 leading-relaxed">
                To see lives transformed by the power of prayer and the Gospel, and
                communities renewed through faithful discipleship, worship, and
                compassionate service — all for the glory of God.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-hover bg-cream/50 rounded-2xl p-8 md:p-10 border border-cream-dark"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Our Mission
              </h2>
              <div className="w-12 h-1 bg-gold rounded-full mb-6" />
              <p className="text-navy/70 leading-relaxed">
                To go and make disciples of all nations — baptizing, teaching, and
                walking alongside believers as we share the love of Christ through
                prayer, outreach, and practical support.
              </p>
            </motion.div>
          </div>

          <SectionHeading
            title="The Foundation of Our Mission"
            subtitle="Everything we do is rooted in the Great Commission."
          />
          <div className="max-w-4xl mx-auto">
            <MatthewVerse variant="card" showHeading={false} />
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 md:py-28 bg-cream-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What We Believe" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              'We believe in one God — Father, Son, and Holy Spirit — eternally existing in three persons.',
              'We believe that Jesus Christ is the Son of God, who died for our sins and rose again, offering salvation to all who believe.',
              'We believe the Bible is the inspired and authoritative Word of God, sufficient for faith and practice.',
              'We believe in the power of prayer to transform lives, heal hearts, and draw us closer to God.',
              'We believe the Church is called to worship, disciple, serve, and proclaim the Gospel to all nations.',
              'We believe in the imminent return of Jesus Christ and the hope of eternal life for all believers.',
            ].map((belief, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-white rounded-xl p-5 shadow-sm border border-cream-dark"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-navy/80 leading-relaxed">{belief}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Charity Work */}
      <section className="py-20 md:py-28 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-cross opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Charity Work"
            subtitle="Serving our communities with compassion, integrity, and the love of Christ."
            light
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: '/images/prayer.jpg',
                title: 'Prayer Support',
                text: 'Providing prayer support and spiritual encouragement to individuals and families in need.',
              },
              {
                image: '/images/community.jpg',
                title: 'Community Outreach',
                text: 'Organising outreach programmes that offer practical help, food support, and fellowship.',
              },
              {
                image: '/images/outreach.jpg',
                title: 'Discipleship Resources',
                text: 'Distributing Bibles, devotionals, and teaching materials to support spiritual growth.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover rounded-2xl overflow-hidden bg-navy-light/50 border border-gold/10"
              >
                <div className="relative h-48">
                  <PlaceholderImage src={item.image} alt={item.title} fill />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cream mb-3">{item.title}</h3>
                  <p className="text-cream/70 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/donate">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 rounded-xl font-semibold btn-primary"
              >
                Support Our Charity Work
              </motion.span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
