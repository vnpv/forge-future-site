import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { readText, writeText } from "./store";

/**
 * Акаунти FOCUS (forge-future.com/focus).
 *  • admin (власник): env FOCUS_USERS ("email|пароль;…"); якщо не задано — записи з MIDGARD_USERS,
 *    але лише власник: роль admin, пошта @forge-future.com або пошта з OWNER_HASHES (SHA-256).
 *  • student: зберігаються в приватному Blob focus/users.json (пароль — scrypt), створює admin на /focus/admin.
 * Сесія — підписаний cookie на 30 днів; без секрету доступ закритий.
 */
const OWNER_HASHES = ["c314ad478f668f37b8f64f445fcf3b117b659185a2e30d6fd28ae65d511992d2"];
const isOwner = (email: string, role?: string) =>
  role === "admin" || email.endsWith("@forge-future.com") || OWNER_HASHES.includes(createHash("sha256").update(email).digest("hex"));

export const COOKIE = "focus_session";
export const MAX_AGE = 60 * 60 * 24 * 30;
export const NOINDEX = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" };
export type Role = "admin" | "student";
/** business — власна справа/проєкт; career — старт кар'єри (портфоліо для першої роботи). */
export type Track = "business" | "career";
export const TRACKS: Track[] = ["business", "career"];
export const normTrack = (t: unknown): Track => (t === "career" ? "career" : "business");
export type Me = { email: string; role: Role; name: string; track: Track };

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const unquote = (x: string) => x.trim().replace(/^["']|["']$/g, "").trim();
const rows = (raw: string) => unquote(raw).split(/[;\n]/).map((r) => unquote(r).split("|").map(unquote));

function adminUsers() {
  const own = process.env.FOCUS_USERS ?? "";
  if (own.trim()) return rows(own).filter(([e, p]) => e && p).map(([e, p]) => ({ email: e.toLowerCase(), pass: p }));
  return rows(process.env.MIDGARD_USERS ?? "")
    .filter(([e, p, role]) => e && p && isOwner(e.toLowerCase(), role))
    .map(([e, p]) => ({ email: e.toLowerCase(), pass: p }));
}

/* ---------- учні в Blob ---------- */
export type Student = { email: string; name: string; track?: Track; salt: string; hash: string; createdAt: string };
const USERS_PATH = "focus/users.json";

export async function loadStudents(fresh = false): Promise<Student[]> {
  try {
    return (JSON.parse((await readText(USERS_PATH, fresh)) ?? "{}").users as Student[]) ?? [];
  } catch {
    return [];
  }
}
export const saveStudents = (users: Student[]) => writeText(USERS_PATH, JSON.stringify({ users }), "application/json");
const hashPass = (pass: string, salt: string) => scryptSync(pass, salt, 32).toString("hex");
export function makeStudent(email: string, name: string, password: string, track: Track = "business"): Student {
  const salt = randomBytes(16).toString("hex");
  return { email: email.toLowerCase(), name, track, salt, hash: hashPass(password, salt), createdAt: new Date().toISOString() };
}
export function newPassword() {
  const abc = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(randomBytes(10), (b) => abc[b % abc.length]).join("");
}

export async function verifyLogin(email: string, password: string): Promise<Me | null> {
  const e = email.trim().toLowerCase();
  if (adminUsers().some((u) => safeEqual(u.email, e) && safeEqual(u.pass, password))) return { email: e, role: "admin", name: "Власник", track: "business" };
  const s = (await loadStudents(true)).find((u) => u.email === e);
  if (s && timingSafeEqual(Buffer.from(hashPass(password, s.salt), "hex"), Buffer.from(s.hash, "hex"))) return { email: e, role: "student", name: s.name, track: normTrack(s.track) };
  return null;
}

/* ---------- сесія ---------- */
const secret = () => (process.env.FOCUS_USERS ?? "").trim() || (process.env.MIDGARD_USERS ?? "").trim();

async function sign(payload: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode("focus:" + secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/[+/=]/g, (c) => ({ "+": "-", "/": "_", "=": "" })[c]!);
}

export async function makeSession(email: string) {
  const payload = `${encodeURIComponent(email)}.${Math.floor(Date.now() / 1000) + MAX_AGE}`;
  return `${payload}.${await sign(payload)}`;
}

export async function currentUser(request: Request): Promise<Me | null> {
  if (!secret()) return null;
  const raw = (request.headers.get("cookie") ?? "").split(/;\s*/).find((c) => c.startsWith(COOKIE + "="));
  if (!raw) return null;
  const parts = raw.slice(COOKIE.length + 1).split(".");
  const sig = parts.pop(), exp = parts.pop(), enc = parts.join(".");
  if (!enc || !exp || !sig || Number(exp) < Date.now() / 1000) return null;
  if (!safeEqual(sig, await sign(`${enc}.${exp}`))) return null;
  const email = decodeURIComponent(enc);
  if (adminUsers().some((u) => u.email === email)) return { email, role: "admin", name: "Власник", track: "business" };
  const s = (await loadStudents()).find((u) => u.email === email);
  return s ? { email, role: "student", name: s.name, track: normTrack(s.track) } : null;
}

/** Ключ конвеєра CEO OS (той самий, що й для MIDGARD) — для завантаження файлів воркбуків скриптом. */
export function ingestAuthorized(request: Request) {
  const key = process.env.MIDGARD_INGEST_KEY ?? "";
  const got = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return key.length >= 32 && safeEqual(got, key);
}

/** Тека користувача в сховищі: хеш пошти, щоб не світити адреси в шляхах. */
export const userKey = (email: string) => createHash("sha256").update(email.toLowerCase()).digest("hex").slice(0, 20);

/** Шлях стану воркбука людини в сховищі. */
export const statePath = (email: string, b: string, v: string) => `focus/users/${userKey(email)}/${b}-${v}.json`;
