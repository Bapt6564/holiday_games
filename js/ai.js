/* ==================================================================
   ai.js — la GÉNÉRATION PAR IA (via ta clé API OpenAI)
   ------------------------------------------------------------------
   PRINCIPE : tu colles ta clé API dans l'écran ⚙️ Réglages. Elle est
   rangée dans le localStorage de TON téléphone uniquement — jamais
   dans le code, jamais sur GitHub. Les boutons "✨ IA" des jeux
   l'utilisent pour appeler l'API d'OpenAI directement.

   ⚠️ À SAVOIR :
   - L'API OpenAI est payante À LA REQUÊTE (indépendant d'un éventuel
     abonnement ChatGPT). Avec un petit modèle, chaque génération coûte
     une fraction de centime — mais surveille ton crédit sur
     platform.openai.com.
   - Ne partage pas ta clé. Tu peux la révoquer à tout moment sur le
     site d'OpenAI. Chaque téléphone du groupe peut avoir sa propre clé
     (ou aucune : les jeux marchent très bien sans, avec les packs).
   - Il faut une connexion internet pour générer (le reste de l'app
     fonctionne hors ligne).
   ================================================================== */

/* Demande à l'IA de produire du JSON et le renvoie sous forme d'objet
   JavaScript. Renvoie null (avec un message) si quelque chose échoue. */
async function aiGenerate(prompt) {
  const key = load("openai-key", "").trim();
  if (!key) {
    alert("Ajoute d'abord ta clé API dans ⚙️ Réglages IA (menu principal).");
    return null;
  }
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // La clé part directement de ton téléphone vers OpenAI
        "Authorization": "Bearer " + key,
      },
      body: JSON.stringify({
        model: load("openai-model", "gpt-4o-mini"), // petit modèle économique
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) {
      alert("Erreur API (" + res.status + "). Vérifie ta clé et ton crédit sur platform.openai.com.");
      return null;
    }
    const data = await res.json();
    const text = (data.choices && data.choices[0] && data.choices[0].message.content) || "";
    // L'IA renvoie parfois le JSON entouré de ```json ... ``` : on nettoie
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (e) {
    alert("Génération impossible (connexion ? réponse illisible ?). Réessaie.");
    return null;
  }
}

/* Petit utilitaire : bouton "✨ ..." qui affiche "⏳..." pendant l'appel */
function aiButton(label, run) {
  const b = btn(label, async () => {
    b.textContent = "⏳ Génération...";
    b.disabled = true;
    try { await run(); } finally { b.textContent = label; b.disabled = false; }
  }, "ghost");
  return b;
}

/* ------------------------ ⚙️ Écran Réglages ------------------------ */
function gameSettings(back) {
  const box = el("div");
  mount(box);

  const keyInput = el("input", {
    class: "field", type: "password", value: load("openai-key", ""),
    placeholder: "sk-...", autocomplete: "off",
    onInput: (e) => save("openai-key", e.target.value),
  });
  const modelInput = el("input", {
    class: "field", value: load("openai-model", "gpt-4o-mini"),
    onInput: (e) => save("openai-model", e.target.value || "gpt-4o-mini"),
  });

  box.append(
    backBar("⚙️ Réglages IA", back),
    el("div", { class: "info mb-4", html: "Colle ici ta <b>clé API OpenAI</b> (créée sur platform.openai.com → API keys). Elle reste <b>uniquement sur ce téléphone</b> et active les boutons ✨ des jeux (quiz, dilemmes, missions, personnages, playlists). Sans clé, tout fonctionne quand même avec les packs intégrés/importés." }),
    el("div", { class: "label" }, "Clé API"),
    keyInput,
    el("div", { class: "label mt-4" }, "Modèle"),
    modelInput,
    el("div", { class: "hint" }, "gpt-4o-mini est peu coûteux et suffisant pour des quiz. Facturation à la requête : surveille ton crédit."),
    el("div", { class: "mt-4" }, aiButton("🧪 Tester la connexion", async () => {
      const r = await aiGenerate('Réponds UNIQUEMENT avec le JSON {"ok":true}');
      if (r && r.ok) alert("✅ Ça marche ! Les boutons ✨ sont actifs.");
    })),
    el("div", { class: "mt-3" }, btn("🗑 Effacer la clé de ce téléphone", () => {
      if (confirm("Effacer la clé API stockée ?")) { save("openai-key", ""); keyInput.value = ""; }
    }, "soft"))
  );
}
