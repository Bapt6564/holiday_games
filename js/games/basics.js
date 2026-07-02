/* ==================================================================
   games/basics.js — DÉS · TIMER · ROULETTE
   ------------------------------------------------------------------
   Chaque jeu est une fonction qui reçoit "back" (retour au menu).
   Modèle utilisé partout : on garde des variables locales (l'état du
   jeu), et une fonction draw() qui reconstruit l'écran à partir de
   ces variables. On appelle draw() à chaque changement.
   ================================================================== */

/* ------------------------------ 🎲 DÉS ------------------------------ */
function gameDice(back) {
  let count = load("des-count", 2);   // nombre de dés
  let faces = load("des-faces", 6);   // nombre de faces
  let results = [];                   // derniers tirages
  let rolling = false;                // animation en cours ?

  const box = el("div");
  mount(box);

  function roll() {
    rolling = true;
    let ticks = 0;
    // Animation : on tire au hasard toutes les 70 ms, 9 fois, puis stop.
    const iv = setInterval(() => {
      results = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * faces));
      draw();
      if (++ticks > 8) { clearInterval(iv); rolling = false; draw(); }
    }, 70);
  }

  function draw() {
    const total = results.reduce((a, b) => a + b, 0);
    box.innerHTML = "";
    box.append(
      backBar("Dés", back),
      el("div", { class: "row" },
        el("div", { class: "card center" },
          el("div", { class: "muted small mb-2" }, "Nombre de dés"),
          el("div", { class: "stepper" },
            el("button", { class: "round", onClick: () => { count = Math.max(1, count - 1); save("des-count", count); draw(); } }, "−"),
            el("span", { class: "big" }, String(count)),
            el("button", { class: "round", onClick: () => { count = Math.min(10, count + 1); save("des-count", count); draw(); } }, "+")
          )
        ),
        el("div", { class: "card center" },
          el("div", { class: "muted small mb-2" }, "Faces"),
          el("div", { class: "chips" },
            [4, 6, 8, 10, 12, 20, 100].map((f) =>
              el("button", { class: "chip" + (faces === f ? " on" : ""), onClick: () => { faces = f; save("des-faces", f); draw(); } }, String(f))
            )
          )
        )
      ),
      el("div", { class: "dice-area" },
        results.length === 0
          ? el("div", { class: "muted" }, "Lance pour voir 🎲")
          : results.map((r) => el("div", { class: "die" + (rolling ? " pulse" : "") }, String(r)))
      ),
      (results.length > 1 && !rolling)
        ? el("div", { class: "center total" }, "Total : ", el("b", {}, String(total)))
        : null,
      btn("🎲 Lancer !", roll, "primary")
    );
  }
  draw();
}

/* ----------------------------- ⏱️ TIMER ----------------------------- */
function gameTimer(back) {
  let duration = 60;      // durée choisie (secondes)
  let remaining = null;   // temps restant (null = pas démarré)
  let running = false;
  let handle = null;      // référence du minuteur pour pouvoir l'arrêter

  const box = el("div");
  mount(box);

  const fmt = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");

  // Boucle : chaque seconde, on retire 1 tant que ça tourne
  function tick() {
    if (!running) return;
    if (remaining > 0) { remaining -= 1; draw(); handle = setTimeout(tick, 1000); }
    else { running = false; draw(); }
  }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Timer", back));

    if (remaining === null) {
      // Écran de réglage
      const presets = [30, 60, 90, 120, 180, 300];
      box.append(
        el("div", { class: "presets" },
          presets.map((p) =>
            el("button", { class: "chip" + (duration === p ? " on" : ""), onClick: () => { duration = p; draw(); } }, fmt(p))
          )
        ),
        el("div", { class: "stepper mb-4" },
          el("button", { class: "round", onClick: () => { duration = Math.max(5, duration - 5); draw(); } }, "−"),
          el("span", { class: "timer-display", style: "font-size:40px;margin:0;width:120px" }, fmt(duration)),
          el("button", { class: "round", onClick: () => { duration = duration + 5; draw(); } }, "+")
        ),
        btn("▶️ Démarrer", () => { remaining = duration; running = true; draw(); tick(); }, "go")
      );
    } else {
      // Écran du décompte
      const warn = remaining === 0 || remaining <= 10;
      box.append(
        el("div", { class: "timer-display" + (warn ? " warn" : "") }, remaining === 0 ? "⏰" : fmt(remaining)),
        remaining === 0 ? el("div", { class: "center", style: "font-size:24px;font-weight:700;margin-bottom:16px" }, "Temps écoulé !") : null,
        el("div", { class: "rowbtns" },
          remaining > 0 ? btn(running ? "⏸ Pause" : "▶️ Reprendre", () => {
            running = !running; draw(); if (running) tick(); else clearTimeout(handle);
          }, "ghost") : null,
          btn("↺ Reset", () => { running = false; clearTimeout(handle); remaining = null; draw(); }, "primary")
        )
      );
    }
  }
  draw();
}

/* ---------------------------- 🎡 ROULETTE --------------------------- */
function gameRoulette(back) {
  const saved = load("roulette-data", null);
  let entriesText = saved && saved.lastEntries ? saved.lastEntries : ROULETTE_PRESETS["🧽 Corvées"].join("\n");
  let savedLists = saved && saved.savedLists ? saved.savedLists : {};
  let spinning = false;
  let display = null;   // texte affiché dans la roue
  let winner = null;    // résultat final

  const box = el("div");
  mount(box);

  const parse = () => entriesText.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
  const persist = () => save("roulette-data", { savedLists, lastEntries: entriesText });

  function spin() {
    const entries = parse();
    if (entries.length < 2 || spinning) return;
    spinning = true; winner = null;
    let t = 0;
    const total = 25 + Math.floor(Math.random() * 10);
    // La roue "ralentit" : l'intervalle grandit à chaque tour.
    const step = () => {
      display = entries[Math.floor(Math.random() * entries.length)];
      draw();
      if (++t < total) setTimeout(step, 40 + t * 8);
      else { winner = entries[Math.floor(Math.random() * entries.length)]; display = winner; spinning = false; draw(); }
    };
    step();
  }

  function draw() {
    const entries = parse();
    box.innerHTML = "";

    // Champ texte : on ne redessine PAS à chaque frappe (sinon on perd le
    // curseur). On met juste à jour la variable et on sauvegarde.
    const textarea = el("textarea", {
      class: "field", rows: 5, value: entriesText,
      onInput: (e) => { entriesText = e.target.value; winner = null; display = null; persist(); },
    });

    const nameInput = el("input", { class: "field", placeholder: "Nom pour sauvegarder cette liste..." });

    box.append(
      backBar("Roulette", back),
      el("div", { class: "bigcard mb-4", style: winner ? "background:var(--emerald)" : (spinning ? "" : "background:var(--card);color:var(--muted)") }, display || "🎡 Tourne la roue !"),
      btn("🎡 Tourner !", spin, entries.length >= 2 && !spinning ? "primary" : "disabled"),
      el("div", { class: "label mt-4" }, "Thèmes"),
      el("div", { class: "chips mb-4", style: "justify-content:flex-start" },
        Object.keys(ROULETTE_PRESETS).map((name) =>
          el("button", { class: "chip", onClick: () => { entriesText = ROULETTE_PRESETS[name].join("\n"); winner = null; display = null; persist(); draw(); } }, name)
        ),
        el("button", { class: "chip", onClick: () => { entriesText = getPlayers().join("\n"); winner = null; display = null; persist(); draw(); } }, "👥 Joueurs"),
        Object.keys(savedLists).map((name) =>
          el("button", { class: "chip on", onClick: () => { entriesText = savedLists[name].join("\n"); winner = null; display = null; persist(); draw(); } }, "💾 " + name)
        )
      ),
      el("div", { class: "label" }, "Entrées de la roue (modifiables)"),
      textarea,
      el("div", { class: "line mt-3" },
        nameInput,
        el("button", { class: "iconbtn exp", onClick: () => {
          const n = nameInput.value.trim();
          if (!n || entries.length < 2) return;
          savedLists[n] = entries; persist(); draw();
        } }, "💾")
      ),
      Object.keys(savedLists).length > 0
        ? el("button", { class: "link mt-2", onClick: () => { savedLists = {}; persist(); draw(); } }, "Supprimer mes listes sauvegardées")
        : null
    );
  }
  draw();
}
