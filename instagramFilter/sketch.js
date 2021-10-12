// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
  }
  /////////////////////////////////////////////////////////////////
  function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
    pixelDensity(1);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  toggleFilter = sepiaFilter;
  resultImg = toggleFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}
function keyPressed() {
  loop();
  if(toggleFilter == sepiaFilter) {
    toggleFilter = invertFilter
  } else {
    toggleFilter = sepiaFilter
  }
  loop();
}
function sepiaFilter(img) {
  var imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var oldRed = img.pixels[index + 0];
          var oldGreen = img.pixels[index + 1];
          var oldBlue = img.pixels[index + 2];

          var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189);
          var newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168);
          var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131);

          imgOut.pixels[index + 0] = newRed;
          imgOut.pixels[index + 1] = newGreen;
          imgOut.pixels[index + 2] = newBlue;
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

//******************************************************************//
function darkCorners(img) {
  var imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  var centerX = floor(img.width /2); 
  var centerY = floor(img.height /2);
  let maxDist = dist(0, 0, centerX, centerY);

  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {
      
      var index = (x + y * imgOut.width) * 4;
      
      index = constrain(index, 0, img.pixels.length - 1);
      
      var oldRed = img.pixels[index + 0];
      var oldGreen = img.pixels[index + 1];
      var oldBlue = img.pixels[index + 2];
      
      var newRed, newBlue, newGreen;
      var dynLum;

        let pixelDist = dist(x, y, centerX, centerY);

        if(pixelDist < 300) {
          dynLum = 1;
        }

        if(300 < pixelDist < 450) {
          dynLum = map(pixelDist, 300, 450, 1, 0.4);
        }
        
        if(pixelDist > 450) {
          dynLum = map(pixelDist, 450, maxDist, 0.4, 0);
        }
        
        newRed = constrain(oldRed * dynLum, 0, 255);
        newGreen = constrain(oldGreen * dynLum, 0, 255);
        newBlue = constrain(oldBlue * dynLum, 0, 255);

        imgOut.pixels[index + 0] = newRed;
        imgOut.pixels[index + 1] = newGreen;
        imgOut.pixels[index + 2] = newBlue;
        imgOut.pixels[index + 3] = 255;
  
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

//**************************************************************//
function radialBlurFilter(img) {
  var imgOut = createImage(img.width, img.height);

  var matrixSize = matrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          //distance of pixel from mouse mapped to 0, 1 
          var dynBlur = constrain( map( dist(mouseX, mouseY, x, y), 100, 300, 0, 1 ), 0, 1);

          var r = img.pixels[index + 0];

          var c = convolution(x, y, matrix, matrixSize, img);

          imgOut.pixels[index + 0] = c[0]*dynBlur + r*(1-dynBlur);
          imgOut.pixels[index + 1] = c[1];
          imgOut.pixels[index + 2] = c[2];
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0.0;
  var totalGreen = 0.0;
  var totalBlue = 0.0;
  var offset = floor(matrixSize / 2);

  // convolution matrix loop
  for (var i = 0; i < matrixSize; i++) {
      for (var j = 0; j < matrixSize; j++) {
          // Get pixel loc within convolution matrix
          var xloc = x + i - offset;
          var yloc = y + j - offset;
          var index = (xloc + img.width * yloc) * 4;
          // ensure we don't address a pixel that doesn't exist
          index = constrain(index, 0, img.pixels.length - 1);

          // multiply all values with the mask and sum up
          totalRed += img.pixels[index + 0] * matrix[i][j];
          totalGreen += img.pixels[index + 1] * matrix[i][j];
          totalBlue += img.pixels[index + 2] * matrix[i][j];
      }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue];
}

//*************************************************************************** */

function borderFilter(img) {
  var buffer = createGraphics(img.width, img.height);
  buffer.image(img, 0, 0);
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(20);
  buffer.rect(0, 0, img.width, img.height, 40);
  buffer.rect(0,0, 20, 20);
  buffer.rect(img.width,0, 20, 20);
  buffer.rect(img.width,img.height, 20, 20);
  buffer.rect(0,img.height, 20, 20);
  img.updatePixels();
  return buffer;
}


function invertFilter(img) {
  var imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var oldRed = img.pixels[index + 0];
          var oldGreen = img.pixels[index + 1];
          var oldBlue = img.pixels[index + 2];

          var newRed = 255 - img.pixels[index + 0] ;
          var newGreen = 255 - img.pixels[index + 1];
          var newBlue = 255 - img.pixels[index + 2];

          imgOut.pixels[index + 0] = newRed;
          imgOut.pixels[index + 1] = newGreen;
          imgOut.pixels[index + 2] = newBlue;
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

