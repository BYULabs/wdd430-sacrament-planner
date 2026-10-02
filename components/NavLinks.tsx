'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Info, Plus } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Meetings', href: '/meetings', icon: Calendar },
  { name: 'About', href: '/about', icon: Info },
];

const adminNavItems = [
  { name: 'New Meeting', href: '/meetings/new', icon: Plus },
];

export function NavLinks({ isSignedIn }: { isSignedIn: boolean }) {
  const pathname = usePathname();
  const items = isSignedIn ? [...navItems, ...adminNavItems] : navItems;

  return (
    <nav aria-label="Primary" className="border-t border-navy-800/70">
      <div className="flex flex-wrap items-center gap-1 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
