
// new array with the colors on the website

var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userPattern = [];

var gameStarted = false;
var level = 0;

//jQuery when a keypress happens and check whether the game already started or not
$(document).keypress(function(){
  if(!gameStarted){
    $("#level-title").text("Level "+ level);
    newSequence();
    gameStarted= true;
  }
});


// new function for random numbers and for gamePattern
function newSequence(){

  userPattern = [];
  level++;

  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //how to "flash" animate the buttons + Audio
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor)


  return gamePattern;
}

// Function to store the patterns the user clicked on
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatedPress(userChosenColor);
  console.log(userPattern);
  checkAnswer(userPattern.length-1);
})

//created a function to play corresponding sound to colors function called in CLICK EVENTLISTENER
function playSound(name){
  var audio = new Audio ("sounds/"+name+".mp3");
  audio.play();
}

//created a new function to create a border and bg-color to the pressed button called in CLICK EVENTLISTENER
function animatedPress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
};

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userPattern[currentLevel]){
    console.log("success");

  if(userPattern.length === gamePattern.length){
    setTimeout(function(){
      newSequence()
    },100);
  }
}else{
  console.log("false");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game over, press any key to start again!");
  startOver();
}
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}


//alert("JS working");
