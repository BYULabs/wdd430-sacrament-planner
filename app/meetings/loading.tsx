export default function MeetingsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-6">
        <div className="space-y-3">
          <div className="h-3 w-28 bg-slate-200 rounded" />
          <div className="h-8 w-64 bg-slate-300 rounded-lg" />
          <div className="h-4 w-96 bg-slate-200 rounded" />
        </div>
        <div className="h-8 w-36 bg-slate-200 rounded-lg self-start" />
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-12 bg-slate-200 rounded" />
        <div className="h-7 w-24 bg-slate-200 rounded-full" />
        <div className="h-7 w-20 bg-slate-200 rounded-full" />
        <div className="h-7 w-20 bg-slate-200 rounded-full" />
        <div className="h-7 w-16 bg-slate-200 rounded-full" />
      </div>

      {/* Grid Skeleton Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-5 w-16 bg-slate-200 rounded-full" />
            </div>

            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-slate-300 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 rounded" />
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-slate-200 rounded" />
                <div className="h-3 w-28 bg-slate-200 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-slate-200 rounded" />
                <div className="h-3 w-28 bg-slate-200 rounded" />
              </div>
            </div>

            <div className="h-16 w-full bg-slate-100 rounded-lg" />
            <div className="h-10 w-full bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
