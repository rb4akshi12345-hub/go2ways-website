# go2ways website

Static site built from the Figma file **Go2ways_updated_website → Page 3**. No build step: plain HTML, CSS and JavaScript.

## Pages

| File | Figma frame |
| --- | --- |
| `index.html` | Landing Page — Desktop |
| `services.html` | Services |
| `industries.html` | INFRASTRUCTURE (sectors + clients) |
| `contact.html` | Get in Touch |
| `service-*.html` | One page per service (8), built from `_build/build_pages.py` |

## Menu, service pages and footer

The top menu has a **Services** dropdown (the 8 services) and a **Products** dropdown (Ordova links to ordova.go2ways.com; Emp AI shows "Coming soon").
The menu, the footer and all `service-*.html` pages come from one script. To change a service's text, a menu item or a product, edit `SERVICES` / `PRODUCTS` in `_build/build_pages.py` and run:

```bash
python3 _build/build_pages.py
```

When Emp AI launches, give it an `href` in `PRODUCTS` and re-run.

## Backend

The site runs on a small Node.js server (`server/`) that also receives the contact form (saved to an inbox at `/admin`, with optional email alerts) and powers the AI chat. **See [BACKEND-GUIDE.md](BACKEND-GUIDE.md)** for a plain-language guide to running it on your own server.

**GitHub Pages:** published automatically from this repository on every push. **See [GITHUB-PAGES-GUIDE.md](GITHUB-PAGES-GUIDE.md).**

**Free hosting with AI chat:** the same site also runs for free on Cloudflare Pages, with contact messages going to a Google Sheet. **See [FREE-HOSTING-GUIDE.md](FREE-HOSTING-GUIDE.md).** Publish updates with `npm run deploy`.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 5178
```

## Chat assistant

The go2ways assistant (bottom-right on every page) is answered by **Claude** when the site runs on the included server, and by a built-in knowledge base otherwise.

**Turn on the AI**
1. Get an API key at https://platform.claude.com/settings/keys
2. `cd server`, copy `.env.example` to `.env`, and put the key after `ANTHROPIC_API_KEY=`
3. `npm install` (first time only), then `npm start`
4. Open http://localhost:5179

**How it works**
- `server/server.mjs` serves the site and answers `POST /api/chat`. It streams Claude's reply (model `claude-opus-5-5`, low effort, for quick replies) word by word into the chat.
- What the assistant knows comes from `server/knowledge.md`. Edit that file to change its answers, then restart the server. It is told to answer only from that briefing and to send people to the team for anything else (prices, timelines and so on).
- Server-side refusal fallback is on (`fallbacks: "default"`). If Claude declines a message on safety grounds, the API retries it on a suitable fallback model.
- Limits: messages up to 600 characters, the last 12 turns as context, 30 messages per visitor per 10 minutes, and replies capped at 4,000 tokens.
- With no key, an invalid key, or the site opened another way (for example `python3 -m http.server` or double-clicking a file), the widget quietly uses the built-in answers in `assets/js/chatbot.js`.
- The API key stays on the server (`server/.env`, which git ignores) and is never sent to the browser.

**Deploying:** run the server on any Node 22+ host. Set `HOST=0.0.0.0`, `PORT` and `ANTHROPIC_API_KEY` as environment variables, and put it behind HTTPS.

## Still to swap in

Figma's Starter plan blocked further exports partway through, so these are stand-ins:

- **Team photo** (home page, "Built for teams that move fast"): `assets/img/team.jpg` is cut from a Figma screenshot, so it is only 347px wide and looks soft on large screens. Export the "Photo / Team at work" layer from Figma at 2× and save it over that file.
- **Client logos** (`industries.html`, "Services Provided To"): text placeholders. Replace each tile's contents with an `<img>`.
- **Card photos** (home feature cards + industry sectors): free Unsplash photos in `assets/img/photos/` (sources in `CREDITS.md` there). Replace a file with the same name to swap a photo.
- **FAQ answers**: written as sensible placeholders; check them.

## Motion

- Silk wave: the Figma wave SVG, inlined in `assets/js/waves-data.js`; each ribbon line ripples on its own phase, with scroll parallax in the hero.
- Contact and clients backgrounds: canvas line-ribbons in the same palette.
- Headline word reveal, scroll reveals with stagger, count-up stats, chart/bar draw-ins, 3D card tilt, button sheen, animated form border, accordion, page fade transitions, scroll progress bar.
- Everything respects `prefers-reduced-motion`, and the animation loop pauses when off-screen or the tab is hidden.
