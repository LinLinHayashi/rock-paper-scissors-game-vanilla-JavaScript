let score = JSON.parse(localStorage.getItem('score'));

if (score === null) { // In case the local storage score is removed and the object score can parse nothing from it (in which score is null).
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}

console.log(localStorage.getItem('message')); // Get the value stored in the local storage message.

console.log(JSON.parse(localStorage.getItem('score')));

updateScoreElement();

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateResult(playerMove, computerMove, result) { // Notice the syntax here.
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img src = "images/${playerMove}-emoji.png" class = "move-icon">
<img src = "images/${computerMove}-emoji.png" class = "move-icon">
Computer`;
}

function removeResult() {
  document.querySelector('.js-result').innerHTML = null;
  document.querySelector('.js-moves').innerHTML = null;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      gamePlay(pickComputerMove(), pickComputerMove());
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId); // This stops the setInterval function.
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  gamePlay('rock', pickComputerMove());
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  gamePlay('paper', pickComputerMove());
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  gamePlay('scissors', pickComputerMove());
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  score.ties = 0;
  score.losses = 0;
  score.wins = 0;
  localStorage.removeItem('score');
  removeResult();
  updateScoreElement();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    gamePlay('rock', pickComputerMove());
  } else if (event.key === 'p') {
    gamePlay('paper', pickComputerMove());
  } else if (event.key === 's') {
    gamePlay('scissors', pickComputerMove());
  }
});

function gamePlay(playerMove, computerMove) {
  result = '';

  if (playerMove === computerMove) {
    result = 'Tie.';
    score.ties++;
  } else if ((playerMove === 'rock' && computerMove === 'paper') || (playerMove === 'paper' && computerMove === 'scissors') || (playerMove === 'scissors' && computerMove === 'rock')) {
    result = 'You lose.';
    score.losses++;
  } else {
    result = 'You win.';
    score.wins++;
  }

  updateResult(playerMove, computerMove, result);
  updateScoreElement();

  localStorage.setItem('score', JSON.stringify(score));

  localStorage.setItem('message', 'hello'); // Local storage. Store a string (only strings are supported) "hello" into local storage message that exists even after refreshing the website.
}