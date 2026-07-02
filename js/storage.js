/* ==================================================================
   storage.js — la SAUVEGARDE
   ------------------------------------------------------------------
   Le navigateur offre un petit espace de stockage appelé "localStorage".
   Il garde du texte, même après avoir fermé l'app. On y range les
   réglages : joueurs, mots du Time's Up, packs importés, etc.

   Deux fonctions simples utilisées partout :
     - save("clé", valeur)  : enregistre (n'importe quel objet/liste)
     - load("clé", defaut)  : relit (ou renvoie "defaut" si rien enregistré)

   Note : localStorage ne stocke que du texte, donc on convertit avec
   JSON.stringify (objet -> texte) et JSON.parse (texte -> objet).
   Limite d'environ 5 Mo : suffisant pour tout, sauf beaucoup de photos.
   ================================================================== */

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true; // succès
  } catch (e) {
    // Peut échouer si le stockage est plein (ex : trop de photos)
    console.error("Sauvegarde impossible :", e);
    return false;
  }
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback; // donnée absente ou illisible -> valeur par défaut
  }
}

/* Les joueurs sont partagés entre plusieurs jeux (Undercover, Killer...).
   On centralise leur lecture/écriture ici. */
function getPlayers() {
  return load("players", ["Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4", "Joueur 5"]);
}
function setPlayers(list) {
  save("players", list);
}
