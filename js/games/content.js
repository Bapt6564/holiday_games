/* ==================================================================
   games/content.js — QUIZ · TU PRÉFÈRES · PHOTO MYSTÈRE · BLIND TEST
   ------------------------------------------------------------------
   Ces jeux marchent avec des PACKS : ceux livrés (data.js) + ceux que
   tu importes depuis un fichier .json. Rien n'est généré en ligne :
   tout fonctionne hors connexion.
   ================================================================== */

/* ------------------------------ ✨ QUIZ ----------------------------- */
function gameQuiz(back) {
  let view = "library";                       // library | playing | end
  let custom = load("quiz-custom", []);       // packs importés
  let pack = null;                            // pack en cours
  let qIndex = 0, selected = null, score = 0;

  const box = el("div");
  mount(box);

  const saveCustom = () => save("quiz-custom", custom);

  function onImport(data) {
    if (!data || !Array.isArray(data.questions)) { alert("Ce fichier n'est pas un quiz valide (il manque « questions »)."); return; }
    custom.push({ id: "imp-" + Date.now(), title: data.title || "Quiz importé", emoji: data.emoji || "📥", questions: data.questions });
    saveCustom(); draw();
    alert("Pack importé !");
  }
  function play(p) { pack = p; qIndex = 0; selected = null; score = 0; view = "playing"; draw(); }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Quiz", back));

    if (view === "library") {
      const list = el("div", { class: "stack" });
      QUIZ_PACKS.concat(custom).forEach((p) => {
        const open = el("button", { class: "tile", onClick: () => play(p) },
          el("span", { class: "emoji" }, p.emoji),
          el("span", {}, el("span", { class: "name" }, p.title), el("span", { class: "desc" }, p.questions.length + " questions"))
        );
        const row = el("div", { class: "line" }, open,
          el("button", { class: "iconbtn exp", onClick: () => exportJSON({ type: "quiz", title: p.title, emoji: p.emoji, questions: p.questions }, "quiz-" + p.title + ".json") }, "⬇")
        );
        if (String(p.id).startsWith("imp-")) row.append(el("button", { class: "iconbtn del", onClick: () => { custom = custom.filter((c) => c.id !== p.id); saveCustom(); draw(); } }, "✕"));
        list.append(row);
      });
      box.append(
        el("div", { class: "label" }, "Choisis un quiz"),
        list,
        el("div", { class: "mt-3" }, importButton("📥 Importer un quiz (.json)", onImport))
      );
      // Génération par IA (nécessite une clé dans ⚙️ Réglages IA)
      const themeInput = el("input", { class: "field", placeholder: "Thème : années 2000, ciné, physique absurde..." });
      box.append(el("div", { class: "card mt-3 stack" },
        el("div", { class: "label" }, "✨ Générer un quiz par IA"),
        themeInput,
        aiButton("✨ Générer (20 questions)", async () => {
          const theme = themeInput.value.trim() || "culture générale décalée";
          const data = await aiGenerate('Génère 20 questions de quiz fun en français sur le thème "' + theme + '". Réponds UNIQUEMENT avec un tableau JSON valide, sans markdown : [{"q":"question","options":["A","B","C","D"],"answer":0,"fun":"anecdote courte"}] où answer est l\'index (0-3) de la bonne réponse.');
          if (!data || !Array.isArray(data)) return;
          // On l'ajoute aux packs perso (sauvegardé + exportable), puis on joue
          const p = { id: "imp-" + Date.now(), title: "IA : " + theme, emoji: "✨", questions: data };
          custom.push(p); saveCustom(); play(p);
        }),
        el("div", { class: "hint" }, "Le quiz généré est sauvegardé dans ta liste (et exportable ⬇).")
      ));
    } else if (view === "playing") {
      const q = pack.questions[qIndex];
      const answers = el("div", { class: "stack mt-3" });
      q.options.forEach((opt, i) => {
        let cls = "btn answer";
        if (selected !== null) {
          if (i === q.answer) cls += " correct";
          else if (i === selected) cls += " wrong";
          else cls += " dim";
        }
        answers.append(el("button", {
          class: cls,
          onClick: () => { if (selected === null) { selected = i; if (i === q.answer) score += 1; draw(); } },
        }, String.fromCharCode(65 + i) + ". " + opt));
      });
      box.append(
        el("div", { class: "hint" }, pack.emoji + " " + pack.title + " · Question " + (qIndex + 1) + "/" + pack.questions.length + " · Score : " + score),
        el("div", { class: "q-text mt-2" }, q.q),
        answers
      );
      if (selected !== null) {
        if (q.fun) box.append(el("div", { class: "fun mt-3" }, "💡 " + q.fun));
        box.append(el("div", { class: "mt-3" }, btn(qIndex + 1 >= pack.questions.length ? "Voir le score" : "Question suivante →", () => {
          if (qIndex + 1 >= pack.questions.length) view = "end";
          else { qIndex += 1; selected = null; }
          draw();
        }, "primary")));
      }
    } else if (view === "end") {
      const emoji = score >= pack.questions.length * 0.7 ? "🏆" : score >= pack.questions.length * 0.4 ? "👏" : "🙈";
      box.append(el("div", { class: "center stack pt-8" },
        el("div", { class: "big-emoji" }, emoji),
        el("div", { style: "font-size:30px;font-weight:900" }, score + " / " + pack.questions.length),
        btn("← Retour aux quiz", () => { view = "library"; draw(); }, "go")
      ));
    }
  }
  draw();
}

/* -------------------------- 🤔 TU PRÉFÈRES -------------------------- */
function gameRather(back) {
  let view = "library";                        // library | playing
  let custom = load("rather-custom", []);
  let pack = null, index = 0, picked = null;

  const box = el("div");
  mount(box);

  const saveCustom = () => save("rather-custom", custom);
  function onImport(data) {
    if (!data || !Array.isArray(data.dilemmas)) { alert("Ce fichier n'est pas un « Tu préfères » valide (il manque « dilemmas »)."); return; }
    custom.push({ id: "imp-" + Date.now(), title: data.title || "Pack importé", emoji: data.emoji || "📥", dilemmas: data.dilemmas });
    saveCustom(); draw(); alert("Pack importé !");
  }
  function play(p) { pack = p; index = 0; picked = null; view = "playing"; draw(); }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Tu préfères ?", back));

    if (view === "library") {
      const list = el("div", { class: "stack" });
      RATHER_PACKS.concat(custom).forEach((p) => {
        const open = el("button", { class: "tile", onClick: () => play(p) },
          el("span", { class: "emoji" }, p.emoji),
          el("span", {}, el("span", { class: "name" }, p.title), el("span", { class: "desc" }, p.dilemmas.length + " dilemmes"))
        );
        const row = el("div", { class: "line" }, open,
          el("button", { class: "iconbtn exp", onClick: () => exportJSON({ type: "rather", title: p.title, emoji: p.emoji, dilemmas: p.dilemmas }, "tu-preferes-" + p.title + ".json") }, "⬇")
        );
        if (String(p.id).startsWith("imp-")) row.append(el("button", { class: "iconbtn del", onClick: () => { custom = custom.filter((c) => c.id !== p.id); saveCustom(); draw(); } }, "✕"));
        list.append(row);
      });
      box.append(el("div", { class: "label" }, "Choisis un pack"), list, el("div", { class: "mt-3" }, importButton("📥 Importer un pack (.json)", onImport)));
      // Génération par IA
      const themeInput = el("input", { class: "field", placeholder: "Thème (optionnel) : bouffe, voyages, absurde..." });
      box.append(el("div", { class: "card mt-3 stack" },
        el("div", { class: "label" }, "✨ Générer des dilemmes par IA"),
        themeInput,
        aiButton("✨ Générer (20 dilemmes)", async () => {
          const theme = themeInput.value.trim();
          const data = await aiGenerate('Génère 20 dilemmes "Tu préfères" fun et originaux en français' + (theme ? ', thème : "' + theme + '"' : "") + '. Réponds UNIQUEMENT avec un tableau JSON : [{"a":"option A","b":"option B"}]');
          if (!data || !Array.isArray(data)) return;
          const p = { id: "imp-" + Date.now(), title: "IA : " + (theme || "surprise"), emoji: "✨", dilemmas: data };
          custom.push(p); saveCustom(); play(p);
        })
      ));
    } else if (view === "playing") {
      const d = pack.dilemmas[index];
      box.append(el("div", { class: "stack" },
        el("div", { class: "hint center" }, pack.emoji + " " + pack.title + " · " + (index + 1) + "/" + pack.dilemmas.length),
        el("button", { class: "btn", style: "padding:24px;font-size:20px;" + (picked === "a" ? "background:var(--amber);color:var(--bg)" : ""), onClick: () => { picked = "a"; draw(); } }, d.a),
        el("div", { class: "center muted", style: "font-weight:900" }, "— OU —"),
        el("button", { class: "btn", style: "padding:24px;font-size:20px;" + (picked === "b" ? "background:var(--rose)" : ""), onClick: () => { picked = "b"; draw(); } }, d.b),
        el("div", { class: "center hint" }, "Chacun annonce son choix... puis débattez ! 🗣️"),
        btn(index + 1 >= pack.dilemmas.length ? "↺ Recommencer le pack" : "Dilemme suivant →", () => {
          index = (index + 1) % pack.dilemmas.length; picked = null; draw();
        }, "primary"),
        btn("← Changer de pack", () => { view = "library"; draw(); }, "soft")
      ));
    }
  }
  draw();
}

/* ------------------------- 📸 PHOTO MYSTÈRE ------------------------- */
const BLUR_LEVELS = [40, 22, 12, 6, 0]; // flou (en pixels) à chaque palier

function gamePhoto(back) {
  let phase = "setup";                     // setup | playing
  let photos = load("photo-photos", []);   // [{ img: base64, answer }]
  let order = [], pIndex = 0, level = 0, revealed = false;

  const box = el("div");
  mount(box);

  // Réduit + compresse une image pour qu'elle reste légère (sinon la
  // sauvegarde déborde). On la redessine dans un <canvas> puis on
  // l'exporte en JPEG qualité 60 %.
  function compress(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const max = 700;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const cv = el("canvas");
        cv.width = Math.round(img.width * scale);
        cv.height = Math.round(img.height * scale);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        resolve(cv.toDataURL("image/jpeg", 0.6));
      };
      img.src = dataUrl;
    });
  }

  async function addFiles(files) {
    for (const f of files) {
      const dataUrl = await new Promise((r) => { const rd = new FileReader(); rd.onload = () => r(rd.result); rd.readAsDataURL(f); });
      photos.push({ img: await compress(dataUrl), answer: "" });
    }
    draw();
  }

  function savePhotos() {
    const ok = save("photo-photos", photos);
    alert(ok ? "✅ Photos sauvegardées !" : "⚠️ Trop lourd pour la sauvegarde — supprime quelques photos.");
  }

  function start() {
    if (photos.length === 0) return;
    order = shuffle(photos.map((_, i) => i));
    pIndex = 0; level = 0; revealed = false; phase = "playing"; draw();
  }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Photo mystère", back));

    if (phase === "setup") {
      const fileInput = el("input", { type: "file", accept: "image/*", multiple: "true", style: "display:none", onChange: (e) => addFiles(Array.from(e.target.files || [])) });
      box.append(
        el("div", { class: "info mb-4", html: "📸 Chargez des photos (lieux, plats, gros plans, photos d'enfance...). Elles apparaissent <b>floutées</b> puis se dévoilent par paliers : premier qui devine marque des points !" }),
        fileInput,
        btn("📷 Ajouter des photos", () => fileInput.click(), "ghost")
      );
      if (photos.length > 0) {
        const list = el("div", { class: "stack mt-3" });
        photos.forEach((p, i) => {
          list.append(el("div", { class: "line card", style: "padding:8px" },
            el("img", { class: "thumb", src: p.img }),
            el("input", { class: "field", value: p.answer, placeholder: "Réponse (ex : le chat de Léa)", onInput: (e) => { p.answer = e.target.value; } }),
            el("button", { class: "iconbtn del", onClick: () => { photos.splice(i, 1); draw(); } }, "✕")
          ));
        });
        box.append(list,
          el("div", { class: "rowbtns mt-3" },
            btn("💾 Sauver", savePhotos, "ghost"),
            btn("⬇ Exporter", () => exportJSON({ type: "photos", title: "Mes photos", photos }, "photos-mystere.json"), "ghost"),
            btn("🚀 Jouer", start, "go")
          )
        );
      }
      box.append(el("div", { class: "mt-3" }, importButton("📥 Importer un pack de photos (.json)", (data) => {
        if (!data || !Array.isArray(data.photos)) { alert("Fichier de photos invalide."); return; }
        photos = photos.concat(data.photos); draw(); alert(data.photos.length + " photos importées !");
      }, "soft")));
    } else if (phase === "playing") {
      const cur = photos[order[pIndex]];
      const blur = BLUR_LEVELS[revealed ? BLUR_LEVELS.length - 1 : level];
      const controls = el("div");
      if (!revealed) {
        const c = el("div", { class: "rowbtns" });
        if (level < BLUR_LEVELS.length - 1) c.append(btn("🔍 Dévoiler un peu", () => { if (level + 1 === BLUR_LEVELS.length - 1) revealed = true; level += 1; draw(); }, "ghost"));
        c.append(btn("✅ Trouvé !", () => { revealed = true; draw(); }, "go"));
        controls.append(c);
      } else {
        controls.append(btn(pIndex + 1 >= order.length ? "🎉 Terminer" : "Photo suivante →", () => {
          if (pIndex + 1 >= order.length) phase = "setup";
          else { pIndex += 1; level = 0; revealed = false; }
          draw();
        }, "primary"));
      }
      box.append(el("div", { class: "center stack" },
        el("div", { class: "hint" }, "Photo " + (pIndex + 1) + "/" + order.length + " · " + (revealed ? "révélée !" : (BLUR_LEVELS.length - level) + " pts en jeu")),
        el("div", { class: "photo-frame" }, el("img", { src: cur.img, style: "filter:blur(" + blur + "px)" })),
        (revealed && cur.answer) ? el("div", { class: "reveal-good" }, cur.answer) : null,
        controls
      ));
    }
  }
  draw();
}

/* --------------------------- 🎧 BLIND TEST -------------------------- */
/* Rappel : on ne peut pas jouer Spotify DANS l'app (ça demande une
   connexion officielle + Premium + un site déclaré). Ici l'app gère la
   liste, les révélations et les points ; le SON se lance depuis ton
   appli Spotify/YouTube (au haut-parleur). Colle un lien après un « | »
   pour obtenir un bouton ▶ qui ouvre le morceau directement.          */
function gameBlindTest(back) {
  let phase = "setup";                       // setup | playing
  let tracksText = load("blindtest-text", "");
  let tracks = [], order = [], idx = 0, revealed = false;

  const box = el("div");
  mount(box);

  // Chaque ligne = "Titre - Artiste" et éventuellement " | lien"
  function parse(text) {
    return text.split(/\n+/).map((l) => l.trim()).filter(Boolean).map((line) => {
      const [main, link] = line.split("|").map((s) => s.trim());
      const [title, artist] = main.split(" - ").map((s) => s.trim());
      return { title: title || main, artist: artist || "", link: link || "" };
    });
  }

  function start() {
    tracks = parse(tracksText);
    if (tracks.length < 2) { alert("Ajoute au moins 2 morceaux."); return; }
    order = shuffle(tracks.map((_, i) => i));
    idx = 0; revealed = false; phase = "playing"; draw();
  }

  function draw() {
    box.innerHTML = "";
    box.append(backBar("Blind test", back));

    if (phase === "setup") {
      box.append(
        el("div", { class: "info mb-4", html: "🎧 L'app gère la liste, les révélations et les points ; <b>le son se lance depuis ton appli Spotify ou YouTube</b> (au haut-parleur). Colle un lien après un « | » pour un bouton ▶ direct." }),
        el("div", { class: "label" }, "Ta playlist (une ligne par morceau) 💾"),
        el("textarea", { class: "field", rows: 8, value: tracksText, placeholder: "Titre - Artiste\nBella Ciao - La Casa de Papel | https://youtu.be/xxxx\n...", onInput: (e) => { tracksText = e.target.value; save("blindtest-text", tracksText); } }),
        el("div", { class: "hint" }, "Format : Titre - Artiste, puis | lien (optionnel)."),
        el("div", { class: "mt-3" }, aiButton("✨ Proposer 15 tubes par IA (remplit la liste)", async () => {
          const theme = prompt("Thème de la playlist ? (ex : années 90, Disney, rap FR)") || "";
          const data = await aiGenerate('Propose 15 chansons très connues pour un blind test entre amis français' + (theme ? ', thème : "' + theme + '"' : "") + '. Uniquement des tubes reconnaissables. Réponds UNIQUEMENT par un tableau JSON : [{"title":"titre","artist":"artiste"}]');
          if (!data || !Array.isArray(data)) return;
          tracksText = data.map((t) => t.title + " - " + t.artist).join("\n");
          save("blindtest-text", tracksText); draw();
        })),
        el("div", { class: "mt-4" }, btn("🎵 Lancer le blind test", start, "go"))
      );
    } else if (phase === "playing") {
      const t = tracks[order[idx]];
      const content = el("div", { class: "center stack" }, el("div", { class: "hint" }, "Morceau " + (idx + 1) + "/" + order.length));
      if (!revealed) {
        content.append(
          el("div", { class: "bigcard", style: "background:var(--card);color:var(--amber);font-size:60px;padding:64px 16px" }, "🎵"),
          el("div", { class: "muted" }, "Lancez le son... qui trouve le titre ET l'artiste ?")
        );
        if (t.link) content.append(el("a", { class: "btn ghost", href: t.link, target: "_blank", rel: "noreferrer" }, "▶ Ouvrir dans l'appli musique"));
        content.append(btn("👁 Révéler la réponse", () => { revealed = true; draw(); }, "amber"));
      } else {
        content.append(
          el("div", { class: "reveal-good" }, el("div", { style: "font-size:28px;font-weight:900" }, t.title), t.artist ? el("div", { style: "font-size:18px;font-weight:700" }, t.artist) : null),
          btn(idx + 1 >= order.length ? "🎉 Terminer" : "Morceau suivant →", () => {
            if (idx + 1 >= order.length) phase = "setup";
            else { idx += 1; revealed = false; }
            draw();
          }, "primary")
        );
      }
      content.append(el("div", { class: "hint" }, "Comptez les points à voix haute (1 pt titre, 1 pt artiste 😉)"));
      box.append(content);
    }
  }
  draw();
}
