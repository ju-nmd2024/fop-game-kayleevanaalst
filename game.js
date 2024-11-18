let lander;    
let gravity = 0.1;   
let thrust = -1.5;
let speed = 0;       
let acceleration = 0.1;  
let deacceleration = 0.98; 
let maxSpeed = 5;  
let groundLevel;  
let landerWidth = 50;
let landerHeight = 80;

let state = "Start";  

function setup() {
  createCanvas(600, 450);
  background(187, 236, 240);
  groundLevel = height - 50;  

  lander = new Lander(width / 2, 100, 0, 0);  
}

function draw() {
  if (state === "Start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "You died!") {
    resultScreen();
  }
}

function gameScreen() {
  background(187, 236, 240);

  // Grass
  fill(87, 166, 57);
  rect(0, groundLevel, width, 50);

  fill (255,255,255);
      // Cloud 1
      ellipse(100, 100, 120, 60);
      ellipse(140, 80, 120, 60);
      ellipse(180, 100, 120, 60);
      
      // Cloud 2
      ellipse(350, 150, 140, 70);
      ellipse(400, 130, 120, 60);
      ellipse(450, 150, 130, 70);
      
      // Cloud 3
      ellipse(500, 60, 100, 50);
      ellipse(550, 50, 120, 60);
      ellipse(580, 60, 100, 50);



  // Landar movement
  lander.update();
  lander.display();

  if (keyIsDown(32)) {  
    lander.applyThrust();
  }

  if (lander.y >= groundLevel - landerHeight / 2) {
    if (abs(lander.speed) > 2) {  
      state = "You died!"; 
    } else {
      state = "You died!";
    }
  }
}

function startScreen() {
  background(187, 236, 240);

  fill(240, 202, 199);
  rect(230, 195, 150, 70);
  
  textSize(40);
  fill(18, 43, 128);
  text("Start", 263, 244); 
  
  fill(255, 255, 255, 200); 
  noStroke();
    // Cloud 1
    ellipse(100, 100, 120, 60);
    ellipse(140, 80, 120, 60);
    ellipse(180, 100, 120, 60);
    
    // Cloud 2
    ellipse(350, 150, 140, 70);
    ellipse(400, 130, 120, 60);
    ellipse(450, 150, 130, 70);
    
    // Cloud 3
    ellipse(500, 60, 100, 50);
    ellipse(550, 50, 120, 60);
    ellipse(580, 60, 100, 50);
    
      // Cloud 4 (
      ellipse(100, 350, 120, 60);
      ellipse(140, 340, 120, 60);
      ellipse(180, 350, 120, 60);
    
      // Cloud 5 
      ellipse(350, 380, 140, 70);
      ellipse(400, 360, 120, 60);
      ellipse(450, 380, 130, 70);
    
      // Cloud 6
      ellipse(500, 300, 100, 50);
      ellipse(550, 290, 120, 60);
      ellipse(580, 300, 100, 50);
    
      ellipse(50, 250, 100, 50);
      ellipse(10, 230, 120, 60);
}

function resultScreen() {
  background(125, 16, 9);

  textSize(30);
  fill(255, 255, 255);
  text("You died!", 240, 350);
  textSize (20);
  fill (255,255,255);
  text ("Click to restart", 240,380);

  fill(255, 222, 173);
  noStroke();

  // Emoji
  ellipse(300, 200, 200, 200);

  // Eyes (white)
  fill(255);
  ellipse(250, 160, 40, 40); // Left eye
  ellipse(350, 160, 40, 40); // Right eye

  // Pupils (black)
  fill(0);
  ellipse(250, 160, 20, 20); // Left pupil
  ellipse(350, 160, 20, 20); // Right pupil

  // Mouth
  noFill();
  stroke(0); 
  strokeWeight(4);
  arc(300, 250, 120, 100, PI, TWO_PI);
}

function keyPressed() {
  if (keyCode === 32 && state === "game") {
    lander.applyThrust(); 
  }
}

// Lander
class Lander {
  constructor(x, y, speed, acceleration) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.acceleration = acceleration;
    this.width = landerWidth;
    this.height = landerHeight;
  }

  update() {
    this.speed += gravity;
    this.y += this.speed;

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 2;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 2;
    }

    this.x = constrain(this.x, 0, width);
  }

  applyThrust() {
    if (this.speed > -maxSpeed) {  
      this.speed += thrust;  
    }
  }

  display() {
    push();
    noStroke();
    fill(200, 0, 0);
    ellipse(this.x, this.y, this.width, this.height); // Lander 
    fill(255);
    triangle(this.x - 10, this.y + 40, this.x + 10, this.y + 40, this.x, this.y + 60); 

    //windows
    fill(255); 
    ellipse(this.x + 1, this.y - 10, 20, 20); 
    ellipse(this.x + 1, this.y + 15, 15, 15);
    
    fill(255, 100, 0); 
    ellipse(this.x - 20, this.y + this.height / 2, 10, 20); // Left exhaust
    ellipse(this.x + 20, this.y + this.height / 2, 10, 20); // Right exhaust

    // Legs 
    fill(255); 
    triangle(
      this.x - 10, this.y + this.height / 2, 
      this.x + 10, this.y + this.height / 2, 
      this.x, this.y + this.height / 1.5 
    );

    pop();
  }
}

function mouseClicked() {
  if (state === "Start") {
    state = "game"; 
  } else if (state === "game") {
    state = "You died!"; 
  } else if (state === "You died!") {
    state = "game"; 
    lander = new Lander(width / 2, 100, 0, 0); 
  }
}
