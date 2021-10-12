var confLocs = [];
var confTheta = [];

let slider;

function setup() {
    createCanvas(900, 800, WEBGL);
    angleMode(DEGREES);
    

    for (var i = 0; i < 200; i++) {
        confLocs.push(createVector(
            random(-500, 500),
            random(-800, 0),
            random(-500, 500)));

        confTheta.push(random(0, 360));
    }


    slider_boxHeight = createSlider(0, 100);
    slider_sinSpeed = createSlider(0, 100);
    slider_boxHeight.position(10, 10);
    slider_sinSpeed.position(10, 30);
    
    slider_boxHeight.style('width', '200px');
    slider_sinSpeed.style('width', '200px');
  

}

function draw() {
    background(125);

    //Step 2
    normalMaterial();
    stroke(0);
    strokeWeight(2);


    //Step 4 + further -> Camera moving continously 
    var camXLoc = cos(frameCount) * height
    var camZLoc = sin(frameCount + slider_sinSpeed.value()) * height //Speed of sine wave changed by slider
    camera(camXLoc, -600, camZLoc, 0, 0, 0, 0, 1, 0);

    //Step 1 -> Create a grid of boxes
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            push();

            translate(-400 + (50 * i), 0, -400 + (50 * j));
            //Light sources for boxes
            pointLight(255, 255, 255, camXLoc, -600, camZLoc);
            //Makes the boxes specular material
            specularMaterial(255,255,0);

            //step 3 -> distance controls the distance of box from the center
            var distance = dist(0, 0, 0, -400 + (50 * i), 0, -400 + (50 * j));
            //Step 3 + futher-> lenght controls the height of the box with slider
            var length = map(sin(distance + frameCount + slider_boxHeight.value()), -1, 1, 100, 300);

            box(50, length);
            pop();
        }
    }


    confetti();


}

function confetti() {
    for (var i = 0; i < confLocs.length; i++) {
        
        push();
        noStroke();
        rotate(confTheta[i] );
        translate(confLocs[i].x, confLocs[i].y , confLocs[i].z);

        plane(15, 15);

        // Incrementing rotation and position
        confTheta[i] += 10;
        confLocs[i].y += 1;

        //Resetting cofetti if it has reached the edge
        if (confLocs[i].y > 0 ) {
            confLocs[i].y = -800;
        }

        if(confTheta[i] === 360) {
            confTheta[i] = 0;
        }
        
        pop();
    }
}
