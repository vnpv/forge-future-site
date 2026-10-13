import { COOKIE, MAX_AGE, NOINDEX, currentUser, makeSession, verifyLogin } from "./auth";

/**
 * Воркбуки FOCUS на forge-future.com/focus: вхід + воркбуки однією сторінкою.
 * Самі воркбуки (HTML) і відповіді — у приватному Blob, не в публічному репозиторії.
 */
export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

const BASE_CSS = `
:root{--bg:#111214;--panel:#1a1c20;--ink:#f1ede4;--muted:#9a978f;--line:#2b2e34;--accent:#dfff3c;--err:#ff9184;color-scheme:dark}
@media (prefers-color-scheme:light){:root{--bg:#f4f3ee;--panel:#fff;--ink:#16181c;--muted:#5d6068;--line:#d9d7cf;--accent:#5a7d00;--err:#b0362b;color-scheme:light}}
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
.err{background:rgba(255,145,132,.12);color:var(--err);border-radius:8px;padding:9px 12px;font-size:13.5px}
</style></head><body>
<form class="card" method="post" action="/focus">
  <div><h1>FOCUS</h1><p class="sub">Воркбуки Forge Future. Вхід за запрошенням.</p></div>
  ${error ? `<div class="err" role="alert">${esc(error)}</div>` : ""}
  <label for="email">Електронна пошта<input id="email" name="email" type="email" autocomplete="username" required value="${esc(email)}"></label>
  <label for="password">Пароль<input id="password" name="password" type="password" autocomplete="current-password" required></label>
  <button type="submit">Увійти</button>
</form></body></html>`;
}

function hubPage() {
  return `<!doctype html><html lang="uk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>FOCUS · Forge Future</title><style>${BASE_CSS}
[hidden]{display:none!important}
html,body{height:100%;overflow:hidden}
body{display:flex;flex-direction:column}
header{display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid var(--line);background:var(--panel);flex-wrap:wrap;position:relative;z-index:5}
.brand{font-weight:700;letter-spacing:.06em;margin-right:4px}
.tabs,.seg{display:flex;gap:6px;flex-wrap:wrap}
.seg{padding-left:8px;border-left:1px solid var(--line)}
button,.btn{font:inherit;font-size:14px;padding:6px 11px;border:1px solid var(--line);border-radius:9px;background:transparent;color:var(--ink);cursor:pointer;text-decoration:none;display:inline-block}
button[aria-current="true"]{border-color:var(--accent);background:rgba(223,255,60,.14)}
button:focus-visible,a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.right{margin-left:auto;display:flex;gap:6px;align-items:center;flex-wrap:wrap;position:relative}
.who{color:var(--muted);font-size:13px;padding:0 4px}
.link{border:0;color:var(--muted);padding:6px 8px;font-size:13.5px}
.menu{position:absolute;right:0;top:calc(100% + 6px);min-width:260px;max-width:90vw;max-height:70vh;overflow:auto;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:6px;box-shadow:0 8px 28px rgba(0,0,0,.35);display:grid;gap:2px}
.menu button{border:0;text-align:left;width:100%;border-radius:8px;display:grid;gap:0}
.menu button:hover{background:rgba(223,255,60,.1)}
.menu small{color:var(--muted);font-size:12px}
.view{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:7px 12px;background:var(--accent);color:#14160a;font-weight:600;font-size:13.5px}
.view button{border-color:#14160a;color:#14160a;font-weight:600}
main{flex:1;min-height:0;display:flex}
iframe{flex:1;width:100%;border:0;background:#fff}
.empty{flex:1;display:grid;place-items:center;color:var(--muted);padding:24px;text-align:center}
</style></head><body>
<header>
  <span class="brand">FOCUS</span>
  <nav class="tabs" id="tabs" aria-label="Воркбуки"></nav>
  <div class="seg" id="seg" aria-label="Версія"></div>
  <div class="right">
    <button type="button" id="stuBtn" aria-haspopup="true" aria-expanded="false" hidden>Роботи учнів ▾</button>
    <div class="menu" id="stuMenu" hidden></div>
    <a class="btn link" id="adm" href="/focus/admin" hidden>Керувати учнями</a>
    <span class="who" id="who"></span>
    <a class="btn link" href="/focus?logout=1">Вийти</a>
  </div>
</header>
<div class="view" id="view" hidden><span id="viewText"></span><button type="button" id="backBtn">← До моїх воркбуків</button></div>
<main><iframe id="book" title="Воркбук" hidden></iframe><div class="empty" id="empty" hidden></div></main>
<script>
(function(){
  var S={books:[],students:[],b:null,v:'main',as:null}, $=function(i){return document.getElementById(i)};
  function save(){ try{ localStorage.setItem('focus_nav',JSON.stringify({b:S.b,v:S.v})); }catch(e){} }
  function el(t,c,x){ var e=document.createElement(t); if(c) e.className=c; if(x!==undefined) e.textContent=x; return e; }
  function render(){
    var tabs=$('tabs'); tabs.innerHTML='';
    S.books.forEach(function(bk){ var t=el('button','',bk.title); t.type='button';
      if(bk.id===S.b) t.setAttribute('aria-current','true'); t.onclick=function(){ S.b=bk.id; S.v='main'; render(); }; tabs.appendChild(t); });
    var cur=S.books.filter(function(x){return x.id===S.b})[0], seg=$('seg'); seg.innerHTML='';
    if(cur && cur.example && !S.as){ [['main','Мій воркбук'],['example','Приклад']].forEach(function(p){ var t=el('button','',p[1]); t.type='button';
      if(S.v===p[0]) t.setAttribute('aria-current','true'); t.onclick=function(){ S.v=p[0]; render(); }; seg.appendChild(t); }); }
    seg.hidden=!seg.children.length;
    var view=$('view');
    if(S.as){ view.hidden=false; $('viewText').textContent='Перегляд: '+S.as.name+' · '+S.as.email+' — лише читання'; } else view.hidden=true;
    var f=$('book'), em=$('empty');
    if(!cur){ f.hidden=true; em.hidden=false; em.textContent='Воркбуків поки немає.'; return; }
    if(!S.as && S.v==='main' && !cur.main){ f.hidden=true; em.hidden=false; em.textContent='Цей воркбук ще готується.'; return; }
    em.hidden=true; f.hidden=false;
    var src='/focus/w?b='+encodeURIComponent(cur.id)+'&v='+S.v+(S.as?'&as='+encodeURIComponent(S.as.email):'');
    if(f.getAttribute('data-src')!==src){ f.setAttribute('data-src',src); f.src=src; }
    save();
  }
  function closeMenu(){ $('stuMenu').hidden=true; $('stuBtn').setAttribute('aria-expanded','false'); }
  function openAs(st){ S.as=st; S.v='main'; closeMenu(); render(); }
  $('backBtn').onclick=function(){ S.as=null; render(); };
  $('stuBtn').onclick=function(e){ e.stopPropagation(); var m=$('stuMenu'); m.hidden=!m.hidden; $('stuBtn').setAttribute('aria-expanded',String(!m.hidden)); };
  document.addEventListener('click',function(e){ if(!$('stuMenu').contains(e.target)) closeMenu(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeMenu(); });
  fetch('/focus/api/books',{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(d){
    if(!d.me){ location.reload(); return; }
    S.books=d.books; S.students=d.students||[]; $('who').textContent=d.me.name||d.me.email;
    if(d.me.role==='admin'){ $('adm').hidden=false;
      if(S.students.length){ $('stuBtn').hidden=false; var m=$('stuMenu');
        S.students.forEach(function(s){ var b=el('button',''); b.type='button'; b.appendChild(el('span','',s.name)); b.appendChild(el('small','',s.email)); b.onclick=function(){ openAs(s); }; m.appendChild(b); }); } }
    var n={}; try{ n=JSON.parse(localStorage.getItem('focus_nav')||'{}'); }catch(e){}
    var h=(location.hash||'').slice(1);
    S.b=(S.books.filter(function(x){return x.id===(h||n.b)})[0]||S.books[0]||{}).id||null;
    render();
  }).catch(function(){ var em=$('empty'); em.hidden=false; em.textContent='Не вдалося завантажити список воркбуків.'; });
})();
</script></body></html>`;
}

const htmlResponse = (body: string, status = 200) =>
  new Response(body, { status, headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.has("logout"))
    return new Response(null, { status: 303, headers: { ...NOINDEX, Location: "/focus", "Set-Cookie": `${COOKIE}=; Path=/focus; Max-Age=0; HttpOnly; Secure; SameSite=Lax` } });
  if (!(await currentUser(request))) return htmlResponse(loginPage());
  return htmlResponse(hubPage());
}

export async function POST(request: Request) {
  let email = "", password = "";
  try {
    const form = await request.formData();
    email = String(form.get("email") ?? "").trim();
    password = String(form.get("password") ?? "");
  } catch {}
  const me = await verifyLogin(email, password);
  if (!me) {
    await new Promise((r) => setTimeout(r, 800));
    return htmlResponse(loginPage("Невірна електронна пошта або пароль.", email), 401);
  }
  return new Response(null, {
    status: 303,
    headers: { ...NOINDEX, Location: "/focus", "Set-Cookie": `${COOKIE}=${await makeSession(me.email)}; Path=/focus; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax` },
  });
}
