let wordObj;

window.onload = function () {
    LoadData();
    let letterContain = document.querySelector("#letterContain");
    letterContain.addEventListener("click", CheckLetter);

    let buttonNewGame = document.querySelector("#startNew");
    buttonNewGame.addEventListener("click", CallDropDown);

    let buttonStart = document.querySelector("#begin");
    buttonStart.addEventListener("click", StartGame);
}

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
    }
    else {
        dropDown.classList.remove("hide");
        dropDown.classList.add("show");
    }
}

function CheckLetter(evt) {
    let click = evt.target;

    if (click.classList.contains("letter")) {

    }
}

function GenerateWord() {
    let radSelect = document.querySelector('input[type=radio]:checked');
    let categorySelect = radSelect.value;
    let categoryArray = wordObj.vocabularies;
    let randomWord = "";

    for (i = 0; i < categoryArray.length; i++) {
        if (categoryArray[i].categoryName === categorySelect) {
            let wordList = categoryArray[i].words;
            randomWord = wordList[Math.round((Math.random() * wordList.length))];

            console.log(randomWord);
        }
    }

    return randomWord;
}

function StartGame() {
    alert("New game started! New Game Button disabled. Good luck.");
    CallDropDown();
    let buttonNewGame = document.querySelector("#startNew");
    buttonNewGame.removeEventListener("click", CallDropDown);

    let mysteryWord = GenerateWord();

    newGame(mysteryWord);

    console.log(mysteryWord);


}