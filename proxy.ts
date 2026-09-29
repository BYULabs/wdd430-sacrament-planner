import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Skip API routes, Next.js internals, and static images.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|ico)$).*)'],
};
