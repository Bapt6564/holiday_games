/* ==================================================================
   games/amongus.js — AMONG US (version vie réelle, sur plusieurs jours)
   ------------------------------------------------------------------
   PRINCIPE
   - Un ou plusieurs IMPOSTEURS sont cachés dans le groupe. Chacun reçoit
     une "arme factice" (un objet réel donné au début). Pour éliminer une
     victime, l'imposteur se débrouille dans la vraie vie (lui glisser
     l'arme, un geste convenu...), puis vient le SIGNALER dans l'app.
   - L'ÉQUIPAGE gagne en accomplissant toutes ses missions (mini-défis
     réels) OU en faisant éjecter tous les imposteurs lors des votes.
   - Régulièrement, on déclenche une RÉUNION : tout le monde vote (en
     secret, en passant le téléphone) pour éjecter un suspect.

   ⚠️ TÉLÉPHONE UNIQUE : l'app ne synchronise pas les téléphones entre
   eux. Ce jeu se joue donc sur UN seul téléphone (le "vaisseau") qui
   circule : c'est lui qui garde la mémoire de la partie. Tout est
   sauvegardé en continu -> tu peux fermer l'app et reprendre plus tard.

   ÉTAT DE LA PARTIE (sauvegardé sous la clé "amongus-game") :
     game = {
       active: true,
       players: [{ name, role:'imp'|'crew', alive:true, tasks:[{text,done}] }],
       impCount, log:[...]
     }
   ================================================================== */

function gameAmongUs(back) {
  // Partie en cours ? (reprise après fermeture de l'app)
  let game = load("amongus-game", null);
  let screen = game && game.active ? "dashboard" : "setup";

  // Réglages (mémorisés d'une partie à l'autre)
  let poolText = load("amongus-tasks", AMONGUS_TASKS.join("\n"));
  let impCount = load("amongus-impcount", 1);
  let tasksPer = load("amongus-tasksper", 3);

  // Variables temporaires des sous-écrans
  let revealIdx = 0, revealShown = false;      // distribution des rôles
  let meeting = null;                          // déroulé d'un vote
  let picked = null;                           // joueur choisi (détail, rôle...)

  const box = el("div");
  mount(box);

  const persist = () => save("amongus-game", game);

  /* ---------- Règles de fin de partie ---------- */
  function checkWin() {
    const alive = game.players.filter((p) => p.alive);
    const aliveImp = alive.filter((p) => p.role === "imp").length;
    const aliveCrew = alive.filter((p) => p.role === "crew").length;
    if (aliveImp === 0) return "crew";               // tous les imposteurs éjectés
    if (aliveImp >= aliveCrew) return "imp";         // les imposteurs dominent
    const crewTasks = game.players.filter((p) => p.role === "crew").flatMap((p) => p.tasks);
    if (crewTasks.length > 0 && crewTasks.every((t) => t.done)) return "crew"; // toutes les missions faites
    return null;
  }

  /* ---------- Création d'une partie ---------- */
  function distributeRoles() {
    const players = getPlayers();
    const pool = poolText.split(/\n+/).map((t) => t.trim()).filter(Boolean);
    if (players.length < 4) { alert("Il faut au moins 4 joueurs."); return; }
    if (impCount >= players.length - 1) { alert("Trop d'imposteurs pour le nombre de joueurs."); return; }
    if (pool.length < tasksPer) { alert("Pas assez de missions dans la liste."); return; }

    // Tirage au sort des imposteurs
    const idxs = shuffle(players.map((_, i) => i));
    const impSet = new Set(idxs.slice(0, impCount));

    game = {
      active: true,
      impCount: impCount,
      log: [],
      players: players.map((name, i) => ({
        name: name,
        role: impSet.has(i) ? "imp" : "crew",
        alive: true,
        // Les imposteurs reçoivent de "fausses" missions pour se fondre.
        tasks: shuffle(pool).slice(0, tasksPer).map((t) => ({ text: t, done: false })),
      })),
    };
    persist();
    revealIdx = 0; revealShown = false; screen = "distribute"; draw();
  }

  /* ================= RENDU DES ÉCRANS ================= */

  function drawSetup() {
    const players = getPlayers();
    const suggestion = players.length <= 6 ? 1 : players.length <= 9 ? 2 : 3;
    if (impCount > players.length - 2) impCount = Math.min(suggestion, players.length - 2);

    // Petit sélecteur +/- réutilisé deux fois
    function stepper(label, value, min, max, onChange) {
      return el("div", { class: "card center" },
        el("div", { class: "muted small mb-2" }, label),
        el("div", { class: "stepper" },
          el("button", { class: "round", onClick: () => onChange(Math.max(min, value - 1)) }, "−"),
          el("span", { class: "big" }, String(value)),
          el("button", { class: "round", onClick: () => onChange(Math.min(max, value + 1)) }, "+")
        )
      );
    }

    box.append(
      el("div", { class: "info mb-4", html: "🔴 Des <b>imposteurs</b> se cachent parmi vous. Ils reçoivent une <b>arme factice</b> (un objet réel remis au début) et éliminent en douce, puis le signalent ici. L'<b>équipage</b> gagne en finissant ses <b>missions</b> ou en éjectant tous les imposteurs lors des votes." }),
      el("div", { class: "hint mb-2", html: "📱 Se joue sur <b>un seul téléphone</b> qui circule. La partie est sauvegardée : vous pouvez y revenir sur plusieurs jours." }),
      playerEditor(() => draw()),
      el("div", { class: "row mt-4" },
        stepper("Imposteurs", impCount, 1, Math.max(1, players.length - 2), (v) => { impCount = v; save("amongus-impcount", v); draw(); }),
        stepper("Missions / joueur", tasksPer, 1, 8, (v) => { tasksPer = v; save("amongus-tasksper", v); draw(); })
      ),
      el("div", { class: "label mt-4" }, "Liste des missions (mini-défis, une par ligne)"),
      el("textarea", { class: "field", rows: 6, value: poolText, onInput: (e) => { poolText = e.target.value; save("amongus-tasks", poolText); } }),
      el("div", { class: "mt-4" }, btn("🚀 Distribuer les rôles", distributeRoles, "go"))
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
      const tasksList = el("div", { class: "stack", style: "text-align:left" },
        p.tasks.map((t) => el("div", { class: "card small" }, "• " + t.text))
      );
      if (p.role === "imp") {
        const others = game.players.filter((x) => x.role === "imp" && x.name !== p.name).map((x) => x.name);
        content.append(
          el("div", { class: "mission stack" },
            el("div", { class: "val" }, "🔴 IMPOSTEUR"),
            el("div", { class: "small", style: "color:#ffe4e6" }, "Tu as l'arme factice. Élimine discrètement, puis signale-le à l'app."),
            others.length ? el("div", { class: "small", style: "color:#ffe4e6;margin-top:6px" }, "Complice(s) : " + others.join(", ")) : el("div", { class: "small", style: "color:#ffe4e6;margin-top:6px" }, "Tu es le seul imposteur.")
          ),
          el("div", { class: "label mt-3" }, "Fais semblant de faire ces missions :"),
          tasksList
        );
      } else {
        content.append(
          el("div", { class: "bigcard", style: "background:var(--emerald);color:var(--bg);font-size:26px" }, "🟢 ÉQUIPAGE"),
          el("div", { class: "label mt-3" }, "Tes missions secrètes :"),
          tasksList
        );
      }
      content.append(btn("✅ Mémorisé — joueur suivant", () => {
        revealShown = false;
        if (revealIdx + 1 >= game.players.length) screen = "dashboard";
        else revealIdx += 1;
        draw();
      }, "primary"));
    }
    box.append(content);
  }

  function drawDashboard() {
    const alive = game.players.filter((p) => p.alive);
    const dead = game.players.filter((p) => !p.alive);
    const crewTasks = game.players.filter((p) => p.role === "crew").flatMap((p) => p.tasks);
    const doneCount = crewTasks.filter((t) => t.done).length;
    const win = checkWin();

    box.append(
      el("div", { class: "card center mb-3" },
        el("div", {}, el("b", { style: "color:var(--amber);font-size:22px" }, String(alive.length)), " en vie · ", el("b", { style: "font-size:22px" }, String(dead.length)), " éliminé(s)"),
        el("div", { class: "hint mt-2" }, "Missions équipage : " + doneCount + " / " + crewTasks.length)
      )
    );

    if (win) {
      box.append(el("div", { class: win === "imp" ? "mission mb-3" : "reveal-good mb-3" },
        el("div", { class: "val" }, win === "imp" ? "🔴 Les imposteurs gagnent !" : "🟢 L'équipage gagne !")
      ), btn("🏁 Voir les rôles / terminer", () => { screen = "gameover"; draw(); }, "amber"));
    }

    // Actions principales
    box.append(el("div", { class: "stack" },
      btn("☠️ Signaler une élimination", () => { screen = "kill"; draw(); }, "primary"),
      btn("📣 Réunion / Vote", () => { meeting = null; screen = "meeting"; draw(); }, "ghost"),
      btn("✅ Pointer mes missions", () => { picked = null; screen = "tasks"; draw(); }, "go"),
      btn("🔎 Revoir mon rôle", () => { picked = null; screen = "role"; draw(); }, "soft")
    ));

    // Liste des joueurs (sans dévoiler les rôles !)
    box.append(el("div", { class: "label mt-4" }, "Joueurs"),
      el("div", { class: "stack" },
        game.players.map((p) => el("div", { class: "card", style: p.alive ? "" : "opacity:0.5" }, (p.alive ? "🟢 " : "💀 ") + p.name))
      )
    );

    box.append(el("div", { class: "mt-4" }, btn("🏁 Terminer / réinitialiser la partie", () => {
      if (confirm("Terminer la partie et tout réinitialiser ?")) { game = null; save("amongus-game", null); screen = "setup"; draw(); }
    }, "soft")));
  }

  function drawKill() {
    const alive = game.players.filter((p) => p.alive);
    box.append(
      el("div", { class: "label" }, "Qui vient d'être éliminé ?"),
      el("div", { class: "hint mb-3" }, "À faire discrètement, après le meurtre réel."),
      el("div", { class: "stack" },
        alive.map((p) => btn(p.name, () => {
          if (!confirm(p.name + " est éliminé(e) ?")) return;
          p.alive = false;
          game.log.push({ type: "kill", name: p.name });
          persist();
          screen = "dashboard"; draw();
        }, ""))
      ),
      el("div", { class: "mt-3" }, btn("← Annuler", () => { screen = "dashboard"; draw(); }, "soft"))
    );
  }

  function drawTasksOrRole(mode) {
    // mode = "tasks" (pointer ses missions) ou "role" (revoir son rôle)
    if (picked === null) {
      box.append(
        el("div", { class: "label" }, mode === "tasks" ? "Qui es-tu ? (pointe tes missions)" : "Qui es-tu ?"),
        el("div", { class: "stack" }, game.players.map((p) => btn(p.name, () => { picked = p; draw(); }, ""))),
        el("div", { class: "mt-3" }, btn("← Retour", () => { screen = "dashboard"; draw(); }, "soft"))
      );
      return;
    }
    if (mode === "role") {
      box.append(el("div", { class: "center stack pt-6" },
        el("div", { class: "muted" }, "Rôle de " + picked.name),
        picked.role === "imp"
          ? el("div", { class: "mission" }, el("div", { class: "val" }, "🔴 IMPOSTEUR"), el("div", { class: "small", style: "color:#ffe4e6" }, "Tu as l'arme factice."))
          : el("div", { class: "reveal-good" }, "🟢 ÉQUIPAGE"),
        btn("✅ C'est bon, je cache", () => { screen = "dashboard"; draw(); }, "go")
      ));
      return;
    }
    // mode "tasks" : cases à cocher
    box.append(el("div", { class: "center muted mb-2" }, "Missions de " + picked.name));
    const list = el("div", { class: "stack" });
    picked.tasks.forEach((t) => {
      list.append(el("button", {
        class: "btn " + (t.done ? "go" : ""),
        style: "text-align:left;" + (t.done ? "" : "background:var(--card)"),
        onClick: () => { t.done = !t.done; persist(); draw(); },
      }, (t.done ? "✅ " : "⬜ ") + t.text));
    });
    if (picked.role === "imp") box.append(el("div", { class: "hint mb-2" }, "(Fausses missions : elles ne comptent pas, c'est pour te fondre 😏)"));
    box.append(list, el("div", { class: "mt-3" }, btn("← Retour", () => { picked = null; screen = "dashboard"; draw(); }, "soft")));

    const win = checkWin();
    if (win === "crew") box.append(el("div", { class: "reveal-good mt-3" }, "🟢 Toutes les missions sont faites : l'équipage gagne !"));
  }

  function drawMeeting() {
    const alive = game.players.filter((p) => p.alive);

    // Démarrage de la réunion
    if (meeting === null) {
      box.append(el("div", { class: "center stack pt-6" },
        el("div", { class: "big-emoji" }, "📣"),
        el("div", { style: "font-size:24px;font-weight:900" }, "Réunion d'urgence !"),
        el("div", { class: "muted" }, "Débattez, puis chaque survivant vote en secret (le téléphone circule). Le plus voté est éjecté."),
        btn("🗳️ Commencer les votes", () => { meeting = { order: shuffle(alive), i: 0, votes: {} }; draw(); }, "primary"),
        btn("← Retour", () => { screen = "dashboard"; draw(); }, "soft")
      ));
      return;
    }

    // Tour de vote de chaque survivant
    if (meeting.i < meeting.order.length) {
      const voter = meeting.order[meeting.i];
      const buttons = el("div", { class: "stack" },
        alive.filter((p) => p.name !== voter.name).map((p) => btn(p.name, () => {
          meeting.votes[p.name] = (meeting.votes[p.name] || 0) + 1;
          meeting.i += 1; draw();
        }, "")),
        btn("🙈 Vote blanc", () => { meeting.i += 1; draw(); }, "soft")
      );
      box.append(el("div", { class: "center stack pt-6" },
        el("div", { style: "font-size:20px;font-weight:900" }, "📱 Au tour de"),
        el("div", { style: "font-size:28px;font-weight:900;color:var(--amber)" }, voter.name),
        el("div", { class: "muted" }, "Vote en secret : qui est suspect ?"),
        buttons
      ));
      return;
    }

    // Dépouillement
    const entries = Object.entries(meeting.votes).sort((a, b) => b[1] - a[1]);
    const top = entries[0];
    const tie = entries.length > 1 && entries[1][1] === top[1];
    let resultNode;
    if (!top || tie) {
      resultNode = el("div", { class: "card center" }, "Égalité ou aucun vote : personne n'est éjecté cette fois.");
    } else {
      const ejected = game.players.find((p) => p.name === top[0]);
      ejected.alive = false;
      game.log.push({ type: "vote", name: ejected.name, role: ejected.role });
      persist();
      resultNode = el("div", { class: ejected.role === "imp" ? "reveal-good" : "mission" },
        el("div", { class: "val" }, ejected.name + " est éjecté(e)..."),
        el("div", { class: "val small" }, ejected.role === "imp" ? "🔴 C'était un IMPOSTEUR !" : "🟢 C'était l'équipage. Aïe.")
      );
    }
    const win = checkWin();
    box.append(el("div", { class: "center stack pt-4" },
      el("div", { style: "font-size:22px;font-weight:900" }, "Résultat du vote"),
      resultNode,
      win ? el("div", { class: win === "imp" ? "mission" : "reveal-good" }, el("div", { class: "val" }, win === "imp" ? "🔴 Les imposteurs gagnent !" : "🟢 L'équipage gagne !")) : null,
      win
        ? btn("🏁 Voir les rôles", () => { meeting = null; screen = "gameover"; draw(); }, "amber")
        : btn("↩︎ Retour au tableau de bord", () => { meeting = null; screen = "dashboard"; draw(); }, "go")
    ));
  }

  function drawGameOver() {
    box.append(el("div", { class: "stack pt-4" },
      el("div", { class: "center", style: "font-size:26px;font-weight:900;color:var(--amber)" }, "🎭 Les rôles"),
      ...game.players.map((p) => el("div", { class: "card" },
        (p.role === "imp" ? "🔴 " : "🟢 ") + p.name + (p.alive ? "" : " 💀") + (p.role === "imp" ? " — Imposteur" : "")
      )),
      btn("↺ Nouvelle partie", () => { game = null; save("amongus-game", null); screen = "setup"; draw(); }, "go")
    ));
  }

  /* ---------- Aiguillage ---------- */
  function draw() {
    box.innerHTML = "";
    box.append(backBar("Among Us", back));
    if (screen === "setup") drawSetup();
    else if (screen === "distribute") drawDistribute();
    else if (screen === "dashboard") drawDashboard();
    else if (screen === "kill") drawKill();
    else if (screen === "tasks") drawTasksOrRole("tasks");
    else if (screen === "role") drawTasksOrRole("role");
    else if (screen === "meeting") drawMeeting();
    else if (screen === "gameover") drawGameOver();
  }
  draw();
}
