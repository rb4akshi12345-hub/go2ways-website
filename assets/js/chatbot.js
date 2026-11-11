/* go2ways assistant — a self-contained chat widget.
   Answers come from the knowledge base below. To use a live AI backend instead,
   set data-endpoint on the script tag: it receives POST {message, history, page}
   and should return JSON {reply: "text"}. If the endpoint fails, the widget
   falls back to the knowledge base. */
(function () {
  "use strict";

  var script = document.currentScript;
  var ENDPOINT = script && script.getAttribute("data-endpoint");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var STORE = "g2w-chat-v1";

  /* ------------------------------------------------------------ knowledge */
  var CONTACT = {
    email: "support@go2ways.com",
    phone: "+91 88269 49739",
    tel: "+918826949739",
    hours: "Monday to Saturday, 9:00 AM – 6:00 PM (IST)",
    address: "314a Sector 102, Gurugram, Haryana"
  };

  var SERVICES = [
    { slug: "ibm-maximo", name: "IBM Maximo Services",
      text: "We implement, configure, upgrade and support IBM Maximo: asset hierarchies, work management, inventory, automation scripts, workflows, BIRT reports and data loading.",
      keys: [[/\bmaximo\b/, 2], [/\beam\b/, 2], [/asset management/, 2], [/work ?orders?/, 2], [/automation script/, 3], [/\bbirt\b/, 3], [/implement/, 1]] },
    { slug: "mas-migration", name: "MAS Migration",
      text: "We move you from Maximo 7.6 to IBM Maximo Application Suite (MAS): a readiness assessment, AppPoints licensing plan, OpenShift setup, customisation rework, a full rehearsal and a planned cutover with hypercare.",
      keys: [[/\bmas\b/, 4], [/application suite/, 4], [/7\.6/, 4], [/migrat/, 3], [/upgrad/, 1], [/apppoints?/, 4], [/end of support/, 3]] },
    { slug: "enterprise-integration", name: "Enterprise Integration",
      text: "We connect Maximo with SAP, Oracle, identity (Azure AD / Entra ID), GIS and IoT systems using REST APIs, the Maximo Integration Framework and messaging such as Kafka.",
      keys: [[/integrat/, 3], [/\bsap\b/, 3], [/oracle/, 2], [/\bapis?\b/, 2], [/middleware/, 3], [/kafka/, 3], [/single sign|\bsso\b|azure ad|entra/, 3], [/\bgis\b|esri/, 2], [/\biot\b|sensor/, 2]] },
    { slug: "cloud-infrastructure", name: "Cloud & Infrastructure",
      text: "We deploy and run infrastructure on AWS, Azure and Red Hat OpenShift, with backup and disaster recovery, 24/7 monitoring, virtualisation and security hardening.",
      keys: [[/cloud/, 3], [/\baws\b|amazon/, 3], [/azure/, 2], [/openshift/, 2], [/infra/, 3], [/backup|disaster|recovery/, 3], [/server|hosting|vmware|virtuali/, 2]] },
    { slug: "managed-support", name: "Managed Support",
      text: "Our managed support covers L2/L3 application support, application management services (AMS), 24/7 monitoring, incident and problem management, health checks and patching.",
      keys: [[/support/, 2], [/\bams\b/, 3], [/24 ?[x\/] ?7|round the clock|around the clock/, 3], [/incident/, 3], [/\bl2\b|\bl3\b/, 3], [/help ?desk|ticket/, 2], [/\bsla\b/, 2]] },
    { slug: "tririga", name: "TRIRIGA Services",
      text: "We implement and support IBM TRIRIGA (now IBM Maximo Real Estate and Facilities) for space management, lease administration and accounting (IFRS 16 / ASC 842), facility maintenance and capital projects.",
      keys: [[/tririga|triga/, 4], [/lease/, 3], [/space (management|planning)|floor plan|occupan/, 3], [/facilit/, 2], [/iwms/, 4], [/workplace/, 2]] },
    { slug: "mobile-development", name: "Mobile Development & Enablement",
      text: "We roll out Maximo Mobile and build custom iOS and Android apps for field teams: offline work, inspections with photos and signatures, maps and barcode/RFID scanning.",
      keys: [[/mobile/, 3], [/\bapps?\b/, 2], [/field (team|work|staff|service)|technician/, 3], [/offline/, 3], [/android|\bios\b|iphone/, 3], [/barcode|rfid|scan/, 2], [/inspection/, 2]] },
    { slug: "consulting-advisory", name: "Consulting & Architectural Advisory",
      text: "We advise on asset management strategy, solution architecture and roadmaps, run Maximo health checks and audits, help with licensing, and provide dedicated remote teams.",
      keys: [[/consult/, 3], [/advis/, 3], [/architect/, 3], [/roadmap|strategy/, 3], [/health ?check|audit/, 3], [/licen[cs]/, 2], [/dedicated team|remote team|staff aug/, 3]] }
  ];

  function link(href, label) { return '<a href="' + href + '">' + label + "</a>"; }
  function svcLink(s) { return link("service-" + s.slug + ".html", s.name); }
  function bySlug(slug) { for (var i = 0; i < SERVICES.length; i++) if (SERVICES[i].slug === slug) return SERVICES[i]; }

  var INTENTS = [
    { id: "greet", keys: [[/^(hi|hello|hey|hiya|namaste|good (morning|afternoon|evening))\b/, 3]],
      reply: function () { return "Hello! I can tell you about go2ways’ services, our products, the industries we work in, or how to reach the team. What would you like to know?"; },
      chips: ["What services do you offer?", "Tell me about Ordova", "How do I contact you?"] },
    { id: "about", keys: [[/about (go2ways|g2ways|the company|your company|you)/, 4], [/who (are|is) (you|go2ways)\b/, 4], [/what (is|does) go2ways/, 4], [/\bcompany\b/, 1], [/go2ways|g2ways/, 1]],
      reply: function () { return "go2ways is an enterprise technology partner for asset-driven businesses, based in Gurugram, Haryana. We help organisations run their operations better with IBM Maximo, MAS migration, enterprise integration, cloud, managed support, TRIRIGA, mobile apps and consulting. We also build our own products, such as " + link("https://ordova.go2ways.com/", "Ordova") + "."; },
      chips: ["What services do you offer?", "Which industries do you work with?", "Who have you worked with?"] },
    { id: "services", keys: [[/\bservices?\b/, 1], [/what (do|can) you (do|offer|help)/, 3], [/\boffer(ings?)?\b/, 2], [/help (me|us) with/, 1]],
      reply: function () {
        return "We offer eight services:<ul>" + SERVICES.map(function (s) { return "<li>" + svcLink(s) + "</li>"; }).join("") + "</ul>Which one would you like to know more about?";
      },
      chips: ["MAS migration", "Managed support", "Consulting"] },
    { id: "products", keys: [[/products?/, 3], [/platform|software you (make|build|sell)/, 2]],
      reply: function () { return "We have two products:<ul><li>" + link("https://ordova.go2ways.com/", "Ordova") + ": an intelligent transport management system for bus operators and transport authorities.</li><li><b>Emp AI</b>: in development and not available yet.</li></ul>"; },
      chips: ["Tell me about Ordova", "When is Emp AI launching?"] },
    { id: "ordova", keys: [[/ordova/, 5], [/transport/, 2], [/\bbus(es)?\b/, 3], [/fleet/, 2], [/dispatch/, 3], [/transit|depot/, 2]],
      reply: function () { return "Ordova is go2ways’ intelligent transport management system for bus operators and transport authorities. It covers network and trip planning, live dispatch, fleet and depot maintenance, analytics, and AI recommendations for dispatchers, and it connects to systems like IBM Maximo, GPS and ticketing. " + link("https://ordova.go2ways.com/", "Visit the Ordova site") + "."; },
      chips: ["Book a demo", "What services do you offer?"] },
    { id: "empai", keys: [[/emp ?ai/, 5]],
      reply: function () { return "Emp AI is still in development, so there’s nothing to share publicly yet. If you’d like to hear when it launches, " + link("contact.html#contact-form", "leave us a message") + "."; },
      chips: ["Tell me about Ordova", "How do I contact you?"] },
    { id: "industries", keys: [[/industr/, 3], [/sectors?/, 3], [/manufactur|utilit|oil|\bgas\b|government|healthcare|hospital|infrastructure|real estate/, 1]],
      reply: function () { return "We work across eight sectors: manufacturing, utilities, oil &amp; gas, government, healthcare, infrastructure, transportation and real estate. " + link("industries.html#sectors", "See the sectors") + "."; },
      chips: ["Who have you worked with?", "What services do you offer?"] },
    { id: "clients", keys: [[/clients?|customers?/, 3], [/worked (with|for)/, 3], [/case stud|portfolio|references?/, 3]],
      reply: function () { return "We’ve provided services to organisations including LTI (a Larsen &amp; Toubro Group company), BRIWO, AsahiKASEI, Saudi Electricity Company, CONNIXT, Mitsubishi Heavy Industries and Quantum Strides. " + link("industries.html#clients", "See our clients") + "."; },
      chips: ["Which industries do you work with?", "Book a demo"] },
    { id: "contact", keys: [[/contact/, 3], [/e-?mail/, 3], [/phone|call|number|whatsapp/, 3], [/reach|get in touch|talk to (someone|a person|sales|the team)/, 3], [/human|real person|agent/, 3]],
      reply: function () { return "You can reach the go2ways team by:<ul><li>Email: " + link("mailto:" + CONTACT.email, CONTACT.email) + "</li><li>Phone: " + link("tel:" + CONTACT.tel, CONTACT.phone) + "</li><li>The " + link("contact.html#contact-form", "contact form") + "</li></ul>We reply within 24 hours on business days."; },
      chips: ["Where is your office?", "What are your hours?", "Book a demo"] },
    { id: "location", keys: [[/where/, 1], [/locat|address|office|based|gurugram|gurgaon|haryana|delhi|ncr|india|visit/, 3]],
      reply: function () { return "Our office is at " + CONTACT.address + ". " + link("https://www.google.com/maps/search/?api=1&query=314a+Sector+102+Gurugram+Haryana", "Open in Google Maps") + ". We work with clients across India and internationally, on-site and remotely."; },
      chips: ["What are your hours?", "How do I contact you?"] },
    { id: "hours", keys: [[/hours|timings?|opening|open (on|today)|working days|when are you/, 4], [/saturday|sunday|weekend/, 3]],
      reply: function () { return "We’re open " + CONTACT.hours + ". Messages sent outside those hours are answered on the next business day."; },
      chips: ["How do I contact you?", "Book a demo"] },
    { id: "pricing", keys: [[/price|pricing|cost|quote|budget|how much|rates?\b|charges?/, 4]],
      reply: function () { return "Pricing depends on scope: a health check, a migration and a long-term support contract are priced very differently. Tell us what you need in the " + link("contact.html?topic=demo#contact-form", "contact form") + " and we’ll send a proposal."; },
      chips: ["Book a demo", "What services do you offer?"] },
    { id: "demo", keys: [[/demo|trial|meeting|book|schedule|appointment/, 4]],
      reply: function () { return "Happy to set that up. " + link("contact.html?topic=demo#contact-form", "Book a demo") + " and we’ll arrange a short call to understand your operation."; },
      chips: ["What are your hours?", "What services do you offer?"] },
    { id: "careers", keys: [[/career|jobs?\b|hiring|vacanc|intern|openings?|join (you|your team)/, 4]],
      reply: function () { return "We don’t have a careers page yet. To ask about openings, email " + link("mailto:" + CONTACT.email, CONTACT.email) + " with your CV and the role you’re interested in."; },
      chips: ["What services do you offer?", "Where is your office?"] },
    { id: "partner", keys: [[/partner(ship)?/, 4], [/resell|collaborat/, 3]],
      reply: function () { return "We partner with system integrators, consultancies and technology vendors. " + link("contact.html?topic=partner#contact-form", "Tell us about your company") + " and we’ll be in touch."; },
      chips: ["What services do you offer?", "How do I contact you?"] },
    { id: "thanks", keys: [[/thank|thx|cheers|great|perfect|awesome/, 3]],
      reply: function () { return "You’re welcome! Anything else I can help with?"; },
      chips: ["What services do you offer?", "How do I contact you?"] },
    { id: "bye", keys: [[/\bbye\b|goodbye|see you|that'?s all/, 4]],
      reply: function () { return "Thanks for stopping by. If anything else comes up, I’m right here."; },
      chips: [] }
  ];

  // Each service is also an intent, with a link to its page.
  SERVICES.forEach(function (s) {
    INTENTS.push({ id: "svc-" + s.slug, keys: s.keys,
      reply: function () { return s.text + " " + link("service-" + s.slug + ".html", "Read more about " + s.name) + "."; },
      chips: ["Talk to an expert", "What services do you offer?"] });
  });

  // Chip labels that map straight to an intent.
  var CHIP_MAP = {
    "Talk to an expert": "contact",
    "Book a demo": "demo",
    "About this service": null // filled per page below
  };

  var pageSlug = (location.pathname.match(/service-([a-z-]+)\.html$/) || [])[1];
  if (pageSlug && bySlug(pageSlug)) CHIP_MAP["About this service"] = "svc-" + pageSlug;

  function normalise(s) { return s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim(); }

  function findIntent(text) {
    var t = normalise(text);
    var best = null, bestScore = 0;
    INTENTS.forEach(function (intent) {
      var score = 0;
      intent.keys.forEach(function (k) { if (k[0].test(t)) score += k[1]; });
      if (score > bestScore) { best = intent; bestScore = score; }
    });
    return bestScore > 0 ? best : null;
  }
  function intentById(id) { for (var i = 0; i < INTENTS.length; i++) if (INTENTS[i].id === id) return INTENTS[i]; }

  var FALLBACK = {
    reply: function () { return "I’m not sure about that one. I can help with our services, products, industries, clients and contact details. For anything else, the team can answer directly at " + link("mailto:" + CONTACT.email, CONTACT.email) + " or " + link("tel:" + CONTACT.tel, CONTACT.phone) + "."; },
    chips: ["What services do you offer?", "How do I contact you?"]
  };

  /* ------------------------------------------------------------ storage */
  var state = { open: false, messages: [], teaserSeen: false };
  function load() {
    try { var raw = sessionStorage.getItem(STORE); if (raw) state = Object.assign(state, JSON.parse(raw)); } catch (e) {}
  }
  function save() {
    try {
      state.messages = state.messages.slice(-40);
      sessionStorage.setItem(STORE, JSON.stringify(state));
    } catch (e) {}
  }

  /* ------------------------------------------------------------ DOM */
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  var ICON_RESET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/></svg>';
  var ICON_SPARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>';

  var root = document.createElement("div");
  root.className = "g2w-chat";
  root.innerHTML =
    '<div class="chat-teaser" hidden><p>Questions about go2ways? Ask me.</p><button type="button" class="chat-teaser-x" aria-label="Dismiss">' + ICON_CLOSE + "</button></div>" +
    '<section class="chat-panel" id="g2w-chat-panel" role="dialog" aria-label="go2ways assistant" hidden>' +
      '<header class="chat-head">' +
        '<span class="chat-avatar">' + ICON_SPARK + "</span>" +
        '<div class="chat-title"><p class="chat-name">go2ways assistant</p><p class="chat-status"><span class="dot" aria-hidden="true"></span>Answers instantly</p></div>' +
        '<button type="button" class="chat-icon-btn chat-reset" aria-label="Start a new conversation" title="New conversation">' + ICON_RESET + "</button>" +
        '<button type="button" class="chat-icon-btn chat-close" aria-label="Close chat">' + ICON_CLOSE + "</button>" +
      "</header>" +
      '<div class="chat-log" role="log" aria-live="polite" aria-relevant="additions"></div>' +
      '<div class="chat-chips" aria-label="Suggested questions"></div>' +
      '<form class="chat-form" autocomplete="off">' +
        '<label class="sr-only" for="g2w-chat-input">Ask a question</label>' +
        '<input id="g2w-chat-input" type="text" maxlength="300" placeholder="Ask about services, products, contact…" enterkeyhint="send">' +
        '<button type="submit" class="chat-send" aria-label="Send">' + ICON_SEND + "</button>" +
      "</form>" +
      '<p class="chat-note">AI assistant. It can make mistakes, so for anything important <a href="contact.html">contact our team</a>.</p>' +
    "</section>" +
    '<button type="button" class="chat-launcher" aria-label="Open chat with the go2ways assistant" aria-expanded="false" aria-controls="g2w-chat-panel">' +
      '<span class="chat-launcher-avatar"><span class="ic ic-open">' + ICON_SPARK + '</span><span class="ic ic-close">' + ICON_CLOSE + "</span></span>" +
      '<span class="chat-launcher-label" aria-hidden="true">Ask go2ways</span>' +
    "</button>";
  document.body.appendChild(root);

  var panel = root.querySelector(".chat-panel");
  var launcher = root.querySelector(".chat-launcher");
  var log = root.querySelector(".chat-log");
  var chipsEl = root.querySelector(".chat-chips");
  var form = root.querySelector(".chat-form");
  var input = root.querySelector("#g2w-chat-input");
  var teaser = root.querySelector(".chat-teaser");
  var busy = false;

  function scrollToEnd() { log.scrollTop = log.scrollHeight; }

  function addMessage(from, html, animate) {
    var row = document.createElement("div");
    row.className = "chat-msg from-" + from + (animate ? " is-new" : "");
    var bubble = document.createElement("div");
    bubble.className = "bubble";
    if (from === "user") bubble.textContent = html; else bubble.innerHTML = html;
    row.appendChild(bubble);
    log.appendChild(row);
    scrollToEnd();
  }

  function setChips(list) {
    chipsEl.innerHTML = "";
    (list || []).forEach(function (label, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chat-chip";
      b.style.setProperty("--i", i);
      b.textContent = label;
      b.addEventListener("click", function () { ask(label); });
      chipsEl.appendChild(b);
    });
  }

  function showTyping() {
    var row = document.createElement("div");
    row.className = "chat-msg from-bot is-new chat-typing";
    row.innerHTML = '<div class="bubble" aria-label="Assistant is typing"><span></span><span></span><span></span></div>';
    log.appendChild(row);
    scrollToEnd();
    return row;
  }

  function localAnswer(text) {
    var intent = (CHIP_MAP[text] && intentById(CHIP_MAP[text])) || findIntent(text) || FALLBACK;
    var chips = intent.chips.slice();
    if (pageSlug && intent.id !== "svc-" + pageSlug && chips.indexOf("About this service") === -1 && CHIP_MAP["About this service"]) chips.push("About this service");
    return { html: intent.reply(), chips: chips.slice(0, 3) };
  }

  /* ------------------------------------------------------------ AI replies */
  // Safe mini-markdown for model output: escape everything, then allow links to
  // this site / Ordova / mailto / tel, **bold**, and "- " bullet lists.
  var SAFE_URL = /^(\/?[\w\-./]*\.html(?:[?#][\w\-=&#.]*)?|\/?#[\w-]+|https:\/\/ordova\.go2ways\.com\/?[\w\-./?=&#]*|mailto:[\w.+-]+@[\w.-]+|tel:\+?[\d ]+)$/;
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
  function inline(t) {
    return esc(t)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, label, url) {
        var raw = url.replace(/&amp;/g, "&");
        if (!SAFE_URL.test(raw)) return label;
        if (raw.charAt(0) === "/") raw = raw.slice(1); // site pages are siblings of this page
        var ext = /^https:/.test(raw) ? ' target="_blank" rel="noopener"' : "";
        return '<a href="' + esc(raw) + '"' + ext + ">" + label + "</a>";
      })
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  }
  function renderMd(text) {
    var out = [], list = null;
    text.replace(/\r/g, "").split("\n").forEach(function (line) {
      var item = line.match(/^\s*[-*•]\s+(.*)$/);
      if (item) { if (!list) { list = []; } list.push("<li>" + inline(item[1]) + "</li>"); return; }
      if (list) { out.push("<ul>" + list.join("") + "</ul>"); list = null; }
      if (line.trim()) out.push(inline(line));
      else if (out.length && out[out.length - 1] !== "<br>") out.push("<br>");
    });
    if (list) out.push("<ul>" + list.join("") + "</ul>");
    return out.join("<br>").replace(/(<br>)+(<ul>)/g, "$2").replace(/(<\/ul>)(<br>)+/g, "$1").replace(/(<br>){2,}/g, "<br><br>").replace(/^(<br>)+|(<br>)+$/g, "");
  }

  var aiAvailable = !!ENDPOINT;
  function historyForAi() {
    return state.messages.slice(-12).map(function (m) {
      return { role: m.from === "user" ? "user" : "assistant", content: m.from === "user" ? m.text : (m.text || m.html.replace(/<[^>]+>/g, " ")) };
    });
  }

  // Streams the reply into a new bubble. Resolves with the final text; rejects
  // (before showing anything) if the server is unreachable or not configured.
  function streamAnswer(text, typing, myGen) {
    var history = historyForAi();
    history.pop(); // the new user message is sent separately
    return fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: history, page: location.pathname.split("/").pop() || "index.html" })
    }).then(function (r) {
      if (!r.ok || !r.body) throw new Error("status " + r.status);
      if ((r.headers.get("content-type") || "").indexOf("application/json") === 0) {
        return r.json().then(function (d) { if (!d.reply) throw new Error("empty"); return paint(String(d.reply), true); });
      }
      var reader = r.body.getReader(), decoder = new TextDecoder(), acc = "", bubble = null, frame = 0;
      function paint(t, done) {
        if (myGen !== generation) return t;
        if (!bubble) {
          typing.remove();
          var row = document.createElement("div");
          row.className = "chat-msg from-bot is-new";
          bubble = document.createElement("div");
          bubble.className = "bubble";
          row.appendChild(bubble);
          log.appendChild(row);
        }
        bubble.innerHTML = renderMd(t) + (done ? "" : '<span class="chat-caret" aria-hidden="true"></span>');
        scrollToEnd();
        return t;
      }
      function pump() {
        return reader.read().then(function (chunk) {
          if (chunk.done) {
            if (acc.indexOf("\u0000ERROR") !== -1) acc = acc.split("\u0000ERROR")[0];
            if (!acc.trim()) throw new Error("empty");
            cancelAnimationFrame(frame);
            return paint(acc, true);
          }
          acc += decoder.decode(chunk.value, { stream: true });
          if (acc.indexOf("\u0000ERROR") !== -1 && !acc.split("\u0000ERROR")[0].trim()) { reader.cancel(); throw new Error("server error"); }
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(function () { paint(acc.split("\u0000ERROR")[0], false); });
          return pump();
        });
      }
      return pump();
    });
  }

  var queued = [];
  var generation = 0;
  function finish(res, myGen) {
    if (myGen !== generation) return; // conversation was reset meanwhile
    if (!res.painted) addMessage("bot", res.html, true);
    setChips(res.chips);
    state.messages.push({ from: "bot", html: res.html, text: res.text, chips: res.chips });
    save();
    busy = false;
    if (queued.length) ask(queued.shift());
  }
  function ask(text) {
    text = String(text || "").trim();
    if (!text) return;
    if (busy) { queued.push(text); return; } // answered as soon as the current reply lands
    busy = true;
    setChips([]);
    addMessage("user", text, true);
    state.messages.push({ from: "user", text: text });
    save();
    var typing = showTyping();
    var started = Date.now();
    var myGen = generation;
    var local = localAnswer(text);

    function answerLocally() {
      var minDelay = reduceMotion ? 150 : 550 + Math.min(text.length * 8, 400);
      setTimeout(function () {
        if (myGen !== generation) return;
        typing.remove();
        finish(local, myGen);
      }, Math.max(0, minDelay - (Date.now() - started)));
    }

    // Suggestion chips with a fixed answer stay instant; everything typed goes to the AI.
    if (!aiAvailable || CHIP_MAP[text]) return answerLocally();
    streamAnswer(text, typing, myGen).then(function (finalText) {
      finish({ html: renderMd(finalText), text: finalText, chips: local.chips, painted: true }, myGen);
    }).catch(function () {
      aiAvailable = false; // server down or not configured: built-in answers for the rest of this page
      answerLocally();
    });
  }

  function greet() {
    var html = "Hi, I’m the go2ways assistant. I can help you find the right service, learn about our products, or get in touch with the team.";
    var chips = ["What services do you offer?", "Tell me about Ordova", "How do I contact you?"];
    if (pageSlug && bySlug(pageSlug)) {
      html += " You’re on the <b>" + bySlug(pageSlug).name + "</b> page. Want a quick summary?";
      chips = ["About this service", "Talk to an expert", "What services do you offer?"];
    }
    addMessage("bot", html, true);
    setChips(chips);
    state.messages.push({ from: "bot", html: html, chips: chips });
    save();
  }

  function restore() {
    log.innerHTML = "";
    state.messages.forEach(function (m) { addMessage(m.from, m.from === "user" ? m.text : m.html, false); });
    var last = state.messages[state.messages.length - 1];
    setChips(last && last.from === "bot" ? last.chips : []);
  }

  /* ------------------------------------------------------------ open / close */
  var closeTimer;
  function setOpen(open, opts) {
    opts = opts || {};
    state.open = open;
    save();
    clearTimeout(closeTimer);
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", open ? "Close chat" : "Open chat with the go2ways assistant");
    root.classList.toggle("is-open", open);
    if (open) {
      hideTeaser();
      panel.hidden = false;
      void panel.offsetWidth; // apply the hidden-state styles first so the open transition runs
      root.classList.add("is-visible");
      if (!state.messages.length) greet();
      scrollToEnd();
      if (!opts.silent && window.matchMedia("(hover: hover)").matches) setTimeout(function () { input.focus(); }, 60);
    } else {
      root.classList.remove("is-visible");
      closeTimer = setTimeout(function () { panel.hidden = true; }, reduceMotion ? 0 : 220);
      if (opts.returnFocus) launcher.focus();
    }
  }

  function hideTeaser() {
    teaser.classList.remove("show");
    setTimeout(function () { teaser.hidden = true; }, 250);
    state.teaserSeen = true;
    save();
  }

  launcher.addEventListener("click", function () { setOpen(!state.open); });
  root.querySelector(".chat-close").addEventListener("click", function () { setOpen(false, { returnFocus: true }); });
  root.querySelector(".chat-reset").addEventListener("click", function () {
    generation++; state.messages = []; queued = []; save(); log.innerHTML = ""; busy = false; greet(); input.focus();
  });
  root.querySelector(".chat-teaser-x").addEventListener("click", hideTeaser);
  teaser.querySelector("p").addEventListener("click", function () { setOpen(true); });
  root.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && state.open) { e.stopPropagation(); setOpen(false, { returnFocus: true }); }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = "";
    ask(v);
  });
  // Close the chat on phones when a link inside it navigates away.
  log.addEventListener("click", function (e) {
    if (e.target.closest("a") && window.matchMedia("(max-width: 600px)").matches) setOpen(false, { silent: true });
  });

  /* ------------------------------------------------------------ boot */
  load();
  restore();
  if (state.open) setOpen(true, { silent: true });
  else if (!state.teaserSeen) {
    setTimeout(function () {
      if (state.open || state.teaserSeen) return;
      teaser.hidden = false;
      requestAnimationFrame(function () { teaser.classList.add("show"); });
    }, 5000);
  }
})();
