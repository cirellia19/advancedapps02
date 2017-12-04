//variables
var a, s, d;

function setup() { 
  createCanvas(800,800)
	background(100);
	frameRate(1000)
	
	//pick random color
	a = random(255)
	s = random(255)
	d = random(255)
} 

function draw() { 
}

function mouseWheel() {
	background(a,s,d);
}

function mouseDragged() {
	
	//Draw a ellipse
	strokeWeight(4)
	stroke(a,s,d)
	fill(a,s,d,154)
	ellipse(mouseX,mouseY,35,55)
}

//when moused is pressed
function mousePressed() {
	
	//color picker
	a = random(255)
	s = random(255)
	d = random(255)
}
