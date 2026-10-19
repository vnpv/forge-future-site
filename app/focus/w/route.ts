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

/** JSON для вставки в <script>: `<` екрануємо, щоб значення не закрило тег. */
const safeJson = (x: unknown) => JSON.stringify(x).replace(/</g, "\\u003c");

const SHIM = (cfg: { b: string; v: string; as: string; u: string }) => `<script>(function(){
  var C=${safeJson(cfg)}, RO=!!C.as;
  var URL_='/focus/api/state?b='+encodeURIComponent(C.b)+'&v='+encodeURIComponent(C.v)+(C.as?'&as='+encodeURIComponent(C.as):'');
  var LK='ffw:'+C.u+':'+C.b+':'+C.v, DEBOUNCE=120000, MAXWAIT=300000;
  var data={}, rev=0, lastSent=null, dirty=false, inflight=false, blocked=false, fails=0, pill=null, hideT=null, t=null, firstChange=0, serverOk=false, offline=false;
  var real=null; try{ real=window.localStorage; real.getItem('ffw:probe'); }catch(e){ real=null; }
  function sync(d){ var o={}; Object.keys(d).forEach(function(k){ if(!/(_tab(_|$)|_step$)/.test(k)) o[k]=d[k]; }); return o; }
  function readLocal(){ try{ var j=real&&real.getItem(LK); return j?JSON.parse(j):null; }catch(e){ return null; } }
  function writeLocal(){ try{ if(real&&!RO) real.setItem(LK,JSON.stringify({baseRev:rev,dirty:dirty||inflight,ts:Date.now(),data:data})); }catch(e){} }
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

/**
 * Коментарі власника до відповідей: admin у режимі «Роботи учнів» бачить кнопку під кожним заповненим полем
 * (за data-key), учень — свої коментарі під відповідями + плашку з лічильником. Поле коментаря не має data-key
 * і не пропускає події нагору, щоб скрипти воркбука не сприйняли його як зміну відповідей.
 */
const COMMENTS = (cfg: { b: string; as: string; admin: boolean }) => `<script>(function(){
  var C=${safeJson(cfg)};
  var API='/focus/api/comments?b='+encodeURIComponent(C.b)+(C.as?'&as='+encodeURIComponent(C.as):'');
  var items={}, boxes={}, jump=0;
  var css=document.createElement('style');
  css.textContent='.ffc{display:block!important;width:100%;max-width:100%;box-sizing:border-box;margin:6px 0 10px;font:14px/1.45 system-ui,sans-serif;color:#222;text-align:left}'
    +'.ffc[hidden],.ffc [hidden]{display:none!important}'
    +'body>.ffc-gen{max-width:860px;margin:10px auto;padding:0 12px}'
    +'.ffc-c{background:#fff4c2;border:1px solid #e6cf6a;border-left:4px solid #d9b62b;border-radius:8px;padding:8px 11px;margin:6px 0}'
    +'.ffc-t{white-space:pre-wrap;word-break:break-word}'
    +'.ffc-m{margin-top:4px;font-size:12px;color:#6b5a14;display:flex;gap:10px;align-items:center;flex-wrap:wrap}'
    +'.ffc button{font:inherit;font-size:12.5px;cursor:pointer;border-radius:7px;padding:3px 9px;margin:0;width:auto;min-width:0}'
    +'.ffc-b{background:transparent;border:1px solid rgba(0,0,0,.25);color:#555}'
    +'.ffc-b{background:#fff4c2;border-color:#d9b62b;color:#4a3d05}'
    +'.ffc-open{border-style:dashed;opacity:.85}.ffc-open:hover{opacity:1}'
    +'.ffc-form{margin:6px 0;display:grid;gap:6px}'
    +'.ffc-form textarea{width:100%;box-sizing:border-box;min-height:70px;padding:8px 10px;font:14px/1.45 system-ui,sans-serif;color:#222;background:#fffdf0;border:1px solid #d9b62b;border-radius:8px;resize:vertical}'
    +'.ffc-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}'
    +'.ffc-send{background:#d9b62b;border:0;color:#201a00;font-weight:600}.ffc-send[disabled]{opacity:.5}'
    +'.ffc-err{color:#b0362b;font-size:12.5px}'
    +'.ffc-gen .ffc-c{border-left-color:#8a6d00}'
    +'.ffc-pill{position:fixed;left:10px;bottom:10px;z-index:99998;font:600 12px system-ui,sans-serif;padding:6px 11px;border-radius:999px;border:0;background:#fff4c2;color:#201a00;box-shadow:0 1px 6px rgba(0,0,0,.3);cursor:pointer}';
  document.head.appendChild(css);
  function el(t,c,x){ var e=document.createElement(t); if(c) e.className=c; if(x!==undefined) e.textContent=x; return e; }
  function fmt(iso){ try{ return new Date(iso).toLocaleDateString('uk-UA',{day:'numeric',month:'long'}); }catch(e){ return ''; } }
  function api(method,url,body){
    return fetch(url,{method:method,credentials:'same-origin',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined})
      .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(d){ if(!r.ok) throw new Error(d.error||'Помилка'); return d; }); });
  }
  function composer(key){
    var wrap=el('div','ffc-add');
    var open=el('button','ffc-b ffc-open',key==='_general'?'+ Загальний коментар':'+ Коментар'); open.type='button';
    var form=el('div','ffc-form'); form.hidden=true;
    var ta=document.createElement('textarea'); ta.placeholder='Коментар для учня…'; ta.maxLength=2000;
    var row=el('div','ffc-row'), send=el('button','ffc-send','Надіслати'), cancel=el('button','ffc-b','Скасувати'), msg=el('span','ffc-err');
    send.type='button'; cancel.type='button';
    row.appendChild(send); row.appendChild(cancel); row.appendChild(msg); form.appendChild(ta); form.appendChild(row);
    wrap.appendChild(open); wrap.appendChild(form);
    open.onclick=function(){ form.hidden=false; open.hidden=true; ta.focus(); };
    cancel.onclick=function(){ form.hidden=true; open.hidden=false; ta.value=''; msg.textContent=''; };
    function submit(){
      var text=ta.value.trim(); if(!text||send.disabled) return;
      send.disabled=true; msg.textContent='';
      api('POST',API,{key:key,text:text}).then(function(d){
        (items[key]=items[key]||[]).push(d.comment); render(key); updatePill();
      }).catch(function(e){ send.disabled=false; msg.textContent=e.message; });
    }
    send.onclick=submit;
    ta.addEventListener('keydown',function(e){ if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){ e.preventDefault(); submit(); } });
    ['input','change','keydown','keyup','keypress','click','mousedown','focusin'].forEach(function(ev){ wrap.addEventListener(ev,function(e){ e.stopPropagation(); }); });
    return wrap;
  }
  function render(key){
    var box=boxes[key]; if(!box) return;
    box.textContent='';
    var list=items[key]||[];
    list.forEach(function(c){
      var row=el('div','ffc-c'); row.appendChild(el('div','ffc-t',c.text));
      var meta=el('div','ffc-m',(key==='_general'?'Загальний коментар від Івана':'Коментар від Івана')+' · '+fmt(c.at));
      if(C.admin){
        var del=el('button','ffc-b','Видалити'); del.type='button';
        del.onclick=function(){
          if(!confirm('Видалити коментар?')) return;
          api('DELETE',API+'&key='+encodeURIComponent(key)+'&id='+encodeURIComponent(c.id)).then(function(){
            items[key]=(items[key]||[]).filter(function(x){ return x.id!==c.id; }); if(!items[key].length) delete items[key];
            render(key); updatePill();
          }).catch(function(e){ alert(e.message); });
        };
        meta.appendChild(del);
      }
      row.appendChild(meta); box.appendChild(row);
    });
    if(C.admin) box.appendChild(composer(key));
    box.setAttribute('data-has',list.length?'1':'');
  }
  function ensure(key,anchor,where){
    if(boxes[key]) return;
    var box=el('div','ffc'+(key==='_general'?' ffc-gen':'')); boxes[key]=box;
    if(where==='prepend') anchor.insertBefore(box,anchor.firstChild); else anchor.insertAdjacentElement('afterend',box);
    render(key);
  }
  function updatePill(){
    var old=document.getElementById('ffc-pill'); if(old) old.remove();
    if(C.admin) return;
    var n=0; Object.keys(items).forEach(function(k){ n+=items[k].length; });
    if(!n) return;
    var p=el('button','ffc-pill','Коментарів від Івана: '+n); p.id='ffc-pill'; p.type='button';
    p.onclick=function(){
      var list=Array.prototype.filter.call(document.querySelectorAll('.ffc[data-has="1"]'),function(b){ return b.offsetParent!==null; });
      if(!list.length) return;
      list[jump++%list.length].scrollIntoView({behavior:'smooth',block:'center'});
    };
    document.body.appendChild(p);
  }
  function build(){
    if(C.admin||(items._general||[]).length) ensure('_general',document.body,'prepend');
    Array.prototype.forEach.call(document.querySelectorAll('[data-key]'),function(f){
      var k=f.getAttribute('data-key'); if(!k||boxes[k]) return;
      var t=f.tagName, ty=(f.type||'').toLowerCase();
      if(!(t==='TEXTAREA'||t==='SELECT'||(t==='INPUT'&&['text','number','date','url','email','tel',''].indexOf(ty)>-1))) return;
      var has=(items[k]||[]).length>0, filled=String(f.value||'').trim()!=='';
      if(has||(C.admin&&filled)) ensure(k,f,'after');
    });
    updatePill();
  }
  function init(){
    api('GET',API).then(function(d){ items=d.items||{}; }).catch(function(){ items={}; }).then(function(){ build(); setTimeout(build,1500); });
  }
  if(document.readyState==='complete') setTimeout(init,300); else window.addEventListener('load',function(){ setTimeout(init,300); });
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
  const withComments = as ? me.role === "admin" : me.role === "student" && v === "main";
  const shim = SHIM({ b, v, as, u: userKey(me.email) }) + (withComments ? COMMENTS({ b, as, admin: Boolean(as) }) : "");
  const page = html.includes("<head>") ? html.replace("<head>", () => "<head>" + shim) : shim + html;
  return new Response(page, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
