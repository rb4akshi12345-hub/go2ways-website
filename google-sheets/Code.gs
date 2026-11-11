/**
 * go2ways contact form → Google Sheet (+ email alert)
 *
 * Paste this whole file into Extensions → Apps Script of your Google Sheet.
 * Setup steps are in FREE-HOSTING-GUIDE.md (Cloudflare) and GITHUB-PAGES-GUIDE.md. In short:
 *   1. Project Settings → Script properties → add SHARED_SECRET (any long random text,
 *      the same value you give Cloudflare) and, optionally, NOTIFY_TO (email for alerts).
 *      For GitHub Pages (no server), also add ALLOW_PUBLIC_FORM = true.
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
    const fromServer = secret && body.secret === secret;
    // Direct posts from the website (GitHub Pages) are allowed only when ALLOW_PUBLIC_FORM is "true".
    const publicAllowed = props.getProperty('ALLOW_PUBLIC_FORM') === 'true';
    if (!fromServer && !publicAllowed) return reply_({ ok: false, error: 'unauthorised' });

    const m = body.message || {};
    if (!fromServer) {
      if (m.website) return reply_({ ok: true }); // spam trap filled in: pretend it worked, save nothing
      const errors = validate_(m);
      if (Object.keys(errors).length) return reply_({ ok: false, error: 'Please check the highlighted fields.', errors: errors });
      if (tooMany_(String(m.email || '').toLowerCase())) {
        return reply_({ ok: false, error: 'Too many messages right now. Please try again later or email support@go2ways.com.' });
      }
    }
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

// Same rules as the website's form, for messages that come straight from the browser.
function validate_(m) {
  const errors = {};
  const s = (v) => String(v == null ? '' : v).trim();
  if (s(m.name).length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s(m.email))) errors.email = 'Please enter a valid work email.';
  if (s(m.phone) && !/^[+()\d\s-]{7,}$/.test(s(m.phone))) errors.phone = 'Please enter a valid phone number.';
  if (s(m.message).length < 10) errors.message = 'Tell us a little more (at least 10 characters).';
  return errors;
}

// Spam brake: at most 3 messages per email address and 40 in total every 10 minutes.
function tooMany_(email) {
  const cache = CacheService.getScriptCache();
  const bump = (key, max) => {
    const n = Number(cache.get(key) || 0) + 1;
    cache.put(key, String(n), 600);
    return n > max;
  };
  return bump('all', 40) || bump('email:' + email, 3);
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
