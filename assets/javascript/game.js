var guessedWord;
var foundLetters;
var pressedLetters = "";
var wins = 0;
var losses = 0;
var attemptsLeft = 10;

function getDisplayText(letters) {
    var text = " ";
    for (i = 0; i < letters.length; i++) {
        text += " " + letters[i];
    }

    return text;
}

function startGame() {
    if (document.getElementById("startButton").innerHTML == "Start Game") {
        var words = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming"];
        var text = "";
        var idx = Math.floor(Math.random() * words.length);

        guessedWord = words[idx];
        foundLetters = new Array(guessedWord.length)
        pressedLetters = "";
        attemptsLeft = 10;

        for (i = 0; i < guessedWord.length; i++) {
            foundLetters[i] = '_';
        }

        // start new game was pressed

        // rename button to Give Up
        document.getElementById("startButton").innerHTML = "Give Up";
        document.getElementById("hiddenWord").innerHTML = getDisplayText(foundLetters);
        document.getElementById("lettersPressed").innerHTML = pressedLetters;
        document.getElementById("attemptsLeft").innerHTML = attemptsLeft;
        document.getElementById("body").addEventListener("keypress", letterPressed);
    } else {
        // give up was pressed

        // rename button to Start Game
        document.getElementById("startButton").innerHTML = "Start Game";

        // remove listener
        document.getElementById("body").removeEventListener("keypress", letterPressed);

        // increase the losses
        losses++;

        document.getElementById("hiddenWord").innerHTML = "";
        document.getElementById("lettersPressed").innerHTML = "";
    }

    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;

}

function alreadyPressed(key) {
    for (i = 0; i < pressedLetters.length; i++) {
        if (pressedLetters.charAt(i) == key) {
            return true;
        }
    }

    return false;
}

function alreadySolved() {
    var solved = true;

    for (i = 0; i < foundLetters.length; i++) {
        if (foundLetters[i] == "_") solved = false;
    }

    return solved;
}

function notAllowedKey(key) {
    return !(key >= 'a' && key <= 'z'); 
}

function letterPressed(event) {
    var pressedKey = event.key;

    if (
        notAllowedKey(pressedKey) ||
        alreadyPressed(pressedKey) ||
        alreadySolved() ||
        attemptsLeft == 0
    ) return;

    pressedLetters += pressedKey;

    var found = false;

    for (i = 0; i < guessedWord.length; i++) {
        if (guessedWord.charAt(i) == pressedKey) {
            foundLetters[i] = pressedKey;
            found = true;
        }
    }

    if (!found) {
        attemptsLeft--;
        document.getElementById("attemptsLeft").innerHTML = attemptsLeft;

        if (attemptsLeft == 0) {
            losses++;
            document.getElementById("losses").innerHTML = losses;
            document.getElementById("startButton").innerHTML = "Start Game";
            alert("You lost!");    
        }
    }

    if (alreadySolved()) {
        wins++;
        document.getElementById("startButton").innerHTML = "Start Game";
        document.getElementById("wins").innerHTML = wins;
        alert("You win!");
    }

    document.getElementById("hiddenWord").innerHTML = getDisplayText(foundLetters);
    document.getElementById("lettersPressed").innerHTML = pressedLetters;
}