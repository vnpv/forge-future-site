import html from "./page-html";

/**
 * Дашборд якості уроків MIDGARD за паролем (HTTP Basic Auth).
 * Користувачі, паролі й справжні імена вчителів — лише у змінних оточення Vercel,
 * бо репозиторій публічний:
 *   MIDGARD_USERS — "email|пароль|роль;email|пароль|роль" (роль: admin або director)
 *   MIDGARD_TEACHERS — "Вчитель А=Ім'я П.;Вчитель Б=Ім'я П."
 */
export const dynamic = "force-dynamic";

const NOINDEX = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" };

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

type Role = "admin" | "director";

function users() {
  return (process.env.MIDGARD_USERS ?? "")
    .split(";")
    .map((row) => row.split("|").map((x) => x.trim()))
    .filter(([email, pass]) => email && pass)
    .map(([email, pass, role]) => ({ email: email.toLowerCase(), pass, role: (role === "admin" ? "admin" : "director") as Role }));
}

/** Повертає роль користувача або null (без налаштувань — доступ закрито). */
function authorize(request: Request): Role | null {
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return null;
  let decoded = "";
  try {
    decoded = new TextDecoder().decode(Uint8Array.from(atob(header.slice(6)), (c) => c.charCodeAt(0)));
  } catch {
    return null;
  }
  const i = decoded.indexOf(":");
  if (i < 0) return null;
  const email = decoded.slice(0, i).trim().toLowerCase();
  const pass = decoded.slice(i + 1);
  const match = users().find((u) => safeEqual(u.email, email) && safeEqual(u.pass, pass));
  return match ? match.role : null;
}

export function GET(request: Request) {
  const role = authorize(request);
  if (!role) {
    return new Response("Потрібен вхід: логін — email директора, пароль — від адміністратора Forge Future.", {
      status: 401,
      headers: { ...NOINDEX, "WWW-Authenticate": 'Basic realm="MIDGARD", charset="UTF-8"', "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  let page = html;
  for (const pair of (process.env.MIDGARD_TEACHERS ?? "").split(";")) {
    const [alias, name] = pair.split("=").map((s) => s.trim());
    if (alias && name) page = page.replaceAll(alias, name);
  }
  if (process.env.MIDGARD_TEACHERS) page = page.replace("Демо · дані вчителів знеособлено", "Демо · MIDGARD");
  // Роль поки не змінює вигляд; знадобиться, коли адмін додаватиме уроки зі сторінки
  return new Response(page, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8", "X-Midgard-Role": role } });
}
