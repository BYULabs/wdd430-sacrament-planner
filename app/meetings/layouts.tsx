import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meetings Directory · Oakridge Ward Planner',
  description:
    'Browse, review, and print past and upcoming sacrament meeting agendas.',
};

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone-50 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </div>
  );
}
