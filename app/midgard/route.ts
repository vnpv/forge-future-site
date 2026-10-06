import html from "./page-html";

/**
 * Дашборд якості уроків MIDGARD за паролем (HTTP Basic Auth).
 * Користувачі, паролі й справжні імена вчителів — лише у змінних оточення Vercel,
 * бо репозиторій публічний:
 *   MIDGARD_USERS — "email|пароль;email|пароль"
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

function users() {
  const unquote = (x: string) => x.trim().replace(/^["']|["']$/g, "").trim();
  return unquote(process.env.MIDGARD_USERS ?? "")
    .split(/[;\n]/)
    .map((row) => unquote(row).split("|").map(unquote))
    .filter(([email, pass]) => email && pass)
    .map(([email, pass]) => ({ email: email.toLowerCase(), pass }));
}

/** Без налаштувань MIDGARD_USERS доступ закрито для всіх. */
function authorized(request: Request): boolean {
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return false;
  let decoded = "";
  try {
    decoded = new TextDecoder().decode(Uint8Array.from(atob(header.slice(6)), (c) => c.charCodeAt(0)));
  } catch {
    return false;
  }
  const i = decoded.indexOf(":");
  if (i < 0) return false;
  const email = decoded.slice(0, i).trim().toLowerCase();
  const pass = decoded.slice(i + 1);
  return users().some((u) => safeEqual(u.email, email) && safeEqual(u.pass, pass));
}

export function GET(request: Request) {
  if (!authorized(request)) {
    return new Response("Потрібен вхід: логін — email директора, пароль — від адміністратора Forge Future.", {
      status: 401,
      // Діагностика без секретів: скільки користувачів сервер прочитав із MIDGARD_USERS
      headers: { ...NOINDEX, "X-Midgard-Users": String(users().length), "WWW-Authenticate": 'Basic realm="MIDGARD", charset="UTF-8"', "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  let page = html;
  for (const pair of (process.env.MIDGARD_TEACHERS ?? "").split(";")) {
    const [alias, name] = pair.split("=").map((s) => s.trim());
    if (alias && name) page = page.replaceAll(alias, name);
  }
  if (process.env.MIDGARD_TEACHERS) page = page.replace("Демо · дані вчителів знеособлено", "Демо · MIDGARD");
  return new Response(page, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
