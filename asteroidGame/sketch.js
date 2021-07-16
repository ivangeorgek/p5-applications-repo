var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

var mouseCheck;
var mouseCheckSize;

//Keeps track of how many asteroids are destroyed
var points = 0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200, 800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width / 2, height * 2.9);
  atmosphereSize = width * 3;
  earthLoc = new createVector(width / 2, height * 3.1);
  earthSize = width * 3;

  //iv
  mouse_Check = new createVector(0, 0);
  mouseCheckSize = 100;
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  // function that checks collision between various elements
  checkCollisions(spaceship, asteroids); 

  // function that shows the points - no. of asteroids destroyed
  drawPoints(points);
}

function drawPoints(p) {
  push();
  textSize(15);
  noStroke();
  fill(0, 255, 0);
  text('Points : ' + p, 10, 30);
  pop();
}



//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
  noStroke();
  //draw atmosphere
  fill(0, 0, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize, atmosphereSize);
  //draw earth
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize, earthSize);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {

  //spaceship-2-asteroid collisions
  for (var i = 0; i < asteroids.locations.length; i++) {
    if (isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])) {
      gameOver();
    }
  }

  //asteroid-2-earth collisions
  for (var i = 0; i < asteroids.locations.length; i++) {
    if (isInside(earthLoc, earthSize, asteroids.locations[i], asteroids.diams[i])) {
      gameOver();
    }
  }

  //spaceship-2-earth

  if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize)) {
    gameOver();
  }
  //spaceship-2-atmosphere
  for (var i = 0; i < asteroids.locations.length; i++) {
    for(var j = 0; j < spaceship.bulletSys.bullets.length; j++) {
      if (isInside(spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam, asteroids.locations[i], asteroids.diams[i])) {
        asteroids.destroy(i);
        points ++;
      }
    }
  }


  //bullet collisions
  if (isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize)) {
    spaceship.setNearEarth();
  }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
  // YOUR CODE HERE (3-5 lines approx)
  if (locA.dist(locB) <= (sizeA + sizeB) / 2) {
    return true;
  }
  return false;
}

//////////////////////////////////////////////////
function keyPressed() {
  if (keyIsPressed && keyCode === 32) { // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
  push();
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
  pop();
}
