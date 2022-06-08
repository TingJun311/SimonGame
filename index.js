
const buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
];

let gamePattern = [];
let userClickedPattern = [];
let gameStatus = false; // To track game status
let level = 0 

$(document).ready( function () {
    $(document).keypress( function () {
        if (!gameStatus) {
            gameStatus = true;
            console.log(gamePattern);
            console.log(userClickedPattern);
            // Start the game once key was pressed
            nextSequence();
        }
    });
});


$("div.btn").click( function (e) {
    let userChosenColor = e.currentTarget.id; // Get the id by HTML object
    userClickedPattern.push(userChosenColor); //Get what user have click 
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // Get index
});

function nextSequence() {
    // This function allow game random number and increase the level
    // Set generated number animation  
    level++;
    $("#level-title").text(`Level ${level}`);
    userClickedPattern = []; //Empty user pattern
    let rand = Math.random();
    let randomNumber = Math.floor((rand *= (3 + 1))); // Randomized
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); // Set the default game pattern to compare later on
    $(`#${randomChosenColor}`).fadeOut().fadeIn();
};

function playSound(name) {
    // This function will trigger sound if called
    var sounds = new Audio(`./sounds/${name}.mp3`);
    sounds.play();    
}

function animatePress(currentColor) {
    // This function will trigger animation by adding class attr and removing it
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel) {
    // This function its to check whether user click the correct sequence or not
    // Since all the value will be correct then we only increase the level
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // If user click the wrong sequence alert them then reset the game
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    // This function allows the game start over 
    // It reset everything
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStatus = false;
}

