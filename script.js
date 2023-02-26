// Elements Selection ;)
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const curren1tEl = document.querySelector('#current--1');

const dise = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const closeModal = document.querySelector('.close-modal-window');
const modal = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay ');

const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

dise.classList.add('hidden');

function switchActivePlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).innerHTML = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  console.log(activePlayer);

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// Roll Dice
function diceRoll() {
  if (isPlaying) {
    const items = [
      { name: 6, chance: 0.1 },
      { name: 5, chance: 0.2 },
      { name: 4, chance: 0.2 },
      { name: 3, chance: 0.2 },
      { name: 2, chance: 0.1 },
      { name: 1, chance: 0.25 },
    ];

    function dropItem() {
      const randomNumber = Math.random(); // генерируем случайное число от 0 до 1

      let currentItem = null;
      let chanceSum = 0;

      // проходим по массиву и сравниваем вероятность выпадения каждого предмета с случайным числом
      for (let i = 0; i < items.length; i++) {
        chanceSum += items[i].chance;
        if (randomNumber <= chanceSum) {
          currentItem = items[i];
          break;
        }
      }

      // возвращаем название предмета, который выпал
      return currentItem ? currentItem.name : '';
    }

    const droppedItem = dropItem();
    console.log(droppedItem);

    // 1)generate random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2) display number on the dice
    dise.classList.remove('hidden');
    dise.src = `./img/dice${droppedItem}.png`;

    // 3) if the number === 1 switch to the next player, esle add number to current score
    if (droppedItem !== 1) {
      currentScore += droppedItem;
      document.querySelector(`#current--${activePlayer}`).innerHTML =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
}

function closeModalWin() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModalWin();
  }
});

function reloadPage() {
  location.reload();
}

function holdScors() {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).innerHTML =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dise.style.display = 'none';
    } else {
      switchActivePlayer();
    }
  }
}

holdBtn.addEventListener('click', holdScors);
newBtn.addEventListener('click', reloadPage);
rollBtn.addEventListener('click', diceRoll);
closeModal.addEventListener('click', closeModalWin);
overlay.addEventListener('click', closeModalWin);

const items = [
  { name: 6, chance: 0.15 },
  { name: 5, chance: 0.2 },
  { name: 4, chance: 0.25 },
  { name: 3, chance: 0.25 },
  { name: 2, chance: 0.1 },
  { name: 1, chance: 0.1 },
];

function dropItem() {
  const randomNumber = Math.random(); // генерируем случайное число от 0 до 1

  let currentItem = null;
  let chanceSum = 0;

  // проходим по массиву и сравниваем вероятность выпадения каждого предмета с случайным числом
  for (let i = 0; i < items.length; i++) {
    chanceSum += items[i].chance;
    if (randomNumber <= chanceSum) {
      currentItem = items[i];
      break;
    }
  }

  // возвращаем название предмета, который выпал
  return currentItem ? currentItem.name : 'No item dropped';
}

const droppedItem = dropItem();
console.log(droppedItem);
