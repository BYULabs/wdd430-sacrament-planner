import Link from 'next/link';
import { BookOpen, Calendar } from 'lucide-react';
import { NavLinks } from './NavLinks';

export function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="print:hidden">
      <div className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Top Bar: Ward Name & Current Date */}
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 ring-1 ring-navy-700 transition group-hover:bg-navy-700">
                <BookOpen className="h-5 w-5 text-navy-200" />
              </span>
              <div>
                <p className="text-base font-bold leading-tight text-white sm:text-lg">
                  Oakridge Ward
                </p>
                <p className="text-xs text-navy-300">
                  Sacrament Meeting Planner
                </p>
              </div>
            </Link>

            <p className="flex items-center gap-2 text-sm font-medium text-navy-200">
              <Calendar className="h-4 w-4" />
              <span>{currentDate}</span>
            </p>
          </div>

          {/* Primary Navigation */}
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
