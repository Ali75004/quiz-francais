// ── Config ────────────────────────────────────────────────
const QUESTIONS_PER_GAME = 50;
const STREAK_GOAL        = 5;

// streak → difficulty level to pick next question from
//  0,1 → easy (1),  2,3 → medium (2),  4 → hard (3)
const STREAK_TO_DIFF = [1, 1, 2, 2, 3];

// ── Game state ────────────────────────────────────────────
let pools       = { 1:[], 2:[], 3:[] }; // shuffled question pools per difficulty
let usedIds     = new Set();
let questionsPlayed = 0;
let current     = null;  // current question object
let score       = 0;
let streak      = 0;
let answered    = false;
let images      = [];
let pendingNext = false;

// ── DOM refs ──────────────────────────────────────────────
const screens = {
  start : document.getElementById('screen-start'),
  quiz  : document.getElementById('screen-quiz'),
  end   : document.getElementById('screen-end'),
};
const progressBar   = document.getElementById('progress-bar');
const questionCount = document.getElementById('question-count');
const scoreDisplay  = document.getElementById('score-display');
const questionCat   = document.getElementById('question-category');
const questionText  = document.getElementById('question-text');
const choicesEl     = document.getElementById('choices');
const popupOverlay  = document.getElementById('popup-overlay');
const popupImg      = document.getElementById('popup-img');
const popupCaption  = document.getElementById('popup-caption');
const popupClose    = document.getElementById('popup-close');
const popupNext     = document.getElementById('popup-next');
const btnStart      = document.getElementById('btn-start');
const btnRestart    = document.getElementById('btn-restart');
const endEmoji      = document.getElementById('end-emoji');
const endTitle      = document.getElementById('end-title');
const endScore      = document.getElementById('end-score');
const endMessage    = document.getElementById('end-message');

// ── Helpers ───────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function showScreen(name) {
  Object.entries(screens).forEach(([k, el]) =>
    el.classList.toggle('active', k === name));
}

// ── Image loading ─────────────────────────────────────────
async function loadImages() {
  try {
    const res = await fetch('/api/images');
    images = await res.json();
  } catch { images = []; }
}
function randomImage() {
  if (!images.length) return null;
  return `/Loluou_Img/${images[Math.floor(Math.random() * images.length)]}`;
}

// ── Question picker ───────────────────────────────────────
function buildPools() {
  pools = { 1:[], 2:[], 3:[] };
  usedIds.clear();
  QUESTIONS.forEach((q, i) => {
    if (!pools[q.difficulty]) pools[q.difficulty] = [];
    pools[q.difficulty].push(i);
  });
  pools[1] = shuffle(pools[1]);
  pools[2] = shuffle(pools[2]);
  pools[3] = shuffle(pools[3]);
}

function pickQuestion() {
  const wantedDiff = STREAK_TO_DIFF[streak] || 1;
  // Try preferred difficulty first, then fall back to others
  for (const d of [wantedDiff, 1, 2, 3]) {
    const pool = pools[d];
    const idx  = pool.findIndex(i => !usedIds.has(i));
    if (idx !== -1) {
      const qIndex = pool.splice(idx, 1)[0];
      usedIds.add(qIndex);
      return { ...QUESTIONS[qIndex], _id: qIndex };
    }
  }
  return null; // all exhausted
}

// ── Game flow ─────────────────────────────────────────────
function startGame() {
  buildPools();
  questionsPlayed = 0;
  score   = 0;
  streak  = 0;
  showScreen('quiz');
  showQuestion();
}

function showQuestion() {
  if (questionsPlayed >= QUESTIONS_PER_GAME) { showEnd(); return; }

  current  = pickQuestion();
  if (!current) { showEnd(); return; }
  answered = false;

  // Header
  progressBar.style.width = `${(questionsPlayed / QUESTIONS_PER_GAME) * 100}%`;
  questionCount.textContent = `Question ${questionsPlayed + 1} / ${QUESTIONS_PER_GAME}`;
  updateStreakDisplay();

  // Difficulty badge colour on category label
  const diffLabel = ['', '🟢 ', '🟡 ', '🔴 '][current.difficulty] || '';
  questionCat.textContent  = diffLabel + current.category;
  questionText.textContent = current.question;

  // Choices
  choicesEl.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  current.choices.forEach((text, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span class="choice-letter">${letters[idx]}</span><span>${text}</span>`;
    btn.addEventListener('click', () => handleAnswer(idx, btn, current.answer));
    choicesEl.appendChild(btn);
  });

  // Animate card
  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = '';
}

function handleAnswer(chosen, btn, correctIdx) {
  if (answered) return;
  answered = true;
  questionsPlayed++;

  const allBtns = choicesEl.querySelectorAll('.choice-btn');
  allBtns.forEach(b => b.disabled = true);

  if (chosen === correctIdx) {
    btn.classList.add('correct');
    score++;
    streak++;
    updateStreakDisplay();
    if (streak >= STREAK_GOAL) {
      streak = 0;
      showPopup();
      pendingNext = true;
    } else {
      setTimeout(() => showQuestion(), 900);
    }
  } else {
    streak = 0;
    btn.classList.add('wrong');
    allBtns[correctIdx].classList.add('reveal');
    updateStreakDisplay();
    setTimeout(() => showQuestion(), 1800);
  }
}

// ── Streak display ────────────────────────────────────────
function updateStreakDisplay() {
  const diffNext = STREAK_TO_DIFF[streak] || 1;
  const diffEmoji = ['','🟢','🟡','🔴'][diffNext];
  const dots = Array.from({ length: STREAK_GOAL }, (_, i) =>
    `<span class="streak-dot${i < streak ? ' filled' : ''}"></span>`
  ).join('');
  scoreDisplay.innerHTML = `Score&nbsp;: ${score} &nbsp; ${dots} ${diffEmoji}`;
}

// ── Popup ─────────────────────────────────────────────────
function showPopup() {
  const src = randomImage();
  const bravoEl = document.querySelector('.popup-bravo');
  if (bravoEl) bravoEl.textContent = '🔥 5 bonnes réponses !';
  if (src) {
    popupImg.src = src;
    popupImg.style.display = 'block';
  } else {
    popupImg.style.display = 'none';
  }
  popupOverlay.classList.remove('hidden');
}
function closePopup() {
  popupOverlay.classList.add('hidden');
  if (pendingNext) { pendingNext = false; showQuestion(); }
}

popupClose.addEventListener('click', closePopup);
popupNext.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', e => { if (e.target === popupOverlay) closePopup(); });
let touchStartY = 0;
popupOverlay.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; });
popupOverlay.addEventListener('touchend',   e => { if (e.changedTouches[0].clientY - touchStartY > 80) closePopup(); });

// ── End screen ────────────────────────────────────────────
function showEnd() {
  progressBar.style.width = '100%';
  const pct = score / QUESTIONS_PER_GAME;
  let emoji, title, msg;
  if (pct === 1)      { emoji='🏆'; title='Parfait !';         msg='Score parfait ! Vous maîtrisez le français à merveille.'; }
  else if (pct>=.8)   { emoji='🌟'; title='Excellent !';       msg='Très beau résultat ! Continuez sur cette lancée.'; }
  else if (pct>=.6)   { emoji='👍'; title='Bien joué !';       msg='Bon score ! Encore un peu de travail et vous serez au top.'; }
  else if (pct>=.4)   { emoji='📚'; title='Peut mieux faire !'; msg="Un peu de révision s'impose. Vous pouvez y arriver !"; }
  else                { emoji='💪'; title='Courage !';          msg='Le français, ça s\'apprend ! Réessayez, vous progresserez.'; }

  endEmoji.textContent   = emoji;
  endTitle.textContent   = title;
  endScore.textContent   = `Vous avez eu ${score} / ${QUESTIONS_PER_GAME}`;
  endMessage.textContent = msg;
  showScreen('end');
}

// ── Buttons & Boot ────────────────────────────────────────
btnStart.addEventListener('click',   startGame);
btnRestart.addEventListener('click', startGame);

loadImages();
showScreen('start');
