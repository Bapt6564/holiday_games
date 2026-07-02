/* ==================================================================
   games/party.js — TIME'S UP · UNDERCOVER · QUI SUIS-JE · KILLER
   ================================================================== */

/* --------------------------- ⏳ TIME'S UP --------------------------- */
const ROUND_RULES = [
  "Manche 1 — Décris librement (sans dire le mot)",
  "Manche 2 — Un seul mot !",
  "Manche 3 — Mime uniquement 🎭",
];

function gameTimesUp(back) {
  const cfg = load("timesup-config", {});
  let wordsText = cfg.wordsText || "";
  let teams = cfg.teams || ["Équipe 🍉", "Équipe 🌴"];
  let turnTime = cfg.turnTime || 45;

  let phase = "setup";
  let round = 0;              // 0,1,2 = manches 1,2,3
  let deck = [];              // mots restant à deviner ce tour
  let allWords = [];          // liste complète (pour relancer chaque manche)
  let scores = {};            // { équipe: [pts m1, pts m2, pts m3] }
  let currentTeam = 0;
  let timeLeft = 0;
  let currentWord = null;
  let handle = null;          // minuteur du tour

  const box = el("div");
  mount(box);

  const persist = () => save("timesup-config", { wordsText, teams, turnTime });
  const parseWords = () => wordsText.split(/[\n,;]+/).map((w) => w.trim()).filter(Boolean);
  const totals = () => Object.fromEntries(Object.entries(scores).map(([t, a]) => [t, a.reduce((x, y) => x + y, 0)]));

  function startGame() {
    const words = parseWords();
    if (words.length < 5) return;
    allWords = words;
    deck = shuffle(words);
    scores = Object.fromEntries(teams.map((t) => [t, [0, 0, 0]]));
    round = 0; currentTeam = 0; phase = "turnReady"; draw();
  }

  function tickTurn() {
    if (phase !== "playing") return;
    if (timeLeft > 0) { timeLeft -= 1; draw(); handle = setTimeout(tickTurn, 1000); }
    else {
      // Temps écoulé : le mot en cours retourne dans le paquet, équipe suivante
      if (currentWord) deck.push(currentWord);
      currentWord = null;
      currentTeam = (currentTeam + 1) % teams.length;
      phase = "turnReady"; draw();
    }
  }

  function startTurn() {
    timeLeft = turnTime;
    deck = shuffle(deck);
    currentWord = deck.shift() || null;
    phase = "playing"; draw(); handle = setTimeout(tickTurn, 1000);
  }

  function nextWord(found) {
    if (found && currentWord) scores[teams[currentTeam]][round] += 1;
    if (!found && currentWord) deck.push(currentWord); // "passe" -> au fond du paquet
    if (deck.length === 0) {
      clearTimeout(handle);
      currentWord = null;
      phase = round === 2 ? "gameEnd" : "roundEnd"; draw(); return;
    }
    deck = found ? deck : shuffle(deck);
    currentWord = deck.shift();
    draw();
  }

  function nextRound() {
    round += 1;
    deck = shuffle(allWords);
    currentTeam = (currentTeam + 1) % teams.length;
    phase = "turnReady"; draw();
  }

  // --- rendu des différents écrans ---
  function drawSetup() {
    // Sous-conteneur pour les équipes (redessiné à l'ajout/suppression)
    const teamsBox = el("div");
    function drawTeams() {
      teamsBox.innerHTML = "";
      teams.forEach((t, i) => {
        const field = el("input", { class: "field", value: t, onInput: (e) => { teams[i] = e.target.value; persist(); } });
        const row = el("div", { class: "line" }, field);
        if (teams.length > 2) row.append(el("button", { class: "iconbtn del", onClick: () => { teams.splice(i, 1); persist(); drawTeams(); } }, "✕"));
        teamsBox.append(row);
      });
      if (teams.length < 4) teamsBox.append(el("button", { class: "link", onClick: () => { teams.push("Équipe " + (teams.length + 1)); persist(); drawTeams(); } }, "+ Ajouter une équipe"));
    }
    drawTeams();

    const wordsArea = el("textarea", {
      class: "field", rows: 7, value: wordsText,
      placeholder: "Zinédine Zidane\nCroissant\nApesanteur\n...",
      onInput: (e) => { wordsText = e.target.value; persist(); countLabel.textContent = parseWords().length + " mots (minimum 5)"; },
    });
    const countLabel = el("div", { class: "hint" }, parseWords().length + " mots (minimum 5)");

    const timeLabel = el("div", { class: "label" }, "Temps par tour : " + turnTime + "s");
    const slider = el("input", { type: "range", min: 20, max: 90, step: 5, value: turnTime, style: "width:100%",
      onInput: (e) => { turnTime = +e.target.value; timeLabel.textContent = "Temps par tour : " + turnTime + "s"; persist(); } });

    box.append(
      el("div", { class: "label" }, "Vos mots (un par ligne) 💾 sauvegardés"),
      wordsArea, countLabel,
      el("div", { class: "label mt-4" }, "Équipes"), teamsBox,
      el("div", { class: "mt-4" }, timeLabel), slider,
      el("div", { class: "mt-4" }, btn("🚀 C'est parti !", startGame, parseWords().length >= 5 ? "go" : "disabled"))
    );
  }

  function drawTurnReady() {
    const t = totals();
    box.append(el("div", { class: "center stack pt-6" },
      el("div", { style: "color:var(--amber);font-weight:700;font-size:18px" }, ROUND_RULES[round]),
      el("div", { class: "muted" }, "Mots restants : " + (deck.length + (currentWord ? 1 : 0))),
      el("div", { style: "font-size:28px;font-weight:900" }, "À toi, " + teams[currentTeam] + " !"),
      el("div", { class: "muted" }, "Passe le téléphone à celui/celle qui fait deviner 📱"),
      btn("▶️ Lancer le chrono (" + turnTime + "s)", startTurn, "primary"),
      el("div", { class: "hint mt-4" }, teams.map((x) => x + " : " + (t[x] || 0)).join("   ·   "))
    ));
  }

  function drawPlaying() {
    const controls = el("div", { class: "rowbtns" });
    if (round > 0) controls.append(btn("⏭ Passe", () => nextWord(false), "ghost"));
    controls.append(btn("✅ Trouvé !", () => nextWord(true), "go"));
    box.append(el("div", { class: "center stack" },
      el("div", { style: "font-size:44px;font-weight:900;color:" + (timeLeft <= 10 ? "var(--rose)" : "var(--amber)") }, timeLeft + "s"),
      el("div", { class: "bigcard" }, currentWord),
      controls,
      el("div", { class: "hint" }, teams[currentTeam] + " · manche " + (round + 1) + " · " + deck.length + " mots restants")
    ));
  }

  function drawRoundEnd() {
    const t = totals();
    box.append(el("div", { class: "center stack pt-8" },
      el("div", { style: "font-size:26px;font-weight:900" }, "Fin de la manche " + (round + 1) + " ! 🎉"),
      ...teams.map((x) => el("div", { class: "card" }, x + " : ", el("b", { style: "color:var(--amber)" }, String(scores[x][round])), " ce tour · total ", el("b", {}, String(t[x])))),
      btn("Manche " + (round + 2) + " → " + (round === 1 ? "🎭 Mime !" : "Un seul mot !"), nextRound, "primary")
    ));
  }

  function drawGameEnd() {
    const t = totals();
    const ranked = Object.entries(t).sort((a, b) => b[1] - a[1]);
    box.append(el("div", { class: "center stack pt-8" },
      el("div", { style: "font-size:32px;font-weight:900;color:var(--amber)" }, "🏆 Résultats"),
      ...ranked.map(([x, s], i) => el("div", { class: "btn " + (i === 0 ? "amber" : ""), style: i === 0 ? "" : "background:var(--card)" }, (i === 0 ? "👑 " : "") + x + " — " + s + " pts")),
      btn("↺ Rejouer", () => { phase = "setup"; draw(); }, "ghost")
    ));
  }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Time's Up", back));
    if (phase === "setup") drawSetup();
    else if (phase === "turnReady") drawTurnReady();
    else if (phase === "playing") drawPlaying();
    else if (phase === "roundEnd") drawRoundEnd();
    else if (phase === "gameEnd") drawGameEnd();
  }
  draw();
}

/* --------------------------- 🕵️ UNDERCOVER -------------------------- */
function gameUndercover(back) {
  let phase = "setup";
  let assignments = [];   // [{ name, word, impostor }]
  let idx = 0;            // joueur en train de regarder
  let shown = false;      // le mot est-il affiché ?
  let revealImpostor = false;

  const box = el("div");
  mount(box);

  function start() {
    const players = getPlayers();
    const pair = WORD_PAIRS[Math.floor(Math.random() * WORD_PAIRS.length)];
    const flip = Math.random() < 0.5;
    const civil = flip ? pair[0] : pair[1];
    const under = flip ? pair[1] : pair[0];
    const imp = Math.floor(Math.random() * players.length);
    assignments = players.map((p, i) => ({ name: p, word: i === imp ? under : civil, impostor: i === imp }));
    idx = 0; shown = false; revealImpostor = false; phase = "reveal"; draw();
  }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Undercover", back));

    if (phase === "setup") {
      box.append(
        el("div", { class: "info mb-4", html: "🕵️ Tout le monde reçoit le <b>même mot</b>... sauf l'imposteur, qui en a un <b>légèrement différent</b> — sans le savoir ! Chacun décrit son mot à tour de rôle, puis on vote." }),
        playerEditor(),
        el("div", { class: "mt-4" }, btn("🕵️ Distribuer les mots", start, "go"))
      );
    } else if (phase === "reveal") {
      const a = assignments[idx];
      const content = el("div", { class: "center stack pt-8" },
        el("div", { style: "font-size:22px;font-weight:900" }, "📱 Passe le téléphone à"),
        el("div", { style: "font-size:30px;font-weight:900;color:var(--amber)" }, a.name)
      );
      if (!shown) content.append(btn("👁 Voir mon mot (en secret !)", () => { shown = true; draw(); }, "ghost"));
      else content.append(
        el("div", { class: "bigcard" }, a.word),
        btn("✅ J'ai mémorisé — au suivant", () => {
          shown = false;
          if (idx + 1 >= assignments.length) phase = "discuss";
          else idx += 1;
          draw();
        }, "primary")
      );
      box.append(content);
    } else if (phase === "discuss") {
      const imp = assignments.find((a) => a.impostor);
      box.append(el("div", { class: "center stack pt-8" },
        el("div", { class: "big-emoji" }, "🗣️"),
        el("div", { style: "font-size:24px;font-weight:900" }, "Débattez !"),
        el("div", { class: "muted" }, "Chacun décrit son mot à tour de rôle, puis votez à main levée. Recommencez jusqu'à démasquer l'imposteur... ou pas !"),
        !revealImpostor
          ? btn("🎭 Révéler l'imposteur", () => { revealImpostor = true; draw(); }, "ghost")
          : el("div", { class: "mission" }, el("div", { class: "val" }, "C'était " + imp.name + " !"), el("div", { class: "val small" }, "(mot : " + imp.word + ")")),
        btn("↺ Nouvelle partie", () => { phase = "setup"; draw(); }, "go")
      ));
    }
  }
  draw();
}

/* --------------------------- ❓ QUI SUIS-JE -------------------------- */
function gameQuiSuisJe(back) {
  let phase = "setup";
  let useBuiltin = true;                 // liste intégrée ou liste perso ?
  let namesText = load("quisuisje-names", "");
  let assignments = [];                  // [{ player, character }]
  let idx = 0;
  let shown = false;

  const box = el("div");
  mount(box);

  function start() {
    const players = getPlayers();
    let names;
    if (useBuiltin) {
      names = shuffle(CHARACTERS).slice(0, players.length);
    } else {
      names = namesText.split(/[\n,;]+/).map((w) => w.trim()).filter(Boolean);
      if (names.length < players.length) { alert("Il faut au moins " + players.length + " personnages !"); return; }
      names = shuffle(names);
    }
    assignments = players.map((p, i) => ({ player: p, character: names[i % names.length] }));
    idx = 0; shown = false; phase = "reveal"; draw();
  }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Qui suis-je ?", back));

    if (phase === "setup") {
      const modeRow = el("div", { class: "rowbtns mb-3" },
        el("button", { class: "chip" + (useBuiltin ? " on" : ""), style: "flex:1;padding:12px", onClick: () => { useBuiltin = true; draw(); } }, "🎲 Liste intégrée"),
        el("button", { class: "chip" + (!useBuiltin ? " on" : ""), style: "flex:1;padding:12px", onClick: () => { useBuiltin = false; draw(); } }, "✏️ Ma liste")
      );
      box.append(
        el("div", { class: "info mb-4", html: "❓ Chaque joueur reçoit un personnage secret que <b>tout le monde voit sauf lui</b>. À tour de rôle, posez des questions fermées : tant qu'on vous répond OUI, vous continuez !" }),
        playerEditor(),
        el("div", { class: "mt-4" }, modeRow)
      );
      if (!useBuiltin) {
        box.append(
          el("div", { class: "label" }, "Vos personnages (un par ligne) 💾"),
          el("textarea", { class: "field", rows: 6, value: namesText, placeholder: "Marie Curie\nAstérix\nThomas Pesquet\n...", onInput: (e) => { namesText = e.target.value; save("quisuisje-names", namesText); } }),
          el("div", { class: "mt-2" }, aiButton("✨ Générer des personnages par IA", async () => {
            const theme = prompt("Thème ? (ex : célébrités, dessins animés, sportifs)") || "célébrités connues de tous";
            const data = await aiGenerate('Génère 12 personnages très connus pour un jeu "Qui suis-je ?" entre amis français, thème : "' + theme + '". Faciles à deviner par questions oui/non. Réponds UNIQUEMENT par un tableau JSON de chaînes : ["Nom 1","Nom 2"]');
            if (!data || !Array.isArray(data)) return;
            namesText = data.join("\n"); save("quisuisje-names", namesText); draw();
          }))
        );
      } else {
        box.append(el("div", { class: "hint" }, CHARACTERS.length + " personnages disponibles (modifiables dans data.js)"));
      }
      box.append(el("div", { class: "mt-4" }, btn("🎭 Distribuer les personnages", start, "go")));
    } else if (phase === "reveal") {
      const a = assignments[idx];
      const content = el("div", { class: "center stack pt-8" },
        el("div", { style: "font-size:22px;font-weight:900" }, "🙈 Cache tes yeux,"),
        el("div", { style: "font-size:30px;font-weight:900;color:var(--amber)" }, a.player + " !"),
        el("div", { class: "muted" }, "Les autres : regardez son personnage en silence 🤫")
      );
      if (!shown) content.append(btn("👁 Montrer le personnage aux autres", () => { shown = true; draw(); }, "ghost"));
      else content.append(
        el("div", { class: "bigcard", style: "font-size:28px" }, a.character),
        btn("✅ Vu ! Joueur suivant", () => {
          shown = false;
          if (idx + 1 >= assignments.length) phase = "play";
          else idx += 1;
          draw();
        }, "primary")
      );
      box.append(content);
    } else if (phase === "play") {
      box.append(el("div", { class: "center stack pt-8" },
        el("div", { class: "big-emoji" }, "🔍"),
        el("div", { style: "font-size:24px;font-weight:900" }, "À vous de jouer !"),
        el("div", { class: "muted" }, "À tour de rôle, posez des questions oui/non pour deviner votre personnage. Tant que la réponse est OUI, vous continuez. Premier à trouver a gagné !"),
        btn("🎉 Fin de partie — tout révéler", () => { phase = "end"; draw(); }, "ghost")
      ));
    } else if (phase === "end") {
      box.append(el("div", { class: "stack pt-4" },
        el("div", { class: "center", style: "font-size:24px;font-weight:900;color:var(--amber)" }, "🎭 Les personnages étaient..."),
        ...assignments.map((a) => el("div", { class: "card" }, el("b", {}, a.player), " était ", el("span", { style: "color:var(--amber);font-weight:700" }, a.character))),
        btn("↺ Nouvelle partie", () => { phase = "setup"; draw(); }, "go")
      ));
    }
  }
  draw();
}

/* ------------------------------ 🔪 KILLER --------------------------- */
function gameKiller(back) {
  let phase = "setup";
  let missionsText = load("killer-missions", KILLER_MISSIONS.join("\n"));
  let assignments = [];   // [{ player, target, mission }]
  let idx = 0;
  let shown = false;
  let checkChoice = null; // pour "revoir ma mission"

  const box = el("div");
  mount(box);

  function distribute() {
    const players = getPlayers();
    if (players.length < 3) { alert("Il faut au moins 3 joueurs."); return; }
    const missions = missionsText.split(/\n+/).map((m) => m.trim()).filter(Boolean);
    if (missions.length < 3) { alert("Ajoute au moins 3 missions."); return; }
    // Cercle mélangé : chacun vise le suivant (personne ne se vise soi-même)
    const ring = shuffle(players);
    assignments = ring.map((p, i) => ({
      player: p,
      target: ring[(i + 1) % ring.length],
      mission: missions[Math.floor(Math.random() * missions.length)],
    }));
    idx = 0; shown = false; phase = "reveal"; draw();
  }

  function missionCard(a) {
    return el("div", { class: "mission stack" },
      el("div", { class: "lbl" }, "Ta cible"),
      el("div", { class: "val" }, a.target),
      el("div", { class: "lbl", style: "margin-top:8px" }, "Ta mission"),
      el("div", { class: "val small" }, a.mission)
    );
  }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Killer", back));

    if (phase === "setup") {
      box.append(
        el("div", { class: "info mb-4", html: "🔪 Chacun reçoit en secret une <b>cible</b> et une <b>mission</b> à lui faire accomplir discrètement pendant tout le séjour. Réussi sans te faire griller = 1 point. Idéal sur une semaine !" }),
        el("div", { class: "hint mb-3" }, "Joueurs actuels : " + getPlayers().join(", ") + " (modifiables via Undercover ou Qui suis-je)"),
        el("div", { class: "label" }, "Liste des missions (une par ligne)"),
        el("textarea", { class: "field", rows: 8, value: missionsText, onInput: (e) => { missionsText = e.target.value; save("killer-missions", missionsText); } }),
        el("div", { class: "mt-3" }, aiButton("✨ Générer des missions par IA (remplit la liste)", async () => {
          const theme = prompt("Ambiance ? (ex : plage, soirée, sportif — ou vide)") || "";
          const data = await aiGenerate('Génère 15 missions courtes et drôles pour un jeu du "Killer" entre amis en vacances' + (theme ? ', ambiance : "' + theme + '"' : "") + '. Chaque mission est une action discrète à faire réaliser à sa cible (ex : "lui faire dire le mot ananas"). Réponds UNIQUEMENT par un tableau JSON de chaînes.');
          if (!data || !Array.isArray(data)) return;
          missionsText = data.join("\n"); save("killer-missions", missionsText); draw();
        })),
        el("div", { class: "mt-4" }, btn("🔪 Distribuer les missions", distribute, "go"))
      );
    } else if (phase === "reveal") {
      const a = assignments[idx];
      const content = el("div", { class: "center stack pt-8" },
        el("div", { style: "font-size:22px;font-weight:900" }, "📱 Passe le téléphone à"),
        el("div", { style: "font-size:30px;font-weight:900;color:var(--amber)" }, a.player),
        el("div", { class: "muted" }, "Regarde seul(e), ne montre à personne ! 🤫")
      );
      if (!shown) content.append(btn("👁 Voir ma mission secrète", () => { shown = true; draw(); }, "ghost"));
      else content.append(
        missionCard(a),
        btn("✅ Mémorisé — joueur suivant", () => {
          shown = false;
          if (idx + 1 >= assignments.length) phase = "live";
          else idx += 1;
          draw();
        }, "primary")
      );
      box.append(content);
    } else if (phase === "live") {
      box.append(el("div", { class: "center stack pt-8" },
        el("div", { class: "big-emoji" }, "🎯"),
        el("div", { style: "font-size:24px;font-weight:900" }, "La chasse est lancée !"),
        el("div", { class: "muted" }, "Accomplissez vos missions en douce tout au long du séjour. Vous pouvez revoir votre mission ci-dessous (regardez seul !)."),
        btn("🔎 Revoir ma mission", () => { checkChoice = null; phase = "check"; draw(); }, "ghost"),
        btn("↺ Nouvelle distribution", () => { phase = "setup"; draw(); }, "soft")
      ));
    } else if (phase === "check") {
      if (checkChoice === null) {
        box.append(el("div", { class: "stack pt-4" },
          el("div", { class: "center", style: "font-size:18px;font-weight:700" }, "Qui es-tu ?"),
          ...assignments.map((a) => btn(a.player, () => { checkChoice = a; draw(); }, "")),
          btn("← Retour", () => { phase = "live"; draw(); }, "soft")
        ));
      } else {
        box.append(el("div", { class: "center stack pt-6" },
          el("div", { class: "muted" }, "Mission de " + checkChoice.player),
          missionCard(checkChoice),
          btn("✅ C'est bon, je cache", () => { phase = "live"; draw(); }, "go")
        ));
      }
    }
  }
  draw();
}
