import { BOOKS, COOKIE, MAX_AGE, NOINDEX, makeSession, safeEqual, users, validSession } from "./auth";

/**
 * Воркбуки FOCUS на forge-future.com/focus: вхід + три воркбуки в одній сторінці.
 * Самі воркбуки (HTML) лежать у приватному Blob (focus/*.html), не в репозиторії:
 * вони містять матеріали курсу й дані кастдевів. Репозиторій публічний.
 */
export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

const BASE_CSS = `
:root{--bg:#111214;--panel:#1a1c20;--ink:#f1ede4;--muted:#9a978f;--line:#2b2e34;--accent:#dfff3c;color-scheme:dark}
@media (prefers-color-scheme:light){:root{--bg:#f4f3ee;--panel:#fff;--ink:#16181c;--muted:#5d6068;--line:#d9d7cf;--accent:#5a7d00;color-scheme:light}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
`;

function loginPage(error = "", email = "") {
  return `<!doctype html><html lang="uk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Вхід · FOCUS</title><style>${BASE_CSS}
body{min-height:100vh;display:grid;place-items:center;padding:24px 16px}
.card{width:100%;max-width:360px;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:28px 24px;display:grid;gap:16px}
h1{margin:0;font-size:20px}.sub{margin:2px 0 0;color:var(--muted);font-size:13.5px}
label{display:grid;gap:6px;font-size:13.5px;font-weight:500}
input{font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:9px;background:var(--bg);color:var(--ink)}
input:focus{outline:2px solid var(--accent);outline-offset:1px}
button{font:inherit;font-weight:600;padding:11px;border:0;border-radius:9px;background:var(--accent);color:#14160a;cursor:pointer}
.err{background:#3a1e1b;color:#ff9184;border-radius:8px;padding:9px 12px;font-size:13.5px}
</style></head><body>
<form class="card" method="post" action="/focus">
  <div><h1>FOCUS</h1><p class="sub">Воркбуки Forge Future. Лише для власників доступу.</p></div>
  ${error ? `<div class="err" role="alert">${esc(error)}</div>` : ""}
  <label for="email">Електронна пошта<input id="email" name="email" type="email" autocomplete="username" required value="${esc(email)}"></label>
  <label for="password">Пароль<input id="password" name="password" type="password" autocomplete="current-password" required></label>
  <button type="submit">Увійти</button>
</form></body></html>`;
}

function hubPage() {
  const tabs = Object.entries(BOOKS)
    .map(([n, b]) => `<button type="button" class="tab" data-n="${n}"><span>${n}</span>${esc(b.title)}</button>`)
    .join("");
  return `<!doctype html><html lang="uk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>FOCUS · Forge Future</title><style>${BASE_CSS}
html,body{height:100%}
body{display:flex;flex-direction:column}
header{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid var(--line);background:var(--panel);flex-wrap:wrap}
.brand{font-weight:700;letter-spacing:.06em;margin-right:8px}
.tabs{display:flex;gap:6px;flex-wrap:wrap;flex:1}
.tab{font:inherit;font-size:14px;padding:7px 12px;border:1px solid var(--line);border-radius:9px;background:transparent;color:var(--ink);cursor:pointer;display:flex;gap:8px;align-items:center}
.tab span{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--line);font-size:12px}
.tab[aria-current="true"]{border-color:var(--accent);background:rgba(223,255,60,.12)}
.tab:focus-visible,.out:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.out{color:var(--muted);font-size:13.5px;text-decoration:none;padding:6px 8px}
.save{color:var(--muted);font-size:12.5px;margin-left:auto}
iframe{flex:1;width:100%;border:0;background:#fff}
</style></head><body>
<header><span class="brand">FOCUS</span><nav class="tabs" aria-label="Воркбуки">${tabs}</nav>
<a class="out" href="/focus?logout=1">Вийти</a></header>
<iframe id="book" title="Воркбук"></iframe>
<script>
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.tab')), frame=document.getElementById('book');
  function open(n){
    tabs.forEach(function(t){ if(t.dataset.n===n) t.setAttribute('aria-current','true'); else t.removeAttribute('aria-current'); });
    frame.src='/focus/w?n='+n; try{ history.replaceState(null,'','#'+n); localStorage.setItem('focus_last',n); }catch(e){}
  }
  tabs.forEach(function(t){ t.addEventListener('click',function(){ open(t.dataset.n); }); });
  var n=(location.hash||'').slice(1); try{ n=n||localStorage.getItem('focus_last')||'1'; }catch(e){ n=n||'1'; }
  open(['1','2','3'].indexOf(n)>=0?n:'1');
})();
</script></body></html>`;
}

const htmlResponse = (body: string, status = 200, extra: Record<string, string> = {}) =>
  new Response(body, { status, headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8", ...extra } });

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.has("logout"))
    return new Response(null, { status: 303, headers: { ...NOINDEX, Location: "/focus", "Set-Cookie": `${COOKIE}=; Path=/focus; Max-Age=0; HttpOnly; Secure; SameSite=Lax` } });
  if (!(await validSession(request))) return htmlResponse(loginPage());
  return htmlResponse(hubPage());
}

export async function POST(request: Request) {
  let email = "", password = "";
  try {
    const form = await request.formData();
    email = String(form.get("email") ?? "").trim();
    password = String(form.get("password") ?? "");
  } catch {}
  const ok = users().some((u) => safeEqual(u.email, email.toLowerCase()) && safeEqual(u.pass, password));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800));
    return htmlResponse(loginPage("Невірна електронна пошта або пароль.", email), 401);
  }
  return new Response(null, {
    status: 303,
    headers: { ...NOINDEX, Location: "/focus", "Set-Cookie": `${COOKIE}=${await makeSession(email.toLowerCase())}; Path=/focus; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax` },
  });
}
