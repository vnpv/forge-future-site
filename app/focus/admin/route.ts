import { NOINDEX, currentUser } from "../auth";

/** Сторінка керування учнями (лише admin): додати учня, скинути пароль, видалити. */
export const dynamic = "force-dynamic";

const PAGE = `<!doctype html><html lang="uk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Учні · FOCUS</title><style>
:root{--bg:#111214;--panel:#1a1c20;--ink:#f1ede4;--muted:#9a978f;--line:#2b2e34;--accent:#dfff3c;--err:#ff9184;color-scheme:dark}
@media (prefers-color-scheme:light){:root{--bg:#f4f3ee;--panel:#fff;--ink:#16181c;--muted:#5d6068;--line:#d9d7cf;--accent:#5a7d00;--err:#b0362b;color-scheme:light}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;padding:20px 16px}
main{max-width:760px;margin:0 auto;display:grid;gap:18px}
a{color:var(--muted)}h1{font-size:20px;margin:0}
.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px;display:grid;gap:12px}
form{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;align-items:end}
label{display:grid;gap:5px;font-size:13px;color:var(--muted)}
input{font:inherit;padding:9px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);min-width:0}
input:focus,button:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
button{font:inherit;font-weight:600;padding:9px 12px;border:0;border-radius:8px;background:var(--accent);color:#14160a;cursor:pointer}
button.ghost{background:transparent;color:var(--ink);border:1px solid var(--line);font-weight:500}
table{width:100%;border-collapse:collapse;font-size:14px}td,th{text-align:left;padding:8px 6px;border-bottom:1px solid var(--line);vertical-align:middle}
.msg{padding:10px 12px;border-radius:8px;background:rgba(223,255,60,.12);font-size:14px;word-break:break-all}.msg.err{background:rgba(255,145,132,.12);color:var(--err)}
code{background:var(--bg);padding:2px 6px;border-radius:6px}
</style></head><body><main>
<div><a href="/focus">← До воркбуків</a><h1>Учні</h1></div>
<section class="card"><b>Додати учня або скинути пароль</b>
<form id="f"><label>Пошта<input name="email" type="email" required></label>
<label>Ім'я<input name="name" placeholder="Як звати"></label>
<label>Пароль (порожньо = згенерувати)<input name="password" autocomplete="new-password"></label>
<button type="submit">Зберегти</button></form>
<div id="msg" hidden></div></section>
<section class="card"><b>Список</b><div style="overflow-x:auto"><table><thead><tr><th>Ім'я</th><th>Пошта</th><th></th></tr></thead><tbody id="rows"></tbody></table></div>
<span style="color:var(--muted);font-size:13px">Роботи учня: на головній сторінці вибери його зі списку «Учень».</span></section>
<script>
var $=function(i){return document.getElementById(i)};
function show(t,err){ var m=$('msg'); m.hidden=false; m.className='msg'+(err?' err':''); m.textContent=t; }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}); }
function load(){ fetch('/focus/api/users',{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(d){
  $('rows').innerHTML=(d.students||[]).map(function(s){ return '<tr><td>'+esc(s.name)+'</td><td>'+esc(s.email)+'</td><td><button class="ghost" data-del="'+esc(s.email)+'">Видалити</button></td></tr>'; }).join('')||'<tr><td colspan="3" style="color:var(--muted)">Поки немає учнів</td></tr>';
  document.querySelectorAll('[data-del]').forEach(function(b){ b.onclick=function(){ if(!confirm('Видалити '+b.dataset.del+'? Відповіді в сховищі лишаться.')) return;
    fetch('/focus/api/users?email='+encodeURIComponent(b.dataset.del),{method:'DELETE',credentials:'same-origin'}).then(load); }; });
}); }
$('f').onsubmit=function(e){ e.preventDefault(); var fd=new FormData(e.target);
  fetch('/focus/api/users',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:fd.get('email'),name:fd.get('name'),password:fd.get('password')})})
    .then(function(r){return r.json()}).then(function(d){
      if(d.error){ show(d.error,true); return; }
      show('Готово. Пошта: '+d.email+' · пароль: '+d.password+' (покажу лише зараз, передай учню)'); e.target.reset(); load(); }); };
load();
</script></main></body></html>`;

export async function GET(request: Request) {
  const me = await currentUser(request);
  if (!me || me.role !== "admin") return new Response(null, { status: 303, headers: { ...NOINDEX, Location: "/focus" } });
  return new Response(PAGE, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
