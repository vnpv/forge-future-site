/**
 * Доступ до дашборду MIDGARD: користувачі з env MIDGARD_USERS ("email|пароль;email|пароль"),
 * сесія — підписаний cookie. Спільне для сторінки, відео і завантаження записів.
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

export type Role = "admin" | "supervisor" | "director";
const ROLES = new Set(["admin", "supervisor", "director"]);

/** MIDGARD_USERS: "email|пароль|роль;…", роль — admin | supervisor | director (за замовчуванням director). */
export function users() {
  const unquote = (x: string) => x.trim().replace(/^["']|["']$/g, "").trim();
  return unquote(process.env.MIDGARD_USERS ?? "")
    .split(/[;\n]/)
    .map((row) => unquote(row).split("|").map(unquote))
    .filter(([email, pass]) => email && pass)
    .map(([email, pass, role]) => ({ email: email.toLowerCase(), pass, role: (ROLES.has(role) ? role : "director") as Role }));
}

async function sign(payload: string) {
  const secret = process.env.MIDGARD_USERS ?? "";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode("midgard:" + secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/[+/=]/g, (c) => ({ "+": "-", "/": "_", "=": "" })[c]!);
}

export async function makeSession(email: string) {
  const payload = `${encodeURIComponent(email)}.${Math.floor(Date.now() / 1000) + MAX_AGE}`;
  return `${payload}.${await sign(payload)}`;
}

/** Поточний користувач за cookie-сесією або null. */
export async function currentUser(request: Request) {
  if (!users().length) return null; // без налаштувань — доступ закрито
  const raw = (request.headers.get("cookie") ?? "").split(/;\s*/).find((c) => c.startsWith(COOKIE + "="));
  if (!raw) return null;
  // email містить крапки, тож розбираємо з кінця: <email>.<exp>.<sig>
  const parts = raw.slice(COOKIE.length + 1).split(".");
  const sig = parts.pop(), exp = parts.pop(), email = parts.join(".");
  if (!email || !exp || !sig || Number(exp) < Date.now() / 1000) return null;
  if (!safeEqual(sig, await sign(`${email}.${exp}`))) return null;
  const u = users().find((x) => x.email === decodeURIComponent(email));
  return u ? { email: u.email, role: u.role } : null;
}

export async function validSession(request: Request) {
  return (await currentUser(request)) !== null;
}

export const canReview = (role?: Role) => role === "supervisor" || role === "admin";

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
