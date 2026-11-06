// The tablet preview: the member flow from the app, with invented sample data.
// Nothing leaves the page and nothing is stored.
(function () {
  "use strict";

  var firms = [
    { name: "Musterfirma GmbH", people: ["Erika M.", "Max M."] },
    { name: "Beispiel AG", people: ["Jonas B.", "Lea B."] },
    { name: "Werkstatt Nord", people: ["Anna W."] }
  ];
  var drinks = ["Kaffee", "Espresso", "Cappuccino", "Wasser"];

  var stepEl = document.getElementById("t-step");
  var titleEl = document.getElementById("t-title");
  var rowsEl = document.getElementById("t-rows");
  var liveEl = document.getElementById("t-live");
  if (!stepEl || !titleEl || !rowsEl) return;

  var state = { firm: null, person: null, drink: null };
  var resetTimer = null;
  var started = false;

  function tile(label, onClick, variant) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tile" + (variant ? " tile--" + variant : "");
    b.textContent = label;
    b.addEventListener("click", onClick);
    return b;
  }

  function render(step, title, nodes) {
    stepEl.textContent = step;
    titleEl.textContent = title;
    rowsEl.replaceChildren.apply(rowsEl, nodes);
    if (liveEl) liveEl.textContent = title;
    // Move focus only after the visitor has started, so the page does not jump on load.
    if (started) titleEl.focus({ preventScroll: true });
  }

  function showFirms() {
    state = { firm: null, person: null, drink: null };
    render("Schritt 1 von 3", "Wer bist du?", firms.map(function (f, i) {
      return tile(f.name, function () { started = true; state.firm = f; showPeople(); }, i === 0 ? "accent" : "");
    }));
  }

  function showPeople() {
    var nodes = [tile("Für die Firma buchen", function () { state.person = "Firma"; showDrinks(); }, "accent")];
    state.firm.people.forEach(function (p) {
      nodes.push(tile(p, function () { state.person = p; showDrinks(); }));
    });
    nodes.push(tile("Zurück", showFirms, "quiet"));
    render("Schritt 2 von 3", "Schön, dich zu sehen.", nodes);
  }

  function showDrinks() {
    var nodes = drinks.map(function (d, i) {
      return tile(d, function () { state.drink = d; showConfirm(); }, i === 0 ? "accent" : "");
    });
    nodes.push(tile("Zurück", showPeople, "quiet"));
    render("Schritt 3 von 3", "Was hast du genommen?", nodes);
  }

  function showConfirm() {
    var dl = document.createElement("dl");
    dl.className = "summary";
    [["Firma", state.firm.name], ["Person", state.person === "Firma" ? "für die Firma" : state.person], ["Getränk", state.drink]]
      .forEach(function (row) {
        var div = document.createElement("div");
        var dt = document.createElement("dt");
        var dd = document.createElement("dd");
        dt.textContent = row[0];
        dd.textContent = row[1];
        div.append(dt, dd);
        dl.appendChild(div);
      });
    render("Bestätigen", "Alles richtig?", [
      dl,
      tile("Buchen", showDone, "accent"),
      tile("Zurück", showDrinks, "quiet")
    ]);
  }

  function showDone() {
    var hint = document.createElement("p");
    hint.className = "note";
    hint.textContent = "Der Bildschirm setzt sich gleich zurück.";
    render("Fertig", "Gespeichert.", [hint]);
    clearTimeout(resetTimer);
    resetTimer = setTimeout(showFirms, 3500);
  }

  showFirms();
})();
