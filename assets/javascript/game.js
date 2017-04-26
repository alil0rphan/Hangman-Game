// Variables that are used, sets up score and loses categories
var words, picList, blank, wrongGuess, guessRemain, currentWord, score = 0, loses = 0, wordPic, audioWin, audioLoss;

setUp();
// Sets up inital game status/ round reset basically
function setUp() {

var words = ["trump", "america", "freedom", "liberty", "justice", "flag", "eagle", "equality", "capitalism", "love", "constitution", "independence"];
    picList = ["assets/images/trump.jpg", "assets/images/america-2.jpg", "assets/images/freedom.jpg", "assets/images/liberty.jpg", "assets/images/justice.jpg", "assets/images/flag.jpg", "assets/images/eagle.jpg", "assets/images/equality.png", "assets/images/capitalism.jpg", "assets/images/love.jpg", "assets/images/constitution.jpg", "assets/images/independence.jpg"];
    ranNum = Math.floor(Math.random() * words.length);
    currentWord = words[ranNum];
    wordPic = picList[ranNum];
    wrongGuess = [];
    guessRemain = 10;
    blank = "";
    audioWin = new Audio("assets/sounds/djwin.mp3");
    audioLoss = new Audio("assets/sounds/madworldloss.mp3");
for (var i = 0; i < currentWord.length; i++) {
    // Establishes blanks for letters
        blank += "_" + "";
    }
};
document.onkeyup = function(event) {
// Establishes events on key stroke
    var userGuess = event.key;
    document.getElementById("blanks").textContent = blank;
    document.getElementById("wrongGuesses").textContent = wrongGuess;
    document.getElementById("status").textContent = "Current Word:";
    document.getElementById("completion").textContent = "";
// Checks if guess was accurate
    checkGuess(userGuess);
    function checkGuess(userGuess) {
        if (currentWord.indexOf(userGuess) > -1) {
            for (var i = 0; i < currentWord.length; i++) { 
                if (currentWord[i] === userGuess) {
                    // Shows user guess with displayLtrAt function
                    displayLtrAt(userGuess, i);
                    roundOver ();
             }
        }
        // If the guess is wrong it is pushed down into the wrongGuess text area
        } else if (wrongGuess.indexOf(userGuess) === -1) {
            wrongGuess.push(userGuess);
            wrongGuess = wrongGuess.sort();
            document.getElementById("wrongGuesses").textContent = wrongGuess;
            // Subtracts 1 remaining guess
            guessRemain--;
            document.getElementById("remain").textContent = guessRemain;
            roundOver ();
        } 
    }
};
// Puts the user guess in where a blank would be
function displayLtrAt(letter, index) {
    var letterGuess = "";
    for (var i = 0; i < blank.length; i++) 
        if (i === index) {
            letterGuess += letter;
        } else {
            letterGuess += blank[i];
        }
    // Changes guess to upper case
    blank = letterGuess.toUpperCase();

        document.getElementById("blanks").textContent = blank;
    };
// When a round ends
function roundOver () {
// Out of gueesses
    if (guessRemain === 0) {
        document.getElementById("picChange").src = ("assets/images/pepe-lost.jpg");
        document.getElementById("status").textContent = "You lose! The word was:";
        // Plays losing clip
        audioLoss.play();
        document.getElementById("blanks").textContent = currentWord.toUpperCase();
        document.getElementById("completion").textContent = "Press Any Key to Try Again";
        loses++;
        document.getElementById("loses").textContent = loses;
        setUp ();

    }
// Guessed the word correctly
    else if (blank.indexOf("_") === -1 && guessRemain != 0) {
        document.getElementById("status").textContent = "You win! The word was";
        // Plays winning clip
        audioWin.play();
        document.getElementById("completion").textContent = "Press Any Key to Restart";
        document.getElementById("picChange").src = wordPic;
        score++;
        document.getElementById("score").textContent = score;
        setUp();
    } 
};

