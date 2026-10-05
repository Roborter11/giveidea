import { env } from 'cloudflare:workers';

type IdeaSubmission = {
  name: string;
  email: string;
  idea: string;
};

export async function sendIdeaEmail({ name, email, idea }: IdeaSubmission) {
  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const to = env.IDEAS_EMAIL_TO || process.env.IDEAS_EMAIL_TO;
  const from = env.IDEAS_EMAIL_FROM || process.env.IDEAS_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    throw new Error('Idea email delivery is not configured.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(15_000),
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: 'giveidea — новая идея',
      text: [
        'Новая идея с giveidea',
        '',
        `Имя: ${name}`,
        `Email: ${email}`,
        '',
        'Идея:',
        idea,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    // Do not log the provider response: it can contain contact details.
    throw new Error(`Idea email delivery failed (HTTP ${response.status}).`);
  }

  const result = (await response.json()) as { id?: unknown } | null;
  if (!result || typeof result.id !== 'string' || !result.id) {
    throw new Error('Email provider did not confirm acceptance.');
  }
}
