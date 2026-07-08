/** Strawberry Dash telemetry v2 — Google Apps Script backend (the "db" is your Sheet).
 *
 * UPDATING AN EXISTING DEPLOYMENT (keeps the same /exec URL):
 *   Extensions → Apps Script → replace code with this file → Save →
 *   Deploy → Manage deployments → ✏️ edit → Version: "New version" → Deploy.
 *
 * Fresh setup: Deploy → New deployment → Web app · Execute as Me · access Anyone.
 * Keep the Sheet itself PRIVATE. Worst case (accepted): junk rows.
 */
const TAB = 'pings';
const HEADERS = ['ts','ev','v','sid','sc','hi','runs','lvl','ua','lang','tz','scr',
                 'name','cause','dur','rb','tier','bk','cmb','skin','hat','wl','stk','item','price'];

function sheet_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TAB);
  if(!sh){ sh = ss.insertSheet(TAB); sh.appendRow(HEADERS); }
  if(String(sh.getRange(1,13).getValue()) === ''){                    // extend v1 header in place
    sh.getRange(1,13,1,HEADERS.length-12).setValues([HEADERS.slice(12)]); }
  return sh;
}
const S=(x,n)=>String(x==null?'':x).slice(0,n), N=x=>x|0;

function doPost(e){
  try{
    const d = JSON.parse((e.postData && e.postData.contents) || '{}');
    if(!d || (d.v|0) < 43) return out_('skip');                       // drop garbage / ancient builds
    sheet_().appendRow([ new Date(),
      S(d.ev,12), N(d.v), S(d.sid,16), N(d.sc), N(d.hi), N(d.runs), N(d.lvl),
      S(d.ua,200), S(d.lang,16), S(d.tz,48), S(d.scr,16),
      S(d.name,12).replace(/[^\w \-\.]/g,''), S(d.cause,40), N(d.dur),
      N(d.rb), N(d.tier), N(d.bk), N(d.cmb), S(d.skin,12), S(d.hat,12),
      N(d.wl), N(d.stk), S(d.item,14), N(d.price) ]);
  }catch(err){ /* never fail the beacon */ }
  return out_('ok');
}

/** GET → today's stats + all-time world top-10 (cached 5 min). */
function doGet(){
  const cache = CacheService.getScriptCache(), hit = cache.get('agg');
  if(hit) return json_(JSON.parse(hit));
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
  const res = { date:new Date().toDateString(), pings:0, players:0, best:0, wbest:null, top:[] };
  if(sh && sh.getLastRow() > 1){
    const rows = sh.getRange(2,1,sh.getLastRow()-1,14).getValues();   // ts..cause
    const today = new Date().toDateString(), bySid = {}, todaySids = new Set();
    for(const r of rows){                                              // single pass — one Date per row
      if(r[0] && new Date(r[0]).toDateString() === today){
        res.pings++; todaySids.add(String(r[3]));
        if((r[1]==='over'||r[1]==='exit') && (r[4]|0) > res.best && (r[4]|0) <= 30000) res.best = r[4]|0;
      }
      // board candidate = best of run score (over/exit rows) and the device's self-reported all-time hi
      // (hi rides in EVERY ping, so runs lost to throttling/app-kill are still recovered here)
      const runSc = (r[1]==='over'||r[1]==='exit') ? (r[4]|0) : 0;
      const hiSc  = r[5]|0;
      const cand  = Math.max(runSc<=30000?runSc:0, hiSc<=30000?hiSc:0);   // sanity caps keep junk off the board
      if(cand > 0){
        const nm = String(r[12]||'').slice(0,10) || 'dino';
        // named players merge by name (alex+Alex = one kid, any device); ALL anonymous runs share one "dino" line
        const key = nm.toLowerCase() !== 'dino' ? 'n:' + nm.toLowerCase() : 'anon';
        if(!bySid[key] || cand > bySid[key].sc) bySid[key] = { n:nm, sc:cand };
      }
    }
    res.players = todaySids.size;
    res.top = Object.values(bySid).sort((a,b)=>b.sc-a.sc).slice(0,10);
    res.wbest = res.top[0] || null;
  }
  cache.put('agg', JSON.stringify(res), 300);
  return json_(res);
}

function out_(s){ return ContentService.createTextOutput(s); }
function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* ═══════════════ ADMIN (run these once from the editor, no redeploy needed) ═══════════════ */

/** Creates/refreshes a 'dash' tab of live formulas — your analytics dashboard. */
function buildDashboard(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let d = ss.getSheetByName('dash'); if(d) ss.deleteSheet(d);
  d = ss.insertSheet('dash', 0);
  d.getRange(1,1).setValue('📅 Players & runs per day').setFontWeight('bold');
  d.getRange(2,1).setFormula('=QUERY(pings!A:E,"select toDate(A), count(E), max(E) where B=\'over\' group by toDate(A) order by toDate(A) desc limit 14 label toDate(A) \'day\', count(E) \'runs\', max(E) \'best\'",0)');
  d.getRange(1,5).setValue('💀 Deadliest enemies').setFontWeight('bold');
  d.getRange(2,5).setFormula('=QUERY(pings!B:N,"select N, count(N) where B=\'over\' and N<>\'\' group by N order by count(N) desc limit 10 label N \'cause\', count(N) \'deaths\'",0)');
  d.getRange(1,8).setValue('🎽 Most-worn skins').setFontWeight('bold');
  d.getRange(2,8).setFormula('=QUERY(pings!B:T,"select T, count(T) where B=\'over\' and T<>\'\' group by T order by count(T) desc label T \'skin\', count(T) \'runs\'",0)');
  d.getRange(1,11).setValue('🛍 Best sellers').setFontWeight('bold');
  d.getRange(2,11).setFormula('=QUERY(pings!B:Y,"select X, count(X), sum(Y) where B=\'buy\' group by X order by count(X) desc label X \'item\', count(X) \'buys\', sum(Y) \'berries\'",0)');
  d.getRange(1,14).setValue('🌍 World top-10').setFontWeight('bold');
  d.getRange(2,14).setFormula('=QUERY(pings!B:M,"select M, max(F) where F>0 and F<=30000 and M<>\'\' group by M order by max(F) desc limit 10 label M \'name\', max(F) \'score\'",0)');
  d.setFrozenRows(2);
}

/** Emails you a daily summary at ~09:00. Run setupDigest() ONCE to install the trigger. */
function setupDigest(){
  ScriptApp.getProjectTriggers().forEach(t=>{ if(t.getHandlerFunction()==='dailyDigest') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('dailyDigest').timeBased().everyDays(1).atHour(9).create();
}
function dailyDigest(){
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
  if(!sh || sh.getLastRow()<2) return;
  const rows = sh.getRange(2,1,sh.getLastRow()-1,14).getValues();
  const y = new Date(Date.now()-86400000).toDateString();
  const t = rows.filter(r=>r[0] && new Date(r[0]).toDateString()===y);
  if(!t.length) return;                                                 // quiet day, no mail
  const overs = t.filter(r=>r[1]==='over');
  const best = overs.reduce((m,r)=>Math.max(m,r[4]|0),0);
  const bestBy = (overs.find(r=>(r[4]|0)===best)||[])[12]||'?';
  const causes = {}; overs.forEach(r=>{ if(r[13]) causes[r[13]]=(causes[r[13]]||0)+1; });
  const topCause = Object.entries(causes).sort((a,b)=>b[1]-a[1])[0];
  MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
    '🦕 Dash daily: '+new Set(t.map(r=>String(r[3]))).size+' players, best '+best,
    'Strawberry Dash — '+y+'\n'+
    'players: '+new Set(t.map(r=>String(r[3]))).size+'\n'+
    'runs: '+overs.length+'\npings: '+t.length+'\n'+
    'best: '+best+' by '+bestBy+'\n'+
    (topCause? 'deadliest: '+topCause[0]+' ('+topCause[1]+'×)\n':'')+
    'shares: '+t.filter(r=>r[1]==='share').length+' · buys: '+t.filter(r=>r[1]==='buy').length);
}
