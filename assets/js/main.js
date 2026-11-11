/* go2ways — interactions and motion */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Page load + leave transitions ---------- */
  function markLoaded() { root.classList.add("is-loaded"); }
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 350); })]).then(markLoaded);
  } else {
    window.addEventListener("load", markLoaded);
  }
  window.addEventListener("pageshow", function (e) { if (e.persisted) { root.classList.remove("is-leaving"); markLoaded(); } });

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || a.target === "_blank" || /^(mailto:|tel:|https?:)/.test(href)) return;
    var url = new URL(href, location.href);
    if (url.pathname === location.pathname && url.hash) return; // same-page anchor
    if (reduceMotion) return;
    e.preventDefault();
    root.classList.add("is-leaving");
    setTimeout(function () { location.href = url.href; }, 260);
  });

  /* ---------- Split headline words ---------- */
  document.querySelectorAll(".split-words").forEach(function (el) {
    var i = 0;
    var parts = el.innerHTML.split(/(<br\s*\/?>)/i);
    el.innerHTML = parts.map(function (part) {
      if (/^<br/i.test(part)) return part;
      return part.trim().split(/\s+/).filter(Boolean).map(function (w) {
        return '<span class="word"><span style="--i:' + (i++) + '">' + w + "</span></span>";
      }).join(" ");
    }).join("");
  });

  /* ---------- Header: scrolled state, hide on scroll down ---------- */
  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".scroll-progress");
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
      var goingDown = y > lastY + 4;
      var goingUp = y < lastY - 4;
      if (goingDown && y > 420 && !root.classList.contains("nav-open") && !document.querySelector(".has-menu.open")) header.classList.add("is-hidden");
      else if (goingUp || y < 420) header.classList.remove("is-hidden");
    }
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    }
    parallax(y);
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = root.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("nav-open")) { root.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); toggle.focus(); }
    });
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () { root.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Dropdown menus (Services, Products) ---------- */
  var menus = Array.prototype.slice.call(document.querySelectorAll(".has-menu"));
  var hoverNav = window.matchMedia("(hover: hover) and (min-width: 901px)");
  function setMenu(li, open) {
    li.classList.toggle("open", open);
    var b = li.querySelector(".menu-btn");
    if (b) b.setAttribute("aria-expanded", String(open));
  }
  function closeMenus(except) { menus.forEach(function (m) { if (m !== except) setMenu(m, false); }); }
  menus.forEach(function (li) {
    var btn = li.querySelector(".menu-btn");
    var timer, hoverOpened = false;
    btn.addEventListener("click", function () {
      // A click right after hover-open should keep it open, not toggle it shut.
      if (hoverOpened) { hoverOpened = false; setMenu(li, true); return; }
      var open = !li.classList.contains("open");
      closeMenus(li);
      setMenu(li, open);
    });
    li.addEventListener("mouseenter", function () {
      if (!hoverNav.matches) return;
      clearTimeout(timer);
      if (!li.classList.contains("open")) { hoverOpened = true; setTimeout(function () { hoverOpened = false; }, 400); }
      closeMenus(li);
      setMenu(li, true);
    });
    li.addEventListener("mouseleave", function () {
      if (!hoverNav.matches) return;
      timer = setTimeout(function () { setMenu(li, false); }, 180);
    });
    li.addEventListener("focusout", function (e) {
      if (hoverNav.matches && !li.contains(e.relatedTarget)) setMenu(li, false);
    });
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".has-menu")) closeMenus(); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var open = document.querySelector(".has-menu.open");
    if (open) { setMenu(open, false); open.querySelector(".menu-btn").focus(); }
  });
  if (toggle) toggle.addEventListener("click", function () { if (!root.classList.contains("nav-open")) closeMenus(); });

  /* ---------- Clone shared dashboard mockups ---------- */
  document.querySelectorAll("[data-mock]").forEach(function (slot) {
    var tpl = document.getElementById("mock-" + slot.getAttribute("data-mock"));
    if (tpl) slot.appendChild(tpl.content.cloneNode(true));
  });

  /* ---------- Reveal on scroll ---------- */
  document.querySelectorAll("[data-stagger-children]").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty("--stagger", i);
    });
  });
  var revealEls = document.querySelectorAll(".reveal, .reveal-scale, [data-inview]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Count-up numbers ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
    if (reduceMotion) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    var start = performance.now();
    var dur = 1600;
    (function step(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(2, -10 * p);
      el.textContent = prefix + (target * (p === 1 ? 1 : eased)).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { countUp(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(countUp);
  }

  /* ---------- Subtle 3D tilt on media cards ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      var raf = 0;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          el.style.transform = "perspective(900px) rotateY(" + (x * 6) + "deg) rotateX(" + (-y * 6) + "deg) translateY(-6px)";
        });
      });
      el.addEventListener("pointerleave", function () {
        cancelAnimationFrame(raf);
        el.style.transform = "";
      });
    });
  }

  /* ---------- Silk wave (animates the Figma artwork) ---------- */
  var waves = [];
  function buildWave(host) {
    var key = host.getAttribute("data-wave");
    var markup = window.G2W_WAVES && window.G2W_WAVES[key];
    if (!markup) return;
    host.innerHTML = markup;
    var svg = host.querySelector("svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var paths = Array.prototype.slice.call(svg.querySelectorAll("path"));
    var shapes = paths.map(function (p, index) {
      var id = p.getAttribute("id") || "";
      var d = p.getAttribute("d");
      // tokens: commands and numbers; remember which numbers are y-values of an (x, y) pair
      var tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
      var nums = [];
      var cmd = "";
      var pairPos = 0;
      tokens.forEach(function (t, ti) {
        if (/[a-zA-Z]/.test(t)) { cmd = t; pairPos = 0; return; }
        var v = parseFloat(t);
        var role = "x";
        if (cmd === "V" || cmd === "v") role = "y";
        else if (cmd === "H" || cmd === "h") role = "x";
        else { role = pairPos % 2 === 0 ? "x" : "y"; pairPos++; }
        nums.push({ ti: ti, v: v, role: role });
      });
      // attach x to each y for the displacement function
      var lastX = 0;
      nums.forEach(function (n) { if (n.role === "x") lastX = n.v; else n.x = lastX; });
      return {
        el: p, tokens: tokens, nums: nums,
        still: id === "Fade",
        phase: index * 0.085,
        amp: /Ribbon/.test(id) ? 1 : /Edge/.test(id) ? 0.6 : 1.15
      };
    });
    var wave = { host: host, svg: svg, shapes: shapes, visible: true, offset: 0, speed: parseFloat(host.getAttribute("data-speed") || "1") };
    waves.push(wave);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) { wave.visible = entries[0].isIntersecting; }).observe(host);
    }
    render(wave, 0);
  }
  function render(wave, t) {
    wave.shapes.forEach(function (s) {
      if (s.still) return;
      var out = s.tokens.slice();
      s.nums.forEach(function (n) {
        if (n.role !== "y" || n.v >= 598) { out[n.ti] = n.v; return; } // leave the flat bottom edge alone
        var x = n.x;
        var dy = s.amp * (
          11 * Math.sin(x * 0.0042 + t * 0.55 + s.phase) +
          8 * Math.sin(x * 0.0019 - t * 0.33 + s.phase * 0.6) +
          3 * Math.sin(x * 0.011 + t * 0.9 + s.phase * 2)
        );
        out[n.ti] = (n.v + dy).toFixed(1);
      });
      s.el.setAttribute("d", out.join(" "));
    });
  }
  document.querySelectorAll("[data-wave]").forEach(buildWave);

  function parallax(y) {
    waves.forEach(function (w) {
      if (!w.host.hasAttribute("data-parallax")) return;
      w.host.style.transform = "translate3d(0," + (y * 0.18).toFixed(1) + "px,0)";
    });
  }

  /* ---------- Line ribbon (contact hero + client backdrop) ---------- */
  var ribbons = [];
  function buildRibbon(host) {
    var canvas = document.createElement("canvas");
    host.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var faint = host.hasAttribute("data-faint");
    var r = { host: host, canvas: canvas, ctx: ctx, faint: faint, visible: true, w: 0, h: 0 };
    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      r.w = host.clientWidth; r.h = host.clientHeight;
      canvas.width = Math.round(r.w * dpr); canvas.height = Math.round(r.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener("resize", size);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) { r.visible = entries[0].isIntersecting; }).observe(host);
    }
    ribbons.push(r);
    drawRibbon(r, 0);
  }
  function drawRibbon(r, t) {
    var ctx = r.ctx, w = r.w, h = r.h;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    var grad = ctx.createLinearGradient(0, 0, w, 0);
    if (r.faint) {
      grad.addColorStop(0, "rgba(120,200,120,0.55)");
      grad.addColorStop(0.5, "rgba(120,170,230,0.45)");
      grad.addColorStop(1, "rgba(150,210,140,0.55)");
    } else {
      grad.addColorStop(0, "#3aa7e0");
      grad.addColorStop(0.18, "#c2d93a");
      grad.addColorStop(0.36, "#9fd24a");
      grad.addColorStop(0.58, "#8b56c7");
      grad.addColorStop(0.78, "#6b6fd6");
      grad.addColorStop(1, "#2f8fe0");
    }
    ctx.strokeStyle = grad;
    var lines = r.faint ? 26 : 44;
    var mid = h * 0.5;
    var spread = r.faint ? h * 0.42 : h * 0.46;
    var step = Math.max(6, w / 140);
    for (var i = 0; i < lines; i++) {
      var k = i / (lines - 1) - 0.5;
      ctx.globalAlpha = r.faint ? 0.35 : 0.55 + 0.45 * (1 - Math.abs(k) * 2);
      ctx.lineWidth = r.faint ? 0.8 : 1;
      if (r.faint) ctx.setLineDash([10, 7]); else ctx.setLineDash([]);
      ctx.beginPath();
      for (var x = -10; x <= w + 10; x += step) {
        var u = x / w;
        var base = mid + Math.sin(u * Math.PI * 2.1 + t * 0.45) * h * 0.18 + Math.sin(u * Math.PI * 4.3 - t * 0.3) * h * 0.06;
        var twist = Math.cos(u * Math.PI * 2.6 - t * 0.5 + 0.8);
        var y = base + k * spread * twist + Math.sin(u * 18 + t + i * 0.15) * 1.2;
        if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  document.querySelectorAll("[data-ribbon]").forEach(buildRibbon);

  /* one shared animation loop for waves + ribbons */
  if (!reduceMotion && (waves.length || ribbons.length)) {
    var t0 = performance.now();
    var last = 0;
    (function loop(now) {
      requestAnimationFrame(loop);
      if (document.hidden || now - last < 1000 / 45) return; // ~45fps is plenty for slow silk motion
      last = now;
      var t = (now - t0) / 1000;
      waves.forEach(function (w) { if (w.visible) render(w, t * w.speed); });
      ribbons.forEach(function (r) { if (r.visible) drawRibbon(r, t); });
    })(t0);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    btn.addEventListener("click", function () {
      var open = !item.classList.contains("open");
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }
  document.querySelectorAll("[data-soon]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); toast(a.textContent.trim() + " is coming soon."); });
  });

  /* ---------- Contact form ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var params = new URLSearchParams(location.search);
    var topic = params.get("topic");
    var msg = form.querySelector("#f-message");
    if (topic && msg && !msg.value) {
      var presets = {
        demo: "Hi go2ways team, I'd like to book a demo for my team.",
        trial: "Hi go2ways team, I'd like to start a free trial.",
        partner: "Hi go2ways team, I'm interested in partnering with you."
      };
      var services = {
        "ibm-maximo": "IBM Maximo Services",
        "mas-migration": "MAS Migration",
        "enterprise-integration": "Enterprise Integration",
        "cloud-infrastructure": "Cloud & Infrastructure",
        "managed-support": "Managed Support",
        "tririga": "TRIRIGA Services",
        "mobile-development": "Mobile Development & Enablement",
        "consulting-advisory": "Consulting & Architectural Advisory"
      };
      if (services[topic]) presets[topic] = "Hi go2ways team, I'd like to talk about " + services[topic] + ".";
      if (presets[topic]) msg.value = presets[topic];
    }

    var rules = {
      name: function (v) { return v.trim().length >= 2 || "Please enter your name."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid work email."; },
      phone: function (v) { return !v.trim() || /^[+()\d\s-]{7,}$/.test(v.trim()) || "Please enter a valid phone number."; },
      message: function (v) { return v.trim().length >= 10 || "Tell us a little more (at least 10 characters)."; }
    };
    function check(input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var res = rule(input.value);
      var field = input.closest(".field");
      var err = field.querySelector(".err");
      var ok = res === true;
      field.classList.toggle("invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      if (err) err.textContent = ok ? "" : res;
      return ok;
    }
    form.querySelectorAll(".field input, .field textarea").forEach(function (input) {
      input.addEventListener("blur", function () { if (input.value) check(input); });
      input.addEventListener("input", function () { if (input.closest(".field").classList.contains("invalid")) check(input); });
    });

    var success = document.querySelector(".form-success");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var inputs = Array.prototype.slice.call(form.querySelectorAll(".field input, .field textarea"));
      var firstBad = null;
      inputs.forEach(function (input) {
        var field = input.closest(".field");
        field.classList.remove("invalid"); void field.offsetWidth; // restart shake
        if (!check(input) && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); return; }

      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.classList.add("loading");
      var data = Object.fromEntries(new FormData(form).entries());
      if (topic) data.topic = topic;

      // Where messages go: the site server (server/contact.mjs or a Cloudflare function) when
      // there is one; on plain page hosting like GitHub Pages, straight to the Google Sheet.
      var endpoint = form.getAttribute("data-endpoint");
      var sheetUrl = form.getAttribute("data-sheet-url");
      var staticHost = /\.github\.io$/.test(location.hostname) || location.protocol === "file:";

      function showFieldErrors(body, status) {
        var errs = (body && body.errors) || {}, first = null;
        Object.keys(errs).forEach(function (name) {
          var input = form.querySelector('[name="' + name + '"]');
          if (!input) return;
          var field = input.closest(".field");
          field.classList.add("invalid");
          input.setAttribute("aria-invalid", "true");
          var err = field.querySelector(".err");
          if (err) err.textContent = errs[name];
          if (!first) first = input;
        });
        if (first) first.focus();
        var e = new Error((body && body.error) || "status " + status);
        e.userMessage = body && body.error;
        e.fieldErrors = !!first;
        return e;
      }
      function postToServer() {
        return fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) {
            if (r.ok) return;
            if (r.status === 404 || r.status === 405 || r.status === 501) { var e = new Error("no server"); e.noServer = true; throw e; }
            return r.json().catch(function () { return {}; }).then(function (body) { throw showFieldErrors(body, r.status); });
          }, function () { var e = new Error("no server"); e.noServer = true; throw e; });
      }
      function postToSheet() {
        // text/plain keeps this a "simple" request that Google accepts from any website.
        return fetch(sheetUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ message: data }) })
          .then(function (r) { return r.json(); })
          .then(function (out) { if (!out || !out.ok) throw showFieldErrors(out, 0); });
      }

      var send;
      if (staticHost && sheetUrl) send = postToSheet();
      else if (endpoint) send = postToServer().catch(function (err) { if (err.noServer && sheetUrl) return postToSheet(); throw err; });
      else send = new Promise(function (r) { setTimeout(r, 1100); });

      send.then(function () {
        var nameEl = success.querySelector("[data-name]");
        if (nameEl) nameEl.textContent = data.name.split(" ")[0];
        success.classList.add("show");
        form.reset();
      }).catch(function (err) {
        if (err && err.fieldErrors) return;
        toast((err && err.userMessage) || "Something went wrong. Please email support@go2ways.com.");
      }).then(function () {
        btn.disabled = false; btn.classList.remove("loading");
      });
    });
    var again = document.querySelector("[data-send-another]");
    if (again) again.addEventListener("click", function () { success.classList.remove("show"); form.querySelector("input").focus(); });
  }

  onScroll();
})();
