import { NOINDEX, currentUser, loadStudents, normTrack, statePath } from "../auth";
import { BOOK_ID, fileFor, loadBooks } from "../books";
import { readText, storageReady } from "../store";

/**
 * Віддає воркбук (?b=<id>&v=main|example) з приватного Blob після входу.
 * У <head> додається скрипт, що підміняє localStorage на сторінці сховищем у пам'яті, яке
 * синхронізується з сервером (персонально для користувача): стан однаковий на всіх пристроях
 * і не змішується між людьми, що сидять в одному браузері.
 * ?as=<email> — режим перегляду для admin: роботи учня без збереження змін.
 */
export const dynamic = "force-dynamic";

const SHIM = (cfg: { b: string; v: string; as: string }) => `<script>(function(){
  var C=${JSON.stringify(cfg)}, RO=!!C.as;
  var URL_='/focus/api/state?b='+encodeURIComponent(C.b)+'&v='+encodeURIComponent(C.v)+(C.as?'&as='+encodeURIComponent(C.as):'');
  var data={}, rev=0, lastSent=null, dirty=false, inflight=false, blocked=false, fails=0, pill=null, hideT=null;
  try{ var x=new XMLHttpRequest(); x.open('GET',URL_,false); x.send(null);
    if(x.status===200){ data=JSON.parse(x.responseText||'{}')||{}; rev=parseInt(x.getResponseHeader('X-Rev')||'0',10)||0; lastSent=JSON.stringify(data); }
  }catch(e){}
  function status(kind){
    if(RO) return;
    if(!pill){ if(!document.body) return; pill=document.createElement('div');
      pill.setAttribute('role','status');
      pill.style.cssText='position:fixed;right:10px;bottom:10px;z-index:99999;font:600 12px system-ui,sans-serif;padding:5px 10px;border-radius:999px;box-shadow:0 1px 6px rgba(0,0,0,.25);pointer-events:none';
      document.body.appendChild(pill); }
    var m={saving:['Зберігаю…','#e8e8e0','#111'],saved:['Збережено ✓','#dfff3c','#111'],error:['Не збережено, повторюю…','#ff9184','#111'],conflict:['Відкрито на іншому пристрої — оновіть сторінку, щоб не втратити зміни','#ff9184','#111'],auth:['Сесія завершилась — увійдіть знову','#ff9184','#111']}[kind];
    pill.textContent=m[0]; pill.style.background=m[1]; pill.style.color=m[2]; pill.style.opacity='1';
    clearTimeout(hideT); if(kind==='saved') hideT=setTimeout(function(){ pill.style.opacity='.55'; },2500);
  }
  function retry(){ fails++; status('error'); setTimeout(flush,Math.min(30000,1000*Math.pow(2,fails))); }
  function flush(unload){
    if(RO||blocked||inflight||!dirty) return;
    var body=JSON.stringify(data);
    if(body===lastSent){ dirty=false; return; }
    dirty=false; inflight=true; status('saving');
    fetch(URL_,{method:'PUT',credentials:'same-origin',headers:{'Content-Type':'application/json','If-Match':String(rev)},body:body,keepalive:!!unload&&body.length<60000})
      .then(function(r){
        inflight=false;
        if(r.status===409){ blocked=true; status('conflict'); return; }
        if(r.status===401||r.status===403){ blocked=true; status('auth'); return; }
        if(!r.ok){ dirty=true; retry(); return; }
        rev=parseInt(r.headers.get('X-Rev')||String(rev),10)||rev; lastSent=body; fails=0; status('saved');
        if(dirty) flush();
      }).catch(function(){ inflight=false; dirty=true; retry(); });
  }
  function change(){ dirty=true; flush(); }
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
  const book = (await loadBooks()).find((x) => x.id === b);
  // Для режиму «перегляд учня» показуємо ту версію, що бачить учень (а якщо її немає — шаблон власника)
  const asTrack = as ? normTrack((await loadStudents()).find((s) => s.email === as.toLowerCase())?.track) : "business";
  const file = book ? (as ? (fileFor(book, "student", "main", asTrack) ?? fileFor(book, "admin", "main")) : fileFor(book, me.role, v, me.track)) : null;
  if (!file) return new Response("Цей воркбук ще готується", { status: 404, headers: { ...NOINDEX, "Content-Type": "text/plain; charset=utf-8" } });
  if (as && (await readText(statePath(as, b, "main"), true)) === null)
    return new Response(`<!doctype html><meta charset="utf-8"><body style="font:16px system-ui;display:grid;place-items:center;height:100vh;margin:0;color:#666;text-align:center;padding:24px">Учень ще нічого не заповнював у цьому воркбуці.</body>`, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
  const html = await readText(file);
  if (!html) return new Response("Файл воркбука не знайдено у сховищі", { status: 404, headers: NOINDEX });
  const shim = SHIM({ b, v, as });
  const page = html.includes("<head>") ? html.replace("<head>", () => "<head>" + shim) : shim + html;
  return new Response(page, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
