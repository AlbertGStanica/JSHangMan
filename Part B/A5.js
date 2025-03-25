let wordObj;

window.onload = function () {
  LoadData();
  let letterContain = document.querySelector("#letterContain");
  letterContain.addEventListener("click", CheckLetter);

  let buttonNewGame = document.querySelector("#startNew");
  buttonNewGame.addEventListener("click", DisableDropDown);

  let buttonStart = document.querySelector("#begin");
  buttonStart.addEventListener("click", StartGame);
};

function LoadData() {
  let url = "vocabularies.json"; // file we want to read
  let xhr = new XMLHttpRequest(); //step 1
  xhr.onreadystatechange = function () {
    //step 2
    // code 200 means the server succeeded in retrieving the resource
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // console.log(xhr.response);
      wordObj = JSON.parse(xhr.responseText); //contents of json file
      DisableAllLetters();
    }
  };
  xhr.open("GET", url, true); // must use “GET” method :step3
  xhr.send(); // this actually sends the request to the server :step 4
}

function DisableDropDown() {
  ShowElements("dropDownContain");
  let buttonNewGame = document.querySelector("#startNew");
  buttonNewGame.removeEventListener("click", DisableDropDown);
}

function EnableDropDown() {
  HideElements("dropDownContain");
  let buttonNewGame = document.querySelector("#startNew");
  buttonNewGame.addEventListener("click", DisableDropDown);
}

function HideElements(element) {
  let targetElement = document.querySelector(`.${element}`);

  targetElement.classList.remove("show");
  targetElement.classList.add("hide");
}

function ShowElements(element) {
  let targetElement = document.querySelector(`.${element}`);

  targetElement.classList.remove("hide");
  targetElement.classList.add("show");
}

function CheckLetter(evt) {
  let click = evt.target;

  if (click.classList.contains("letter")) {
    GameController.processLetter(click.innerHTML);
    click.classList.remove("letter");
    click.classList.add("disabled");
    UpdateGame();
  }
}

function EnableAllLetters() {
  let letterArray = document.querySelectorAll("tr > td")

  for (i = 0; i < letterArray.length; i++) {
    let letter = letterArray[i];
    letter.classList.remove("disabled");
    letter.classList.add("letter");
  }
}

function DisableAllLetters() {
  let letterArray = document.querySelectorAll("tr > td")

  for (i = 0; i < letterArray.length; i++) {
    let letter = letterArray[i];
    letter.classList.remove("letter");
    letter.classList.add("disabled");
  }
}

function GenerateWord() {
  let radSelect = document.querySelector("input[type=radio]:checked");
  let categorySelect = radSelect.value;
  let categoryArray = wordObj.vocabularies;
  let randomWord = "";

  for (i = 0; i < categoryArray.length; i++) {
    if (categoryArray[i].categoryName === categorySelect) {
      let wordList = categoryArray[i].words;
      randomWord = wordList[Math.round(Math.random() * wordList.length)];

      console.log(randomWord);
    }
  }

  return randomWord;
}
function UpdateGame() {
  // Update Image
  let report = GameController.report();
  let target = document.querySelector(".hangmanPicture");
  let image = GetImage(report.guessesRemaining);
  target.innerHTML = image;

  let mysteryWordTarget = document.querySelector(".mysteryWord");
  let blanks = getBlanks(report);
  mysteryWordTarget.innerHTML = blanks;

  let displayGuesses = document.querySelector(".displayGuesses");
  let remainingGuesses = report.guessesRemaining;
  displayGuesses.innerHTML = `Guesses Remaining: ${remainingGuesses}`;

  let displayOutcome = document.querySelector(".displayOutcome");

  if (report.gameState === "GAME_OVER_LOSE") {
    CallEndGame();
    displayOutcome.innerHTML = "Sorry, you have lost the game.";

  }
  else if (report.gameState === "GAME_OVER_WIN") {
    CallEndGame();
    displayOutcome.innerHTML = "Sweet, sweet victory.";
  }
}

function CallEndGame() {
  ShowElements("displayOutcome");
  EnableDropDown();
  DisableAllLetters();
}

function getBlanks(report) {
  let guess = "";
  let blank = `<div class="blank">` + guess + `</div>`;
  let outString = "";
  for (let z = 0; z < report.guess.length; z++) {
    guess = report.guess[z];
    blank = `<div class="blank">` + guess + `</div>`;
    outString += blank;
  }
  return outString;
}

function GetImage(guessNumber) {
  let count = 0;
  switch (guessNumber) {
    case 6:
      count = 0;
      break;
    case 5:
      count = 1;
      break;
    case 4:
      count = 2;
      break;
    case 3:
      count = 3;
      break;
    case 2:
      count = 4;
      break;
    case 1:
      count = 5;
      break;
    case 0:
      count = 6;
      break;
  }
  let image =
    `<img src="imgs/HangMan` + count + `.png" alt="HangmanImage` + count + `">`;
  return image;
}

function StartGame() {
  ShowElements("displayCategory");
  ShowElements("displayGuesses");
  HideElements("dropDownContain");
  HideElements("displayOutcome");
  EnableAllLetters();

  let displayOutcome = document.querySelector(".displayOutcome");
  displayOutcome.classList.add("hide");
  displayOutcome.classList.remove("show");

  let mysteryWord = GenerateWord();

  GameController.newGame(mysteryWord);
  let report = GameController.report();
  UpdateGame();

  let categoryDiv = document.querySelector(".displayCategory");
  let radSelect = document.querySelector("input[type=radio]:checked");
  let categorySelect = radSelect.value;

  console.log(categorySelect);
  categoryDiv.innerHTML = `Category: ${categorySelect.toUpperCase()}`;
}
