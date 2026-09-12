import { getDb, ensureIdeasSchema } from '@/db';
import { ideas } from '@/db/schema';
import { getMessages } from '@/lib/i18n';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let requestLocale: unknown;

  try {
    const body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      idea?: unknown;
      website?: unknown;
      locale?: unknown;
    };

    requestLocale = body.locale;
    const t = getMessages(body.locale).form;

    if (body.website) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const idea = typeof body.idea === 'string' ? body.idea.trim() : '';

    if (name.length < 2 || name.length > 100) {
      return Response.json({ error: t.nameError }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return Response.json({ error: t.emailError }, { status: 400 });
    }
    if (idea.length < 20 || idea.length > 5000) {
      return Response.json({ error: t.ideaError }, { status: 400 });
    }

    await ensureIdeasSchema();
    await getDb().insert(ideas).values({
      id: crypto.randomUUID(),
      name,
      email,
      idea,
      status: 'new',
      createdAt: new Date(),
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to save idea', error);
    return Response.json(
      { error: getMessages(requestLocale).form.submitError },
      { status: 500 },
    );
  }
}
