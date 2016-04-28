var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var score = 0,
    lives = 3;

var dx = 3;
var dy = -3;

var dx2 =  4.5;
var dy2 = -4.5;

var ball = {
  radius : 10,
  color  : "#fff",
  posX   : canvas.width/2,
  posY   : canvas.height-30,
  },
  balls = [];

balls[0] = Object.create(ball);

function drawBall(){
    context.beginPath();
    context.shadowColor = "#fff";
    context.shadowBlur = 15;
    context.arc(balls[0].posX, balls[0].posY, balls[0].radius, 0, Math.PI*2);
    context.fillStyle = balls[0].color;
    context.fill();
    context.shadowColor = null;
    context.shadowBlur = null;
    context.closePath();

    if(balls[1] !== undefined){

      context.beginPath();
      context.shadowColor = "#fff";
      context.shadowBlur = 15;
      context.arc(balls[1].posX, balls[1].posY, balls[1].radius, 0, Math.PI*2);
      context.fillStyle = balls[1].color;
      context.fill();
      context.shadowColor = null;
      context.shadowBlur = null;
      context.closePath();

    }

}

function detectCollisionWithWalls(){

    if(balls[0].posX + dx > canvas.width - balls[0].radius || balls[0].posX + dx < balls[0].radius){
      dx = -dx;
      collisionWall.play();
    }

    if(balls[0].posY + dy < balls[0].radius){
      dy = -dy;
      collisionWall.play();
    }else if (balls[0].posY + dy > canvas.height - balls[0].radius - paddle.height) {

      if(balls[0].posX > paddle.x - 10 && balls[0].posX < paddle.x + paddle.width + 10){

        if(balls[0].posX === paddle.x + paddle.width/2){
            dy = -dy ;
            dx = 0;
        }else{
          dy = -dy ;
        }

        collision.play();
      }
      else{
        lives--;
        if(!lives){
          alert("Game Over");
          newGame();
        }else {
                  balls[0].posX = canvas.width/2;
                  balls[0].posY = canvas.height-30;
                  bricksRemoved = 0;
                  dx = 3;
                  dy = -3;
                  paddle.x = (canvas.width-paddle.width)/2;
                  elapsed = 0;

                  if(balls[1] !== undefined){
                    balls.splice(1,1);
                  }
              }
      }
    }

    if(balls[1] !== undefined){

      if(balls[1].posX + dx2 > canvas.width - balls[1].radius || balls[1].posX + dx2 < balls[1].radius){
        dx2 = -dx2;
        collisionWall.play();
      }

      if(balls[1].posY + dy2 < balls[1].radius){
        dy2 = -dy2;
        collisionWall.play();
      }else if (balls[1].posY + dy2 > canvas.height - balls[1].radius - paddle.height) {

        if(balls[1].posX > paddle.x - 10 && balls[1].posX < paddle.x + paddle.width + 10){
          dy2 = -dy2 ;
          collision.play();
        }
        else{
          balls.splice(1,1);
        }
      }
    }

    if(rightPressed && paddle.x < canvas.width - paddle.width){
      paddle.x += 7;
    }

    if(leftPressed && paddle.x > 0){
      paddle.x -= 7;
    }
  }
