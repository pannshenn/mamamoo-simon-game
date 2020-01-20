// generate patternArray randomly, which contains num elements
function makePattern(level) {
  pattern = [];
  for (var i = 0; i < level; i++) {
    var number = Math.random() * 4 + 1;
    number = Math.floor(number);
    switch (number) {
      case 1:
        pattern.push("green");
        break;
      case 2:
        pattern.push("red");
        break;
      case 3:
        pattern.push("yellow");
        break;
      case 4:
        pattern.push("blue");
        break;
    }
  }
  return pattern;
}


// play sound when pass in correct id string
function makeSound(key) {
  switch (key) {
    case "green":
      var green = new Audio("./sounds/solar.mp3");
      green.play();
      break;
    case "blue":
      var blue = new Audio("./sounds/wheein.mp3");
      blue.play();
      break;
    case "red":
      var red = new Audio("./sounds/hwasa.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("./sounds/moonbyul.mp3");
      yellow.play();
      break;
  }
}


// single animtion on a box of a color
// key is the color, such as "green"
function singleAnimation(key) {
  var targetButton = document.querySelector("#" + key);
  if (targetButton != null) {
    targetButton.classList.add("pressed");
    setTimeout(function() {
      targetButton.classList.remove("pressed");
    }, 200);
  }

}

//set delay after each animation
function singleAnimationDelay(key, i) {
  setTimeout(function() {
    singleAnimation(key);
    makeSound(key);
  }, 1000 * i);
}


//animation that shows pattern
function seriesAnimation(pattern) {
  for (var i = 0; i < pattern.length; i++) {
    var key = pattern[i];
    singleAnimationDelay(key, i);
  }
}


var keys = ["green", "red", "yellow", "blue"]

function getUserInput() {
  document.addEventListener("click", function(event) {
    if (inGame) {
      var target = event.path;
      target = target[0].getAttribute("id");
      if (keys.includes(target)) {
        singleAnimation(target);
        makeSound(target);
        userPattern.push(target);
      }

      console.log("userPattern: " + userPattern);
      if (gamePattern.length > 0 && userPattern.toString() === gamePattern.toString()) {
        console.log("passed");
        var nextLevel = level + 1;
        document.querySelector("#level-title").textContent = "You Win, Move to Level " + nextLevel + "!";
        document.querySelector(".control-next").classList.add("win");
        userPattern = [];
        inGame = false;
      } else if (userPattern.length == gamePattern.length && userPattern.toString() !== gamePattern.toString()) {
        document.querySelector("#level-title").textContent = "Oh click to try again..";
        console.log("failed");
        userPattern = [];
        inGame = false;
      }
    }
  });
}



var level = 1;
var gamePattern = [];
var userPattern = [];
var inGame = false;
getUserInput();

document.querySelector(".control-next").addEventListener("click", function() {
  var list = document.querySelector(".control-next").classList;
  if (list.contains("win")) {
    list.remove("win");
    level++;
    document.querySelector("#level-title").textContent = "Level " + level;
    gamePattern = makePattern(level);
    console.log("gamePattern: " + gamePattern);
    seriesAnimation(gamePattern);
  } else {
    document.querySelector("#level-title").textContent = "Level " + level;
    gamePattern = makePattern(level);
    seriesAnimation(gamePattern);
    console.log("start " + gamePattern);
  }
  inGame = true;

});

document.querySelector(".control-stop").addEventListener("click", function() {
  document.querySelector(".control-next").classList.remove("win");
  level = 1;
  gamePattern = [];
  userPattern = [];
  inGame = false;
  document.querySelector("#level-title").textContent = "Mamamoo Simon Game";
});
