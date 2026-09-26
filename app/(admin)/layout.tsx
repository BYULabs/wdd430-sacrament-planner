import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Meeting · Oakridge Ward Planner',
  description: 'Schedule a new sacrament meeting program.',
};

export default function NewMeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
