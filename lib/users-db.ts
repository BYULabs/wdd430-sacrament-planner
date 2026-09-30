import { neon } from '@neondatabase/serverless';
import type { User } from './types';

const sql = neon(process.env.DATABASE_URL!);

export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await sql`
    SELECT id, name, email, password_hash AS "passwordHash"
    FROM users WHERE email = ${email.toLowerCase()}
  `;

  return (rows[0] as unknown as User) ?? null;
}
