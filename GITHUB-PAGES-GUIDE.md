# Publish the website with GitHub Pages

GitHub Pages turns this repository into a website anyone can open, at
**https://rb4akshi12345-hub.github.io/go2ways-website/**. It republishes by itself every time you push.

## What works on GitHub Pages

| Feature | On GitHub Pages |
| --- | --- |
| All pages, images, animations, menus | ✅ Works |
| Contact form | ✅ Goes straight to your Google Sheet once connected (step 3). Until then it opens the visitor's email app with their message to support@go2ways.com |
| Chat assistant | ✅ Built-in answers. ❌ No Claude AI (GitHub can't keep the API key secret; use Cloudflare for that) |

## One-time setup

### 1. Let GitHub publish the site
GitHub Pages is free for **public** repositories. A private repository needs a paid plan (GitHub Pro or a business trial); when a trial ends, GitHub takes the site offline unless you pay or make the repository public.

- **Free, permanent:** on the repository page → **Settings → General** → scroll to **Danger Zone** → **Change visibility → Make public**. Your passwords, keys and saved messages were never uploaded, so nothing private is exposed; people can read the website code.
- **Keep the code private:** start a paid plan or trial at https://github.com/settings/billing first (this needs your card).

### 2. Turn on Pages
Repository → **Settings → Pages** → under **Build and deployment**, set **Source** to **GitHub Actions**.

### 3. Let the Google Sheet accept messages from the website (optional, can be done later)
Send Claude your Sheet's Web app link (ends in `/exec`) to connect it, then:

1. Open your Google Sheet → **Extensions → Apps Script**.
2. Replace all the code with the latest `google-sheets/Code.gs` from this project, then **Save**.
3. **⚙ Project Settings → Script properties → Add**: `ALLOW_PUBLIC_FORM` = `true`.
4. **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy** (the link stays the same).

### 4. Publish
In **GitHub Desktop**, click **Push origin**. After 1–2 minutes the site is live. You can watch progress in the repository's **Actions** tab (green tick = published).

## Updating the site later
Make changes (or ask Claude to), then in GitHub Desktop **Commit to main** → **Push origin**. The live site updates in about two minutes.

## Protection on this setup
The Sheet checks every message (required fields, valid email), drops bot messages caught by the hidden spam trap, and accepts at most 3 messages per email address and 40 in total every 10 minutes. Formula-like text is stored as plain text.
