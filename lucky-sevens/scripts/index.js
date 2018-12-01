import 'bootstrap/dist/css/bootstrap.min.css';

const form = document.querySelector('form');
const resultsTable = document.querySelector('#results');
const resultStartingBet = document.querySelector('#result--starting-bet');
const resultTotalRolls = document.querySelector('#result--total-rolls');
const resultHighestWon = document.querySelector('#result--highest-won');
const resultTotalRollsAtHighestWon = document.querySelector(
  '#result--total-rolls-at-highest-won'
);
const resetBtn = document.querySelector('#reset');

function handleSubmit(e) {
  e.preventDefault();
  const [input] = e.target;
  const startingBet = Number(input.value);

  if (startingBet < 1) {
    window.alert('Starting Bet must be greater than zero!');
    return;
  }

  const results = playGame(startingBet);
  displayResults(results);
}

function handleReset() {
  resultsTable.classList.add('invisible');
  form.reset();
}

form.addEventListener('submit', handleSubmit);
resetBtn.addEventListener('click', handleReset);

// ------------
function playGame(startingBet) {
  if (!startingBet) {
    throw new Error('startingBet must be supplied to playGame');
  }

  let balance = startingBet;
  let totalRolls = 0;
  let highestWon = 0;
  let totalRollsAtHighestWon = 0;

  while (balance > 0) {
    const diceRoll = rollDice();
    totalRolls++;

    if (diceRoll === 7) {
      balance += 4;
    } else {
      balance -= 1;
    }

    if (balance > highestWon) {
      highestWon = balance;
      totalRollsAtHighestWon = totalRolls;
    }
  }

  return { startingBet, totalRolls, highestWon, totalRollsAtHighestWon };
}

function displayResults(results) {
  const {
    startingBet,
    totalRolls,
    highestWon,
    totalRollsAtHighestWon,
  } = results;
  resultStartingBet.innerText = '$' + startingBet;
  resultTotalRolls.innerText = totalRolls;
  resultHighestWon.innerText = '$' + highestWon;
  resultTotalRollsAtHighestWon.innerText = totalRollsAtHighestWon;
  resultsTable.classList.remove('invisible');
}

function rollDice(numOfDice = 2, numOfSides = 6) {
  const rolls = Array.from({ length: numOfDice }).map(roll => {
    return Math.floor(Math.random() * numOfSides + 1);
  });

  return rolls.reduce((acc, roll) => acc + roll, 0);
}
