// Електронний щоденник MIDGARD v0.1. Увага: у вбудованому JS немає зворотних лапок і «${» — це String.raw.
const html: string = String.raw`<!doctype html><html lang="uk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>Електронний щоденник · MIDGARD</title>
<link rel="icon" href="/images/midgard-logo.jpg">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;600;700&family=Unbounded:wght@500;600&display=swap">
<style>
:root{--bg:#f3f6ea;--card:#fff;--ink:#18202f;--muted:#5d6678;--line:#dde3d0;--soft:#eef3df;--lime:#9ccc2c;--limeink:#14200a;--blue:#2a4fb0;--blue-soft:#e6ecfb;--ok:#2f8a3a;--ok-soft:#e1f2dd;--warn:#a8650d;--warn-soft:#fbefd5;--bad:#b0362b;--bad-soft:#f9e2df;--info:#2a4fb0;--info-soft:#e6ecfb;--shadow:0 1px 2px rgba(24,32,47,.06),0 6px 20px rgba(24,32,47,.05);color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#10140b;--card:#1a2013;--ink:#e8ecdf;--muted:#a3ab96;--line:#2f3824;--soft:#232b19;--lime:#a8d940;--blue:#8ea8ff;--blue-soft:#1f2745;--ok:#7fd68a;--ok-soft:#1b3320;--warn:#f0b45c;--warn-soft:#3a2d12;--bad:#ff9184;--bad-soft:#3a1e1b;--info:#8ea8ff;--info-soft:#1f2745;--shadow:0 1px 2px rgba(0,0,0,.3),0 6px 20px rgba(0,0,0,.25);color-scheme:dark}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 Commissioner,system-ui,sans-serif;min-height:100vh}
h1,h2,h3{margin:0;font-family:Unbounded,Commissioner,sans-serif;font-weight:600;line-height:1.2}
button,select,input,textarea{font:inherit;color:inherit}
button{cursor:pointer}
a{color:var(--blue)}
:focus-visible{outline:2px solid var(--blue);outline-offset:2px;border-radius:6px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
/* каркас */
.app{display:grid;grid-template-columns:232px 1fr;min-height:100vh}
.side{position:sticky;top:0;height:100vh;padding:20px 14px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:18px;background:var(--card)}
.brand{display:flex;align-items:center;gap:10px;padding:0 6px}
.brand img{width:40px;height:40px;border-radius:10px}
.brand b{font:600 14px/1.15 Unbounded,sans-serif;display:block}
.brand small{color:var(--muted);font-size:12px}
.nav{display:grid;gap:3px}
.nav button{display:flex;align-items:center;gap:11px;padding:10px 12px;border:0;border-radius:10px;background:none;text-align:left;font-weight:500;color:var(--muted)}
.nav button svg{width:20px;height:20px;flex:none}
.nav button:hover{background:var(--soft);color:var(--ink)}
.nav button[aria-current=page]{background:var(--lime);color:var(--limeink);font-weight:600}
.side .foot{margin-top:auto;font-size:12.5px;color:var(--muted);display:grid;gap:6px;padding:0 6px}
.main{min-width:0;padding:0 28px 48px}
.top{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:16px 0;position:sticky;top:0;z-index:5;background:var(--bg)}
.top h1{font-size:20px;flex:1;min-width:160px}
.who{display:flex;gap:4px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:3px}
.who button{border:0;background:none;padding:6px 12px;border-radius:9px;font-size:13.5px;font-weight:500;color:var(--muted)}
.who button[aria-pressed=true]{background:var(--blue);color:#fff}
.demo{font-size:12px;font-weight:600;background:var(--warn-soft);color:var(--warn);padding:4px 10px;border-radius:99px}
.mtabs{display:none}
/* картки */
.grid{display:grid;gap:16px}
.g2{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr)}
.g3{grid-template-columns:repeat(3,minmax(0,1fr))}
.g4{grid-template-columns:repeat(4,minmax(0,1fr))}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px;box-shadow:var(--shadow)}
.card h2{font-size:15px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:8px}
.card h2 small{font:500 12.5px Commissioner,sans-serif;color:var(--muted)}
.stat b{display:block;font:600 30px/1.1 Unbounded,sans-serif}
.stat span{color:var(--muted);font-size:13px}
.stat em{font-style:normal;font-size:12.5px;font-weight:600;margin-left:6px}
.up{color:var(--ok)}.down{color:var(--bad)}
.hello{padding:22px;border-radius:18px;background:linear-gradient(135deg,var(--lime),#c6e46d);color:var(--limeink);margin-bottom:16px}
.hello h2{font-size:22px;margin-bottom:6px}
.hello p{margin:0;opacity:.85}
@media (prefers-color-scheme:dark){.hello{background:linear-gradient(135deg,#34461a,#4a6320);color:#eef6d8}}
/* чіпи й мітки */
.chip{display:inline-flex;align-items:center;gap:5px;padding:2px 9px;border-radius:99px;font-size:12.5px;font-weight:600;background:var(--soft);color:var(--muted);white-space:nowrap}
.chip.ok{background:var(--ok-soft);color:var(--ok)}.chip.warn{background:var(--warn-soft);color:var(--warn)}.chip.bad{background:var(--bad-soft);color:var(--bad)}.chip.info{background:var(--info-soft);color:var(--info)}
.gr{display:inline-grid;place-items:center;min-width:28px;height:28px;padding:0 6px;border-radius:8px;font-weight:700;font-size:14px;background:var(--info-soft);color:var(--info)}
.gr.hi{background:var(--ok-soft);color:var(--ok)}.gr.lo{background:var(--warn-soft);color:var(--warn)}.gr.vlo{background:var(--bad-soft);color:var(--bad)}
.dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--muted);flex:none}
.dot.p{background:var(--ok)}.dot.l{background:var(--warn)}.dot.a{background:var(--bad)}.dot.s,.dot.e,.dot.o{background:var(--info)}
/* урок */
.lesson{display:grid;grid-template-columns:62px 1fr auto;gap:12px;align-items:center;width:100%;text-align:left;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:var(--card);margin-bottom:8px;border-left:5px solid var(--c)}
.lesson:hover{border-color:var(--c);box-shadow:var(--shadow)}
.lesson.now{outline:2px solid var(--lime);outline-offset:1px}
.lesson time{font-size:13px;color:var(--muted);line-height:1.25;font-variant-numeric:tabular-nums}
.lesson time b{display:block;color:var(--ink);font-size:15px}
.lesson .t{font-weight:600}
.lesson .s{font-size:13.5px;color:var(--muted)}
.lesson .r{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
.lesson.free{border-style:dashed;color:var(--muted);cursor:default}
.empty{padding:28px;text-align:center;color:var(--muted)}
/* тиждень */
.wk{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.day h3{font:600 13px Commissioner,sans-serif;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 8px;display:flex;justify-content:space-between}
.day.today h3{color:var(--ink)}
.day.today h3 b{background:var(--lime);color:var(--limeink);padding:0 8px;border-radius:99px}
.cell{display:block;width:100%;text-align:left;padding:9px 10px;margin-bottom:7px;border:1px solid var(--line);border-left:4px solid var(--c);border-radius:11px;background:var(--card)}
.cell:hover{border-color:var(--c);box-shadow:var(--shadow)}
.cell .n{font-weight:600;font-size:13.5px;line-height:1.25}
.cell .m{font-size:12px;color:var(--muted);display:flex;gap:6px;flex-wrap:wrap;margin-top:3px;align-items:center}
.cell.warn{background:var(--warn-soft)}
.cell.gap{border-style:dashed;color:var(--muted);text-align:center;min-height:0;padding:6px}
.wkbar{display:flex;gap:8px;align-items:center;margin-bottom:14px;flex-wrap:wrap}
.btn{border:1px solid var(--line);background:var(--card);padding:8px 14px;border-radius:10px;font-weight:600;font-size:14px}
.btn:hover{border-color:var(--blue)}
.btn.pri{background:var(--blue);border-color:var(--blue);color:#fff}
.btn.lime{background:var(--lime);border-color:var(--lime);color:var(--limeink)}
.btn.sm{padding:5px 10px;font-size:13px}
.seg{display:inline-flex;background:var(--soft);border-radius:10px;padding:3px;gap:2px;flex-wrap:wrap}
.seg button{border:0;background:none;padding:5px 12px;border-radius:8px;font-size:13.5px;font-weight:500;color:var(--muted)}
.seg button[aria-pressed=true]{background:var(--card);color:var(--ink);box-shadow:var(--shadow);font-weight:600}
.dayTabs{display:none}
/* таблиці */
.tbl{width:100%;border-collapse:collapse;font-size:14px}
.tbl th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);font-weight:600;text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);white-space:nowrap}
.tbl td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:middle}
.tbl tr:last-child td{border-bottom:0}
.scroll{overflow-x:auto}
.subj{display:flex;align-items:center;gap:10px;font-weight:600}
.subj i{width:10px;height:10px;border-radius:3px;background:var(--c);flex:none}
details.sj{border:1px solid var(--line);border-radius:14px;margin-bottom:8px;background:var(--card);overflow:hidden}
details.sj summary{list-style:none;display:grid;grid-template-columns:minmax(120px,1.2fr) 70px 90px minmax(0,1.6fr) 20px;gap:12px;align-items:center;padding:12px 16px;cursor:pointer}
details.sj summary::-webkit-details-marker{display:none}
details.sj[open] summary{border-bottom:1px solid var(--line)}
details.sj .body{padding:6px 16px 12px}
.chips{display:flex;gap:5px;flex-wrap:wrap}
.row{display:flex;gap:12px;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--line)}
.row:last-child{border-bottom:0}
.row button.lnk{border:0;background:none;color:var(--blue);font-weight:600;padding:0;text-align:left}
/* відвідування */
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.cal .h{font-size:12px;color:var(--muted);text-align:center;text-transform:uppercase}
.cal button,.cal div.d{aspect-ratio:1;min-height:42px;border-radius:10px;border:1px solid var(--line);background:var(--card);display:grid;place-items:center;font-weight:600;position:relative}
.cal div.d{border:0;background:none;color:var(--muted);font-weight:400}
.cal button.p{background:var(--ok-soft);border-color:transparent}
.cal button.l{background:var(--warn-soft);border-color:transparent}
.cal button.a{background:var(--bad-soft);border-color:transparent}
.cal button.s,.cal button.e,.cal button.o{background:var(--info-soft);border-color:transparent}
.cal button.sel{outline:2px solid var(--ink)}
.cal button.td{box-shadow:inset 0 0 0 2px var(--lime)}
.legend{display:flex;gap:14px;flex-wrap:wrap;font-size:13px;color:var(--muted);margin-top:12px}
.legend span{display:inline-flex;gap:6px;align-items:center}
/* фільтри */
.filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;align-items:center}
.inp{padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card)}
/* журнал класу */
.jr td,.jr th{text-align:center;padding:6px 6px}
.jr td:first-child,.jr th:first-child{text-align:left;position:sticky;left:0;background:var(--card);z-index:1;min-width:120px;font-weight:600}
.jr button{display:inline-flex;gap:5px;align-items:center;justify-content:center;min-width:46px;height:34px;border:1px solid var(--line);background:var(--card);border-radius:8px;padding:0 6px;font-weight:700}
.jr button:hover{border-color:var(--blue)}
.jr button[disabled]{opacity:.6;cursor:default}
/* чат */
.chat{display:grid;grid-template-columns:280px 1fr;gap:0;min-height:480px;padding:0;overflow:hidden}
.contacts{border-right:1px solid var(--line);padding:8px}
.contacts button{display:grid;gap:2px;width:100%;text-align:left;padding:10px 12px;border:0;background:none;border-radius:10px}
.contacts button:hover{background:var(--soft)}
.contacts button[aria-pressed=true]{background:var(--soft)}
.contacts b{font-size:14px}.contacts small{color:var(--muted);font-size:12.5px}
.thread{display:flex;flex-direction:column;min-height:0}
.thread header{padding:14px 18px;border-bottom:1px solid var(--line);display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.msgs{flex:1;padding:16px 18px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;max-height:420px}
.msg{max-width:78%;padding:9px 13px;border-radius:14px;background:var(--soft)}
.msg.me{align-self:flex-end;background:var(--blue);color:#fff}
.msg small{display:block;opacity:.7;font-size:11.5px;margin-top:2px}
.compose{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line)}
.compose input{flex:1}
/* шторка уроку */
.ov{position:fixed;inset:0;background:rgba(10,14,6,.5);z-index:40;display:none}
.ov.on{display:block}
.sheet{position:absolute;top:0;right:0;bottom:0;width:min(560px,100%);background:var(--bg);overflow-y:auto;padding:0 0 28px;box-shadow:-10px 0 40px rgba(0,0,0,.25)}
.sheet .hd{position:sticky;top:0;z-index:2;background:var(--card);border-bottom:1px solid var(--line);padding:16px 20px;border-top:6px solid var(--c);display:flex;gap:12px;justify-content:space-between;align-items:flex-start}
.sheet .hd h2{font-size:18px}
.sheet .hd p{margin:4px 0 0;color:var(--muted);font-size:13.5px}
.sheet .x{border:0;background:var(--soft);width:34px;height:34px;border-radius:50%;font-size:18px;line-height:1}
.sec{padding:16px 20px 0}
.sec h3{font:600 12px Commissioner,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin-bottom:8px}
.box{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px}
.box+.box{margin-top:8px}
.meta{display:grid;gap:4px;font-size:13px;color:var(--muted)}
.meta b{color:var(--ink);font-weight:600}
.frm{display:grid;gap:10px}
.frm label{display:grid;gap:4px;font-size:13px;font-weight:600}
.frm input,.frm textarea,.frm select{padding:8px 10px;border:1px solid var(--line);border-radius:9px;background:var(--card);font-weight:400}
.frm textarea{min-height:64px;resize:vertical}
.att{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid var(--line)}
.att:last-child{border-bottom:0}
.att select{padding:5px 6px;border:1px solid var(--line);border-radius:8px;background:var(--card);font-size:13.5px}
.att input[type=number]{width:54px;padding:5px;border:1px solid var(--line);border-radius:8px;background:var(--card)}
.pop{position:fixed;inset:0;z-index:60;background:rgba(10,14,6,.45);display:none;place-items:center;padding:16px}
.pop.on{display:grid}
.pop .card{width:min(380px,100%)}
.opts{display:flex;gap:6px;flex-wrap:wrap}
.opts button{border:1px solid var(--line);background:var(--card);padding:7px 11px;border-radius:9px;font-weight:600}
.opts button[aria-pressed=true]{background:var(--blue);border-color:var(--blue);color:#fff}
.toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 18px;border-radius:99px;font-weight:600;z-index:80;opacity:0;pointer-events:none;transition:opacity .2s}
.toast.on{opacity:1}
.bars{display:grid;gap:8px}
.bar{display:grid;grid-template-columns:150px 1fr 36px;gap:10px;align-items:center;font-size:13.5px}
.bar i{display:block;height:10px;border-radius:99px;background:var(--c,var(--blue))}
.bar div{background:var(--soft);border-radius:99px;height:10px}
@media (max-width:1100px){.g4{grid-template-columns:repeat(2,1fr)}.g2{grid-template-columns:1fr}.wk{gap:6px}}
@media (max-width:820px){
 .app{grid-template-columns:1fr}.side{display:none}
 .main{padding:0 16px 96px}
 .top{padding:12px 0}.top h1{font-size:17px}
 .mtabs{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--card);border-top:1px solid var(--line);padding:6px 4px calc(6px + env(safe-area-inset-bottom));justify-content:space-around;overflow-x:auto}
 .mtabs button{flex:1;min-width:54px;border:0;background:none;display:grid;justify-items:center;gap:2px;font-size:11px;color:var(--muted);padding:4px 2px;font-weight:600}
 .mtabs button svg{width:22px;height:22px}
 .mtabs button[aria-current=page]{color:var(--ink)}
 .mtabs button[aria-current=page] svg{color:var(--blue)}
 .g3,.g4{grid-template-columns:1fr 1fr}
 .wk{display:block}.wk .day{display:none}.wk .day.act{display:block}
 .dayTabs{display:flex;gap:6px;margin-bottom:12px}
 .dayTabs button{flex:1;border:1px solid var(--line);background:var(--card);border-radius:10px;padding:8px 0;font-weight:600;font-size:13px}
 .dayTabs button[aria-pressed=true]{background:var(--lime);border-color:var(--lime);color:var(--limeink)}
 details.sj summary{grid-template-columns:1fr auto 20px}
 details.sj summary .chips,details.sj summary .sp{display:none}
 .chat{grid-template-columns:1fr}.contacts{border-right:0;border-bottom:1px solid var(--line)}
 .sheet{width:100%;top:8vh;border-radius:20px 20px 0 0}
 .bar{grid-template-columns:100px 1fr 30px}
 .lesson{grid-template-columns:52px 1fr}.lesson .r{grid-column:1/-1;justify-content:flex-start}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
@media print{.side,.top,.mtabs,.btn{display:none!important}.app{display:block}.card{box-shadow:none}}
</style></head><body>
<div class="app" id="app"></div>
<div class="ov" id="ov" aria-hidden="true"><div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetT"></div></div>
<div class="pop" id="pop" aria-hidden="true"><div class="card" id="popc" role="dialog" aria-modal="true"></div></div>
<div class="toast" id="toast" role="status"></div>
<noscript><p style="padding:24px">Для роботи щоденника потрібен JavaScript.</p></noscript>
<script>
(function(){
'use strict';
/* ===== утиліти ===== */
var app=document.getElementById('app'),ovEl=document.getElementById('ov'),sheet=document.getElementById('sheet'),pop=document.getElementById('pop'),popc=document.getElementById('popc'),toastEl=document.getElementById('toast');
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function p2(n){return n<10?'0'+n:''+n}
function iso(d){return d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate())}
function parse(s){return new Date(s+'T00:00:00')}
function addDays(s,n){var d=parse(s);d.setDate(d.getDate()+n);return iso(d)}
function addSchoolDays(s,n){var d=parse(s);while(n>0){d.setDate(d.getDate()+1);if(d.getDay()%6!==0)n--}return iso(d)}
function monday(s){var d=parse(s),w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);return iso(d)}
function toMin(t){var a=t.split(':');return +a[0]*60+ +a[1]}
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){var t=seed>>>0;return function(){t+=0x6D2B79F5;var r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296}}
var NOW=new Date(),TODAY=iso(NOW);
function nowMin(){return NOW.getHours()*60+NOW.getMinutes()}
var MONTHS=['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
var MONTHS_N=['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
var DAYS=['Пн','Вт','Ср','Чт','Пт'],DAYS_FULL=['Понеділок','Вівторок','Середа','Четвер','Пʼятниця'];
function dlabel(s){var d=parse(s);return d.getDate()+' '+MONTHS[d.getMonth()]}
function dfull(s){var d=parse(s),w=(d.getDay()+6)%7;return (w<5?DAYS_FULL[w]:(w===5?'Субота':'Неділя'))+', '+dlabel(s)}
function schoolDay(s){var w=parse(s).getDay();return w>0&&w<6}
var FOCUS=schoolDay(TODAY)?TODAY:addDays(TODAY,parse(TODAY).getDay()===6?2:1);

/* ===== стан ===== */
var KEY='midgard-diary-v1';
var S={role:'student',view:'today',week:0,tsubj:'mat',jsubj:'mat',ov:{},done:{},pe:{},msgs:{},chat:'',gper:'month',tf:'all',q:'',amonth:'',aday:'',jwk:0};
try{var saved=JSON.parse(localStorage.getItem(KEY)||'{}');for(var k in saved)S[k]=saved[k]}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

/* ===== демо-дані (вигадані імена, репозиторій публічний) ===== */
var SUBJ={
 mat:{n:'Математика',c:'#2a4fb0',t:'Олена С.',room:'204'},
 ukr:{n:'Українська мова',c:'#c2410c',t:'Ірина М.',room:'112'},
 eng:{n:'Англійська мова',c:'#0f766e',t:'Дарина Л.',room:'Лінгвокабінет'},
 his:{n:'Історія',c:'#7c3aed',t:'Андрій К.',room:'108'},
 phy:{n:'Фізика',c:'#0369a1',t:'Тарас Г.',room:'Лаб. 3'},
 inf:{n:'Інформатика',c:'#4d7c0f',t:'Сергій Б.',room:'Комп’ютерний клас'},
 bio:{n:'Біологія',c:'#15803d',t:'Наталія Р.',room:'210'},
 pe:{n:'Фізкультура',c:'#be123c',t:'Команда тренерів',room:'Спортзал'},
 art:{n:'Мистецтво',c:'#a21caf',t:'Леся Ш.',room:'Студія'}
};
var BELLS=[['08:30','09:15'],['09:25','10:10'],['10:30','11:15'],['11:35','12:20'],['12:40','13:25'],['13:35','14:20']];
var TPL=[['mat','ukr','eng','his','pe',null],['phy','mat','bio','eng','inf','art'],['ukr','mat','his','phy','pe',null],['eng','bio','mat','ukr','inf',null],['his','ukr','art','mat','pe',null]];
var STUDENTS=['Максим Д.','Соломія Т.','Артем К.','Ліза Б.','Назар Г.','Оля М.','Данило Р.','Єва Л.','Тимур С.','Крістіна Ш.','Роман П.','Аліса В.'];
var ME=0;
var SPORTS=['Баскетбол','Волейбол','Теніс','Стретчінг'];
var TOPICS={
 mat:['Лінійні рівняння','Системи рівнянь','Властивості степеня','Одночлени та многочлени','Формули скороченого множення','Розкладання на множники'],
 ukr:['Складне речення','Розділові знаки при звертанні','Типи підрядних речень','Пряма мова','Стилі мовлення','Однорідні члени речення'],
 eng:['Past Perfect','Conditionals, type 2','Phrasal verbs','Reported speech','Reading: city life','Writing: informal email'],
 his:['Козацька доба','Українська революція 1917–1921','Доба Гетьманщини','Культура XVII століття','Робота з джерелами','Узагальнення теми'],
 phy:['Рівномірний рух','Сила тертя','Закон Архімеда','Тиск у рідинах','Лабораторна: густина','Механічна робота'],
 inf:['Алгоритми з розгалуженням','Цикли у Python','Списки та рядки','Електронні таблиці','Безпека в мережі','Проєкт: міні-гра'],
 bio:['Клітинна будова','Фотосинтез','Системи органів','Екосистеми','Лабораторна: мікроскоп','Генетика: перші поняття'],
 pe:['Командні ігри','Розвиток витривалості','Гнучкість і баланс','Техніка передач','Ігрова практика','Нормативи'],
 art:['Композиція і колір','Портрет','Український орнамент','Графіка','Проєкт: плакат','Перспектива']
};
var HW=['§12, вправи 3–7','Підготувати коротку доповідь (5 хв)','Опрацювати конспект і відповісти на питання','Вивчити слова з уроку','Задачі №214–218','Прочитати параграф і скласти план','Повторити тему перед контрольною','Завершити роботу з уроку'];
var FEED=['Активна робота на уроці!','Варто повторити тему перед контрольною.','Гарна презентація, так тримати.','Допоміг однокласникам — дякую.','Чудове запитання до вчителя.'];
var ST={p:['Присутній','ok'],l:['Запізнення','warn'],a:['Відсутній (без причини)','bad'],s:['Хвороба','info'],e:['Поважна причина','info'],o:['Онлайн','info']};
var STORDER=['p','l','o','s','e','a'];

/* ===== генерація уроків ===== */
function lesson(date,slot){
 var wd=(parse(date).getDay()+6)%7;if(wd>4)return null;
 var code=TPL[wd][slot];if(!code)return null;
 var id=date+'-'+slot,o=S.ov[id]||{},sj=SUBJ[code],r=rng(hash(id));
 var past=date<TODAY||(date===TODAY&&nowMin()>toMin(BELLS[slot][1]));
 var recent=date>=addDays(TODAY,-1);
 var r1=r(),r2=r(),r3=r(),r4=r(),r5=r(),r6=r();
 var planned=TOPICS[code][Math.floor(r1*TOPICS[code].length)];
 var base=(past&&recent&&r2<=0.3&&o.topic===undefined)?false:true;
 var hw=(code==='pe'||code==='art')?'':(r3<0.6?HW[Math.floor(r4*HW.length)]:'');
 var note=(past&&r5<0.1)?FEED[Math.floor(r6*FEED.length)]:'';
 var filled=past?(base||o.topic!==undefined):true;
 return {id:id,date:date,slot:slot,code:code,subj:sj,time:BELLS[slot],room:o.room||sj.room,past:past,wd:wd,
  filled:filled,topic:o.topic!==undefined?o.topic:(filled?planned:''),hw:o.hw!==undefined?o.hw:(filled?hw:''),
  due:o.due||addSchoolDays(date,2),note:o.note!==undefined?o.note:note,sub:r5>0.94,
  by:o.by||(filled?sj.t:''),byAt:o.at||(filled?date+' '+BELLS[slot][1]:''),
  schedBy:o.schedBy||'Адмін Н.',schedAt:o.schedAt||addDays(date,-(3+Math.floor(r6*5))),
  conflict:wd===2&&slot===3&&!o.room};
}
function dayLessons(date){var a=[];for(var i=0;i<6;i++){var l=lesson(date,i);if(l)a.push(l)}return a}
function rangeLessons(from,to){var a=[],d=from;while(d<=to){if(schoolDay(d))a=a.concat(dayLessons(d));d=addDays(d,1)}return a}
function att(L,sid){
 if(!L.past)return null;
 var o=S.ov[L.id];if(o&&o.att&&o.att[sid])return o.att[sid];
 var dr=rng(hash(L.date+':d:'+sid)),dv=dr();
 var lim=sid===ME?0.03:0.06;
 if(dv<lim){var kinds=['s','s','e','a'];return {s:kinds[Math.floor(dr()*4)]}}
 var r=rng(hash(L.id+':'+sid));
 if(r()<0.04)return {s:'l',m:3+Math.floor(r()*10)};
 return {s:'p'};
}
function grade(L,sid){
 if(!L.past||L.code==='pe')return null;
 var o=S.ov[L.id];if(o&&o.gr&&o.gr[sid]!==undefined)return o.gr[sid];
 var a=att(L,sid);if(a&&(a.s==='a'||a.s==='s'||a.s==='e'))return null;
 var r=rng(hash(L.id+'g'+sid));if(r()>0.27)return null;
 var v=Math.round(8.6+(r()+r()-1)*3.6+(sid===ME?0.6:0));return Math.max(5,Math.min(12,v));
}
function gcls(v){return v>=10?'hi':(v>=7?'':(v>=5?'lo':'vlo'))}
function gchip(v){return '<span class="gr '+gcls(v)+'" title="Оцінка">'+v+'</span>'}
function avg(a){if(!a.length)return null;var s=0;for(var i=0;i<a.length;i++)s+=a[i];return Math.round(s/a.length*10)/10}
function fmt(n){return n==null?'—':String(n).replace('.',',')}
function myGrades(from,to){var o=[];rangeLessons(from,to).forEach(function(L){var g=grade(L,ME);if(g!=null)o.push({L:L,g:g})});return o}
function spark(vals,w,h){
 if(vals.length<2)return '<span class="sp" style="color:var(--muted);font-size:12px">мало даних</span>';
 var mn=5,mx=12,pts=vals.map(function(v,i){return (i/(vals.length-1)*(w-4)+2).toFixed(1)+','+((1-(v-mn)/(mx-mn))*(h-4)+2).toFixed(1)}).join(' ');
 return '<svg class="sp" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" aria-hidden="true"><polyline points="'+pts+'" fill="none" stroke="var(--blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* ===== ролі й навігація ===== */
var ROLES={student:'Учень',parent:'Батьки',teacher:'Вчитель',admin:'Адмін'};
var IC={
 today:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 week:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 grades:'<path d="M5 20V10M12 20V4M19 20v-7"/>',
 tasks:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
 attend:'<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 11l2 2 4-4"/>',
 chat:'<path d="M4 5h16v11H9l-5 4z"/>',
 klass:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/>',
 overview:'<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="10" width="8" height="11" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/>'
};
function icon(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'}
var NAVS={
 student:[['today','Сьогодні'],['week','Тиждень'],['grades','Оцінки'],['tasks','Завдання'],['attend','Відвідування'],['chat','Чат']],
 parent:[['today','Сьогодні'],['week','Тиждень'],['grades','Оцінки'],['tasks','Завдання'],['attend','Відвідування'],['chat','Чат']],
 teacher:[['today','Сьогодні'],['week','Розклад'],['klass','Журнал класу'],['chat','Чат']],
 admin:[['overview','Огляд школи'],['week','Розклад'],['attend','Відвідування'],['chat','Чат']]
};
function nav(){return NAVS[S.role]}
function ensureView(){var ok=nav().some(function(n){return n[0]===S.view});if(!ok)S.view=nav()[0][0]}
function titleOf(){var n=nav().filter(function(x){return x[0]===S.view})[0];return n?n[1]:''}
function canEdit(L){return S.role==='teacher'&&L.code===S.tsubj}
function isKid(){return S.role==='student'||S.role==='parent'}

/* ===== каркас ===== */
function shell(){
 ensureView();
 var items=nav().map(function(n){return '<button data-act="nav" data-v="'+n[0]+'"'+(S.view===n[0]?' aria-current="page"':'')+'>'+icon(n[0])+'<span>'+n[1]+'</span></button>'}).join('');
 var who=Object.keys(ROLES).map(function(k){return '<button data-act="role" data-v="'+k+'" aria-pressed="'+(S.role===k)+'">'+ROLES[k]+'</button>'}).join('');
 var extra='';
 if(S.role==='teacher')extra='<label class="sr" for="tsubj">Мій предмет</label><select class="inp" id="tsubj" data-sel="tsubj">'+Object.keys(SUBJ).filter(function(k){return k!=='pe'}).map(function(k){return '<option value="'+k+'"'+(S.tsubj===k?' selected':'')+'>Я викладаю: '+SUBJ[k].n+'</option>'}).join('')+'</select>';
 return '<aside class="side"><div class="brand"><img src="/images/midgard-logo.jpg" alt="" width="40" height="40"><div><b>Щоденник</b><small>MIDGARD · 7-А</small></div></div>'
 +'<nav class="nav" aria-label="Розділи">'+items+'</nav>'
 +'<div class="foot"><span class="demo" style="justify-self:start">Демо-дані · v0.1</span><a href="/midgard">← Дашборд якості уроків</a><button class="btn sm" data-act="reset">Скинути зміни демо</button><a href="/midgard?logout=1">Вийти</a></div></aside>'
 +'<main class="main" id="main"><div class="top"><h1>'+esc(titleOf())+'</h1>'+extra+'<div class="who" role="group" aria-label="Подивитися очима ролі">'+who+'</div></div><div id="view"></div></main>'
 +'<nav class="mtabs" aria-label="Розділи">'+nav().map(function(n){return '<button data-act="nav" data-v="'+n[0]+'"'+(S.view===n[0]?' aria-current="page"':'')+'>'+icon(n[0])+'<span>'+n[1].split(' ')[0]+'</span></button>'}).join('')+'</nav>';
}
function render(keepScroll){
 var y=window.scrollY;
 app.innerHTML=shell();
 var v=document.getElementById('view');
 var fn={today:vToday,week:vWeek,grades:vGrades,tasks:vTasks,attend:vAttend,chat:vChat,klass:vKlass,overview:vOverview}[S.view];
 v.innerHTML=fn();
 if(keepScroll)window.scrollTo(0,y);
 var st=document.getElementById('view').querySelector('[data-after]');
 save();
}

/* ===== загальні шматки ===== */
function chip(txt,cls){return '<span class="chip '+(cls||'')+'">'+esc(txt)+'</span>'}
function lessonChips(L){
 var c='';
 if(L.sub)c+=chip('Заміна','warn');
 if(L.conflict&&(S.role==='admin'||S.role==='teacher'))c+=chip('Накладка: '+L.room,'bad');
 if(L.past&&!L.filled)c+=chip('Не заповнено','bad');
 if(isKid()){
  if(L.hw&&!L.past)c+=chip('ДЗ','info');
  else if(L.hw&&L.past&&!S.done[L.id])c+=chip('ДЗ','info');
  var a=att(L,ME);
  if(a&&a.s!=='p')c+=chip(ST[a.s][0]+(a.m?' '+a.m+' хв':''),ST[a.s][1]);
  var g=grade(L,ME);if(g!=null)c+=gchip(g);
 } else if(L.past){
  var abs=STUDENTS.filter(function(_,i){var a=att(L,i);return a&&(a.s==='a'||a.s==='s'||a.s==='e')}).length;
  if(abs)c+=chip('Відсутні: '+abs,'info');
 }
 return c;
}
function lessonRow(L,now){
 var st=L.subj;
 return '<button class="lesson'+(now?' now':'')+'" style="--c:'+st.c+'" data-act="open" data-id="'+L.id+'" aria-label="'+esc(st.n+', '+L.time[0])+'">'
 +'<time><b>'+L.time[0]+'</b>'+L.time[1]+'</time>'
 +'<div><div class="t">'+esc(st.n)+'</div><div class="s">'+esc(L.topic||(L.past?'Тема не вказана':'Тема ще не заплановано'))+' · каб. '+esc(L.room)+(L.code==='pe'&&isKid()?' · '+esc(S.pe[L.date]||'оберіть секцію'):'')+'</div></div>'
 +'<div class="r">'+lessonChips(L)+'</div></button>';
}
function currentIdx(list){
 if(FOCUS!==TODAY)return -1;
 for(var i=0;i<list.length;i++){if(nowMin()<=toMin(list[i].time[1]))return i}
 return -1;
}
function kidName(){return S.role==='parent'?'Максим Д.':'Максим'}

/* ===== СЬОГОДНІ ===== */
function vToday(){
 if(isKid())return vTodayKid();
 if(S.role==='teacher')return vTodayTeacher();
 return vOverview();
}
function vTodayKid(){
 var list=dayLessons(FOCUS),ci=currentIdx(list);
 var from=addDays(TODAY,-30),gs=myGrades(from,TODAY),prev=myGrades(addDays(TODAY,-60),addDays(TODAY,-31));
 var a=avg(gs.map(function(x){return x.g})),pa=avg(prev.map(function(x){return x.g}));
 var all=rangeLessons(from,TODAY).filter(function(L){return L.past}),pres=0,late=0;
 all.forEach(function(L){var x=att(L,ME);if(x.s==='p'||x.s==='o')pres++;else if(x.s==='l'){pres++;late++}});
 var pct=all.length?Math.round(pres/all.length*100):100;
 var hwList=nextHomework(5);
 var hello=S.role==='parent'?'Добрий день! Ось що зараз у Максима':'Привіт, Максиме!';
 var sub=FOCUS===TODAY?'Сьогодні '+dfull(TODAY).toLowerCase()+'. Уроків: '+list.length+'.':'Найближчий навчальний день — '+dfull(FOCUS).toLowerCase()+'. Уроків: '+list.length+'.';
 var delta=(a!=null&&pa!=null)?(a-pa):null;
 var last=gs.slice(-4).reverse();
 return '<div class="hello"><h2>'+hello+'</h2><p>'+sub+'</p></div>'
 +'<div class="grid g3" style="margin-bottom:16px">'
 +'<div class="card stat"><span>Середній бал за 30 днів</span><b>'+fmt(a)+(delta!=null?'<em class="'+(delta>=0?'up':'down')+'">'+(delta>=0?'▲ ':'▼ ')+fmt(Math.abs(Math.round(delta*10)/10))+'</em>':'')+'</b></div>'
 +'<div class="card stat"><span>Відвідуваність</span><b>'+pct+'%</b><span>Запізнень: '+late+'</span></div>'
 +'<div class="card stat"><span>Домашніх до виконання</span><b>'+hwList.filter(function(x){return !S.done[x.id]}).length+'</b><span>на найближчі дні</span></div></div>'
 +'<div class="grid g2"><section class="card"><h2>Розклад на день <small>'+esc(dlabel(FOCUS))+'</small></h2>'
 +(list.length?list.map(function(L,i){return lessonRow(L,i===ci)}).join(''):'<div class="empty">Уроків немає</div>')+'</section>'
 +'<div class="grid" style="align-content:start">'
 +'<section class="card"><h2>Домашнє завдання <button class="btn sm" data-act="nav" data-v="tasks">Усі</button></h2>'
 +(hwList.length?hwList.slice(0,4).map(function(L){return hwRow(L)}).join(''):'<div class="empty">Домашніх немає</div>')+'</section>'
 +'<section class="card"><h2>Нові оцінки <button class="btn sm" data-act="nav" data-v="grades">Усі</button></h2>'
 +(last.length?last.map(function(x){return '<div class="row"><div><button class="lnk" data-act="open" data-id="'+x.L.id+'">'+esc(x.L.subj.n)+'</button><div style="font-size:12.5px;color:var(--muted)">'+dlabel(x.L.date)+' · '+esc(x.L.topic)+'</div></div>'+gchip(x.g)+'</div>'}).join(''):'<div class="empty">Поки без оцінок</div>')+'</section></div></div>';
}
function nextHomework(n){
 var a=rangeLessons(addDays(TODAY,-4),addDays(TODAY,7)).filter(function(L){return L.hw&&L.due>=TODAY&&L.past});
 a.sort(function(x,y){return x.due<y.due?-1:1});return a.slice(0,n);
}
function hwStatus(L){
 if(!L.past)return ['Недоступне','chip'];
 var done=S.done[L.id]||(L.due<addDays(TODAY,-6)&&hash(L.id)%5!==0);
 if(done&&L.due>=TODAY)return ['Очікує перевірки','chip info'];
 if(done)return ['Виконано','chip ok'];
 if(L.due<TODAY)return ['Прострочено','chip bad'];
 return ['До виконання','chip warn'];
}
function hwRow(L){
 var s=hwStatus(L);
 return '<div class="row"><div><button class="lnk" data-act="open" data-id="'+L.id+'">'+esc(L.subj.n)+'</button><div style="font-size:13.5px">'+esc(L.hw)+'</div><div style="font-size:12.5px;color:var(--muted)">до '+dlabel(L.due)+'</div></div><span class="'+s[1]+'">'+s[0]+'</span></div>';
}
function vTodayTeacher(){
 var mine=dayLessons(FOCUS).filter(function(L){return L.code===S.tsubj});
 var week=rangeLessons(addDays(TODAY,-3),TODAY).filter(function(L){return L.code===S.tsubj&&L.past&&!L.filled});
 var fromW=addDays(TODAY,-30),gs=[];
 rangeLessons(fromW,TODAY).filter(function(L){return L.code===S.tsubj}).forEach(function(L){STUDENTS.forEach(function(_,i){var g=grade(L,i);if(g!=null)gs.push(g)})});
 var absNow=[];dayLessons(FOCUS).forEach(function(L){STUDENTS.forEach(function(n,i){var a=att(L,i);if(a&&(a.s==='a'||a.s==='s'||a.s==='e')&&absNow.indexOf(i)<0)absNow.push(i)})});
 return '<div class="hello"><h2>'+esc(SUBJ[S.tsubj].t)+', доброго дня</h2><p>'+esc(SUBJ[S.tsubj].n)+' · '+(mine.length?'уроків '+(FOCUS===TODAY?'сьогодні':'у найближчий день')+': '+mine.length:'сьогодні без ваших уроків')+'</p></div>'
 +'<div class="grid g3" style="margin-bottom:16px"><div class="card stat"><span>Незаповнених уроків (3 дні)</span><b>'+week.length+'</b></div>'
 +'<div class="card stat"><span>Середній бал класу (30 днів)</span><b>'+fmt(avg(gs))+'</b></div>'
 +'<div class="card stat"><span>Відсутні в класі '+(FOCUS===TODAY?'сьогодні':'')+'</span><b>'+absNow.length+'</b><span>'+absNow.slice(0,3).map(function(i){return STUDENTS[i]}).join(', ')+'</span></div></div>'
 +'<div class="grid g2"><section class="card"><h2>Мої уроки <small>'+esc(dlabel(FOCUS))+'</small></h2>'+(mine.length?mine.map(function(L,i){return lessonRow(L,false)}).join(''):'<div class="empty">Сьогодні немає</div>')+'</section>'
 +'<section class="card"><h2>Потребує уваги</h2>'+(week.length?week.map(function(L){return '<div class="row"><div><b>'+esc(L.subj.n)+'</b><div style="font-size:12.5px;color:var(--muted)">'+dlabel(L.date)+' · '+L.time[0]+'</div></div><button class="btn sm lime" data-act="open" data-id="'+L.id+'">Заповнити</button></div>'}).join(''):'<div class="empty">Усі уроки заповнені 🎉</div>')+'</section></div>';
}

/* ===== ТИЖДЕНЬ: розклад + щоденник в одному ===== */
function vWeek(){
 var mon=addDays(monday(FOCUS),S.week*7),days=[];
 for(var i=0;i<5;i++)days.push(addDays(mon,i));
 var actDay=S.wd!=null?S.wd:Math.max(0,Math.min(4,(parse(FOCUS).getDay()+6)%7));
 var bar='<div class="wkbar"><button class="btn" data-act="wk" data-d="-1" aria-label="Попередній тиждень">←</button><b>'+dlabel(mon)+' – '+dlabel(days[4])+'</b><button class="btn" data-act="wk" data-d="1" aria-label="Наступний тиждень">→</button><button class="btn" data-act="wk" data-d="0">Цей тиждень</button></div>';
 var tabs='<div class="dayTabs" role="group" aria-label="День тижня">'+days.map(function(d,i){return '<button data-act="wd" data-i="'+i+'" aria-pressed="'+(i===actDay)+'">'+DAYS[i]+' '+parse(d).getDate()+'</button>'}).join('')+'</div>';
 var cols=days.map(function(d,i){
  var ls=dayLessons(d);
  return '<div class="day'+(d===TODAY?' today':'')+(i===actDay?' act':'')+'"><h3><span>'+DAYS[i]+'</span><b>'+parse(d).getDate()+'</b></h3>'
  +(ls.length?ls.map(function(L){return weekCell(L)}).join(''):'<div class="cell gap">вихідний</div>')+'</div>';
 }).join('');
 var hint=isKid()?'Натисніть на урок — там тема, домашнє, оцінка й відвідування. Усе в одному місці.':(S.role==='teacher'?'Ваші уроки ('+SUBJ[S.tsubj].n+') можна заповнювати прямо звідси. Решта — лише перегляд.':'Накладки аудиторій підсвічені. Натисніть на урок, щоб змінити аудиторію чи побачити заповнення.');
 return '<p style="color:var(--muted);margin:0 0 12px">'+hint+'</p>'+bar+tabs+'<div class="wk">'+cols+'</div>';
}
function weekCell(L){
 var mine=S.role==='teacher'&&L.code===S.tsubj;
 var m='';
 if(isKid()){
  var a=att(L,ME),g=grade(L,ME);
  if(L.hw)m+='<span class="chip info">ДЗ</span>';
  if(a&&a.s!=='p')m+='<span class="chip '+ST[a.s][1]+'">'+(a.s==='l'?'+'+a.m+' хв':ST[a.s][0].split(' ')[0])+'</span>';
  if(g!=null)m+=gchip(g);
 } else {
  if(L.past&&!L.filled)m+='<span class="chip bad">не заповнено</span>';
  if(L.conflict)m+='<span class="chip bad">накладка</span>';
  if(mine&&L.filled&&L.past)m+='<span class="chip ok">ок</span>';
 }
 if(L.sub)m+='<span class="chip warn">заміна</span>';
 return '<button class="cell'+(L.conflict&&S.role!=='student'&&S.role!=='parent'?' warn':'')+'" style="--c:'+L.subj.c+(S.role==='teacher'&&!mine?';opacity:.7':'')+'" data-act="open" data-id="'+L.id+'"><div class="n">'+esc(L.subj.n)+'</div><div class="m"><span>'+L.time[0]+' · '+esc(L.room)+'</span>'+m+'</div></button>';
}

/* ===== ОЦІНКИ ===== */
function vGrades(){
 var per={week:7,month:30,sem:120},days=per[S.gper]||30;
 var from=addDays(TODAY,-days),by={};
 myGrades(from,TODAY).forEach(function(x){(by[x.L.code]=by[x.L.code]||[]).push(x)});
 var codes=Object.keys(SUBJ).filter(function(k){return by[k]});
 var all=[];codes.forEach(function(k){by[k].forEach(function(x){all.push(x.g)})});
 var filt='<div class="filters"><div class="seg" role="group" aria-label="Період">'+[['week','Тиждень'],['month','Місяць'],['sem','Семестр']].map(function(p){return '<button data-act="gper" data-v="'+p[0]+'" aria-pressed="'+(S.gper===p[0])+'">'+p[1]+'</button>'}).join('')+'</div><span style="flex:1"></span><button class="btn" data-act="export" data-what="grades">Експорт у CSV</button></div>';
 var top='<div class="grid g3" style="margin-bottom:16px"><div class="card stat"><span>Середній бал</span><b>'+fmt(avg(all))+'</b></div><div class="card stat"><span>Оцінок за період</span><b>'+all.length+'</b></div><div class="card stat"><span>Найкращий предмет</span><b style="font-size:20px">'+esc(best(by))+'</b></div></div>';
 var rows=codes.map(function(k){
  var gs=by[k],vals=gs.map(function(x){return x.g});
  return '<details class="sj" style="--c:'+SUBJ[k].c+'"><summary><span class="subj"><i></i>'+esc(SUBJ[k].n)+'</span><b>'+fmt(avg(vals))+'</b>'+spark(vals,86,26)+'<span class="chips">'+gs.slice(-8).map(function(x){return gchip(x.g)}).join('')+'</span><span aria-hidden="true">▾</span></summary>'
  +'<div class="body">'+gs.slice().reverse().map(function(x){return '<div class="row"><div><button class="lnk" data-act="open" data-id="'+x.L.id+'">'+esc(x.L.topic)+'</button><div style="font-size:12.5px;color:var(--muted)">'+dlabel(x.L.date)+'</div></div>'+gchip(x.g)+'</div>'}).join('')+'</div></details>';
 }).join('');
 return filt+top+(rows||'<div class="card empty">За цей період оцінок немає</div>');
}
function best(by){var b='—',m=0;Object.keys(by).forEach(function(k){var a=avg(by[k].map(function(x){return x.g}));if(a>m){m=a;b=SUBJ[k].n}});return b}

/* ===== ЗАВДАННЯ ===== */
function taskList(){
 var ls=rangeLessons(addDays(TODAY,-14),addDays(TODAY,7)).filter(function(L){return L.hw});
 ls.sort(function(a,b){return a.due<b.due?1:-1});
 var q=S.q.trim().toLowerCase();
 return ls.filter(function(L){
  var st=hwStatus(L)[0];
  if(S.tf!=='all'&&st!==S.tf)return false;
  if(q&&(L.hw+' '+L.subj.n).toLowerCase().indexOf(q)<0)return false;
  return true;
 });
}
function taskHtml(){
 var ls=taskList();
 if(!ls.length)return '<div class="card empty">Нічого не знайдено</div>';
 return '<div class="card">'+ls.map(function(L){
  var s=hwStatus(L);
  return '<div class="row"><div style="min-width:0"><button class="lnk" data-act="open" data-id="'+L.id+'">'+esc(L.subj.n)+'</button> <span style="color:var(--muted);font-size:12.5px">· до '+dlabel(L.due)+'</span><div>'+esc(L.hw)+'</div></div><div style="display:flex;gap:8px;align-items:center"><span class="'+s[1]+'">'+s[0]+'</span>'
  +(S.role==='student'&&L.past&&s[0]!=='Виконано'?'<button class="btn sm" data-act="done" data-id="'+L.id+'">'+(S.done[L.id]?'Скасувати':'Здав')+'</button>':'')+'</div></div>';
 }).join('')+'</div>';
}
function vTasks(){
 var names=['all','Недоступне','До виконання','Прострочено','Очікує перевірки','Виконано'];
 return '<div class="filters"><div class="seg" role="group" aria-label="Статус">'+names.map(function(n){return '<button data-act="tf" data-v="'+n+'" aria-pressed="'+(S.tf===n)+'">'+(n==='all'?'Усі':n)+'</button>'}).join('')+'</div>'
 +'<label class="sr" for="q">Пошук</label><input class="inp" id="q" type="search" placeholder="Пошук за предметом чи текстом" value="'+esc(S.q)+'" style="flex:1;min-width:200px"><button class="btn" data-act="export" data-what="tasks">CSV</button></div><div id="tasklist">'+taskHtml()+'</div>';
}

/* ===== ВІДВІДУВАННЯ ===== */
function dayState(date){
 var ls=dayLessons(date).filter(function(L){return L.past});if(!ls.length)return null;
 var rank={a:5,s:4,e:3,l:2,o:1,p:0},w='p';
 ls.forEach(function(L){var a=att(L,ME);if(rank[a.s]>rank[w])w=a.s});return w;
}
function vAttend(){
 if(S.role==='admin')return vAttendAdmin();
 var m=S.amonth||TODAY.slice(0,7),y=+m.slice(0,4),mo=+m.slice(5,7)-1;
 var first=new Date(y,mo,1),offs=(first.getDay()+6)%7,dim=new Date(y,mo+1,0).getDate(),cells='';
 for(var i=0;i<offs;i++)cells+='<div class="d"></div>';
 var cnt={p:0,l:0,a:0,s:0,e:0,o:0},lateMin=0,lessonsTotal=0;
 for(var d=1;d<=dim;d++){
  var ds=y+'-'+p2(mo+1)+'-'+p2(d),st=schoolDay(ds)?dayState(ds):null;
  if(st){cnt[st]++;}
  dayLessons(ds).forEach(function(L){if(L.past){var a=att(L,ME);lessonsTotal++;if(a.s==='l')lateMin+=a.m}});
  cells+=st?'<button class="'+st+(ds===S.aday?' sel':'')+(ds===TODAY?' td':'')+'" data-act="aday" data-d="'+ds+'" aria-label="'+esc(dlabel(ds)+': '+ST[st][0])+'">'+d+'</button>':'<div class="d">'+d+'</div>';
 }
 var detail='';
 if(S.aday&&S.aday.slice(0,7)===m){
  detail='<section class="card" style="margin-top:16px"><h2>'+esc(dfull(S.aday))+'</h2>'+dayLessons(S.aday).map(function(L){var a=att(L,ME)||{s:'p'};return '<div class="row"><div><button class="lnk" data-act="open" data-id="'+L.id+'">'+esc(L.subj.n)+'</button> <span style="color:var(--muted);font-size:12.5px">'+L.time[0]+'</span></div><span class="chip '+ST[a.s][1]+'">'+ST[a.s][0]+(a.m?' · '+a.m+' хв':'')+'</span></div>'}).join('')+'</section>';
 }
 var present=cnt.p+cnt.l+cnt.o,total=present+cnt.a+cnt.s+cnt.e;
 return '<div class="filters"><button class="btn" data-act="amonth" data-d="-1" aria-label="Попередній місяць">←</button><b style="min-width:150px;text-align:center">'+MONTHS_N[mo]+' '+y+'</b><button class="btn" data-act="amonth" data-d="1" aria-label="Наступний місяць">→</button><span style="flex:1"></span><button class="btn" data-act="export" data-what="attend">CSV</button></div>'
 +'<div class="grid g2"><section class="card"><div class="cal">'+DAYS.concat(['Сб','Нд']).map(function(x){return '<div class="h">'+x+'</div>'}).join('')+cells+'</div>'
 +'<div class="legend"><span><i class="dot p"></i>Присутній</span><span><i class="dot l"></i>Запізнення</span><span><i class="dot s"></i>Хвороба / поважна / онлайн</span><span><i class="dot a"></i>Без причини</span></div></section>'
 +'<div class="grid" style="align-content:start"><div class="card stat"><span>Днів присутній</span><b>'+present+' з '+total+'</b></div><div class="card stat"><span>Запізнень</span><b>'+cnt.l+'</b><span>загалом '+lateMin+' хв</span></div><div class="card stat"><span>Пропущено днів</span><b>'+(cnt.a+cnt.s+cnt.e)+'</b><span>хвороба/поважна: '+(cnt.s+cnt.e)+', без причини: '+cnt.a+'</span></div></div></div>'+detail;
}
function vAttendAdmin(){
 var ls=dayLessons(FOCUS).filter(function(L){return L.past||FOCUS!==TODAY});
 if(!ls.length)ls=dayLessons(addDays(FOCUS,-1));
 var date=ls.length?ls[0].date:FOCUS;
 var head='<tr><th>Учень</th>'+ls.map(function(L){return '<th title="'+esc(L.subj.n)+'">'+L.time[0]+'<br>'+esc(L.subj.n.split(' ')[0])+'</th>'}).join('')+'</tr>';
 var body=STUDENTS.map(function(n,i){return '<tr><td>'+esc(n)+'</td>'+ls.map(function(L){var a=att(L,i)||{s:'p'};return '<td><span class="chip '+ST[a.s][1]+'" title="'+esc(ST[a.s][0])+'">'+(a.s==='p'?'●':a.s==='l'?a.m+'′':a.s==='a'?'Н':a.s==='s'?'Х':a.s==='e'?'П':'О')+'</span></td>'}).join('')+'</tr>'}).join('');
 return '<p style="color:var(--muted);margin:0 0 12px">7-А · '+esc(dfull(date))+'. Н — без причини, Х — хвороба, П — поважна, О — онлайн, ′ — запізнення (хв).</p><div class="card scroll"><table class="tbl jr"><thead>'+head+'</thead><tbody>'+body+'</tbody></table></div>';
}

/* ===== ЖУРНАЛ КЛАСУ (вчитель) ===== */
function vKlass(){
 var code=S.jsubj||S.tsubj,all=rangeLessons(addDays(TODAY,-40),TODAY).filter(function(L){return L.code===code&&L.past});
 var cols=all.slice(-8);
 var own=code===S.tsubj;
 var sel='<div class="filters"><label class="sr" for="jsubj">Предмет</label><select class="inp" id="jsubj" data-sel="jsubj">'+Object.keys(SUBJ).map(function(k){return '<option value="'+k+'"'+(code===k?' selected':'')+'>'+SUBJ[k].n+'</option>'}).join('')+'</select><span class="chip '+(own?'ok':'')+'">'+(own?'Ваш предмет — можна редагувати':'Лише перегляд')+'</span><span style="flex:1"></span><button class="btn" data-act="export" data-what="journal">Експорт у CSV</button></div>';
 var head='<tr><th>Учень</th>'+cols.map(function(L){return '<th><button class="lnk" style="all:unset;cursor:pointer;color:var(--blue)" data-act="open" data-id="'+L.id+'" title="'+esc(L.topic)+'">'+parse(L.date).getDate()+'.'+p2(parse(L.date).getMonth()+1)+'</button></th>'}).join('')+'<th>Серед.</th></tr>';
 var body=STUDENTS.map(function(n,i){
  var gs=[];
  var tds=cols.map(function(L){
   var a=att(L,i),g=grade(L,i);if(g!=null)gs.push(g);
   var lab=(a.s==='p'?'':'<i class="dot '+a.s+'" title="'+esc(ST[a.s][0])+'"></i>')+(g!=null?'<span class="gr '+gcls(g)+'" style="min-width:24px;height:24px">'+g+'</span>':(a.s==='p'?'·':''));
   return '<td><button data-act="cell" data-id="'+L.id+'" data-s="'+i+'"'+(own?'':' disabled')+' aria-label="'+esc(n+', '+dlabel(L.date))+'">'+lab+'</button></td>';
  }).join('');
  return '<tr><td>'+esc(n)+'</td>'+tds+'<td><b>'+fmt(avg(gs))+'</b></td></tr>';
 }).join('');
 return sel+'<div class="card scroll"><table class="tbl jr"><thead>'+head+'</thead><tbody>'+body+'</tbody></table></div><p style="color:var(--muted);font-size:13px">Натисніть клітинку, щоб поставити оцінку або відмітку про присутність. Крапка — запізнення / відсутність.</p>';
}

/* ===== ОГЛЯД ШКОЛИ (адмін) ===== */
function vOverview(){
 var r=rng(hash('school'+FOCUS));
 var total=240,reasons=[['Хвороба',0],['Поважна причина',0],['Без причини',0],['Дистанційне навчання',0],['Навчається за кордоном',0],['Сімейне навчання',0]];
 reasons[0][1]=6+Math.floor(r()*6);reasons[1][1]=2+Math.floor(r()*4);reasons[2][1]=1+Math.floor(r()*3);reasons[3][1]=3+Math.floor(r()*4);reasons[4][1]=2;reasons[5][1]=1;
 var absent=reasons.reduce(function(s,x){return s+x[1]},0);
 var unf=rangeLessons(addDays(TODAY,-3),TODAY).filter(function(L){return L.past&&!L.filled});
 var conf=rangeLessons(monday(FOCUS),addDays(monday(FOCUS),4)).filter(function(L){return L.conflict});
 var subs=rangeLessons(monday(FOCUS),addDays(monday(FOCUS),4)).filter(function(L){return L.sub});
 var mx=reasons[0][1];
 var cols=['var(--bad)','var(--info)','var(--bad)','var(--blue)','var(--blue)','var(--blue)'];
 return '<div class="grid g4" style="margin-bottom:16px"><div class="card stat"><span>Учнів у школі</span><b>'+total+'</b></div><div class="card stat"><span>Присутні</span><b>'+(total-absent)+'</b><span>'+Math.round((total-absent)/total*100)+'%</span></div><div class="card stat"><span>Відсутні</span><b>'+absent+'</b></div><div class="card stat"><span>Незаповнені уроки</span><b>'+unf.length+'</b><span>за 3 дні</span></div></div>'
 +'<div class="grid g2"><section class="card"><h2>Відсутні за причинами <small>'+esc(dlabel(FOCUS))+'</small></h2><div class="bars">'+reasons.map(function(x,i){return '<div class="bar"><span>'+x[0]+'</span><div><i style="width:'+Math.round(x[1]/mx*100)+'%;--c:'+(i===2?'var(--bad)':'var(--blue)')+'"></i></div><b>'+x[1]+'</b></div>'}).join('')+'</div></section>'
 +'<section class="card"><h2>Накладки аудиторій</h2>'+(conf.length?conf.map(function(L){return '<div class="row"><div><b>'+esc(L.room)+'</b> · '+esc(dfull(L.date))+', '+L.time[0]+'<div style="font-size:12.5px;color:var(--muted)">Фізика 7-А та 7-Б одночасно</div></div><button class="btn sm lime" data-act="open" data-id="'+L.id+'">Змінити</button></div>'}).join(''):'<div class="empty">Накладок немає</div>')+'</section>'
 +'<section class="card"><h2>Незаповнені уроки</h2>'+(unf.length?unf.slice(0,6).map(function(L){return '<div class="row"><div><b>'+esc(L.subj.n)+'</b> · '+esc(L.subj.t)+'<div style="font-size:12.5px;color:var(--muted)">'+dlabel(L.date)+', '+L.time[0]+'</div></div><button class="btn sm" data-act="remind" data-t="'+esc(L.subj.t)+'">Нагадати</button></div>'}).join(''):'<div class="empty">Усе заповнено</div>')+'</section>'
 +'<section class="card"><h2>Заміни цього тижня</h2>'+(subs.length?subs.map(function(L){return '<div class="row"><div><b>'+esc(L.subj.n)+'</b><div style="font-size:12.5px;color:var(--muted)">'+esc(dfull(L.date))+', '+L.time[0]+'</div></div><button class="btn sm" data-act="open" data-id="'+L.id+'">Відкрити</button></div>'}).join(''):'<div class="empty">Замін немає</div>')+'</section></div>';
}

/* ===== ЧАТ ===== */
function contacts(){
 if(isKid())return [
  {id:'t_mat',n:'Олена С.',s:'Вчитель математики · класний керівник',tags:['Вчитель','Класний керівник']},
  {id:'t_ukr',n:'Ірина М.',s:'Вчитель української мови'},
  {id:'t_eng',n:'Дарина Л.',s:'Вчитель англійської'},
  {id:'adm',n:'Адміністрація школи',s:'Навчальна частина'},
  {id:'sup',n:'Технічна підтримка',s:'Проблеми із застосунком'}];
 return [
  {id:'g_par',n:'Батьки 7-А',s:'Груповий чат'},
  {id:'g_stu',n:'Учні 7-А',s:'Груповий чат'},
  {id:'f_0',n:'Родина Максима Д.',s:'Батьки'},
  {id:'f_1',n:'Родина Соломії Т.',s:'Батьки'},
  {id:'adm',n:'Адміністрація школи',s:'Навчальна частина'}];
}
var SEED={t_mat:[['them','Добрий день! Нагадую про контрольну в четвер.','10:12'],['me','Дякую, підготуємось!','10:20']],adm:[['them','Нагадування: до п’ятниці надішліть довідку про стан здоровʼя.','Вчора']]};
function thread(id){return S.msgs[id]||(SEED[id]||[]).map(function(m){return {f:m[0],t:m[1],ts:m[2]}})}
function vChat(){
 var cs=contacts();if(!S.chat||!cs.some(function(c){return c.id===S.chat}))S.chat=cs[0].id;
 var cur=cs.filter(function(c){return c.id===S.chat})[0],msgs=thread(S.chat);
 return '<div class="card chat"><div class="contacts" role="list">'+cs.map(function(c){return '<button role="listitem" data-act="contact" data-id="'+c.id+'" aria-pressed="'+(c.id===S.chat)+'"><b>'+esc(c.n)+'</b><small>'+esc(c.s)+'</small></button>'}).join('')+'</div>'
 +'<div class="thread"><header><b>'+esc(cur.n)+'</b>'+(cur.tags||[]).map(function(t){return chip(t,'ok')}).join('')+'</header><div class="msgs" id="msgs">'+(msgs.length?msgs.map(function(m){return '<div class="msg'+(m.f==='me'?' me':'')+'">'+esc(m.t)+'<small>'+esc(m.ts)+'</small></div>'}).join(''):'<div class="empty">Повідомлень ще немає</div>')+'</div>'
 +'<form class="compose" id="compose"><label class="sr" for="mt">Повідомлення</label><input class="inp" id="mt" autocomplete="off" placeholder="Напишіть повідомлення…"><button class="btn pri" type="submit">Надіслати</button></form></div></div>'
 +'<p style="color:var(--muted);font-size:13px">Вчитель, який є й класним керівником, — один контакт (у старій системі він дублювався).</p>';
}

/* ===== ШТОРКА УРОКУ ===== */
var openId='';
function openLesson(id){
 openId=id;
 var L=lesson(id.slice(0,10),+id.slice(11));if(!L)return;
 sheet.style.setProperty('--c',L.subj.c);
 sheet.innerHTML=lessonSheet(L);
 ovEl.classList.add('on');ovEl.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
 var x=sheet.querySelector('.x');if(x)x.focus();
 sheet.scrollTop=0;
}
function closeSheet(){ovEl.classList.remove('on');ovEl.setAttribute('aria-hidden','true');document.body.style.overflow='';openId=''}
function lessonSheet(L){
 var edit=canEdit(L),adm=S.role==='admin';
 var hd='<div class="hd"><div><h2 id="sheetT">'+esc(L.subj.n)+'</h2><p>'+esc(dfull(L.date))+' · '+L.time[0]+'–'+L.time[1]+' · каб. '+esc(L.room)+'</p><div class="chips" style="margin-top:8px">'+(L.sub?chip('Заміна','warn'):'')+(L.conflict&&!isKid()?chip('Накладка аудиторії','bad'):'')+(L.past?chip('Урок проведено','ok'):chip('Попереду'))+'</div></div><button class="x" data-act="close" aria-label="Закрити">×</button></div>';
 var body='';
 if(edit)body=teacherForm(L);
 else{
  body+='<div class="sec"><h3>Тема</h3><div class="box">'+(L.topic?esc(L.topic):'<span style="color:var(--muted)">Вчитель ще не заповнив тему</span>')+'</div></div>';
  body+='<div class="sec"><h3>Домашнє завдання</h3><div class="box">'+(L.hw?esc(L.hw)+'<div style="font-size:13px;color:var(--muted);margin-top:4px">Термін: '+dlabel(L.due)+'</div>':'<span style="color:var(--muted)">Не задано</span>')
   +(L.hw&&S.role==='student'&&L.past?'<div style="margin-top:10px"><button class="btn sm '+(S.done[L.id]?'':'pri')+'" data-act="done" data-id="'+L.id+'" data-sheet="1">'+(S.done[L.id]?'Скасувати «Здав»':'Позначити «Здав»')+'</button></div>':'')+'</div></div>';
  if(L.code==='pe'&&isKid()){
   body+='<div class="sec"><h3>Секція на цей урок</h3><div class="opts" role="group" aria-label="Секція">'+SPORTS.map(function(s){return '<button data-act="pe" data-d="'+L.date+'" data-v="'+s+'" aria-pressed="'+(S.pe[L.date]===s)+'"'+(S.role==='parent'?' disabled':'')+'>'+s+'</button>'}).join('')+'</div><p style="font-size:12.5px;color:var(--muted);margin:8px 0 0">Учень сам обирає секцію — система не шле батькам «неявку» на інші групи, що йдуть одночасно.</p></div>';
  }
  if(isKid()){
   var a=att(L,ME),g=grade(L,ME);
   body+='<div class="sec"><h3>Присутність і оцінка</h3><div class="box" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">'+(a?'<span class="chip '+ST[a.s][1]+'">'+ST[a.s][0]+(a.m?' · '+a.m+' хв':'')+'</span>':'<span style="color:var(--muted)">Урок ще не відбувся</span>')+(g!=null?'<span>Оцінка за урок: '+gchip(g)+'</span>':'')+'</div></div>';
   if(L.note)body+='<div class="sec"><h3>Відгук вчителя</h3><div class="box">“'+esc(L.note)+'” <span style="color:var(--muted);font-size:12.5px">— '+esc(L.subj.t)+'</span></div></div>';
  } else {
   body+='<div class="sec"><h3>Тема і домашнє</h3><div class="box">'+esc(L.topic||'Не вказано')+(L.hw?'<div style="color:var(--muted);margin-top:4px">ДЗ: '+esc(L.hw)+'</div>':'')+'</div></div>';
   if(L.past)body+=attendanceTable(L,false);
  }
  if(adm)body+=adminForm(L);
 }
 var meta='<div class="sec"><h3>Хто що змінював</h3><div class="box meta"><span>Зміст уроку заповнив: <b>'+(L.by?esc(L.by)+', '+esc(L.byAt.replace('-','.').replace(/^(\d{4})\.(\d\d)-(\d\d)/,'$3.$2')):'ще ніхто')+'</b></span><span>Розклад востаннє змінив: <b>'+esc(L.schedBy)+', '+dlabel(L.schedAt)+'</b></span></div></div>';
 return hd+body+meta;
}
function attendanceTable(L,editable){
 var rows=STUDENTS.map(function(n,i){
  var a=att(L,i),g=grade(L,i);
  if(!editable)return '<div class="att" style="grid-template-columns:1fr auto auto"><span>'+esc(n)+'</span><span class="chip '+ST[a.s][1]+'">'+ST[a.s][0]+(a.m?' · '+a.m+' хв':'')+'</span><span>'+(g!=null?gchip(g):'')+'</span></div>';
  return '<div class="att"><span>'+esc(n)+'</span><span style="display:flex;gap:6px;align-items:center"><select data-f="att" data-s="'+i+'" aria-label="Присутність: '+esc(n)+'">'+STORDER.map(function(k){return '<option value="'+k+'"'+(a.s===k?' selected':'')+'>'+ST[k][0]+'</option>'}).join('')+'</select><input type="number" min="1" max="45" data-f="min" data-s="'+i+'" value="'+(a.m||'')+'" placeholder="хв" aria-label="Хвилин запізнення: '+esc(n)+'"'+(a.s==='l'?'':' hidden')+'></span>'
   +'<select data-f="gr" data-s="'+i+'" aria-label="Оцінка: '+esc(n)+'"><option value="">—</option>'+[5,6,7,8,9,10,11,12].map(function(v){return '<option value="'+v+'"'+(g===v?' selected':'')+'>'+v+'</option>'}).join('')+'</select></div>';
 }).join('');
 return '<div class="sec"><h3>Присутність і оцінки · 7-А</h3><div class="box">'+(editable?'<div style="margin-bottom:8px"><button type="button" class="btn sm" data-act="allpresent">Усі присутні</button></div>':'')+rows+'</div></div>';
}
function teacherForm(L){
 return '<form id="lf" class="sec frm" data-id="'+L.id+'"><h3 style="margin-bottom:0">Заповнення уроку</h3>'
 +'<label>Тема уроку<input name="topic" value="'+esc(L.topic)+'" placeholder="Наприклад: Системи рівнянь" required></label>'
 +'<label>Домашнє завдання<textarea name="hw" placeholder="Що задано?">'+esc(L.hw)+'</textarea></label>'
 +'<label>Здати до<input type="date" name="due" value="'+L.due+'"></label>'
 +'<label>Коментар для учнів і батьків<textarea name="note">'+esc(L.note)+'</textarea></label>'
 +'</form>'+(L.past?attendanceTable(L,true):'<div class="sec"><div class="box" style="color:var(--muted)">Присутність і оцінки відкриються після початку уроку.</div></div>')
 +'<div class="sec"><button class="btn pri" data-act="savelesson">Зберегти урок</button></div>';
}
function adminForm(L){
 return '<form id="af" class="sec frm" data-id="'+L.id+'"><h3 style="margin-bottom:0">Зміни в розкладі</h3><label>Аудиторія<input name="room" value="'+esc(L.room)+'"></label><button type="button" class="btn lime" data-act="saveroom">Зберегти зміну розкладу</button><p style="font-size:12.5px;color:var(--muted);margin:0">Записується в поле «Розклад востаннє змінив» — окремо від того, хто заповнив зміст уроку.</p></form>';
}

/* ===== діалог оцінки/присутності в журналі ===== */
function openCell(id,sid){
 var L=lesson(id.slice(0,10),+id.slice(11)),a=att(L,sid),g=grade(L,sid);
 popc.dataset.id=id;popc.dataset.s=sid;
 popc.innerHTML='<h2 style="font-size:16px;margin-bottom:4px">'+esc(STUDENTS[sid])+'</h2><p style="margin:0 0 14px;color:var(--muted);font-size:13.5px">'+esc(L.subj.n)+', '+dlabel(L.date)+'</p>'
 +'<h3 style="font:600 12px Commissioner;text-transform:uppercase;color:var(--muted);margin-bottom:6px">Присутність</h3><div class="opts" id="po1">'+STORDER.map(function(k){return '<button data-act="pset" data-k="a" data-v="'+k+'" aria-pressed="'+(a.s===k)+'">'+ST[k][0]+'</button>'}).join('')+'</div>'
 +'<h3 style="font:600 12px Commissioner;text-transform:uppercase;color:var(--muted);margin:14px 0 6px">Оцінка</h3><div class="opts" id="po2">'+[5,6,7,8,9,10,11,12].map(function(v){return '<button data-act="pset" data-k="g" data-v="'+v+'" aria-pressed="'+(g===v)+'">'+v+'</button>'}).join('')+'<button data-act="pset" data-k="g" data-v="" aria-pressed="'+(g==null)+'">Без оцінки</button></div>'
 +'<div style="margin-top:16px;text-align:right"><button class="btn" data-act="pclose">Готово</button></div>';
 pop.classList.add('on');pop.setAttribute('aria-hidden','false');
 var f=popc.querySelector('button');if(f)f.focus();
}
function closePop(){pop.classList.remove('on');pop.setAttribute('aria-hidden','true')}
function ovFor(id){var o=S.ov[id]||(S.ov[id]={});return o}

/* ===== експорт ===== */
function download(name,rows){
 var csv='﻿'+rows.map(function(r){return r.map(function(c){c=String(c==null?'':c);return /[;"\n]/.test(c)?'"'+c.replace(/"/g,'""')+'"':c}).join(';')}).join('\r\n');
 var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500);
}
function doExport(what){
 if(what==='grades'){var rows=[['Дата','Предмет','Тема','Оцінка']];myGrades(addDays(TODAY,-120),TODAY).forEach(function(x){rows.push([x.L.date,x.L.subj.n,x.L.topic,x.g])});download('ocinky.csv',rows)}
 else if(what==='tasks'){var r2=[['Предмет','Завдання','Здати до','Статус']];taskList().forEach(function(L){r2.push([L.subj.n,L.hw,L.due,hwStatus(L)[0]])});download('zavdannia.csv',r2)}
 else if(what==='attend'){var r3=[['Дата','Предмет','Статус','Хвилин']];rangeLessons(addDays(TODAY,-60),TODAY).filter(function(L){return L.past}).forEach(function(L){var a=att(L,ME);r3.push([L.date,L.subj.n,ST[a.s][0],a.m||''])});download('vidviduvannia.csv',r3)}
 else if(what==='journal'){var code=S.jsubj||S.tsubj,cols=rangeLessons(addDays(TODAY,-40),TODAY).filter(function(L){return L.code===code&&L.past}).slice(-8);var r4=[['Учень'].concat(cols.map(function(L){return L.date}))];STUDENTS.forEach(function(n,i){r4.push([n].concat(cols.map(function(L){var g=grade(L,i),a=att(L,i);return g!=null?g:(a.s==='p'?'':ST[a.s][0])})))});download('zhurnal-'+code+'.csv',r4)}
}
function toast(t){toastEl.textContent=t;toastEl.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){toastEl.classList.remove('on')},2200)}

/* ===== події ===== */
document.addEventListener('click',function(e){
 var t=e.target.closest('[data-act]');
 if(!t){if(e.target===ovEl)closeSheet();if(e.target===pop)closePop();return}
 var a=t.dataset.act,d=t.dataset;
 if(a==='nav'){S.view=d.v;closeSheet();render();window.scrollTo(0,0)}
 else if(a==='role'){S.role=d.v;S.chat='';closeSheet();render()}
 else if(a==='open')openLesson(d.id);
 else if(a==='close')closeSheet();
 else if(a==='wk'){S.week=d.d==='0'?0:S.week+ +d.d;render(true)}
 else if(a==='wd'){S.wd=+d.i;render(true)}
 else if(a==='gper'){S.gper=d.v;render(true)}
 else if(a==='tf'){S.tf=d.v;render(true)}
 else if(a==='done'){S.done[d.id]=!S.done[d.id];save();render(true);if(d.sheet)openLesson(d.id);toast(S.done[d.id]?'Позначено «Здав»':'Позначку знято')}
 else if(a==='pe'){S.pe[d.d]=d.v;save();openLesson(openId);render(true)}
 else if(a==='amonth'){var m=S.amonth||TODAY.slice(0,7),dt=new Date(+m.slice(0,4),+m.slice(5,7)-1+ +d.d,1);S.amonth=dt.getFullYear()+'-'+p2(dt.getMonth()+1);S.aday='';render(true)}
 else if(a==='aday'){S.aday=d.d;render(true)}
 else if(a==='contact'){S.chat=d.id;render(true)}
 else if(a==='export'){doExport(d.what);toast('Файл CSV збережено')}
 else if(a==='remind')toast('Нагадування надіслано: '+d.t);
 else if(a==='reset'){if(confirm('Скинути всі зміни, зроблені в демо?')){S.ov={};S.done={};S.pe={};S.msgs={};save();render();toast('Демо скинуто')}}
 else if(a==='cell')openCell(d.id,+d.s);
 else if(a==='pclose'){closePop();render(true)}
 else if(a==='pset'){
  var id=popc.dataset.id,sid=popc.dataset.s,o=ovFor(id);
  if(d.k==='a'){o.att=o.att||{};o.att[sid]=d.v==='l'?{s:'l',m:5}:{s:d.v}}
  else{o.gr=o.gr||{};o.gr[sid]=d.v===''?null:+d.v}
  save();openCell(id,+sid);
 }
 else if(a==='allpresent'){$all('select[data-f=att]').forEach(function(s){s.value='p'});$all('input[data-f=min]').forEach(function(i){i.hidden=true})}
 else if(a==='savelesson')saveLesson();
 else if(a==='saveroom'){
  var f=document.getElementById('af'),id2=f.dataset.id,o2=ovFor(id2);o2.room=f.room.value.trim()||undefined;o2.schedBy='Адмін (ви)';o2.schedAt=TODAY;save();render(true);openLesson(id2);toast('Розклад оновлено');
 }
});
function $all(s){return Array.prototype.slice.call(sheet.querySelectorAll(s))}
function saveLesson(){
 var f=document.getElementById('lf');if(!f||!f.reportValidity())return;
 var id=f.dataset.id,o=ovFor(id);
 o.topic=f.topic.value.trim();o.hw=f.hw.value.trim();o.due=f.due.value;o.note=f.note.value.trim();
 o.by=SUBJ[S.tsubj].t+' (ви)';o.at=TODAY+' '+p2(NOW.getHours())+':'+p2(NOW.getMinutes());
 var sel=$all('select[data-f=att]');
 if(sel.length){o.att=o.att||{};o.gr=o.gr||{};
  sel.forEach(function(s){var i=s.dataset.s,k=s.value,m=sheet.querySelector('input[data-f=min][data-s="'+i+'"]');o.att[i]=k==='l'?{s:'l',m:+(m&&m.value)||5}:{s:k}});
  $all('select[data-f=gr]').forEach(function(s){o.gr[s.dataset.s]=s.value===''?null:+s.value});
 }
 save();render(true);closeSheet();toast('Урок збережено');
}
document.addEventListener('change',function(e){
 var t=e.target;
 if(t.dataset.sel==='tsubj'){S.tsubj=t.value;S.jsubj=t.value;render(true)}
 else if(t.dataset.sel==='jsubj'){S.jsubj=t.value;render(true)}
 else if(t.dataset.f==='att'){var m=sheet.querySelector('input[data-f=min][data-s="'+t.dataset.s+'"]');if(m)m.hidden=t.value!=='l'}
});
document.addEventListener('input',function(e){
 if(e.target.id==='q'){S.q=e.target.value;document.getElementById('tasklist').innerHTML=taskHtml();save()}
});
document.addEventListener('submit',function(e){
 if(e.target.id==='compose'){
  e.preventDefault();var i=document.getElementById('mt'),v=i.value.trim();if(!v)return;
  var th=thread(S.chat).slice();th.push({f:'me',t:v,ts:p2(NOW.getHours())+':'+p2(NOW.getMinutes())});S.msgs[S.chat]=th;
  save();render(true);var m=document.getElementById('msgs');if(m)m.scrollTop=m.scrollHeight;
 }
 else if(e.target.id==='lf'||e.target.id==='af')e.preventDefault();
});
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){if(pop.classList.contains('on'))closePop();else if(ovEl.classList.contains('on'))closeSheet()}
});

render();
})();
</script></body></html>`;
export default html;
