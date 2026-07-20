'use client';

import { motion } from 'framer-motion';
import { Video, Play, Download } from 'lucide-react';
import { ProductIcon } from '../components/Icons';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const zoomMeetings = [
  {
    day: 'Monday',
    time: '7:00 PM EST',
    title: 'Evening Prayer Meeting',
    link: 'https://zoom.us/j/example-monday',
    passcode: 'PRAYER123',
    description: 'Join us for an evening of prayer, worship, and fellowship.',
  },
  {
    day: 'Wednesday',
    time: '12:00 PM EST',
    title: 'Midweek Fellowship',
    link: 'https://zoom.us/j/example-wednesday',
    passcode: 'FELLOWSHIP',
    description: 'Midweek gathering for encouragement and Bible study.',
  },
  {
    day: 'Friday',
    time: '7:00 PM EST',
    title: 'Weekend Preparation',
    link: 'https://zoom.us/j/example-friday',
    passcode: 'PREPARE',
    description: 'Prepare your heart for the weekend with prayer and reflection.',
  },
];

const downloadableResources = [
  {
    title: 'Daily Prayer Guide',
    type: 'PDF',
    size: '2.5 MB',
    icon: 'FileText',
    description: 'A comprehensive guide to daily prayer practices and scripture readings.',
    download: '#',
  },
  {
    title: '30-Day Devotional',
    type: 'PDF',
    size: '3.2 MB',
    icon: 'BookOpen',
    description: 'A month-long devotional journey to deepen your faith.',
    download: '#',
  },
  {
    title: 'Prayer Request Form',
    type: 'PDF',
    size: '500 KB',
    icon: 'PenLine',
    description: 'Submit your prayer requests to our ministry team.',
    download: '#',
  },
  {
    title: 'Worship Song Lyrics',
    type: 'PDF',
    size: '1.8 MB',
    icon: 'Music',
    description: 'Collection of worship song lyrics for your personal use.',
    download: '#',
  },
  {
    title: 'Bible Study Notes',
    type: 'PDF',
    size: '4.1 MB',
    icon: 'BookText',
    description: 'Detailed notes from our recent Bible study sessions.',
    download: '#',
  },
  {
    title: 'Scripture Memory Cards',
    type: 'PDF',
    size: '2.0 MB',
    icon: 'Layers',
    description: 'Printable scripture cards to help memorize God\'s word.',
    download: '#',
  },
];

const videoRecordings = [
  { title: 'Sunday Service - Week 1', date: 'January 7, 2024', duration: '45:30', link: '#' },
  { title: 'Prayer Workshop', date: 'January 14, 2024', duration: '38:15', link: '#' },
  { title: 'Bible Study: Book of Psalms', date: 'January 21, 2024', duration: '52:20', link: '#' },
  { title: 'Testimony Night', date: 'January 28, 2024', duration: '41:10', link: '#' },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-cream-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Resources & Meetings</h1>
          <div className="w-24 h-1 mx-auto mb-4 bg-gradient-to-r from-gold to-gold-warm rounded-full"></div>
          <p className="text-navy/70 text-lg">Access our weekly meetings, downloads, and recordings</p>
        </motion.div>

        {/* Zoom Meetings Section */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center"
          >
            Weekly Zoom Meetings
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {zoomMeetings.map((meeting, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-md border border-cream-dark card-hover transition-all"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy text-gold-light">
                  <Video size={24} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">{meeting.day}</h3>
                <p className="text-xl font-semibold mb-2 text-gold">{meeting.time}</p>
                <p className="text-navy/80 mb-4 font-medium">{meeting.title}</p>
                <p className="text-navy/60 mb-4 text-sm">{meeting.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="p-3 rounded-lg bg-cream">
                    <p className="text-xs text-navy/50 mb-1">Meeting Link:</p>
                    <a href={meeting.link} className="text-sm break-all text-navy hover:text-gold transition-colors">
                      {meeting.link}
                    </a>
                  </div>
                  <div className="p-3 rounded-lg bg-cream-dark/50">
                    <p className="text-xs text-navy/50 mb-1">Passcode:</p>
                    <p className="text-navy font-semibold">{meeting.passcode}</p>
                  </div>
                </div>
                <motion.a
                  href={meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 text-navy rounded-xl font-semibold btn-primary"
                >
                  <Video size={18} />
                  Join Meeting
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Downloadable Resources Section */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center"
          >
            Downloadable Resources
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {downloadableResources.map((resource, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-cream-dark card-hover"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy text-gold-light">
                  <ProductIcon name={resource.icon} size={24} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{resource.title}</h3>
                <p className="text-navy/60 mb-4 text-sm">{resource.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-navy/40">{resource.type} • {resource.size}</span>
                </div>
                <motion.a
                  href={resource.download}
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-navy rounded-xl font-semibold btn-primary"
                >
                  <Download size={18} />
                  Download
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Video Recordings Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center"
          >
            Video Recordings
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {videoRecordings.map((video, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-cream-dark card-hover"
              >
                <div className="p-12 flex items-center justify-center bg-gradient-to-br from-cream to-cream-dark">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-navy text-gold-light">
                    <Play size={32} strokeWidth={2} fill="currentColor" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy mb-2">{video.title}</h3>
                  <p className="text-sm text-navy/60 mb-2">{video.date}</p>
                  <p className="text-sm text-navy/40 mb-4">Duration: {video.duration}</p>
                  <motion.a
                    href={video.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-navy rounded-xl font-semibold btn-primary"
                  >
                    <Play size={18} />
                    Watch Now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
