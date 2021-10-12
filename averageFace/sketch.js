var imgs = [];
var avgImg;
var numOfImages = 30;

var randomImage;
var vectorRand;
var vectorAvg;


//////////////////////////////////////////////////////////
function preload() { 
    //Loads images into imgs array
    for(var i =0; i < numOfImages; i++) {
        var img = loadImage(`assets/${i}.jpg`);
        imgs.push(img);
    }
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgs[0].width * 2, imgs[0].height);
    pixelDensity(1);

    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    randomImage = imgs[0];
    noLoop();
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(randomImage, 0, 0);

    avgImg.loadPixels();
    //Load pixels
    for(var i=0; i < imgs.length; i++) {
        imgs[i].loadPixels();
    }

    
    for (var x = 0; x < imgs[0].width; x++) {
        for (var y = 0; y < imgs[0].height; y++) {   
            
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;

            for(var i=0; i < imgs.length; i++) {
                var index = (x + y * imgs[0].width) * 4;

                sumR += imgs[i].pixels[index + 0];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
            }
            
            //Average of sums is passed into avgImg graphics
            avgImg.pixels[index + 0] = sumR / imgs.length;
            avgImg.pixels[index + 1] = sumG / imgs.length;
            avgImg.pixels[index + 2] = sumB / imgs.length;
            avgImg.pixels[index + 3] = 255;

            
            //Vector that stores the avgImg RGB
            vectorAvg = createVector(avgImg.pixels[index + 0], 
                avgImg.pixels[index + 0], 
                avgImg.pixels[index + 0]);
                
            //Vector that stores the randomImage RGB
            vectorRand = createVector(randomImage.pixels[index + 0], 
            randomImage.pixels[index + 1], 
            randomImage.pixels[index + 2]);

            //lerp to transition between randomImage and avgImage
            vectorAvg = p5.Vector.lerp(vectorRand, vectorAvg, lerpAmount);

            //avgImg is updated to lerp vector value
            avgImg.pixels[index + 0] = vectorAvg.x;
            avgImg.pixels[index + 1] = vectorAvg.y;
            avgImg.pixels[index + 2] = vectorAvg.z;
            avgImg.pixels[index + 3] = 255;

        }
    }
 
    avgImg.updatePixels();
    image(avgImg, avgImg.width, 0); 
}

/*************************************************************/
//new random face selected when key pressed
function keyPressed() {
    randomImage = imgs[int(random(0, 29))]; 
    loop();
}

//Updates the lerpAmount when mouse moved
function mouseMoved() {  
    lerpAmount = constrain(mouseX / imgs[0].width, 0, 1);
    loop();   
}
