'use strict';

//both work the same, but ID is a little faster
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//selecting elements
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//to log the player scores
let scores;
let currentScore;
//to log active player
let activePlayer;
//to determine if you are playing
let playing;

//Necessary Functions

//Sets initial conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

//Swap Players
const swapPlayers = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
};

init();
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate Random Dice ROll
    const dice = Math.trunc(Math.random() * 6 + 1);

    //Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for one, then swap players
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } // if dice roll is 1
    else swapPlayers();
  }
});

//holding score functionality
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //Add current score to total score
    //add the score to the list
    scores[activePlayer] += currentScore;

    //update total score
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if score >= 100;
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //swap player
      swapPlayers();
    }
  }
});

btnNew.addEventListener('click', init);
