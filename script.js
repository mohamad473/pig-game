"use strict";

// Selecting Element
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
};

init();

// Rolling Dice functionality
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const rollingADice = function () {
  if (playing) {
    //1. Generating A Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `Images/dice-${dice}.png`;

    //3. Check For Rolled 1
    if (dice !== 1) {
      // Add Dice To The Current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch To The Next Player
      switchPlayer();
    }
  }
};

const holdingScore = function () {
  if (playing) {
    //1. Add Current Score To Active Player Score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    diceEl.classList.add("hidden");
    //2. Check Player's Score is >= 100
    if (scores[activePlayer] >= 50) {
      //Finish the game
      playing = false;
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player-active");
    } else {
      switchPlayer();
    }
  }
  //Switch to the next player
};

btnRoll.addEventListener("click", rollingADice);

btnHold.addEventListener("click", holdingScore);

btnNew.addEventListener("click", init);

btnNew.addEventLIstener("click", init);
