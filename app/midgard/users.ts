import { get, put } from "@vercel/blob";
import { storageReady } from "./storage";

/**
 * Користувачі дашборду MIDGARD, яких адмін додає на сайті (/midgard/users), — у приватному Blob
 * midgard/users.json. Паролі — лише хеш PBKDF2-SHA256 із сіллю. Новий користувач отримує
 * одноразове посилання-запрошення (діє 7 днів) і сам задає пароль; те саме посилання — для скидання пароля.
 * Користувачі з env MIDGARD_USERS лишаються як запасний вхід (адміна не можна «замкнути» зі сховища).
 */
export type Role = "admin" | "supervisor" | "director";
export const ROLES = new Set<Role>(["admin", "supervisor", "director"]);

export type StoredUser = {
  email: string;
  role: Role;
  hash?: string; // base64url PBKDF2; без хеша — пароль ще не задано (чекає запрошення)
  salt?: string;
  invite?: { tokenHash: string; exp: number };
  createdBy?: string;
  createdAt?: string;
};

const PATH = "midgard/users.json";
const CACHE_MS = 120_000; // читання — simple operation Blob; кеш на інстанс, скидається при записі
const INVITE_DAYS = 7;
const ITERATIONS = 100_000;

let cache: { at: number; users: StoredUser[] } | null = null;

const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/[+/=]/g, (c) => ({ "+": "-", "/": "_", "=": "" })[c]!);
const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

export async function storedUsers(fresh = false): Promise<StoredUser[]> {
  if (!storageReady()) return [];
  if (!fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.users;
  const res = await get(PATH, { access: "private", useCache: false }).catch(() => null);
  let users: StoredUser[] = [];
  if (res && res.statusCode === 200) {
    try {
      const data = JSON.parse(await new Response(res.stream).text()) as { users?: StoredUser[] };
      users = Array.isArray(data.users) ? data.users.filter((u) => u && typeof u.email === "string" && ROLES.has(u.role)) : [];
    } catch {
      users = cache?.users ?? [];
    }
  } else if (cache) {
    users = cache.users; // збій читання — не викидаємо всіх із системи
  }
  cache = { at: Date.now(), users };
  return users;
}

export async function saveUsers(users: StoredUser[]) {
  await put(PATH, JSON.stringify({ users }), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
  cache = { at: Date.now(), users };
}

async function pbkdf2(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  return b64url(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations: ITERATIONS }, key, 256));
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return { salt: b64url(salt), hash: await pbkdf2(password, salt) };
}

export async function checkPassword(u: StoredUser, password: string) {
  if (!u.hash || !u.salt) return false;
  const got = await pbkdf2(password, fromB64url(u.salt));
  if (got.length !== u.hash.length) return false;
  let diff = 0;
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ u.hash.charCodeAt(i);
  return diff === 0;
}

const sha256 = async (s: string) => b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));

/** Нове запрошення: у сховищі лише хеш токена, сам токен — тільки в посиланні. */
export async function newInvite() {
  const token = b64url(crypto.getRandomValues(new Uint8Array(24)));
  return { token, invite: { tokenHash: await sha256(token), exp: Date.now() + INVITE_DAYS * 864e5 } };
}

export async function findByInvite(token: string) {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return null;
  const h = await sha256(token);
  const users = await storedUsers(true);
  return users.find((u) => u.invite && u.invite.tokenHash === h && u.invite.exp > Date.now()) ?? null;
}

/** Мітка пароля для підпису сесії: зміна пароля чи видалення користувача робить старі сесії недійсними. */
export const passwordStamp = (u: StoredUser) => (u.hash ?? "").slice(0, 12);

export const EMAIL = /^[^\s@|;]{1,64}@[^\s@|;]{1,190}\.[a-z]{2,}$/i;
