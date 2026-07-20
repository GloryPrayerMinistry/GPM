'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Compass } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import MatthewVerse from '../components/MatthewVerse';
import MinistryCoverflowCarousel from '../components/MinistryCoverflowCarousel';
import PlaceholderImage from '../components/PlaceholderImage';
import { MINISTRY_CAROUSEL_IMAGES } from '../lib/ministryImages';

const beliefs = [
  {
    num: '01',
    label: 'God',
    title: 'The Trinity',
    text: 'We believe in one God — Father, Son, and Holy Spirit — eternally existing in three persons.',
  },
  {
    num: '02',
    label: 'Christ',
    title: 'Salvation Through Jesus',
    text: 'We believe that Jesus Christ is the Son of God, who died for our sins and rose again, offering salvation to all who believe.',
  },
  {
    num: '03',
    label: 'Scripture',
    title: 'The Word of God',
    text: 'We believe the Bible is the inspired and authoritative Word of God, sufficient for faith and practice.',
  },
  {
    num: '04',
    label: 'Prayer',
    title: 'The Power of Prayer',
    text: 'We believe in the power of prayer to transform lives, heal hearts, and draw us closer to God.',
  },
  {
    num: '05',
    label: 'Church',
    title: 'The Great Commission',
    text: 'We believe the Church is called to worship, disciple, serve, and proclaim the Gospel to all nations.',
  },
  {
    num: '06',
    label: 'Hope',
    title: 'Eternal Life',
    text: 'We believe in the imminent return of Jesus Christ and the hope of eternal life for all believers.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
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
            Glory Prayer Ministry is a Christ-centered ministry committed to sharing the Gospel, leading people into a deeper relationship with Jesus Christ through prayer, worship, and biblical teaching. We exist to strengthen believers, serve communities with God’s love, and raise disciples who live for His glory and make an impact for His Kingdom.
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
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#f5f5f7]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-white to-transparent rounded-full blur-3xl opacity-80" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-gold/10 rounded-full blur-[100px]" />
          <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-purple/8 rounded-full blur-[90px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 md:mb-20"
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-gold mb-4">
              Who We Are Becoming
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight leading-[1.05]">
              Vision &amp; Mission
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <motion.article
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[2rem] p-[1px] bg-gradient-to-br from-gold/40 via-white/80 to-purple/20 shadow-[0_20px_60px_rgba(10,22,40,0.08)]"
            >
              <div className="relative h-full rounded-[calc(2rem-1px)] bg-white/90 backdrop-blur-xl p-8 sm:p-10 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gold/15 to-transparent rounded-bl-[4rem] pointer-events-none" />
                <div className="relative flex items-center gap-3 mb-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/20 shadow-sm">
                    <Eye size={20} className="text-gold" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                    Our Vision
                  </h3>
                </div>
                <div className="relative space-y-5 text-[1.05rem] sm:text-lg text-navy/72 leading-[1.75] font-light">
                  <p>
                    To see lives transformed by the power of Jesus Christ, communities
                    renewed through prayer and the Gospel, and people equipped to live as
                    faithful disciples who glorify God in every nation.
                  </p>
                  <p>
                    We envision individuals, families, and communities experiencing hope,
                    healing, and restoration through the love of Christ, empowered by the
                    Holy Spirit to shine His light in the world.
                  </p>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[2rem] p-[1px] bg-gradient-to-br from-navy/20 via-white/80 to-gold/30 shadow-[0_20px_60px_rgba(10,22,40,0.08)]"
            >
              <div className="relative h-full rounded-[calc(2rem-1px)] bg-white/90 backdrop-blur-xl p-8 sm:p-10 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-navy/10 to-transparent rounded-bl-[4rem] pointer-events-none" />
                <div className="relative flex items-center gap-3 mb-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-navy/15 to-navy/5 border border-navy/10 shadow-sm">
                    <Compass size={20} className="text-navy" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <div className="relative space-y-5 text-[1.05rem] sm:text-lg text-navy/72 leading-[1.75] font-light">
                  <p>
                    To advance the Christian faith and glorify God through prayer, worship,
                    biblical teaching, discipleship, pastoral care, outreach, and
                    compassionate service.
                  </p>
                  <p>
                    Glory Prayer Ministry is committed to sharing the Gospel, strengthening
                    believers, serving communities, and supporting those in need through both
                    online and in-person ministry, bringing the hope and love of Jesus Christ
                    to all.
                  </p>
                </div>
              </div>
            </motion.article>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-20 md:mt-24"
          >
            <SectionHeading
              title="The Foundation of Our Mission"
              subtitle="Everything we do is rooted in the Great Commission."
            />
            <div className="max-w-4xl mx-auto">
              <MatthewVerse variant="card" showHeading={false} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Believe"
            subtitle="The convictions that shape our worship, teaching, and service."
          />

          <div className="beliefs-timeline relative mt-14 md:mt-16 max-w-3xl mx-auto">
            <div
              className="absolute left-0 sm:left-2 top-3 bottom-3 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent"
              aria-hidden
            />

            <ul className="space-y-0">
              {beliefs.map((belief, index) => (
                <motion.li
                  key={belief.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative pl-10 sm:pl-14 pb-12 last:pb-0"
                >
                  <span
                    className="absolute left-0 sm:left-2 top-2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-gold ring-4 ring-white shadow-sm"
                    aria-hidden
                  />

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                    <span className="text-4xl sm:text-5xl font-bold text-gold/30 leading-none tabular-nums">
                      {belief.num}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                      {belief.label}
                    </span>
                  </div>

                  <div className="beliefs-timeline__card rounded-2xl bg-cream/50 border border-cream-dark p-6 sm:p-7 shadow-[0_4px_24px_rgba(10,22,40,0.05)] hover:border-gold/30 hover:shadow-[0_12px_36px_rgba(10,22,40,0.08)] transition-all duration-300">
                    <h3 className="text-lg sm:text-xl font-bold text-navy mb-2">
                      {belief.title}
                    </h3>
                    <p className="text-navy/70 text-sm sm:text-base leading-relaxed">
                      {belief.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
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
                image: '/images/charitywork1.jpeg',
                title: 'Prayer Support',
                text: 'Providing prayer support and spiritual encouragement to individuals and families in need.',
              },
              {
                image: '/images/charitywork2.jpeg',
                title: 'Community Outreach',
                text: 'Organising outreach programmes that offer practical help, food support, and fellowship.',
              },
              {
                image: '/images/charitywork3.jpeg',
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
