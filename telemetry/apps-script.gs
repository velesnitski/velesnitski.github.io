/** Strawberry Dash telemetry — Google Apps Script backend (the "db" is your Sheet).
 *
 * Setup (once, ~60s):
 *   1. Open the Sheet → Extensions → Apps Script → paste this file, save.
 *   2. Deploy → New deployment → type: Web app
 *        Execute as: Me · Who has access: Anyone
 *   3. Copy the .../exec URL → set TELEMETRY_EP in dino/index.html.
 *   4. Keep the Sheet itself PRIVATE — the web app runs as you; the game
 *      never touches the Sheet directly, only this endpoint.
 *
 * Worst case (accepted): someone spams junk rows into the 'pings' tab.
 */
const TAB = 'pings';

function doPost(e){
  try{
    const d = JSON.parse((e.postData && e.postData.contents) || '{}');
    if(!d || (d.v|0) < 43) return out_('skip');            // drop garbage / ancient builds
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(TAB);
    if(!sh){ sh = ss.insertSheet(TAB);
      sh.appendRow(['ts','ev','v','sid','sc','hi','runs','lvl','ua','lang','tz','scr']); }
    sh.appendRow([ new Date(),
      String(d.ev||'').slice(0,12),  d.v|0,  String(d.sid||'').slice(0,16),
      d.sc|0, d.hi|0, d.runs|0, d.lvl|0,
      String(d.ua||'').slice(0,200), String(d.lang||'').slice(0,16),
      String(d.tz||'').slice(0,48),  String(d.scr||'').slice(0,16) ]);
  }catch(err){ /* never fail the beacon */ }
  return out_('ok');
}

/** GET = today's aggregates as JSON — lets the game show "players today" later. */
function doGet(){
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
  if(!sh || sh.getLastRow() < 2) return json_({date:new Date().toDateString(), pings:0, players:0, best:0});
  const rows = sh.getRange(2,1,sh.getLastRow()-1,5).getValues();
  const today = new Date().toDateString();
  const t = rows.filter(r => r[0] && new Date(r[0]).toDateString() === today);
  return json_({ date: today, pings: t.length,
    players: [...new Set(t.map(r => r[3]))].length,
    best: t.reduce((m,r) => Math.max(m, r[4]|0), 0) });
}

function out_(s){ return ContentService.createTextOutput(s); }
function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
