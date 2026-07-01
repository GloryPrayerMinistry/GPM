'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  MessageSquareQuote,
  LogOut,
  ExternalLink,
  ImageIcon,
  CalendarRange,
} from 'lucide-react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/daily-devotionals', label: 'Daily Devotionals', icon: BookOpen },
  { href: '/admin/bible-plans', label: 'Bible Plans', icon: CalendarRange },
  { href: '/admin/flyers', label: 'Flyers', icon: ImageIcon },
  { href: '/admin/products', label: 'Shop Products', icon: ShoppingBag },
  { href: '/admin/testimonies', label: 'Testimonies', icon: MessageSquareQuote },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-navy border-r border-gold/10 flex flex-col min-h-screen">
      <div className="p-6 border-b border-gold/10">
        <h1 className="text-lg font-bold text-cream">Admin Portal</h1>
        <p className="text-cream/50 text-xs mt-1">Glory Prayer Ministry</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gold text-navy'
                  : 'text-cream/70 hover:bg-white/5 hover:text-cream'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gold/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 text-sm text-cream/60 hover:text-cream transition-colors"
        >
          <ExternalLink size={16} />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-cream/60 hover:text-red-300 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
