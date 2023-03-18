// setting up necessary variables  
let bg, characterSelection, player, player1, player2, player3, canvas, x = 0, y = 0, score = 0, count = 30, fallingSpeed = 3, scoreGoal = 100;
let speedX, speedY;


let bugs = [], bugsCount = 0, bugFrequency = 0.02;
let bugs2 = [], bugs2Count = 0, bug2Frequency=0;
let skills = [], skillsCount = 0;
let skills2 = [], skills2Count = 0, skill2Frequency =-0.005;
//-0.005;

// sounds 
let skillSound = new Audio('/sounds/skill.mp3');
let youWonSound = new Audio('/sounds/you-won.mp3');
let bugSound = new Audio('/sounds/bug.mp3');
let mainSong = new Audio('/sounds/password-infinity-12327.mp3');
let gameOver = new Audio('/sounds/game-over.mp3');

// mute button
const muteButton = document.getElementById("soundoff-button");
muteButton.onclick = function(){
  if (mainSong.volume === 0) {
    mainSong.volume = 0.2;
    skillSound.volume = 1;
    youWonSound.volume = 1;
    bugSound.volume = 1;
    gameOver.volume = 1;
    muteButton.innerHTML = "Mute";
  } else {
    mainSong.volume = 0;
    skillSound.volume = 0;
    youWonSound.volume = 0;
    bugSound.volume = 0;
    gameOver.volume = 0;
    muteButton.innerHTML = "Unmute";
  }
}

// intro screen and bottom text set up 
const introScreen = document.getElementById("start-page-div");
const screenshottext= document.getElementById("screenshot-text");
screenshottext.style.display="none";
const buttons = document.getElementById("buttons-div");
buttons.style.display="none";

// set up of the 3 character selection buttons 
const player1btn = document.getElementById("player1");
player1btn.onclick = function(){
  player = player1;
  introScreen.style.display = "none";
  buttons.style.display="flex";
  screenshottext.style.display="block";
  canvas.show();
  loop();
  counterInterval = setInterval(counter, 1000);
  // play main song
  mainSong.play();
  mainSong.loop = true;
  mainSong.volume = 0.2;
};

const player2btn = document.getElementById("player2");
player2btn.onclick = function(){
  player = player2;
  introScreen.style.display = "none";
  buttons.style.display="flex";
  screenshottext.style.display="block";
  canvas.show();
  loop();
  counterInterval = setInterval(counter, 1000);
  // play main song
  mainSong.play();
  mainSong.loop = true;
  mainSong.volume = 0.2;
};

const player3btn = document.getElementById("player3");
player3btn.onclick = function(){
  player = player3;
  introScreen.style.display = "none";
  buttons.style.display="flex";
  screenshottext.style.display="block";
  canvas.show();
  loop();
  counterInterval = setInterval(counter, 1000);
  // play main song
  mainSong.play();
  mainSong.loop = true;
  mainSong.volume = 0.2;
};

// new game button 
const newGame = document.getElementById("new-game-button");
newGame.onclick = function(){
  if (player === undefined) 
    {player=player1} 
        introScreen.style.display = "none";
        buttons.style.display="flex";
        screenshottext.style.display="block";
        canvas.show();
        score=0;
        count=30;
        scoreGoal = 100;
        
        fill(255,255,255);
        // reset char position
        x = 0;
        y = 0;
        // reset bugs and skills  
        fallingSpeed = 3;
        bugs = [];
        bugs2 = [];
        skills = [];
        skills2 = [];
        bugsCount = 0;
        bugs2Count = 0;
        skillsCount = 0;
        skills2Count = 0;
        bugFrequency = 0.02;
        bug2Frequency = 0;
        skill2Frequency = -0.005;
        // new counter
        clearInterval(counterInterval);
        counterInterval = setInterval(counter, 1000);
        // restart the loop
        loop();
}

// set up the counter 
let counter = function() {
  count = count - 1; 
  if (count <= 0) {
    clearInterval(counterInterval);
    count = 0;
  }
};

// setup function 
function setup() {
    canvas = createCanvas(1000,601);
    canvas.hide();
    //canvas.show();
    textSize(width/30);
    fill(255,255,255);
    textFont('Andale Mono');
    noLoop();
}

// preload  function 
function preload() {
    bg = loadImage("img/bg-black.jpg");
    player1 = loadImage("img/char1.webp");
    player2 = loadImage("img/char2.webp");
    player3 = loadImage("img/char5.webp");
}

// draw function 
function draw() {
  background(220);
  image(bg, 0, 0,);

  if (player === player1) {
    image(player1, 30 + x, 450 +y, 50,150);
  }
  if (player === player2) {
    image(player2, 30 + x, 450 +y, 50,150);
  }
  if (player === player3) {
    image(player3, 30 + x, 450 +y, 50,150);
  }

  if (random(1) < bugFrequency) { //  frequency 
        let obs = new Bug();
        bugs.push(obs);
      }

  // update and draw existing bugs
  for (let i = bugs.length - 1; i >= 0; i--) {
        bugs[i].update(fallingSpeed);
        bugs[i].draw();
        // remove bug if it's off screen
        if (bugs[i].offScreen()) {
          bugs.splice(i, 1);
        }
  }

  if (random(1) < bug2Frequency) { //  frequency 
        let obs = new Bug2();
        bugs2.push(obs);
  }

  // update and draw existing bugs
  for (let i = bugs2.length - 1; i >= 0; i--) {
        bugs2[i].update(fallingSpeed);
        bugs2[i].draw();
        // remove bug if it's off screen
        if (bugs2[i].offScreen()) {
          bugs2.splice(i, 1);
        }
  }

  if (random(1) < 0.02) { //  frequency 
        let skill = new Skill();
        skills.push(skill);
  }

  // update and draw existing skills
  for (let i = skills.length - 1; i >= 0; i--) {
        skills[i].update();
        skills[i].draw();
        // remove skills if it's off screen
        if (skills[i].offScreen()) {
            skills.splice(i, 1);
        }
  }

  // skills2
  if (random(1) < skill2Frequency) { //  frequency 
        let skill = new Skill2();
        skills2.push(skill);
  }

  // update and draw existing skills
  for (let i = skills2.length - 1; i >= 0; i--) {
        skills2[i].update();
        skills2[i].draw();
        // remove skills if it's off screen
        if (skills2[i].offScreen()) {
            skills2.splice(i, 1);
        }
  }

  // Check for collisions with bugs
  for (let i = bugs.length - 1; i >= 0; i--) {
     let obs = bugs[i];
      if (
        30 + x < obs.x + 50 &&
        30 + x + 50 > obs.x &&
        450 + y < obs.y + 50 &&
        150 + 450 + y > obs.y 
      ) {
        score -= 20;
        bugSound.play();
        fill("#f91304");
        bugs.splice(i, 1);
      }
  }

    // Check for collisions with bugs2
    for (let i = bugs2.length - 1; i >= 0; i--) {
      let obs = bugs2[i];
       if (
         30 + x < obs.x + 50 &&
         30 + x + 50 > obs.x &&
         450 + y < obs.y + 50 &&
         150 + 450 + y > obs.y 
       ) {
         score -= 50;
         bugSound.play();
         fill("#f91304");
         bugs2.splice(i, 1);
       }
  }

  // Check for collisions with skills
  for (let i = skills.length - 1; i >= 0; i--) {
    let skill = skills[i];
    if (
      30 + x < skill.x + 50 &&
      30 + x + 50 > skill.x &&
      450 + y < skill.y + 50 &&
      150 + 450 + y > skill.y 
    ) {
      score += 10;
      skillSound.play();
      fill("#17fd9e");
      skills.splice(i, 1)
    }
  }

  // Check for collisions with skills2
  for (let i = skills2.length - 1; i >= 0; i--) {
    let skill = skills2[i];
    if (
      30 + x < skill.x + 50 &&
      30 + x + 50 > skill.x &&
      450 + y < skill.y + 50 &&
      150 + 450 + y > skill.y 
    ) {
      score += 50;
      skillSound.play();
      fill("#17fd9e");
      skills2.splice(i, 1)
    }
  }

// Update score
textSize(25);
text(`らㄈØ尺Ɛ: ${score}pts, ƓØΛŁ: ${scoreGoal}pts`, 50, 80);
text(`Ťɪ௱Ɛ ${count}`, 820, 80);

if(score<-1 || count===0){
  fill("#f91304");
  textSize(30);
  text(`
  ███ ███ █╬█ ██ ╬╬ ███ █▄█ ██ ███
  █╬▄ █▄█ █V█ █▄ ╬╬ █╬█ ███ █▄ █▄╬
  █▄█ █╬█ █╬█ █▄ ╬╬ █▄█ ╬█╬ █▄ █╬█`, 130, 220);
  bugSound.pause();
  gameOver.play();
  noLoop();
}

if (score>=scoreGoal) {
  fill("#a804fc");  
  textSize(30);
  text(`
  █┼┼█ ███ █┼█ ███ ┼┼ █┼┼ ███ █▄█ ███ █┼┼
  ██▄█ █▄┼ ┼█┼ ┼█┼ ┼┼ █┼┼ █▄┼ ███ █▄┼ █┼┼
  █┼██ █▄▄ █┼█ ┼█┼ ┼┼ █▄█ █▄▄ ┼█┼ █▄▄ █▄█`, 80, 220);
  youWonSound.play();
  fallingSpeed +=2;
  count=30;
  scoreGoal+=150;
  bugFrequency+=0.01;
  bug2Frequency+=0.005;
  skill2Frequency+=0.005;
  noLoop();
  setTimeout(loop,2000);
}
}

class FallingObject {
  constructor(imgPath){
    this.x = random(width); 
    this.y = -50; 
    this.img = loadImage(imgPath); 
  }
  update(speedX = 0, speedY) {
    this.x += speedX;
    this.y += speedY;
  }
  draw() {
    image(this.img, this.x, this.y, 50, 50); 
  }
  offScreen() {
    return this.y > height; 
  }
}

class Bug extends FallingObject {
  constructor() {
    super('img/bug.webp'); 
    this.speed = random(3, 5);   
  }
  update() {
    super.update(random(-2, 2), random(-2, 2) + this.speed);
  }
}

class Bug2 extends FallingObject {
  constructor() {
    super('img/bug3.webp'); 
    this.speed = random(3, 5);   
  }
  update() {
    super.update(random(-2, 2), random(-2, 2) + this.speed);
  }
}

class Skill extends FallingObject {
  constructor() {
    super('img/skill.webp'); 
    this.speed = random(1, 3);   
  }
  update() {
    super.update(0, this.speed);
  }
}

class Skill2 extends FallingObject {
  constructor() {
    super('img/skill2.webp'); 
    this.speed = random(1, 3);   
  }
  update() {
    super.update(0, this.speed);
  }
}

// keypress function  
function keyPressed() {
    if (keyCode === RIGHT_ARROW && x < 905) {
        x += 40;   
    }
    if (keyCode === LEFT_ARROW && x > -5 ) {
        x -= 40;
    }
    if (keyCode === UP_ARROW && y > -430) {
        y -= 40;   
    }
    if (keyCode === DOWN_ARROW && y < 0) {
        y += 40;
    }
}
 
// screenshot
const takeScreenshot = document.getElementById("screenshot");
takeScreenshot.onclick = function(){
  saveCanvas(canvas, 'myHighScore', 'jpg');
}