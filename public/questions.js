// ── French Quiz Questions ────────────────────────────────
const QUESTIONS = [
  // GRAMMAIRE
  {
    category: "Grammaire",
    question: "Quel est le pluriel correct de « un œil » ?",
    choices: ["des œils", "des yeux", "des œuils", "des œyeux"],
    answer: 1
  },
  {
    category: "Grammaire",
    question: "Choisissez la bonne orthographe :",
    choices: ["Il sont allés", "Ils sont allés", "Ils était allés", "Ils sons allés"],
    answer: 1
  },
  {
    category: "Grammaire",
    question: "Quel article correspond à « avion » ?",
    choices: ["la avion", "l'avion", "les avion", "une avion"],
    answer: 1
  },
  {
    category: "Grammaire",
    question: "Quelle phrase est correcte ?",
    choices: [
      "Je me suis lavé les mains.",
      "Je me suis lavées les mains.",
      "Je m'ai lavé les mains.",
      "J'ai me lavé les mains."
    ],
    answer: 0
  },
  {
    category: "Grammaire",
    question: "Quel est le féminin de « beau » ?",
    choices: ["beaue", "belle", "bele", "beaute"],
    answer: 1
  },
  {
    category: "Grammaire",
    question: "Dans quelle phrase le mot « tout » s'accorde-t-il correctement ?",
    choices: [
      "Toutes les filles sont venues.",
      "Tout les garçons sont partis.",
      "Toute les femmes travaillent.",
      "Tous la famille est là."
    ],
    answer: 0
  },
  {
    category: "Grammaire",
    question: "Quel est le pluriel de « un bal » ?",
    choices: ["des baus", "des baux", "des bals", "des bales"],
    answer: 2
  },
  {
    category: "Grammaire",
    question: "Complétez : « Il faut que tu _____ venir. »",
    choices: ["viennes", "viendras", "viens", "venez"],
    answer: 0
  },
  {
    category: "Grammaire",
    question: "Quelle est la nature du mot souligné : « Il parle **lentement**. »",
    choices: ["adjectif", "nom", "adverbe", "verbe"],
    answer: 2
  },
  {
    category: "Grammaire",
    question: "Choisissez la forme correcte : « Les enfants se sont ___ leurs devoirs. »",
    choices: ["rappelés à faire", "rappelé de faire", "rappelés de faire", "raappelé à faire"],
    answer: 2
  },

  // CONJUGAISON
  {
    category: "Conjugaison",
    question: "Quelle est la conjugaison correcte de « aller » au présent, 1ʳᵉ pers. sing. ?",
    choices: ["je alle", "je vais", "j'aille", "j'allie"],
    answer: 1
  },
  {
    category: "Conjugaison",
    question: "Conjuguez « être » au passé simple, 3ᵉ pers. plur. :",
    choices: ["ils étaient", "ils furent", "ils ont été", "ils seront"],
    answer: 1
  },
  {
    category: "Conjugaison",
    question: "Quel est le participe passé du verbe « peindre » ?",
    choices: ["peindé", "peint", "peindi", "peindu"],
    answer: 1
  },
  {
    category: "Conjugaison",
    question: "Conjuguez « avoir » au subjonctif présent, 1ʳᵉ pers. plur. :",
    choices: ["nous avons", "nous avions", "nous ayons", "nous aiyons"],
    answer: 2
  },
  {
    category: "Conjugaison",
    question: "Choisissez la forme correcte : « Quand il ___, nous partirons. »",
    choices: ["arrivera", "arrive", "arriverait", "soit arrivé"],
    answer: 0
  },
  {
    category: "Conjugaison",
    question: "Conjuguez « voir » à l'imparfait, 2ᵉ pers. sing. :",
    choices: ["tu voyais", "tu vois", "tu vis", "tu verras"],
    answer: 0
  },
  {
    category: "Conjugaison",
    question: "Quel est le participe passé de « naître » ?",
    choices: ["naitré", "né", "naît", "naitu"],
    answer: 1
  },
  {
    category: "Conjugaison",
    question: "Conjuguez « finir » au futur simple, 3ᵉ pers. plur. :",
    choices: ["ils finissent", "ils finiront", "ils finiraient", "ils ont fini"],
    answer: 1
  },

  // VOCABULAIRE
  {
    category: "Vocabulaire",
    question: "Qu'est-ce qu'un « néologisme » ?",
    choices: [
      "Un mot ancien tombé en désuétude",
      "Un mot nouvellement créé",
      "Un mot d'origine étrangère",
      "Un mot sans signification"
    ],
    answer: 1
  },
  {
    category: "Vocabulaire",
    question: "Quel est le synonyme de « loquace » ?",
    choices: ["silencieux", "bavard", "timide", "paresseux"],
    answer: 1
  },
  {
    category: "Vocabulaire",
    question: "Quel est l'antonyme de « bénévole » ?",
    choices: ["volontaire", "altruiste", "rémunéré", "désintéressé"],
    answer: 2
  },
  {
    category: "Vocabulaire",
    question: "Que signifie « péremptoire » ?",
    choices: [
      "Hésitant, incertain",
      "Qui admet la discussion",
      "Qui s'impose de façon absolue, sans réplique",
      "Qui expire rapidement"
    ],
    answer: 2
  },
  {
    category: "Vocabulaire",
    question: "Quel est le sens de l'expression « avoir le cafard » ?",
    choices: [
      "Avoir peur des insectes",
      "Être triste, déprimé",
      "Se sentir en pleine forme",
      "Avoir de mauvais souvenirs"
    ],
    answer: 1
  },
  {
    category: "Vocabulaire",
    question: "Que signifie « épistolaire » ?",
    choices: [
      "Relatif aux épices",
      "Relatif à l'écriture de lettres",
      "Relatif à l'histoire religieuse",
      "Relatif à la mer"
    ],
    answer: 1
  },

  // ORTHOGRAPHE
  {
    category: "Orthographe",
    question: "Quelle orthographe est correcte ?",
    choices: ["il aprend", "il apprend", "il apprant", "il appren"],
    answer: 1
  },
  {
    category: "Orthographe",
    question: "Choisissez la bonne orthographe :",
    choices: ["une nénuphar", "un nénoufar", "un nénuphar", "un ninuphar"],
    answer: 2
  },
  {
    category: "Orthographe",
    question: "Quelle phrase contient une erreur d'orthographe ?",
    choices: [
      "Elle s'est assise.",
      "Nous avons mangés une pomme.",
      "Ils sont partis tôt.",
      "Il a pris son manteau."
    ],
    answer: 1
  },
  {
    category: "Orthographe",
    question: "Quelle est la bonne orthographe du verbe au passé composé : « nous ___ » ?",
    choices: ["nous avons mangés", "nous avons mangé", "nous avons mangée", "nous avons mangées"],
    answer: 1
  },
  {
    category: "Orthographe",
    question: "Choisissez l'orthographe correcte :",
    choices: ["un aprenti", "un apprentit", "un apprenti", "un appranti"],
    answer: 2
  },

  // EXPRESSIONS & FIGURES DE STYLE
  {
    category: "Figures de style",
    question: "Dans « Le vent gémit dans les arbres », quelle figure de style est utilisée ?",
    choices: ["métaphore", "personnification", "hyperbole", "comparaison"],
    answer: 1
  },
  {
    category: "Figures de style",
    question: "Quelle est la figure de style dans : « blanc comme neige » ?",
    choices: ["métaphore", "allitération", "comparaison", "antithèse"],
    answer: 2
  },
  {
    category: "Figures de style",
    question: "Dans « Il pleuvait des cordes », quel procédé stylistique reconnaît-on ?",
    choices: ["litote", "métaphore", "oxymore", "anaphore"],
    answer: 1
  },
  {
    category: "Figures de style",
    question: "Qu'est-ce qu'une « anaphore » ?",
    choices: [
      "Une figure de son",
      "La répétition d'un mot en début de phrase",
      "Une opposition de deux idées",
      "Une exagération volontaire"
    ],
    answer: 1
  },

  // CULTURE DE LA LANGUE
  {
    category: "Culture de la langue",
    question: "Quel est le mot français d'origine arabe parmi ces propositions ?",
    choices: ["soleil", "sucre", "nuage", "maison"],
    answer: 1
  },
  {
    category: "Culture de la langue",
    question: "Quel organisme est chargé de défendre et d'enrichir la langue française ?",
    choices: [
      "L'Institut national des langues",
      "L'Académie française",
      "Le Conseil de la langue",
      "L'Office du français"
    ],
    answer: 1
  },
  {
    category: "Culture de la langue",
    question: "Quelle est la langue officielle de la Belgique qui partage le français ?",
    choices: ["le wallon", "le bruxellois", "le français", "le flamand"],
    answer: 2
  },
  {
    category: "Culture de la langue",
    question: "Combien de lettres compte l'alphabet français ?",
    choices: ["24", "25", "26", "27"],
    answer: 2
  }
];
