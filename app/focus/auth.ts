import { createHash } from "node:crypto";

/**
 * Доступ до воркбуків FOCUS (forge-future.com/focus).
 * Користувачі: env FOCUS_USERS ("email|пароль;email|пароль"). Якщо її не задано — записи з
 * MIDGARD_USERS ("email|пароль[|роль]"), але лише власник: роль admin, пошта @forge-future.com
 * або пошта з OWNER_HASHES (SHA-256, щоб не світити адресу в публічному репо).
 * Звичайні користувачі MIDGARD (вчителі, супервізори, директор) сюди не потрапляють.
 * Сесія — підписаний cookie на 30 днів; без налаштувань доступ закритий.
 */
const OWNER_HASHES = ["c314ad478f668f37b8f64f445fcf3b117b659185a2e30d6fd28ae65d511992d2"];
const isOwner = (email: string, role?: string) =>
  role === "admin" ||
  email.endsWith("@forge-future.com") ||
  OWNER_HASHES.includes(createHash("sha256").update(email).digest("hex"));
export const COOKIE = "focus_session";
export const MAX_AGE = 60 * 60 * 24 * 30;
export const NOINDEX = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" };

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const unquote = (x: string) => x.trim().replace(/^["']|["']$/g, "").trim();
const rows = (raw: string) => unquote(raw).split(/[;\n]/).map((r) => unquote(r).split("|").map(unquote));

export function users() {
  const own = process.env.FOCUS_USERS ?? "";
  if (own.trim()) {
    return rows(own)
      .filter(([email, pass]) => email && pass)
      .map(([email, pass]) => ({ email: email.toLowerCase(), pass }));
  }
  return rows(process.env.MIDGARD_USERS ?? "")
    .filter(([email, pass, role]) => email && pass && isOwner(email.toLowerCase(), role))
    .map(([email, pass]) => ({ email: email.toLowerCase(), pass }));
}

async function sign(payload: string) {
  const secret = (process.env.FOCUS_USERS ?? "").trim() || (process.env.MIDGARD_USERS ?? "");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode("focus:" + secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/[+/=]/g, (c) => ({ "+": "-", "/": "_", "=": "" })[c]!);
}

export async function makeSession(email: string) {
  const payload = `${encodeURIComponent(email)}.${Math.floor(Date.now() / 1000) + MAX_AGE}`;
  return `${payload}.${await sign(payload)}`;
}

export async function validSession(request: Request) {
  if (!users().length) return false;
  const raw = (request.headers.get("cookie") ?? "").split(/;\s*/).find((c) => c.startsWith(COOKIE + "="));
  if (!raw) return false;
  const parts = raw.slice(COOKIE.length + 1).split(".");
  const sig = parts.pop(), exp = parts.pop(), email = parts.join(".");
  if (!email || !exp || !sig || Number(exp) < Date.now() / 1000) return false;
  if (!safeEqual(sig, await sign(`${email}.${exp}`))) return false;
  return users().some((u) => u.email === decodeURIComponent(email));
}

/** Ключ конвеєра CEO OS (той самий, що й для MIDGARD) — для завантаження файлів воркбуків скриптом. */
export function ingestAuthorized(request: Request) {
  const key = process.env.MIDGARD_INGEST_KEY ?? "";
  const got = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return key.length >= 32 && safeEqual(got, key);
}

/** Воркбуки: n → назва в сховищі й заголовок. */
export const BOOKS: Record<string, { file: string; title: string }> = {
  "1": { file: "focus/w1-focus-model.html", title: "FOCUS-модель" },
  "2": { file: "focus/w2-client-photofit.html", title: "Фоторобот клієнта" },
  "3": { file: "focus/w3-knockout-offer.html", title: "Нокаут-офер" },
};
export const statePath = (n: string) => `focus/state/${n}.json`;
