import {
  createSessionToken,
  isAdminConfigured,
  isPasswordValid,
  sessionCookie,
} from '@/lib/admin-auth';
import { getMessages } from '@/lib/i18n';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    password?: unknown;
    locale?: unknown;
  };
  const t = getMessages(body.locale).admin;

  if (!isAdminConfigured()) {
    return Response.json({ error: t.passwordNotConfigured }, { status: 503 });
  }

  const password = typeof body.password === 'string' ? body.password : '';

  if (!(await isPasswordValid(password))) {
    return Response.json({ error: t.wrongPassword }, { status: 401 });
  }

  const token = await createSessionToken();
  return Response.json(
    { ok: true },
    { headers: { 'Set-Cookie': sessionCookie(token) } },
  );
}
