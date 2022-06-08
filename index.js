
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

let gamePattern = [];

function nextSequence(range) {
    let rand = Math.random();
    return Math.floor((rand *= (range + 1)));
}

function getRandomColor () {
    const randomNumber = nextSequence(3);
    gamePattern.push(colors[randomNumber]);
    return colors[randomNumber];
}

function objSounds (paths, event) {
    this.paths = paths;
    this.event = event;
    this.playSounds = function () {
        let audio = new Audio(this.paths);
        audio.play();
    };
};

var newObj = new objSounds("./sounds/blue.mp3", "hi");

newObj.playSounds();

console.log(getRandomColor());

$(document).ready(function () {
    let color = gamePattern.pop();
    $(`#${color}`).fadeOut(function () {
        const audio = new Audio(`./sounds/blue.mp3`);
        audio.play();
    }).fadeIn()
})
