// Електронний щоденник MIDGARD v0.2. Увага: у вбудованому JS немає зворотних лапок і «${» — це String.raw.
const html: string = String.raw`<!doctype html><html lang="uk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>Електронний щоденник · MIDGARD</title>
<link rel="icon" href="/images/midgard-logo.jpg">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Unbounded:wght@600;700;800&display=swap">
<style>
:root{--bg:#f4f7ee;--card:#ffffff;--card2:#eef3e2;--ink:#18202f;--muted:#556070;--muted2:#7a8494;--line:#dde4d0;--line2:#c5cfb4;--soft:#eef3e2;--lime:#9ccc2c;--limeink:#14200a;--lt:#3f6b0e;--blue:#2a4fb0;--blue-soft:#e6ecfb;--ok:#2f8a3a;--ok-soft:#e1f2dd;--warn:#a8650d;--warn-soft:#fbefd5;--bad:#b0362b;--bad-soft:#f9e2df;--info:#2a4fb0;--info-soft:#e6ecfb;--shadow:none;color-scheme:light}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 Onest,system-ui,sans-serif;min-height:100vh}
h1,h2,h3{margin:0;font-family:Unbounded,Onest,sans-serif;font-weight:700;line-height:1.15;letter-spacing:-.01em}
button,select,input,textarea{font:inherit;color:inherit}
button{cursor:pointer}
a{color:var(--blue)}
::selection{background:var(--lime);color:var(--limeink)}
:focus-visible{outline:2px solid var(--lime);outline-offset:2px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.app{display:grid;grid-template-columns:244px 1fr;min-height:100vh}
.side{position:sticky;top:0;height:100vh;padding:22px 16px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:22px;background:var(--card)}
.brand{display:flex;align-items:center;gap:10px;padding:0 4px}
.brand img{width:38px;height:38px}
.brand b{font:700 13px/1.15 Unbounded,sans-serif;display:block;letter-spacing:.02em}
.brand small{color:var(--muted2);font-size:11px;text-transform:uppercase;letter-spacing:.14em}
.nav{display:grid;gap:2px}
.nav button{display:flex;align-items:center;gap:11px;padding:11px 12px;border:0;border-left:2px solid transparent;background:none;text-align:left;font-weight:500;color:var(--muted)}
.nav button svg{width:20px;height:20px;flex:none}
.nav button:hover{background:var(--card2);color:var(--ink)}
.nav button[aria-current=page]{background:var(--card2);color:var(--lt);border-left-color:var(--lime);font-weight:600}
.side .foot{margin-top:auto;font-size:12.5px;color:var(--muted2);display:grid;gap:6px;padding:0 4px}
.main{min-width:0;padding:0 32px 56px}
.top{display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:18px 0;position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--line);margin-bottom:22px}
.top h1{font-size:20px;flex:1;min-width:160px}
.who{display:flex;gap:0;border:1px solid var(--line2)}
.who button{border:0;background:none;padding:7px 13px;font-size:13px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
.who button+button{border-left:1px solid var(--line)}
.who button[aria-pressed=true]{background:var(--blue);color:#fff}
.demo{font-size:11px;font-weight:700;border:1px solid var(--warn);color:var(--warn);padding:3px 9px;text-transform:uppercase;letter-spacing:.12em}
.mtabs{display:none}
.grid{display:grid;gap:16px}
.g2{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr)}
.g3{grid-template-columns:repeat(3,minmax(0,1fr))}
.g4{grid-template-columns:repeat(4,minmax(0,1fr))}
.card{background:var(--card);border:1px solid var(--line);padding:20px}
.card h2{font-size:12px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:8px;text-transform:uppercase;letter-spacing:.16em;color:var(--lt);font-family:Onest,sans-serif;font-weight:700}
.card h2 small{font:500 12.5px Onest,sans-serif;color:var(--muted2);text-transform:none;letter-spacing:0}
.stat b{display:block;font:800 34px/1.05 Unbounded,sans-serif;color:var(--lt)}
.stat span{color:var(--muted);font-size:13px}
.stat em{font-style:normal;font-size:12.5px;font-weight:600;margin-left:6px}
.up{color:var(--ok)}.down{color:var(--bad)}
.hello{padding:26px;border:1px solid var(--line2);background:var(--card);margin-bottom:16px;position:relative;overflow:hidden}
.hello:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--lime)}
.hello h2{font-size:24px;margin-bottom:8px;text-transform:none;letter-spacing:-.01em;color:var(--ink);font-family:Unbounded,sans-serif;display:block}
.hello p{margin:0;color:var(--muted)}
.chip{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;font-size:12px;font-weight:600;background:var(--card2);color:var(--muted);white-space:nowrap;border:1px solid var(--line)}
.chip.ok{background:var(--ok-soft);color:var(--ok);border-color:transparent}.chip.warn{background:var(--warn-soft);color:var(--warn);border-color:transparent}.chip.bad{background:var(--bad-soft);color:var(--bad);border-color:transparent}.chip.info{background:var(--info-soft);color:var(--info);border-color:transparent}
.gr{display:inline-grid;place-items:center;min-width:30px;height:30px;padding:0 6px;font:700 14px Unbounded,sans-serif;background:var(--info-soft);color:var(--info)}
.gr.hi{background:var(--ok-soft);color:var(--ok)}.gr.lo{background:var(--warn-soft);color:var(--warn)}.gr.vlo{background:var(--bad-soft);color:var(--bad)}
.dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--muted2);flex:none}
.dot.p{background:var(--ok)}.dot.l{background:var(--warn)}.dot.a{background:var(--bad)}.dot.s,.dot.e,.dot.o{background:var(--info)}
.lesson{display:grid;grid-template-columns:62px 1fr auto;gap:14px;align-items:center;width:100%;text-align:left;padding:13px 16px;border:1px solid var(--line);background:var(--card);margin-bottom:8px;border-left:3px solid var(--c)}
.lesson:hover{background:var(--card2);border-color:var(--line2);border-left-color:var(--c)}
.lesson.now{box-shadow:inset 0 0 0 1px var(--lime)}
.lesson time{font-size:12.5px;color:var(--muted2);line-height:1.25;font-variant-numeric:tabular-nums}
.lesson time b{display:block;color:var(--ink);font:700 15px Unbounded,sans-serif}
.lesson .t{font-weight:600}
.lesson .s{font-size:13.5px;color:var(--muted)}
.lesson .r{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
.lesson.free{border-style:dashed;color:var(--muted2);cursor:default}
.empty{padding:28px;text-align:center;color:var(--muted2)}
.wk{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.day h3{font:700 11.5px Onest,sans-serif;text-transform:uppercase;letter-spacing:.16em;color:var(--muted2);margin:0 0 10px;display:flex;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid var(--line2)}
.day.today h3{color:var(--lt);border-bottom-color:var(--lime)}
.day.today h3 b{background:var(--lime);color:var(--limeink);padding:0 7px}
.cell{display:block;width:100%;text-align:left;padding:10px 11px;margin-bottom:7px;border:1px solid var(--line);border-left:3px solid var(--c);background:var(--card)}
.cell:hover{background:var(--card2);border-color:var(--line2);border-left-color:var(--c)}
.cell .n{font-weight:600;font-size:13.5px;line-height:1.25}
.cell .m{font-size:12px;color:var(--muted2);display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;align-items:center}
.cell.warn{background:var(--warn-soft)}
.cell.gap{border-style:dashed;color:var(--muted2);text-align:center;min-height:0;padding:6px}
.wkbar{display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap}
.btn{border:1px solid var(--line2);background:transparent;padding:9px 16px;font-weight:600;font-size:14px;color:var(--ink)}
.btn:hover{border-color:var(--lime);color:var(--lt)}
.btn.pri,.btn.lime{background:var(--lime);border-color:var(--lime);color:var(--limeink)}
.btn.pri:hover,.btn.lime:hover{background:#add93f;border-color:#add93f;color:var(--limeink)}
.btn.sm{padding:5px 11px;font-size:13px}
.seg{display:inline-flex;border:1px solid var(--line2);flex-wrap:wrap}
.seg button{border:0;background:none;padding:6px 13px;font-size:13px;font-weight:600;color:var(--muted)}
.seg button+button{border-left:1px solid var(--line)}
.seg button[aria-pressed=true]{background:var(--lime);color:var(--limeink)}
.dayTabs{display:none}
.tbl{width:100%;border-collapse:collapse;font-size:14px}
.tbl th{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--muted2);font-weight:700;text-align:left;padding:9px 10px;border-bottom:1px solid var(--line2);white-space:nowrap}
.tbl td{padding:10px;border-bottom:1px solid var(--line);vertical-align:middle}
.tbl tr:last-child td{border-bottom:0}
.scroll{overflow-x:auto}
.subj{display:flex;align-items:center;gap:10px;font-weight:600}
.subj i{width:10px;height:10px;background:var(--c);flex:none}
details.sj{border:1px solid var(--line);margin-bottom:8px;background:var(--card);overflow:hidden}
details.sj summary{list-style:none;display:grid;grid-template-columns:minmax(120px,1.2fr) 70px 90px minmax(0,1.6fr) 20px;gap:12px;align-items:center;padding:13px 16px;cursor:pointer}
details.sj summary:hover{background:var(--card2)}
details.sj summary::-webkit-details-marker{display:none}
details.sj[open] summary{border-bottom:1px solid var(--line)}
details.sj .body{padding:6px 16px 12px}
.chips{display:flex;gap:5px;flex-wrap:wrap}
.row{display:flex;gap:12px;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line)}
.row:last-child{border-bottom:0}
.row button.lnk{border:0;background:none;color:var(--lt);font-weight:600;padding:0;text-align:left}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.cal .h{font-size:11px;color:var(--muted2);text-align:center;text-transform:uppercase;letter-spacing:.12em}
.cal button,.cal div.d{aspect-ratio:1;min-height:42px;border:1px solid var(--line);background:var(--card);display:grid;place-items:center;font-weight:600;position:relative}
.cal div.d{border:0;background:none;color:var(--muted2);font-weight:400}
.cal button.p{background:var(--ok-soft);border-color:transparent}
.cal button.l{background:var(--warn-soft);border-color:transparent}
.cal button.a{background:var(--bad-soft);border-color:transparent}
.cal button.s,.cal button.e,.cal button.o{background:var(--info-soft);border-color:transparent}
.cal button.sel{outline:2px solid var(--ink)}
.cal button.td{box-shadow:inset 0 0 0 2px var(--lime)}
.legend{display:flex;gap:14px;flex-wrap:wrap;font-size:13px;color:var(--muted2);margin-top:12px}
.legend span{display:inline-flex;gap:6px;align-items:center}
.filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;align-items:center}
.inp{padding:9px 12px;border:1px solid var(--line2);background:var(--card)}
.jr td,.jr th{text-align:center;padding:6px}
.jr td:first-child,.jr th:first-child{text-align:left;position:sticky;left:0;background:var(--card);z-index:1;min-width:120px;font-weight:600}
.jr button{display:inline-flex;gap:5px;align-items:center;justify-content:center;min-width:46px;height:34px;border:1px solid var(--line);background:var(--card2);padding:0 6px;font-weight:700}
.jr button:hover{border-color:var(--lime)}
.jr button[disabled]{opacity:.6;cursor:default}
.chat{display:grid;grid-template-columns:280px 1fr;gap:0;min-height:480px;padding:0;overflow:hidden}
.contacts{border-right:1px solid var(--line);padding:8px}
.contacts button{display:grid;gap:2px;width:100%;text-align:left;padding:11px 12px;border:0;border-left:2px solid transparent;background:none}
.contacts button:hover{background:var(--card2)}
.contacts button[aria-pressed=true]{background:var(--card2);border-left-color:var(--lime)}
.contacts b{font-size:14px}.contacts small{color:var(--muted2);font-size:12.5px}
.thread{display:flex;flex-direction:column;min-height:0}
.thread header{padding:14px 18px;border-bottom:1px solid var(--line);display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.msgs{flex:1;padding:16px 18px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;max-height:420px}
.msg{max-width:78%;padding:9px 13px;background:var(--card2);border:1px solid var(--line)}
.msg.me{align-self:flex-end;background:var(--lime);border-color:var(--lime);color:var(--limeink)}
.msg small{display:block;opacity:.7;font-size:11.5px;margin-top:2px}
.compose{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line)}
.compose input{flex:1}
.ov{position:fixed;inset:0;background:rgba(24,32,47,.45);z-index:40;display:none}
.ov.on{display:block}
.sheet{position:absolute;top:0;right:0;bottom:0;width:min(580px,100%);background:var(--bg);overflow-y:auto;padding:0 0 28px;border-left:1px solid var(--line2)}
.sheet .hd{position:sticky;top:0;z-index:2;background:var(--card);border-bottom:1px solid var(--line);padding:18px 20px;border-top:4px solid var(--c);display:flex;gap:12px;justify-content:space-between;align-items:flex-start}
.sheet .hd h2{font-size:18px}
.sheet .hd p{margin:4px 0 0;color:var(--muted);font-size:13.5px}
.sheet .x{border:1px solid var(--line2);background:none;width:34px;height:34px;font-size:18px;line-height:1}
.sheet .x:hover{border-color:var(--lime);color:var(--lt)}
.sec{padding:18px 20px 0}
.sec h3{font:700 11px Onest,sans-serif;text-transform:uppercase;letter-spacing:.16em;color:var(--lt);margin-bottom:10px}
.box{background:var(--card);border:1px solid var(--line);padding:13px 15px}
.box+.box{margin-top:8px}
.meta{display:grid;gap:4px;font-size:13px;color:var(--muted)}
.meta b{color:var(--ink);font-weight:600}
.frm{display:grid;gap:10px}
.frm label{display:grid;gap:4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
.frm input,.frm textarea,.frm select{padding:9px 11px;border:1px solid var(--line2);background:var(--bg);font-weight:400;text-transform:none;letter-spacing:0;color:var(--ink);font-size:14.5px}
.frm textarea{min-height:64px;resize:vertical}
.att{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid var(--line)}
.att:last-child{border-bottom:0}
.att select{padding:5px 6px;border:1px solid var(--line2);background:var(--bg);font-size:13.5px}
.att input[type=number]{width:54px;padding:5px;border:1px solid var(--line2);background:var(--bg)}
.pop{position:fixed;inset:0;z-index:60;background:rgba(24,32,47,.45);display:none;place-items:center;padding:16px}
.pop.on{display:grid}
.pop .card{width:min(380px,100%);border-color:var(--line2)}
.opts{display:flex;gap:6px;flex-wrap:wrap}
.opts button{border:1px solid var(--line2);background:none;padding:7px 12px;font-weight:600}
.opts button[aria-pressed=true]{background:var(--lime);border-color:var(--lime);color:var(--limeink)}
.toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:var(--lime);color:var(--limeink);padding:10px 20px;font-weight:700;z-index:80;opacity:0;pointer-events:none;transition:opacity .2s}
.toast.on{opacity:1}
.bars{display:grid;gap:9px}
.bar{display:grid;grid-template-columns:150px 1fr 36px;gap:10px;align-items:center;font-size:13.5px}
.bar i{display:block;height:8px;background:var(--c,var(--lime))}
.bar div{background:var(--card2);height:8px}
details.sj .x{}
.cell.sel{outline:2px solid var(--lime);outline-offset:1px}
.cell.gap:hover{border-color:var(--lime);color:var(--lt)}
.cell[draggable=true]{cursor:grab}
.rt td,.rt th{vertical-align:top;padding:6px;min-width:96px}
.rt td:first-child,.rt th:first-child{position:sticky;left:0;background:var(--card);z-index:1;min-width:120px}
.rc{display:block;width:100%;text-align:left;padding:4px 6px;font-size:12px;border:0;border-left:3px solid var(--line2);background:var(--card2);margin:2px 0;color:var(--ink)}
.rc.my{border-left-color:var(--lime)}
.rc.conf{border-left-color:var(--bad);background:var(--bad-soft);color:var(--bad)}
.rc.book{border-left-color:var(--warn);background:var(--warn-soft);color:var(--warn)}
.rc.other{color:var(--muted2)}
.rfree{width:100%;border:1px dashed var(--line);background:none;color:var(--muted2);padding:4px;font-size:12px}
.rfree:hover{border-color:var(--lime);color:var(--lt)}
input[type=color]{width:38px;height:30px;padding:0;border:1px solid var(--line2);background:none}
input[type=file]{font-size:13px;color:var(--muted)}
@media (max-width:1100px){.g4{grid-template-columns:repeat(2,1fr)}.g2{grid-template-columns:1fr}.wk{gap:6px}}
@media (max-width:820px){
 .app{grid-template-columns:1fr}.side{display:none}
 .main{padding:0 16px 96px}
 .top{padding:12px 0;margin-bottom:16px}.top h1{font-size:17px}
 .mtabs{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--card);border-top:1px solid var(--line2);padding:6px 4px calc(6px + env(safe-area-inset-bottom));justify-content:space-around;overflow-x:auto}
 .mtabs button{flex:1;min-width:54px;border:0;background:none;display:grid;justify-items:center;gap:2px;font-size:11px;color:var(--muted2);padding:4px 2px;font-weight:600}
 .mtabs button svg{width:22px;height:22px}
 .mtabs button[aria-current=page]{color:var(--lt)}
 .g3,.g4{grid-template-columns:1fr 1fr}
 .wk{display:block}.wk .day{display:none}.wk .day.act{display:block}
 .dayTabs{display:flex;gap:6px;margin-bottom:12px}
 .dayTabs button{flex:1;border:1px solid var(--line2);background:none;padding:8px 0;font-weight:600;font-size:13px}
 .dayTabs button[aria-pressed=true]{background:var(--lime);border-color:var(--lime);color:var(--limeink)}
 details.sj summary{grid-template-columns:1fr auto 20px}
 details.sj summary .chips,details.sj summary .sp{display:none}
 .chat{grid-template-columns:1fr}.contacts{border-right:0;border-bottom:1px solid var(--line)}
 .sheet{width:100%;top:8vh;border-left:0;border-top:1px solid var(--line2)}
 .bar{grid-template-columns:100px 1fr 30px}
 .lesson{grid-template-columns:52px 1fr}.lesson .r{grid-column:1/-1;justify-content:flex-start}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
@media print{.side,.top,.mtabs,.btn{display:none!important}.app{display:block}.card{border-color:#999}}
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
/* ===== v0.2: довідники, початковий стан ===== */
var REASONS_SUB=['Хвороба вчителя','Відрядження','Навчання / курси','Сімейні обставини','Інше'];
var ABS_REASONS=['Хвороба','Поважна причина','Без причини','Дистанційне навчання','Навчається за кордоном','Сімейне навчання','Самоізоляція','ТПО','Екстернат'];
var MT0=[{id:'cur',n:'Поточна',c:'#15803d',w:1,d:0},{id:'the',n:'Тематична атестація',c:'#ff7a6b',w:3,d:0},{id:'ctl',n:'Контрольна робота',c:'#c2410c',w:2,d:0},{id:'self',n:'Самостійна робота',c:'#f5c451',w:1,d:0},{id:'nb',n:'За ведення зошита',c:'#2a4fb0',w:1,d:14},{id:'hw',n:'За домашнє завдання',c:'#0f766e',w:1,d:0},{id:'read',n:'Читання вголос',c:'#4d7c0f',w:1,d:7}];
var MODS=['Розклад','Журнал і оцінки','Відвідування','Заміни','Чат','Стіна класу','Новини','Календар','Статистика','Налаштування'];
var GRPS=['Учні','Батьки','Вчителі','Завучі','Адмін'];
var PERM0={'Учні':[1,1,1,0,2,1,1,1,0,0],'Батьки':[1,1,1,0,2,1,1,2,0,0],'Вчителі':[1,2,2,1,2,2,1,1,0,0],'Завучі':[2,2,2,2,2,2,2,2,2,1],'Адмін':[2,2,2,2,2,2,2,2,2,2]};
var LEVN=['—','Перегляд','Редагування'];
var SCOPES=['Свій клас','Кафедра','Уся школа'];
var ROOMS=['204','112','Лінгвокабінет','108','Лаб. 3','Комп’ютерний клас','210','Спортзал','Студія','Актова зала','Переговорна'];
var OTHERC=['6-А','6-Б','7-Б','8-А','8-Б','9-А','10-А'];
var OTHERS=['Математика','Хімія','Географія','Література','Історія'];
var ANSW=['Розвʼязав усі завдання, фото зошита додаю.','Виконав частково, не вистачило часу на останню вправу.','Усе виконано, є питання по другій задачі.','Додаю презентацію до доповіді.','Зробила за планом, перевірте, будь ласка.'];
var EVK={'збори':'info','іспит':'bad','зустріч':'ok','свято':'warn'};
function nextDow(dow){for(var i=1;i<=7;i++){var d=addDays(TODAY,i);if(parse(d).getDay()===dow)return d}return TODAY}
function seedState(){
 ['lay','one','book','subs','chk','meet','up','perm','ov','done','pe','msgs'].forEach(function(k){if(!S[k]||typeof S[k]!=='object')S[k]={}});
 if(!S.mt)S.mt=MT0.map(function(x){return {id:x.id,n:x.n,c:x.c,w:x.w,d:x.d}});
 if(!S.absr)S.absr=ABS_REASONS.slice();
 if(!S.subr)S.subr=REASONS_SUB.slice();
 if(!S.wall)S.wall=[
  {id:'w1',a:'Олена С.',d:addDays(TODAY,-1),t:'Дякуємо всім, хто був на екскурсії до музею! Фото додамо на цьому тижні.',likes:7},
  {id:'w2',a:'Ірина М.',d:addDays(TODAY,-4),t:'Нагадування: у четвер диктант. Повторіть правила про розділові знаки при звертанні.',likes:3},
  {id:'w3',a:'Класний керівник',d:addDays(TODAY,-8),t:'7-А виграв шкільний турнір з волейболу! Молодці, команда.',likes:15}];
 if(!S.news)S.news=[
  {id:'n1',a:'Адміністрація',d:addDays(TODAY,-2),t:'Зміна розкладу дзвінків: з наступного тижня перерва після 3-го уроку — 20 хвилин.',likes:0,pin:true},
  {id:'n2',a:'Адміністрація',d:addDays(TODAY,-6),t:'Відкрито запис на гуртки другого семестру. Перегляньте список у розділі «Календар».',likes:0},
  {id:'n3',a:'Адміністрація',d:addDays(TODAY,-12),t:'Нагадуємо: довідки про стан здоровʼя приймаються до кінця місяця.',likes:0}];
 if(!S.evs)S.evs=[
  {id:'e1',t:'Контрольна з математики',d:addDays(TODAY,3),tm:'09:25',k:'іспит'},
  {id:'e2',t:'Батьківські збори 7-А',d:addDays(TODAY,5),tm:'18:00',k:'збори'},
  {id:'e3',t:'День відкритих дверей: зустрічі з вчителями',d:nextDow(4),tm:'15:00',k:'зустріч'},
  {id:'e4',t:'Шкільне свято осені',d:addDays(TODAY,12),tm:'12:00',k:'свято'}];
}
seedState();
function permOf(m,g){var k=m+':'+g;return S.perm[k]!==undefined?+S.perm[k]:PERM0[g][MODS.indexOf(m)]}
function mtOf(id){for(var i=0;i<S.mt.length;i++)if(S.mt[i].id===id)return S.mt[i];return S.mt[0]}
function baseCode(date,slot){
 var wd=(parse(date).getDay()+6)%7;if(wd>4)return null;
 var id=date+'-'+slot;if(S.one[id]!==undefined)return S.one[id]||null;
 var arr=S.lay[wd+'-'+slot];
 if(arr){var c;arr.forEach(function(x){if(x.from<=date)c=x.code});if(c!==undefined)return c||null}
 return TPL[wd][slot];
}
function showPop(){pop.classList.add('on');pop.setAttribute('aria-hidden','false');var f=popc.querySelector('input,select,textarea,button');if(f)f.focus()}
function ph(t,sub){return '<h2 style="font:700 16px Unbounded,sans-serif;text-transform:none;letter-spacing:0;color:var(--ink);display:block;margin-bottom:4px">'+esc(t)+'</h2><p style="margin:0 0 14px;color:var(--muted);font-size:13.5px">'+sub+'</p>'}
function lab(t,inner){return '<label style="display:grid;gap:4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:10px">'+t+inner+'</label>'}
var FIELD='padding:9px 11px;border:1px solid var(--line2);background:var(--bg);font-weight:400;text-transform:none;letter-spacing:0;color:var(--ink);font-size:14.5px;width:100%';
function opt(v,t,sel){return '<option value="'+esc(v)+'"'+(sel?' selected':'')+'>'+esc(t)+'</option>'}
function teachersList(){var o=[];Object.keys(SUBJ).forEach(function(k){var t=SUBJ[k].t;if(t!=='Команда тренерів'&&o.indexOf(t)<0)o.push(t)});return o}


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
 var code=baseCode(date,slot);if(!code||!SUBJ[code])return null;
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
  due:o.due||addSchoolDays(date,2),note:o.note!==undefined?o.note:note,sub:r5>0.94||!!S.subs[id],files:o.files||[],mt:o.mt||'cur',priv:o.priv||'',
  by:o.by||(filled?sj.t:''),byAt:o.at||(filled?date+' '+BELLS[slot][1]:''),
  schedBy:o.schedBy||'Адмін Н.',schedAt:o.schedAt||addDays(date,-(3+Math.floor(r6*5))),
  conflict:wd===2&&slot===3&&code==='phy'&&!o.room};
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
 rooms:'<rect x="4" y="3" width="16" height="18"/><path d="M9 21v-5h6v5M9 8h.01M15 8h.01M9 12h.01M15 12h.01"/>',
 subs:'<path d="M7 7h11l-3-3M17 17H6l3 3"/>',
 check:'<path d="m9 11 3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>',
 course:'<path d="M4 5h16v14H4zM4 9h16M9 9v10"/>',
 wall:'<rect x="3" y="4" width="18" height="6"/><rect x="3" y="12" width="18" height="8"/>',
 news:'<path d="M4 5h14v14H6a2 2 0 0 1-2-2zM18 9h2v8a2 2 0 0 1-2 2M8 9h6M8 13h6"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
 stats:'<path d="M4 20h16M7 20V10M12 20V5M17 20v-8"/>',
 overview:'<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="10" width="8" height="11" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/>'
};
function icon(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'}
var NAVS={
 student:[['today','Сьогодні'],['week','Тиждень'],['grades','Оцінки'],['tasks','Завдання'],['attend','Відвідування'],['wall','Стіна класу'],['news','Новини'],['cal','Календар'],['chat','Чат']],
 parent:[['today','Сьогодні'],['week','Тиждень'],['grades','Оцінки'],['tasks','Завдання'],['attend','Відвідування'],['wall','Стіна класу'],['news','Новини'],['cal','Календар'],['chat','Чат']],
 teacher:[['today','Сьогодні'],['week','Розклад'],['klass','Журнал класу'],['check','Перевірка завдань'],['course','План курсу'],['wall','Стіна класу'],['news','Новини'],['cal','Календар'],['chat','Чат']],
 admin:[['overview','Огляд школи'],['week','Розклад'],['rooms','Кабінети'],['subs','Заміни'],['attend','Відвідування'],['stats','Статистика'],['wall','Стіна класу'],['news','Новини'],['cal','Календар'],['chat','Чат'],['settings','Налаштування']]
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
 +'<div class="foot"><span class="demo" style="justify-self:start">Демо-дані · v0.2</span><a href="/midgard">← Дашборд якості уроків</a><button class="btn sm" data-act="reset">Скинути зміни демо</button><a href="/midgard?logout=1">Вийти</a></div></aside>'
 +'<main class="main" id="main"><div class="top"><h1>'+esc(titleOf())+'</h1>'+extra+'<div class="who" role="group" aria-label="Подивитися очима ролі">'+who+'</div></div><div id="view"></div></main>'
 +'<nav class="mtabs" aria-label="Розділи">'+nav().map(function(n){return '<button data-act="nav" data-v="'+n[0]+'"'+(S.view===n[0]?' aria-current="page"':'')+'>'+icon(n[0])+'<span>'+n[1].split(' ')[0]+'</span></button>'}).join('')+'</nav>';
}
function render(keepScroll){
 var y=window.scrollY;
 app.innerHTML=shell();
 var v=document.getElementById('view');
 var fn={today:vToday,week:vWeek,grades:vGrades,tasks:vTasks,attend:vAttend,chat:vChat,klass:vKlass,overview:vOverview,rooms:vRooms,subs:vSubs,check:vCheck,course:vCourse,wall:vWall,news:vNews,cal:vCal,settings:vSettings,stats:vStats}[S.view];
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
 var adm=S.role==='admin',ed=adm&&S.edit;
 var bar='<div class="wkbar"><button class="btn" data-act="wk" data-d="-1" aria-label="Попередній тиждень">←</button><b>'+dlabel(mon)+' – '+dlabel(days[4])+'</b><button class="btn" data-act="wk" data-d="1" aria-label="Наступний тиждень">→</button><button class="btn" data-act="wk" data-d="0">Цей тиждень</button>'+(adm?'<span style="flex:1"></span><button class="btn'+(ed?' lime':'')+'" data-act="edit" aria-pressed="'+ed+'">'+(ed?'Готово':'Режим редагування')+'</button>'+(ed?'<button class="btn" data-act="copywk">Копіювати на наступний тиждень</button>':''):'')+'<button class="btn" data-act="print">Друк</button></div>';
 var tabs='<div class="dayTabs" role="group" aria-label="День тижня">'+days.map(function(d,i){return '<button data-act="wd" data-i="'+i+'" aria-pressed="'+(i===actDay)+'">'+DAYS[i]+' '+parse(d).getDate()+'</button>'}).join('')+'</div>';
 var cols=days.map(function(d,i){
  var inner;
  if(ed)inner=[0,1,2,3,4,5].map(function(sl){return editCell(d,sl)}).join('');
  else{var ls=dayLessons(d);inner=ls.length?ls.map(function(L){return weekCell(L)}).join(''):'<div class="cell gap">вихідний</div>'}
  return '<div class="day'+(d===TODAY?' today':'')+(i===actDay?' act':'')+'"><h3><span>'+DAYS[i]+'</span><b>'+parse(d).getDate()+'</b></h3>'+inner+'</div>';
 }).join('');
 var hint=ed?'Перетягніть урок на інший слот — або натисніть урок, потім слот. Далі оберіть: лише цей урок, усі тижні чи лише майбутні. Натисніть «+», щоб додати урок.':(isKid()?'Натисніть на урок — там тема, домашнє, оцінка й відвідування. Усе в одному місці.':(S.role==='teacher'?'Ваші уроки ('+SUBJ[S.tsubj].n+') можна заповнювати прямо звідси. Решта — лише перегляд.':'Накладки аудиторій підсвічені. Натисніть «Режим редагування», щоб переставляти уроки.'));
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
 var total=240,reasons=S.absr.map(function(n,i){var q=rng(hash('r'+FOCUS+i));return [n,i===2?1+Math.floor(q()*3):(i<2?5+Math.floor(q()*6):1+Math.floor(q()*4))]});
 var absent=reasons.reduce(function(s,x){return s+x[1]},0);
 var unf=rangeLessons(addDays(TODAY,-3),TODAY).filter(function(L){return L.past&&!L.filled});
 var conf=rangeLessons(monday(FOCUS),addDays(monday(FOCUS),4)).filter(function(L){return L.conflict});
 var subs=rangeLessons(monday(FOCUS),addDays(monday(FOCUS),4)).filter(function(L){return L.sub});
 var mx=Math.max.apply(null,reasons.map(function(x){return x[1]}))||1;
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
  {id:'a_dir',n:'Дирекція',s:'Адресат'},
  {id:'sup',n:'Технічна підтримка',s:'Проблеми із застосунком'}];
 return [
  {id:'a_dir',n:'Дирекція',s:'Адресат'},
  {id:'a_z1',n:'Завуч молодшої школи',s:'Адресат'},
  {id:'a_z2',n:'Завуч старшої школи',s:'Адресат'},
  {id:'g_par',n:'Батьки 7-А',s:'Груповий чат'},
  {id:'g_pb',n:'Батьки 7-Б',s:'Груповий чат'},
  {id:'g_stu',n:'Учні 7-А',s:'Груповий чат'},
  {id:'f_0',n:'Родина Максима Д.',s:'Батьки'},
  {id:'f_1',n:'Родина Соломії Т.',s:'Батьки'},
  {id:'adm',n:'Адміністрація школи',s:'Навчальна частина'}];
}
var SEED={t_mat:[['them','Добрий день! Нагадую про контрольну в четвер.','10:12'],['me','Дякую, підготуємось!','10:20']],adm:[['them','Нагадування: до п’ятниці надішліть довідку про стан здоровʼя.','Вчора']]};
function thread(id){return S.msgs[id]||(SEED[id]||[]).map(function(m){return {f:m[0],t:m[1],ts:m[2]}})}
function vChat(){
 var cs=contacts(),cq=(S.cq||'').toLowerCase();if(cq)cs=cs.filter(function(c){return (c.n+' '+c.s).toLowerCase().indexOf(cq)>=0});if(!cs.length)cs=contacts();if(!S.chat||!cs.some(function(c){return c.id===S.chat}))S.chat=cs[0].id;
 var cur=cs.filter(function(c){return c.id===S.chat})[0],msgs=thread(S.chat);
 return '<div class="card chat"><div class="contacts" role="list"><input class="inp" id="cq" type="search" placeholder="Знайти адресата" value="'+esc(S.cq||'')+'" style="width:100%;margin-bottom:6px">'+cs.map(function(c){return '<button role="listitem" data-act="contact" data-id="'+c.id+'" aria-pressed="'+(c.id===S.chat)+'"><b>'+esc(c.n)+'</b><small>'+esc(c.s)+'</small></button>'}).join('')+'</div>'
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
 var hd='<div class="hd"><div><h2 id="sheetT">'+esc(L.subj.n)+'</h2><p>'+esc(dfull(L.date))+' · '+L.time[0]+'–'+L.time[1]+' · каб. '+esc(L.room)+'</p><div class="chips" style="margin-top:8px">'+(L.sub?chip('Заміна','warn'):'')+(L.conflict&&!isKid()?chip('Накладка аудиторії','bad'):'')+(L.past?chip('Урок проведено','ok'):chip('Попереду'))+chip(mtOf(L.mt).n)+'</div></div><button class="x" data-act="close" aria-label="Закрити">×</button></div>';
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
 if(!edit&&L.files.length)body+='<div class="sec"><h3>Файли до уроку</h3><div class="chips">'+L.files.map(function(x){return chip('📎 '+x.n)}).join('')+'</div></div>';
 if(S.role==='student'&&L.hw&&L.past&&!edit)body+='<div class="sec"><h3>Моя відповідь на ДЗ</h3><div class="box"><input type="file" multiple data-f="up" data-id="'+L.id+'" aria-label="Завантажити файли відповіді">'+((S.up[L.id]||[]).length?'<div class="chips" style="margin-top:8px">'+S.up[L.id].map(function(n){return chip('📎 '+n,'ok')}).join('')+'</div>':'')+'</div></div>';
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
 +'<label>Тип роботи (для оцінок)<select name="mt">'+S.mt.map(function(m){return opt(m.id,m.n,m.id===L.mt)}).join('')+'</select></label>'
 +'<label>Файли до уроку<input type="file" name="files" multiple></label>'+(L.files.length?'<div class="chips">'+L.files.map(function(x){return chip('📎 '+x.n,'ok')}).join('')+'</div>':'')
 +'<label>Нотатка для себе (бачите тільки ви)<textarea name="priv">'+esc(L.priv)+'</textarea></label>'
 +'<div><button type="button" class="btn sm" data-act="plan">Підставити тему з плану курсу</button></div>'
 +'</form>'+(L.past?attendanceTable(L,true):'<div class="sec"><div class="box" style="color:var(--muted)">Присутність і оцінки відкриються після початку уроку.</div></div>')
 +'<div class="sec"><button class="btn pri" data-act="savelesson">Зберегти урок</button></div>';
}
function adminForm(L){
 return '<form id="af" class="sec frm" data-id="'+L.id+'"><h3 style="margin-bottom:0">Зміни в розкладі</h3><label>Аудиторія<input name="room" value="'+esc(L.room)+'"></label><button type="button" class="btn lime" data-act="saveroom">Зберегти зміну розкладу</button><p style="font-size:12.5px;color:var(--muted);margin:0">Записується в поле «Розклад востаннє змінив» — окремо від того, хто заповнив зміст уроку.</p><button type="button" class="btn sm" data-act="dellesson" data-id="'+L.id+'">Прибрати урок із розкладу…</button></form>';
}

/* ===== діалог оцінки/присутності в журналі ===== */
function openCell(id,sid){
 var L=lesson(id.slice(0,10),+id.slice(11)),a=att(L,sid),g=grade(L,sid),mt=mtOf(L.mt);
 if(mt.d>0&&(parse(TODAY)-parse(L.date))/864e5>mt.d){toast('Редагування закрите: минуло понад '+mt.d+' дн. ('+mt.n+')');return}
 popc.dataset.id=id;popc.dataset.s=sid;
 popc.innerHTML=ph(STUDENTS[sid],esc(L.subj.n)+', '+dlabel(L.date)+' · '+esc(mt.n))
 +'<h3 style="font:700 11px Onest;letter-spacing:.14em;text-transform:uppercase;color:var(--lt);margin-bottom:6px">Присутність</h3><div class="opts" id="po1">'+STORDER.map(function(k){return '<button data-act="pset" data-k="a" data-v="'+k+'" aria-pressed="'+(a.s===k)+'">'+ST[k][0]+'</button>'}).join('')+'</div>'
 +'<h3 style="font:700 11px Onest;letter-spacing:.14em;text-transform:uppercase;color:var(--lt);margin:14px 0 6px">Оцінка</h3><div class="opts" id="po2">'+[5,6,7,8,9,10,11,12].map(function(v){return '<button data-act="pset" data-k="g" data-v="'+v+'" aria-pressed="'+(g===v)+'">'+v+'</button>'}).join('')+'<button data-act="pset" data-k="g" data-v="" aria-pressed="'+(g==null)+'">Без оцінки</button></div>'
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
 else if(what==='subs'){var r5=[['Дата','Час','Урок','Кого замінили','Хто замінив','Причина']];allSubs().forEach(function(x){r5.push([x.L.date,x.L.time[0],x.L.subj.n,x.L.subj.t,x.by,x.reason])});download('zaminy.csv',r5)}
 else if(what==='stats'){var r6=[['Вчитель','Предмет','Заповнено','Всього','Середній бал','Заміни']];statRows().forEach(function(x){r6.push([x.t,x.n,x.filled,x.total,x.avg,x.subs])});download('statystyka-vchyteliv.csv',r6)}
 else if(what==='act'){var r7=[['Група','Імʼя','Доступ','Мобільний','Веб','Останній вхід']];actRows().forEach(function(x){r7.push(x)});download('aktyvnist.csv',r7)}
}
function toast(t){toastEl.textContent=t;toastEl.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){toastEl.classList.remove('on')},2200)}

/* ===== v0.2: редактор розкладу ===== */
function slotName(id){var d=id.slice(0,10),s=+id.slice(11),wd=(parse(d).getDay()+6)%7;return DAYS[wd]+' '+BELLS[s][0]}
function editCell(d,s){
 var L=lesson(d,s),id=d+'-'+s,sel=S.sel===id;
 if(L)return '<button class="cell'+(sel?' sel':'')+(L.conflict?' warn':'')+'" draggable="true" style="--c:'+L.subj.c+'" data-act="slot" data-id="'+id+'"><div class="n">'+esc(L.subj.n)+'</div><div class="m"><span>'+L.time[0]+' · '+esc(L.room)+'</span>'+(L.conflict?'<span class="chip bad">накладка</span>':'')+'</div></button>';
 return '<button class="cell gap" data-act="slot" data-id="'+id+'">+ '+BELLS[s][0]+'</button>';
}
function scopeBtns(){return '<div style="display:grid;gap:8px"><button class="btn pri" data-act="scope" data-sc="one">Лише цей урок</button><button class="btn" data-act="scope" data-sc="all">Усі тижні (разом з минулими)</button><button class="btn" data-act="scope" data-sc="fut">Лише майбутні тижні</button><button class="btn" data-act="pclose">Скасувати</button></div>'}
function openMove(src,dst){
 var cs=baseCode(src.slice(0,10),+src.slice(11)),cd=baseCode(dst.slice(0,10),+dst.slice(11));
 popc.dataset.op='mv';popc.dataset.src=src;popc.dataset.dst=dst;
 popc.innerHTML=ph(cd?'Поміняти місцями':'Перемістити урок',esc(SUBJ[cs].n)+': '+slotName(src)+' → '+slotName(dst)+(cd?'. «'+esc(SUBJ[cd].n)+'» стане на місце першого.':'.'))+scopeBtns();
 showPop();
}
function openAdd(id){
 popc.dataset.op='add';popc.dataset.dst=id;
 popc.innerHTML=ph('Додати урок',esc(slotName(id)))+lab('Предмет','<select id="addsub" style="'+FIELD+'">'+Object.keys(SUBJ).map(function(k){return opt(k,SUBJ[k].n)}).join('')+'</select>')+scopeBtns();
 showPop();
}
function openDel(id){
 var c=baseCode(id.slice(0,10),+id.slice(11));
 popc.dataset.op='del';popc.dataset.dst=id;
 popc.innerHTML=ph('Прибрати урок із розкладу',esc(SUBJ[c].n)+', '+slotName(id))+scopeBtns();
 showPop();
}
function applySet(id,code,sc){
 var d=id.slice(0,10),s=+id.slice(11),wd=(parse(d).getDay()+6)%7;
 if(sc==='one')S.one[id]=code;
 else{delete S.one[id];var k=wd+'-'+s;(S.lay[k]=S.lay[k]||[]).push({from:sc==='all'?'0000-00-00':d,code:code})}
 var o=ovFor(id);o.schedBy='Адмін (ви)';o.schedAt=TODAY;
}
function applyScope(sc){
 var op=popc.dataset.op,src=popc.dataset.src,dst=popc.dataset.dst;
 if(op==='mv'){
  var cs=baseCode(src.slice(0,10),+src.slice(11)),cd=baseCode(dst.slice(0,10),+dst.slice(11));
  if(sc==='one'){var a=S.ov[src],b=S.ov[dst];delete S.ov[src];delete S.ov[dst];if(b)S.ov[src]=b;if(a)S.ov[dst]=a}
  applySet(src,cd||'',sc);applySet(dst,cs,sc);S.sel='';toast('Розклад змінено');
 } else if(op==='add'){
  applySet(dst,document.getElementById('addsub').value,sc);toast('Урок додано');
 } else if(op==='del'){
  applySet(dst,'',sc);closeSheet();toast('Урок прибрано');
 }
 closePop();render(true);
}
function copyWeek(){
 var mon=addDays(monday(FOCUS),S.week*7);
 for(var i=0;i<5;i++)for(var s=0;s<6;s++)S.one[addDays(mon,7+i)+'-'+s]=baseCode(addDays(mon,i),s)||'';
 toast('Тиждень скопійовано на наступний');
}

/* ===== v0.2: розклад кабінетів і бронювання ===== */
function roomUse(date,slot,room){
 var r=[],L=lesson(date,slot);
 if(L&&L.room===room){r.push({t:'7-А · '+L.subj.n,k:L.conflict?'conf':'my'});if(L.conflict)r.push({t:'7-Б · Фізика',k:'conf'})}
 var bk=S.book[date+'|'+slot+'|'+room];if(bk)r.push({t:'Бронь: '+bk,k:'book'});
 if(!r.length&&room!=='Переговорна'&&room!=='Актова зала'){var q=rng(hash(date+slot+room));if(q()<0.22)r.push({t:OTHERC[Math.floor(q()*OTHERC.length)]+' · '+OTHERS[Math.floor(q()*OTHERS.length)],k:'other'})}
 return r;
}
function vRooms(){
 var day=S.rday&&schoolDay(S.rday)?S.rday:FOCUS;
 var mon=monday(day),conf=rangeLessons(mon,addDays(mon,4)).filter(function(L){return L.conflict});
 var head='<tr><th>Кабінет</th>'+BELLS.map(function(b){return '<th>'+b[0]+'</th>'}).join('')+'</tr>';
 var body=ROOMS.map(function(rm){
  return '<tr><td><b>'+esc(rm)+'</b></td>'+BELLS.map(function(_,s){
   var u=roomUse(day,s,rm),key=day+'|'+s+'|'+rm;
   if(!u.length)return '<td><button class="rfree" data-act="rbook" data-key="'+esc(key)+'">вільно</button></td>';
   return '<td>'+u.map(function(x){return '<button class="rc '+x.k+'" data-act="rbook" data-key="'+esc(key)+'">'+esc(x.t)+'</button>'}).join('')+'</td>';
  }).join('')+'</tr>';
 }).join('');
 return '<div class="wkbar"><button class="btn" data-act="rday" data-d="-1" aria-label="Попередній день">←</button><b>'+esc(dfull(day))+'</b><button class="btn" data-act="rday" data-d="1" aria-label="Наступний день">→</button><button class="btn" data-act="rday" data-d="0">Сьогодні</button></div>'
 +(conf.length?'<div class="card" style="border-color:var(--bad);margin-bottom:16px"><h2 style="color:var(--bad)">Накладки цього тижня: '+conf.length+'</h2>'+conf.map(function(L){return '<div class="row"><div><b>'+esc(L.room)+'</b> · '+esc(dfull(L.date))+', '+L.time[0]+'<div style="font-size:12.5px;color:var(--muted)">7-А та 7-Б одночасно</div></div><button class="btn sm lime" data-act="open" data-id="'+L.id+'">Змінити аудиторію</button></div>'}).join('')+'</div>':'')
 +'<div class="card scroll"><table class="tbl rt"><thead>'+head+'</thead><tbody>'+body+'</tbody></table></div>'
 +'<p style="color:var(--muted);font-size:13px">Натисніть «вільно», щоб забронювати кабінет для зустрічі. Червоним — накладки, жовтим — ваші бронювання.</p>';
}
function openBook(key){
 var p=key.split('|'),cur=S.book[key];
 popc.dataset.op='bk';popc.dataset.key=key;
 popc.innerHTML=ph(cur?'Бронювання':'Забронювати кабінет',esc(p[2])+' · '+esc(dfull(p[0]))+', '+BELLS[+p[1]][0])
  +lab('Для чого','<input id="bkt" style="'+FIELD+'" value="'+esc(cur||'')+'" placeholder="Зустріч з батьками, педрада…">')
  +'<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn pri" data-act="dobook">Зберегти</button>'+(cur?'<button class="btn" data-act="unbook">Зняти бронь</button>':'')+'<button class="btn" data-act="pclose">Закрити</button></div>';
 showPop();
}

/* ===== v0.2: заміни ===== */
function autoSub(L){var r=rng(hash(L.id+'sub')),ts=teachersList().filter(function(t){return t!==L.subj.t});return {by:ts[Math.floor(r()*ts.length)],reason:S.subr[Math.floor(r()*S.subr.length)]||'Інше'}}
function allSubs(){
 var mon=monday(FOCUS),out=[];
 rangeLessons(addDays(mon,-28),addDays(mon,14)).forEach(function(L){if(L.sub){var s=S.subs[L.id]||autoSub(L);out.push({L:L,by:s.by,reason:s.reason})}});
 return out;
}
function vSubs(){
 var list=allSubs(),cnt={};
 list.forEach(function(x){cnt[x.by]=(cnt[x.by]||0)+1});
 var form='<form class="card frm" id="subf" style="margin-bottom:16px"><h2>Нова заміна</h2><div class="grid g4" style="gap:10px">'
 +'<label>Дата<input type="date" name="d" value="'+FOCUS+'" required></label>'
 +'<label>Урок<select name="s">'+BELLS.map(function(b,i){return opt(i,(i+1)+'-й, '+b[0])}).join('')+'</select></label>'
 +'<label>Хто замінює<select name="by">'+teachersList().map(function(t){return opt(t,t)}).join('')+'</select></label>'
 +'<label>Причина<select name="r">'+S.subr.map(function(t){return opt(t,t)}).join('')+'</select></label></div>'
 +'<div><button class="btn pri" type="submit">Додати заміну</button></div></form>';
 var rows=list.map(function(x){return '<tr><td>'+esc(dlabel(x.L.date))+'</td><td>'+x.L.time[0]+'</td><td>'+esc(x.L.subj.n)+'</td><td>'+esc(x.L.subj.t)+'</td><td>'+esc(x.by)+'</td><td>'+esc(x.reason)+'</td><td>'+(S.subs[x.L.id]?'<button class="btn sm" data-act="delsub" data-id="'+x.L.id+'">Скасувати</button>':'')+'</td></tr>'}).join('');
 return form+'<div class="grid g2"><section class="card"><h2>Заміни за період <small>'+list.length+'</small><button class="btn sm" data-act="export" data-what="subs">CSV</button></h2><div class="scroll"><table class="tbl"><thead><tr><th>Дата</th><th>Час</th><th>Урок</th><th>Кого замінили</th><th>Хто замінив</th><th>Причина</th><th></th></tr></thead><tbody>'+(rows||'<tr><td colspan="7" class="empty">Замін немає</td></tr>')+'</tbody></table></div></section>'
 +'<section class="card" style="align-self:start"><h2>Хто найчастіше замінює</h2>'+(Object.keys(cnt).length?Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]}).map(function(k){return '<div class="row"><span>'+esc(k)+'</span><b>'+cnt[k]+'</b></div>'}).join(''):'<div class="empty">Немає даних</div>')+'</section></div>';
}

/* ===== v0.2: перевірка завдань (вчитель) ===== */
function subm(L,i){
 if(i===ME&&S.up[L.id]&&S.up[L.id].length)return {ok:true,t:'Відповідь, завантажена вами у ролі учня.',files:S.up[L.id]};
 var h=hash(L.id+':hw:'+i)%10;if(h>=7)return {ok:false};
 var n=h%3;return {ok:true,t:ANSW[h%ANSW.length],files:n?['dz_'+(i+1)+'_'+L.date+'.pdf'].concat(n===2?['foto_'+(i+1)+'.jpg']:[]):[]};
}
function chkState(L,i){if(S.chk[L.id+':'+i])return 'done';return subm(L,i).ok?'wait':'none'}
function vCheck(){
 var ls=rangeLessons(addDays(TODAY,-14),TODAY).filter(function(L){return L.code===S.tsubj&&L.hw&&L.past});ls.reverse();
 var f=S.chkf||'wait',cnt={wait:0,done:0,none:0};
 ls.forEach(function(L){STUDENTS.forEach(function(_,i){cnt[chkState(L,i)]++})});
 var names=[['wait','Очікують перевірки'],['done','Перевірено'],['none','Не здали'],['all','Усі']];
 var seg='<div class="filters"><div class="seg" role="group" aria-label="Статус">'+names.map(function(n){return '<button data-act="chkf" data-v="'+n[0]+'" aria-pressed="'+(f===n[0])+'">'+n[1]+(cnt[n[0]]!=null?' · '+cnt[n[0]]:'')+'</button>'}).join('')+'</div></div>';
 var blocks=ls.map(function(L){
  var rows=STUDENTS.map(function(n,i){
   var st=chkState(L,i);if(f!=='all'&&st!==f)return '';
   var sm=subm(L,i),c=S.chk[L.id+':'+i];
   return '<div class="row"><div style="min-width:0"><b>'+esc(n)+'</b>'+(sm.ok?'<div style="font-size:13px;color:var(--muted)">'+esc(sm.t)+'</div><div class="chips" style="margin-top:4px">'+sm.files.map(function(x){return chip('📎 '+x)}).join('')+'</div>':'')+(c?'<div style="font-size:13px;margin-top:4px">'+(c.g!=null?gchip(c.g)+' ':'')+esc(c.c||'')+'</div>':'')+'</div><div style="display:flex;gap:8px;align-items:center">'+chip(st==='done'?'Перевірено':st==='wait'?'Здано':'Не здано',st==='done'?'ok':st==='wait'?'info':'bad')+(sm.ok?'<button class="btn sm'+(st==='wait'?' lime':'')+'" data-act="chkopen" data-id="'+L.id+'" data-s="'+i+'">'+(st==='done'?'Змінити':'Перевірити')+'</button>':'<button class="btn sm" data-act="remind" data-t="'+esc(n)+'">Нагадати</button>')+'</div></div>';
  }).join('');
  if(!rows)return '';
  return '<section class="card" style="margin-bottom:12px"><h2>'+esc(L.subj.n)+' · '+esc(dlabel(L.date))+' <small>здати до '+esc(dlabel(L.due))+'</small></h2><div style="color:var(--muted);margin-bottom:8px">ДЗ: '+esc(L.hw)+'</div>'+rows+'</section>';
 }).join('');
 return seg+(blocks||'<div class="card empty">У цьому фільтрі нічого немає</div>');
}
function openChk(id,sid){
 var L=lesson(id.slice(0,10),+id.slice(11)),sm=subm(L,sid),c=S.chk[id+':'+sid]||{};
 popc.dataset.op='chk';popc.dataset.id=id;popc.dataset.s=sid;
 popc.innerHTML=ph(STUDENTS[sid],esc(L.subj.n)+', ДЗ: '+esc(L.hw))
  +'<div class="box" style="margin-bottom:12px">'+esc(sm.t)+'<div class="chips" style="margin-top:6px">'+sm.files.map(function(x){return chip('📎 '+x)}).join('')+'</div></div>'
  +lab('Оцінка','<select id="ckg" style="'+FIELD+'"><option value="">Без оцінки</option>'+[5,6,7,8,9,10,11,12].map(function(v){return opt(v,v,c.g===v)}).join('')+'</select>')
  +lab('Коментар','<textarea id="ckc" style="'+FIELD+';min-height:64px">'+esc(c.c||'')+'</textarea>')
  +'<div style="display:flex;gap:8px"><button class="btn pri" data-act="chksave">Прийняти</button><button class="btn" data-act="pclose">Закрити</button></div>';
 showPop();
}

/* ===== v0.2: стіна класу й новини ===== */
function vFeed(kind){
 var list=S[kind].slice().sort(function(a,b){return (b.pin?1:0)-(a.pin?1:0)||(a.d<b.d?1:-1)});
 var canPost=kind==='wall'?(S.role==='teacher'||S.role==='admin'):S.role==='admin';
 var comp=canPost?'<form class="card frm" id="postf" data-kind="'+kind+'" style="margin-bottom:16px"><label>'+(kind==='wall'?'Нова публікація для 7-А':'Нова новина школи')+'<textarea name="t" required placeholder="Що нового?"></textarea></label><div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><button class="btn pri" type="submit">Опублікувати</button>'+(kind==='news'?'<label style="display:flex;gap:6px;align-items:center;text-transform:none;letter-spacing:0;font-weight:500"><input type="checkbox" name="pin" style="width:auto"> Закріпити</label>':'')+'</div></form>':'';
 var posts=list.map(function(p){
  var own=S.role==='admin'||(p.a.indexOf('(ви)')>0);
  return '<article class="card" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px"><b>'+esc(p.a)+'</b><span style="color:var(--muted2);font-size:13px">'+(p.pin?chip('Закріплено','warn')+' ':'')+esc(dlabel(p.d))+'</span></div><div>'+esc(p.t)+'</div><div style="display:flex;gap:8px;margin-top:10px"><button class="btn sm'+(p.liked?' lime':'')+'" data-act="like" data-kind="'+kind+'" data-id="'+p.id+'">♥ '+p.likes+'</button>'+(own?'<button class="btn sm" data-act="delpost" data-kind="'+kind+'" data-id="'+p.id+'">Видалити</button>':'')+'</div></article>';
 }).join('');
 return comp+(posts||'<div class="card empty">Поки порожньо</div>')+(kind==='wall'?'<p style="color:var(--muted);font-size:13px">Стіна класу — публікації вчителя для класу. Раз на тиждень можна давати короткий підсумок: що було, що попереду.</p>':'');
}
function vWall(){return vFeed('wall')}
function vNews(){return vFeed('news')}

/* ===== v0.2: календар і зустрічі ===== */
var CMETA=['Олена С.','Ірина М.','Дарина Л.'],CSLOTS=['15:00','15:20','15:40','16:00'];
function vCal(){
 var m=S.cmonth||TODAY.slice(0,7),y=+m.slice(0,4),mo=+m.slice(5,7)-1;
 var first=new Date(y,mo,1),offs=(first.getDay()+6)%7,dim=new Date(y,mo+1,0).getDate(),cells='';
 for(var i=0;i<offs;i++)cells+='<div class="d"></div>';
 for(var d=1;d<=dim;d++){
  var ds=y+'-'+p2(mo+1)+'-'+p2(d),n=S.evs.filter(function(e){return e.d===ds}).length;
  cells+='<button'+(n?' class="p"':'')+' style="'+(ds===S.cday?'outline:2px solid var(--ink);':'')+(ds===TODAY?'box-shadow:inset 0 0 0 2px var(--lime)':'')+'" data-act="cday" data-d="'+ds+'" aria-label="'+esc(dlabel(ds)+(n?': подій '+n:''))+'">'+d+'</button>';
 }
 var sel=S.cday||'';
 var evs=S.evs.filter(function(e){return sel?e.d===sel:e.d>=TODAY}).sort(function(a,b){return (a.d+a.tm)<(b.d+b.tm)?-1:1});
 var canAdd=S.role==='admin'||S.role==='teacher';
 var evList=evs.map(function(e){return '<div class="row"><div><b>'+esc(e.t)+'</b><div style="font-size:12.5px;color:var(--muted)">'+esc(dfull(e.d))+', '+esc(e.tm)+'</div></div><div style="display:flex;gap:6px;align-items:center">'+chip(e.k,EVK[e.k]||'')+(canAdd?'<button class="btn sm" data-act="delev" data-id="'+e.id+'">×</button>':'')+'</div></div>'}).join('')||'<div class="empty">Подій немає</div>';
 var add=canAdd?'<form class="card frm" id="evf" style="margin-top:16px"><h2>Нова подія</h2><label>Назва<input name="t" required></label><div class="grid g3" style="gap:10px"><label>Дата<input type="date" name="d" value="'+(sel||TODAY)+'" required></label><label>Час<input type="time" name="tm" value="10:00"></label><label>Тип<select name="k"><option>збори</option><option>іспит</option><option>зустріч</option><option>свято</option></select></label></div><div><button class="btn pri" type="submit">Додати</button></div></form>':'';
 var md=nextDow(4);
 var meet='<section class="card" style="margin-top:16px"><h2>Зустрічі з вчителями <small>'+esc(dfull(md))+'</small></h2>'+CMETA.map(function(t){
  return '<div class="row"><b style="min-width:100px">'+esc(t)+'</b><div class="chips">'+CSLOTS.map(function(tm){
   var key=md+'|'+t+'|'+tm,v=S.meet[key],busy=!v&&hash(key)%4===0;
   if(busy)return '<button class="btn sm" disabled>'+tm+' · зайнято</button>';
   if(v)return '<button class="btn sm lime" data-act="meet" data-key="'+esc(key)+'">'+tm+' · '+(v==='me'?'ви':esc(v))+'</button>';
   return '<button class="btn sm" data-act="meet" data-key="'+esc(key)+'"'+(S.role==='parent'?'':' disabled')+'>'+tm+' · вільно</button>';
  }).join('')+'</div></div>';
 }).join('')+(S.role==='parent'?'<p style="font-size:12.5px;color:var(--muted);margin:8px 0 0">Оберіть вільний слот, щоб записатися. Натисніть ще раз, щоб скасувати.</p>':'<p style="font-size:12.5px;color:var(--muted);margin:8px 0 0">Записуються батьки. Тут видно зайняті слоти.</p>')+'</section>';
 return '<div class="filters"><button class="btn" data-act="cmonth" data-d="-1" aria-label="Попередній місяць">←</button><b style="min-width:150px;text-align:center">'+MONTHS_N[mo]+' '+y+'</b><button class="btn" data-act="cmonth" data-d="1" aria-label="Наступний місяць">→</button>'+(sel?'<button class="btn" data-act="cday" data-d="">Усі найближчі</button>':'')+'</div>'
 +'<div class="grid g2"><section class="card"><div class="cal">'+DAYS.concat(['Сб','Нд']).map(function(x){return '<div class="h">'+x+'</div>'}).join('')+cells+'</div></section><section class="card"><h2>'+(sel?esc(dlabel(sel)):'Найближчі події')+'</h2>'+evList+'</section></div>'+add+meet;
}

/* ===== v0.2: налаштування ===== */
function vSettings(){
 var t=S.sset||'marks';
 var seg='<div class="filters"><div class="seg" role="group" aria-label="Розділ">'+[['marks','Типи оцінок'],['perm','Права користувачів'],['dict','Довідники']].map(function(x){return '<button data-act="sset" data-v="'+x[0]+'" aria-pressed="'+(t===x[0])+'">'+x[1]+'</button>'}).join('')+'</div></div>';
 var body='';
 if(t==='marks'){
  body='<section class="card"><h2>Типи оцінок для журналу</h2><div class="scroll"><table class="tbl"><thead><tr><th>Колір</th><th>Назва</th><th>Вага</th><th>Шкала</th><th>Днів на редагування</th><th></th></tr></thead><tbody>'+S.mt.map(function(m,i){
   return '<tr><td><input type="color" value="'+esc(m.c)+'" data-f="mtc" data-i="'+i+'" aria-label="Колір"></td><td><input class="inp" value="'+esc(m.n)+'" data-f="mtn" data-i="'+i+'" aria-label="Назва"></td><td><input class="inp" type="number" min="1" max="10" value="'+m.w+'" data-f="mtw" data-i="'+i+'" style="width:70px" aria-label="Вага"></td><td>12-бальна</td><td><input class="inp" type="number" min="0" max="365" value="'+m.d+'" data-f="mtd" data-i="'+i+'" style="width:80px" aria-label="Днів"> <small style="color:var(--muted2)">0 = без обмежень</small></td><td><button class="btn sm" data-act="mtdel" data-i="'+i+'">×</button></td></tr>';
  }).join('')+'</tbody></table></div><div style="margin-top:12px"><button class="btn pri" data-act="mtadd">Додати тип оцінки</button></div></section>';
 } else if(t==='perm'){
  body='<section class="card"><h2>Групи прав: що кому дозволено</h2><div class="scroll"><table class="tbl"><thead><tr><th>Модуль</th>'+GRPS.map(function(g){return '<th>'+g+'</th>'}).join('')+'</tr></thead><tbody>'+MODS.map(function(m){
   return '<tr><td><b>'+esc(m)+'</b></td>'+GRPS.map(function(g){var v=permOf(m,g);return '<td><select class="inp" data-f="perm" data-k="'+esc(m+':'+g)+'" aria-label="'+esc(m+', '+g)+'">'+LEVN.map(function(n,i){return opt(i,n,v===i)}).join('')+'</select></td>'}).join('')+'</tr>';
  }).join('')+'<tr><td><b>Область видимості</b></td>'+GRPS.map(function(g){var v=S.perm['scope:'+g]!==undefined?+S.perm['scope:'+g]:(g==='Адмін'||g==='Завучі'?2:(g==='Вчителі'?1:0));return '<td><select class="inp" data-f="perm" data-k="scope:'+g+'" aria-label="Область, '+g+'">'+SCOPES.map(function(n,i){return opt(i,n,v===i)}).join('')+'</select></td>'}).join('')+'</tr></tbody></table></div><p style="color:var(--muted);font-size:13px;margin:10px 0 0">Зміни зберігаються в демо одразу. У робочій версії групи прив’язуються до справжніх акаунтів.</p></section>';
 } else {
  function dict(title,key,field){return '<section class="card"><h2>'+title+'</h2>'+S[field].map(function(x,i){return '<div class="row"><span>'+esc(x)+'</span><button class="btn sm" data-act="dictdel" data-k="'+field+'" data-i="'+i+'">×</button></div>'}).join('')+'<form class="compose dictf" data-k="'+field+'" style="padding:10px 0 0;border:0"><input class="inp" name="v" placeholder="Нова причина" required><button class="btn pri" type="submit">Додати</button></form></section>'}
  body='<div class="grid g2">'+dict('Причини відсутності учнів','absr','absr')+dict('Причини замін вчителів','subr','subr')+'</div>';
 }
 return seg+body;
}

/* ===== v0.2: статистика (завуч / директор) ===== */
function statRows(){
 var from=addDays(TODAY,-30),all=rangeLessons(from,TODAY),out=[];
 Object.keys(SUBJ).forEach(function(k){
  if(k==='pe')return;
  var ls=all.filter(function(L){return L.code===k&&L.past}),filled=ls.filter(function(L){return L.filled}).length,gs=[],subs=ls.filter(function(L){return L.sub}).length;
  ls.forEach(function(L){STUDENTS.forEach(function(_,i){var g=grade(L,i);if(g!=null)gs.push(g)})});
  out.push({t:SUBJ[k].t,n:SUBJ[k].n,total:ls.length,filled:filled,avg:avg(gs),subs:subs});
 });
 return out;
}
function actRows(){
 var o=[];
 teachersList().forEach(function(t,i){var h=hash('a'+t);o.push(['Вчитель',t,'Так',h%3?'є':'—',h%5?'є':'—',addDays(TODAY,-(h%4))])});
 STUDENTS.slice(0,8).forEach(function(n,i){var h=hash('p'+n);o.push(['Батьки','Родина '+n,h%7?'Так':'Ні','є',h%3?'—':'є',addDays(TODAY,-(h%9))])});
 STUDENTS.slice(0,6).forEach(function(n){var h=hash('s'+n);o.push(['Учень',n,'Так','є','—',addDays(TODAY,-(h%5))])});
 return o;
}
function vStats(){
 var rows=statRows();
 return '<section class="card" style="margin-bottom:16px"><h2>Вчителі за 30 днів <small><button class="btn sm" data-act="export" data-what="stats">CSV</button></small></h2><div class="scroll"><table class="tbl"><thead><tr><th>Вчитель</th><th>Предмет</th><th>Уроків заповнено</th><th>Середній бал</th><th>Заміни</th></tr></thead><tbody>'+rows.map(function(r){var pc=r.total?Math.round(r.filled/r.total*100):100;return '<tr><td>'+esc(r.t)+'</td><td>'+esc(r.n)+'</td><td>'+r.filled+' / '+r.total+' '+chip(pc+'%',pc>=90?'ok':pc>=70?'warn':'bad')+'</td><td>'+fmt(r.avg)+'</td><td>'+r.subs+'</td></tr>'}).join('')+'</tbody></table></div></section>'
 +'<section class="card"><h2>Активність користувачів <small><button class="btn sm" data-act="export" data-what="act">CSV</button></small></h2><div class="scroll"><table class="tbl"><thead><tr><th>Група</th><th>Імʼя</th><th>Доступ</th><th>Мобільний</th><th>Веб</th><th>Останній вхід</th></tr></thead><tbody>'+actRows().map(function(r){return '<tr><td>'+r[0]+'</td><td>'+esc(r[1])+'</td><td>'+chip(r[2],r[2]==='Так'?'ok':'')+'</td><td>'+r[3]+'</td><td>'+r[4]+'</td><td>'+esc(dlabel(r[5]))+'</td></tr>'}).join('')+'</tbody></table></div></section>';
}

/* ===== v0.2: план курсу (вчитель) ===== */
function vCourse(){
 var code=S.tsubj,tops=TOPICS[code];
 var held=rangeLessons('2026-09-01',TODAY).filter(function(L){return L.code===code&&L.past}).length;
 var left=rangeLessons(addDays(TODAY,1),'2026-12-26').filter(function(L){return L.code===code}).length;
 var pc=Math.round(held/Math.max(1,held+left)*100);
 var done=Math.min(tops.length,Math.floor(held/5));
 return '<div class="grid g3" style="margin-bottom:16px"><div class="card stat"><span>Проведено уроків</span><b>'+held+'</b></div><div class="card stat"><span>Лишилось до кінця семестру</span><b>'+left+'</b></div><div class="card stat"><span>Проходження курсу</span><b>'+pc+'%</b></div></div>'
 +'<section class="card"><h2>План курсу · '+esc(SUBJ[code].n)+'</h2>'+tops.map(function(t,i){return '<div class="row"><span><b style="color:var(--lt)">'+(i+1)+'.</b> '+esc(t)+'</span>'+(i<done?chip('Пройдено','ok'):i===done?'<button class="btn sm lime" data-act="plantopic" data-i="'+i+'">Поставити в наступний урок</button>':chip('Попереду'))+'</div>'}).join('')+'</section>';
}

/* ===== v0.2: дії ===== */
function act2(a,d,t){
 if(a==='edit'){S.edit=!S.edit;S.sel='';render(true);return true}
 if(a==='copywk'){copyWeek();render(true);return true}
 if(a==='slot'){
  if(!S.sel){if(lesson(d.id.slice(0,10),+d.id.slice(11))){S.sel=d.id;render(true)}else openAdd(d.id)}
  else if(S.sel===d.id){S.sel='';render(true)}
  else openMove(S.sel,d.id);
  return true;
 }
 if(a==='scope'){applyScope(d.sc);return true}
 if(a==='dellesson'){openDel(d.id);return true}
 if(a==='rday'){var cur=S.rday&&schoolDay(S.rday)?S.rday:FOCUS;if(d.d==='0')S.rday=FOCUS;else{var n=cur,step=+d.d;do{n=addDays(n,step)}while(!schoolDay(n));S.rday=n}render(true);return true}
 if(a==='rbook'){openBook(d.key);return true}
 if(a==='dobook'){var v=document.getElementById('bkt').value.trim();if(v)S.book[popc.dataset.key]=v;closePop();render(true);toast('Бронювання збережено');return true}
 if(a==='unbook'){delete S.book[popc.dataset.key];closePop();render(true);toast('Бронь знято');return true}
 if(a==='delsub'){delete S.subs[d.id];render(true);return true}
 if(a==='chkf'){S.chkf=d.v;render(true);return true}
 if(a==='chkopen'){openChk(d.id,+d.s);return true}
 if(a==='chksave'){
  var id=popc.dataset.id,sid=popc.dataset.s,gv=document.getElementById('ckg').value;
  S.chk[id+':'+sid]={g:gv===''?null:+gv,c:document.getElementById('ckc').value.trim()};
  if(gv!==''){var o=ovFor(id);o.gr=o.gr||{};o.gr[sid]=+gv}
  closePop();render(true);toast('Роботу прийнято');return true;
 }
 if(a==='like'){var p=S[d.kind].filter(function(x){return x.id===d.id})[0];if(p){p.liked=!p.liked;p.likes+=p.liked?1:-1;render(true)}return true}
 if(a==='delpost'){S[d.kind]=S[d.kind].filter(function(x){return x.id!==d.id});render(true);return true}
 if(a==='cmonth'){var m=S.cmonth||TODAY.slice(0,7),dt=new Date(+m.slice(0,4),+m.slice(5,7)-1+ +d.d,1);S.cmonth=dt.getFullYear()+'-'+p2(dt.getMonth()+1);render(true);return true}
 if(a==='cday'){S.cday=d.d;render(true);return true}
 if(a==='delev'){S.evs=S.evs.filter(function(x){return x.id!==d.id});render(true);return true}
 if(a==='meet'){if(S.role!=='parent')return true;if(S.meet[d.key]==='me')delete S.meet[d.key];else S.meet[d.key]='me';render(true);toast(S.meet[d.key]?'Ви записані на зустріч':'Запис скасовано');return true}
 if(a==='sset'){S.sset=d.v;render(true);return true}
 if(a==='mtadd'){S.mt.push({id:'m'+Date.now(),n:'Новий тип',c:'#7cb7ff',w:1,d:0});render(true);return true}
 if(a==='mtdel'){if(S.mt.length>1){S.mt.splice(+d.i,1);render(true)}else toast('Потрібен хоча б один тип');return true}
 if(a==='dictdel'){S[d.k].splice(+d.i,1);render(true);return true}
 if(a==='plan'){var f=document.getElementById('lf');if(f){var L=lesson(f.dataset.id.slice(0,10),+f.dataset.id.slice(11)),tp=TOPICS[L.code],nm=Math.min(tp.length-1,Math.floor(rangeLessons('2026-09-01',L.date).filter(function(x){return x.code===L.code}).length/5));f.topic.value=tp[nm];toast('Тему підставлено з плану курсу')}return true}
 if(a==='plantopic'){
  var nl=rangeLessons(addDays(TODAY,0),addDays(TODAY,30)).filter(function(L){return L.code===S.tsubj&&!L.past})[0];
  if(nl){var o2=ovFor(nl.id);o2.topic=TOPICS[S.tsubj][+d.i];o2.by=SUBJ[S.tsubj].t+' (ви)';o2.at=TODAY;save();toast('Тему поставлено на '+dlabel(nl.date))}
  return true;
 }
 if(a==='print'){window.print();return true}
 return false;
}
function actChange(t){
 var f=t.dataset.f;if(!f)return false;
 if(f==='mtn'||f==='mtw'||f==='mtd'||f==='mtc'){var m=S.mt[+t.dataset.i];if(!m)return true;if(f==='mtn')m.n=t.value;else if(f==='mtc')m.c=t.value;else if(f==='mtw')m.w=+t.value||1;else m.d=+t.value||0;save();return true}
 if(f==='perm'){S.perm[t.dataset.k]=+t.value;save();toast('Права оновлено');return true}
 if(f==='up'){var names=Array.prototype.slice.call(t.files).map(function(x){return x.name});if(names.length){S.up[t.dataset.id]=(S.up[t.dataset.id]||[]).concat(names);save();render(true);openLesson(t.dataset.id);toast('Відповідь завантажено')}return true}
 return false;
}
function actSubmit(e){
 var f=e.target;
 if(f.id==='subf'){e.preventDefault();var id=f.d.value+'-'+f.s.value,L=lesson(f.d.value,+f.s.value);if(!L){toast('У цей слот уроку немає');return true}S.subs[id]={by:f.by.value,reason:f.r.value};save();render(true);toast('Заміну додано');return true}
 if(f.id==='postf'){e.preventDefault();var k=f.dataset.kind,txt=f.t.value.trim();if(!txt)return true;S[k].unshift({id:'p'+Date.now(),a:S.role==='admin'?'Адміністрація':SUBJ[S.tsubj].t+' (ви)',d:TODAY,t:txt,likes:0,pin:!!(f.pin&&f.pin.checked)});render(true);toast('Опубліковано');return true}
 if(f.id==='evf'){e.preventDefault();S.evs.push({id:'e'+Date.now(),t:f.t.value.trim(),d:f.d.value,tm:f.tm.value,k:f.k.value});render(true);toast('Подію додано');return true}
 if(f.classList.contains('dictf')){e.preventDefault();var v=f.v.value.trim();if(v){S[f.dataset.k].push(v);render(true)}return true}
 return false;
}
document.addEventListener('dragstart',function(e){var t=e.target.closest&&e.target.closest('[draggable][data-act=slot]');if(t&&S.edit){S.sel=t.dataset.id;try{e.dataTransfer.setData('text/plain',t.dataset.id);e.dataTransfer.effectAllowed='move'}catch(x){}}});
document.addEventListener('dragover',function(e){var t=e.target.closest&&e.target.closest('[data-act=slot]');if(t&&S.edit)e.preventDefault()});
document.addEventListener('drop',function(e){var t=e.target.closest&&e.target.closest('[data-act=slot]');if(!t||!S.edit)return;e.preventDefault();var src='';try{src=e.dataTransfer.getData('text/plain')}catch(x){}src=src||S.sel;if(src&&src!==t.dataset.id)openMove(src,t.dataset.id)});

/* ===== події ===== */
document.addEventListener('click',function(e){
 var t=e.target.closest('[data-act]');
 if(!t){if(e.target===ovEl)closeSheet();if(e.target===pop)closePop();return}
 var a=t.dataset.act,d=t.dataset;
 if(act2(a,d,t))return;
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
 else if(a==='reset'){if(confirm('Скинути всі зміни, зроблені в демо?')){['lay','one','book','subs','chk','meet','up','perm','mt','absr','subr','wall','news','evs','ov','done','pe','msgs','edit','sel'].forEach(function(k){delete S[k]});seedState();save();render();toast('Демо скинуто')}}
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
 o.topic=f.topic.value.trim();o.hw=f.hw.value.trim();o.due=f.due.value;o.note=f.note.value.trim();o.mt=f.mt.value;o.priv=f.priv.value.trim();
 if(f.files.files.length)o.files=(o.files||[]).concat(Array.prototype.slice.call(f.files.files).map(function(x){return {n:x.name,s:x.size}}));
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
 if(actChange(t))return;
 if(t.dataset.sel==='tsubj'){S.tsubj=t.value;S.jsubj=t.value;render(true)}
 else if(t.dataset.sel==='jsubj'){S.jsubj=t.value;render(true)}
 else if(t.dataset.f==='att'){var m=sheet.querySelector('input[data-f=min][data-s="'+t.dataset.s+'"]');if(m)m.hidden=t.value!=='l'}
});
document.addEventListener('input',function(e){
 if(e.target.id==='cq'){S.cq=e.target.value;var cl=document.querySelector('.contacts');if(cl){var cs2=contacts(),qq=S.cq.toLowerCase();var keep=cl.querySelector('#cq');cs2=cs2.filter(function(c){return (c.n+' '+c.s).toLowerCase().indexOf(qq)>=0});cl.querySelectorAll('button').forEach(function(b){b.remove()});cs2.forEach(function(c){var b=document.createElement('button');b.setAttribute('role','listitem');b.dataset.act='contact';b.dataset.id=c.id;b.setAttribute('aria-pressed',String(c.id===S.chat));b.innerHTML='<b>'+esc(c.n)+'</b><small>'+esc(c.s)+'</small>';cl.appendChild(b)})}save();return}
 if(e.target.id==='q'){S.q=e.target.value;document.getElementById('tasklist').innerHTML=taskHtml();save()}
});
document.addEventListener('submit',function(e){
 if(actSubmit(e))return;
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
