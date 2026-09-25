'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex-1 min-w-[260px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search meetings"
        className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
      />
    </div>
  );
}
