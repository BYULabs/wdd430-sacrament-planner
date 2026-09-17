import Link from 'next/link';
import { BookOpen, Users, Calendar, Clock, Lock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200 print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Ward & App Overview */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 ring-1 ring-navy-700">
                <BookOpen className="h-5 w-5 text-navy-200" />
              </span>
              <div>
                <p className="font-bold text-white">Oakridge Ward</p>
                <p className="text-xs text-navy-300">
                  Sacrament Meeting Planner
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-300">
              A full-stack web application for planning Sunday sacrament
              meetings — built for WDD 430: Web Full-Stack Development.
            </p>
          </div>

          {/* Internal Navigation Links */}
          <nav aria-label="Explore">
            <h2 className="text-xs font-bold uppercase tracking-widest text-navy-400">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/meetings" className="transition hover:text-white">
                  Meetings
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* External / Ward Auxiliary Resources */}
          <nav aria-label="Ward resources">
            <h2 className="text-xs font-bold uppercase tracking-widest text-navy-400">
              Ward Resources
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Users className="h-3.5 w-3.5" />
                  Ward Directory
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Stake Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Clock className="h-3.5 w-3.5" />
                  Building Scheduler
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Lock className="h-3.5 w-3.5" />
                  Admin Login
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-navy-800/70 pt-6 text-xs text-navy-300 sm:flex-row">
          <p>
            © {currentYear} Oakridge Ward · WDD 430: Web Full-Stack Development
          </p>
          <p className="flex items-center gap-4">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <span aria-hidden="true" className="text-navy-600">
              ·
            </span>
            <a href="#" className="transition hover:text-white">
              Handbook
            </a>
            <span aria-hidden="true" className="text-navy-600">
              ·
            </span>
            <a href="#" className="transition hover:text-white">
              Contact the Bishopric
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
