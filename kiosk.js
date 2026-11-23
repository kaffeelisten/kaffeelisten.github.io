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

  // The app's own CappuccinoMark (apps/web/src/components/CappuccinoMark.tsx), unchanged.
  var CUP = '<svg class="k-mark" viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M 345.2 382.4 C 293.7 383.4 228.7 402.8 220.2 459.7 C 222.7 490.0 218.8 523.8 222.0 556.5 C 225.3 575.6 213.8 585.8 221.9 603.0 C 221.8 642.1 227.0 683.0 232.1 716.7 C 236.9 731.1 253.3 753.9 239.3 761.3 C 244.0 774.2 252.0 795.8 266.5 793.6 C 302.6 839.7 349.4 886.5 414.4 874.4 C 470.4 870.3 530.9 870.8 585.2 874.2 C 603.4 877.6 625.0 863.9 643.6 864.6 C 667.6 854.8 689.8 837.1 705.8 814.4 C 722.7 809.4 709.8 793.9 721.5 781.6 C 726.1 755.1 763.1 768.5 783.7 761.1 C 846.4 758.3 900.9 708.2 909.5 646.7 C 934.0 609.7 920.5 558.1 886.1 531.6 C 856.3 492.4 798.6 492.1 757.2 504.5 C 750.8 492.4 757.5 469.5 756.2 453.3 C 759.7 407.2 703.0 398.8 668.2 394.4 C 573.8 389.6 475.9 387.5 381.0 391.1 C 374.7 380.9 358.0 382.9 345.2 382.4 Z M 799.8 531.6 C 871.1 517.5 917.0 610.9 873.3 662.6 C 842.9 707.0 791.4 733.2 741.1 734.6 C 737.0 720.3 750.0 698.4 750.4 680.0 C 758.7 636.8 756.0 590.1 755.2 547.1 C 765.8 536.5 784.1 534.2 799.8 531.6 Z M 727.7 488.8 C 736.5 495.5 725.4 519.2 726.4 533.5 C 725.6 563.9 723.1 599.0 734.8 623.6 C 726.5 708.7 700.3 804.3 619.3 843.9 C 605.2 847.0 635.1 827.3 615.5 829.8 C 549.8 853.1 466.9 854.3 395.7 848.4 C 396.9 840.3 390.4 834.1 378.6 833.6 C 340.4 826.5 301.9 806.7 288.3 767.2 C 275.7 749.7 275.3 718.5 255.7 711.8 C 255.3 703.1 264.4 693.7 258.6 680.5 C 253.5 619.7 241.2 557.2 242.7 496.7 C 252.0 493.6 268.5 510.1 282.4 511.8 C 366.0 532.0 460.6 533.6 549.3 535.0 C 613.8 532.1 674.7 516.9 727.7 488.8 Z M 447.8 409.6 C 544.3 408.8 643.5 406.8 722.0 451.4 C 733.9 467.2 701.7 473.6 690.9 463.1 C 563.9 425.7 403.1 422.1 280.0 470.3 C 265.8 485.6 238.1 461.7 260.8 450.3 C 313.0 412.8 379.9 409.6 447.8 409.6 Z M 617.2 216.6 C 580.6 229.6 580.7 279.2 603.3 304.2 C 619.4 330.5 579.3 348.3 582.5 370.6 C 603.4 379.7 628.0 348.0 630.3 327.3 C 639.9 295.2 591.9 269.5 622.0 243.0 C 627.7 234.2 634.5 213.5 617.2 216.6 Z M 436.2 176.6 C 392.9 187.9 378.8 244.6 405.9 277.6 C 418.1 297.5 430.3 330.2 404.4 347.1 C 387.4 361.4 410.5 375.2 421.8 359.0 C 457.7 335.5 453.5 284.5 424.7 258.0 C 403.3 237.2 424.0 212.5 441.3 198.5 C 447.8 190.9 453.8 173.2 436.2 176.6 Z M 553.3 129.6 C 501.0 150.8 489.3 217.1 508.4 265.9 C 508.0 286.8 520.7 305.1 501.7 318.0 C 489.9 325.7 477.4 350.8 499.5 346.9 C 545.4 323.6 554.2 264.0 530.0 223.5 C 516.2 195.4 540.0 171.7 558.4 154.1 C 563.7 145.1 573.7 126.1 553.3 129.6 Z"/></svg>';
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
