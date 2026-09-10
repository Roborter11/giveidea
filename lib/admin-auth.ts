import { env } from 'cloudflare:workers';

const COOKIE_NAME = 'sut-admin-session';
const SESSION_LABEL = 'sut-admin-session-v1';

function getAdminPassword() {
  const workerEnv = env as Cloudflare.Env & { ADMIN_PASSWORD?: string };
  return workerEnv.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '';
}

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const result = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(result), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

export async function isPasswordValid(candidate: string) {
  const password = getAdminPassword();
  if (!password) return false;

  const [candidateHash, passwordHash] = await Promise.all([
    digest(candidate),
    digest(password),
  ]);
  return safeEqual(candidateHash, passwordHash);
}

export async function createSessionToken() {
  const password = getAdminPassword();
  if (!password) throw new Error('ADMIN_PASSWORD is not configured.');
  return digest(`${SESSION_LABEL}:${password}`);
}

export async function isAdminRequest(request: Request) {
  const password = getAdminPassword();
  if (!password) return false;

  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);

  if (!token) return false;
  const expected = await digest(`${SESSION_LABEL}:${password}`);
  return safeEqual(token, expected);
}

export function sessionCookie(token: string) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800${secure}`;
}

export function expiredSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0${secure}`;
}

export function isAdminConfigured() {
  return Boolean(getAdminPassword());
}
