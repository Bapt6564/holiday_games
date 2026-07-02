/* ==================================================================
   games/loupgarou.js — LOUP-GAROU 🐺 (v2 : nuit 100 % anonyme)
   ------------------------------------------------------------------
   LE PROBLÈME DE LA V1 : si le téléphone ne passe qu'aux loups, à la
   voyante et à la sorcière, tout le monde voit QUI se réveille...

   LA SOLUTION (v2) : pendant la nuit, le téléphone passe à TOUS les
   joueurs vivants, dans l'ordre de la table. Chacun regarde son écran
   en secret :
     - 🐺 loup      → vote pour une victime (chaque loup vote seul ;
                       la victime = majorité, départage au hasard)
     - 🔮 voyante   → inspecte un joueur (son rôle s'affiche)
     - 🧪 sorcière  → potions. IMPORTANT : elle joue sa potion de VIE
                       "à l'aveugle" (elle ne peut pas connaître la
                       victime, car tous n'ont pas encore joué). C'est
                       la variante standard de ce mode anonyme.
     - 🧑‍🌾 autres  → ÉCRAN LEURRE identique : "désigne n'importe qui
                       pour brouiller les pistes" (le choix ne compte
                       pas). De l'extérieur, impossible de distinguer
                       un loup d'un villageois !
     - 🏹 chasseur  → écran leurre la nuit ; mais quand il MEURT, il
                       tire une dernière balle et emporte quelqu'un.

   RÔLES CONFIGURABLES au setup : nombre de joueurs, nombre de loups,
   voyante / sorcière / chasseur activables.

   Un seul téléphone "meneur" qui circule ; partie sauvegardée en
   continu (clé "loupgarou-game"), reprise possible plusieurs jours.
   ================================================================== */

function gameLoupGarou(back) {
  let game = load("loupgarou-game", null);
  let screen = game && game.active ? "hub" : "setup";

  // Réglages mémorisés d'une partie à l'autre
  let nbLoups = load("lg-nbloups", 1);
  let useVoyante = load("lg-voyante", true);
  let useSorciere = load("lg-sorciere", true);
  let useChasseur = load("lg-chasseur", false);

  // Variables temporaires des sous-écrans
  let revealIdx = 0, revealShown = false;   // distribution des rôles
  let night = null;   // { order:[joueurs vivants], i, wolfVotes:{}, seerUsed, witchActs, shown, inspect }
  let vote = null;    // { order, i, votes }
  let picked = null;  // "revoir mon rôle"
  let hunterQueue = []; // chasseurs morts qui doivent tirer

  const box = el("div");
  mount(box);
  const persist = () => save("loupgarou-game", game);

  /* ---------- Aides ---------- */
  const alive = () => game.players.filter((p) => p.alive);
  const roleName = (r) => ({ loup: "🐺 Loup-garou", voyante: "🔮 Voyante", sorciere: "🧪 Sorcière", chasseur: "🏹 Chasseur", villageois: "🧑‍🌾 Villageois" })[r];

  function checkWin() {
    const w = alive().filter((p) => p.role === "loup").length;
    const others = alive().length - w;
    if (w === 0) return "village";
    if (w >= others) return "loups";
    return null;
  }

  /* Tue un joueur ; si c'est le chasseur, on le met en file d'attente
     pour son dernier tir (géré par l'écran "hunter"). */
  function kill(p, cause) {
    if (!p || !p.alive) return;
    p.alive = false;
    game.log.push({ type: cause, name: p.name, role: p.role });
    if (p.role === "chasseur") hunterQueue.push(p);
    persist();
  }

  /* ---------- Création de la partie ---------- */
  function distribute() {
    const players = getPlayers();
    const special = nbLoups + (useVoyante ? 1 : 0) + (useSorciere ? 1 : 0) + (useChasseur ? 1 : 0);
    if (players.length < 5) { alert("Il faut au moins 5 joueurs."); return; }
    if (special >= players.length) { alert("Trop de rôles spéciaux pour " + players.length + " joueurs."); return; }

    const roles = [];
    for (let i = 0; i < nbLoups; i++) roles.push("loup");
    if (useVoyante) roles.push("voyante");
    if (useSorciere) roles.push("sorciere");
    if (useChasseur) roles.push("chasseur");
    while (roles.length < players.length) roles.push("villageois");
    const deck = shuffle(roles);

    game = {
      active: true,
      day: 1,
      players: players.map((name, i) => ({ name, role: deck[i], alive: true })),
      potions: { life: useSorciere, death: useSorciere },
      log: [],
    };
    persist();
    revealIdx = 0; revealShown = false; hunterQueue = []; screen = "distribute"; draw();
  }

  /* ================= ÉCRANS ================= */

  function drawSetup() {
    const players = getPlayers();

    function stepper(label, value, min, max, onChange) {
      return el("div", { class: "card center", style: "flex:1" },
        el("div", { class: "muted small mb-2" }, label),
        el("div", { class: "stepper" },
          el("button", { class: "round", onClick: () => onChange(Math.max(min, value - 1)) }, "−"),
          el("span", { class: "big" }, String(value)),
          el("button", { class: "round", onClick: () => onChange(Math.min(max, value + 1)) }, "+")
        )
      );
    }
    function toggle(label, value, onChange) {
      return el("button", { class: "chip" + (value ? " on" : ""), style: "flex:1;padding:12px", onClick: () => onChange(!value) }, label + (value ? " ✓" : ""));
    }

    // Sélecteur du NOMBRE de joueurs : il allonge/réduit la liste partagée
    function setPlayerCount(n) {
      let list = getPlayers();
      while (list.length < n) list.push("Joueur " + (list.length + 1));
      while (list.length > n) list.pop();
      setPlayers(list);
      draw();
    }

    box.append(
      el("div", { class: "info mb-4", html: "🐺 Des <b>loups</b> se cachent dans le village. <b>La nuit, le téléphone passe à TOUT LE MONDE</b> : les rôles agissent, les autres reçoivent un écran leurre identique — impossible de deviner qui est quoi. Le jour : débat + vote. L'app fait le meneur !" }),
      el("div", { class: "hint mb-3", html: "🧪 La sorcière joue sa potion de vie <b>à l'aveugle</b> (sans connaître la victime) : c'est le prix de l'anonymat total. 📱 Un seul téléphone · partie sauvegardée." }),
      el("div", { class: "row" },
        stepper("Nombre de joueurs", players.length, 5, 12, setPlayerCount),
        stepper("Nombre de loups", nbLoups, 1, Math.max(1, Math.floor(players.length / 3)), (v) => { nbLoups = v; save("lg-nbloups", v); draw(); })
      ),
      el("div", { class: "label" }, "Rôles spéciaux à utiliser"),
      el("div", { class: "rowbtns mb-3" },
        toggle("🔮 Voyante", useVoyante, (v) => { useVoyante = v; save("lg-voyante", v); draw(); }),
        toggle("🧪 Sorcière", useSorciere, (v) => { useSorciere = v; save("lg-sorciere", v); draw(); }),
        toggle("🏹 Chasseur", useChasseur, (v) => { useChasseur = v; save("lg-chasseur", v); draw(); })
      ),
      el("div", { class: "hint mb-3" }, "Conseil : 1 loup jusqu'à 7 joueurs, 2 au-delà. Le chasseur tire une dernière balle quand il meurt."),
      playerEditor(() => draw()),
      el("div", { class: "mt-4" }, btn("🌕 Distribuer les rôles", distribute, "go"))
    );
  }

  function drawDistribute() {
    const p = game.players[revealIdx];
    const content = el("div", { class: "center stack pt-8" },
      el("div", { style: "font-size:22px;font-weight:900" }, "📱 Passe le téléphone à"),
      el("div", { style: "font-size:30px;font-weight:900;color:var(--amber)" }, p.name),
      el("div", { class: "muted" }, "Regarde seul(e) ! 🤫")
    );
    if (!revealShown) {
      content.append(btn("👁 Voir mon rôle", () => { revealShown = true; draw(); }, "ghost"));
    } else {
      const isWolf = p.role === "loup";
      const mates = game.players.filter((x) => x.role === "loup" && x.name !== p.name).map((x) => x.name);
      content.append(
        el("div", { class: isWolf ? "mission" : "bigcard", style: isWolf ? "" : "font-size:26px" },
          el("div", { class: isWolf ? "val" : "" }, roleName(p.role)),
          isWolf && mates.length ? el("div", { class: "small", style: "color:#ffe4e6;margin-top:6px" }, "Tes complices : " + mates.join(", ")) : null,
          isWolf && !mates.length ? el("div", { class: "small", style: "color:#ffe4e6;margin-top:6px" }, "Tu es le seul loup.") : null,
          p.role === "sorciere" ? el("div", { class: "small", style: "margin-top:6px" }, "1 potion de vie (à l'aveugle) + 1 potion de mort.") : null,
          p.role === "chasseur" ? el("div", { class: "small", style: "margin-top:6px" }, "Si tu meurs, tu emportes quelqu'un avec toi.") : null
        ),
        btn("✅ Mémorisé — joueur suivant", () => {
          revealShown = false;
          if (revealIdx + 1 >= game.players.length) screen = "hub";
          else revealIdx += 1;
          draw();
        }, "primary")
      );
    }
    box.append(content);
  }

  function drawHub() {
    const win = checkWin();
    box.append(el("div", { class: "card center mb-3" },
      el("div", {}, "🌙 Nuit/Jour n° ", el("b", { style: "color:var(--amber);font-size:22px" }, String(game.day))),
      el("div", { class: "hint mt-2" }, alive().length + " survivant(s)")
    ));
    if (win) {
      box.append(el("div", { class: win === "loups" ? "mission mb-3" : "reveal-good mb-3" },
        el("div", { class: "val" }, win === "loups" ? "🐺 Les loups-garous gagnent !" : "🧑‍🌾 Le village gagne !")
      ), btn("🏁 Voir les rôles", () => { screen = "gameover"; draw(); }, "amber"));
    } else {
      box.append(el("div", { class: "stack" },
        btn("🌙 Lancer la nuit", () => {
          // Ordre de table (ordre de la liste), joueurs vivants seulement
          night = { order: alive(), i: 0, wolfVotes: {}, seerUsed: false, witchActs: { save: false, kill: null }, shown: false, inspect: null };
          screen = "night"; draw();
        }, "primary"),
        btn("🗳️ Vote du village (jour)", () => { vote = null; screen = "vote"; draw(); }, "ghost"),
        btn("🔎 Revoir mon rôle", () => { picked = null; screen = "role"; draw(); }, "soft")
      ));
    }
    box.append(el("div", { class: "label mt-4" }, "Le village"),
      el("div", { class: "stack" },
        game.players.map((p) => el("div", { class: "card", style: p.alive ? "" : "opacity:0.5" }, (p.alive ? "🟢 " : "💀 ") + p.name + (p.alive ? "" : " — " + roleName(p.role))))
      ),
      el("div", { class: "mt-4" }, btn("🏁 Terminer / réinitialiser", () => {
        if (confirm("Terminer la partie et tout réinitialiser ?")) { game = null; save("loupgarou-game", null); screen = "setup"; draw(); }
      }, "soft"))
    );
  }

  /* ---------- LA NUIT ANONYME ----------
     Le téléphone passe à chaque vivant. Écrans construits pour être
     visuellement identiques quel que soit le rôle : "Passe à X" →
     "Voir mon écran de nuit" → une liste de joueurs à toucher. */
  function drawNight() {
    // Tous les joueurs sont passés -> on résout la nuit
    if (night.i >= night.order.length) { resolveNight(); return; }

    const p = night.order[night.i];

    // Étape 1 : écran de passage (identique pour tous)
    if (!night.shown) {
      box.append(el("div", { class: "center stack pt-6" },
        el("div", { class: "big-emoji" }, "🌙"),
        el("div", { style: "font-size:20px;font-weight:900" }, "Le village dort..."),
        el("div", { style: "font-size:28px;font-weight:900;color:var(--amber)" }, "📱 " + p.name),
        el("div", { class: "muted" }, "Prends le téléphone et regarde seul(e). Garde un visage neutre 😐"),
        btn("👁 Voir mon écran de nuit", () => { night.shown = true; draw(); }, "ghost")
      ));
      return;
    }

    // Étape 2 : écran d'action — même APPARENCE pour tous les rôles
    const others = alive().filter((x) => x.name !== p.name);
    const done = () => { night.shown = false; night.inspect = null; night.i += 1; draw(); };

    // La voyante voit d'abord le résultat de son inspection
    if (night.inspect) {
      box.append(el("div", { class: "center stack pt-6" },
        el("div", { class: "muted" }, night.inspect.name + " est..."),
        el("div", { class: night.inspect.role === "loup" ? "mission" : "reveal-good" }, el("div", { class: "val" }, roleName(night.inspect.role))),
        btn("✅ Vu, je passe le téléphone", done, "go")
      ));
      return;
    }

    let header, list;
    if (p.role === "loup") {
      header = el("div", { class: "card small mb-2" }, "🐺 Tu es un LOUP. Vote pour ta proie (majorité entre loups).");
      list = others.filter((x) => x.role !== "loup").map((x) => btn(x.name, () => { night.wolfVotes[x.name] = (night.wolfVotes[x.name] || 0) + 1; done(); }, ""));
    } else if (p.role === "voyante" && !night.seerUsed) {
      header = el("div", { class: "card small mb-2" }, "🔮 Tu es la VOYANTE. Qui veux-tu inspecter ?");
      list = others.map((x) => btn(x.name, () => { night.seerUsed = true; night.inspect = x; draw(); }, ""));
    } else if (p.role === "sorciere" && (game.potions.life || game.potions.death)) {
      header = el("div", { class: "card small mb-2" }, "🧪 Tu es la SORCIÈRE. Potions : " + (game.potions.life ? "💚 " : "") + (game.potions.death ? "🖤" : ""));
      list = [];
      if (game.potions.life) list.push(btn("💚 Potion de VIE : sauver la victime des loups (à l'aveugle)", () => { night.witchActs.save = true; game.potions.life = false; persist(); done(); }, "go"));
      if (game.potions.death) others.forEach((x) => list.push(btn("🖤 " + x.name, () => { night.witchActs.kill = x; game.potions.death = false; persist(); done(); }, "")));
      list.push(btn("😴 Ne rien faire", done, "soft"));
    } else {
      // ÉCRAN LEURRE : même consigne "toucher un nom", le choix ne compte pas.
      header = el("div", { class: "card small mb-2" }, "🌫 Rien à faire cette nuit. Pour brouiller les pistes, désigne n'importe qui (ça ne compte pas) :");
      list = others.map((x) => btn(x.name, done, ""));
    }
    box.append(el("div", { class: "stack pt-2" }, header, el("div", { class: "stack" }, list)));
  }

  /* Fin de la nuit : victime des loups = majorité (départage aléatoire),
     puis application des potions, puis aube. */
  function resolveNight() {
    const entries = Object.entries(night.wolfVotes);
    let victim = null;
    if (entries.length) {
      const max = Math.max(...entries.map(([, v]) => v));
      const top = entries.filter(([, v]) => v === max).map(([n]) => n);
      const name = top[Math.floor(Math.random() * top.length)];
      victim = game.players.find((p) => p.name === name);
    }
    const deaths = [];
    if (victim && !night.witchActs.save) { kill(victim, "nuit"); deaths.push(victim); }
    if (night.witchActs.kill && night.witchActs.kill.alive) { kill(night.witchActs.kill, "sorciere"); deaths.push(night.witchActs.kill); }
    game.day += 1;
    persist();
    night.deaths = deaths;
    screen = "dawn"; draw();
  }

  function drawDawn() {
    const deaths = night.deaths || [];
    box.append(el("div", { class: "center stack pt-6" },
      el("div", { class: "big-emoji" }, "🌅"),
      el("div", { style: "font-size:24px;font-weight:900" }, "Le village se réveille..."),
      deaths.length === 0
        ? el("div", { class: "reveal-good" }, "Personne n'est mort cette nuit ! 🎉")
        : el("div", { class: "stack" }, deaths.map((d) => el("div", { class: "mission" }, el("div", { class: "val" }, "💀 " + d.name), el("div", { class: "val small" }, roleName(d.role))))),
      el("div", { class: "muted" }, "Place au débat... puis au vote !"),
      btn("Continuer", () => {
        night = null;
        // Un chasseur est-il mort ? Il tire avant de retourner au tableau
        screen = hunterQueue.length ? "hunter" : "hub";
        draw();
      }, "go")
    ));
  }

  /* ---------- LE TIR DU CHASSEUR (à sa mort, nuit ou vote) ---------- */
  function drawHunter() {
    const hunter = hunterQueue[0];
    box.append(el("div", { class: "center stack pt-6" },
      el("div", { class: "big-emoji" }, "🏹"),
      el("div", { style: "font-size:22px;font-weight:900" }, hunter.name + " était le CHASSEUR !"),
      el("div", { class: "muted" }, "Dans son dernier souffle, il tire une balle. Qui emporte-t-il ?"),
      el("div", { class: "stack" },
        alive().map((x) => btn("🏹 " + x.name, () => {
          kill(x, "chasseur");
          hunterQueue.shift();
          // Si la victime était AUSSI chasseur, on enchaîne ; sinon retour
          screen = hunterQueue.length ? "hunter" : "hub";
          draw();
        }, ""))
      )
    ));
  }

  /* ---------- LE VOTE DU JOUR ---------- */
  function drawVote() {
    if (vote === null) {
      box.append(el("div", { class: "center stack pt-6" },
        el("div", { class: "big-emoji" }, "🗳️"),
        el("div", { style: "font-size:22px;font-weight:900" }, "Le village vote !"),
        el("div", { class: "muted" }, "Débattez à voix haute, puis chaque survivant vote en secret (le téléphone circule)."),
        btn("Commencer les votes", () => { vote = { order: shuffle(alive()), i: 0, votes: {} }; draw(); }, "primary"),
        btn("← Retour", () => { screen = "hub"; draw(); }, "soft")
      ));
      return;
    }
    if (vote.i < vote.order.length) {
      const voter = vote.order[vote.i];
      box.append(el("div", { class: "center stack pt-6" },
        el("div", { style: "font-size:20px;font-weight:900" }, "📱 Au tour de"),
        el("div", { style: "font-size:28px;font-weight:900;color:var(--amber)" }, voter.name),
        el("div", { class: "stack" },
          alive().filter((p) => p.name !== voter.name).map((p) => btn(p.name, () => { vote.votes[p.name] = (vote.votes[p.name] || 0) + 1; vote.i += 1; draw(); }, "")),
          btn("🙈 Vote blanc", () => { vote.i += 1; draw(); }, "soft")
        )
      ));
      return;
    }
    // Dépouillement
    const entries = Object.entries(vote.votes).sort((a, b) => b[1] - a[1]);
    const top = entries[0];
    const tie = entries.length > 1 && entries[1][1] === top[1];
    let result;
    if (!top || tie) {
      result = el("div", { class: "card center" }, "Égalité ou aucun vote : personne n'est éliminé.");
    } else {
      const out = game.players.find((p) => p.name === top[0]);
      kill(out, "vote");
      result = el("div", { class: out.role === "loup" ? "reveal-good" : "mission" },
        el("div", { class: "val" }, out.name + " est éliminé(e)..."),
        el("div", { class: "val small" }, out.role === "loup" ? "C'était un 🐺 LOUP !" : "C'était " + roleName(out.role) + ". Aïe.")
      );
    }
    const win = checkWin();
    box.append(el("div", { class: "center stack pt-4" },
      el("div", { style: "font-size:22px;font-weight:900" }, "Résultat du vote"),
      result,
      win ? el("div", { class: win === "loups" ? "mission" : "reveal-good" }, el("div", { class: "val" }, win === "loups" ? "🐺 Les loups gagnent !" : "🧑‍🌾 Le village gagne !")) : null,
      btn(hunterQueue.length ? "🏹 Le chasseur tire..." : (win ? "🏁 Voir les rôles" : "↩︎ Tableau de bord"), () => {
        vote = null;
        screen = hunterQueue.length ? "hunter" : (win ? "gameover" : "hub");
        draw();
      }, win ? "amber" : "go")
    ));
  }

  function drawRole() {
    if (picked === null) {
      box.append(
        el("div", { class: "label" }, "Qui es-tu ?"),
        el("div", { class: "stack" }, game.players.map((p) => btn(p.name, () => { picked = p; draw(); }, ""))),
        el("div", { class: "mt-3" }, btn("← Retour", () => { screen = "hub"; draw(); }, "soft"))
      );
    } else {
      box.append(el("div", { class: "center stack pt-6" },
        el("div", { class: "muted" }, "Rôle de " + picked.name),
        el("div", { class: picked.role === "loup" ? "mission" : "reveal-good" }, el("div", { class: "val" }, roleName(picked.role))),
        btn("✅ C'est bon, je cache", () => { picked = null; screen = "hub"; draw(); }, "go")
      ));
    }
  }

  function drawGameOver() {
    box.append(el("div", { class: "stack pt-4" },
      el("div", { class: "center", style: "font-size:26px;font-weight:900;color:var(--amber)" }, "🎭 Les rôles"),
      ...game.players.map((p) => el("div", { class: "card" }, (p.alive ? "🟢 " : "💀 ") + p.name + " — " + roleName(p.role))),
      btn("↺ Nouvelle partie", () => { game = null; save("loupgarou-game", null); screen = "setup"; draw(); }, "go")
    ));
  }

  /* ---------- Aiguillage ---------- */
  function draw() {
    box.innerHTML = "";
    box.append(backBar("Loup-garou", back));
    if (screen === "setup") drawSetup();
    else if (screen === "distribute") drawDistribute();
    else if (screen === "hub") drawHub();
    else if (screen === "night") drawNight();
    else if (screen === "dawn") drawDawn();
    else if (screen === "hunter") drawHunter();
    else if (screen === "vote") drawVote();
    else if (screen === "role") drawRole();
    else if (screen === "gameover") drawGameOver();
  }
  draw();
}
