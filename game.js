var gamePattern = [];
var userClickedPattern = []
var l = 0

var colors = ["blue", "green", "red", "yellow"]

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = colors[randomNumber];
  gamePattern.push(randomChosenColor);
  setTimeout(function(){$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  if (randomChosenColor === "green") {
    soundGreen()
  }
  if (randomChosenColor === "yellow") {
    soundYellow()
  }
  if (randomChosenColor === "blue") {
    soundBlue()
  }
  if (randomChosenColor === "red") {
    soundRed()
  }},500);
  $("h1").html("Level " + l);
  l++;
  userClickedPattern = []
};

//Sound functions

function soundBlue() {
  var audio = new Audio("sounds/blue.mp3");
  audio.play();
};

function soundRed() {
  var audio = new Audio("sounds/red.mp3");
  audio.play();
};

function soundYellow() {
  var audio = new Audio("sounds/yellow.mp3");
  audio.play();
};

function soundGreen() {
  var audio = new Audio("sounds/green.mp3");
  audio.play();
};

function soundWrong() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
};

// press A to start the game

document.addEventListener("keypress", checkKey);

function checkKey(key) {
  if (key.keyCode === 97) {
    $(".btn").removeClass("over");
    userClickedPattern = [];
    gamePattern = [];
    l = 0;
    $("h1").html("Level " + l);
    $("h2").css("display", "none")
    nextSequence();
  }
}

// Game over

function gameOver() {
  $(".btn").addClass("over");
  soundWrong();
  $("h1").html("Game over. Press A to start");
  $("h2").css("display", "inline")
  $("h2").html("You reached level " + (l-1));
}

// Clicked detection

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
});
$("#green").click(soundGreen);
$("#red").click(soundRed);
$("#yellow").click(soundYellow);
$("#blue").click(soundBlue);

// Game Logic
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
   } else {console.log("wrong");gameOver()}
  }
