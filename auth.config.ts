import type { NextAuthConfig } from 'next-auth';

// Bishopric-only routes: the create form and every edit form.
function isProtectedPath(pathname: string) {
  return (
    pathname === '/meetings/new' || /^\/meetings\/[^/]+\/edit$/.test(pathname)
  );
}

// Runs in proxy.ts, so it must not import Node-only code like bcrypt or the DB.
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isProtectedPath(nextUrl.pathname)) {
        // Returning false redirects to the sign-in page.
        return isLoggedIn;
      }

      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Added in auth.ts
} satisfies NextAuthConfig;
