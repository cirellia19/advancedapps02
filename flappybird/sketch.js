//var
var bird;

//object(pipes)
var pipes = [];

function setup() {
  createCanvas(400, 600);
  
  //class
  bird = new Bird();
  
  //object
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  //pipes(draw)
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    //hit
    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }

    //offreen pipes
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  //flappybird(draw)
  bird.update();
  bird.show();
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
	
}

//move
function mousePressed() {
  if (bird.up()) {
    //console.log("SPACE");
  }
}

//flappybird(class)
function Bird() {
  this.y = height/2;
  this.x = 64;

  //flappybird movements measurments 
  this.gravity = 0.7;
  this.lift = -15;
  this.velocity = 0;

  //display flappybird
  this.show = function() {
    
    //body
    fill(255,255,0);
    ellipse(this.x, this.y, 32, 32);
    
    //beak
    fill(255,255,0);
    triangle(this.x,this.y+15,this.x,this.y-15,this.x+25,this.y)
    
    //eye
    noStroke();
    fill(0)
    ellipse(this.x+5, this.y-8, 10, 10);  
  }

  
  //flappybird move1
  this.up = function() {
    this.velocity += this.lift;
  }

  //flappybird move2
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

//pipes(object)
function Pipe() {
  
  //pipe measurments
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20;
  this.speed = 2;

  //when bird hits pipe1
  this.highlight = false;

  //when bird hits pipe2
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

  //show pipes
  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  //pipe movement
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