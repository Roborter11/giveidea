import { desc, eq } from 'drizzle-orm';

import { ensureIdeasSchema, getDb } from '@/db';
import { ideas } from '@/db/schema';
import { isAdminRequest } from '@/lib/admin-auth';

const VALID_STATUSES = new Set(['new', 'reviewed', 'archived']);

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureIdeasSchema();
  const rows = await getDb()
    .select()
    .from(ideas)
    .orderBy(desc(ideas.createdAt));
  return Response.json({ ideas: rows });
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    id?: unknown;
    status?: unknown;
  };
  const id = typeof body.id === 'string' ? body.id : '';
  const status = typeof body.status === 'string' ? body.status : '';

  if (!id || !VALID_STATUSES.has(status)) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  await ensureIdeasSchema();
  await getDb().update(ideas).set({ status }).where(eq(ideas.id, id));
  return Response.json({ ok: true });
}
