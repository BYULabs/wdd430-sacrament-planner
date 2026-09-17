// loading.tsx
import { ArrowLeft } from 'lucide-react';

export default function MeetingDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-6 animate-pulse">
      {/* Back Link Skeleton */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Meetings Directory</span>
        </div>
      </div>

      {/* MeetingDetail Component Skeleton */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="h-4 w-32 bg-slate-200 rounded" />
          <div className="h-8 w-3/4 bg-slate-200 rounded" />
          <div className="h-4 w-48 bg-slate-200 rounded" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-4">
            <div className="h-5 w-28 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
            <div className="h-4 w-2/3 bg-slate-100 rounded" />
          </div>
          <div className="space-y-4">
            <div className="h-5 w-28 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-4/5 bg-slate-100 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}