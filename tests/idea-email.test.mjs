import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

function createHandler({ configured = true, deliver } = {}) {
  const calls = [];
  const env = configured
    ? {
        RESEND_API_KEY: 'test-key',
        IDEAS_EMAIL_TO: 'owner@example.com',
        IDEAS_EMAIL_FROM: 'giveidea <ideas@example.com>',
      }
    : {};
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    });
    const module = { exports: {} };
    runInNewContext(outputText, {
      module,
      exports: module.exports,
      require(specifier) {
        if (specifier === 'cloudflare:workers') return { env };
        if (specifier === '@/lib/idea-email') return load('lib/idea-email.ts');
        if (specifier === '@/lib/i18n') return load('lib/i18n.ts');
        throw new Error(
          `Unexpected dependency (including database access): ${specifier}`,
        );
      },
      Request,
      Response,
      AbortSignal,
      process: { env: {} },
      console: { error() {} },
      async fetch(url, options) {
        calls.push({ url, options, body: JSON.parse(options.body) });
        return deliver ? deliver() : Response.json({ id: 'email-test-id' });
      },
    });
    cache.set(file, module.exports);
    return module.exports;
  }
  return { POST: load('app/api/ideas/route.ts').POST, calls };
}

const validIdea = {
  name: '  Алексей  ',
  email: '  AUTHOR@EXAMPLE.COM ',
  idea: '  Идея продукта для удобного планирования задач.\nВторая строка.  ',
  locale: 'ru',
};
const request = (body) =>
  new Request('https://giveidea.xyz/api/ideas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

test('emails the full idea to the configured owner, with author reply-to and no database dependency', async () => {
  const { POST, calls } = createHandler();
  const response = await POST(
    request({ ...validIdea, to: 'attacker@example.com' }),
  );
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  assert.deepEqual(calls[0].body.to, ['owner@example.com']);
  assert.equal(calls[0].body.reply_to, 'author@example.com');
  assert.equal(calls[0].body.from, 'giveidea <ideas@example.com>');
  assert.ok(calls[0].body.text.includes(validIdea.idea.trim()));
  assert.ok(calls[0].body.text.includes('Имя: Алексей'));
});

test('invalid input and honeypot submissions never send email', async () => {
  const { POST, calls } = createHandler();
  for (const body of [
    null,
    [],
    { ...validIdea, name: 'a' },
    { ...validIdea, email: 'bad' },
    { ...validIdea, idea: 'short' },
    { ...validIdea, idea: 'x'.repeat(5001) },
  ]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  const malformed = new Request('https://giveidea.xyz/api/ideas', {
    method: 'POST',
    body: '{',
  });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal(
    (await POST(request({ ...validIdea, website: 'spam' }))).status,
    201,
  );
  assert.equal(calls.length, 0);
});

test('missing configuration returns a localized error without pretending success', async () => {
  const { POST, calls } = createHandler({ configured: false });
  const response = await POST(request(validIdea));
  assert.equal(response.status, 500);
  assert.equal(
    (await response.json()).error,
    'Не получилось отправить идею. Попробуйте ещё раз.',
  );
  assert.equal(calls.length, 0);
});

test('provider rejection, network failure, and unconfirmed acceptance are errors', async () => {
  for (const deliver of [
    () =>
      Response.json({ message: 'private provider details' }, { status: 403 }),
    () => {
      throw new Error('network unavailable');
    },
    () => Response.json({}),
    () => Response.json(null),
  ]) {
    const { POST } = createHandler({ deliver });
    const response = await POST(request(validIdea));
    assert.equal(response.status, 500);
    const body = await response.json();
    assert.equal(body.ok, undefined);
    assert.equal(
      body.error,
      'Не получилось отправить идею. Попробуйте ещё раз.',
    );
  }
});

test('submission waits until the provider accepts the email', async () => {
  let accept;
  const accepted = new Promise((resolve) => {
    accept = resolve;
  });
  const { POST } = createHandler({ deliver: () => accepted });
  let completed = false;
  const result = POST(request(validIdea)).then((response) => {
    completed = true;
    return response;
  });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(completed, false);
  accept(Response.json({ id: 'accepted' }));
  assert.equal((await result).status, 201);
});
