
const colors = [
    "red",
    "blue",
    "green",
    "yellow"
];

const soundPaths = [
    "./sounds/blue.mp3",
    "./sounds/green.mp3",
    "./sounds/red.mp3",
    "./sounds/wrong.mp3",
    "./sounds/yellow.mp3"
];

let gameStatus;
let level = 0;

$(document).ready( function () {
    $(document).keypress( function () {
        gameStatus = 1;
        if (gameStatus === 1) {
            simonGame();
        }
    });
});

function simonGame () {
    let gamePattern = [];
    let userChosenColor;
    let userClickPattern = [];

    getRandomColor();
    $("h1").text(`Level ${level}`);
    
    ++level;
    function nextSequence(range) {
        let rand = Math.random();
        return Math.floor((rand *= (range + 1)));
    }
    
    function getRandomColor () {
        const randomNumber = nextSequence(3);
        gamePattern.push(colors[randomNumber]);
    }
    console.log(gamePattern);
    
    function objSounds (paths) {
        this.paths = paths;
        this.playSounds = function () {
            let audio = new Audio(this.paths);
            audio.play();
        };
        this.animatePress = function (event) {
            $(`#${event}`).addClass("pressed");
            setTimeout(() => {
                $(`#${event}`).removeClass("pressed") 
            }, 100);
        }
    };

    $(document).ready(function () {
        let color = gamePattern.pop();
        console.log(color);
        $(`#${color}`).fadeOut().fadeIn();
        $("div.btn").click( function (e) {
            
            // Get the event object id 
            const btnId = e.currentTarget.id;
            var newObj = new objSounds(`./sounds/${btnId}.mp3`);
            newObj.playSounds();
            newObj.animatePress(btnId);
            userChosenColor = btnId;
            userClickPattern.push(btnId);
            simonGame();
            console.log(userClickPattern);
        });
    });
}
