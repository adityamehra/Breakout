var then = performance.now(),
    now,
    elapsedTime,
    elapsed = 0,
    countdown = 0,
    particle = false,
    livesImage = new Image();


livesImage.src = "images/lives.png";

function gameLoop(timeStamp){

  window.requestAnimationFrame(gameLoop);
  now = timeStamp;
  elapsedTime = now - then;
  then = now;
  if(pause === false && wait === false){
    update(elapsedTime);
    render(elapsedTime);
  }
}

function update(elapsedTime){
    //console.log("Inside Update...");
    particlesFire.update(elapsedTime);
		//
		// Generate some new particles
		particlesFire.create();
}

function render(elapsedTime){

  elapsed += elapsedTime;

      clearCanvas();
      if(elapsed >= 5000){

            clearCounterCanvas();
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            detectCollision();
            detectCollisionWithWalls();

            balls[0].posX += dx;
            balls[0].posY += dy;

            if(balls[1] !== undefined){
              balls[1].posX += dx2;
              balls[1].posY += dy2;
            }
            particlesFire.render(elapsedTime);
          }else{
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            drawCountdown(elapsed);
          }
}


function newGame(){

  addValue(score);

  clearCanvas();

  if(balls.length === 2){
    balls.splice(1, 1);
  }

  balls[0].posX = canvas.width/2;
  balls[0].posY = canvas.height-100;
  bricksRemoved = 0;
  dx = 3;
  dy = -3;
  paddle.x = (canvas.width - paddle.width)/2;
  score = 0;
  document.location.reload();
}

function clearCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  //particlesFire.clear();
}

function drawScore() {
    context.font = "24px fantasy";
    context.fillStyle = "#1A98FE";
    context.fillText("Score: "+score, 5, 30);
}

function drawCountdown(elapsed) {
    if(elapsed < 1000){
      counterContext.fillStyle = "#1A98FE";
      counterContext.font = "70px fantasy";
      counterContext.fillText("Get Ready in...", 200, 400);
    }else if(elapsed >= 1000 && elapsed < 2000){
      clearCounterCanvas();
      counterContext.fillStyle = "#48fb47";
      counterContext.font = "200px fantasy";
      counterContext.fillText("3", 400, 400);
    }else if(elapsed >= 2000 && elapsed < 3000){
      clearCounterCanvas();
      counterContext.fillStyle = "#48fb47";
      counterContext.font = "200px fantasy";
      counterContext.fillText("2", 400, 400);
    }else if(elapsed >= 3000){
      clearCounterCanvas();
      counterContext.fillStyle = "#48fb47";
      counterContext.font = "200px fantasy";
      counterContext.fillText("1", 400, 400);
    }
}

function drawLives(){
  if(lives === 3){
    context.drawImage(livesImage, canvas.width - 40, 15, 30, 15);
    context.drawImage(livesImage, canvas.width - 80, 15, 30, 15);
    context.drawImage(livesImage, canvas.width - 120, 15, 30, 15);
  }else if(lives === 2){
    context.drawImage(livesImage, canvas.width - 40, 15, 30, 15);
    context.drawImage(livesImage, canvas.width - 80, 15, 30, 15);
  }else if(lives === 1){
    context.drawImage(livesImage, canvas.width - 40, 15, 30, 15);
  }
  context.font = "24px fantasy";
  context.fillStyle = "#1A98FE";
  context.fillText("Lives: ", canvas.width-185, 30);
}

var graphics = (function(){
	'use strict';

	//------------------------------------------------------------------
	//
	// Place a 'clear' function on the Canvas prototype, this makes it a part
	// of the canvas, rather than making a function that calls and does it.
	//
	//------------------------------------------------------------------
	CanvasRenderingContext2D.prototype.clear = function() {
		this.save();
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.clearRect(0, 0, canvas.width, canvas.height);
		this.restore();
	};

	//------------------------------------------------------------------
	//
	// Expose a 'clear' method for the canvas.
	//
	//------------------------------------------------------------------
	function clear() {
		context.clear();
	}

	//------------------------------------------------------------------
	//
	// Expose an ability to draw an image/texture on the canvas.
	//
	//------------------------------------------------------------------
	function drawImage(spec) {
		context.save();

		context.translate(spec.center.x, spec.center.y);
		context.rotate(spec.rotation);
		context.translate(-spec.center.x, -spec.center.y);

		context.drawImage(
			spec.image,
			spec.center.x - spec.size/2,
			spec.center.y - spec.size/2,
			spec.size, spec.size);

		context.restore();
	}
	return {
		clear : clear,
		drawImage : drawImage
	};
}());

var particlesFire = ParticleSystem( {
  image : 'images/fire.png',
  center: {x: canvas.width/2, y: canvas.height/2},
  speed: {mean: 50, stdev: 25},
  lifetime: {mean: 3, stdev: 1}
}, null);

window.requestAnimationFrame(gameLoop);
