import type { Metadata } from 'next';
import { LoginForm } from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In · Oakridge Ward Planner',
  description: 'Bishopric sign-in for managing sacrament meeting programs.',
};

export default async function LoginPage(props: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const searchParams = await props.searchParams;

  // Auth.js sends an absolute callbackUrl. Keep only its path so sign-in can
  // never redirect to another site.
  const callbackUrl = searchParams?.callbackUrl;
  let redirectTo = '/meetings';
  if (callbackUrl) {
    const url = new URL(callbackUrl, 'http://localhost');
    redirectTo = url.pathname + url.search;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-20">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <p className="eyebrow">Bishopric Access</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Sign In
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to create, edit, or delete meeting programs.
        </p>

        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
