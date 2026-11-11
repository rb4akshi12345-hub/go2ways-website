# Put the go2ways website online for free

This puts the whole site online without paying for hosting:

| Part | Runs on (free) | What you get |
| --- | --- | --- |
| Website | **Cloudflare Pages** | Fast everywhere, never sleeps, free HTTPS, your own domain |
| Contact form | **Google Sheet** | Every message becomes a new row, and you get an email for each |
| AI chat | **Cloudflare Pages Functions** | The assistant answers with Claude; your API key stays secret |

You need three free accounts: **Google**, **Cloudflare** and, for the AI chat only, **Anthropic** (the AI is paid per use, about 1–2 US cents per answer; without a key the assistant still works with built-in answers).

Takes about 30 minutes the first time. Claude can run the computer steps for you; just ask.

---

## Step 1 — Create the Google Sheet inbox (10 min)

1. Go to https://sheets.new to create a blank Google Sheet. Name it **go2ways website messages**.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete everything in the editor, then paste in the whole of `google-sheets/Code.gs` from this project. Press **Save** (💾).
4. Click the **⚙ Project Settings** icon on the left, scroll to **Script properties**, and add:
   - `SHARED_SECRET` → copy the value after `SHEETS_SECRET=` in `server/.env` (it was generated for you). It's how the sheet knows a message really came from your website.
   - `NOTIFY_TO` → `support@go2ways.com` (whoever should get an email for each message).
5. Go back to the **Editor** (`< >` icon), pick **setup** in the function list at the top, and press **Run**.
   - Google asks for permission. Click **Review permissions**, choose your account.
   - If you see "Google hasn't verified this app", click **Advanced → Go to (project name)**. This is normal for your own scripts.
   - A **Messages** tab appears in your sheet with column headings.
6. Click **Deploy → New deployment**. Click the ⚙ next to "Select type" and choose **Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Press **Deploy**, then copy the **Web app URL** (it ends in `/exec`). You'll paste it into Cloudflare in Step 3.
7. Check it: open that URL in your browser. It should say `{"ok":true,"service":"go2ways contact form"}`.

> If you change `Code.gs` later, use **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**, so the URL stays the same.

## Step 2 — Put the website on Cloudflare (10 min)

There are two ways. **Through GitHub (recommended)**: every change you push goes live by itself. **From this computer**: one command, no GitHub needed.

### Option A — Through GitHub (auto-publishes every update)

The project folder is already a git repository with your settings file, saved messages and libraries excluded.

1. Install **GitHub Desktop** from https://desktop.github.com and sign in to your GitHub account (it opens your browser; no time limit).
2. In GitHub Desktop: **File → Add Local Repository…** → choose the `go2ways-website` folder → **Add Repository**.
3. Click **Publish repository**. Keep **"Keep this code private"** ticked → **Publish Repository**.
4. In Cloudflare (https://dash.cloudflare.com): **Workers & Pages → Create → Pages → Connect to Git**. Connect your GitHub account and pick the `go2ways-website` repository.
5. Build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Open **Environment variables (advanced)** and add the variables from Step 3 below now, so the first build already has them.
7. Click **Save and Deploy**. After about a minute you get your address, like `https://go2ways-website.pages.dev`.

From now on: make changes, then in GitHub Desktop write a short summary, **Commit to main**, then **Push origin**. Cloudflare publishes it automatically. (Or just ask Claude to do the commit for you.)

### Option B — From this computer

1. Create a free account at https://dash.cloudflare.com/sign-up.
2. On this computer, in the `go2ways-website` folder, run:

   ```bash
   npm install
   npm run deploy
   ```

   The first time, a browser window opens asking you to log in to Cloudflare and allow access. Say yes. If it asks about creating a project, accept the defaults (production branch: `main`).
3. When it finishes, it prints your site address, something like `https://go2ways.pages.dev`. Open it: the website is live.

The deploy sends only the public website (the pages and images) and the chat/contact functions. Your settings file, saved messages and server code are never uploaded.

## Step 3 — Connect the contact form and AI chat (5 min)

1. In the Cloudflare dashboard, open **Workers & Pages → go2ways → Settings → Variables and Secrets**.
2. Add these for **Production** (choose type **Secret** for each):

   | Name | Value |
   | --- | --- |
   | `SHEETS_WEBHOOK_URL` | The Web app URL from Step 1.6 |
   | `SHEETS_SECRET` | The same value you used for `SHARED_SECRET` in Step 1.4 |
   | `ANTHROPIC_API_KEY` | *(optional)* Your key from https://platform.claude.com/settings/keys |

3. Publish again so the site picks up the settings: with GitHub, open **Deployments → ⋯ → Retry deployment** (or push any change); from this computer, run `npm run deploy`.
4. Check everything is on: open `https://go2ways.pages.dev/api/health`. You want:

   ```
   {"ok":true,"chatAI":true,"contactForm":true}
   ```

   (`chatAI` stays `false` if you skipped the API key; the assistant then uses built-in answers.)
5. Send a test message from the Contact page. A new row should appear in your sheet within seconds, and an email should arrive at `NOTIFY_TO`. Delete the test row afterwards.

## Step 4 — Use your own domain (optional, 5 min + waiting)

1. In Cloudflare: **Workers & Pages → go2ways → Custom domains → Set up a custom domain**, enter `go2ways.com` (and/or `www.go2ways.com`).
2. Follow the instructions shown. If the domain is already managed in Cloudflare it's automatic; otherwise Cloudflare tells you the one DNS record to add at your domain provider.
3. HTTPS is set up for you. Changes can take up to a few hours to reach everyone.

---

## Everyday use

- **Reading messages:** open your Google Sheet. Newest messages are at the bottom. Reply from the email alert; replies go straight to the visitor.
- **Updating the website:** with GitHub, commit and push in GitHub Desktop; otherwise run `npm run deploy`. Either way, Claude can do it for you. The live site updates in about a minute.
- **Changing what the AI assistant knows:** edit `server/knowledge.md`, then deploy.

## Free limits (plenty for a company website)

- Cloudflare Pages: unlimited visitors for the website; the chat and contact functions are included up to 100,000 requests a day.
- Google: a personal Gmail account can send about 100 alert emails a day (Google Workspace: about 1,500). Messages are always saved in the sheet even if that runs out.
- Anthropic: the AI chat is billed per answer. Set a monthly spending limit in the Anthropic console if you want a hard cap.

## Protection that's built in

- The website checks every form field again before saving, and a hidden spam trap drops most bot messages.
- Visitors are limited to 5 form messages and 30 chat messages in 10 minutes.
- The Google Sheet only accepts messages carrying your secret, so nobody can post to it directly.
- Text that looks like a spreadsheet formula is stored as plain text, so it can't run in your sheet.
- Your API key and secret live in Cloudflare's encrypted settings, never in the website files.

## If something doesn't work

| Problem | Fix |
| --- | --- |
| `/api/health` shows `"contactForm":false` | The two `SHEETS_` variables are missing. Add them in Step 3, then `npm run deploy`. |
| Form says "Could not send your message" | Check `SHEETS_SECRET` in Cloudflare matches `SHARED_SECRET` in Apps Script exactly, and that the web app is deployed with access **Anyone**. |
| Messages arrive in the sheet but no email | Run **setup** again in Apps Script and accept the email permission; check `NOTIFY_TO`. |
| Chat only gives short built-in answers | `ANTHROPIC_API_KEY` is missing or wrong; add it and deploy again. |

## Prefer your own server instead?

The project also runs as a normal Node.js server with a built-in password-protected inbox. See `BACKEND-GUIDE.md`. Both setups use the same website and the same rules.
