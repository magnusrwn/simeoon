var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

//getting number
function nextNumber() {
    var randomNumber = Math.floor(Math.random() * 4);           //getting ran number
    var randomChosenColour =  buttonColours[randomNumber];      //getting a colour from array using the random number
    gamePattern.push(randomChosenColour);                       //pushing that randomly grabbed colour to the "game pattern" array
                                                           
    //animating the bots chosen number
    var chosenButtonId = "#" + randomChosenColour;                          //making the actual id form 
    $(chosenButtonId).fadeOut(100).fadeIn(100);

    //storing the bot-pressed button id to play sound
    playSound(randomChosenColour);

    //stating the level that player is on
    $("h1").html("Level " + level);
    
    //increasing level eachtime this ting runs
    level++;
}

//checking for human clicks on the buttons
$(".btn").on("click", function() {                          //checking for click on ".btn", then when clicked executing the following ghost function
    var userChosenColour = $(this).attr("id");              //creating a variable to store "this" which is the item we clicked - and this.arrt("id") means the id of the item (e.g. "yellow")
    userClickedPattern.push(userChosenColour);              //pushing the chosen colour's id to an array of what the user has clicked    

    //storing the human-pressed button id to play sound
    playSound(userChosenColour);

    //storing the human-pressed button to animate
    animatePress(userChosenColour);
    

    //geting the index of the last .pushed button click for the checkAns 
    var lengthForEnd = userClickedPattern.length;
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
})
//adding a sound to all chosen numbers
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");       //making a new audio sound based of the id given
    audio.play();                                                           //playing that created audio
}

//animating the humans chosen button-press
function animatePress(chosenButton) {
    var chosenButtonId = ("#" + chosenButton);
    var classAnimate = ("pressed-" + chosenButton);

    $(chosenButtonId).addClass(classAnimate);                                      //chaning the style to give a pressed effect
    setTimeout(function() { $(chosenButtonId).removeClass(classAnimate);}, 200);   //setting the timeout of the thing i just did 
}

//checking for any keyboard press ("keydown")
var started = 0;
$("body").on("keydown", function() { 
    started++
    if (started === 1) {
        nextNumber();
    }
   
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var audioWrong = new Audio("./sounds/wrong.mp3"); 
      audioWrong.play();
      $("body").addClass("game-over")
        setTimeout( function () { $("body").removeClass("game-over");}, 200);
        $("h1").html("Game Over, Press Any Key To Restart");

        startOver();
    }

}

function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = 0;
  }
