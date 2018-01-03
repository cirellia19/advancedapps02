//vars
var bird;
var pipes = [];
var b = 700
var e = 600
var f = 500
var g = 300
var t = 400


function setup() {
  createCanvas(400,600);
  bird = new Bird();
  pipes.push(new Pipe());
  
  //music
  new Audio('https://www.bensound.com/royalty-free-music?download=summer').play()
}

function draw() {
  //background
  background(0, 208, 244);
  b = b - 1  
  f = f - 1.5
  g = g - 2
  t = t - .75
  e = e - .5
  
  
  //cloud 1
  fill(255)
  noStroke()
  ellipse(this.b ,60,40,40)
  ellipse(this.b - 15,60,35,30)
  ellipse(this.b + 15,60,35,30)

 //cloud 2
  ellipse(this.f +100 ,100,40,40)
  ellipse(this.f + 85,100,35,30)
  ellipse(this.f + 115,100,35,30)

  //cloud 3
  ellipse(this.g - 100,10,40,40)
  ellipse(this.g - 115,10,35,30)
  ellipse(this.g - 85,10,35,30)
  
  //cloud 4
  ellipse(this.t ,150,40,40)
  ellipse(this.t - 15,150,35,30)
  ellipse(this.t + 15,150,35,30)
  
  if( t < -140){
    t = 600
  }
   
  if(f < -140){
  f = 600
  }
    
  if(g < -140){
  g = 700
  
  if(b < -140){
  b = 600
  }
  }
  
  //sun
  fill(255,255,0)
  ellipse(this.e - 200,0,150)
  if(e < -120){
  e = 700
  }

  //grass
  fill(41, 155, 53)
  rect(-10,550,420,570)
  
  //dirt
  fill(61, 39, 39)
  rect(-10,570,420,600)
  

  //when pipe hits bird
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
      fill(255,255,0);
      textSize(75);
      text("Try Again",50,250);
      document.location.reload()
    }
    
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  
//displays bird and pipes 
  bird.update();
  bird.show();
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
  var s = second();
  fill(255)
  textSize(20)
  text("Current second: \n" + s, 5, 20);
}
 
//makes bird move
function mousePressed() {
  if (bird.up()) {  
  }
  
}

//flappybird
function Bird() {
  this.y = height/2;
  this.x = 64;
  
//moving measurments
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  //draws the bird
  this.show = function() {
    
    //beak
    fill(103,114,94)
    triangle(this.x + 75,this.y +0,this.x + 21,this.y +22,this.x + 20,this.y - 19)
    
    fill(200,200,0);
    ellipse(this.x, this.y, 75, 75);
    
    //eye
    fill(0)
    ellipse(this.x + 10,this.y - 20,20,20)
    fill(0,145,148)
    ellipse(this.x + 10,this.y - 20,7,7)
    
    //wing
    if (mouseIsPressed === true) {
      fill(120)
      triangle(this.x+10, this.y,this.x-20, this.y,this.x-5, this.y-20);
    } else {
      fill(120)
      triangle(this.x+10, this.y,this.x-20, this.y,this.x-5, this.y+20);
  }
    


  }

  //bird move
  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}
//pipes
function Pipe() {
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20;
  this.speed = 2;

//bird hits the pipes(dies)
  this.highlight = false;
  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  //pipe measurments 
  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  //movement spreed
  this.update = function() {
    this.x -= this.speed;
  }

  //offscreen pipes
  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
