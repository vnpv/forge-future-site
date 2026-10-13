import { BOOKS, NOINDEX, validSession } from "../auth";
import { readText, storageReady } from "../store";

/**
 * Віддає воркбук (n=1|2|3) з приватного Blob після входу.
 * У <head> додається невеликий скрипт: відповіді воркбука (localStorage) синхронізуються
 * з сервером, тож стан однаковий на всіх пристроях і не губиться разом із браузером.
 */
export const dynamic = "force-dynamic";

const SHIM = (n: string) => `<script>(function(){
  var N=${JSON.stringify(n)}, URL='/focus/api/state?n='+N, ls=window.localStorage;
  var setI=Storage.prototype.setItem, remI=Storage.prototype.removeItem, timer=null, dirty=false, tracked={};
  function snapshot(){ var o={}; for(var i=0;i<ls.length;i++){ var k=ls.key(i); if(tracked[k]) o[k]=ls.getItem(k); } return o; }
  function push(){
    timer=null; if(!dirty) return; dirty=false;
    try{ fetch(URL,{method:'PUT',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(snapshot()),keepalive:true}); }catch(e){}
  }
  function schedule(){ dirty=true; if(timer) clearTimeout(timer); timer=setTimeout(push,900); }
  try{
    var x=new XMLHttpRequest(); x.open('GET',URL,false); x.send(null);
    if(x.status===200){ var st=JSON.parse(x.responseText||'{}'); Object.keys(st).forEach(function(k){ tracked[k]=1; setI.call(ls,k,st[k]); }); }
  }catch(e){}
  Storage.prototype.setItem=function(k,v){ setI.call(this,k,v); if(this===ls){ tracked[k]=1; schedule(); } };
  Storage.prototype.removeItem=function(k){ remI.call(this,k); if(this===ls&&tracked[k]){ delete tracked[k]; try{ fetch(URL,{method:'PUT',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(snapshot())}); }catch(e){} } };
  window.addEventListener('pagehide',function(){ if(dirty) push(); });
})();</script>`;

export async function GET(request: Request) {
  const n = new URL(request.url).searchParams.get("n") ?? "";
  const book = BOOKS[n];
  if (!(await validSession(request))) return new Response("Потрібен вхід", { status: 401, headers: NOINDEX });
  if (!book) return new Response("Невідомий воркбук", { status: 404, headers: NOINDEX });
  if (!storageReady()) return new Response("Сховище не підключене", { status: 503, headers: NOINDEX });
  const html = await readText(book.file);
  if (!html) return new Response("Воркбук ще не завантажений у сховище", { status: 404, headers: NOINDEX });
  const page = html.includes("<head>") ? html.replace("<head>", () => "<head>" + SHIM(n)) : SHIM(n) + html;
  return new Response(page, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
