/* ==================================================================
   data.js — LE CONTENU livré avec l'app
   ------------------------------------------------------------------
   C'est le fichier le plus FACILE à modifier : ajoute/enlève des
   questions, des dilemmes, des missions... sans toucher au reste.
   Pour ajouter un pack de quiz, copie un bloc existant et change le
   texte. (Ou, plus simple encore : importe un fichier .json depuis
   l'app, bouton "📥 Importer".)
   ================================================================== */

/* -------- Packs de QUIZ (question, 4 options, index de la bonne, anecdote) -------- */
const QUIZ_PACKS = [
  {
    id: "cultureg",
    title: "Apéro Culture G",
    emoji: "🍹",
    questions: [
      { q: "Combien de cœurs possède une pieuvre ?", options: ["1", "2", "3", "8"], answer: 2, fun: "Deux pompent le sang vers les branchies, un vers le reste du corps." },
      { q: "Quel aliment ne périme jamais ?", options: ["Le riz", "Le miel", "Le sel", "Le sucre"], answer: 1, fun: "On a retrouvé du miel comestible dans des tombes égyptiennes de 3000 ans." },
      { q: "Quelle est la capitale de l'Australie ?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2, fun: "Canberra fut créée exprès comme compromis entre Sydney et Melbourne." },
      { q: "Le vol commercial le plus court du monde dure environ...", options: ["90 secondes", "15 minutes", "45 minutes", "5 minutes"], answer: 0, fun: "En Écosse, entre deux îles Orcades : ~1min30, parfois moins avec du vent." },
      { q: "Quel animal peut survivre dans le vide de l'espace ?", options: ["Le cafard", "Le tardigrade", "La méduse", "La fourmi"], answer: 1, fun: "Le tardigrade mesure moins d'1 mm et résiste à presque tout." },
      { q: "De quelle couleur est le sang d'un poulpe ?", options: ["Rouge", "Vert", "Bleu", "Incolore"], answer: 2, fun: "Il utilise du cuivre (hémocyanine) au lieu du fer, d'où le bleu." },
      { q: "Quelle planète est la plus chaude du système solaire ?", options: ["Mercure", "Vénus", "Mars", "Jupiter"], answer: 1, fun: "Vénus (~460 °C) bat Mercure pourtant plus proche du Soleil : effet de serre." },
      { q: "Combien de fuseaux horaires traverse la Russie ?", options: ["5", "8", "11", "15"], answer: 2, fun: "Onze : quand il est midi à Moscou, c'est déjà le soir à Vladivostok." },
      { q: "Quel est l'organe le plus lourd du corps humain ?", options: ["Le foie", "Le cerveau", "La peau", "Les poumons"], answer: 2, fun: "La peau est bien un organe, et pèse environ 4 kg." },
      { q: "Quelle lettre n'apparaît dans le nom d'aucun État américain ?", options: ["Q", "Z", "X", "J"], answer: 0, fun: "Le Q ! Les autres lettres se retrouvent toutes quelque part." },
      { q: "Combien d'os possède un adulte ?", options: ["186", "206", "226", "246"], answer: 1, fun: "206 chez l'adulte ; un bébé en a environ 300 (certains fusionnent)." },
      { q: "Quel est l'animal terrestre le plus rapide ?", options: ["Le guépard", "L'antilope", "Le lion", "L'autruche"], answer: 0, fun: "Le guépard atteint 110 km/h... mais sur quelques secondes seulement." },
      { q: "Combien de faces a un ballon de foot classique ?", options: ["20", "32", "40", "12"], answer: 1, fun: "32 : vingt hexagones et douze pentagones." },
      { q: "Quel pays compte le plus de lacs au monde ?", options: ["La Finlande", "Le Canada", "La Russie", "La Suède"], answer: 1, fun: "Le Canada, avec plus de 2 millions de lacs." },
      { q: "Quelle est la substance la plus dure du corps humain ?", options: ["Les ongles", "L'émail dentaire", "Les os", "Les cheveux"], answer: 1, fun: "L'émail des dents, plus dur que l'os." },
      { q: "Combien de cordes a un violon ?", options: ["4", "5", "6", "7"], answer: 0, fun: "Quatre : sol, ré, la, mi." },
      { q: "Quelle mer est la plus salée ?", options: ["La mer Morte", "La mer Rouge", "La Méditerranée", "La mer Caspienne"], answer: 0, fun: "La mer Morte est si salée qu'on y flotte sans effort." },
      { q: "En combien de temps la lumière du Soleil atteint-elle la Terre ?", options: ["8 secondes", "8 minutes", "8 heures", "Instantanément"], answer: 1, fun: "Environ 8 minutes et 20 secondes." },
      { q: "Quel est le plus grand océan du monde ?", options: ["Atlantique", "Indien", "Arctique", "Pacifique"], answer: 3, fun: "Le Pacifique couvre à lui seul un tiers de la surface du globe." },
      { q: "Quel gaz les plantes absorbent-elles surtout le jour ?", options: ["Oxygène", "Azote", "Dioxyde de carbone", "Hydrogène"], answer: 2, fun: "Le CO₂, transformé en sucres grâce à la lumière (photosynthèse)." },
    ],
  },
  {
    id: "sciences",
    title: "Sciences déjantées",
    emoji: "🧪",
    questions: [
      { q: "Que fait un raisin sec plongé dans du champagne ?", options: ["Il coule", "Il monte et descend", "Il fond", "Il change de couleur"], answer: 1, fun: "Les bulles s'y accrochent, le font remonter, éclatent... et il redescend." },
      { q: "Pourquoi le ciel est-il bleu ?", options: ["Reflet des océans", "Diffusion de la lumière", "Couleur de l'air", "Reflet de l'espace"], answer: 1, fun: "L'atmosphère diffuse plus le bleu que le rouge (diffusion de Rayleigh)." },
      { q: "Quelle est la vitesse de la lumière (environ) ?", options: ["300 km/s", "3 000 km/s", "300 000 km/s", "3 millions km/s"], answer: 2, fun: "300 000 km/s : sept fois le tour de la Terre en une seconde." },
      { q: "À quelle température l'eau bout-elle au sommet de l'Everest ?", options: ["100 °C", "~70 °C", "120 °C", "90 °C"], answer: 1, fun: "La pression y est plus faible : impossible d'y cuire des pâtes correctement." },
      { q: "Combien de neurones environ dans un cerveau humain ?", options: ["86 millions", "86 milliards", "86 mille", "8 milliards"], answer: 1, fun: "Environ 86 milliards, chacun connecté à des milliers d'autres." },
      { q: "Qu'est-ce qui claque à une vitesse supersonique ?", options: ["Un éclair", "Le tonnerre", "Un avion de ligne", "Un coup de fouet"], answer: 3, fun: "Le « clac » du fouet est un mini bang : le bout dépasse la vitesse du son." },
      { q: "Pourquoi flotte-t-on mieux en mer qu'en piscine ?", options: ["L'eau salée est plus dense", "Il y a des vagues", "L'eau est plus froide", "On nage mieux"], answer: 0, fun: "Le sel augmente la densité de l'eau, qui nous pousse davantage vers le haut." },
      { q: "Quel est l'élément le plus abondant dans l'univers ?", options: ["Oxygène", "Carbone", "Hydrogène", "Fer"], answer: 2, fun: "L'hydrogène, le carburant des étoiles." },
      { q: "Que mesure une année-lumière ?", options: ["Du temps", "Une distance", "Une vitesse", "Une luminosité"], answer: 1, fun: "Une distance : celle parcourue par la lumière en un an (~9 500 milliards de km)." },
      { q: "Qu'est-ce qui provoque les marées ?", options: ["Le vent", "La Lune (et le Soleil)", "Les courants", "La rotation seule"], answer: 1, fun: "L'attraction de la Lune déforme les océans ; le Soleil module l'effet." },
      { q: "L'ambulance qui passe change de son : quel effet ?", options: ["L'écho", "L'effet Doppler", "La résonance", "Aucun"], answer: 1, fun: "Plus aiguë en approche, plus grave en s'éloignant : les ondes se compriment puis s'étirent." },
      { q: "De quoi le Soleil est-il principalement fait ?", options: ["De feu", "De lave", "De gaz (hydrogène/hélium)", "De roche en fusion"], answer: 2, fun: "C'est une immense boule de plasma, pas du feu au sens classique." },
      { q: "Combien pèse un nuage (cumulus moyen) ?", options: ["Rien, ça flotte", "Quelques kilos", "Des centaines de tonnes", "1 kg"], answer: 2, fun: "~500 tonnes d'eau ! Mais en fines gouttelettes en suspension." },
      { q: "Qu'est-ce que le zéro absolu ?", options: ["0 °C", "La température la plus froide possible (~-273 °C)", "L'absence de lumière", "Le vide"], answer: 1, fun: "À -273,15 °C les atomes cessent presque de bouger. On ne descend pas plus bas." },
      { q: "Pourquoi les astronautes flottent-ils dans l'ISS ?", options: ["Il n'y a plus de gravité", "Ils sont en chute libre permanente", "L'air les porte", "Ils sont légers"], answer: 1, fun: "La gravité est encore forte là-haut : ils « tombent » sans cesse autour de la Terre." },
      { q: "Quel objet a inspiré le Velcro ?", options: ["Un gecko", "Une plante à fruits accrochants", "Une araignée", "Une moule"], answer: 1, fun: "Les crochets des fruits de bardane collés au poil d'un chien." },
      { q: "Quelle est l'unité de la force ?", options: ["Le joule", "Le watt", "Le newton", "Le pascal"], answer: 2, fun: "Le newton, en hommage à Isaac Newton." },
      { q: "Pourquoi le miel ne se périme pas ?", options: ["Trop sucré pour les microbes", "Il est stérilisé", "Des conservateurs", "Il est gelé"], answer: 0, fun: "Sa faible teneur en eau et son sucre empêchent les bactéries de s'y développer." },
      { q: "Quand tu regardes une étoile lointaine, tu vois...", options: ["Le présent", "Le passé", "Le futur", "Une illusion"], answer: 1, fun: "Sa lumière a mis des années à t'arriver : tu la vois telle qu'elle était autrefois." },
      { q: "Combien de temps met la Lune à faire le tour de la Terre ?", options: ["1 jour", "1 semaine", "~1 mois", "1 an"], answer: 2, fun: "Environ 27 jours : d'où le mot « mois », lié à la Lune." },
    ],
  },
];

/* -------- Packs "TU PRÉFÈRES" (deux options a / b) -------- */
const RATHER_PACKS = [
  {
    id: "classic",
    title: "Dilemmes classiques",
    emoji: "🤔",
    dilemmas: [
      { a: "Pouvoir voler", b: "Être invisible" },
      { a: "Ne plus jamais manger de fromage", b: "Ne plus jamais boire de café" },
      { a: "Vivre sans musique", b: "Vivre sans films ni séries" },
      { a: "Avoir toujours trop chaud", b: "Avoir toujours trop froid" },
      { a: "Ne pouvoir que chuchoter", b: "Ne pouvoir que crier" },
      { a: "Parler toutes les langues", b: "Parler avec les animaux" },
      { a: "Vacances à la mer à vie", b: "Vacances à la montagne à vie" },
      { a: "Ne plus jamais utiliser ton téléphone", b: "Ne plus jamais regarder d'écran (TV, ordi)" },
      { a: "Manger épicé à chaque repas", b: "Manger fade à chaque repas" },
      { a: "Être toujours en retard", b: "Être toujours 30 min en avance" },
      { a: "Gagner au loto mais perdre tes amis", b: "Rester fauché mais entouré" },
      { a: "Ne dormir que 3 h par nuit (en forme)", b: "Devoir dormir 12 h obligatoires" },
      { a: "Vivre 100 ans en bonne santé", b: "Vivre 150 ans mais fragile" },
      { a: "Ne manger que sucré", b: "Ne manger que salé" },
      { a: "Savoir quand tu vas mourir", b: "Savoir comment" },
      { a: "Avoir un bouton pause sur ta vie", b: "Avoir un bouton retour en arrière" },
      { a: "Refaire tes études à zéro", b: "Ne plus jamais travailler mais t'ennuyer ferme" },
    ],
  },
  {
    id: "vacances",
    title: "Spécial vacances",
    emoji: "🌴",
    dilemmas: [
      { a: "Passer les vacances sans wifi", b: "Passer les vacances sans eau chaude" },
      { a: "Dormir en tente sous la pluie", b: "Dormir dans une voiture trop petite" },
      { a: "Un coup de soleil sur tout le corps", b: "Du sable partout pendant une semaine" },
      { a: "Être le/la seul(e) à savoir cuisiner", b: "Être le/la seul(e) à savoir conduire" },
      { a: "Réveillé chaque matin à 6 h", b: "Empêché de dormir chaque soir jusqu'à 3 h" },
      { a: "Perdre ton téléphone le 1er jour", b: "Perdre ta valise le 1er jour" },
      { a: "Partager une chambre avec un ronfleur", b: "Partager la salle de bain avec 6 personnes" },
      { a: "All-inclusive mais toujours au même endroit", b: "Roadtrip galère mais nouveau lieu chaque jour" },
      { a: "Une rando de 8 h pour une vue incroyable", b: "Rester à la piscine toute la journée" },
      { a: "Oublier la crème solaire", b: "Oublier le chargeur de ton téléphone" },
      { a: "Devoir faire la vaisselle tout le séjour", b: "Devoir cuisiner pour tout le monde" },
      { a: "Un séjour parfait mais vite oublié", b: "Un séjour chaotique dont tu parleras 20 ans" },
      { a: "Ne prendre aucune photo", b: "Ne faire QUE prendre des photos" },
      { a: "Perdre à tous les jeux du séjour", b: "Gagner tout le temps mais énerver les autres" },
    ],
  },
];

/* -------- Paires de mots pour UNDERCOVER (le civil / l'imposteur) -------- */
const WORD_PAIRS = [
  ["Croissant", "Pain au chocolat"], ["Plage", "Piscine"], ["Café", "Thé"],
  ["Vélo", "Trottinette"], ["Pizza", "Tarte flambée"], ["Guitare", "Ukulélé"],
  ["Tente", "Camping-car"], ["Fromage", "Yaourt"], ["Randonnée", "Balade"],
  ["Mojito", "Caïpirinha"], ["Pétanque", "Bowling"], ["Feu de camp", "Barbecue"],
  ["Serviette", "Paréo"], ["Crème solaire", "Monoï"], ["Palmes", "Tuba"],
  ["Glace", "Sorbet"], ["Hamac", "Transat"], ["Espadrilles", "Tongs"],
  ["Festival", "Concert"], ["Coucher de soleil", "Lever de soleil"],
];

/* -------- Personnages pour QUI SUIS-JE (mode "liste intégrée") -------- */
const CHARACTERS = [
  "Zinédine Zidane", "Marie Curie", "Albert Einstein", "Beyoncé", "Napoléon",
  "Astérix", "Thomas Pesquet", "Cléopâtre", "Harry Potter", "Mbappé",
  "Barack Obama", "Dark Vador", "Mona Lisa", "Jul", "Angela Merkel",
  "Sherlock Holmes", "Lady Gaga", "Léonard de Vinci", "Spider-Man", "Céline Dion",
  "Usain Bolt", "Jeanne d'Arc", "Michael Jackson", "Homer Simpson", "Coluche",
  "Freddie Mercury", "Mère Teresa", "Batman", "Amélie Poulain", "Cristiano Ronaldo",
];

/* -------- Missions pour le KILLER (l'action à faire réaliser à sa cible) -------- */
const KILLER_MISSIONS = [
  "lui faire dire le mot « ananas »",
  "lui faire lever les deux bras en même temps",
  "obtenir un check (poing contre poing) de sa part",
  "lui faire dire « je sais pas »",
  "lui faire chanter ne serait-ce que trois mots",
  "lui faire dire « il fait chaud »",
  "la/le faire s'asseoir par terre",
  "lui emprunter un objet et qu'elle/il te le rende",
  "lui faire dire le prénom d'un autre joueur",
  "obtenir qu'elle/il te serve à boire",
  "lui faire dire « trop bien »",
  "la/le faire rire aux éclats",
  "lui faire dire « je suis fatigué(e) »",
  "obtenir qu'elle/il prenne une photo de quelque chose",
  "lui faire dire « c'est pas faux »",
];

/* -------- Mini-défis IRL pour AMONG US (tâches de l'équipage) --------
   Des petites actions discrètes à réaliser au fil du séjour. */
const AMONGUS_TASKS = [
  "Faire dire « bonne idée » à quelqu'un",
  "Prendre un selfie avec 3 personnes différentes",
  "Ranger discrètement 5 objets qui traînent",
  "Placer le mot « cependant » dans une conversation",
  "Faire un compliment sincère à 2 personnes",
  "Prendre une photo d'un coucher ou lever de soleil",
  "Faire rire quelqu'un aux éclats",
  "Empiler 5 objets en équilibre et prendre une photo",
  "Chanter le refrain d'une chanson en entier",
  "Faire un check secret (tape de main) avec un autre joueur",
  "Faire deviner un dessin à quelqu'un",
  "Toucher un objet rouge, un bleu et un vert dans l'ordre",
  "Proposer un toast au groupe",
  "Faire 10 pompes d'un coup",
  "Aider à préparer un repas",
  "Réciter l'alphabet à l'envers (Z à A)",
  "Convaincre quelqu'un de te prêter un objet",
  "Boire un verre d'eau cul sec devant témoin",
  "Marcher 20 pas en arrière sans te faire remarquer",
  "Réussir à faire bailler quelqu'un",
];

/* -------- Thèmes prédéfinis de la ROULETTE -------- */
const ROULETTE_PRESETS = {
  "🧽 Corvées": ["Vaisselle", "Courses", "Cuisine", "Poubelles", "Balayage", "Rien du tout 😎"],
  "😈 Gages": ["Chante une chanson", "Imite quelqu'un du groupe", "Raconte une anecdote gênante", "10 pompes", "Parle en rimes pendant 5 min", "Sers l'apéro à tout le monde"],
  "🍽️ Ce soir on mange": ["Pâtes", "Barbecue", "Pizza", "Salade géante", "Crêpes", "Restaurant !"],
  "🎯 Activité du jour": ["Plage", "Rando", "Jeux de société", "Sieste collective", "Baignade", "Visite"],
};
