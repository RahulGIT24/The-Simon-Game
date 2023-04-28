// Defining variables
let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Starting game by pressing any key, but only if started is false 
$(document).keypress(function () {
    if (!started) {
        nextSequence();
        $("#level-title").text(`Level ${level}`)
        started = true;
    }
})

// This function generates random number and fetch random colors from array, It increments level when user gave right answer
function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.random(0, 3);
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    $("#level-title").text("Level " + level);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    return randomNumber;
}

// This function check answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success")
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

// Helps in playing sound
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`)
    audio.play();
}

// When a button is clicked it fetches it's id and push it in userClickedPattern
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

// Whenever a button will press it adds pressed class to it and remove after 100 milliseconds
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// This function starts the game again when user give wrong answer
function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}