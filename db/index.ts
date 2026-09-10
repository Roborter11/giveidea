import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb() {
  if (!env.DB) {
    throw new Error(
      'Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database.',
    );
  }

  return drizzle(env.DB, { schema });
}

export async function ensureIdeasSchema() {
  const d1 = env.DB;

  if (!d1) {
    throw new Error('Cloudflare D1 binding `DB` is unavailable.');
  }

  await d1.batch([
    d1.prepare(`
      CREATE TABLE IF NOT EXISTS ideas (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        idea TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at INTEGER NOT NULL
      )
    `),
    d1.prepare(`
      CREATE INDEX IF NOT EXISTS idx_ideas_created_at
      ON ideas(created_at DESC)
    `),
  ]);

  await d1.prepare('PRAGMA optimize').run();
}
