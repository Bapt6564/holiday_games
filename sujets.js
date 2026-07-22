/* =====================================================================
   SUJETS.JS, le contenu du mémo
   ---------------------------------------------------------------------
   Ce fichier ne contient QUE les fiches du mémo : aucun code technique
   ici, vous pouvez modifier ou ajouter un sujet sans rien casser.

   ➕ POUR AJOUTER UN SUJET : copiez un bloc entre accolades { ... },
   changez le slug (l'identifiant entre guillemets, sans espaces ni
   accents), le titre, l'icône, le résumé et les sections.
   ➕ POUR FAIRE UN LIEN INTERNE vers un autre sujet, écrivez dans le
   texte : <a href="#/memo/slug-du-sujet">texte du lien</a>
   Les sections acceptent du HTML : <strong>, <ul><li>, etc.
   La classe "chiffre-cle" met un paragraphe en évidence (encadré doré).

   🖼️ POUR AJOUTER UNE IMAGE dans une fiche, déposez le fichier image
   dans le dossier /images du dépôt, puis écrivez dans une section :
     <figure class="illustration">
       <img src="images/nom-du-fichier.jpg" alt="description de l'image">
       <figcaption>Légende courte (facultative)</figcaption>
     </figure>
   L'image s'adapte automatiquement à la largeur de la fiche. Voir le
   README.md du dépôt pour plus de détails (formats, poids conseillé).

   📏 GABARIT CONSEILLÉ (pour rester rapide à lire sur le terrain) :
   la plupart des fiches ci-dessous suivent 3 sections courtes :
   1. Repérage, comment trouver l'objet dans le ciel
   2. Chiffres clés, distance / âge / température-couleur en un bloc
   3. Anecdotes, 1 ou 2 faits qui marquent les esprits
   Libre à vous de vous en écarter si un sujet s'y prête mal.
   ===================================================================== */
const SUJETS = {

  /* ===================== SYSTÈME SOLAIRE ===================== */

  "lune": {
    titre: "La Lune",
    cat: "Système solaire",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Lune",
    conte: "lune",
    resume: "Le satellite naturel de la Terre.",
    sections: [
      `<h2>Surface</h2>
       <p>
       <strong>Cratères :</strong> essentiellement des résidus d'impacts de météorites.<br>
       <strong>Mers et océans :</strong> anciennes coulées de lave (pas d'eau !), preuves de l'activité volcanique de la Lune.<br>
       Les cratères se voient bien mieux au <strong>terminateur</strong> (limite jour/nuit) : les ombres rasantes révèlent le relief. 
       La pleine lune, trop frontale, est paradoxalement le pire moment pour observer.</p>`,
      `<h2>Phases, marées, mouvement</h2>
       <p>Les phases ne sont pas la projection de l'ombre de la Terre (ça, c'est une <a href="#/memo/eclipses">éclipse</a>), 
       mais simplement le fait que seule une partie de la Lune est éclairée par le Soleil.
       La Lune provoque l'essentiel des <strong>marées</strong>, et elle nous montre toujours la même face : sa rotation sur elle-même dure exactement aussi longtemps 
       qu'une révolution autour de la Terre.</p>
       <div class="chiffre-cle">
         Âge : <strong>4,5 milliards d'années</strong> (née d'un impact géant peu après la Terre)<br>
         Distance : <strong>384 400 km</strong> (1,3 s-lumière) <br>
         Température : de +127 °C en plein jour à −173 °C la nuit, faute d'atmosphère.
       </div>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Elle s'éloigne de nous de <strong>3,8 cm par an</strong>, mesuré au laser grâce aux réflecteurs laissés par les missions Apollo. 
         Cela cause entre autres une augmentation lente de la durée du jour.</li>
         <li>La Chine, le Japon et la Corée voient un <strong>lapin</strong> en train de piler le riz dans les formes créées par les mers et océans lunaires.</li>
         <li>Il y a 1,8 milliards d'années, et pendant 1 milliard d'années, la distance Terre–Lune est restée constante : l'activité géologique, 
         climatique et biologique de la Terre ont très peu évolué. C'est le « Boring billion ».</li>
       </ul>`
    ],
        voirAussi: ["types-telescopes", "eclipses"]
  },

  "venus": {
    titre: "Vénus",
    cat: "Système solaire",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/V%C3%A9nus_(plan%C3%A8te)",
    resume: "L'étoile du Berger.",
    sections: [
      `<h2>Repérage</h2>
       <p>Toujours proche du Soleil dans le ciel : visible seulement en <strong>début de nuit</strong> (à l'ouest) ou à <strong>l'aube</strong> (à l'est), jamais en pleine nuit. Très brillante, blanc-jaunâtre, elle <strong>ne scintille presque pas</strong>, bon moyen de la distinguer d'une étoile.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Âge : <strong>4,6 milliards d'années</strong><br>
         Distance à la Terre : variable, de 40 à 260 millions de km<br>
         Température de surface : <strong>~465 °C</strong>, sous une atmosphère de CO₂ et des nuages d'acide sulfurique.</div>`,
      `<h2>Un enfer sous les nuages</h2>
       <p>Vénus est presque la jumelle de la Terre en taille, mais son atmosphère très dense de CO₂ a déclenché un <strong>effet de serre extrême</strong> : il y fait ~465 °C en permanence, jour et nuit, pôles compris, plus chaud que sur Mercure pourtant plus proche du Soleil. La pression au sol y est ~90 fois celle de la Terre, l'équivalent de 900 m sous l'océan. C'est l'exemple parfait pour parler d'effet de serre avec le public.</p>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Si brillante qu'on la signale régulièrement comme <strong>OVNI</strong> à la police.</li>
         <li>Elle tourne « à l'envers » (rotation rétrograde), et si lentement qu'un <strong>jour vénusien dure plus longtemps qu'une année vénusienne</strong>.</li>
         <li>Au <a href="#/memo/types-telescopes">télescope</a>, elle montre des phases comme la Lune, c'est en les observant que Galilée a achevé de démontrer que Vénus tourne autour du Soleil.</li>
       </ul>`
    ],
    voirAussi: ["types-telescopes"]
  },

  "jupiter": {
    titre: "Jupiter et ses lunes",
    cat: "Système solaire",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Jupiter_(plan%C3%A8te)",
    resume: "La plus grosse planète du système solaire.",
    sections: [
      `<h2>Repérage</h2>
       <p>Très brillante, blanc-jaunâtre, elle ne scintille presque pas. <br>
       Aux jumelles ou au petit télescope : jusqu'à 4 points alignés de part et d'autre de la planète, les <strong>lunes galiléennes</strong> 
       (Io, Europe, Ganymède, Callisto). 
       Leur position change rapidement, une bonne raison de faire revenir le public plus tard dans la soirée.<br>
       Avec un grossissement suffisant, on peut distinguer les bandes de nuages, voir la grosse tache rouge.
       </p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">
       Distance à la Terre : 4 à 6 UA selon les positions <br>
       Température au sommet des nuages : ~−110 °C <br>
       Diamètre : 11 fois celui de la Terre.</div>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>C'est en observant ces 4 lunes tourner autour de Jupiter, en 1610, que <strong>Galilée</strong> a compris que tout ne tourne pas autour de la Terre.</li>
         <li>La <strong>Grande Tache rouge</strong>, une tempête plus grande que la Terre entière, est observée depuis plus de 350 ans.</li>
         <li><strong>Europe</strong> cache un océan d'eau liquide sous sa croûte de glace. 
         C'est l'une des meilleures pistes pour chercher la vie ailleurs dans le système solaire.</li>
       </ul>`
    ],
        voirAussi: ["types-telescopes", "saturne"]
  },

  "saturne": {
    titre: "Saturne",
    cat: "Système solaire",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Saturne_(plan%C3%A8te)",
    resume: "Les plus beaux anneaux.",
    sections: [
      `<h2>Repérage</h2>
       <p>Jaune pâle à l'œil nu, sans rien de spécial. Mais dès un petit télescope, ses <strong>anneaux</strong> apparaissent nettement, l'un des spectacles les plus sûrs d'une soirée d'observation.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~9 à 10 UA<br>
         Les anneaux s'étendent sur ~280 000 km, mais ne font que quelques dizaines de mètres d'épaisseur, proportionnellement plus fins qu'une feuille de papier.</div>`,
      `<h2>Sous la surface</h2>
       <p>Saturne est une géante gazeuse : une atmosphère de <strong>96 % d'hydrogène et 4 % d'hélium</strong>, balayée par des vents jusqu'à <strong>1 800 km/h</strong>, parmi les plus rapides du système solaire. En profondeur, l'hydrogène comprimé devient métallique et conduit l'électricité, ce qui engendre son champ magnétique. Au centre, un noyau de roches et de fer d'environ deux fois le diamètre de la Terre. Près du pôle nord, les sondes ont photographié un mystérieux <strong>motif hexagonal</strong> dans les nuages, encore largement inexpliqué.</p>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Les anneaux sont faits de <strong>milliards de blocs de glace</strong>, du grain de sable à la maison, chacun en orbite indépendante.</li>
         <li>Saturne est <strong>moins dense que l'eau</strong> : elle flotterait dans une baignoire géante.</li>
         <li>Tous les <strong>~15 ans</strong>, les anneaux se présentent exactement par la tranche et semblent disparaître, vus depuis la Terre.</li>
       </ul>`
    ],
    voirAussi: ["types-telescopes", "jupiter"]
  },

  /* ===================== REPÈRES À L'ŒIL NU ===================== */

  "voie-lactee": {
    titre: "La Voie lactée",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Voie_lact%C3%A9e",
    conte: "voie-lactee",
    resume: "Notre galaxie vue de l'intérieur, par la tranche, visible seulement loin des villes.",
    sections: [
      `<h2>Repérage</h2>
       <p>Il faut un <strong>ciel bien noir</strong>, loin de la <a href="#/memo/pollution-lumineuse">pollution lumineuse</a> : une bande floue et laiteuse qui traverse le ciel. En été, elle est spectaculaire vers le Sagittaire (on regarde alors vers le <strong>centre de la Galaxie</strong>) ; en hiver, plus discrète, vers Persée et Cassiopée (on regarde vers l'extérieur).</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Âge : plus de <strong>13 milliards d'années</strong> pour ses étoiles les plus vieilles<br>
         Distance au centre : ~26 000 années-lumière (on est dedans !)<br>
         <strong>100 à 400 milliards d'étoiles</strong>, disque de ~100 000 années-lumière de diamètre.</div>`,
      `<h2>Notre adresse dans la Galaxie</h2>
       <p>Le système solaire se trouve dans le <strong>bras d'Orion</strong>, un bras spiral secondaire, à ~26 000 années-lumière du centre galactique. Nous tournons autour de ce centre en <strong>225 à 250 millions d'années</strong> : la dernière fois que le Soleil était « ici », les dinosaures commençaient à peine leur règne. Vers le <a href="#/memo/sagittaire">Sagittaire</a>, on regarde vers le centre, d'où la bande plus brillante en été.</p>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Ce qu'on voit n'est que la <strong>lumière cumulée de milliards d'étoiles</strong> trop faibles pour être distinguées une à une.</li>
         <li>Le mot « galaxie » vient du grec <em>gala</em>, le lait : dans le mythe, c'est le lait renversé de la déesse Héra.</li>
       </ul>`
    ],
    voirAussi: ["etoile-polaire", "andromede", "pollution-lumineuse"]
  },

  "triangle-ete": {
    titre: "Le Triangle d'été",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Triangle_de_l%27%C3%A9t%C3%A9",
    conte: "triangle-ete",
    resume: "Trois étoiles brillantes de trois constellations différentes, le meilleur point de départ pour s'orienter en été.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg">
             <polyline points="262.5,90.9 77.5,44.0 147.3,336.0 262.5,90.9" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="262.5" cy="90.9" r="4.0" class="etoile-phare"/>
             <text x="254.5" y="93.9" class="etoile-nom etoile-phare" text-anchor="end">Véga</text>
             <circle cx="77.5" cy="44.0" r="3.4"/>
             <text x="85.5" y="47.0" class="etoile-nom" text-anchor="start">Deneb</text>
             <circle cx="147.3" cy="336.0" r="3.6"/>
             <text x="147.3" y="352.0" class="etoile-nom" text-anchor="middle">Altaïr</text>
             <circle cx="100.2" cy="86.4" r="2.4"/>
             <text x="108.2" y="80.4" class="etoile-nom" text-anchor="start">Sadr</text>
             <circle cx="183.5" cy="186.6" r="2.6"/>
             <text x="191.5" y="190.6" class="etoile-nom" text-anchor="start">Albireo</text>
           </svg>
         <figcaption>Le Triangle d'été (Véga, Deneb, Altaïr), d'après les positions réelles. Sont aussi repérées, sans être reliées, Sadr (au cœur du Cygne) et Albireo (à sa tête), utiles pour se guider vers les objets de la région.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Formé par <strong>Véga</strong> (Lyre), <strong>Deneb</strong> (Cygne) et <strong>Altaïr</strong> (Aigle) : un vaste triangle très haut dans le ciel les soirées d'été. Ce n'est pas une constellation officielle, juste un repère bien pratique, un <em>astérisme</em>.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Véga : 25 années-lumière, blanche-bleutée, ~9 600 °C<br>
         Altaïr : seulement 17 années-lumière, blanche, ~7 500 °C<br>
         Deneb : ~2 600 années-lumière (très incertain, elle est si loin qu'on peine à la mesurer), blanche-bleutée, ~8 500 °C.</div>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Deneb est <strong>100 fois plus loin</strong> qu'Altaïr mais paraît presque aussi brillante : elle est en réalité environ 200 000 fois plus lumineuse que le Soleil. Une belle façon d'expliquer que l'éclat apparent ne dit rien de la distance.</li>
         <li>Dans <strong>12 000 ans</strong>, à cause de la précession, Véga deviendra la nouvelle étoile polaire (<a href="#/memo/etoile-polaire">détails ici</a>).</li>
       </ul>`
    ],
    voirAussi: ["etoile-polaire", "albireo", "epsilon-lyre", "nebuleuse-lyre", "cintre"]
  },

  "etoile-polaire": {
    titre: "L'étoile polaire",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/%C3%89toile_polaire",
    resume: "Pas la plus brillante du ciel, juste celle qui a la bonne adresse, et pour un temps limité.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg">
             <polyline points="231.6,44.0 187.4,90.5 148.7,155.7 151.0,236.9 108.4,251.9 140.9,336.0 184.3,308.2 151.0,236.9" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="231.6" cy="44.0" r="3.2" class="etoile-phare"/>
             <text x="223.6" y="47.0" class="etoile-nom etoile-phare" text-anchor="end">Polaris</text>
             <circle cx="187.4" cy="90.5" r="1.9"/>
             <circle cx="148.7" cy="155.7" r="1.8"/>
             <circle cx="151.0" cy="236.9" r="1.9"/>
             <circle cx="108.4" cy="251.9" r="1.7"/>
             <circle cx="184.3" cy="308.2" r="2.7"/>
             <text x="192.3" y="311.2" class="etoile-nom" text-anchor="start">Kochab</text>
             <circle cx="140.9" cy="336.0" r="2.2"/>
             <text x="140.9" y="351.0" class="etoile-nom" text-anchor="middle">Pherkad</text>
           </svg>
         <figcaption>La Petite Ourse, d'après les positions réelles : une petite casserole dont le bout du manche est Polaris, l'étoile polaire. Les deux « gardiennes du pôle », Kochab et Pherkad, forment le bord du bol.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Prolongez environ 5 fois la distance entre les deux étoiles du bord de la « casserole » de la Grande Ourse (les « pointeurs ») : vous tombez sur Polaris, au bout du manche de la Petite Ourse. Les deux étoiles du bord de son bol, <strong>Kochab</strong> et <strong>Pherkad</strong>, sont surnommées les « gardiennes du pôle ». Contrairement à une idée reçue, ce <strong>n'est pas l'étoile la plus brillante</strong> du ciel, elle n'arrive qu'en ~50e position. Son seul talent : l'axe de la Terre pointe presque exactement vers elle, donc elle ne bouge quasiment pas de la nuit.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~433 années-lumière<br>
         Température : ~6 000 °C, jaune-blanc (une supergéante)<br>
         Magnitude : ~2, discrète pour son rôle.</div>`,
      `<h2>La précession des équinoxes</h2>
       <p>Comme une toupie qui ralentit, l'axe de la Terre décrit lentement un grand cercle dans le ciel en <strong>26 000 ans</strong>. « L'étoile polaire » change donc au fil des millénaires : il y a 4 700 ans, c'était Thuban (dans le Dragon) ; dans <strong>~12 000 ans</strong>, ce sera <a href="#/memo/triangle-ete">Véga</a>, bien plus brillante, la future « étoile polaire de luxe ». La Lune ajoute à cette précession une petite oscillation supplémentaire, la <strong>nutation</strong>, de période 18,6 ans. Conséquence concrète de la précession : le cycle des saisons est ~20 minutes plus court que l'année sidérale, un détail crucial pour la précision des calendriers.</p>`
    ],
    voirAussi: ["triangle-ete", "voie-lactee"]
  },

  "couronne-boreale": {
    titre: "La Couronne boréale & Gemma",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Couronne_bor%C3%A9ale",
    conte: "couronne-boreale",
    resume: "Un petit demi-cercle discret entre le Bouvier et Hercule, surnommé sans façon « le bol des pauvres ».",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 270" xmlns="http://www.w3.org/2000/svg">
             <polyline points="255.3,44.0 295.3,120.1 245.6,203.4 183.9,218.5 131.1,226.0 70.5,197.0 44.7,94.2" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="255.3" cy="44.0" r="1.9"/>
             <circle cx="295.3" cy="120.1" r="2.1"/>
             <text x="287.3" y="123.1" class="etoile-nom" text-anchor="end">Nusakan</text>
             <circle cx="245.6" cy="203.4" r="3.4" class="etoile-phare"/>
             <text x="245.6" y="219.4" class="etoile-nom etoile-phare" text-anchor="middle">Alphecca</text>
             <circle cx="183.9" cy="218.5" r="2.0"/>
             <circle cx="131.1" cy="226.0" r="1.9"/>
             <circle cx="70.5" cy="197.0" r="2.0"/>
             <circle cx="44.7" cy="94.2" r="1.9"/>
           </svg>
         <figcaption>La Couronne boréale, d'après les positions réelles : un arc de sept étoiles ouvert vers le nord. La plus brillante : Alphecca (Gemma) ; à ses côtés, Nusakan.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Un arc de 7 étoiles en demi-cercle, entre <strong>Arcturus</strong> (Bouvier) et <a href="#/memo/m13">Hercule</a>. Discrète mais reconnaissable une fois repérée : une vraie petite couronne dans le ciel.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle"><strong>Gemma</strong> (ou Alphecca), l'étoile la plus brillante de l'arc : ~75 années-lumière, blanche, ~9 700 °C.</div>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Surnommée <strong>« le bol des pauvres »</strong> : comparée à une vraie couronne sertie de joyaux, ce simple arc d'étoiles a un petit air de coupelle toute simple.</li>
         <li>Dans la mythologie grecque, c'est la couronne offerte par Dionysos à Ariane, placée au ciel après leurs noces.</li>
       </ul>`
    ],
    voirAussi: ["m13"]
  },

  "pleiades": {
    titre: "Les Pléiades (M45)",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Pl%C3%A9iades_(astronomie)",
    conte: "pleiades",
    resume: "Un amas de jeunes étoiles bleues, si célèbre qu'il a donné son nom à une marque de voitures.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 240" xmlns="http://www.w3.org/2000/svg">
             <circle cx="142.2" cy="156.6" r="3.0" class="etoile-phare"/>
             <text x="150.2" y="166.6" class="etoile-nom etoile-phare" text-anchor="start">Alcyone</text>
             <circle cx="46.3" cy="169.3" r="2.4"/>
             <text x="46.3" y="183.3" class="etoile-nom" text-anchor="middle">Atlas</text>
             <circle cx="44.8" cy="148.5" r="1.8"/>
             <text x="44.8" y="139.5" class="etoile-nom" text-anchor="middle">Pléioné</text>
             <circle cx="208.4" cy="196.0" r="2.2"/>
             <text x="208.4" y="210.0" class="etoile-nom" text-anchor="middle">Mérope</text>
             <circle cx="291.5" cy="154.5" r="2.2"/>
             <text x="283.5" y="164.5" class="etoile-nom" text-anchor="end">Électre</text>
             <circle cx="236.9" cy="90.6" r="2.2"/>
             <text x="236.9" y="81.6" class="etoile-nom" text-anchor="middle">Maia</text>
             <circle cx="272.3" cy="65.7" r="2.0"/>
             <text x="264.3" y="65.7" class="etoile-nom" text-anchor="end">Taygète</text>
             <circle cx="295.2" cy="110.3" r="1.6"/>
             <text x="287.2" y="114.3" class="etoile-nom" text-anchor="end">Célaeno</text>
             <circle cx="232.5" cy="44.0" r="1.5"/>
             <text x="238.5" y="37.0" class="etoile-nom" text-anchor="start">Astérope</text>
           </svg>
         <figcaption>Les Pléiades, d'après les positions réelles des Sept Sœurs et de leurs parents Atlas et Pléioné. La plus brillante : Alcyone.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Visible en hiver, près d'Orion et du Taureau : un petit amas compact à l'œil nu, souvent pris pour une « mini casserole ». Classique test de vue : combien d'étoiles distinguez-vous (en général 6 à 7, jusqu'à une douzaine sous un ciel exceptionnel) ?</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~444 années-lumière<br>
         Âge : environ <strong>100 millions d'années</strong>, les dinosaures existaient déjà quand ces étoiles sont nées<br>
         Étoiles bleues très chaudes (types B), ~10 000 à 25 000 °C.</div>`,
      `<h2>Un amas jeune, et éphémère</h2>
       <p>Les Pléiades sont un <a href="#/memo/types-amas">amas ouvert</a> d'environ 3 000 étoiles nées ensemble il y a ~100 millions d'années. Ses étoiles les plus brillantes sont des <strong>géantes bleues très chaudes</strong>, jeunes et lumineuses. Mais l'amas est peu lié par la gravité : ses étoiles s'écartent lentement, et d'ici ~250 millions d'années, elles se seront dispersées, chacune de son côté. Les Sept Sœurs finiront par se séparer.</p>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Au télescope, on distingue une fine <strong>nébulosité bleutée</strong> autour des étoiles : un nuage de poussière qui ne fait que réfléchir leur lumière (<a href="#/memo/types-nebuleuses">nébuleuse par réflexion</a>).</li>
         <li>Le constructeur automobile <strong>Subaru</strong> tire son nom (et son logo à 6 étoiles) du nom japonais de cet amas.</li>
       </ul>`
    ],
    voirAussi: ["types-nebuleuses", "types-amas", "double-amas-perse"]
  },

  "antares-scorpion": {
    titre: "Antarès et le Scorpion",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Antar%C3%A8s",
    conte: "orion-scorpion",
    resume: "Supergéante rouge, cœur du Scorpion.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 322" xmlns="http://www.w3.org/2000/svg">
             <polyline points="286.4,44.0 296.0,73.8 295.8,109.6" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="296.0,73.8 245.5,98.8 226.1,106.0 210.6,123.5 177.5,185.1 173.5,223.6 167.9,267.6 134.9,277.2 87.8,278.0 72.8,238.9 88.2,217.4" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="88.2,217.4 94.1,218.9" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="286.4" cy="44.0" r="2.4"/>
             <text x="278.4" y="47.0" class="etoile-nom" text-anchor="end">Acrab</text>
             <circle cx="296.0" cy="73.8" r="2.8"/>
             <text x="288.0" y="76.8" class="etoile-nom" text-anchor="end">Dschubba</text>
             <circle cx="295.8" cy="109.6" r="2.0"/>
             <text x="287.8" y="112.6" class="etoile-nom" text-anchor="end">Fang</text>
             <circle cx="245.5" cy="98.8" r="1.8"/>
             <circle cx="226.1" cy="106.0" r="4.5" class="etoile-phare"/>
             <text x="226.1" y="95.0" class="etoile-nom etoile-phare" text-anchor="middle">Antarès</text>
             <circle cx="210.6" cy="123.5" r="1.8"/>
             <circle cx="177.5" cy="185.1" r="2.2"/>
             <circle cx="173.5" cy="223.6" r="1.8"/>
             <circle cx="167.9" cy="267.6" r="1.8"/>
             <circle cx="134.9" cy="277.2" r="1.8"/>
             <circle cx="87.8" cy="278.0" r="2.4"/>
             <text x="87.8" y="292.0" class="etoile-nom" text-anchor="middle">Sargas</text>
             <circle cx="72.8" cy="238.9" r="1.8"/>
             <circle cx="88.2" cy="217.4" r="3.0" class="etoile-phare"/>
             <text x="94.2" y="209.4" class="etoile-nom etoile-phare" text-anchor="start">Shaula</text>
             <circle cx="94.1" cy="218.9" r="2.0"/>
             <text x="100.1" y="231.9" class="etoile-nom" text-anchor="start">Lesath</text>
             <circle cx="239.4" cy="107.9" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="247.4" y="120.9" class="etoile-nom" text-anchor="start">M4</text>
             <circle cx="69.1" cy="169.1" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="77.1" y="173.1" class="etoile-nom" text-anchor="start">M6</text>
             <circle cx="44.0" cy="198.6" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="52.0" y="202.6" class="etoile-nom" text-anchor="start">M7</text>
           </svg>
         <figcaption>Le Scorpion, d'après les positions réelles : la tête (Acrab, Dschubba, Fang), le cœur Antarès, la longue queue plongeante remontant en hameçon vers le dard (Shaula, Lesath). Cercles dorés : amas M4, M6, M7.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>En été, cherchez bas sur l'horizon sud une longue courbe d'étoiles en <strong>hameçon</strong> : le Scorpion, l'une des rares constellations qui ressemble vraiment à son nom. Antarès brille en son cœur, d'une couleur rouge-orangé nette même à l'œil nu. La constellation pointe vers le centre de la Galaxie, dans une région très riche de la <a href="#/memo/voie-lactee">Voie lactée</a>.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">
         Distance : ~550 années-lumière<br>
         Température : ~3 400 °C seulement (d'où le rouge)<br>
         Taille : ~700 fois le rayon du Soleil (à la place du Soleil, elle engloberait l'orbite de Mars)<br>
         Masse : ~15 fois celle du Soleil. Âge : ~11 millions d'années
       </div>`,
      `<h2>Une étoile en fin de vie</h2>
       <p>Antarès est une <strong>supergéante rouge</strong> : une étoile massive arrivée en toute fin de vie, qui a gonflé jusqu'à une taille démesurée. Malgré son volume gigantesque, sa surface est relativement froide (~3 400 °C), ce qui explique sa couleur. Elle explosera un jour en <a href="#/memo/cycle-vie-etoiles">supernova</a>, comme sa cousine Bételgeuse dans Orion. Elle possède aussi une étoile compagnon plus petite et bleutée : c'est un système double.</p>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Son nom vient du grec <strong>Anti-Arès</strong>, «&nbsp;la rivale de Mars&nbsp;». Les astronomes grecs comparaient déjà sa couleur rouge à celle de la planète, avec laquelle on peut la confondre quand Mars passe dans les parages.</li>
         <li>La queue recourbée du Scorpion se termine par deux étoiles, <strong>Shaula</strong> et <strong>Lesath</strong>, qui marquent le dard prêt à piquer, avec <strong>Sargas</strong> juste avant.</li>
         <li>La région regorge d'amas d'étoiles visibles aux jumelles : <strong>M4</strong> (un amas globulaire tout près d'Antarès), <strong>M6</strong> (l'amas du Papillon) et <strong>M7</strong> (l'amas de Ptolémée) vers le dard.</li>
       </ul>`
    ],
    voirAussi: ["cycle-vie-etoiles", "voie-lactee"]
  },

  "cintre": {
    titre: "L'astérisme du Cintre",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Amas_de_Brocchi",
    resume: "Dix étoiles qui dessinent un cintre parfait aux jumelles, et qui n'ont presque rien à voir entre elles.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 184" xmlns="http://www.w3.org/2000/svg">
             <polyline points="294.9,134.0 242.3,124.0 193.5,140.0 144.6,128.0 92.1,132.0 45.1,140.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="193.5,140.0 182.2,66.0 154.0,44.0 129.6,70.0 120.2,104.0 92.1,132.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="294.9" cy="134.0" r="2.0"/>
             <circle cx="242.3" cy="124.0" r="2.0"/>
             <circle cx="193.5" cy="140.0" r="2.0"/>
             <circle cx="144.6" cy="128.0" r="2.0"/>
             <circle cx="92.1" cy="132.0" r="2.0"/>
             <circle cx="45.1" cy="140.0" r="2.0"/>
             <circle cx="120.2" cy="104.0" r="2.0"/>
             <circle cx="129.6" cy="70.0" r="2.0"/>
             <circle cx="154.0" cy="44.0" r="2.0"/>
             <circle cx="182.2" cy="66.0" r="2.0"/>
           </svg>
         <figcaption>Le Cintre (amas de Brocchi), orienté comme le porte-manteau qu'il évoque : la barre droite en bas, le crochet qui remonte au-dessus. Un astérisme de dix étoiles, superbe aux jumelles.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Aux jumelles, entre le <a href="#/memo/triangle-ete">Cygne et l'Aigle</a>, près de la petite constellation de la Flèche : dix étoiles dessinent un <strong>cintre</strong> (ou une pipe, selon les yeux) étonnamment net. Connu aussi sous le nom d'amas de Brocchi.</p>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Longtemps classé comme un amas d'étoiles, on sait aujourd'hui que la <strong>plupart de ses étoiles ne sont pas physiquement liées</strong> : un simple alignement vu depuis la Terre, un « faux amas », comme la Grande Ourse elle-même.</li>
         <li>Déjà répertorié par l'astronome perse <strong>Al-Sufi vers l'an 964</strong>.</li>
       </ul>`
    ],
    voirAussi: ["triangle-ete"]
  },

  /* ===================== DOUBLES & PETITS AMAS AU TÉLESCOPE ===================== */

  "alcor-mizar": {
    titre: "Alcor & Mizar",
    cat: "Étoiles doubles & multiples",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Mizar_(%C3%A9toile)",
    conte: "deux-ourses",
    resume: "Le test de vue caché dans la Grande Ourse.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 213" xmlns="http://www.w3.org/2000/svg">
             <polyline points="276.2,44.0 295.9,95.9 227.6,139.5 193.1,107.8 276.2,44.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="193.1,107.8 137.9,117.5 93.2,121.7 44.1,169.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="276.2" cy="44.0" r="2.8"/>
             <text x="268.2" y="47.0" class="etoile-nom" text-anchor="end">Dubhe</text>
             <circle cx="295.9" cy="95.9" r="2.5"/>
             <text x="287.9" y="98.9" class="etoile-nom" text-anchor="end">Merak</text>
             <circle cx="227.6" cy="139.5" r="2.3"/>
             <text x="219.6" y="142.5" class="etoile-nom" text-anchor="end">Phecda</text>
             <circle cx="193.1" cy="107.8" r="2.0"/>
             <text x="185.1" y="110.8" class="etoile-nom" text-anchor="end">Megrez</text>
             <circle cx="137.9" cy="117.5" r="2.6"/>
             <text x="145.9" y="120.5" class="etoile-nom" text-anchor="start">Alioth</text>
             <circle cx="93.2" cy="121.7" r="3.0" class="etoile-phare"/>
             <text x="93.2" y="137.7" class="etoile-nom etoile-phare" text-anchor="middle">Mizar</text>
             <circle cx="91.4" cy="120.7" r="1.6" class="etoile-phare"/>
             <text x="91.4" y="111.7" class="etoile-nom etoile-phare" text-anchor="middle">Alcor</text>
             <circle cx="44.1" cy="169.0" r="2.5"/>
             <text x="52.1" y="172.0" class="etoile-nom" text-anchor="start">Alkaïd</text>
           </svg>
         <figcaption>La Grande Casserole, d'après les positions réelles : le bol (Dubhe, Merak, Phecda, Megrez) et le manche (Alioth, Mizar et sa compagne Alcor juste au-dessus, Alkaïd).</figcaption>
       </figure>`,
      `<h2>Le test de vue des anciens</h2>
       <p>Regardez la deuxième étoile du manche de la Grande Ourse : c'est <strong>Mizar</strong>. Juste à côté, une étoile plus faible : <strong>Alcor</strong>. Distinguer les deux à l'œil nu demande une bonne vue, et servait de test dans de nombreuses cultures : chez les Romains, chez les Arabes (qui appelaient Alcor «&nbsp;l'Oubliée&nbsp;»), et au Japon pour évaluer la vue des archers samouraïs.</p>`,
      `<h2>La surprise au télescope</h2>
       <p>Pointez un <a href="#/memo/types-telescopes">télescope</a> sur Mizar : elle se dédouble. Mizar fut la <strong>première étoile double découverte au télescope</strong>, vers 1617. Et ce n'est pas fini : chacune de ces deux étoiles est elle-même double, et Alcor aussi.</p>
       <div class="chiffre-cle">
         Distance : ~80 années-lumière<br>
         Ce point de lumière est en réalité un système de <strong>6 étoiles</strong> liées par la gravité.
       </div>`,
      `<h2>À raconter au public</h2>
       <ul>
         <li>Faire faire le test à l'œil nu avant de montrer le télescope : l'effet est garanti quand Mizar se dédouble.</li>
         <li>Attention, Alcor et Mizar sont bien un système lié, mais Alcor n'est pas exactement là où on la voit : la paire visible à l'œil nu (Mizar et Alcor) est parfois présentée comme un simple alignement, un débat qui a longtemps agité les astronomes.</li>
         <li>La majorité des étoiles de la Galaxie vivent en couple ou en famille. Notre Soleil, solitaire, est plutôt l'exception.</li>
       </ul>`
    ],
    voirAussi: ["types-telescopes", "cycle-vie-etoiles", "epsilon-lyre"]
  },

  "epsilon-lyre": {
    titre: "Epsilon de la Lyre, la « Double-Double »",
    cat: "Étoiles doubles & multiples",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Epsilon_Lyrae",
    resume: "Une étoile, puis deux, puis quatre : ça dépend juste de la puissance de votre instrument.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg">
             <polyline points="263.6,80.0 202.6,44.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="263.6,80.0 200.0,130.7" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="200.0,130.7 154.9,309.0 76.4,336.0 118.5,160.1 200.0,130.7" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="263.6" cy="80.0" r="4.0" class="etoile-phare"/>
             <text x="255.6" y="83.0" class="etoile-nom etoile-phare" text-anchor="end">Véga</text>
             <circle cx="200.0" cy="130.7" r="1.9"/>
             <circle cx="154.9" cy="309.0" r="2.2"/>
             <text x="146.9" y="313.0" class="etoile-nom" text-anchor="end">Sheliak</text>
             <circle cx="76.4" cy="336.0" r="2.3"/>
             <text x="84.4" y="340.0" class="etoile-nom" text-anchor="start">Sulafat</text>
             <circle cx="118.5" cy="160.1" r="1.8"/>
             <circle cx="202.6" cy="44.0" r="2.4" class="etoile-phare"/>
             <text x="210.6" y="44.0" class="etoile-nom etoile-phare" text-anchor="start">ε, la Double-Double</text>
           </svg>
         <figcaption>La Lyre, d'après les positions réelles. La Double-Double (ε, en or) se trouve juste à côté de Véga ; en dessous, le parallélogramme avec Sheliak et Sulafat.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Juste à côté de Véga (<a href="#/memo/triangle-ete">Triangle d'été</a>), à l'opposé du petit parallélogramme de la Lyre où se niche la <a href="#/memo/nebuleuse-lyre">nébuleuse M57</a>. À l'œil nu, une seule étoile ; aux <strong>jumelles</strong>, elle se sépare déjà en deux ; au <strong>télescope</strong> avec un bon grossissement, chacune de ces deux étoiles se sépare à son tour en deux, quatre étoiles en tout, d'où son surnom.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">
         Distance : ~160 années-lumière<br>
         Étoiles blanches chaudes (type A), ~9 000 °C<br>
         Période orbitale de la première paire : ~1 800 ans, un tour à l'échelle de l'histoire humaine.
       </div>`,
      `<h2>Anecdote</h2>
       <p>Les quatre étoiles sont réellement liées par la gravité : un vrai système à quatre, comme <a href="#/memo/alcor-mizar">Mizar et Alcor</a> un peu plus loin dans le ciel, de bons doublons pour comparer les deux tests de résolution en une même soirée.</p>`
    ],
    voirAussi: ["triangle-ete", "alcor-mizar", "nebuleuse-lyre"]
  },

  "albireo": {
    titre: "Albireo",
    cat: "Étoiles doubles & multiples",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Albireo",
    resume: "Une étoile dorée et une étoile bleue, côte à côte, l'une des plus belles doubles du ciel.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 351" xmlns="http://www.w3.org/2000/svg">
             <polyline points="73.5,44.0 123.7,124.6 295.7,307.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="44.3,217.9 123.7,124.6 227.9,46.3" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="73.5" cy="44.0" r="3.4"/>
             <text x="81.5" y="47.0" class="etoile-nom" text-anchor="start">Deneb</text>
             <circle cx="123.7" cy="124.6" r="2.6"/>
             <text x="131.7" y="118.6" class="etoile-nom" text-anchor="start">Sadr</text>
             <circle cx="44.3" cy="217.9" r="2.2"/>
             <text x="52.3" y="220.9" class="etoile-nom" text-anchor="start">Gienah</text>
             <circle cx="227.9" cy="46.3" r="2.2"/>
             <text x="219.9" y="49.3" class="etoile-nom" text-anchor="end">Fawaris</text>
             <circle cx="295.7" cy="307.0" r="3.0" class="etoile-phare"/>
             <text x="287.7" y="310.0" class="etoile-nom etoile-phare" text-anchor="end">Albireo</text>
           </svg>
         <figcaption>Le Cygne (la Croix du Nord), d'après les positions réelles : Deneb à la queue, Sadr au croisement, les ailes (Gienah, Fawaris), et Albireo (en or) à la tête, tout au bout du long cou.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>À la tête du Cygne, à l'opposé de Deneb (<a href="#/memo/triangle-ete">Triangle d'été</a>). Au télescope, même à faible grossissement, elle se sépare en deux couleurs franches : une étoile <strong>orangée</strong> et une étoile <strong>bleue</strong>, l'un des contrastes les plus spectaculaires du ciel, même pour un œil non entraîné.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~430 années-lumière<br>
         Composante orange : géante, ~4 300 °C<br>
         Composante bleue : ~13 000 °C. La couleur trahit directement la température, exactement comme un métal qu'on chauffe.</div>`,
      `<h2>La couleur dit la température</h2>
       <p>Le contraste orange/bleu d'Albireo illustre une loi physique fondamentale : <strong>la couleur d'une étoile révèle directement sa température de surface</strong>, exactement comme la flamme d'un briquet passe du bleu (chaud) au jaune-orangé (moins chaud). L'étoile orangée est une géante « froide » (~4 300 °C), la bleue est bien plus chaude (~13 000 °C). Une fois cette clé donnée au public, tout le ciel devient un thermomètre.</p>`,
      `<h2>Anecdote</h2>
       <p>Ce couple si photogénique n'est peut-être qu'un <strong>trompe-l'œil</strong> : les données récentes du satellite Gaia suggèrent que les deux étoiles ne sont pas forcément liées par la gravité, mais seulement alignées par hasard depuis la Terre. À vérifier, à débattre avec le public !</p>`
    ],
    voirAussi: ["triangle-ete", "types-telescopes"]
  },

  "double-amas-perse": {
    titre: "Le double amas de Persée",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Double_amas_de_Pers%C3%A9e",
    resume: "Deux amas d'étoiles jeunes, côte à côte, connus depuis l'Antiquité et spectaculaires aux jumelles.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 192" xmlns="http://www.w3.org/2000/svg">
             <polyline points="295.5,63.0 267.4,97.8 239.7,64.9 207.9,74.1 175.6,44.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="103.0,107.4 79.9,124.3 44.5,148.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="295.5" cy="63.0" r="2.4"/>
             <circle cx="267.4" cy="97.8" r="2.6"/>
             <text x="267.4" y="112.8" class="etoile-nom" text-anchor="middle">Schedar</text>
             <circle cx="239.7" cy="64.9" r="2.4"/>
             <circle cx="207.9" cy="74.1" r="2.2"/>
             <text x="207.9" y="64.1" class="etoile-nom" text-anchor="middle">Ruchbah</text>
             <circle cx="175.6" cy="44.0" r="2.0"/>
             <circle cx="103.0" cy="107.4" r="1.9"/>
             <circle cx="79.9" cy="124.3" r="2.0"/>
             <circle cx="44.5" cy="148.0" r="2.9"/>
             <text x="52.5" y="151.0" class="etoile-nom" text-anchor="start">Mirfak</text>
             <circle cx="142.1" cy="102.3" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="142.1" y="91.3" class="etoile-nom" text-anchor="middle">double amas</text>
           </svg>
         <figcaption>Entre le W de Cassiopée et Persée (Mirfak), le double amas (cercle doré) se trouve à mi-chemin : suivre la ligne Ruchbah-Segin et prolonger vers Persée.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Entre les constellations de Persée et Cassiopée : une tache floue visible à l'œil nu sous un ciel correct, qui explose en centaines d'étoiles aux <strong>jumelles</strong> ou au télescope à faible grossissement, l'un des plus beaux champs du ciel d'automne-hiver.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~7 500 années-lumière<br>
         Âge : quelques millions d'années seulement, des <strong>bébés</strong> à l'échelle stellaire, comparés aux <a href="#/memo/m13">12 milliards d'années</a> d'un amas globulaire.</div>`,
      `<h2>Deux amas, une même pouponnière</h2>
       <p>NGC 869 et NGC 884 sont deux <a href="#/memo/types-amas">amas ouverts</a> de 150 à 200 étoiles chacun, nés du même nuage interstellaire. Malgré leur proximité apparente, ils sont réellement séparés d'environ <strong>200 années-lumière</strong>. Leurs populations diffèrent légèrement : l'un contient surtout des étoiles jeunes et massives, l'autre des étoiles un peu plus évoluées, en route vers le stade de supergéantes.</p>`,
      `<h2>Anecdote</h2>
       <p>Connu et catalogué depuis l'Antiquité : l'astronome grec <strong>Hipparque</strong> le mentionnait déjà vers 130 av. J.-C., bien avant l'invention du télescope. Il se trouve dans la même région du ciel que <a href="#/memo/mythe-persee">Persée et Andromède</a>.</p>`
    ],
    voirAussi: ["types-amas", "pleiades", "mythe-persee"]
  },

  "amas-et": {
    titre: "L'amas E.T. (NGC 457)",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/NGC_457",
    resume: "Un amas d'étoiles qui dessine un petit bonhomme, rebaptisé E.T. pour sa bouille extraterrestre.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 239" xmlns="http://www.w3.org/2000/svg">
             <polyline points="295.9,130.7 221.0,195.0 173.7,113.6 101.4,121.4 44.1,44.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="295.9" cy="130.7" r="2.6"/>
             <text x="287.9" y="133.7" class="etoile-nom" text-anchor="end">Caph</text>
             <circle cx="221.0" cy="195.0" r="2.8"/>
             <text x="213.0" y="198.0" class="etoile-nom" text-anchor="end">Schedar</text>
             <circle cx="173.7" cy="113.6" r="2.6"/>
             <text x="173.7" y="104.6" class="etoile-nom" text-anchor="middle">Navi</text>
             <circle cx="101.4" cy="121.4" r="2.4"/>
             <text x="101.4" y="111.4" class="etoile-nom" text-anchor="middle">Ruchbah</text>
             <circle cx="44.1" cy="44.0" r="2.2"/>
             <text x="52.1" y="47.0" class="etoile-nom" text-anchor="start">Segin</text>
             <circle cx="114.7" cy="161.6" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="114.7" y="176.6" class="etoile-nom" text-anchor="middle">amas E.T.</text>
           </svg>
         <figcaption>Le W de Cassiopée, d'après les positions réelles (Caph, Schedar, Navi, Ruchbah, Segin). Cercle doré : l'amas E.T. (NGC 457), sous Ruchbah.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Dans Cassiopée, juste à côté de l'étoile Ruchbah (Delta Cassiopeiae). Aux jumelles ou au petit télescope, deux étoiles brillantes forment les <strong>« yeux »</strong>, et une traînée d'étoiles plus faibles dessine le <strong>corps et les jambes</strong>, d'abord surnommé « amas de la Chouette », puis rebaptisé « E.T. » pour sa ressemblance avec le personnage du film.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~7 900 à 9 000 années-lumière<br>
         Âge : environ <strong>20 millions d'années</strong>, un amas ouvert jeune.</div>`,
      `<h2>Anecdote</h2>
       <p>L'une des deux étoiles « yeux » (Phi Cassiopeiae) est en réalité une <strong>supergéante en avant-plan</strong>, pas physiquement membre de l'amas, elle se trouve juste alignée par hasard sur la ligne de visée, un peu comme <a href="#/memo/albireo">Albireo</a>. Cassiopée fait partie de la <a href="#/memo/mythe-persee">saga de Persée</a>.</p>`
    ],
    voirAussi: ["types-amas", "mythe-persee"]
  },

  /* ===================== NÉBULEUSES ===================== */

  "types-nebuleuses": {
    titre: "Les types de nébuleuses",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/N%C3%A9buleuse",
    resume: "Même mot, familles très différentes : pouponnières d'étoiles, poussière éclairée, ou cadavres stellaires.",
    sections: [
      `<h2>Les grandes familles</h2>
       <ul>
         <li><strong>À émission</strong> : du gaz chauffé et ionisé par de jeunes étoiles brûlantes, typiquement rose/rouge sur les photos (la <a href="#/memo/nebuleuse-orion">nébuleuse d'Orion</a>). Ce sont des <a href="#/memo/cycle-vie-etoiles">pouponnières d'étoiles</a>.</li>
         <li><strong>Par réflexion</strong> : un simple nuage de poussière qui réfléchit la lumière d'une étoile proche, teinte bleutée (autour des <a href="#/memo/pleiades">Pléiades</a>).</li>
         <li><strong>Obscure</strong> : un nuage assez dense pour masquer les étoiles derrière lui (le Sac à charbon, près de la Croix du Sud).</li>
         <li><strong>Planétaire</strong> : les couches externes soufflées par une étoile en fin de vie comme le Soleil (<a href="#/memo/nebuleuse-lyre">M57</a>, <a href="#/memo/nebuleuse-haltere">M27</a>), malgré leur nom, elles n'ont <strong>aucun rapport avec les planètes</strong> ; le nom vient juste de leur forme ronde vue dans les petits télescopes du 18e siècle.</li>
         <li><strong>Rémanent de supernova</strong> : les débris de l'explosion d'une étoile massive (la nébuleuse du Crabe).</li>
       </ul>`,
      `<h2>Anecdote</h2>
       <p>Deux objets peuvent porter le même mot « nébuleuse » sans avoir strictement rien à voir : l'une est en train de <strong>fabriquer</strong> des étoiles, l'autre vient d'en <strong>enterrer</strong> une.</p>`
    ],
    voirAussi: ["cycle-vie-etoiles", "nebuleuse-lyre", "nebuleuse-haltere", "nebuleuse-orion", "pleiades"]
  },

  "nebuleuse-orion": {
    titre: "La nébuleuse d'Orion (M42)",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/N%C3%A9buleuse_d%27Orion",
    resume: "Une pouponnière d'étoiles à l'œil nu, juste sous la ceinture d'Orion.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg">
             <polyline points="94.8,81.4 206.2,97.1" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="169.0,44.0 94.8,81.4" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="169.0,44.0 206.2,97.1" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="94.8,81.4 148.0,221.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="206.2,97.1 180.8,187.4" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="148.0,221.0 165.0,209.9 180.8,187.4" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="148.0,221.0 122.5,336.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="180.8,187.4 245.2,314.3" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="122.5,336.0 245.2,314.3" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="94.8" cy="81.4" r="4.0" style="fill:#e0794a"/>
             <text x="102.8" y="84.4" class="etoile-nom" text-anchor="start">Bételgeuse</text>
             <circle cx="206.2" cy="97.1" r="2.6"/>
             <text x="198.2" y="100.1" class="etoile-nom" text-anchor="end">Bellatrix</text>
             <circle cx="169.0" cy="44.0" r="1.8"/>
             <text x="169.0" y="35.0" class="etoile-nom" text-anchor="middle">Meissa</text>
             <circle cx="148.0" cy="221.0" r="2.6"/>
             <text x="156.0" y="231.0" class="etoile-nom" text-anchor="start">Alnitak</text>
             <circle cx="165.0" cy="209.9" r="2.6"/>
             <text x="165.0" y="199.9" class="etoile-nom" text-anchor="middle">Alnilam</text>
             <circle cx="180.8" cy="187.4" r="2.6"/>
             <text x="172.8" y="181.4" class="etoile-nom" text-anchor="end">Mintaka</text>
             <circle cx="122.5" cy="336.0" r="2.4"/>
             <text x="130.5" y="339.0" class="etoile-nom" text-anchor="start">Saiph</text>
             <circle cx="245.2" cy="314.3" r="4.0" class="etoile-phare"/>
             <text x="237.2" y="317.3" class="etoile-nom etoile-phare" text-anchor="end">Rigel</text>
             <circle cx="168.5" cy="272.5" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="176.5" y="276.5" class="etoile-nom" text-anchor="start">M42</text>
           </svg>
         <figcaption>Orion, d'après les positions réelles : les épaules (Bételgeuse en orange, Bellatrix), la tête (Meissa), la ceinture (Alnitak, Alnilam, Mintaka), les pieds (Saiph, Rigel). Cercle doré : la nébuleuse M42, dans l'épée.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>En hiver, sous les trois étoiles alignées de la <strong>ceinture d'Orion</strong> : une petite tache floue, visible à l'œil nu dans « l'épée » du chasseur. Aux jumelles ou au télescope, elle devient une vaste nébulosité aux volutes bien visibles.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~1 350 années-lumière<br>
         L'une des <a href="#/memo/types-nebuleuses">nébuleuses à émission</a> les plus proches de nous<br>
         En son cœur, le <strong>Trapèze</strong>, un groupe de jeunes étoiles chaudes qui éclairent tout le nuage.</div>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Ici, des étoiles sont <strong>littéralement en train de naître</strong> sous nos yeux (à l'échelle de quelques centaines de milliers d'années), un des rares endroits où l'on peut montrer au public une <a href="#/memo/cycle-vie-etoiles">pouponnière stellaire</a> en direct.</li>
         <li>Sur les photos, elle est rouge/rose ; au télescope à l'œil, elle paraît plutôt <strong>verdâtre</strong>, l'œil humain en vision nocturne est plus sensible au vert qu'au rouge.</li>
       </ul>`
    ],
    voirAussi: ["types-nebuleuses", "cycle-vie-etoiles"]
  },

  "nebuleuse-lyre": {
    titre: "La nébuleuse de la Lyre (M57)",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/N%C3%A9buleuse_de_la_Lyre",
    resume: "Un petit anneau de fumée cosmique, l'avenir du Soleil, dans environ 5 milliards d'années.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg">
             <polyline points="263.3,79.8 202.3,44.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="263.3,79.8 199.8,130.6" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="199.8,130.6 155.1,308.9 76.7,336.0 118.4,160.2 199.8,130.6" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="263.3" cy="79.8" r="4.0" class="etoile-phare"/>
             <text x="255.3" y="82.8" class="etoile-nom etoile-phare" text-anchor="end">Véga</text>
             <circle cx="202.3" cy="44.0" r="1.8"/>
             <circle cx="199.8" cy="130.6" r="1.9"/>
             <circle cx="155.1" cy="308.9" r="2.2"/>
             <text x="147.1" y="312.9" class="etoile-nom" text-anchor="end">Sheliak</text>
             <circle cx="76.7" cy="336.0" r="2.3"/>
             <text x="84.7" y="340.0" class="etoile-nom" text-anchor="start">Sulafat</text>
             <circle cx="118.4" cy="160.2" r="1.8"/>
             <circle cx="124.3" cy="322.6" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="124.3" y="338.6" class="etoile-nom" text-anchor="middle">M57</text>
           </svg>
         <figcaption>La Lyre, d'après les positions réelles : Véga et le petit parallélogramme (Sheliak, Sulafat…). Cercle doré : la nébuleuse M57, presque à mi-chemin entre Sheliak et Sulafat.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Entre les deux étoiles inférieures du petit parallélogramme de la Lyre (<strong>Sheliak</strong> et <strong>Sulafat</strong>), près de <a href="#/memo/triangle-ete">Véga</a>. De l'autre côté de Véga se trouve <a href="#/memo/epsilon-lyre">Epsilon Lyrae, la Double-Double</a>, à observer dans la même soirée. Nécessite un télescope : un tout petit anneau flou, difficile à grossir davantage.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~2 600 années-lumière<br>
         Âge : quelques milliers d'années seulement depuis l'éjection du gaz, une <a href="#/memo/types-nebuleuses">nébuleuse planétaire</a>, donc un cadavre d'étoile toute récente à l'échelle cosmique.</div>`,
      `<h2>Le dernier souffle d'une étoile</h2>
       <p>M57 est une <a href="#/memo/types-nebuleuses">nébuleuse planétaire</a> : les couches externes d'une étoile semblable au Soleil, expulsées en fin de vie, éclairées par le cœur mis à nu (une naine blanche). L'anneau mesure ~2 années-lumière et ne contient que ~0,6 masse solaire de gaz. Découverte en 1779 par le Français <strong>Antoine Darquier de Pellepoix</strong>, aussitôt cataloguée par Charles Messier.</p>`,
      `<h2>Anecdote</h2>
       <p>C'est exactement ce à quoi devrait ressembler notre <a href="#/memo/cycle-vie-etoiles">Soleil</a> dans environ 5 milliards d'années : ses couches externes soufflées en un bel anneau, autour d'un cœur devenu naine blanche.</p>`
    ],
    voirAussi: ["triangle-ete", "cycle-vie-etoiles", "types-nebuleuses", "nebuleuse-haltere", "epsilon-lyre"]
  },

  "nebuleuse-haltere": {
    titre: "La nébuleuse de l'Haltère (M27)",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/N%C3%A9buleuse_de_l%27Halt%C3%A8re",
    resume: "La toute première nébuleuse planétaire jamais découverte, en forme de sablier de sport.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 377" xmlns="http://www.w3.org/2000/svg">
             <polyline points="295.6,303.2 200.2,275.4" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="283.5,333.0 200.2,275.4" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="200.2,275.4 52.6,221.8" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="295.6" cy="303.2" r="2.2"/>
             <text x="287.6" y="306.2" class="etoile-nom" text-anchor="end">Sham</text>
             <circle cx="283.5" cy="333.0" r="2.0"/>
             <circle cx="200.2" cy="275.4" r="2.0"/>
             <circle cx="52.6" cy="221.8" r="2.3"/>
             <circle cx="44.4" cy="44.0" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="52.4" y="48.0" class="etoile-nom" text-anchor="start">M27</text>
           </svg>
         <figcaption>La petite constellation de la Flèche (Sham à l'empenne), d'après les positions réelles. Cercle doré : la nébuleuse M27, juste au nord de la pointe de la Flèche, dans le Petit Renard.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Dans la petite constellation du Petit Renard, non loin de la <a href="#/memo/cintre">Flèche et du Cygne</a>. Plus grande et plus lumineuse que <a href="#/memo/nebuleuse-lyre">M57</a> : un des objets les plus faciles de sa catégorie, même en petit télescope.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : ~1 300 années-lumière<br>
         Vestige d'une étoile de type solaire, comme <a href="#/memo/nebuleuse-lyre">M57</a>.</div>`,
      `<h2>Anecdote</h2>
       <p>Découverte par Charles Messier en 1764, c'est la <strong>toute première nébuleuse planétaire identifiée</strong>, elle a ouvert toute une catégorie d'objets qu'on ne savait pas encore classer à l'époque.</p>`
    ],
    voirAussi: ["nebuleuse-lyre", "types-nebuleuses", "cycle-vie-etoiles"]
  },

  /* ===================== AMAS D'ÉTOILES ===================== */

  "types-amas": {
    titre: "Les types d'amas d'étoiles",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Amas_stellaire",
    resume: "Amas ouverts : des crèches d'étoiles jeunes. Amas globulaires : plutôt des maisons de retraite.",
    sections: [
      `<h2>Amas ouverts</h2>
       <p>Quelques dizaines à quelques milliers d'étoiles, peu denses, dans le disque de la Galaxie. Ce sont des étoiles <strong>nées ensemble</strong>, encore jeunes (quelques millions à quelques centaines de millions d'années) : les <a href="#/memo/pleiades">Pléiades</a>, le <a href="#/memo/double-amas-perse">double amas de Persée</a>, l'<a href="#/memo/amas-et">amas E.T.</a></p>`,
      `<h2>Amas globulaires</h2>
       <p>Des boules denses et sphériques de centaines de milliers d'étoiles, en orbite autour du centre de la Galaxie. Leurs étoiles ont typiquement <strong>10 à 13 milliards d'années</strong> : ce sont un peu des <strong>maisons de retraite pour étoiles</strong>, avec une population entièrement âgée, née dans la jeunesse de la Galaxie et jamais renouvelée depuis. Exemple : <a href="#/memo/m13">M13, le grand amas d'Hercule</a>.</p>`,
      `<h2>Anecdote</h2>
       <p>Autant les amas ouverts se dispersent en quelques centaines de millions d'années (les étoiles finissent par se séparer, chacune suivant sa propre orbite), autant les amas globulaires restent <strong>liés et compacts</strong> depuis des milliards d'années : une vraie stabilité de longue durée.</p>`
    ],
    voirAussi: ["pleiades", "double-amas-perse", "amas-et", "m13"]
  },

  "m13": {
    titre: "Le grand amas d'Hercule (M13)",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Amas_globulaire_d%27Hercule",
    conte: "hercule-dragon",
    resume: "Une boule de 300 000 étoiles presque aussi vieilles que l'Univers.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg">
             <polyline points="277.0,44.0 295.9,310.8 147.7,336.0 44.1,117.1 277.0,44.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="277.0" cy="44.0" r="2.2"/>
             <circle cx="295.9" cy="310.8" r="2.4"/>
             <circle cx="147.7" cy="336.0" r="2.2"/>
             <circle cx="44.1" cy="117.1" r="2.0"/>
             <circle cx="288.2" cy="133.6" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="296.2" y="137.6" class="etoile-nom" text-anchor="start">M13</text>
           </svg>
         <figcaption>Le Trapèze d'Hercule (la « clé de voûte »), d'après les positions réelles de ses quatre étoiles. Cercle doré : M13, sur le côté ouest du trapèze, aux deux tiers vers le haut.</figcaption>
       </figure>`,
      `<h2>Une ruche d'étoiles</h2>
       <p>Dans la constellation d'Hercule, ce petit flocon flou au télescope est un <a href="#/memo/types-amas">amas globulaire</a> : environ <strong>300 000 étoiles</strong> serrées dans une sphère de 150 années-lumière, à ~23 000 années-lumière de nous. Au centre, les étoiles sont des centaines de fois plus proches les unes des autres que dans notre voisinage : là-bas, la nuit n'existe presque pas.</p>`,
      `<h2>Des fossiles du ciel</h2>
       <p>Ses étoiles ont environ <strong>12 milliards d'années</strong>, presque l'âge de l'Univers. Ce sont des survivantes de la petite enfance de la Galaxie, qui n'ont jamais explosé car les étoiles peu massives <a href="#/memo/cycle-vie-etoiles">vivent très longtemps</a>. La Voie lactée compte ~150 amas globulaires en orbite autour d'elle, comme des abeilles autour de la ruche.</p>`,
      `<h2>Le message d'Arecibo</h2>
       <p>En 1974, le radiotélescope d'Arecibo a envoyé vers M13 un message décrivant l'humanité : notre ADN, notre système solaire, notre silhouette. Réponse au plus tôt dans… <strong>46 000 ans</strong>. C'était surtout un geste symbolique, et une belle façon de parler des distances.</p>`
    ],
    voirAussi: ["cycle-vie-etoiles", "types-telescopes", "types-amas", "couronne-boreale"]
  },

  /* ===================== GALAXIES ===================== */

  "andromede": {
    titre: "La galaxie d'Andromède (M31)",
    cat: "Ciel profond",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Galaxie_d%27Androm%C3%A8de",
    conte: "saga-persee",
    resume: "L'objet le plus lointain visible à l'œil nu, et notre future compagne de fusion.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 239" xmlns="http://www.w3.org/2000/svg">
             <polyline points="295.2,195.0 220.7,181.8 150.4,129.7 44.8,44.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="150.4,129.7 179.6,98.5 194.1,70.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="295.2" cy="195.0" r="2.8"/>
             <text x="295.2" y="210.0" class="etoile-nom" text-anchor="middle">Alpheratz</text>
             <circle cx="220.7" cy="181.8" r="1.9"/>
             <circle cx="150.4" cy="129.7" r="2.8"/>
             <text x="150.4" y="144.7" class="etoile-nom" text-anchor="middle">Mirach</text>
             <circle cx="179.6" cy="98.5" r="1.8"/>
             <circle cx="194.1" cy="70.0" r="1.7"/>
             <circle cx="44.8" cy="44.0" r="2.6"/>
             <text x="52.8" y="47.0" class="etoile-nom" text-anchor="start">Almach</text>
             <circle cx="208.8" cy="67.5" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="208.8" y="57.5" class="etoile-nom" text-anchor="middle">M31</text>
           </svg>
         <figcaption>Andromède, d'après les positions réelles : la chaîne Alpheratz, Mirach, Almach. Depuis Mirach, deux étoiles servent de marches d'escalier pour monter jusqu'à la galaxie M31 (cercle doré).</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Sous un ciel bien noir, dans la constellation d'Andromède, près de Cassiopée : une petite tache floue et allongée à l'œil nu. C'est l'objet le plus lointain que l'œil humain peut voir sans instrument.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Distance : <strong>2,5 millions d'années-lumière</strong><br>
         Environ 1 000 milliards d'étoiles<br>
         Se rapproche de nous à ~110 km/s.</div>`,
      `<h2>Notre grande voisine</h2>
       <p>Andromède est une galaxie spirale comme la nôtre, mais plus grande : ~220 000 années-lumière de diamètre, et probablement <strong>cinq fois plus d'étoiles</strong> que la Voie lactée. Sous un bon ciel, sa tache floue couvre dans le ciel <strong>six fois le diamètre apparent de la pleine Lune</strong> (on n'en voit à l'œil nu que le cœur brillant). C'est la plus grande galaxie de notre Groupe local.</p>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>Étonnamment, le disque que l'on observe aujourd'hui se serait largement <strong>reformé après une collision majeure il y a environ 2 milliards d'années</strong>, plus jeune, donc, que notre Soleil et notre Terre (4,6 milliards d'années) !</li>
         <li>Dans environ 4,5 milliards d'années, elle entrera en collision avec la <a href="#/memo/voie-lactee">Voie lactée</a>. Les étoiles étant si espacées, presque aucune ne s'entrechoquera vraiment, mais les deux galaxies fusionneront en une seule, parfois surnommée <strong>« Lactomède »</strong> (Milkomeda pour les anglophones).</li>
         <li>Cette princesse mythologique donne son nom à la galaxie via la <a href="#/memo/mythe-persee">saga de Persée</a>, qui se déroule juste à côté dans le ciel.</li>
       </ul>`
    ],
    voirAussi: ["voie-lactee", "types-telescopes", "mythe-persee"]
  },

  /* ===================== MYTHOLOGIE ===================== */

  "mythe-persee": {
    titre: "La saga de Persée",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Pers%C3%A9e_(constellation)",
    conte: "saga-persee",
    resume: "Cassiopée, Andromède, Persée, Pégase : plusieurs constellations d'automne qui racontent une seule et même histoire.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg">
             <polyline points="208.4,72.8 173.8,115.7 118.7,178.2 61.9,209.6" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="118.7,178.2 159.7,267.8 163.4,336.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="208.4" cy="72.8" r="1.9"/>
             <circle cx="173.8" cy="115.7" r="2.0"/>
             <circle cx="118.7" cy="178.2" r="3.0"/>
             <text x="126.7" y="181.2" class="etoile-nom" text-anchor="start">Mirfak</text>
             <circle cx="61.9" cy="209.6" r="2.0"/>
             <circle cx="159.7" cy="267.8" r="1.8"/>
             <circle cx="163.4" cy="336.0" r="2.7" class="etoile-phare"/>
             <text x="171.4" y="339.0" class="etoile-nom etoile-phare" text-anchor="start">Algol</text>
             <circle cx="278.1" cy="44.0" r="3.2" fill="none" stroke="#c9a54a" stroke-width="1"/>
             <text x="278.1" y="34.0" class="etoile-nom" text-anchor="middle">double amas</text>
           </svg>
         <figcaption>Persée, d'après les positions réelles : Mirfak la plus brillante, et Algol (en or), « l'œil du démon » dans la tête de Méduse. Cercle doré : le double amas, sur le chemin vers Cassiopée.</figcaption>
       </figure>`,
      `<h2>L'histoire</h2>
       <p>La reine <strong>Cassiopée</strong> se vante d'être plus belle que les Néréides ; Poséidon envoie le monstre marin Cétus se venger. Pour l'apaiser, la princesse <strong>Andromède</strong> est enchaînée à un rocher en sacrifice. <strong>Persée</strong>, revenant tout juste avec la tête de la Gorgone Méduse, la découvre, tue le monstre et la libère, puis l'épouse. Tous les personnages de cette histoire se retrouvent aujourd'hui côte à côte dans le ciel d'automne. Le récit complet est à retrouver dans les <a href="#/contes/saga-persee">Contes du ciel</a>.</p>`,
      `<h2>Repérage</h2>
       <p>Cassiopée (le grand « W »), <a href="#/memo/andromede">Andromède</a> et Persée se suivent dans le ciel du soir en automne, non loin l'une de l'autre, une bonne trame pour enchaîner plusieurs objets d'une même soirée (dont l'<a href="#/memo/amas-et">amas E.T.</a> et le <a href="#/memo/double-amas-perse">double amas de Persée</a>, tous deux dans ce coin de ciel).</p>`,
      `<h2>Anecdote</h2>
       <p>Dans la tête de Méduse tenue par Persée se trouve <strong>Algol</strong>, « l'œil du démon », une étoile dont l'éclat baisse nettement puis remonte toutes les ~69 heures. Les astronomes arabes l'avaient déjà repérée comme une étoile pas comme les autres ; on sait aujourd'hui que c'est un système à deux étoiles qui s'éclipsent mutuellement.</p>`
    ],
    voirAussi: ["andromede", "amas-et", "double-amas-perse"]
  },

  /* ===================== PHÉNOMÈNES À OBSERVER ===================== */

  "eclipses": {
    titre: "Les éclipses",
    cat: "Système solaire",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/%C3%89clipse",
    conte: "eclipses",
    resume: "Une coïncidence géométrique extraordinaire rend possibles les éclipses totales de Soleil, et elle ne durera pas éternellement.",
    sections: [
      `<h2>Les deux types</h2>
       <p>Une <strong>éclipse de Soleil</strong> se produit quand la <a href="#/memo/lune">Lune</a> passe exactement devant le Soleil, forcément à la nouvelle lune, mais ça n'arrive pas tous les mois, car l'orbite de la Lune est légèrement inclinée. Une <strong>éclipse de Lune</strong> se produit quand la Lune traverse l'ombre de la Terre, à la pleine lune : elle prend alors une teinte rougeâtre (« lune de sang »), et se voit partout où la Lune est visible, pendant plusieurs heures.</p>`,
      `<h2>Chiffres clés</h2>
       <div class="chiffre-cle">Une éclipse totale de Soleil ne dure que quelques minutes, visible sur une bande étroite au sol<br>
         Une éclipse de Lune totale peut durer plus d'une heure, visible par toute la moitié de la Terre plongée dans la nuit.</div>`,
      `<h2>Pourquoi pas tous les mois ?</h2>
       <p>L'orbite de la Lune est inclinée d'environ <strong>5 degrés</strong> par rapport au plan Terre-Soleil : la plupart du temps, l'alignement n'est pas parfait et l'ombre passe « au-dessus » ou « en dessous ». Les éclipses ne se produisent que lorsque la nouvelle ou la pleine lune tombe près des points de croisement des deux plans, environ deux « saisons d'éclipses » par an.</p>`,
      `<h2>Anecdote</h2>
       <p>Le Soleil est environ <strong>400 fois plus grand</strong> que la Lune, mais aussi environ <strong>400 fois plus loin</strong> : les deux astres ont donc quasiment la même taille apparente dans le ciel, une coïncidence qui rend possibles les éclipses totales parfaites. Comme la Lune s'éloigne lentement de la Terre, cette coïncidence est vouée à disparaître dans plusieurs centaines de millions d'années.</p>`
    ],
    voirAussi: ["lune"]
  },

  "cometes-etoiles-filantes": {
    titre: "Comètes et étoiles filantes",
    cat: "Système solaire",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/%C3%89toile_filante",
    resume: "Un grain de poussière qui brûle, ou un vrai vagabond glacé venu des confins du système solaire, deux choses bien différentes.",
    sections: [
      `<h2>Étoiles filantes</h2>
       <p>Une étoile filante n'est <strong>ni une étoile ni en train de tomber</strong> : c'est un grain de poussière, souvent plus petit qu'un petit pois, qui se consume en entrant dans l'atmosphère à environ 60 km/s. Les grandes « pluies » d'étoiles filantes ont lieu quand la Terre traverse le sillage de poussière laissé par une comète, les <strong>Perséides</strong> (mi-août) viennent ainsi de la comète Swift-Tuttle.</p>`,
      `<h2>Comètes</h2>
       <p>Une comète, elle, est un vrai petit corps glacé de quelques kilomètres, qui ne devient visible que lorsqu'elle s'approche du Soleil : la chaleur vaporise sa glace et forme une <strong>queue</strong>, toujours dirigée à l'opposé du Soleil (donc pas forcément « derrière » la comète dans son mouvement).</p>
       <div class="chiffre-cle">La plus célèbre, la <strong>comète de Halley</strong>, revient tous les 76 ans, prochain passage visible depuis la Terre : <strong>2061</strong>.</div>`,
      `<h2>Anecdote</h2>
       <p>Une comète vraiment brillante à l'œil nu ne se présente qu'une ou deux fois par décennie : quand ça arrive, c'est un événement, contrairement aux étoiles filantes, qu'on peut voir n'importe quelle nuit avec un peu de patience.</p>`
    ],
    voirAussi: []
  },

  /* ===================== COSMOLOGIE & GRANDS CONCEPTS ===================== */

  "big-bang": {
    titre: "Le Big Bang et l'expansion de l'Univers",
    cat: "Comprendre l'Univers",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Big_Bang",
    resume: "Pas une explosion dans l'espace : une expansion de l'espace lui-même, depuis 13,8 milliards d'années.",
    sections: [
      `<h2>Le concept</h2>
       <p>Il y a <strong>13,8 milliards d'années</strong>, l'Univers observable était concentré dans un état extrêmement dense et chaud, puis s'est mis à se dilater, et il continue de le faire aujourd'hui. Il n'y a pas eu d'explosion <em>dans</em> l'espace : c'est l'<strong>espace lui-même qui s'étire</strong>, et il n'y a pas de centre de l'explosion à chercher.</p>`,
      `<h2>Les preuves</h2>
       <p>Trois grandes preuves convergent : les galaxies lointaines s'éloignent de nous (mesuré par le <a href="#/memo/redshift">décalage vers le rouge</a>), un rayonnement fossile emplit tout le ciel (découvert par hasard en 1965), et les proportions d'hydrogène et d'hélium observées collent aux calculs des toutes premières minutes de l'Univers.</p>`,
      `<h2>Anecdote</h2>
       <p>Le nom « Big Bang » a été inventé par <strong>Fred Hoyle</strong>, un astronome qui n'y croyait pas et le disait sur un ton moqueur à la radio en 1949, le surnom lui est resté, alors même que la théorie a fini par s'imposer.</p>`
    ],
    voirAussi: ["redshift", "cycle-vie-etoiles"]
  },

  "redshift": {
    titre: "Le décalage vers le rouge (redshift)",
    cat: "Comprendre l'Univers",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/D%C3%A9calage_vers_le_rouge",
    resume: "Le même effet qui change le son d'une sirène qui s'éloigne, appliqué à la lumière des galaxies.",
    sections: [
      `<h2>Le principe</h2>
       <p>Quand une source de lumière s'éloigne de nous, ses longueurs d'onde s'étirent : sa lumière devient légèrement plus rouge qu'elle ne l'est réellement (l'inverse, un décalage vers le bleu, se produit si elle se rapproche). C'est un effet Doppler, le même phénomène qui fait qu'une sirène d'ambulance semble plus grave une fois qu'elle s'est éloignée.</p>`,
      `<h2>Ce que ça a révélé</h2>
       <p>En mesurant ce décalage sur des dizaines de galaxies, on a découvert que <strong>presque toutes s'éloignent de nous</strong>, et d'autant plus vite qu'elles sont lointaines : la preuve observationnelle que l'Univers est en <a href="#/memo/big-bang">expansion</a>.</p>`,
      `<h2>Anecdote</h2>
       <p>Cette relation (galaxies lointaines = éloignement plus rapide) porte le nom de <strong>loi de Hubble-Lemaître</strong> : l'astronome et physicien belge <strong>Georges Lemaître</strong> l'avait proposée dès 1927, deux ans avant Edwin Hubble, mais son travail, publié en français dans une revue peu diffusée, est resté longtemps sous-reconnu.</p>`
    ],
    voirAussi: ["big-bang", "exoplanetes"]
  },

  "trous-noirs": {
    titre: "Les trous noirs",
    cat: "Comprendre l'Univers",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Trou_noir",
    resume: "Ni trous, ni aspirateurs cosmiques : des astres si denses que même la lumière n'en sort pas.",
    sections: [
      `<h2>C'est quoi, au juste ?</h2>
       <p>Un trou noir, c'est de la matière tellement comprimée que sa gravité empêche tout de s'échapper, <strong>même la lumière</strong>. La frontière de non-retour s'appelle <strong>l'horizon des événements</strong>. Pour transformer la Terre en trou noir, il faudrait la compresser à la taille… d'une bille de 2 cm.</p>`,
      `<h2>Non, ils n'aspirent pas tout</h2>
       <p>Idée reçue tenace ! Si le Soleil devenait un trou noir de même masse, la Terre <strong>continuerait exactement la même orbite</strong> (il ferait juste très froid et très noir). Un trou noir n'attire pas plus qu'une étoile de même masse, il faut vraiment s'en approcher pour être en danger.</p>`,
      `<h2>Le disque d'accrétion</h2>
       <p>La matière qui tombe vers un trou noir ne plonge pas en ligne droite : elle s'accumule en un disque tourbillonnant, le <strong>disque d'accrétion</strong>, où les frottements la chauffent à des millions de degrés avant qu'elle ne franchisse l'horizon. C'est cette matière incandescente, et non le trou noir lui-même, invisible par définition, qu'on parvient à observer.</p>`,
      `<h2>D'où viennent-ils ?</h2>
       <p>Les trous noirs « ordinaires » naissent à la <a href="#/memo/cycle-vie-etoiles">mort des étoiles très massives</a>, quand le cœur s'effondre sur lui-même. Mais il existe aussi des <strong>trous noirs supermassifs</strong> au centre des galaxies : le nôtre, Sagittarius A*, pèse 4 millions de Soleils.</p>`,
      `<h2>Les observer</h2>
       <p>Longtemps « vus » seulement indirectement (étoiles en orbite autour de rien, gaz surchauffé émettant des rayons X). Deux avancées récentes ont changé la donne : en <strong>2019</strong>, le réseau de radiotélescopes Event Horizon Telescope a produit la première <strong>image directe</strong> de l'ombre d'un trou noir (M87*, puis Sagittarius A* en 2022) ; et depuis <strong>2015</strong>, les détecteurs LIGO/Virgo captent les <strong>ondes gravitationnelles</strong> émises quand deux trous noirs fusionnent, on les « entend » littéralement.</p>`,
      `<h2>La question qui revient toujours</h2>
       <p>« Que se passe-t-il si on tombe dedans ? » Près d'un petit trou noir, la gravité tire tellement plus fort sur les pieds que sur la tête qu'on serait étiré comme un spaghetti, le terme scientifique est vraiment <strong>« spaghettification »</strong>. Vu de dehors, paradoxe : on verrait la personne ralentir et se figer pour toujours sur l'horizon.</p>`
    ],
    voirAussi: ["cycle-vie-etoiles", "big-bang"]
  },

  "cycle-vie-etoiles": {
    titre: "Le cycle de vie d'une étoile",
    cat: "Comprendre l'Univers",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/%C3%89volution_stellaire",
    resume: "De nuage de gaz à naine blanche, étoile à neutrons ou trou noir, et nous au milieu.",
    sections: [
      `<h2>1. La naissance</h2>
       <p>Tout commence par un nuage de gaz et de poussière qui s'effondre sous sa propre gravité. Quand le cœur atteint ~10 millions de degrés, la <strong>fusion de l'hydrogène s'allume</strong> : une étoile est née. La <a href="#/memo/nebuleuse-orion">nébuleuse d'Orion</a>, visible l'hiver, est une pouponnière où ça se passe en ce moment.</p>`,
      `<h2>2. La vie adulte : un bras de fer</h2>
       <p>Toute la vie d'une étoile est un équilibre entre la <strong>gravité</strong> qui la comprime et la <strong>pression de la fusion</strong> qui la gonfle. Le Soleil transforme 600 millions de tonnes d'hydrogène en hélium <em>chaque seconde</em>, et il tiendra 10 milliards d'années au total.</p>
       <div class="chiffre-cle">Le paradoxe à retenir : <strong>plus une étoile est massive, plus elle vit court</strong>. Les géantes brûlent tout en quelques millions d'années ; les petites naines rouges vivront des centaines de milliards d'années.</div>`,
      `<h2>3. Fin de vie des étoiles comme le Soleil</h2>
       <p>À court d'hydrogène, l'étoile gonfle en <strong>géante rouge</strong> (le Soleil avalera Mercure et Vénus), souffle ses couches externes en une <strong>nébuleuse planétaire</strong> (<a href="#/memo/nebuleuse-lyre">M57, l'anneau de la Lyre</a>, en est une superbe au télescope), et son cœur devient une <strong>naine blanche</strong> : une étoile morte de la taille de la Terre.</p>`,
      `<h2>4. Fin de vie des étoiles massives</h2>
       <p>Les plus massives finissent en <strong>supernova</strong> : pendant quelques semaines, une seule étoile brille comme une galaxie entière. Le cœur devient une <strong>étoile à neutrons</strong> (une cuillère à café pèserait un milliard de tonnes) ou, pour les plus massives, un <a href="#/memo/trous-noirs">trou noir</a>. C'est le sort qui attend un jour <a href="#/memo/antares-scorpion">Antarès</a>.</p>`,
      `<h2>5. Et nous dans tout ça</h2>
       <p>Le Big Bang n'a fabriqué que de l'hydrogène et de l'hélium. Le carbone, l'oxygène, le calcium, le fer de notre corps ont été <strong>forgés au cœur d'étoiles</strong> puis dispersés par leurs explosions, avant de former le Soleil, la Terre… et nous. <strong>Nous sommes littéralement des poussières d'étoiles.</strong></p>`
    ],
    voirAussi: ["trous-noirs", "m13", "alcor-mizar", "nebuleuse-lyre", "antares-scorpion", "big-bang"]
  },

  /* ===================== AU-DELÀ DU SYSTÈME SOLAIRE ===================== */

  "exoplanetes": {
    titre: "Les exoplanètes",
    cat: "Comprendre l'Univers",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Exoplan%C3%A8te",
    resume: "Des milliers de mondes découverts autour d'autres étoiles, et une histoire qui commence en France.",
    sections: [
      `<h2>Une découverte récente</h2>
       <p>La première exoplanète autour d'une étoile semblable au Soleil, <strong>51 Pegasi b</strong>, a été découverte en <strong>1995</strong> par Michel Mayor et Didier Queloz, depuis l'observatoire de Haute-Provence, un travail récompensé par le <strong>prix Nobel de physique 2019</strong>. On en connaît aujourd'hui plus de <strong>5 000</strong>.</p>`,
      `<h2>Comment on les détecte</h2>
       <p>On ne les voit presque jamais directement (trop proches de leur étoile, trop faibles) : on repère plutôt une étoile qui <strong>vacille légèrement</strong> sous l'attraction de sa planète (la même logique que le <a href="#/memo/redshift">décalage Doppler</a>), ou une baisse infime de sa luminosité quand la planète passe devant elle.</p>`,
      `<h2>Anecdote</h2>
       <p>Le système <strong>TRAPPIST-1</strong> compte <strong>7 planètes</strong> de la taille de la Terre autour d'une petite étoile froide, dont plusieurs dans la zone où l'eau liquide serait possible, l'un des systèmes les plus étudiés pour la recherche de vie ailleurs.</p>`
    ],
    voirAussi: ["redshift"]
  },

  /* ===================== MATÉRIEL & PRATIQUE ===================== */

  "types-telescopes": {
    titre: "Les types de télescopes",
    cat: "Pratique & matériel",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/T%C3%A9lescope",
    resume: "Lentilles ou miroirs ? Ce qui compte, ce n'est pas le grossissement : c'est le diamètre.",
    sections: [
      `<h2>Deux grandes familles</h2>
       <ul>
         <li><strong>La lunette (réfracteur)</strong> : des lentilles, comme celle de Galilée en 1609. Images très contrastées, idéale pour la Lune et les planètes, mais chère au-delà de 10 cm de diamètre.</li>
         <li><strong>Le télescope (réflecteur)</strong> : un miroir au fond du tube, inventé par Newton en 1668. C'est la formule de tous les grands instruments, beaucoup de diamètre pour beaucoup moins cher.</li>
       </ul>
       <p>Le fameux <strong>Dobson</strong>, star des soirées publiques, est un télescope de Newton posé sur une monture ultra-simple : tout le budget passe dans le miroir.</p>`,
      `<h2>Ce qui compte vraiment : le diamètre</h2>
       <p>Un télescope est avant tout un <strong>entonnoir à lumière</strong>. Plus le miroir est grand, plus on capte de lumière et de détails. Le grossissement, lui, se change simplement avec l'oculaire, et trop grossir ne donne qu'une image sombre et floue.</p>
       <div class="chiffre-cle">Un miroir de 200 mm collecte environ <strong>800 fois plus de lumière que l'œil</strong> : c'est ce qui rend visibles les nébuleuses et les <a href="#/memo/m13">amas d'étoiles</a>.</div>`,
      `<h2>Pourquoi l'image est à l'envers ?</h2>
       <p>Question favorite du public ! Optiquement, l'image est renversée, et on ne la redresse pas exprès : chaque lentille ajoutée mange de la lumière, et dans l'espace… il n'y a ni haut ni bas.</p>`,
      `<h2>Et les télescopes géants</h2>
       <p>Les observatoires professionnels utilisent des miroirs de 8 à 40 mètres, souvent en segments, installés en altitude pour fuir la turbulence de l'air. Et le télescope spatial James-Webb observe depuis l'espace, avec son miroir doré de 6,5 m, à 1,5 million de km de la Terre.</p>`
    ],
    voirAussi: ["alcor-mizar", "m13"]
  },

  "pollution-lumineuse": {
    titre: "La pollution lumineuse",
    cat: "Pratique & matériel",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Pollution_lumineuse",
    resume: "Le plus grand obstacle à l'observation n'est pas dans le ciel : il est au sol.",
    sections: [
      `<h2>Le constat</h2>
       <p>L'éclairage artificiel diffuse dans l'atmosphère et masque les objets faibles : plus une ville est proche et grande, moins on voit d'étoiles. Sous un ciel très pollué, on ne distingue parfois qu'une <strong>trentaine d'étoiles</strong> ; sous un ciel vraiment noir, plusieurs milliers, et la <a href="#/memo/voie-lactee">Voie lactée</a> devient visible.</p>`,
      `<h2>Pourquoi ça compte</h2>
       <p>Au-delà de l'observation, la lumière artificielle perturbe la faune nocturne : oiseaux migrateurs désorientés, insectes attirés puis épuisés autour des lampadaires, cycles biologiques dérangés chez de nombreuses espèces.</p>`,
      `<h2>Anecdote</h2>
       <p>C'est aussi pour préserver la vision nocturne, la nôtre, cette fois, qu'on utilise des <strong>lampes rouges</strong> en soirée d'observation : l'œil met 20 à 30 minutes à s'adapter à l'obscurité, et quelques secondes de lumière blanche suffisent à tout annuler.</p>`
    ],
    voirAussi: ["voie-lactee"]
  },

  /* ===================== ENGINS SPATIAUX ===================== */

  "iss": {
    titre: "La Station spatiale internationale",
    cat: "Pratique & matériel",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Station_spatiale_internationale",
    resume: "Le troisième objet le plus brillant du ciel est habité, et il passe peut-être ce soir.",
    sections: [
      `<h2>Une maison en orbite</h2>
       <p>L'ISS est habitée <strong>en permanence depuis novembre 2000</strong> : depuis cette date, il y a toujours eu des humains dans l'espace. Grande comme un terrain de football, elle tourne à environ <strong>400 km</strong> d'altitude, la distance Paris–Lyon, mais à la verticale.</p>
       <div class="chiffre-cle">Vitesse : <strong>28 000 km/h</strong>, soit un tour de la Terre en 90 minutes. Les astronautes voient <strong>16 levers de soleil par jour</strong>.</div>`,
      `<h2>Comment la repérer</h2>
       <ul>
         <li>Un point très brillant qui <strong>glisse lentement</strong> et régulièrement, sans clignoter (ce qui clignote, c'est un avion).</li>
         <li>Visible seulement en début ou fin de nuit : il faut qu'elle soit éclairée par le Soleil pendant que nous sommes dans l'ombre.</li>
         <li>Quand elle entre dans l'ombre de la Terre, elle rougit puis <strong>s'éteint en quelques secondes</strong>, spectaculaire.</li>
         <li>Les passages se prévoient à la minute près (heavens-above.com, appli Spot the Station) : à vérifier avant chaque soirée.</li>
       </ul>`,
      `<h2>Bon à savoir</h2>
       <p>À bord, la gravité n'est pas nulle : elle vaut ~90 % de celle au sol ! Les astronautes flottent parce qu'ils sont en <strong>chute libre permanente</strong>, la station tombe autour de la Terre sans jamais la toucher. C'est aussi ce qui arrive à la <a href="#/memo/lune">Lune</a>.</p>`
    ],
    voirAussi: ["lune"]
  },

  /* ===================== DIRECTION DU CENTRE GALACTIQUE ===================== */

  "sagittaire": {
    titre: "Le Sagittaire et le centre galactique",
    cat: "Constellations & repères",
    icone: "",
    wiki: "https://fr.wikipedia.org/wiki/Sagittaire_(constellation)",
    conte: "sagittaire",
    resume: "La direction du cœur de la Voie lactée.",
    sections: [
      `<figure class="constellation">
         <svg viewBox="0 0 340 215" xmlns="http://www.w3.org/2000/svg">
             <polyline points="233.1,117.1 187.1,106.8 176.1,171.0 59.5,109.9 110.3,66.7 187.1,106.8" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="187.1,106.8 166.3,44.0 110.3,66.7" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <polyline points="110.3,66.7 79.6,58.0 44.2,79.6 59.5,109.9" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
           <polyline points="233.1,117.1 176.1,171.0" fill="none" stroke="#8fa3e8" stroke-width="1.2" stroke-opacity="0.4"/>
             <circle cx="233.1" cy="117.1" r="2.2"/>
             <text x="225.1" y="120.1" class="etoile-nom" text-anchor="end">Alnasl</text>
             <circle cx="187.1" cy="106.8" r="2.4"/>
             <circle cx="176.1" cy="171.0" r="2.8"/>
             <text x="176.1" y="186.0" class="etoile-nom" text-anchor="middle">Kaus Australis</text>
             <circle cx="166.3" cy="44.0" r="2.2"/>
             <text x="166.3" y="34.0" class="etoile-nom" text-anchor="middle">Kaus Borealis</text>
             <circle cx="110.3" cy="66.7" r="1.9"/>
             <circle cx="79.6" cy="58.0" r="2.6"/>
             <text x="79.6" y="48.0" class="etoile-nom" text-anchor="middle">Nunki</text>
             <circle cx="59.5" cy="109.9" r="2.2"/>
             <circle cx="44.2" cy="79.6" r="1.8"/>
             <path d="M 291.8,101.9 L 299.8,101.9 M 295.8,97.9 L 295.8,105.9" stroke="#c9a54a" stroke-width="1.4"/>
             <text x="295.8" y="91.9" class="etoile-nom" text-anchor="middle">Sgr A*</text>
           </svg>
         <figcaption>La Théière du Sagittaire, d'après les positions réelles : le bec (Alnasl), le couvercle (Kaus Borealis), l'anse (Nunki). La croix dorée marque Sagittarius A*, le trou noir central de la Galaxie, juste au-dessus du bec : la « vapeur » de la théière est la Voie lactée.</figcaption>
       </figure>`,
      `<h2>Repérage</h2>
       <p>Constellation d'été, basse sur l'horizon sud. Son astérisme le plus reconnaissable est <strong>la Théière</strong> : un motif d'étoiles évoquant une théière de profil (bec, couvercle, anse), dont la «&nbsp;vapeur&nbsp;» sortant du bec correspond justement à la bande la plus dense de la <a href="#/memo/voie-lactee">Voie lactée</a>.</p>`,
      `<h2>Pourquoi c'est important</h2>
       <p>C'est dans cette direction que se trouve le <strong>centre de notre Galaxie</strong>, à environ 26 000 années-lumière. En son cœur se cache <strong>Sagittarius A*</strong>, un <a href="#/memo/trous-noirs">trou noir supermassif</a> de 4 millions de fois la masse du Soleil. On ne le voit pas directement (masqué par les nuages de poussière), mais on observe les étoiles qui l'orbitent à toute vitesse.</p>
       <div class="chiffre-cle">
         Distance au centre galactique : ~26 000 années-lumière<br>
         C'est la région la plus riche du ciel en amas et nébuleuses, idéale aux jumelles.
       </div>`,
      `<h2>Anecdotes</h2>
       <ul>
         <li>C'est de cette direction qu'a été capté, le 15 août 1977, le mystérieux <strong>Signal Wow</strong> : une émission radio puissante et brève (72 secondes) détectée par le radiotélescope Big Ear, à 1420 MHz (la « fréquence de l'hydrogène »). L'astronome Jerry Ehman entoura la trace au stylo rouge en écrivant « Wow! » dans la marge. Jamais recapté, longtemps considéré comme un candidat sérieux de signal extraterrestre, il s'expliquerait plutôt, selon une réanalyse récente, par un bref sursaut naturel d'un nuage d'hydrogène froid.</li>
         <li>Balayer cette zone aux jumelles sous un ciel noir montre une profusion d'objets : amas ouverts, amas globulaires et nébuleuses se succèdent le long de la Voie lactée.</li>
       </ul>`
    ],
    voirAussi: ["voie-lactee", "trous-noirs"]
  }
};
