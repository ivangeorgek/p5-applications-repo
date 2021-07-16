var stepSize = 20;
var noiseScale = 0.01;

function setup() {
  createCanvas(500, 500);

}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();

}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
  // your code here

  noStroke();

  var colourBlue = color(0, 0, 255);
  var colourGreen = color(0, 255, 0);

  for (var i = 0; i < 25; i++) {
    for (var j = 0; j < 25; j++) {
      push();

      var _noiseValue = noise((i + (mouseX / 100)) * noiseScale,
        (j + (mouseX / 100)) * noiseScale,
        (frameCount / 60));
      console.log(_noiseValue);
      fill(lerpColor(colourBlue, colourGreen, _noiseValue));
      rect(0 + i * stepSize, 0 + j * stepSize, stepSize, stepSize);

      pop();
    }
  }

}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
  // your code here

  for (var i = 0; i < 25; i++) {
    for (var j = 0; j < 25; j++) {
      push();
      strokeWeight(2);


      var _noiseValue = noise((i + (mouseX / 100)) * noiseScale,
        (j + (mouseX / 100)) * noiseScale,
        (frameCount / 600));

      //Changes length with noise
      var lineLength = map(_noiseValue, 0, 1, 0, stepSize);
      //Changes rotation with noise
      var lineRotation = map(_noiseValue, 0, 1, 0, 720);
      //Changes color with noise
      var _colour = map(_noiseValue, 0, 1, 0, 255);

      stroke(_colour, 0, 0);
      translate(stepSize / 2 + i * stepSize, stepSize / 2 + j * stepSize);
      rotate(lineRotation);
      line(0, 0, 0, -lineLength);

      pop();
    }
  }
}
