import { prisma } from './lib/db';
import { toDateKey, isFlyerDay } from './lib/dates';
import HomePage from './components/HomePage';

export default async function Home() {
  const today = toDateKey();
  const showFlyer = isFlyerDay();

  const [devotional, flyer] = await Promise.all([
    prisma.dailyDevotional.findUnique({ where: { date: today } }),
    showFlyer
      ? prisma.flyer.findFirst({
          where: { isActive: true },
          orderBy: { updatedAt: 'desc' },
        })
      : Promise.resolve(null),
  ]);

  return (
    <HomePage
      devotional={devotional}
      flyer={showFlyer ? flyer : null}
      showFlyer={showFlyer && !!flyer}
    />
  );
}
