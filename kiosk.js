// Kaffeelisten landing page.
// 1. The device switch in "So geht's".
// 2. The live kiosk: a rebuild of the app's member flow with invented sample data,
//    drawn at the device's own viewport and scaled into the frame. Nothing is stored or sent.
(function () {
  "use strict";

  // ── Device switch ──
  var steps = document.querySelector(".steps");
  // On a phone, start with the phone screens.
  if (steps && window.matchMedia("(max-width: 600px)").matches) {
    steps.setAttribute("data-device", "phone");
    document.querySelectorAll(".seg button").forEach(function (o) { o.setAttribute("aria-pressed", String(o.getAttribute("data-device") === "phone")); });
  }
  document.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".seg button").forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
      if (steps) steps.setAttribute("data-device", b.getAttribute("data-device"));
    });
  });

  // ── Sample data (invented) ──
  var FIRMS = [
    { name: "Beispiel AG", color: "#C2410C", people: ["Anna B.", "Paul B."] },
    { name: "Muster e.V.", color: "#BE185D", people: ["Lea K."] },
    { name: "Musterfirma GmbH", color: "#7C3AED", people: ["Erika M.", "Max M.", "Lena S.", "Jonas K."], firm: true },
    { name: "Studio Ahorn", color: "#B45309", people: ["Mia A.", "Noah A."] },
    { name: "Werkstatt Nord", color: "#15803D", people: ["Tom W."] }
  ];
  var ITEMS = {
    Kaffee: [["Kaffee", 40], ["Cappuccino", 50], ["Espresso", 30], ["Latte Macchiato", 50]],
    "Getränke": [["Wasser", 50], ["Apfelschorle", 80]],
    Snacks: [["Müsliriegel", 60]]
  };
  var NAME_COLORS = ["#15803D", "#BE185D", "#7C3AED", "#7C3AED"];

  var CUP = '<svg viewBox="0 0 64 56" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 22h38v14a14 14 0 0 1-14 14h-10A14 14 0 0 1 8 36z"/><path d="M46 26h4a7 7 0 0 1 0 14h-5"/><path d="M20 6c-2 3 2 6 0 9M27 4c-2 3 2 6 0 9M34 6c-2 3 2 6 0 9"/></svg>';
  var MUG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/></svg>';
  var ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  var BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  var OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var UNDO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>';

  function euro(c) { return (c / 100).toFixed(2).replace(".", ",") + " €"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }

  function Kiosk(host) {
    this.host = host;
    this.el = document.createElement("div");
    this.el.className = "kiosk";
    this.live = document.createElement("p");
    this.live.className = "visually-hidden";
    this.live.setAttribute("aria-live", "polite");
    host.appendChild(this.el);
    host.appendChild(this.live);
    this.reset();
    var self = this;
    var fit = function () { self.el.style.setProperty("--k", host.clientWidth / self.el.offsetWidth); };
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(host);
    window.addEventListener("resize", fit);
    fit();
    this.el.addEventListener("click", function (e) {
      var t = e.target.closest("[data-a]");
      if (t) self.act(t.getAttribute("data-a"), t.getAttribute("data-v"));
    });
  }

  Kiosk.prototype.reset = function () {
    clearTimeout(this.timer);
    this.firm = null; this.person = null; this.cart = {}; this.cat = "Kaffee";
    this.go("start");
  };

  Kiosk.prototype.top = function (n) {
    var dots = "";
    for (var i = 0; i < 4; i++) dots += '<i class="' + (i < n ? "on" : "") + (i === n ? " cur" : "") + '"></i>';
    return '<div class="k-top"><button class="k-back" type="button" data-a="back">' + BACK + 'Zurück</button><div class="k-dots" aria-hidden="true">' + dots +
      '</div><div class="k-tenant">Musterhaus ·<br>Kaffeelisten</div></div>';
  };

  Kiosk.prototype.go = function (step, focus) {
    this.step = step;
    var h = "", s = this, label = "";
    if (step === "start") {
      label = "Startbildschirm";
      h = '<div class="k-start">' + CUP + '<div><h3>Kaffeelisten</h3><p>Kaffee, Getränke, Snacks. Kurz tippen, fertig.</p></div>' +
        '<button class="k-btn k-btn--primary" type="button" data-a="start">Eintrag starten</button><small>Musterhaus · Verwaltung · Datenschutz</small></div>';
    } else if (step === "firma") {
      label = "Wer bist du?";
      h = this.top(1) + '<div class="k-body"><h3 class="k-h">Wer bist du?</h3><p class="k-sub">Tippe auf dein Unternehmen.</p><div class="k-list">' +
        FIRMS.map(function (f, i) {
          return '<button class="k-tile" type="button" data-a="firm" data-v="' + i + '"><b>' + esc(f.name) + '</b><span class="arr" style="background:' + f.color + '18;color:' + f.color + '">' + ARR + "</span></button>";
        }).join("") + "</div></div>";
    } else if (step === "name") {
      var f = this.firm;
      label = "Schön, dich zu sehen.";
      h = this.top(2) + '<div class="k-body"><p class="k-kicker">' + esc(f.name) + '</p><h3 class="k-h">Schön, dich zu sehen.</h3><p class="k-sub">Wähle deinen Namen.</p><div class="k-list">' +
        (f.firm ? '<button class="k-tile" type="button" data-a="person" data-v="-1"><b>Für die Firma buchen<small>Gemeinsames Konto – wird ' + esc(f.name) + ' berechnet</small></b><span class="arr" style="background:#BE185D18;color:#BE185D">' + ARR + '</span></button><p class="k-or">Oder für dich selbst</p>' : "") +
        f.people.map(function (p, i) {
          var c = NAME_COLORS[i % NAME_COLORS.length];
          return '<button class="k-tile" type="button" data-a="person" data-v="' + i + '"><b>' + esc(p) + '</b><span class="arr" style="background:' + c + '18;color:' + c + '">' + ARR + "</span></button>";
        }).join("") + '<p class="k-add">+&nbsp; Ich bin noch nicht dabei</p></div></div>';
    } else if (step === "item") {
      label = "Was hast du genommen?";
      var count = 0, total = 0;
      Object.keys(this.cart).forEach(function (k) { count += s.cart[k].q; total += s.cart[k].q * s.cart[k].p; });
      h = this.top(3) + '<div class="k-body k-body--wide"><p class="k-kicker">' + esc(this.who()) + " · " + esc(this.firm.name) + '</p><h3 class="k-h">Was hast du genommen?</h3><div class="k-tabs">' +
        Object.keys(ITEMS).map(function (c) { return '<button class="k-tab' + (c === s.cat ? " on" : "") + '" type="button" data-a="cat" data-v="' + c + '">' + c + "</button>"; }).join("") +
        '</div><div class="k-grid">' + ITEMS[this.cat].map(function (it) {
          var q = s.cart[it[0]] ? s.cart[it[0]].q : 0;
          return '<button class="k-item' + (q ? " sel" : "") + '" type="button" data-a="item" data-v="' + it[0] + '" aria-pressed="' + (q > 0) + '"><span class="cup">' + MUG + "</span><b>" + it[0] + "</b><span>" + euro(it[1]) + "</span>" +
            (q ? '<span class="k-qty"><b class="k-step" data-a="minus" data-v="' + it[0] + '" aria-label="Weniger">−</b><i>' + q + '</i><b class="k-step" data-a="plus" data-v="' + it[0] + '" aria-label="Mehr">+</b></span>' : "") + "</button>";
        }).join("") + '</div></div><div class="k-bar"><span class="count">' + (count ? count + " Artikel · " + euro(total) : "Nichts ausgewählt") + "</span>" +
        (count ? '<button class="k-btn k-btn--secondary" type="button" data-a="clear">Auswahl löschen</button>' : "") +
        '<button class="k-btn k-btn--primary" type="button" data-a="next"' + (count ? "" : " disabled style=\"opacity:.45;cursor:default\"") + ">Weiter</button></div>";
    } else if (step === "confirm") {
      label = "Alles richtig?";
      var lines = "", sum = 0;
      Object.keys(this.cart).forEach(function (k) { var c = s.cart[k]; sum += c.q * c.p; lines += '<div class="line"><dt>' + c.q + " × " + k + "</dt><dd>" + euro(c.q * c.p) + "</dd></div>"; });
      h = this.top(4) + '<div class="k-body"><h3 class="k-h">Alles richtig?</h3><dl class="k-sum"><div><dt>Person</dt><dd>' + esc(this.who()) + "</dd></div><div><dt>Unternehmen</dt><dd>" + esc(this.firm.name) +
        "</dd></div>" + lines + "<div><dt>Gesamt</dt><dd>" + euro(sum) + '</dd></div></dl></div><div class="k-bar"><span class="count"></span><button class="k-btn k-btn--secondary" type="button" data-a="back">Zurück</button><button class="k-btn k-btn--primary" type="button" data-a="save">' + OK + "Bestätigen</button></div>";
    } else if (step === "done") {
      label = "Gespeichert.";
      var what = Object.keys(this.cart).map(function (k) { return s.cart[k].q + "× " + k; }).join(", ");
      h = '<div class="k-done"><span class="ok">' + OK + '</span><p class="big">Gespeichert.</p><p class="small">' + esc(this.who()) + " · " + esc(this.firm.name) + " · " + esc(what) +
        '</p><button class="k-back" type="button" data-a="undo">' + UNDO + 'Rückgängig</button><p class="tiny">Zurück zur Startseite in 4 s</p></div>';
      this.timer = setTimeout(function () { s.reset(); }, 4000);
    }
    this.el.innerHTML = h;
    this.live.textContent = label;
    if (focus) {
      var first = this.el.querySelector(".k-tile, .k-item, .k-btn--primary");
      if (first) first.focus({ preventScroll: true });
    }
  };

  Kiosk.prototype.who = function () { return this.person === -1 ? "Für die Firma" : this.firm.people[this.person]; };

  Kiosk.prototype.act = function (a, v) {
    var s = this, prices = {};
    Object.keys(ITEMS).forEach(function (c) { ITEMS[c].forEach(function (it) { prices[it[0]] = it[1]; }); });
    if (a === "start") return this.go("firma", true);
    if (a === "firm") { this.firm = FIRMS[+v]; this.cart = {}; return this.go("name", true); }
    if (a === "person") { this.person = +v; return this.go("item", true); }
    if (a === "cat") { this.cat = v; return this.go("item"); }
    if (a === "item") { if (!this.cart[v]) this.cart[v] = { q: 1, p: prices[v] }; return this.go("item"); }
    if (a === "plus") { this.cart[v].q = Math.min(10, this.cart[v].q + 1); return this.go("item"); }
    if (a === "minus") { this.cart[v].q -= 1; if (this.cart[v].q <= 0) delete this.cart[v]; return this.go("item"); }
    if (a === "clear") { this.cart = {}; return this.go("item"); }
    if (a === "next") { if (Object.keys(this.cart).length) this.go("confirm", true); return; }
    if (a === "save") return this.go("done");
    if (a === "undo") { clearTimeout(this.timer); this.cart = {}; return this.go("item", true); }
    if (a === "back") {
      var prev = { firma: "start", name: "firma", item: "name", confirm: "item" }[this.step];
      if (prev) this.go(prev, true);
    }
    void s;
  };

  document.querySelectorAll("[data-kiosk]").forEach(function (host) { new Kiosk(host); });
})();
