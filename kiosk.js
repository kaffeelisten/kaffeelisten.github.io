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
  var CUP = '<svg class="k-mark" viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M 616.3 214.7 C 578.9 227.7 578.0 279.2 601.6 305.3 C 618.8 332.1 570.8 349.6 581.9 373.8 C 611.2 379.1 636.8 342.4 631.9 312.6 C 633.0 287.9 597.0 266.6 623.0 245.1 C 630.0 235.1 638.1 209.4 616.3 214.7 Z M 436.2 174.4 C 388.7 185.3 377.3 249.1 406.8 283.5 C 419.2 302.5 425.0 333.2 401.4 347.3 C 386.2 363.6 410.0 377.7 422.2 361.8 C 459.5 337.8 456.4 283.8 425.8 255.9 C 404.5 235.1 428.8 212.2 443.7 199.3 C 451.8 190.7 455.3 169.4 436.2 174.4 Z M 553.2 127.6 C 498.5 148.3 487.8 218.3 507.0 268.7 C 508.4 289.3 515.0 307.6 496.2 320.9 C 479.6 329.0 483.3 359.5 503.7 347.2 C 548.4 323.0 554.9 260.7 530.7 219.5 C 518.9 191.7 545.8 171.7 560.7 154.4 C 565.0 146.6 576.0 125.8 557.0 127.1 C 555.8 127.3 554.5 127.4 553.2 127.6 Z M 564.2 17.4 C 523.3 19.0 494.1 46.0 460.8 65.2 C 451.6 75.1 426.1 100.2 454.9 100.0 C 487.6 102.5 517.4 86.6 547.5 101.7 C 598.6 111.6 635.5 147.7 653.1 190.9 C 672.7 209.5 677.9 240.0 709.8 244.2 C 736.0 252.5 757.4 268.3 771.7 289.8 C 804.3 305.3 811.9 345.0 815.7 378.8 C 832.7 396.3 834.0 425.1 836.5 449.9 C 856.3 483.9 896.1 495.9 915.0 530.8 C 934.2 558.9 949.1 601.4 931.8 636.8 C 913.8 701.4 881.6 773.4 804.6 779.0 C 776.0 781.3 747.5 793.3 720.8 797.6 C 717.5 784.2 729.5 761.0 750.8 766.9 C 820.2 767.1 895.1 732.5 907.6 659.5 C 922.1 630.0 933.2 589.5 912.2 559.1 C 884.1 513.9 834.4 484.7 780.0 497.7 C 767.0 501.6 750.9 506.3 756.6 486.2 C 759.0 456.9 764.7 418.5 729.0 407.8 C 664.7 380.1 584.6 394.4 512.5 387.0 C 469.1 386.3 423.7 389.8 382.6 388.6 C 369.1 373.9 334.5 382.9 313.6 383.9 C 266.9 387.9 207.9 423.9 220.0 477.2 C 215.7 506.5 222.1 539.7 219.8 568.1 C 209.1 568.6 199.8 545.3 187.3 538.7 C 156.3 513.6 116.9 495.5 76.8 490.7 C 61.0 504.0 84.0 529.2 80.3 549.6 C 85.1 620.8 137.8 679.8 203.6 702.1 C 217.0 709.4 240.9 724.0 236.9 740.0 C 223.6 732.6 207.8 710.9 189.5 703.9 C 143.0 677.1 76.4 679.8 30.5 703.8 C 25.7 725.3 53.1 735.6 61.5 753.9 C 97.7 811.3 175.2 831.5 238.6 806.2 C 256.0 806.0 269.9 790.9 279.1 812.0 C 293.4 830.4 253.1 822.2 242.4 830.7 C 207.9 844.7 175.1 863.7 160.2 894.8 C 172.4 930.4 218.0 935.1 250.5 943.4 C 275.1 958.7 296.9 982.0 330.0 977.0 C 359.1 981.2 385.6 956.8 409.7 979.8 C 437.9 992.2 473.9 985.9 500.0 1003.5 C 537.3 1011.6 568.9 998.4 597.1 978.9 C 629.7 971.0 662.6 994.4 695.4 980.4 C 718.4 977.1 733.9 959.5 756.2 954.6 C 781.1 939.0 801.8 913.4 829.1 897.2 C 847.5 884.1 877.8 884.9 889.9 861.7 C 906.4 832.2 936.7 810.9 942.3 774.9 C 967.4 753.8 982.4 725.2 989.1 692.4 C 1004.0 676.0 1001.3 653.1 1010.8 634.0 C 1019.7 621.8 1015.4 603.3 1022.9 592.2 C 1024.5 560.5 1025.1 528.2 1001.7 508.7 C 992.1 483.7 969.7 456.3 992.8 432.0 C 999.0 397.0 1016.0 355.4 998.0 321.4 C 992.2 298.0 980.9 274.1 962.3 257.6 C 947.8 223.4 905.5 226.9 882.9 201.8 C 861.6 193.7 833.8 200.4 817.4 182.6 C 799.6 172.3 794.8 147.8 771.8 144.7 C 747.3 128.0 749.4 92.6 725.2 73.0 C 695.6 32.5 636.0 48.5 598.1 21.6 C 587.7 18.1 576.2 15.7 564.2 17.4 Z M 802.8 532.6 C 872.5 522.2 915.2 615.3 869.0 664.8 C 840.4 704.8 791.2 730.5 743.7 732.5 C 740.5 717.4 752.2 694.7 753.0 675.6 C 761.1 635.6 756.9 587.3 757.5 547.3 C 769.4 537.8 787.1 535.4 802.8 532.6 Z M 724.9 492.6 C 734.4 496.7 724.0 521.5 724.2 534.4 C 723.9 566.1 721.9 602.3 732.5 627.3 C 724.1 705.6 701.4 788.0 635.6 832.6 C 630.9 828.1 623.0 821.5 612.6 828.7 C 550.3 850.7 473.5 851.5 405.5 847.5 C 401.2 827.7 369.4 834.0 352.7 823.9 C 297.5 812.5 286.8 749.4 263.7 710.1 C 257.9 652.8 249.2 585.0 244.0 522.9 C 240.4 508.9 244.0 491.0 258.9 504.2 C 337.4 536.9 432.3 530.1 521.5 537.0 C 595.7 537.9 664.4 523.5 724.9 492.6 Z M 418.8 411.6 C 524.8 411.7 637.3 403.6 722.4 454.9 C 723.7 471.0 698.4 467.0 687.2 459.8 C 559.5 424.4 394.6 420.0 273.0 471.4 C 255.9 478.6 246.9 454.9 266.1 448.8 C 310.1 419.7 363.3 412.9 418.8 411.6 Z"/></svg>';
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
