let line1 = document.getElementById("line1");
let line2 = document.getElementById("line2");
let line3 = document.getElementById("line3");
let line4 = document.getElementById("line4");
let result = document.getElementById("result");
let scoreT = document.getElementById("score");

let arrayLine1 = [];
let arrayLine2 = [];
let arrayLine3 = [];
let arrayLine4 = [];
let arrayLine = [arrayLine1, arrayLine2, arrayLine3, arrayLine4];

let newGame = document.getElementById("newGame");

for(let x = 0; x < 4; x++) {
    arrayLine1.push(line1.getElementsByClassName("case")[x]);
    arrayLine2.push(line2.getElementsByClassName("case")[x]);
    arrayLine3.push(line3.getElementsByClassName("case")[x]);
    arrayLine4.push(line4.getElementsByClassName("case")[x]);
}

/**
 * Function for creat a random number between 0 and 99
 * @returns {number}
 */
function numberRandom100() {
    return Math.trunc(Math.random() * 100);
}

/**
 * Function for creat a random number case between 1 and 16
 * @returns {string}
 */
function caseRandom() {
    return "case" + (Math.trunc((Math.random() * 16) + 1))
}

/**
 * Function for choice case and number
 */
function newNumber() {
    let caseAdd = caseRandom();
    if(document.getElementById(caseAdd).className === "case notEmpty") {
        newNumber();
    }
    else {
        let div = creat(caseAdd);
        let number = numberRandom100();
        if(number >= 95) {
            div.innerHTML = "4";
            div.style.backgroundColor = "#e3b573";
        }
        else {
            div.innerHTML = "2";
            div.style.backgroundColor = "#d6c0b2";
        }
    }
}

/**
 * Function for creat a div
 * @param caseAdd
 * @returns {HTMLDivElement}
 */
function creat(caseAdd) {
    let div = document.createElement("div");
    div.className ="number";
    document.getElementById(caseAdd).classList.add("notEmpty");
    document.getElementById(caseAdd).append(div);
    return div;
}

// Button for begin a game
newGame.addEventListener("click", function () {
    for(let x = 1; x <= 16; x++) {
        let caseTest = "case" + x
        document.getElementById(caseTest).classList.remove("notEmpty");
        if(document.getElementById(caseTest).getElementsByClassName("number").length > 0) {
            document.getElementById(caseTest).removeChild(document.getElementById(caseTest).lastElementChild);
        }
    }
    for(let x = 0; x < arrayLine.length; x++) {
        document.getElementsByClassName("line")[x].style.display = "flex";
    }
    result.innerHTML = "";
    result.style.display = "none";
    scoreT.innerHTML = "0";

    newNumber();
    newNumber();
    document.body.addEventListener("keypress", move);
})


/**
 * Function for keypress and execution moves
 * @param event
 */
function move(event) {
    loose();
    switch(event.key) {
        case "z":
            checkUp();
            break;

        case "q":
            checkLeft();
            break;

        case "s":
            checkDown();
            break;

        case "d":
            checkRight();
            break;
    }
}

/**
 * Function for check the different cases for move up
 */
function checkUp() {
    let notOK = 0;
    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 4; y++) {
            if((arrayLine[x][y].childElementCount === 0) && (arrayLine[x + 1][y].childElementCount > 0)) {
                if(x === 0) {
                    emptyUp(x, y, x);
                    notOK++;
                }

                else if((arrayLine[x - 1][y].childElementCount === 0)&& (arrayLine[x + 1][y].childElementCount > 0)) {
                    if((x - 1) === 0) {
                        let newX = x - 1;
                        emptyUp(x, y, newX);
                        notOK++;
                    }

                    else if((arrayLine[x - 2][y].childElementCount === 0)&& (arrayLine[x + 1][y].childElementCount > 0)) {
                        let newX = x - 2;
                        emptyUp(x, y, newX);
                        notOK++;
                    }

                    else {
                        let newX = x - 1;
                        emptyUp(x, y, newX);
                        notOK++;
                    }
                }

                else {
                    emptyUp(x, y, x);
                    notOK++;
                }
            }
        }
    }

    for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 4; y++) {
            if((arrayLine[x][y].childElementCount > 0) && (arrayLine[x + 1][y].childElementCount > 0)) {
                if(arrayLine[x][y].lastElementChild.innerHTML === arrayLine[x + 1][y].lastElementChild.innerHTML) {
                    arrayLine[x][y].lastElementChild.innerHTML =
                        ((parseFloat(arrayLine[x][y].lastElementChild.innerHTML)) +
                        (parseFloat(arrayLine[x + 1][y].lastElementChild.innerHTML))).toString();
                    arrayLine[x + 1][y].removeChild(arrayLine[x + 1][y].lastElementChild);
                    arrayLine[x + 1][y].classList.remove("notEmpty");
                    notOK++;
                    scoreT.innerHTML =  ((parseFloat(scoreT.innerHTML)) + (parseFloat(arrayLine[x][y].lastElementChild.innerHTML))).toString();
                    color(arrayLine[x][y].lastElementChild);
                    win(arrayLine[x][y].lastElementChild);
                }
            }
        }
    }

    if(notOK > 0) {
        newNumber();
    }

    else if(notOK === 0){
        return 0
    }
}

/**
 * Function for check the different cases for move down
 */
function checkDown() {
    let notOK = 0;
    for(let x = 3; x > 0; x--) {
        for(let y = 0; y < 4; y++) {
            if((arrayLine[x][y].childElementCount === 0) && (arrayLine[x - 1][y].childElementCount > 0)) {
                if(x === 3) {
                    emptyDown(x, y, x);
                    notOK++;
                }

                else if((arrayLine[x + 1][y].childElementCount === 0)&& (arrayLine[x - 1][y].childElementCount > 0)) {
                    if((x + 1) === 3) {
                        let newX = x + 1;
                        emptyDown(x, y, newX);
                        notOK++;
                    }

                    else if((arrayLine[x + 2][y].childElementCount === 0)&& (arrayLine[x - 1][y].childElementCount > 0)) {
                        let newX = x + 2;
                        emptyDown(x, y, newX);
                        notOK++;
                    }

                    else {
                        let newX = x + 1;
                        emptyDown(x, y, newX);
                        notOK++;
                    }
                }

                else {
                    emptyDown(x, y, x);
                    notOK++;
                }
            }
        }
    }

    for(let x = 3; x > 0; x--) {
        for(let y = 0; y < 4; y++) {
            if((arrayLine[x][y].childElementCount > 0) && (arrayLine[x - 1][y].childElementCount > 0)) {
                if(arrayLine[x][y].lastElementChild.innerHTML === arrayLine[x - 1][y].lastElementChild.innerHTML) {
                    arrayLine[x][y].lastElementChild.innerHTML =
                        ((parseFloat(arrayLine[x][y].lastElementChild.innerHTML)) +
                            (parseFloat(arrayLine[x - 1][y].lastElementChild.innerHTML))).toString();
                    arrayLine[x - 1][y].removeChild(arrayLine[x - 1][y].lastElementChild);
                    arrayLine[x - 1][y].classList.remove("notEmpty");
                    notOK++;
                    scoreT.innerHTML =  ((parseFloat(scoreT.innerHTML)) + (parseFloat(arrayLine[x][y].lastElementChild.innerHTML))).toString();
                    color(arrayLine[x][y].lastElementChild);
                    win(arrayLine[x][y].lastElementChild);
                }
            }
        }
    }

    if(notOK > 0) {
        newNumber();
    }

    else if(notOK === 0){
        return 0
    }
}

/**
 * Function for check the different cases for move left
 */
function checkLeft() {
    let notOK = 0;
    for(let x = 0; x < 4; x++) {
        for(let y = 0; y < 3; y++) {
            if((arrayLine[x][y].childElementCount === 0) && (arrayLine[x][y + 1].childElementCount > 0)) {
                if(y === 0) {
                    emptyLeft(x, y, y);
                    notOK++;
                }

                else if((arrayLine[x][y - 1].childElementCount === 0)&& (arrayLine[x][y + 1].childElementCount > 0)) {
                    if((y - 1) === 0) {
                        let newY = y - 1;
                        emptyLeft(x, y, newY);
                        notOK++;
                    }

                    else if((arrayLine[x][y - 2].childElementCount === 0)&& (arrayLine[x][y + 1].childElementCount > 0)) {
                        let newY = y - 2;
                        emptyLeft(x, y, newY);
                        notOK++;
                    }

                    else {
                        let newY = y - 1;
                        emptyLeft(x, y, newY);
                        notOK++;
                    }
                }

                else {
                    emptyLeft(x, y, y);
                    notOK++;
                }
            }
        }
    }

    for(let x = 0; x < 4; x++) {
        for(let y = 0; y < 3; y++) {
            if((arrayLine[x][y].childElementCount > 0) && (arrayLine[x][y + 1].childElementCount > 0)) {
                if(arrayLine[x][y].lastElementChild.innerHTML === arrayLine[x][y + 1].lastElementChild.innerHTML) {
                    arrayLine[x][y].lastElementChild.innerHTML =
                        ((parseFloat(arrayLine[x][y].lastElementChild.innerHTML)) +
                            (parseFloat(arrayLine[x][y + 1].lastElementChild.innerHTML))).toString();
                    arrayLine[x][y + 1].removeChild(arrayLine[x][y + 1].lastElementChild);
                    arrayLine[x][y + 1].classList.remove("notEmpty");
                    notOK++;
                    scoreT.innerHTML =  ((parseFloat(scoreT.innerHTML)) + (parseFloat(arrayLine[x][y].lastElementChild.innerHTML))).toString();
                    color(arrayLine[x][y].lastElementChild);
                    win(arrayLine[x][y].lastElementChild);
                }
            }
        }
    }

    if(notOK > 0) {
        newNumber();
    }

    else if(notOK === 0){
        return 0
    }
}

/**
 * Function for check the different cases for move right
 */
function checkRight() {
    let notOK = 0;
    for(let x = 0; x < 4; x++) {
        for(let y = 3; y > 0; y--) {
            if((arrayLine[x][y].childElementCount === 0) && (arrayLine[x][y - 1].childElementCount > 0)) {
                if(y === 3) {
                    emptyRight(x, y, y);
                    notOK++;
                }

                else if((arrayLine[x][y + 1].childElementCount === 0)&& (arrayLine[x][y - 1].childElementCount > 0)) {
                    if((y + 1) === 3) {
                        let newY = y + 1;
                        emptyRight(x, y, newY);
                        notOK++;
                    }

                    else if((arrayLine[x][y + 2].childElementCount === 0)&& (arrayLine[x][y - 1].childElementCount > 0)) {
                        let newY = y + 2;
                        emptyRight(x, y, newY);
                        notOK++;
                    }

                    else {
                        let newY = y + 1;
                        emptyRight(x, y, newY);
                        notOK++;
                    }
                }

                else {
                    emptyRight(x, y, y);
                    notOK++;
                }
            }
        }
    }

    for(let x = 0; x < 4; x++) {
        for(let y = 3; y > 0; y--) {
            if((arrayLine[x][y].childElementCount > 0) && (arrayLine[x][y - 1].childElementCount > 0)) {
                if(arrayLine[x][y].lastElementChild.innerHTML === arrayLine[x][y - 1].lastElementChild.innerHTML) {
                    arrayLine[x][y].lastElementChild.innerHTML =
                        ((parseFloat(arrayLine[x][y].lastElementChild.innerHTML)) +
                            (parseFloat(arrayLine[x][y - 1].lastElementChild.innerHTML))).toString();
                    arrayLine[x][y - 1].removeChild(arrayLine[x][y - 1].lastElementChild);
                    arrayLine[x][y - 1].classList.remove("notEmpty");
                    notOK++;
                    scoreT.innerHTML =  ((parseFloat(scoreT.innerHTML)) + (parseFloat(arrayLine[x][y].lastElementChild.innerHTML))).toString();
                    color(arrayLine[x][y].lastElementChild);
                    win(arrayLine[x][y].lastElementChild);
                }
            }
        }
    }

    if(notOK > 0) {
        newNumber();
    }

    else if(notOK === 0){
        return 0
    }
}

/**
 * Function for creat and delete the transfers cases for move up
 * @param x
 * @param y
 * @param newX
 */
function emptyUp(x, y, newX) {
    let div = creat(arrayLine[newX][y].id);
    div.innerHTML = arrayLine[x + 1][y].lastElementChild.innerHTML;
    arrayLine[x + 1][y].removeChild(arrayLine[x + 1][y].lastElementChild);
    arrayLine[x + 1][y].classList.remove("notEmpty");
    color(div);
}

/**
 * Function for creat and delete the transfers cases for move down
 * @param x
 * @param y
 * @param newX
 */
function emptyDown(x, y, newX) {
    let div = creat(arrayLine[newX][y].id);
    div.innerHTML = arrayLine[x - 1][y].lastElementChild.innerHTML;
    arrayLine[x - 1][y].removeChild(arrayLine[x - 1][y].lastElementChild);
    arrayLine[x - 1][y].classList.remove("notEmpty");
    color(div);
}

/**
 * Function for creat and delete the transfers cases for move down
 * @param x
 * @param y
 * @param newY
 */
function emptyLeft(x, y, newY) {
    let div = creat(arrayLine[x][newY].id);
    div.innerHTML = arrayLine[x][y + 1].lastElementChild.innerHTML;
    arrayLine[x][y + 1].removeChild(arrayLine[x][y + 1].lastElementChild);
    arrayLine[x][y + 1].classList.remove("notEmpty");
    color(div);
}

/**
 * Function for creat and delete the transfers cases for move right
 * @param x
 * @param y
 * @param newY
 */
function emptyRight(x, y, newY) {
    let div = creat(arrayLine[x][newY].id);
    div.innerHTML = arrayLine[x][y - 1].lastElementChild.innerHTML;
    arrayLine[x][y - 1].removeChild(arrayLine[x][y - 1].lastElementChild);
    arrayLine[x][y - 1].classList.remove("notEmpty");
    color(div);
}

/**
 * Function for choice the color compared the number
 * @param div
 * @returns {string}
 */
function color(div) {
    switch (div.innerHTML) {
        case "2":
            div.style.backgroundColor = "#d6c0b2";
            break;

        case "4":
            div.style.backgroundColor = "#e3b573";
            break;

        case "8":
            div.style.backgroundColor = "#d2971a";
            break;

        case "16":
            div.style.backgroundColor = "#e3d22d";
            break;

        case "32":
            div.style.backgroundColor = "#f5715f";
            break;

        case "64":
            div.style.backgroundColor = "#ffc8a5";
            div.style.color = "#831414";
            break;

        case "128":
            div.style.backgroundColor = "#ffc663";
            div.style.color = "#831414";
            break;

        case "256":
            div.style.backgroundColor = "#f1a708";
            div.style.color = "#831414";
            break;

        case "512":
            div.style.backgroundColor = "#f8e50f";
            div.style.color = "#831414";
            break;

        case "1024":
            div.style.backgroundColor = "#ff5643";
            div.style.color = "#831414";
            break;
    }
}

/**
 * Function for check the win condition
 * @param div
 */
function win(div) {
    if(div.innerHTML === "2048") {
        for(let x = 0; x < arrayLine.length; x++) {
            document.getElementsByClassName("line")[x].style.display = "none";
        }

        result.innerHTML = "Bravo, vous avez réussi!!!";
        result.style.display = "flex";
    }
}
/**
 * Function for check the loose condition
 */
function loose() {
    let looseUp = 0;
    let looseDown = 0;
    let looseLeft = 0;
    let looseRight = 0;

    if(checkUp() === 0) {
        looseUp++;
    }

    else if(looseUp === 1) {
        looseUp--;
    }

    if(checkDown() === 0) {
        looseDown++;
    }

    else if(looseDown === 1) {
        looseDown--;
    }

    if(checkLeft() === 0) {
        looseLeft++;
    }

    else if(looseLeft === 1) {
        looseLeft--;
    }

    if(checkRight() === 0) {
        looseRight++;
    }

    else if(looseRight === 1) {
        looseRight--;
    }

    if((looseUp === 1) && (looseDown === 1) && (looseLeft === 1) && (looseRight === 1)) {
        for(let x = 0; x < arrayLine.length; x++) {
            document.getElementsByClassName("line")[x].style.display = "none";
        }

        result.innerHTML = "Dommage, vous avez perdu!!!";
        result.style.display = "flex";
    }
}
