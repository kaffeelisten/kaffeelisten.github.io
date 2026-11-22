// Kaffeelisten landing page.
// The live kiosk: a rebuild of the app's member flow with invented sample data,
// drawn at the device's own viewport and scaled into the frame. Nothing is stored or sent.
(function () {
  "use strict";

  // ── Sample data (invented) ──
  var FIRMS = [
    { name: "Beispiel AG", color: "#C2410C", people: ["Anna B.", "Paul B."] },
    { name: "Muster e.V.", color: "#BE185D", people: ["Lea K."] },
    { name: "Musterfirma GmbH", color: "#7C3AED", people: ["Paula R.", "Max M.", "Lena S.", "Jonas K."], firm: true },
    { name: "Studio Ahorn", color: "#B45309", people: ["Mia A.", "Noah A."] },
    { name: "Werkstatt Nord", color: "#15803D", people: ["Tom W."] }
  ];
  var ITEMS = {
    Kaffee: [["Kaffee", 40], ["Cappuccino", 50], ["Espresso", 30], ["Latte Macchiato", 50]],
    "Getränke": [["Wasser", 50], ["Apfelschorle", 80]],
    Snacks: [["Müsliriegel", 60]]
  };
  var NAME_COLORS = ["#15803D", "#BE185D", "#7C3AED", "#7C3AED"];

  // The brand mark: the coffee ring traced out of the style master, one path, inked
  // with currentColor. It deliberately no longer matches the product repo's
  // CappuccinoMark, which still draws the rejected cup and is a separate change.
  var MARK = '<svg class="k-mark" viewBox="0 0 239 241" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M 195.00 132.75 189.75 135.75 186.50 141.25 186.50 150.00 187.50 153.00 192.00 157.50 196.00 159.50 199.75 159.50 206.75 156.50 211.25 151.00 211.25 140.25 209.25 136.00 203.75 132.75 Z M 108.00 11.75 106.75 12.75 103.00 12.75 97.00 15.75 95.50 17.25 95.50 23.25 93.25 25.75 88.00 25.75 84.75 23.75 82.00 23.75 74.75 25.75 67.00 25.75 63.00 27.75 55.50 35.25 55.25 38.75 46.00 38.75 44.00 39.75 37.50 46.00 33.75 51.75 29.00 52.75 22.50 57.25 16.50 67.25 16.50 73.00 6.50 84.25 6.50 89.00 8.50 93.25 9.50 107.25 5.50 111.25 5.50 118.00 3.50 123.25 3.50 129.00 5.75 135.25 5.50 148.00 9.50 153.25 10.50 163.00 14.50 171.00 17.50 174.25 20.50 183.00 29.00 190.50 35.25 190.00 35.50 201.00 37.50 204.25 48.00 211.50 55.25 211.00 55.50 216.00 57.50 219.25 69.00 227.50 77.00 230.50 82.75 230.50 93.00 236.50 109.75 237.50 113.25 235.00 114.00 231.50 124.25 231.50 124.50 234.00 128.00 236.50 146.75 236.50 162.00 228.50 169.75 228.50 178.75 223.50 184.75 215.50 194.00 211.50 208.25 197.25 213.25 189.00 213.25 184.25 216.25 182.25 219.25 177.00 220.25 168.75 225.25 166.25 231.25 155.00 231.25 149.25 232.25 148.00 232.25 143.25 234.25 139.00 234.25 129.25 235.25 128.00 234.25 99.25 229.25 89.00 226.25 79.25 220.25 74.50 220.25 66.25 214.25 61.00 212.25 58.00 211.25 53.25 205.75 48.50 207.25 38.25 203.75 34.75 198.00 33.75 195.75 35.00 191.00 35.00 186.00 33.75 181.75 27.75 179.75 26.75 174.50 26.75 171.75 23.75 157.75 15.75 142.00 14.75 133.75 11.75 122.00 11.75 118.75 13.00 Z M 31.50 64.00 36.50 64.25 36.25 75.75 30.25 75.50 30.25 66.25 Z M 116.50 23.00 121.25 23.00 128.00 29.50 139.75 29.50 141.50 38.00 146.00 42.50 151.00 44.50 158.75 44.50 164.75 42.50 168.00 39.50 174.75 39.50 178.75 44.50 185.50 50.00 188.50 55.00 193.00 59.50 197.00 61.50 204.25 61.00 206.50 64.00 206.50 79.00 210.50 84.25 210.50 91.25 205.50 100.25 206.50 115.00 211.75 121.50 217.50 125.00 217.50 137.00 220.50 139.25 220.50 144.25 217.50 147.25 216.50 151.25 217.50 168.50 212.75 170.75 209.75 174.75 195.75 180.75 191.50 185.25 189.50 190.00 182.50 195.00 178.75 201.75 167.00 201.75 163.75 203.75 156.75 211.75 151.00 211.75 147.75 209.75 144.00 209.75 138.75 212.75 131.75 219.75 123.00 219.75 119.25 222.25 114.50 222.25 113.00 219.75 109.75 217.75 99.00 216.75 94.75 214.75 87.00 214.75 83.75 210.75 77.75 207.75 70.00 207.75 65.75 209.75 59.75 209.75 60.25 200.25 49.00 187.75 45.00 185.75 39.50 188.25 34.25 188.00 34.25 175.00 35.25 174.00 35.25 170.25 26.50 163.50 26.50 158.75 29.25 156.00 30.25 151.25 28.00 146.75 22.75 144.50 22.75 139.75 26.25 137.00 25.25 123.25 22.75 120.50 22.75 115.75 26.25 113.25 28.25 110.00 28.25 100.75 33.25 96.25 37.00 90.50 39.75 90.50 43.75 88.50 49.25 83.00 50.25 73.25 52.00 71.50 59.75 68.50 63.25 65.00 66.25 59.00 65.25 47.00 69.00 43.50 86.75 36.50 90.25 33.00 90.50 30.50 100.75 31.50 108.00 27.50 114.75 26.50 Z M 195.50 3.50 196.50 7.25 203.00 11.50 207.75 11.50 209.75 10.50 212.25 7.00 212.25 3.50 Z"/></svg>';
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
      h = '<div class="k-start">' + MARK + '<div><h3>Kaffeelisten</h3><p>Kaffee, Getränke, Snacks. Kurz tippen, fertig.</p></div>' +
        '<button class="k-btn k-btn--primary" type="button" data-a="start">Eintrag starten</button><small>Musterhaus · Administration · Datenschutz</small></div>';
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
