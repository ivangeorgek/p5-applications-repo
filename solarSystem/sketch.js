var speed;

function setup() {
    createCanvas(1200, 900);
}

function draw() {
    background(0);
    speed = frameCount;
    push();
    translate(width / 2, height / 2);

    rotate(radians(speed / 3));
    celestialObj(color(255, 150, 0), 200); // SUN

    push(); //Earth
    translate(300, 300);
    rotate(radians(speed));
    celestialObj(color(135, 206, 235), 80);
    
        push(); //Moon
        translate(100, 100);
        rotate(radians(- speed * 2))
        celestialObj(color(255), 30); 

            push(); //asteroid around the moon
            translate(25, 25);
            rotate(radians (speed))
            celestialObj(color(100), 20);
            pop();

        pop();

    pop();
}

function celestialObj(c, size) {
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size / 2, 0);
}
