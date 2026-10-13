import { NOINDEX, currentUser } from "../auth";
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
  var data={}, timer=null, dirty=false;
  try{ var x=new XMLHttpRequest(); x.open('GET',URL_,false); x.send(null); if(x.status===200){ data=JSON.parse(x.responseText||'{}')||{}; } }catch(e){}
  function push(){ timer=null; if(!dirty||RO) return; dirty=false;
    try{ fetch(URL_,{method:'PUT',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),keepalive:true}); }catch(e){} }
  function schedule(){ dirty=true; if(timer) clearTimeout(timer); timer=setTimeout(push,900); }
  var mem={
    get length(){ return Object.keys(data).length; },
    key:function(i){ return Object.keys(data)[i]||null; },
    getItem:function(k){ return Object.prototype.hasOwnProperty.call(data,k)?data[k]:null; },
    setItem:function(k,v){ data[String(k)]=String(v); schedule(); },
    removeItem:function(k){ delete data[k]; schedule(); },
    clear:function(){ data={}; schedule(); }
  };
  try{ Object.defineProperty(window,'localStorage',{configurable:true,value:mem}); }catch(e){}
  window.addEventListener('pagehide',function(){ if(dirty) push(); });
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
  // Для режиму «перегляд учня» показуємо ту версію, що бачить учень
  const role = as ? "student" : me.role;
  const file = book ? fileFor(book, role, v) : null;
  if (!file) return new Response("Цей воркбук ще готується", { status: 404, headers: { ...NOINDEX, "Content-Type": "text/plain; charset=utf-8" } });
  const html = await readText(file);
  if (!html) return new Response("Файл воркбука не знайдено у сховищі", { status: 404, headers: NOINDEX });
  const shim = SHIM({ b, v, as });
  const page = html.includes("<head>") ? html.replace("<head>", () => "<head>" + shim) : shim + html;
  return new Response(page, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
