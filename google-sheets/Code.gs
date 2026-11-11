/**
 * go2ways contact form → Google Sheet (+ email alert)
 *
 * Paste this whole file into Extensions → Apps Script of your Google Sheet.
 * Setup steps are in FREE-HOSTING-GUIDE.md. In short:
 *   1. Project Settings → Script properties → add SHARED_SECRET (any long random text,
 *      the same value you give Cloudflare) and, optionally, NOTIFY_TO (email for alerts).
 *   2. Run the "setup" function once and allow the permissions it asks for.
 *   3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 *      Copy the Web app URL into Cloudflare as SHEETS_WEBHOOK_URL.
 */

const SHEET_NAME = 'Messages';
const HEADERS = ['Received', 'Name', 'Email', 'Company', 'Phone', 'Topic', 'Message'];

/** Run once from the editor: creates the "Messages" tab and asks for permissions. */
function setup() {
  const sheet = getSheet_();
  const to = notifyTo_();
  Logger.log('Ready. Messages go to the "' + sheet.getName() + '" tab; alerts go to ' + to + '.');
  if (!PropertiesService.getScriptProperties().getProperty('SHARED_SECRET')) {
    Logger.log('Warning: add a SHARED_SECRET script property before deploying.');
  }
}

/** Called by the website (through Cloudflare) for every contact form message. */
function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('SHARED_SECRET');
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!secret || body.secret !== secret) return reply_({ ok: false, error: 'unauthorised' });

    const m = body.message || {};
    const clean = (v, max) => safeCell_(String(v == null ? '' : v).slice(0, max));
    const row = [
      new Date(),
      clean(m.name, 120), clean(m.email, 200), clean(m.company, 160),
      clean(m.phone, 40), clean(m.topic, 60), clean(m.message, 4000),
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try { getSheet_().appendRow(row); } finally { lock.releaseLock(); }

    try {
      MailApp.sendEmail({
        to: notifyTo_(),
        replyTo: String(m.email || ''),
        subject: 'New website enquiry from ' + (m.name || 'someone') + (m.company ? ' (' + m.company + ')' : ''),
        body: [
          'Name: ' + (m.name || '-'),
          'Email: ' + (m.email || '-'),
          'Company: ' + (m.company || '-'),
          'Phone: ' + (m.phone || '-'),
          m.topic ? 'Topic: ' + m.topic : null,
          '',
          String(m.message || ''),
          '',
          'All messages: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
        ].filter(function (l) { return l !== null; }).join('\n'),
      });
    } catch (mailErr) {
      console.error('Email alert failed (message is still saved): ' + mailErr);
    }

    return reply_({ ok: true });
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, error: 'server error' });
  }
}

/** A quick check you can open in the browser: the web app URL should say it's running. */
function doGet() {
  return reply_({ ok: true, service: 'go2ways contact form' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setColumnWidth(7, 420);
  }
  return sheet;
}

function notifyTo_() {
  return PropertiesService.getScriptProperties().getProperty('NOTIFY_TO') || Session.getEffectiveUser().getEmail();
}

// Text that starts like a formula (=, +, -, @) would run as one in the sheet; store it as plain text.
function safeCell_(s) {
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
