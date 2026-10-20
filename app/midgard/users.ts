import { get, put } from "@vercel/blob";
import { storageReady } from "./storage";

/**
 * Користувачі дашборду MIDGARD — у приватному Blob midgard/users.json, керуються на сайті (/midgard/users).
 * Реєстрація лише за запрошенням: власник чи сисадмін створює посилання для ролі (пошта — за бажанням),
 * людина сама вводить пошту й пароль. Те саме посилання з прив'язаною поштою — для скидання пароля.
 * Паролі — лише хеш PBKDF2-SHA256 із сіллю, токени запрошень — лише SHA-256.
 * Тут же — випадковий секрет підпису сесій, щоб вхід не залежав від змінних Vercel.
 */
export type Role = "owner" | "sysadmin" | "supervisor" | "director";
export const ROLES = new Set<Role>(["owner", "sysadmin", "supervisor", "director"]);
export const ROLE_LABEL: Record<Role, string> = { owner: "Власник", sysadmin: "Сисадмін", supervisor: "Супервізор", director: "Директор школи" };

export type StoredUser = { email: string; role: Role; hash: string; salt: string; createdBy?: string; createdAt?: string };
export type Invite = {
  id: string;
  tokenHash: string;
  role: Role;
  email?: string; // прив'язана пошта (обов'язково для скидання пароля)
  reset?: boolean;
  exp: number;
  createdBy: string;
  createdAt: string;
};
type Store = { users: StoredUser[]; invites: Invite[]; secret?: string };

const PATH = "midgard/users.json";
const CACHE_MS = 120_000; // читання — simple operation Blob; кеш на інстанс, скидається при записі
const INVITE_DAYS = 7;
const ITERATIONS = 100_000;

let cache: { at: number; store: Store } | null = null;

const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/[+/=]/g, (c) => ({ "+": "-", "/": "_", "=": "" })[c]!);
const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const random = (n: number) => b64url(crypto.getRandomValues(new Uint8Array(n)));

export async function readStore(fresh = false): Promise<Store> {
  if (!storageReady()) return { users: [], invites: [] };
  if (!fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.store;
  const res = await get(PATH, { access: "private", useCache: false }).catch(() => null);
  let store: Store = { users: [], invites: [] };
  if (res && res.statusCode === 200) {
    try {
      const d = JSON.parse(await new Response(res.stream).text()) as Partial<Store>;
      store = {
        users: (d.users ?? []).filter((u) => u && typeof u.email === "string" && ROLES.has(u.role) && u.hash),
        invites: (d.invites ?? []).filter((i) => i && ROLES.has(i.role) && i.exp > Date.now()),
        secret: d.secret,
      };
    } catch {
      if (cache) store = cache.store;
    }
  } else if (cache) {
    store = cache.store; // збій читання — не викидаємо всіх із системи
  }
  cache = { at: Date.now(), store };
  return store;
}

export async function saveStore(store: Store) {
  const next = { ...store, secret: store.secret || random(32) };
  await put(PATH, JSON.stringify(next), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
  cache = { at: Date.now(), store: next };
  return next;
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
  const got = await pbkdf2(password, fromB64url(u.salt));
  if (got.length !== u.hash.length) return false;
  let diff = 0;
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ u.hash.charCodeAt(i);
  return diff === 0;
}

const sha256 = async (s: string) => b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));

/** Нове запрошення: у сховищі лише хеш токена, сам токен — тільки в посиланні. */
export async function makeInvite(fields: Omit<Invite, "id" | "tokenHash" | "exp" | "createdAt">) {
  const token = random(24);
  const invite: Invite = { ...fields, id: random(6), tokenHash: await sha256(token), exp: Date.now() + INVITE_DAYS * 864e5, createdAt: new Date().toISOString() };
  return { token, invite };
}

export async function findInvite(token: string) {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return null;
  const h = await sha256(token);
  return (await readStore(true)).invites.find((i) => i.tokenHash === h) ?? null;
}

/** Хто кого може запрошувати й редагувати: власник — усіх, сисадмін — директорів і супервізорів. */
export const canManageUsers = (role?: string) => role === "owner" || role === "sysadmin";
export const canManage = (actor: Role, target: Role) => actor === "owner" || (actor === "sysadmin" && (target === "director" || target === "supervisor"));

/** Мітка пароля для підпису сесії: зміна пароля чи видалення користувача робить старі сесії недійсними. */
export const passwordStamp = (u: StoredUser) => u.hash.slice(0, 12);

export const EMAIL = /^[^\s@|;]{1,64}@[^\s@|;]{1,190}\.[a-z]{2,}$/i;
