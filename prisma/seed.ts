import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gloryprayerministry.org';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const hashed = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashed,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  await prisma.dailyDevotional.upsert({
    where: { date: todayKey() },
    update: {},
    create: {
      date: todayKey(),
      dailyFocusImage: '/images/lion.jpeg',
      dailyFocus: 'Faith',
      dailyDeclarationImage: '/images/worship.jpg',
      verseText:
        'Now faith is the substance of things hoped for, the evidence of things not seen.',
      verseReference: 'Hebrews 11:1',
    },
  });

  const products = [
    {
      name: 'Daily Devotional Guide',
      price: 19.99,
      image: 'BookOpen',
      imageUrl: '/images/shop-placeholder.jpg',
      category: 'Books & Devotionals',
      description:
        'A comprehensive 365-day devotional guide to strengthen your faith journey.',
    },
    {
      name: 'Prayer Journal',
      price: 24.99,
      image: 'BookMarked',
      imageUrl: '/images/shop-placeholder.jpg',
      category: 'Prayer Resources',
      description:
        "Beautifully designed prayer journal to document your prayers and God's answers.",
    },
    {
      name: 'Scripture Cards Set',
      price: 14.99,
      image: 'Layers',
      imageUrl: '/images/shop-placeholder.jpg',
      category: 'Gifts',
      description:
        '50 inspirational scripture cards with beautiful designs for daily encouragement.',
    },
    {
      name: 'Worship Music Collection',
      price: 29.99,
      image: 'Music',
      imageUrl: '/images/shop-placeholder.jpg',
      category: 'Gifts',
      description: 'Curated collection of worship songs and hymns on digital format.',
    },
    {
      name: 'Bible Study Workbook',
      price: 22.99,
      image: 'BookText',
      imageUrl: '/images/shop-placeholder.jpg',
      category: 'Books & Devotionals',
      description: 'Interactive workbook for group or individual Bible study sessions.',
    },
    {
      name: 'Prayer Shawl',
      price: 49.99,
      image: 'Package',
      imageUrl: '/images/shop-placeholder.jpg',
      category: 'Apparel',
      description: 'Handcrafted prayer shawl made with love and blessed by our ministry.',
    },
    {
      name: 'Faith Bracelet',
      price: 18.99,
      image: 'CircleDot',
      imageUrl: '/images/shop-placeholder.jpg',
      category: 'Gifts',
      description:
        "Elegant faith-themed bracelet as a reminder of God's love and presence.",
    },
    {
      name: 'Inspirational Wall Art',
      price: 34.99,
      image: 'ImageIcon',
      imageUrl: '/images/shop-placeholder.jpg',
      category: 'Gifts',
      description:
        'Beautiful scripture-based wall art print to inspire your home or office.',
    },
  ];

  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({ data: products });
  }

  const testimonyCount = await prisma.testimony.count();
  if (testimonyCount === 0) {
    await prisma.testimony.createMany({
      data: [
        {
          title: 'God Answered My Prayer',
          content:
            'After months of praying for healing, I experienced a breakthrough I never thought possible. Glory Prayer Ministry stood with me in faith every step of the way.',
          authorName: 'Sarah M.',
          status: 'APPROVED',
        },
        {
          title: 'Found a Community of Believers',
          content:
            'Joining the weekly prayer gatherings changed my life. I found a family in Christ who encourages me and helps me grow in my walk with God.',
          authorName: 'James T.',
          status: 'APPROVED',
        },
      ],
    });
  }

  const today = todayKey();
  const month = today.slice(0, 7);
  const year = today.slice(0, 4);

  const biblePlanCount = await prisma.biblePlan.count();
  if (biblePlanCount === 0) {
    await prisma.biblePlan.createMany({
      data: [
        {
          type: 'DAILY',
          periodKey: today,
          title: 'Daily Reading Plan',
          imageUrl: '/images/lion.jpeg',
          description: 'Follow along with today\'s scripture readings.',
        },
        {
          type: 'MONTHLY',
          periodKey: month,
          title: 'Monthly Bible Plan',
          imageUrl: '/images/lion.jpeg',
          description: 'Your reading guide for this month.',
        },
        {
          type: 'YEARLY',
          periodKey: year,
          title: 'Yearly Bible Plan',
          imageUrl: '/images/lion.jpeg',
          description: 'Walk through the Bible this year.',
        },
      ],
    });
  }

  const flyerCount = await prisma.flyer.count();
  if (flyerCount === 0) {
    await prisma.flyer.create({
      data: {
        title: 'Weekly Ministry Flyer',
        imageUrl: '/images/lion.jpeg',
        isActive: true,
      },
    });
  }

  console.log('Seed complete.');
  console.log(`Admin login: ${adminEmail}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
