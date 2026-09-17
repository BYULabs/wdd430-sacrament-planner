'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-slate-200 pt-6"
    >
      <div className="flex flex-1 justify-start">
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-navy-900"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-100 bg-stone-50 px-3 py-2 text-xs font-semibold text-slate-300 cursor-not-allowed">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </span>
        )}
      </div>

      <div className="text-xs font-medium text-slate-600">
        Page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
        <span className="font-bold text-slate-900">{totalPages}</span>
      </div>

      <div className="flex flex-1 justify-end">
        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-navy-900"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-100 bg-stone-50 px-3 py-2 text-xs font-semibold text-slate-300 cursor-not-allowed">
            Next
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}