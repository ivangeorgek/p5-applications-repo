////////////////////////////////////////////////////////////////
function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround() {
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
  push();
  // your code here
  fill(255);
  drawVertices(propeller.vertices);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird() {
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95
  });
  Body.setMass(bird, bird.mass * 10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds() {
  push();
  //your code here
  fill(200,0,0);
  for (var i = 0; i < birds.length; i++) {

    drawVertices(birds[i].vertices);
    //Condition to remove birds if Off Screen
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i])
      birds.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
  //you code here
  for (var i = 0; i < 6; i++) {     //Levels
    for (var j = 0; j < 3; j++) {   //Boxes per levels
      var box = Bodies.rectangle(
        700 + j * 80,
        i * 80,
        80, 80, {
          friction: 0.01,
          restitution: 0.95
      })
      World.add(engine.world, [box]);
      boxes.push(box);

      //generates random green tones
      var green = random(100, 255)
      colors.push(green)
    }
  }
}


////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push();
  //your code here
  for (var i = 0; i < boxes.length; i++) {
    fill(0, colors[i], 0);

    drawVertices(boxes[i].vertices);
    //Condition to remove boxes if Off Screen
    if (isOffScreen(boxes[i])) {
      removeFromWorld(boxes[i])
      boxes.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
  //your code here
  slingshotBird = Bodies.circle(100, 100, 20, { //Change mouseX and mouseY
    friction: 0,
    restitution: 0.95
  });

  Body.setMass(slingshotBird, slingshotBird.mass * 10);

  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 100 }, 
    bodyB: slingshotBird,          //Check lecture to see what pointB is
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    damping: 0.001
  });

  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
  push();
  // your code here

  fill(200,0,0);
  drawVertices(slingshotBird.vertices);
  fill(128);
  drawConstraint(slingshotConstraint);
  pop();

}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
