var counterCanvas = document.getElementById("counterCanvas");
var counterContext = counterCanvas.getContext("2d");

var audio_control = document.getElementById("mute_unmute").src;

var collision = document.getElementById("collision"),
    collisionWall = document.getElementById("wall-collision");


var audioflag = false,
    pause = false,
    wait = true;

var rightPressed = false,
    leftPressed = false;

function mute(){

  if(!(audioflag)){
    document.getElementById("mute_unmute").src = "images/mute.png";
    audioflag = true;
    collision.muted = true;
    collisionWall = true;
  }else{
      document.getElementById("mute_unmute").src = "images/unmute.png";
      audioflag = false;
      collision.muted = false;
      collisionWalll = false;
  }

}

function pauseGame(){
  pause = true;
  document.getElementById("game").style.display = "none";
  document.getElementById("waitScreen").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function playGame(){
  pause = false;
  elapsed = 0;
  document.getElementById("menu").style.display = "none";
  document.getElementById("waitScreen").style.display = "none";
  document.getElementById("game").style.display = "block";
  render(elapsedTime);
}

function startGame(){
  document.getElementById("game").style.display = "block";
  document.getElementById("waitScreen").style.display = "none";
  wait = false;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e){
  if(e.keyCode === 39){
    rightPressed = true;
  }

  if(e.keyCode === 37){
    leftPressed = true;
  }

  if(e.keyCode === 27 && !pause){
    pauseGame();
  }else if(e.keyCode === 27 && pause){
    playGame();
  }

}

function keyUpHandler(e){
  if(e.keyCode === 39){
    rightPressed = false;
  }

  if(e.keyCode === 37){
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var pos = getMousePos(e),
      posx = pos.x,
      posy = pos.y;

    if((posx > paddle.width - 5) && (posx < canvas.width + 5)) {
        paddle.x = posx - paddle.width;
    }
}

function getMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

function clearCounterCanvas(){
  counterContext.clearRect(0, 0, counterCanvas.width, counterCanvas.height);
}
