var paddle = {
  image : new Image(),
  height : 20,
  width  : 150
};

var paddleHalf = false;

paddle.image.src = "images/paddle.png";

paddle.x = (canvas.width - paddle.width)/2;

function drawPaddle(){
  context.drawImage(paddle.image, paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
}

/*
function drawPaddle(){
  context.beginPath();
  context.shadowColor = "#EDB32B";
  context.shadowBlur = 15;
  context.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
  context.fillStyle = "#0095DD";
  context.fill();
  context.shadowColor = null;
  context.shadowBlur = null;
  context.closePath();
}
*/
