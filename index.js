
const buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
];

let gamePattern = [];
let gameStatus = false;
let userClickedPattern = [];
let level = 0;

$(document).ready( function () {
    $(document).keypress( function () {
        if (!gameStatus) {
            console.log(gamePattern);
            console.log(userClickedPattern);
            nextSequence();
            gameStatus = true;
        }
    });
});

$("div.btn").click( function (e) {
    let userChosenColor = e.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // Get index
});
function nextSequence() {
    level++;
    $("#level-title").text(`Level ${level}`);
    userClickedPattern = [];
    let rand = Math.random();
    let randomNumber = Math.floor((rand *= (3 + 1)));
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut().fadeIn();
};

function playSound(name) {
    var sounds = new Audio(`./sounds/${name}.mp3`);
    sounds.play();    
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
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
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStatus = false;
}

