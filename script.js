'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const startButton = document.querySelector('.close');
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
startButton.addEventListener('click', closeModal);

const player0 = document.querySelector('.player--0');
const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');

const player1 = document.querySelector('.player--1');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');

// Other elements
const diceRoll = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

score0El.textContent = 0;
score1El.textContent = 0;
diceImg.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

diceRoll.addEventListener('click', function () {
  // dice roll logic
  const dice = Math.trunc(Math.random() * 6) + 1;
  // dice image display
  diceImg.classList.remove('hidden');
  diceImg.src = `imgs/dice-${dice}.png`;

  // check dice
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

holdBtn.addEventListener('click', () => {
  // curerent score add
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    holdBtn.disabled = true;
    diceRoll.disabled = true;
  } else {
    switchPlayer();
  }
});

const newButton = document.querySelector('.btn--new');
newButton.addEventListener('click', () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceImg.classList.add('hidden');
  holdBtn.disabled = false;
  diceRoll.disabled = false;
});
