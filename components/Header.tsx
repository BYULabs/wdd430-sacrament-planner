import Link from 'next/link';
import { BookOpen, Calendar, LogIn } from 'lucide-react';
import { auth } from '@/auth';
import { NavLinks } from './NavLinks';
import { SignOutButton } from './SignOutButton';

export async function Header() {
  const session = await auth();
  const user = session?.user;

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

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="flex items-center gap-2 text-sm font-medium text-navy-200">
                <Calendar className="h-4 w-4" />
                <span>{currentDate}</span>
              </p>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-navy-300">
                    {user.name ?? user.email}
                  </span>
                  <SignOutButton />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-navy-200 ring-1 ring-navy-700 transition hover:bg-navy-800 hover:text-white"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Primary Navigation */}
          <NavLinks isSignedIn={!!user} />
        </div>
      </div>
    </header>
  );
}
