/* ==================================================================
   ui.js — LES OUTILS D'AFFICHAGE réutilisés par tous les jeux
   ------------------------------------------------------------------
   En JavaScript "pur" (sans React), on construit la page en créant des
   éléments HTML à la main. Pour ne pas se répéter, on a quelques
   fonctions raccourcis ici.

   La plus importante est el(...) : elle fabrique un élément.
   Exemple :  el("div", { class: "card" }, "Bonjour", monBouton)
   -> crée une <div class="card"> contenant le texte "Bonjour" et un bouton.
   ================================================================== */

// L'endroit unique où toute l'app s'affiche (le <div id="app"> du HTML)
const APP = document.getElementById("app");

// Vide l'écran et y place un nouvel élément
function mount(node) {
  APP.innerHTML = "";
  APP.append(node);
  window.scrollTo(0, 0); // on remonte en haut à chaque changement d'écran
}

/* Fabrique un élément HTML.
   - tag      : "div", "button", "input"...
   - props    : { class, text, html, placeholder, onClick, ... }
                (une clé qui commence par "on" devient un événement)
   - children : les éléments/texte à mettre dedans (autant qu'on veut) */
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const key in props) {
    const val = props[key];
    if (val == null || val === false) continue;
    if (key === "class") node.className = val;
    else if (key === "text") node.textContent = val;
    else if (key === "html") node.innerHTML = val;
    // ⚠️ "value" doit être affecté comme PROPRIÉTÉ (node.value), pas comme
    // attribut : sinon les <textarea> restent vides à l'affichage !
    else if (key === "value") node.value = val;
    else if (key.startsWith("on") && typeof val === "function")
      node.addEventListener(key.slice(2).toLowerCase(), val);
    else node.setAttribute(key, val);
  }
  // On aplatit les enfants (au cas où on passe un tableau) et on les ajoute
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

// Barre du haut : flèche retour + titre du jeu
function backBar(title, back) {
  return el("div", { class: "backbar" },
    el("button", { class: "backbtn", onClick: back }, "←"),
    el("h2", { class: "title" }, title)
  );
}

// Un bouton pleine largeur. variant = "primary" | "go" | "ghost" | "amber" | "soft" | ""
function btn(label, onClick, variant = "") {
  return el("button", { class: "btn " + variant, onClick }, label);
}

/* -------- IMPORT / EXPORT de fichiers .json --------
   exportJSON : propose au téléphone de télécharger un fichier.
   importButton : bouton qui ouvre le sélecteur de fichiers, lit le
   .json choisi et le transmet à ta fonction onData(objet).           */
function exportJSON(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = el("a", { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

function importButton(label, onData, variant = "ghost") {
  // input de type "file" caché, déclenché par un vrai bouton stylé
  const input = el("input", {
    type: "file",
    accept: "application/json,.json",
    style: "display:none",
    onChange: async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        onData(data);
      } catch {
        alert("Fichier illisible : un fichier .json de pack est attendu.");
      }
      e.target.value = ""; // permet de re-sélectionner le même fichier plus tard
    },
  });
  const button = btn(label, () => input.click(), variant);
  // On renvoie un petit conteneur avec le bouton + l'input caché
  return el("div", {}, button, input);
}

/* Mélange une liste au hasard (utilisé par plusieurs jeux). */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Éditeur de liste de joueurs (réutilisé par Undercover, Qui suis-je...).
   Il modifie directement la sauvegarde partagée (getPlayers/setPlayers).
   onChange() est rappelé pour redessiner l'écran quand on ajoute/enlève. */
function playerEditor(onChange) {
  let players = getPlayers();
  const box = el("div");
  function draw() {
    box.innerHTML = "";
    box.append(el("div", { class: "label" }, "Joueurs"));
    players.forEach((p, i) => {
      const field = el("input", {
        class: "field", value: p,
        onInput: (e) => { players[i] = e.target.value; setPlayers(players); },
      });
      const row = el("div", { class: "line" }, field);
      if (players.length > 3) {
        row.append(el("button", {
          class: "iconbtn del",
          onClick: () => { players.splice(i, 1); setPlayers(players); draw(); if (onChange) onChange(); },
        }, "✕"));
      }
      box.append(row);
    });
    if (players.length < 12) {
      box.append(el("button", {
        class: "link",
        onClick: () => { players.push("Joueur " + (players.length + 1)); setPlayers(players); draw(); if (onChange) onChange(); },
      }, "+ Ajouter un joueur"));
    }
  }
  draw();
  return box;
}
