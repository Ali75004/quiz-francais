// ── French Quiz Questions (Intermédiaire B1/B2) ──────────
const QUESTIONS = [

  // GRAMMAIRE
  { category:"Grammaire", question:"Quelle phrase est grammaticalement correcte ?", choices:["Je me suis lavé les mains.","Je me suis lavées les mains.","Je m'ai lavé les mains.","J'ai me lavé les mains."], answer:0 },
  { category:"Grammaire", question:"Dans quelle phrase le mot « tout » est-il correctement accordé ?", choices:["Toutes les filles sont venues.","Tout les garçons sont partis.","Toute les femmes travaillent.","Tous la famille est là."], answer:0 },
  { category:"Grammaire", question:"Quelle est la nature du mot « lentement » dans « Il parle lentement » ?", choices:["Adjectif","Nom","Adverbe","Verbe"], answer:2 },
  { category:"Grammaire", question:"Quel est le pluriel correct de « un œil » ?", choices:["des œils","des yeux","des œuils","des œillets"], answer:1 },
  { category:"Grammaire", question:"Choisissez la forme correcte : « Les enfants se sont ___ leurs devoirs. »", choices:["rappelés à faire","rappelé de faire","rappelés de faire","raappelé à faire"], answer:2 },
  { category:"Grammaire", question:"Quelle phrase contient un accord incorrect du participe passé ?", choices:["Les filles sont parties.","Il les a vus.","Elle s'est blessée.","Nous avons mangés une pomme."], answer:3 },
  { category:"Grammaire", question:"Quel est le mode utilisé dans « Il faut que tu viennes » ?", choices:["Indicatif présent","Conditionnel","Subjonctif présent","Impératif"], answer:2 },
  { category:"Grammaire", question:"Complétez : « Si j'avais su, je ___ venu. »", choices:["serais","serai","suis","seras"], answer:0 },
  { category:"Grammaire", question:"Quel mot est invariable ?", choices:["beau","bien","grand","premier"], answer:1 },
  { category:"Grammaire", question:"Dans « C'est lui qui l'a fait », quel est le rôle de « qui » ?", choices:["Pronom interrogatif","Pronom relatif sujet","Pronom relatif objet","Conjonction"], answer:1 },

  // CONJUGAISON
  { category:"Conjugaison", question:"Conjuguez « aller » au subjonctif présent : « il faut que tu ___ ». »", choices:["vas","ailles","ires","aies"], answer:1 },
  { category:"Conjugaison", question:"Conjuguez « être » au passé simple, 3e pers. plur. :", choices:["ils étaient","ils furent","ils ont été","ils seront"], answer:1 },
  { category:"Conjugaison", question:"Quel est le participe passé de « peindre » ?", choices:["peindé","peint","peindi","peindu"], answer:1 },
  { category:"Conjugaison", question:"Conjuguez « avoir » au subjonctif présent : « bien que nous ___ ».", choices:["avons","avions","ayons","aiyons"], answer:2 },
  { category:"Conjugaison", question:"Quel est le participe passé de « naître » ?", choices:["naitré","né","naît","naitu"], answer:1 },
  { category:"Conjugaison", question:"Conjuguez « finir » au futur antérieur : « ils ___ ».", choices:["auront fini","auront finit","ont fini","avaient fini"], answer:0 },
  { category:"Conjugaison", question:"Conjuguez « voir » à l'imparfait, 2e pers. sing. :", choices:["tu voyais","tu vois","tu vis","tu verras"], answer:0 },
  { category:"Conjugaison", question:"Choisissez la forme correcte : « Quand il ___, nous partirons. »", choices:["arrivera","arrive","arriverait","soit arrivé"], answer:0 },
  { category:"Conjugaison", question:"Conjuguez « résoudre » au passé composé, 1re pers. sing. :", choices:["j'ai résolu","j'ai résous","j'ai résout","j'ai résolvé"], answer:0 },
  { category:"Conjugaison", question:"Quel temps est employé dans : « Il aurait pu venir » ?", choices:["Conditionnel présent","Conditionnel passé","Futur antérieur","Plus-que-parfait"], answer:1 },

  // VOCABULAIRE
  { category:"Vocabulaire", question:"Qu'est-ce qu'un « néologisme » ?", choices:["Un mot ancien tombé en désuétude","Un mot nouvellement créé","Un mot d'origine étrangère","Un mot sans signification"], answer:1 },
  { category:"Vocabulaire", question:"Quel est le synonyme de « loquace » ?", choices:["silencieux","bavard","timide","paresseux"], answer:1 },
  { category:"Vocabulaire", question:"Quel est l'antonyme de « bénévole » ?", choices:["volontaire","altruiste","rémunéré","désintéressé"], answer:2 },
  { category:"Vocabulaire", question:"Que signifie « péremptoire » ?", choices:["Hésitant, incertain","Qui admet la discussion","Qui s'impose sans réplique","Qui expire rapidement"], answer:2 },
  { category:"Vocabulaire", question:"Que signifie l'expression « avoir le cafard » ?", choices:["Avoir peur des insectes","Être triste, déprimé","Se sentir en forme","Avoir de mauvais souvenirs"], answer:1 },
  { category:"Vocabulaire", question:"Que signifie « épistolaire » ?", choices:["Relatif aux épices","Relatif à l'écriture de lettres","Relatif à l'histoire","Relatif à la mer"], answer:1 },
  { category:"Vocabulaire", question:"Quel est le sens de « circonspect » ?", choices:["Très bavard","Prudent, qui agit avec précaution","Distrait","Courageux"], answer:1 },
  { category:"Vocabulaire", question:"Que signifie « délétère » ?", choices:["Bienfaisant","Nuisible, nocif","Agréable à lire","Difficile à comprendre"], answer:1 },
  { category:"Vocabulaire", question:"Quel mot désigne une peur irrationnelle et intense ?", choices:["Une névrose","Une phobie","Une psychose","Une paranoïa"], answer:1 },
  { category:"Vocabulaire", question:"Que signifie « acrimonie » ?", choices:["Douceur extrême","Amertume, aigreur dans les propos","Générosité excessive","Indifférence froide"], answer:1 },

  // ORTHOGRAPHE
  { category:"Orthographe", question:"Quelle orthographe est correcte ?", choices:["il aprend","il apprends","il apprend","il apprant"], answer:2 },
  { category:"Orthographe", question:"Choisissez la bonne orthographe :", choices:["une nénuphar","un nénoufar","un nénuphar","un ninuphar"], answer:2 },
  { category:"Orthographe", question:"Quelle phrase contient une erreur ?", choices:["Elle s'est assise.","Nous avons mangés une pomme.","Ils sont partis tôt.","Il a pris son manteau."], answer:1 },
  { category:"Orthographe", question:"Choisissez l'orthographe correcte :", choices:["un aprenti","un apprentit","un apprenti","un appranti"], answer:2 },
  { category:"Orthographe", question:"Quelle est la bonne orthographe ?", choices:["il interrompt","il interromp","il interrumpt","il interromps"], answer:0 },
  { category:"Orthographe", question:"Quel mot s'écrit avec un accent circonflexe ?", choices:["grace","age","boite","île"], answer:3 },
  { category:"Orthographe", question:"Comment s'écrit correctement ?", choices:["une paranthèse","une parenthèse","une parentèse","une parantèse"], answer:1 },
  { category:"Orthographe", question:"Quelle est la bonne orthographe ?", choices:["un chrysanthème","un crysanthème","un chrisanthème","un chrysantème"], answer:0 },

  // FIGURES DE STYLE
  { category:"Figures de style", question:"Dans « Le vent gémit dans les arbres », quelle figure est utilisée ?", choices:["Métaphore","Personnification","Hyperbole","Comparaison"], answer:1 },
  { category:"Figures de style", question:"Quelle figure de style est : « blanc comme neige » ?", choices:["Métaphore","Allitération","Comparaison","Antithèse"], answer:2 },
  { category:"Figures de style", question:"Dans « Il pleuvait des cordes », quel procédé reconnaît-on ?", choices:["Litote","Métaphore","Oxymore","Anaphore"], answer:1 },
  { category:"Figures de style", question:"Qu'est-ce qu'une « antithèse » ?", choices:["Une répétition de sons","Une opposition de deux idées","Une exagération volontaire","Une comparaison implicite"], answer:1 },
  { category:"Figures de style", question:"« Cette obscure clarté » est un exemple de :", choices:["Métaphore","Anaphore","Oxymore","Hyperbole"], answer:2 },
  { category:"Figures de style", question:"Qu'est-ce qu'une litote ?", choices:["Une exagération","Dire moins pour suggérer plus","Une comparaison directe","Une répétition"], answer:1 },

  // CULTURE DE LA LANGUE
  { category:"Culture", question:"Quel organisme est chargé de défendre la langue française ?", choices:["L'Institut national des langues","L'Académie française","Le Conseil de la langue","L'Office du français"], answer:1 },
  { category:"Culture", question:"Quel est le mot français d'origine arabe parmi ces propositions ?", choices:["soleil","sucre","nuage","maison"], answer:1 },
  { category:"Culture", question:"Combien de lettres compte l'alphabet français ?", choices:["24","25","26","27"], answer:2 },
  { category:"Culture", question:"De quelle langue le mot « parapluie » est-il composé ?", choices:["Latin et grec","Deux mots français","Latin et arabe","Espagnol et latin"], answer:1 }

];
