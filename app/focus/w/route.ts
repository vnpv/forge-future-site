import { NOINDEX, currentUser, loadStudents, normTrack, statePath, userKey } from "../auth";
import { BOOK_ID, fileFor, loadBooks } from "../books";
import { StoreError, readText, storageReady } from "../store";

/**
 * Віддає воркбук (?b=<id>&v=main|example) з приватного Blob після входу.
 * У <head> додається скрипт, що підміняє localStorage на сторінці сховищем у пам'яті, яке
 * синхронізується з сервером (персонально для користувача): стан однаковий на всіх пристроях
 * і не змішується між людьми, що сидять в одному браузері.
 * ?as=<email> — режим перегляду для admin: роботи учня без збереження змін.
 */
export const dynamic = "force-dynamic";

const SHIM = (cfg: { b: string; v: string; as: string; u: string }) => `<script>(function(){
  var C=${JSON.stringify(cfg)}, RO=!!C.as;
  var URL_='/focus/api/state?b='+encodeURIComponent(C.b)+'&v='+encodeURIComponent(C.v)+(C.as?'&as='+encodeURIComponent(C.as):'');
  var LK='ffw:'+C.u+':'+C.b+':'+C.v, DEBOUNCE=120000, MAXWAIT=300000;
  var data={}, rev=0, lastSent=null, dirty=false, inflight=false, blocked=false, fails=0, pill=null, hideT=null, t=null, firstChange=0, serverOk=false, offline=false;
  var real=null; try{ real=window.localStorage; real.getItem('ffw:probe'); }catch(e){ real=null; }
  function sync(d){ var o={}; Object.keys(d).forEach(function(k){ if(!/(_tab(_|$)|_step$)/.test(k)) o[k]=d[k]; }); return o; }
  function readLocal(){ try{ var j=real&&real.getItem(LK); return j?JSON.parse(j):null; }catch(e){ return null; } }
  function writeLocal(){ try{ if(real) real.setItem(LK,JSON.stringify({baseRev:rev,dirty:dirty||inflight,ts:Date.now(),data:data})); }catch(e){} }
  try{ var x=new XMLHttpRequest(); x.open('GET',URL_,false); x.send(null);
    if(x.status===200){ data=JSON.parse(x.responseText||'{}')||{}; rev=parseInt(x.getResponseHeader('X-Rev')||'0',10)||0; lastSent=JSON.stringify(sync(data)); serverOk=true; }
    else if(x.status===401||x.status===403){ blocked=true; }
  }catch(e){}
  if(!serverOk && !blocked){ offline=true; blocked=true; }
  var loc=RO?null:readLocal();
  if(loc && loc.data){
    if(!serverOk){ data=loc.data; rev=loc.baseRev||0; }
    else if(loc.dirty && loc.baseRev===rev){ data=loc.data; dirty=true; }
    else if(rev===0 && !Object.keys(data).length){ data=loc.data; dirty=true; }
  }
  function status(kind){
    if(RO) return;
    if(!pill){ if(!document.body) return; pill=document.createElement('div'); pill.setAttribute('role','status');
      pill.style.cssText='position:fixed;right:10px;bottom:10px;z-index:99999;font:600 12px system-ui,sans-serif;padding:5px 10px;border-radius:999px;box-shadow:0 1px 6px rgba(0,0,0,.25);pointer-events:none;max-width:80vw';
      document.body.appendChild(pill); }
    var m={local:['Збережено на цьому пристрої · на сервер за хвилину-дві','#e8e8e0','#111'],saving:['Синхронізую з сервером…','#e8e8e0','#111'],saved:['Збережено ✓','#dfff3c','#111'],
      error:['Сервер не відповідає, повторю. Зміни збережено локально','#ffd9a0','#111'],offline:['Сховище недоступне. Працюєте локально, на сервер піде пізніше','#ffd9a0','#111'],
      conflict:['Відкрито на іншому пристрої — оновіть сторінку, щоб не втратити зміни','#ff9184','#111'],auth:['Сесія завершилась — увійдіть знову','#ff9184','#111']}[kind];
    pill.textContent=m[0]; pill.style.background=m[1]; pill.style.color=m[2]; pill.style.opacity='1';
    clearTimeout(hideT); if(kind==='saved') hideT=setTimeout(function(){ pill.style.opacity='.55'; },2500);
  }
  function flush(unload){
    clearTimeout(t); t=null;
    if(RO||blocked||inflight||!dirty) return;
    var body=JSON.stringify(sync(data));
    if(body===lastSent){ dirty=false; writeLocal(); return; }
    dirty=false; inflight=true; status('saving');
    fetch(URL_,{method:'PUT',credentials:'same-origin',headers:{'Content-Type':'application/json','If-Match':String(rev)},body:body,keepalive:!!unload&&body.length<60000})
      .then(function(r){
        inflight=false;
        if(r.status===409){ blocked=true; status('conflict'); return; }
        if(r.status===401||r.status===403){ blocked=true; status('auth'); return; }
        if(!r.ok){ dirty=true; fails++; status('error'); writeLocal(); t=setTimeout(function(){ flush(); },Math.min(300000,30000*fails)); return; }
        rev=parseInt(r.headers.get('X-Rev')||String(rev),10)||rev; lastSent=body; fails=0; writeLocal(); status('saved');
        if(dirty) schedule();
      }).catch(function(){ inflight=false; dirty=true; fails++; status('error'); writeLocal(); t=setTimeout(function(){ flush(); },Math.min(300000,30000*fails)); });
  }
  function schedule(){
    clearTimeout(t);
    if(!firstChange) firstChange=Date.now();
    if(Date.now()-firstChange>=MAXWAIT){ firstChange=0; flush(); return; }
    t=setTimeout(function(){ firstChange=0; flush(); },DEBOUNCE);
  }
  function change(){ dirty=true; writeLocal(); status(offline?'offline':'local'); if(!offline) schedule(); }
  var mem={
    get length(){ return Object.keys(data).length; },
    key:function(i){ return Object.keys(data)[i]||null; },
    getItem:function(k){ return Object.prototype.hasOwnProperty.call(data,k)?data[k]:null; },
    setItem:function(k,v){ data[String(k)]=String(v); change(); },
    removeItem:function(k){ delete data[k]; change(); },
    clear:function(){ data={}; change(); }
  };
  try{ Object.defineProperty(window,'localStorage',{configurable:true,value:mem}); }catch(e){}
  window.addEventListener('pagehide',function(){ flush(true); });
  document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden') flush(true); });
  if(offline) document.addEventListener('DOMContentLoaded',function(){ status('offline'); });
  if(RO) document.addEventListener('DOMContentLoaded',function(){
    var b=document.createElement('div'); b.textContent='Перегляд: '+C.as+' (зміни не зберігаються)';
    b.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#dfff3c;color:#111;font:600 13px system-ui;padding:6px 12px;text-align:center';
    document.body.appendChild(b); });
})();</script>`;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const b = url.searchParams.get("b") ?? "";
  const v = url.searchParams.get("v") === "example" ? "example" : "main";
  const as = url.searchParams.get("as") ?? "";
  const me = await currentUser(request);
  if (!me) return new Response("Потрібен вхід", { status: 401, headers: NOINDEX });
  if (as && me.role !== "admin") return new Response("Немає доступу", { status: 403, headers: NOINDEX });
  if (!BOOK_ID.test(b)) return new Response("Невідомий воркбук", { status: 404, headers: NOINDEX });
  if (!storageReady()) return new Response("Сховище не підключене", { status: 503, headers: NOINDEX });
  let book;
  try {
    book = (await loadBooks()).find((x) => x.id === b);
  } catch (e) {
    if (e instanceof StoreError) return new Response("Сховище тимчасово недоступне. Дані не втрачено. Спробуйте за кілька хвилин.", { status: 503, headers: { ...NOINDEX, "Content-Type": "text/plain; charset=utf-8" } });
    throw e;
  }
  // Для режиму «перегляд учня» показуємо ту версію, що бачить учень (а якщо її немає — шаблон власника)
  const asTrack = as ? normTrack((await loadStudents()).find((s) => s.email === as.toLowerCase())?.track) : "business";
  const file = book ? (as ? (fileFor(book, "student", "main", asTrack) ?? fileFor(book, "admin", "main")) : fileFor(book, me.role, v, me.track)) : null;
  if (!file) return new Response("Цей воркбук ще готується", { status: 404, headers: { ...NOINDEX, "Content-Type": "text/plain; charset=utf-8" } });
  if (as && (await readText(statePath(as, b, "main"), true)) === null)
    return new Response(`<!doctype html><meta charset="utf-8"><body style="font:16px system-ui;display:grid;place-items:center;height:100vh;margin:0;color:#666;text-align:center;padding:24px">Учень ще нічого не заповнював у цьому воркбуці.</body>`, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
  let html: string | null;
  try {
    html = await readText(file, false, 600_000);
  } catch (e) {
    if (e instanceof StoreError) return new Response("Сховище тимчасово недоступне. Дані не втрачено. Спробуйте за кілька хвилин.", { status: 503, headers: { ...NOINDEX, "Content-Type": "text/plain; charset=utf-8" } });
    throw e;
  }
  if (!html) return new Response("Файл воркбука не знайдено у сховищі", { status: 404, headers: NOINDEX });
  const shim = SHIM({ b, v, as, u: userKey(me.email) });
  const page = html.includes("<head>") ? html.replace("<head>", () => "<head>" + shim) : shim + html;
  return new Response(page, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
