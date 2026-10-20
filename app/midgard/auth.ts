import { ROLES, type Role, type StoredUser, checkPassword, passwordStamp, readStore } from "./users";
export type { Role } from "./users";

/**
 * Доступ до дашборду MIDGARD: користувачі зі сховища (реєструються за запрошенням на /midgard/users)
 * і запасний вхід з env MIDGARD_USERS, сесія — підписаний cookie. Спільне для сторінки, відео і завантаження записів.
 */
export const COOKIE = "midgard_session";
export const MAX_AGE = 60 * 60 * 24 * 30;
export const NOINDEX = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" };

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Запасний вхід MIDGARD_USERS: "email|пароль|роль;…". Роль admin (стара назва) = власник, без ролі — супервізор. */
const DEFAULT_ROLE: Role = "supervisor";
export function users() {
  const unquote = (x: string) => x.trim().replace(/^["']|["']$/g, "").trim();
  return unquote(process.env.MIDGARD_USERS ?? "")
    .split(/[;\n]/)
    .map((row) => unquote(row).split("|").map(unquote))
    .filter(([email, pass]) => email && pass)
    .map(([email, pass, role]) => ({
      email: email.toLowerCase(),
      pass,
      role: (role === "admin" ? "owner" : ROLES.has(role as Role) ? role : DEFAULT_ROLE) as Role,
    }));
}

// Секрет підпису сесій: MIDGARD_SESSION_SECRET, інакше як раніше MIDGARD_USERS (щоб не скидати чинні сесії),
// інакше випадковий секрет зі сховища — тоді вхід узагалі не потребує змінних Vercel
async function sessionSecret() {
  return (process.env.MIDGARD_SESSION_SECRET ?? "").trim() || (process.env.MIDGARD_USERS ?? "").trim() || ((await readStore().catch(() => null))?.secret ?? "");
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode("midgard:" + (await sessionSecret())), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/[+/=]/g, (c) => ({ "+": "-", "/": "_", "=": "" })[c]!);
}

type Account = { email: string; role: Role; stored?: StoredUser };

/** Користувач за поштою: спершу сховище, потім запасний вхід з env. */
async function findAccount(email: string, fresh = false): Promise<Account | null> {
  const stored = (await readStore(fresh).catch(() => null))?.users.find((u) => u.email === email);
  if (stored) return { email: stored.email, role: stored.role, stored };
  const env = users().find((u) => u.email === email);
  return env ? { email: env.email, role: env.role } : null;
}

/** Перевірка пошти й пароля для форми входу. */
export async function authenticate(email: string, password: string) {
  email = email.toLowerCase();
  const a = await findAccount(email, true);
  if (a?.stored) return checkPassword(a.stored, password);
  return users().some((u) => safeEqual(u.email, email) && safeEqual(u.pass, password));
}

// Підпис сесії користувача зі сховища включає мітку пароля: після зміни пароля старі сесії недійсні
const sessionPayload = (email: string, exp: string, a: Account) => (a.stored ? `${email}.${exp}.${passwordStamp(a.stored)}` : `${email}.${exp}`);

export async function makeSession(email: string) {
  const a = await findAccount(email, true);
  const e = encodeURIComponent(email), exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  return `${e}.${exp}.${await sign(a ? sessionPayload(e, exp, a) : `${e}.${exp}`)}`;
}

/** Поточний користувач за cookie-сесією або null. */
export async function currentUser(request: Request) {
  const raw = (request.headers.get("cookie") ?? "").split(/;\s*/).find((c) => c.startsWith(COOKIE + "="));
  if (!raw || !(await sessionSecret())) return null; // без налаштувань — доступ закрито
  // email містить крапки, тож розбираємо з кінця: <email>.<exp>.<sig>
  const parts = raw.slice(COOKIE.length + 1).split(".");
  const sig = parts.pop(), exp = parts.pop(), email = parts.join(".");
  if (!email || !exp || !sig || Number(exp) < Date.now() / 1000) return null;
  const a = await findAccount(decodeURIComponent(email));
  if (!a || !safeEqual(sig, await sign(sessionPayload(email, exp, a)))) return null;
  return { email: a.email, role: a.role };
}

export async function validSession(request: Request) {
  return (await currentUser(request)) !== null;
}

export const canReview = (role?: Role) => role === "supervisor" || role === "sysadmin" || role === "owner";

/** Ідентифікатор уроку з results/*.json (напр. hist0126) — ключ файлу запису. */
export const LESSON_ID = /^[a-z0-9-]{3,40}$/;
export const videoPath = (id: string) => `midgard/video/${id}.mp4`;
export const posterPath = (id: string) => `midgard/posters/${id}.jpg`;

/** Ключ конвеєра аналізу (CEO OS) для завантаження записів без входу: env MIDGARD_INGEST_KEY. */
export function ingestAuthorized(request: Request) {
  const key = process.env.MIDGARD_INGEST_KEY ?? "";
  const got = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return key.length >= 32 && safeEqual(got, key);
}
