'use client';

import { useActionState, useState } from 'react';
import { LogIn } from 'lucide-react';
import { authenticate } from '../lib/actions';

const inputClass =
  'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200 aria-invalid:border-red-400';
const labelClass = 'block text-sm font-semibold text-slate-700';

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  // Controlled so the email survives React's form reset after a failed attempt.
  const [email, setEmail] = useState('');

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={errorMessage ? true : undefined}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          minLength={6}
          required
          aria-invalid={errorMessage ? true : undefined}
          className={inputClass}
        />
      </div>

      {/* Auth.js reads this field to decide where to go after sign-in. */}
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        <LogIn className="h-4 w-4" />
        {isPending ? 'Signing in…' : 'Sign In'}
      </button>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
