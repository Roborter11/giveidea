import {
  createSessionToken,
  isAdminConfigured,
  isPasswordValid,
  sessionCookie,
} from '@/lib/admin-auth';

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return Response.json(
      { error: 'Пароль администратора ещё не настроен.' },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    password?: unknown;
  };
  const password = typeof body.password === 'string' ? body.password : '';

  if (!(await isPasswordValid(password))) {
    return Response.json({ error: 'Неверный пароль.' }, { status: 401 });
  }

  const token = await createSessionToken();
  return Response.json(
    { ok: true },
    { headers: { 'Set-Cookie': sessionCookie(token) } },
  );
}
