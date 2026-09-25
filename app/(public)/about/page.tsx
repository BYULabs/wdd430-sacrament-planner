import Link from 'next/link';
import {
  BookOpen,
  Layers,
  Printer,
  Code,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-8">
        <p className="eyebrow">WDD 430 Course Project</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          About Sacrament Meeting Planner
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
          A full-stack web application developed to help ward bishoprics and
          leaders plan, manage, and print reverent Sunday sacrament meeting
          agendas.
        </p>
      </div>

      {/* Main Content & Purpose */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">
            Purpose &amp; Design
          </h2>
          <p>
            The Sacrament Meeting Planner streamlines administrative leadership
            duties while providing members with clean digital access to weekly
            worship agendas. It organizes announcements, prayers, ward and stake
            business, hymns, musical numbers, and speakers into a clean
            presentation.
          </p>
          <p>
            Built as a course assignment for{' '}
            <strong>WDD 430: Web Full-Stack Development</strong>, this app
            demonstrates modern client and server web patterns using Next.js,
            TypeScript, Tailwind CSS, and optimized media handling.
          </p>

          <div className="pt-4">
            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              Browse Meeting Directory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Feature Grid Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <BookOpen className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold text-slate-900">Typed Data Models</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Structured TypeScript interfaces for Sacrament Meetings, Hymns,
              and Speakers.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Printer className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold text-slate-900">Print-Optimized</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Tailored Tailwind media print styles ensure programs format onto a
              single printed page.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Layers className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold text-slate-900">
              App Router &amp; Layouts
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Leverages Next.js nested layouts, client components, and
              server-side data fetching.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Sparkles className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold text-slate-900">Tailwind CSS v4</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Custom color tokens, responsive grids, and clean visual
              typography.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Specs Summary Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Code className="h-5 w-5 text-navy-600" />
          Technical Stack
        </h2>

        <div className="grid gap-3 sm:grid-cols-3 text-sm border-t border-slate-100 pt-4">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">Framework</p>
              <p className="text-xs text-slate-500">Next.js App Router</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">Styling</p>
              <p className="text-xs text-slate-500">Tailwind CSS v4</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">Icons &amp; Fonts</p>
              <p className="text-xs text-slate-500">
                Lucide React &amp; Inter Font
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
