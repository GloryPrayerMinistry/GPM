export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/app/lib/db';
import { BookOpen, ShoppingBag, MessageSquareQuote, Clock, ImageIcon, CalendarRange } from 'lucide-react';

export default async function AdminDashboard() {
  const [
    devotionalCount,
    biblePlanCount,
    flyerCount,
    productCount,
    pendingTestimonies,
    approvedTestimonies,
  ] = await Promise.all([
    prisma.dailyDevotional.count(),
    prisma.biblePlan.count(),
    prisma.flyer.count({ where: { isActive: true } }),
    prisma.product.count(),
    prisma.testimony.count({ where: { status: 'PENDING' } }),
    prisma.testimony.count({ where: { status: 'APPROVED' } }),
  ]);

  const stats = [
    {
      label: 'Daily Devotionals',
      value: devotionalCount,
      icon: BookOpen,
      href: '/admin/daily-devotionals',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Bible Plans',
      value: biblePlanCount,
      icon: CalendarRange,
      href: '/admin/bible-plans',
      color: 'bg-indigo-50 text-indigo-700',
    },
    {
      label: 'Active Flyers',
      value: flyerCount,
      icon: ImageIcon,
      href: '/admin/flyers',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      label: 'Shop Products',
      value: productCount,
      icon: ShoppingBag,
      href: '/admin/products',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Pending Testimonies',
      value: pendingTestimonies,
      icon: Clock,
      href: '/admin/testimonies',
      color: 'bg-orange-50 text-orange-700',
    },
    {
      label: 'Approved Testimonies',
      value: approvedTestimonies,
      icon: MessageSquareQuote,
      href: '/admin/testimonies',
      color: 'bg-green-50 text-green-700',
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome to the Glory Prayer Ministry admin portal.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-2.5 rounded-lg ${stat.color} mb-4`}>
                <Icon size={20} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
