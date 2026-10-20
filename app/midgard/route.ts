import html from "./page-html";
import { COOKIE, MAX_AGE, NOINDEX, authenticate, currentUser, makeSession } from "./auth";
import { findByInvite, hashPassword, saveUsers, storedUsers } from "./users";
import { lessonsWithReviews } from "./lessons";
import { storageReady } from "./storage";

/**
 * Дашборд якості уроків MIDGARD з власною формою входу (українською).
 * Користувачі: адмін додає їх на /midgard/users (приватний Blob, users.ts) — людина отримує посилання-запрошення
 * і сама задає пароль. Запасний вхід і справжні імена вчителів — у змінних оточення Vercel, бо репозиторій публічний:
 *   MIDGARD_USERS — "email|пароль|роль;…"
 * Уроки (з іменами вчителів) — у приватному Blob midgard/lessons/*.json, не в коді.
 * Сесія — підписаний cookie на 30 днів (auth.ts); зміна MIDGARD_USERS скидає всі сесії.
 * Записи уроків — приватний Vercel Blob (video/route.ts, upload/route.ts).
 */
export const dynamic = "force-dynamic";

const LOGO = "/images/midgard-logo.jpg";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function loginPage(error = "", email = "", invite = "") {
  return `<!doctype html><html lang="uk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${invite ? "Створення пароля" : "Вхід"} · Якість уроків MIDGARD</title>
<link rel="icon" href="${LOGO}">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;600&family=Unbounded:wght@600&display=swap">
<style>
:root{--bg:#f3f6ea;--card:#fff;--ink:#1a2232;--muted:#5b6475;--line:#d9dfcc;--lime:#9ccc2c;--blue:#2a4fb0;--err:#b0362b;--err-bg:#f9e2df;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#12160d;--card:#1b2014;--ink:#e8ecdf;--muted:#a3ab96;--line:#323a26;--lime:#a8d940;--blue:#8ea8ff;--err:#ff9184;--err-bg:#3a1e1b;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px 16px;background:var(--bg);color:var(--ink);font:15px/1.5 Commissioner,system-ui,sans-serif}
.card{width:100%;max-width:380px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:28px 24px;display:grid;gap:16px}
.brand{display:flex;align-items:center;gap:14px}
.brand img{width:64px;height:64px;border-radius:14px;flex:none}
h1{font:600 20px/1.2 Unbounded,Commissioner,sans-serif;margin:0}
.sub{color:var(--muted);font-size:13.5px;margin:2px 0 0}
label{display:grid;gap:6px;font-size:13.5px;font-weight:500}
input{font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:9px;background:var(--bg);color:var(--ink)}
input:focus{outline:2px solid var(--lime);outline-offset:1px;border-color:var(--lime)}
button{font:inherit;font-weight:600;padding:11px;border:0;border-radius:9px;background:var(--lime);color:#14200a;cursor:pointer}
button:hover{filter:brightness(.95)}
button:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.err{background:var(--err-bg);color:var(--err);border-radius:8px;padding:9px 12px;font-size:13.5px}
.foot{color:var(--muted);font-size:12.5px;text-align:center;margin:0}
</style></head><body>
<form class="card" method="post" action="/midgard">
  <div class="brand"><img src="${LOGO}" alt="Логотип школи MIDGARD" width="64" height="64">
    <div><h1>Якість уроків</h1><p class="sub">Дашборд школи MIDGARD</p></div></div>
  ${error ? `<div class="err" role="alert">${esc(error)}</div>` : ""}
  ${invite ? `<p class="sub">Вас запросили до дашборду. Придумайте пароль (щонайменше 8 символів), щоб завершити реєстрацію.</p>
  <input type="hidden" name="invite" value="${esc(invite)}">` : ""}
  <label for="email">Електронна пошта<input id="email" name="email" type="email" autocomplete="username" required value="${esc(email)}" placeholder="name@example.com"${invite ? " readonly" : ""}></label>
  <label for="password">${invite ? "Новий пароль" : "Пароль"}<input id="password" name="password" type="password" autocomplete="${invite ? "new-password" : "current-password"}" required${invite ? ' minlength="8"' : ""}></label>
  ${invite ? `<label for="password2">Повторіть пароль<input id="password2" name="password2" type="password" autocomplete="new-password" required minlength="8"></label>` : ""}
  <button type="submit">${invite ? "Зберегти пароль і увійти" : "Увійти"}</button>
  <p class="foot">Немає доступу? Зверніться до адміністратора Forge Future.</p>
</form></body></html>`;
}

const htmlResponse = (body: string, status = 200, extra: Record<string, string> = {}) =>
  new Response(body, { status, headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8", ...extra } });

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.has("logout")) {
    return new Response(null, { status: 303, headers: { ...NOINDEX, Location: "/midgard", "Set-Cookie": `${COOKIE}=; Path=/midgard; Max-Age=0; HttpOnly; Secure; SameSite=Lax` } });
  }
  const invite = url.searchParams.get("invite");
  if (invite) {
    const u = await findByInvite(invite).catch(() => null);
    return u
      ? htmlResponse(loginPage("", u.email, invite))
      : htmlResponse(loginPage("Посилання-запрошення недійсне або прострочене. Попросіть адміністратора надіслати нове."), 410);
  }
  const me = await currentUser(request);
  if (!me) return htmlResponse(loginPage());

  // Уроки — з приватного сховища (lessons.ts), щоб новий урок з'являвся без редеплою
  const lessons = storageReady() ? await lessonsWithReviews().catch(() => []) : [];
  const data = JSON.stringify(lessons).replace(/</g, "\\u003c");
  const meJs = JSON.stringify(me).replace(/</g, "\\u003c");
  const page = html
    .replace("/*LESSONS*/[]", () => data) // функцією: щоб «$» у текстах не спрацював як шаблон
    .replace("/*ME*/null", () => meJs)
    .replace("<title>", `<link rel="icon" href="${LOGO}"><title>`)
    // адміну — посилання на керування користувачами поруч із «Вийти»
    .replace('<a class="logout" href="/midgard?logout=1">', (m) => (me.role === "admin" ? `<a class="logout" href="/midgard/users">Користувачі</a> · ${m}` : m));
  return htmlResponse(page);
}

export async function POST(request: Request) {
  let email = "", password = "", password2 = "", invite = "";
  try {
    const form = await request.formData();
    email = String(form.get("email") ?? "").trim().toLowerCase();
    password = String(form.get("password") ?? "");
    password2 = String(form.get("password2") ?? "");
    invite = String(form.get("invite") ?? "");
  } catch {}
  if (invite) {
    // Завершення запрошення / скидання пароля: людина сама задає пароль
    const u = await findByInvite(invite).catch(() => null);
    if (!u) return htmlResponse(loginPage("Посилання-запрошення недійсне або прострочене. Попросіть адміністратора надіслати нове."), 410);
    if (password.length < 8) return htmlResponse(loginPage("Пароль має бути щонайменше 8 символів.", u.email, invite), 400);
    if (password !== password2) return htmlResponse(loginPage("Паролі не збігаються.", u.email, invite), 400);
    const { hash, salt } = await hashPassword(password);
    const all = await storedUsers(true);
    await saveUsers(all.map((x) => (x.email === u.email ? { ...x, hash, salt, invite: undefined } : x)));
    email = u.email;
  } else if (!(await authenticate(email, password))) {
    await new Promise((r) => setTimeout(r, 800)); // гальмуємо підбір пароля
    return htmlResponse(loginPage("Невірна електронна пошта або пароль. Спробуйте ще раз.", email), 401);
  }
  return new Response(null, {
    status: 303,
    headers: { ...NOINDEX, Location: "/midgard", "Set-Cookie": `${COOKIE}=${await makeSession(email)}; Path=/midgard; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax` },
  });
}
