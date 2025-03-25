let wordObj;

window.onload = function () {
  LoadData();
  let letterContain = document.querySelector("#letterContain");
  letterContain.addEventListener("click", CheckLetter);

  let buttonNewGame = document.querySelector("#startNew");
  buttonNewGame.addEventListener("click", CallDropDown);

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
      CallDropDown();
    }
  };
  xhr.open("GET", url, true); // must use “GET” method :step3
  xhr.send(); // this actually sends the request to the server :step 4
}

function CallDropDown() {
  let dropDown = document.querySelector(".dropDownContain");

  if (dropDown.classList.contains("show")) {
    dropDown.classList.remove("show");
    dropDown.classList.add("hide");
  } else {
    dropDown.classList.remove("hide");
    dropDown.classList.add("show");
  }
}

function CheckLetter(evt) {
  let click = evt.target;

  if (click.classList.contains("letter")) {
    GameController.processLetter(click.innerHTML);
    UpdateGame();
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
  alert("New game started! New Game Button disabled. Good luck.");
  CallDropDown();
  let buttonNewGame = document.querySelector("#startNew");
  buttonNewGame.removeEventListener("click", CallDropDown);

  let mysteryWord = GenerateWord();

  GameController.newGame(mysteryWord);
  let report = GameController.report();
  UpdateGame();
}
