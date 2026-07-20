import bcrypt from 'bcryptjs';
import { prisma } from '../app/lib/db';
import { PRAYERS } from '../app/lib/prayers';

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
      name: 'Ministry Bands',
      price: 12.99,
      image: 'CircleDot',
      imageUrl: '/images/bands.jpeg',
      category: 'Apparel',
      description:
        'Wearable reminder of faith and unity — ministry bands supporting Glory Prayer Ministry outreach.',
    },
    {
      name: 'Prayer Shawls',
      price: 49.99,
      image: 'Package',
      imageUrl: '/images/shawk.jpeg',
      category: 'Apparel',
      description:
        'Handcrafted prayer shawls for comfort in prayer, made with love and blessed by our ministry.',
    },
    {
      name: 'Ministry Brooch',
      price: 14.99,
      image: 'Gem',
      imageUrl: '/images/broocha.jpeg',
      category: 'Gifts',
      description:
        'An elegant ministry brooch to wear as a symbol of faith and belonging in Christ.',
    },
    {
      name: 'Ministry Coins',
      price: 9.99,
      image: 'Coins',
      imageUrl: '/images/coins.jpeg',
      category: 'Gifts',
      description:
        'Commemorative ministry coins — a meaningful keepsake and gift of encouragement in faith.',
    },
  ];

  await prisma.product.deleteMany({});
  await prisma.product.createMany({ data: products });

  const prayerCount = await prisma.prayer.count();
  if (prayerCount === 0) {
    await prisma.prayer.createMany({
      data: PRAYERS.map((prayer, index) => ({
        title: prayer.title,
        category: prayer.category,
        description: prayer.description,
        scripture: prayer.scripture,
        text: prayer.text,
        sortOrder: index,
        isActive: true,
      })),
    });
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
