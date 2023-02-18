var numGroundSprites;
var player;
var obstacleSprites;

var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var GRAVITY = 0.3;
var JUMP = -5;

var isGameOver;
var score;

var playerImage; // Declare a variable to hold the player image
var backgroundImage;
var groundImage;
var upperPipeImage;
var lowerPipeImage;

function preload() {
  playerImage = loadImage('flappybird.png'); // Load the player image
  backgroundImage = loadImage('flappybackground.png');
  groundImage = loadImage('flappyground.png');
  upperPipeImage = loadImage('upperpipe.png');
  lowerPipeImage = loadImage('lowerpipe.png');
}

function setup() {
  isGameOver = false;
  score = 0;

  createCanvas(500, 500);
  background(backgroundImage);
  groundSprites = new Group();
  obstacleSprites = new Group();

  numGroundSprites = width / GROUND_SPRITE_WIDTH + 1;
  for (var n = 0; n < numGroundSprites; n++) {
    var groundSprite = createSprite(
      n * 50,
      height - 25,
      GROUND_SPRITE_WIDTH,
      GROUND_SPRITE_HEIGHT
    )
    groundImage.resize(GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
    groundSprite.addImage(groundImage);
    groundSprites.add(groundSprite);
  }

  player = createSprite(100, height - 75, 50, 50);
  playerImage.resize(60, 40);
  player.addImage(playerImage);
}

function draw() {
  if (isGameOver) {
    background(0);
    fill(255);
    textAlign(CENTER);
    text('Your score was: ' + score, camera.position.x,
        camera.position.y - 20);
    text('Game Over! Click anywhere to restart',
        camera.position.x, camera.position.y);
  } else {
    background(backgroundImage);
    player.velocity.y += GRAVITY;

  if (groundSprites.overlap(player)) {
    player.velocity.y = 0
    player.position.y = height - 50 - player.height / 2
  }

  if (keyDown(UP_ARROW)) {
    player.velocity.y = JUMP;
  }

  player.position.x = player.position.x + 5;
  camera.position.x = player.position.x + width / 4;
  var firstGroundSprite = groundSprites[0];
  if (
  firstGroundSprite.position.x <=
  camera.position.x - (width / 2 + firstGroundSprite.width / 2)
) {
    groundSprites.remove(firstGroundSprite)
    firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites * firstGroundSprite.width
    groundSprites.add(firstGroundSprite)
  }

  // Generates obstacles
  if (frameCount % 60 === 0) {
    var gap = random(100, 500); // the height of the gap
    var obstacle1 = createSprite(camera.position.x + width, 50, 30, gap);
    var obstacle2 = createSprite(camera.position.x + width, height - 50, 30, height - gap);

    upperPipeImage.resize(60, 300);
    lowerPipeImage.resize(60, 300);

    obstacle1.shapeColor = "green";
    obstacle2.shapeColor = "green";
    // obstacle1.addImage(upperPipeImage);
    // obstacle2.addImage(lowerPipeImage);

    obstacle1.depth = 0;
    obstacle2.depth = 0;

    obstacleSprites.add(obstacle1);
    obstacleSprites.add(obstacle2);
  }

  var firstObstacle = obstacleSprites[0]
  if (obstacleSprites.length > 0 && firstObstacle.position.x <=       camera.position.x - (width / 2 + firstObstacle.width / 2)) {
        removeSprite(firstObstacle)
  }

  obstacleSprites.overlap(player, endGame);
  drawSprites();

  // check if player has passed an obstacle
for (var i = 0; i < obstacleSprites.length; i++) {
  var obstacle = obstacleSprites.get(i);
  if (obstacle.position.x < player.position.x && obstacle.passed !== true) {
    obstacle.passed = true; // set a flag to indicate that the obstacle has been passed
    score += 0.5; // increase the score
  }
}

  textAlign(CENTER);
  text(score, camera.position.x, 10);
  }
}

function endGame() {
  isGameOver = true;
}

function mouseClicked() {
  if (isGameOver) {
    for (var n = 0; n < numGroundSprites; n++) {
      var groundSprite = groundSprites[n];
      groundSprite.position.x = n * 50;
    }

    player.position.x = 100;
    player.position.y = height - 75;

    obstacleSprites.removeSprites();

    score = 0;
    isGameOver = false;
  }
}

