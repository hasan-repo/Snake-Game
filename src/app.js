const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snakeSpeed = 5;
let tileCont = 20;
let tileSize = canvas.width / tileCont - 2;
let headX = 10;
let headY = 10;
let tailLength = 2;
let foodX = 5;
let foodY = 5;
let inputsXVelocity = 0;
let inputsYVelocity = 0;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
const snakeBody = [];

const gulpSound = new Audio("/src/gulp.mp3");

class SnakePos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//json file
fetch("/game-intro.json")
    .then(reponse => reponse.json())
    .then(data =>{
      console.log(data.sentence)
      document.querySelector("#g").innerText = data.sentence
    })

//game loop
function drwGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();
  let result = gOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  dScore();

 //speed increase
  if (score > 5) {
    snakeSpeed = 9;
  }
  if (score > 10) {
    snakeSpeed = 11;
  }

  setTimeout(drwGame, 1000 / snakeSpeed);
}

function gOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //game walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCont) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCont) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  ///gameover function
  if (gameOver) { 
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";

      // gameover massage with gradient

      let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " red");
      gradient.addColorStop("1.0", "yellow");
  
      ctx.fillStyle = gradient;

      ctx.fillText("Game Over:(", canvas.width / 6.5, canvas.height / 2);

    }
    ctx.fillText("Game Over:(", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

//score count


function clearScreen() {
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}
//snake size
function drawSnake() {
  ctx.fillStyle = "black";
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    ctx.fillRect(part.x * tileCont, part.y * tileCont, tileSize, tileSize);
  }

  snakeBody.push(new SnakePos(headX, headY)); 
  while (snakeBody.length > tailLength) {
    snakeBody.shift(); 
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCont, headY * tileCont, tileSize, tileSize);
}

function dScore() {
  ctx.fillStyle = "orange";
  ctx.font = "15px Arial";
  ctx.fillText("Score " + score, canvas.width - 60, 20);
}


//snake food(apple)
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX * tileCont, foodY * tileCont, tileSize, tileSize);
}

function checkAppleCollision() {
  if (foodX === headX && foodY == headY) {
    foodX = Math.floor(Math.random() * tileCont);
    foodY = Math.floor(Math.random() * tileCont);
    tailLength++;
    score++;
    gulpSound.play();
  }
}

document.body.addEventListener("keydown", keyDown);

//use keybors up,down,left,right keys
function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down
  if (event.keyCode == 40) {
    
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //left
  if (event.keyCode == 37) {
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right
  if (event.keyCode == 39) {
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

drwGame();
