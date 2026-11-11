# go2ways website — backend guide

No backend experience needed. This explains what runs behind the website and how to use it.

## What the backend does

One small program, `server/server.mjs`, does three jobs:

| Job | What it means for you |
| --- | --- |
| **Shows the website** | Serves every page, image and style, like any web host. |
| **Receives the contact form** | Every message sent on the Contact page is checked, saved, and (if you turn it on) emailed to the team. |
| **Runs the AI chat** | The "Ask go2ways" assistant answers with Claude once an API key is added. Without one it uses built-in answers. |

Your private settings (passwords, keys) live in one file: `server/.env`. It never goes on the website and should never be shared.

## Start it on your computer

You need [Node.js](https://nodejs.org) version 22 or newer (already installed on this Mac).

```bash
cd "go2ways-website/server"
npm install
npm start
```

Then open http://localhost:5179. The window running `npm start` shows a short status report:

```
contact form: saving to server/data/messages.jsonl
email alerts: off - set SMTP_* and NOTIFY_TO in server/.env
inbox: on at /admin
chat AI: off - add ANTHROPIC_API_KEY to server/.env to turn it on
```

Stop it with `Ctrl + C`. After changing `server/.env`, stop and start it again.

## Reading contact form messages

1. Open http://localhost:5179/admin
2. Sign in with **any username** and the password from `ADMIN_PASSWORD` in `server/.env`. A strong one was generated for you; change it to anything you like.
3. You see every message, newest first, with the sender's email and phone ready to click. **Download as spreadsheet (CSV)** opens in Excel or Google Sheets.

Messages are stored in `server/data/messages.jsonl`. Back this file up; it's your record of enquiries.

## Getting an email for every new message (optional)

Fill in these lines in `server/.env` using your email provider's SMTP settings, then restart:

```
SMTP_HOST=smtp.gmail.com          # your provider's SMTP server
SMTP_PORT=465
SMTP_USER=you@go2ways.com         # the mailbox that sends the alert
SMTP_PASS=                        # for Google: create an "App Password"
NOTIFY_TO=support@go2ways.com     # who receives the alerts
NOTIFY_FROM=you@go2ways.com
```

- **Google Workspace / Gmail:** turn on 2-Step Verification, then create an App Password at https://myaccount.google.com/apppasswords and use it as `SMTP_PASS`.
- **Microsoft 365 / Outlook:** host `smtp.office365.com`, port `587`.
- **Zoho Mail:** host `smtp.zoho.in`, port `465`.

Each alert has the visitor as "reply-to", so pressing Reply answers them directly. If email ever fails, the message is still saved in the inbox.

## Turning on the AI chat (optional)

Put your key from https://platform.claude.com/settings/keys after `ANTHROPIC_API_KEY=` in `server/.env` and restart. To change what the assistant knows, edit `server/knowledge.md` and restart.

## Built-in protection

- The server checks every form field again, so nobody can skip the checks in the browser.
- A hidden "spam trap" field catches most bots; their messages are quietly dropped.
- Each visitor can send at most 5 form messages and 30 chat messages per 10 minutes.
- The inbox needs the password, and its page can't be indexed by search engines.
- Nothing in the `server` folder (code, settings, saved messages) can be opened from the website.

## Putting it online

**Want it free?** Follow [FREE-HOSTING-GUIDE.md](FREE-HOSTING-GUIDE.md) instead: Cloudflare Pages for the site and chat, a Google Sheet for messages. The steps below are for a paid host running this server.

The website and backend go online together as one Node.js app. Recommended: **Render** (paid web service + a persistent disk, Singapore region) or **Railway** (with a volume). Both are beginner-friendly, publish from GitHub and handle HTTPS.

Avoid website-only hosts (Netlify, GitHub Pages, static Vercel) and shared cPanel hosting: they can't run the server, so the contact form and AI chat won't work. Also avoid hosts without persistent storage (such as Render's free tier or DigitalOcean App Platform): saved messages would be lost on restart.

1. Upload the whole `go2ways-website` folder (a GitHub repository is easiest). `server/.env` and `server/data` are excluded on purpose.
2. Set the **start command** to `cd server && npm install && npm start`.
3. In the host's **environment variables** screen, add the same settings as in your `.env` (`ADMIN_PASSWORD`, the `SMTP_*` lines, `ANTHROPIC_API_KEY`), plus `HOST=0.0.0.0`. Most hosts set `PORT` for you.
4. Add a **persistent disk** (sometimes called a volume) and set `DATA_DIR` to its path, for example `/data`. Without it, saved messages can be wiped when the host restarts the app.
5. Point your domain at the app and make sure HTTPS is on, which most hosts do automatically.

Check it's working by visiting `https://your-domain/api/health`. It shows which features are on:

```
{"ok":true,"chatAI":true,"email":true,"inbox":true}
```

## Files at a glance

| File | What it is |
| --- | --- |
| `server/server.mjs` | Starts everything: website, chat, form. |
| `server/contact.mjs` | Contact form saving, email alerts, `/admin` inbox. |
| `server/knowledge.md` | What the AI assistant knows about go2ways. |
| `server/.env` | Your private settings. Never share. |
| `server/.env.example` | Blank template of all settings, with notes. |
| `server/data/messages.jsonl` | Saved contact form messages. |
