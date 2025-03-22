let wordObj;

window.onload = function () {
    loadData();
}

function loadData() {
    let url = "vocabularies.json"; // file we want to read
    let xhr = new XMLHttpRequest(); //step 1
    xhr.onreadystatechange = function () {
        //step 2
        // code 200 means the server succeeded in retrieving the resource
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // console.log(xhr.response);
            wordObj = JSON.parse(xhr.responseText); //contents of json file
            console.log(wordObj);
        }
    };
    xhr.open("GET", url, true); // must use “GET” method :step3
    xhr.send(); // this actually sends the request to the server :step 4
}

