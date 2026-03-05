// ── French Quiz Questions (Débutant A1/A2) ───────────────
const QUESTIONS = [

  // GRAMMAIRE
  { category:"Grammaire", question:"Quel article utilise-t-on devant « chat » ?", choices:["une","un","des","la"], answer:1 },
  { category:"Grammaire", question:"Quel article utilise-t-on devant « maison » ?", choices:["un","le","une","des"], answer:2 },
  { category:"Grammaire", question:"Quelle phrase est correcte ?", choices:["Je suis fatigué.","Je es fatigué.","Je sont fatigué.","J'ai fatigué."], answer:0 },
  { category:"Grammaire", question:"Quel est le pluriel de « un livre » ?", choices:["un livres","des livre","des livres","les livre"], answer:2 },
  { category:"Grammaire", question:"Quel est le féminin de « grand » ?", choices:["grande","grandes","grandi","grandu"], answer:0 },
  { category:"Grammaire", question:"Complétez : « Elle ___ heureuse. »", choices:["suis","es","est","sommes"], answer:2 },
  { category:"Grammaire", question:"Quel mot est un adjectif ?", choices:["courir","rouge","maison","vite"], answer:1 },
  { category:"Grammaire", question:"Quelle phrase utilise correctement « ne…pas » ?", choices:["Je ne mange pas.","Je mange ne pas.","Je pas mange.","Ne je mange pas."], answer:0 },
  { category:"Grammaire", question:"Quel mot est un pronom sujet ?", choices:["beau","nous","table","jouer"], answer:1 },
  { category:"Grammaire", question:"Complétez : « ___ est mon ami. »", choices:["Il","Ils","Elle","Elles"], answer:0 },

  // CONJUGAISON
  { category:"Conjugaison", question:"Conjuguez « être » au présent : « tu ___ ».", choices:["sommes","suis","es","êtes"], answer:2 },
  { category:"Conjugaison", question:"Conjuguez « avoir » au présent : « j'___ ».", choices:["as","ai","avons","a"], answer:1 },
  { category:"Conjugaison", question:"Conjuguez « manger » au présent : « nous ___ ».", choices:["mangeons","mangez","mangent","manges"], answer:0 },
  { category:"Conjugaison", question:"Conjuguez « aller » au présent : « il ___ ».", choices:["allez","vont","va","alles"], answer:2 },
  { category:"Conjugaison", question:"Conjuguez « parler » au présent : « vous ___ ».", choices:["parlons","parlez","parlent","parle"], answer:1 },
  { category:"Conjugaison", question:"Quel est le participe passé de « finir » ?", choices:["finis","fini","finit","fine"], answer:1 },
  { category:"Conjugaison", question:"Conjuguez « faire » au présent : « je ___ ».", choices:["fais","fait","faites","font"], answer:0 },
  { category:"Conjugaison", question:"Au passé composé, quelle phrase est correcte ?", choices:["J'ai mangé une pomme.","J'ai manger une pomme.","J'ai mangée une pomme.","J'ai mangés une pomme."], answer:0 },
  { category:"Conjugaison", question:"Conjuguez « vouloir » au présent : « il ___ ».", choices:["voulons","veulent","veut","voulez"], answer:2 },
  { category:"Conjugaison", question:"Conjuguez « pouvoir » au présent : « tu ___ ».", choices:["peux","peut","pouvez","peuvent"], answer:0 },

  // VOCABULAIRE
  { category:"Vocabulaire", question:"Que signifie « bonjour » ?", choices:["Bonne nuit","Au revoir","Salutation du matin","Merci"], answer:2 },
  { category:"Vocabulaire", question:"Dans quel endroit achète-t-on du pain ?", choices:["La pharmacie","La boulangerie","La librairie","La mairie"], answer:1 },
  { category:"Vocabulaire", question:"Quel est le nom du repas du matin ?", choices:["Le dîner","Le déjeuner","Le petit-déjeuner","Le goûter"], answer:2 },
  { category:"Vocabulaire", question:"Quel mot signifie « content » ?", choices:["triste","fatigué","heureux","fâché"], answer:2 },
  { category:"Vocabulaire", question:"Quel est le contraire de « grand » ?", choices:["fort","lent","petit","vieux"], answer:2 },
  { category:"Vocabulaire", question:"Combien de jours y a-t-il dans une semaine ?", choices:["5","6","7","8"], answer:2 },
  { category:"Vocabulaire", question:"Quel mot est un fruit ?", choices:["carotte","pomme","brocoli","oignon"], answer:1 },
  { category:"Vocabulaire", question:"Comment répond-on poliment à « merci » ?", choices:["Bonjour","S'il vous plaît","De rien","Pardon"], answer:2 },
  { category:"Vocabulaire", question:"Quel est le nom de la saison entre l'été et l'hiver ?", choices:["Le printemps","L'automne","Le soleil","La nuit"], answer:1 },
  { category:"Vocabulaire", question:"Quel mot désigne un animal domestique ?", choices:["table","chien","rouge","maison"], answer:1 },

  // ORTHOGRAPHE
  { category:"Orthographe", question:"Quelle orthographe est correcte ?", choices:["une ékole","une école","une erole","une ekole"], answer:1 },
  { category:"Orthographe", question:"Comment s'écrit le chiffre 2 en lettres ?", choices:["deuc","deu","deux","dex"], answer:2 },
  { category:"Orthographe", question:"Quelle orthographe est correcte ?", choices:["un gateau","un gâteau","un gataux","un gateu"], answer:1 },
  { category:"Orthographe", question:"Quelle orthographe est correcte ?", choices:["la fenaitre","la fenetr","la fenêtre","la fenetre"], answer:2 },
  { category:"Orthographe", question:"Comment écrit-on le jour qui suit mardi ?", choices:["Mercredi","Mercridi","Marciredi","Mercedi"], answer:0 },
  { category:"Orthographe", question:"Quelle orthographe est correcte ?", choices:["un lapen","un lapin","un lapain","un lapont"], answer:1 },
  { category:"Orthographe", question:"Quelle orthographe est correcte ?", choices:["aujordhui","aujourd'hui","aughourdhui","augourdhui"], answer:1 },
  { category:"Orthographe", question:"Comment écrit-on la couleur du ciel par beau temps ?", choices:["bleu","bleux","blet","bleau"], answer:0 },

  // NOMBRES
  { category:"Nombres", question:"Comment dit-on 10 en français ?", choices:["neuf","onze","dix","huit"], answer:2 },
  { category:"Nombres", question:"Combien font 5 + 7 ?", choices:["onze","douze","treize","dix"], answer:1 },
  { category:"Nombres", question:"Comment s'écrit 20 en lettres ?", choices:["dix-neuf","vingt","vingts","vint"], answer:1 },
  { category:"Nombres", question:"Quel nombre vient après « dix-neuf » ?", choices:["dix-huit","vingt et un","vingt","dix-dix"], answer:2 },

  // JOURS & MOIS
  { category:"Jours & Mois", question:"Quel jour vient après le vendredi ?", choices:["Jeudi","Dimanche","Samedi","Lundi"], answer:2 },
  { category:"Jours & Mois", question:"Quel est le premier mois de l'année ?", choices:["Février","Mars","Décembre","Janvier"], answer:3 },
  { category:"Jours & Mois", question:"Combien de mois compte une année ?", choices:["10","11","12","13"], answer:2 },
  { category:"Jours & Mois", question:"Quel mois vient après juillet ?", choices:["Juin","Septembre","Août","Octobre"], answer:2 }

];
