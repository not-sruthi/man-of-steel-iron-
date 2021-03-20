
var bg, backgroundImg;
var ironman, ironimg;
var diamond, diaimg, diagroup;
var spike,spikeimg, spikegroup;
var stone, stoneimg, stonegroup;
var score = 0

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironimg= loadImage("images/iron.png");
  diaimg= loadImage("images/diamond.png");
  spikeimg=loadImage("images/spikes.png");
  stoneimg=loadImage("images/stone.png");
}

function setup() {
  createCanvas(1000, 600);

  //bg create
  bg = createSprite(580,300,1000,600);
  bg.addImage(backgroundImg);
  bg.scale=1.5;
  bg.velocityY=5;

  //iron man create
  ironman=createSprite(480,500,40,20);
  ironman.addImage(ironimg);
  ironman.scale=0.3;
  ironman.debug= false;

  //groups
  diagroup=new Group();
  spikegroup=new Group();
  stonegroup=new Group();
}

function diaGen() {
  if (frameCount%50===0) {
      diamond=createSprite(random(20,400),0,10,10);
      diamond.addImage(diaimg);
      diamond.velocityY=5;
      diamond.scale=0.7;
      diagroup.add(diamond);
      diamond.lifetime=250;
  }
}

function stoneGen() {
  if (frameCount%125===0) {
    stone=createSprite(random(200,800),0, 5,5);
    stone.addImage(stoneimg);
    stone.velocityY=5;
    stonegroup.add(stone);
    stone.lifetime=500;
    stone.setCollider("rectangle", 0, 19.5, 226, 10);
    stone.debug = false;
  }

}

function draw() {
  
  stoneGen();
  diaGen();

  for (var i=0; i<(stonegroup.length);i++) {

    var temp=stonegroup.get(i);

    if (temp.isTouching(ironman)){
      ironman.velocityY=5;
    }
  }

  for (var j=0;j<(diagroup.length);j++) {
    var temp2=diagroup.get(j);
    if (temp2.isTouching(ironman)) {
        score++;
        temp2.destroy();
        temp2=null;
    }
  }

  
  if (bg.y>400) {
    bg.y=bg.width/16;
  }

  if (keyDown("a")) {
    ironman.x=ironman.x-5;
  }
  if (keyDown("d")) {
    ironman.x=ironman.x+5;
  }
  if (keyDown("left_arrow")) {
    ironman.x=ironman.x-5;
  }
  if (keyDown("right_arrow")) {
    ironman.x=ironman.x+5;
  }
  if (ironman.x<5) {
    ironman.x=5;
  }
  if (ironman.x>995) {
    ironman.x=995;
  }
    
  drawSprites();
  if (ironman.y>630) {
    ironman.velocityY=0;
    ironman.x=ironman.x;
    ironman.velocityX=0;
    stone.velocityY=0;
    bg.velocityY=0;
    diamond.velocityY=0;
    fill("white");
    size(200);
    text("You lose!", 500,300);
  }

  textSize(30);
    fill("white");
    text("Score:"+ score,880,35);
}

