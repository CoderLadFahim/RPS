// getting img srcs
const rockImg = "./resources/rock.png";
const paperImg = "./resources/paper.png";
const scissorsImg = "./resources/scissors.png";

// QUERYING IN NECESSARY DOM ELEMENTS

// choice tab
const choiceTab = document.querySelector("#user-choices");

// choices
const rockChoices = Array.from(document.querySelectorAll(".rock"));
const paperChoices = Array.from(document.querySelectorAll(".paper"));
const scissorChoices = Array.from(document.querySelectorAll(".scissors"));

// user choices from choice tab
const rock = rockChoices[0];
const paper = paperChoices[0];
const scissors = scissorChoices[0];

// final choices
const userChoice = document.querySelector("#user-choice img");
const compChoice = document.querySelector("#computer-choice img");

// user scores
const userScoreSpan = document.querySelector("#user-score");
const compScoreSpan = document.querySelector("#computer-score");

// commentary & reset button
const comm = document.querySelector("#commentary");
const resetBtn = document.querySelector("button");

// setting the choice imgs
rockChoices.forEach(rock => (rock.src = rockImg));
paperChoices.forEach(paper => (paper.src = paperImg));
scissorChoices.forEach(scissors => (scissors.src = scissorsImg));

// GAME FUNCTONALITY STARS UNDER THIS LINE

// player decisions
let userDec = "";
let compDec = "";

// players making moves
function userMove(decision) {
  userDec = decision.className;
  userChoice.src = decision.src;
}

function compMove() {
  let rand = Math.floor(Math.random() * 3);

  switch (rand) {
    case 0:
      compChoice.src = rockImg;
      compDec = "rock";
      break;
    case 1:
      compChoice.src = paperImg;
      compDec = "paper";
      break;
    case 2:
      compChoice.src = scissorsImg;
      compDec = "scissors";
      break;
  }

  enlargeChoice();
}

function enlargeChoice() {
  document.querySelectorAll("#computer-choices img").forEach(choice => {
    if (compChoice.src == choice.src) {
      choice.style.transform = "scale(1.4)";
    } else {
      choice.style.transform = "";
    }
  });
}

// determining the winner
let winner = "";
let gameTied = false;

function determineWinner() {
  if (userDec === compDec) {
    gameTied = true;
  } else {
    gameTied = false;
  }

  if (userDec == "rock") {
    if (compDec == "paper") {
      winner = "computer";
    } else {
      winner = "user";
    }
  } else if (userDec == "paper") {
    if (compDec == "scissors") {
      winner = "computer";
    } else {
      winner = "user";
    }
  } else if (userDec == "scissors") {
    if (compDec == "rock") {
      winner = "computer";
    } else {
      winner = "user";
    }
  }
}

// updating scores
let userScore = 0;
let compScore = 0;

function updateScores() {
  if (!gameTied) winner == "user" ? userScore++ : compScore++;

  userScoreSpan.textContent = userScore;
  compScoreSpan.textContent = compScore;
}

// commentating function
const commentate = () =>
  !gameTied
    ? (comm.textContent = "the " + winner + " won!")
    : (comm.textContent = "the game was tied!");

// decorating components upon results

function userVic(size, winCol, loseCol) {
  userChoice.parentElement.style.border = `${size}px solid ${winCol}`;
  compChoice.parentElement.style.border = `${size}px solid ${loseCol}`;
  comm.style.borderBottom = `${size}px solid ${winCol}`;
}

function userLoss(size, winCol, loseCol) {
  userChoice.parentElement.style.border = `${size}px solid ${loseCol}`;
  compChoice.parentElement.style.border = `${size}px solid ${winCol}`;
  comm.style.borderBottom = `${size}px solid ${loseCol}`;
}

function tie(size, tieCol) {
  userChoice.parentElement.style.border = `${size}px solid ${tieCol}`;
  compChoice.parentElement.style.border = `${size}px solid ${tieCol}`;
  comm.style.borderBottom = `${size}px solid ${tieCol}`;
}

function decorate() {
  let borderSize = 5;
  let winBorderCol = "#44ff44";
  let loseBorderCol = "red";
  let tieBorderCol = "#ffff08";

  if (winner == "user" && !gameTied) {
    userVic(borderSize, winBorderCol, loseBorderCol);
  } else if (winner == "computer" && !gameTied) {
    userLoss(borderSize, winBorderCol, loseBorderCol);
  } else {
    tie(borderSize, tieBorderCol);
  }
}

// RESETTER FUNCTIONS

function scoreReset() {
  userScore = 0;
  compScore = 0;
  userScoreSpan.textContent = userScore;
  compScoreSpan.textContent = compScore;
}

function resetChoices() {
  userChoice.src = "";
  compChoice.src = "";
}

function resetDecorations() {
  userChoice.parentElement.style.border = "";
  compChoice.parentElement.style.border = "";
  comm.style.borderBottom = "";
}

const resetText = () => (comm.textContent = "make your move");

function resetChoiceSize() {
  Array.from(document.querySelectorAll("#computer-choices img")).forEach(
    img => (img.style.transform = "")
  );
}

// EVENT LISTENERS

// popup effect
[rock, paper, scissors].forEach(choice => {
  choice.addEventListener("mousedown", e => {
    e.target.style.transform = "scale(1.4)";

    // semi resetting on mouse down
    resetChoices();
    resetChoiceSize();
    resetDecorations();
    resetText();
  });

  choice.addEventListener("mouseup", e => {
    e.target.style.transform = "";
  });
});

choiceTab.addEventListener("click", e => {
  let targetElement = e.target;

  if (targetElement.parentElement.className == "choice") {
    userMove(targetElement);
    compMove();
    determineWinner();
    commentate();
    decorate();
    updateScores();
  }
});

resetBtn.addEventListener("click", e => {
  scoreReset();
  resetChoices();
  resetChoiceSize();
  resetDecorations();
  resetText();
});
