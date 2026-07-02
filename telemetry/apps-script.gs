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
    const today = new Date().toDateString(), bySid = {};
    for(const r of rows){
      const isToday = r[0] && new Date(r[0]).toDateString() === today;
      if(isToday){ res.pings++; if(r[4]>res.best) res.best=r[4]|0; }
      if(r[1] === 'over' && (r[4]|0) > 0){
        const sid = String(r[3]), sc = r[4]|0, nm = String(r[12]||'').slice(0,10) || 'dino';
        if(!bySid[sid] || sc > bySid[sid].sc) bySid[sid] = { n:nm, sc:sc };
      }
    }
    const todaySids = new Set(rows.filter(r=>r[0] && new Date(r[0]).toDateString()===today).map(r=>String(r[3])));
    res.players = todaySids.size;
    res.top = Object.values(bySid).sort((a,b)=>b.sc-a.sc).slice(0,10);
    res.wbest = res.top[0] || null;
  }
  cache.put('agg', JSON.stringify(res), 300);
  return json_(res);
}

function out_(s){ return ContentService.createTextOutput(s); }
function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
