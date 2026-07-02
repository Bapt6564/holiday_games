/* ==================================================================
   main.js — LE MENU et le démarrage de l'app
   ------------------------------------------------------------------
   - GAMES : la liste des jeux du menu (emoji, nom, description, et la
     fonction à appeler pour lancer le jeu).
   - showMenu() : dessine l'écran d'accueil.
   - On enregistre aussi le "service worker" : c'est lui qui permet à
     l'app de fonctionner HORS LIGNE une fois installée.
   ================================================================== */

const GAMES = [
  { emoji: "🎲", name: "Dés", desc: "1 à 10 dés, faces au choix", run: gameDice },
  { emoji: "⏳", name: "Time's Up", desc: "Vos mots, 3 manches", run: gameTimesUp },
  { emoji: "🕵️", name: "Undercover", desc: "Démasquez l'imposteur", run: gameUndercover },
  { emoji: "❓", name: "Qui suis-je ?", desc: "Devinez votre personnage", run: gameQuiSuisJe },
  { emoji: "🔪", name: "Killer", desc: "Missions secrètes de la semaine", run: gameKiller },
  { emoji: "🚀", name: "Among Us", desc: "Imposteurs, missions, votes — sur plusieurs jours", run: gameAmongUs },
  { emoji: "🐺", name: "Loup-garou", desc: "Nuit anonyme, rôles au choix, votes", run: gameLoupGarou },
  { emoji: "📸", name: "Photo mystère", desc: "Vos photos, floutées !", run: gamePhoto },
  { emoji: "✨", name: "Quiz", desc: "Packs livrés + import", run: gameQuiz },
  { emoji: "🤔", name: "Tu préfères ?", desc: "Dilemmes absurdes", run: gameRather },
  { emoji: "🎧", name: "Blind test", desc: "Playlist, points, révélations", run: gameBlindTest },
  { emoji: "🎡", name: "Roulette", desc: "Corvées, gages... la roue décide", run: gameRoulette },
  { emoji: "⏱️", name: "Timer", desc: "Chrono pour tout le reste", run: gameTimer },
  { emoji: "⚙️", name: "Réglages IA", desc: "Ta clé API OpenAI (boutons ✨)", run: gameSettings },
];

function showMenu() {
  const list = el("div", { class: "stack" });
  GAMES.forEach((g) => {
    list.append(el("button", { class: "tile", onClick: () => g.run(showMenu) },
      el("span", { class: "emoji" }, g.emoji),
      el("span", {}, el("span", { class: "name" }, g.name), el("span", { class: "desc" }, g.desc))
    ));
  });
  mount(el("div", {},
    el("div", { class: "home-header" },
      el("div", { class: "home-logo" }, "🏖️"),
      el("h1", { class: "home-title" }, "Apéro Games"),
      el("p", { class: "home-sub" }, "Le kit de survie des vacances · réglages sauvegardés 💾")
    ),
    list
  ));
}

// Démarrage : on affiche le menu
showMenu();

// Service worker (mode hors ligne). On l'enregistre en chemin relatif
// pour que ça marche aussi dans un sous-dossier GitHub Pages.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      /* pas grave si ça échoue : l'app marche quand même en ligne */
    });
  });
}
