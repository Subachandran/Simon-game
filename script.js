var gamePattern = [];
var userClickedPattern = [];
var levelNum = 0;
var executed = false;
var buttonColors = ["red", "blue", "green", "yellow"];

// * Generate next sequence in game pattern randomly
function nextSequence() {
  if (!executed) {
    userClickedPattern = [];
    levelNum += 1;

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`)
      .delay(500)
      .fadeOut(150)
      .fadeIn(150);
    if (levelNum) {
      $("h1").text("Level " + levelNum);
    } else {
      $("#level-title").text("Press A Key to Start");
    }
  }
  executed = true;

  var music = new Audio("sounds/" + randomChosenColor + ".mp3");
  music.play();
}

// * Start game from level 0
function gameStarter() {
  gamePattern = [];
  levelNum = 0;
  $("body").one("keydown", function () {
    nextSequence();
  });
}

// * Animate button when pressed
function animatePress(elementName, className) {
  elementName.addClass(className);
  setTimeout(function () {
    elementName.removeClass(className);
  }, 100);
}

// * Show level number
if (levelNum === 0) {
  $("#level-title").text = "Press A Key to Start";
  gameStarter();
} else {
  $("#level-title").text = `Level ${levelNum}`;
}

// * Verify pattern when button is clicked
$(".btn").click(function () {
  activeBtn = $(this);
  userChosenColor = activeBtn.attr("id");
  userClickedPattern.push(userChosenColor);
  let indOfInput = userClickedPattern.length - 1;

  if (gamePattern[indOfInput] === userClickedPattern[indOfInput]) {
    executed = false;
    var music = new Audio(`sounds/${userChosenColor}.mp3`);
    animatePress(activeBtn, "pressed");
  } else {
    var music = new Audio("sounds/wrong.mp3");
    animatePress($(`body, #${this.id}`), "game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    executed = false;
    gameStarter();
  }
  music.play();

  if (gamePattern.length === userClickedPattern.length) {
    nextSequence();
  }
});
