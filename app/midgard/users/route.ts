import { NOINDEX, currentUser } from "../auth";
import { canManageUsers } from "../users";

/** Сторінка керування користувачами дашборду MIDGARD (власник і сисадмін). Дані — через /midgard/api/users. */
export const dynamic = "force-dynamic";

const LOGO = "/images/midgard-logo.jpg";

const page = `<!doctype html><html lang="uk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Користувачі · Якість уроків MIDGARD</title>
<link rel="icon" href="${LOGO}">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;600&family=Unbounded:wght@600&display=swap">
<style>
:root{--bg:#f3f6ea;--card:#fff;--ink:#1a2232;--muted:#5b6475;--line:#d9dfcc;--lime:#9ccc2c;--blue:#2a4fb0;--err:#b0362b;--err-bg:#f9e2df;--ok-bg:#e9f4d2;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#12160d;--card:#1b2014;--ink:#e8ecdf;--muted:#a3ab96;--line:#323a26;--lime:#a8d940;--blue:#8ea8ff;--err:#ff9184;--err-bg:#3a1e1b;--ok-bg:#25301a;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 Commissioner,system-ui,sans-serif}
main{max-width:860px;margin:0 auto;padding:24px 16px 48px;display:grid;gap:18px}
header{display:flex;align-items:center;gap:14px}
header img{width:52px;height:52px;border-radius:12px;flex:none}
h1{font:600 20px/1.2 Unbounded,Commissioner,sans-serif;margin:0}
.sub{color:var(--muted);font-size:13.5px;margin:2px 0 0}
a{color:var(--blue)}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px}
h2{font-size:16px;margin:0 0 12px}
form.add{display:flex;flex-wrap:wrap;gap:10px;align-items:end}
label{display:grid;gap:6px;font-size:13.5px;font-weight:500}
form.add label{flex:1 1 240px}
input,select{font:inherit;padding:9px 11px;border:1px solid var(--line);border-radius:9px;background:var(--bg);color:var(--ink)}
button{font:inherit;font-weight:600;padding:9px 14px;border:0;border-radius:9px;background:var(--lime);color:#14200a;cursor:pointer}
button.ghost{background:transparent;border:1px solid var(--line);color:var(--ink);font-weight:500;padding:6px 10px;font-size:13.5px}
button.danger{color:var(--err)}
button:focus-visible,input:focus,select:focus{outline:2px solid var(--blue);outline-offset:1px}
.msg{border-radius:9px;padding:10px 12px;font-size:14px}
.msg.err{background:var(--err-bg);color:var(--err)}
.msg.ok{background:var(--ok-bg)}
.link{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
.link input{flex:1 1 280px;font-size:13px}
.row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:12px 0;border-top:1px solid var(--line)}
.row:first-child{border-top:0}
.who{flex:1 1 220px;min-width:0}
.who b{font-weight:600;overflow-wrap:anywhere}
.meta{color:var(--muted);font-size:12.5px}
.tag{display:inline-block;font-size:12px;border-radius:99px;padding:1px 8px;border:1px solid var(--line);margin-left:6px}
.acts{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.acts select{padding:5px 8px;font-size:13.5px}
.hint{color:var(--muted);font-size:13px;margin:10px 0 0}
</style></head><body><main>
<header><img src="${LOGO}" alt="Логотип школи MIDGARD" width="52" height="52">
  <div><h1>Користувачі</h1><p class="sub">Дашборд школи MIDGARD · <a href="/midgard">← до дашборду</a></p></div></header>
<section class="card">
  <h2>Запросити користувача</h2>
  <form class="add" id="add">
    <label>Роль<select name="role" id="role"></select></label>
    <label>Пошта (необов'язково)<input name="email" type="email" placeholder="name@example.com"></label>
    <button type="submit">Створити посилання</button>
  </form>
  <div id="out"></div>
  <p class="hint">Людина відкриває посилання, вводить свою пошту й пароль і далі входить як усі. Посилання одноразове й діє 7 днів. Якщо вказати пошту, зареєструватися зможе лише з нею.</p>
</section>
<section class="card">
  <h2>Відкриті запрошення</h2>
  <div id="invites">Завантаження…</div>
</section>
<section class="card">
  <h2>Користувачі</h2>
  <div id="list">Завантаження…</div>
  <p class="hint" id="envhint" hidden>«Запасний вхід» — рядки зі змінної MIDGARD_USERS у Vercel. Щоб керувати людиною тут, створіть їй запрошення з її поштою: після реєстрації діє пароль із сайту.</p>
</section>
</main>
<script>
const ROLE={owner:"Власник",sysadmin:"Сисадмін",director:"Директор школи",supervisor:"Супервізор"};
const ROLE_HINT={owner:"усі права, включно з усіма користувачами",sysadmin:"усі права, керує директорами й супервізорами",director:"перегляд і завантаження уроків",supervisor:"перегляд, завантаження і перевірка аналізу"};
const $=(s)=>document.querySelector(s);
const esc=(s)=>String(s).replace(/[&<>"]/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
const fmt=(d)=>d?new Date(d).toLocaleDateString("uk-UA",{day:"numeric",month:"short"}):"";
let ME=null;
async function api(method,body,q=""){
  const r=await fetch("/midgard/api/users"+q,{method,headers:body?{"Content-Type":"application/json"}:{},body:body?JSON.stringify(body):undefined});
  const d=await r.json().catch(()=>({error:"Помилка сервера"}));
  if(!r.ok) throw new Error(d.error||"Помилка");
  return d;
}
function show(html,kind="ok"){ $("#out").innerHTML=html?'<div class="msg '+kind+'" role="status" style="margin-top:12px">'+html+"</div>":""; }
function showLink(text,link){
  show(text+':<div class="link"><input readonly value="'+esc(link)+'" id="lnk"><button type="button" class="ghost" id="copy">Скопіювати</button></div><div class="meta" style="margin-top:6px">Посилання показується лише зараз. Скопіюйте й надішліть його в пошту чи месенджер.</div>');
  $("#copy").onclick=()=>{navigator.clipboard.writeText(link).then(()=>{$("#copy").textContent="Скопійовано";});};
  $("#lnk").select(); window.scrollTo({top:0,behavior:"smooth"});
}
function render(d){
  ME=d.me;
  const sel=$("#role"), cur=sel.value;
  sel.innerHTML=d.canInvite.map((r)=>'<option value="'+r+'">'+ROLE[r]+" — "+ROLE_HINT[r]+"</option>").join("");
  if(d.canInvite.includes(cur)) sel.value=cur;
  $("#invites").innerHTML=d.invites.length?d.invites.map((i)=>'<div class="row"><div class="who"><b>'+ROLE[i.role]+"</b>"+(i.reset?'<span class="tag">новий пароль</span>':"")+'<div class="meta">'+(i.email?esc(i.email):"будь-яка пошта")+" · діє до "+fmt(i.exp)+" · створив(ла) "+esc(i.createdBy)+'</div></div><div class="acts">'+(i.editable?'<button type="button" class="ghost danger" data-cancel="'+esc(i.id)+'">Скасувати</button>':"")+"</div></div>").join(""):'<span class="meta">Немає відкритих запрошень.</span>';
  $("#envhint").hidden=!d.users.some((u)=>u.source==="vercel");
  $("#list").innerHTML=d.users.length?d.users.map((u)=>{
    const me=u.email===ME.email;
    const tags=(me?'<span class="tag">це ви</span>':"")+(u.source==="vercel"?'<span class="tag">запасний вхід</span>':"");
    const meta=u.source==="vercel"?ROLE[u.role]+" · змінюється лише у Vercel":ROLE[u.role]+(u.createdBy?" · запросив(ла) "+esc(u.createdBy):"")+(u.createdAt?" · "+fmt(u.createdAt):"");
    let acts="";
    if(u.editable) acts='<select data-role="'+esc(u.email)+'" aria-label="Роль">'+d.canInvite.map((r)=>'<option value="'+r+'"'+(r===u.role?" selected":"")+">"+ROLE[r]+"</option>").join("")+"</select>"+
      '<button type="button" class="ghost" data-reset="'+esc(u.email)+'">Скинути пароль</button><button type="button" class="ghost danger" data-del="'+esc(u.email)+'">Видалити</button>';
    else if(me&&u.source==="site") acts='<button type="button" class="ghost" data-reset="'+esc(u.email)+'">Змінити свій пароль</button>';
    return '<div class="row"><div class="who"><b>'+esc(u.email)+"</b>"+tags+'<div class="meta">'+meta+'</div></div><div class="acts">'+acts+"</div></div>";
  }).join(""):'<span class="meta">Поки нікого немає.</span>';
}
async function load(){ try{ render(await api("GET")); }catch(e){ $("#list").innerHTML='<div class="msg err">'+esc(e.message)+"</div>"; } }
$("#add").onsubmit=async(ev)=>{
  ev.preventDefault();
  const f=new FormData(ev.target), email=String(f.get("email")||"").trim().toLowerCase(), role=String(f.get("role"));
  try{ const d=await api("POST",{action:"invite",role,email}); render(d); ev.target.email.value=""; showLink("Посилання для реєстрації з роллю «"+ROLE[role]+"»"+(email?" для <b>"+esc(email)+"</b>":""),d.link); }
  catch(e){ show(esc(e.message),"err"); }
};
document.body.addEventListener("click",async(ev)=>{
  const t=ev.target;
  try{
    if(t.dataset.reset){ const d=await api("POST",{action:"reset",email:t.dataset.reset}); render(d); showLink("Посилання для нового пароля <b>"+esc(t.dataset.reset)+"</b>",d.link); }
    if(t.dataset.cancel){ render(await api("POST",{action:"cancel",id:t.dataset.cancel})); }
    if(t.dataset.del && confirm("Видалити "+t.dataset.del+"? Доступ зникне одразу.")){ render(await api("DELETE",null,"?email="+encodeURIComponent(t.dataset.del))); show(""); }
  }catch(e){ show(esc(e.message),"err"); window.scrollTo({top:0,behavior:"smooth"}); }
});
$("#list").addEventListener("change",async(ev)=>{
  const t=ev.target; if(!t.dataset.role) return;
  try{ render(await api("POST",{action:"role",email:t.dataset.role,role:t.value})); show("Роль змінено: "+esc(t.dataset.role)); }
  catch(e){ show(esc(e.message),"err"); load(); }
});
load();
</script></body></html>`;

export async function GET(request: Request) {
  const me = await currentUser(request);
  if (!me) return new Response(null, { status: 303, headers: { ...NOINDEX, Location: "/midgard" } });
  if (!canManageUsers(me.role))
    return new Response("Керувати користувачами можуть лише власник і сисадмін", { status: 403, headers: { ...NOINDEX, "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(page, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
