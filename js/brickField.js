var brickRowCount = 8;
    brickColumnCount = 14,
    brickWidth = 55,
    brickHeight = 20,
    brickPadding = 2,
    brickOffsetTop = 135,
    brickOffsetLeft = 2,
    bricksRemoved = 0 ;

var renderParticles = false;
var every100 = 0;

var image = {
  yellow : new Image(),
  orange : new Image(),
  blue   : new Image(),
  green  : new Image()
};

image['orange'].src = "images/orange.png";
image['yellow'].src = "images/yellow.png";
image['blue'].src = "images/blue.png";
image['green'].src = "images/green.png";

var rowColor = {
  yellow : "#FFFF00",
  orange :"#FFA500",
  blue   :"#0095DD",
  green : "#3EA055"
};

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = {
                    x: 0,
                    y: 0,
                    status: 1,
                    topRow: false
                  };

        if(r === 0){
          bricks[c][r].topRow = true;
        }
    }
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            //context.beginPath();

            if(r < 2){
              context.drawImage(image['green'], brickX, brickY, brickWidth, brickHeight);
              //context.rect(brickX, brickY, brickWidth, brickHeight);
              //context.fillStyle = rowColor['green'];
              bricks[c][r].color = rowColor['green'];
            }
            else if(r < 4){
              context.drawImage(image['blue'], brickX, brickY, brickWidth, brickHeight);
              //context.rect(brickX, brickY, brickWidth, brickHeight);
              //context.fillStyle = rowColor['blue'];
              bricks[c][r].color = rowColor['blue'];
            }
            else if(r < 6){
              context.drawImage(image['orange'], brickX, brickY, brickWidth, brickHeight);
              //context.rect(brickX, brickY, brickWidth, brickHeight);
              //context.fillStyle = rowColor['orange'];
              bricks[c][r].color = rowColor['orange'];

            }
            else if(r < 8){
              context.drawImage(image['yellow'], brickX, brickY, brickWidth, brickHeight);
              //context.rect(brickX, brickY, brickWidth, brickHeight);
              //context.fillStyle = rowColor['yellow'];
              bricks[c][r].color = rowColor['yellow'];

            }
            //context.fill();
            //context.closePath();

          }
        }
    }
}

function detectCollision(){
  for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var brick = bricks[c][r];

        var rowDone = 0,
            brickRow = [];

        for(var col=0; col<brickColumnCount; col++) {
          brickRow.push(bricks[col][r]);
        }

        if(brick.status === 1){

            if((balls[0].posX > brick.x) && (balls[0].posX < brick.x + brickWidth) && (balls[0].posY > brick.y) && (balls[0].posY < brick.y + brickHeight) ){

                    dy = -dy;

                    renderParticles = true;
                    console.log("Particles is 1 " + renderParticles);
                    particlesFire = ParticleSystem( {
                      image : 'images/fire.png',
                      center: {x: brick.x + brickWidth/2, y: brick.y + brickHeight/2},
                      speed: {mean: 50, stdev: 25},
                      lifetime: {mean: 2, stdev: 1}
                    }, graphics);


                    collision.play();
                    bricksRemoved += 1;

                    if(brick.color === rowColor['yellow']){
                      score = score + 1;
                      every100 += 1;
                    }else if(brick.color === rowColor['orange']){
                      score = score + 2;
                      every100 += 2;
                    }else if(brick.color === rowColor['blue']){
                      score = score + 3;
                      every100 += 3;
                    }else if(brick.color === rowColor['green']){
                      score = score + 5;
                      every100 += 5;
                    }

                    if(brick.color === rowColor['green'] && !paddleHalf && brick.topRow){
                        paddleHalf = true;
                        paddle.width = paddle.width/2;
                    }

                    brick.status = 0;

                    for(var col=0; col<brickColumnCount; col++){
                        if(brickRow[col].status === 0){
                            rowDone += 1;
                        };
                    }

                    if(rowDone === 14){
                      score = score + 25;
                      every100 += 25;
                      console.log("+25");
                    }

                    rowDone = 0;
                    brickRow = [];

                    console.log("score:" + score);
                    console.log("every100:" + every100);

                    if(every100 >= 100 && every100<126 &&  balls.length === 1){
                      balls[1] = Object.create(ball);
                      balls[1].radius = 10;
                      balls[1].color = "#ffaa00";
                      balls[1].posX  = canvas.width/2,
                      balls[1].posY  = canvas.height-100,
                      console.log("score is 100");
                      every100 = 0;
                    }

                    if(bricksRemoved === 4){
                      dx = 4;
                      dy = -4;
                    }else if(bricksRemoved === 6){
                      dx = 4.5;
                      dy = -4.5;
                    }else if(bricksRemoved === 8){
                      dx = 5;
                      dy = -5;
                    }else if(bricksRemoved === 12){
                      dx = 6;
                      dy = -6;
                    }else if(bricksRemoved === 24){
                      dx = 7;
                      dy = -7;
                    }else if(bricksRemoved === 36){
                      dx = 8;
                      dy = -8;
                    }else if(bricksRemoved === 62){
                      dx = 10;
                      dy = -10;
                    }

                    if(score === 508){
                      alert("You have won the breakout");
                      newGame();
                    }
            }

            if(balls[1] !== undefined){
              if((balls[1].posX > brick.x) && (balls[1].posX < brick.x + brickWidth) && (balls[1].posY > brick.y) && (balls[1].posY < brick.y + brickHeight) ){

                      dy2 = -dy2;

                      particlesFire = ParticleSystem( {
                        image : 'images/fire.png',
                        center: {x: brick.x + brickWidth/2, y: brick.y + brickHeight/2},
                        speed: {mean: 50, stdev: 25},
                        lifetime: {mean: 2, stdev: 1}
                      }, graphics);

                      collision.play();
                      bricksRemoved += 1;
                      if(brick.color === rowColor['yellow']){
                        score = score + 1;
                        every100 += 1;
                      }else if(brick.color === rowColor['orange']){
                        score = score + 2;
                        every100 += 2;
                      }else if(brick.color === rowColor['blue']){
                        score = score + 3;
                        every100 += 3;
                      }else if(brick.color === rowColor['green']){
                        score = score + 5;
                        every100 += 5;
                      }

                      if(brick.color === rowColor['green'] && !paddleHalf && brick.topRow){
                          paddleHalf = true;
                          paddle.width = paddle.width/2;
                      }

                      brick.status = 0;

                      for(var col=0; col<brickColumnCount; col++){
                          if(brickRow[col].status === 0){
                              rowDone += 1;
                          };
                      }

                      if(rowDone === 14){
                        score = score + 25;
                        every100 += 25;
                        console.log("+25");
                      }

                      rowDone = 0;
                      brickRow = [];

                      if(score === 508){
                        alert("You have won the breakout");
                        newGame();
                      }
              }
            }
        }
      }
  }
}
