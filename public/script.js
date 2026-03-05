// ── Game state ───────────────────────────────────────────
const QUESTIONS_PER_GAME = 20;
const STREAK_GOAL = 5;

let questions     = [];
let current       = 0;
let score         = 0;
let streak        = 0;  // consecutive correct answers
let answered      = false;
let images        = [];
let imagesLoaded  = false;
let pendingNext   = false;  // popup was opened, wait for user to click next

// ── DOM refs ─────────────────────────────────────────────
const screens = {
  start : document.getElementById('screen-start'),
  quiz  : document.getElementById('screen-quiz'),
  end   : document.getElementById('screen-end'),
};

const progressBar     = document.getElementById('progress-bar');
const questionCount   = document.getElementById('question-count');
const scoreDisplay    = document.getElementById('score-display');
const questionCat     = document.getElementById('question-category');
const questionText    = document.getElementById('question-text');
const choicesEl       = document.getElementById('choices');

const popupOverlay    = document.getElementById('popup-overlay');
const popupImg        = document.getElementById('popup-img');
const popupCaption    = document.getElementById('popup-caption');
const popupClose      = document.getElementById('popup-close');
const popupNext       = document.getElementById('popup-next');

const btnStart        = document.getElementById('btn-start');
const btnRestart      = document.getElementById('btn-restart');

const endEmoji        = document.getElementById('end-emoji');
const endTitle        = document.getElementById('end-title');
const endScore        = document.getElementById('end-score');
const endMessage      = document.getElementById('end-message');

// ── Helpers ──────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(name) {
  Object.entries(screens).forEach(([k, el]) => {
    el.classList.toggle('active', k === name);
  });
}

// ── Image loading ─────────────────────────────────────────
async function loadImages() {
  try {
    const res = await fetch('/api/images');
    images = await res.json();
    imagesLoaded = true;
  } catch {
    images = [];
  }
}

function randomImage() {
  if (!images.length) return null;
  return `/Loluou_Img/${images[Math.floor(Math.random() * images.length)]}`;
}

// ── Game flow ─────────────────────────────────────────────
function startGame() {
  questions = shuffle(QUESTIONS).slice(0, QUESTIONS_PER_GAME);
  current   = 0;
  score     = 0;
  streak    = 0;
  showScreen('quiz');
  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) { showEnd(); return; }

  answered = false;
  const q    = questions[current];
  const total = questions.length;

  // Header
  progressBar.style.width = `${(current / total) * 100}%`;
  questionCount.textContent = `Question ${current + 1} / ${total}`;
  updateStreakDisplay();

  // Question
  questionCat.textContent  = q.category;
  questionText.textContent = q.question;

  // Rebuild choices
  choicesEl.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.choices.forEach((text, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span class="choice-letter">${letters[idx]}</span><span>${text}</span>`;
    btn.addEventListener('click', () => handleAnswer(idx, btn, q.answer));
    choicesEl.appendChild(btn);
  });

  // Animate question card
  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = '';
}

function handleAnswer(chosen, btn, correctIdx) {
  if (answered) return;
  answered = true;

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
      setTimeout(() => nextQuestion(), 900);
    }
  } else {
    streak = 0;
    btn.classList.add('wrong');
    allBtns[correctIdx].classList.add('reveal');
    updateStreakDisplay();
    setTimeout(() => nextQuestion(), 1800);
  }
}

function updateStreakDisplay() {
  const dots = Array.from({length: STREAK_GOAL}, (_, i) =>
    `<span class="streak-dot${i < streak ? ' filled' : ''}"></span>`
  ).join('');
  scoreDisplay.innerHTML = `Score : ${score} &nbsp; ${dots}`;
}

function nextQuestion() {
  current++;
  showQuestion();
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
  if (pendingNext) {
    pendingNext = false;
    nextQuestion();
  }
}

popupClose.addEventListener('click', closePopup);
popupNext.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) closePopup();
});

// Close popup on swipe down
let touchStartY = 0;
popupOverlay.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; });
popupOverlay.addEventListener('touchend', e => {
  if (e.changedTouches[0].clientY - touchStartY > 80) closePopup();
});

// ── End screen ────────────────────────────────────────────
function showEnd() {
  progressBar.style.width = '100%';

  const pct = score / questions.length;
  let emoji, title, msg;

  if (pct === 1) {
    emoji = '🏆'; title = 'Parfait !';
    msg = 'Score parfait ! Vous maîtrisez le français à merveille.';
  } else if (pct >= .8) {
    emoji = '🌟'; title = 'Excellent !';
    msg = 'Très beau résultat ! Continuez sur cette lancée.';
  } else if (pct >= .6) {
    emoji = '👍'; title = 'Bien joué !';
    msg = 'Bon score ! Encore un peu de travail et vous serez au top.';
  } else if (pct >= .4) {
    emoji = '📚'; title = 'Peut mieux faire !';
    msg = 'Un peu de révision s\'impose. Vous pouvez y arriver !';
  } else {
    emoji = '💪'; title = 'Courage !';
    msg = 'Le français, ça s\'apprend ! Réessayez, vous progresserez.';
  }

  endEmoji.textContent   = emoji;
  endTitle.textContent   = title;
  endScore.textContent   = `Vous avez eu ${score} / ${questions.length}`;
  endMessage.textContent = msg;

  showScreen('end');
}

// ── Buttons ───────────────────────────────────────────────
btnStart.addEventListener('click', () => {
  startGame();
});

btnRestart.addEventListener('click', () => {
  startGame();
});

// ── Boot ──────────────────────────────────────────────────
loadImages();
showScreen('start');
