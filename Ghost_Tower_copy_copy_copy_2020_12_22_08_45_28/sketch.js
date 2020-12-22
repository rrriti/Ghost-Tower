var door, doorImg, doorGroup
var tower, towerImg
var ghost, ghostImg
var wsill, wsillImg, wsillGroup
var invBlock, invBlockGroup
var spookySound

var gameState = "PLAY"

function preload(){
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");
  wsillImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
 
  createCanvas(600,600);
  
  //spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  doorGroup = new Group();
  wsillGroup = new Group();
  invBlockGroup = new Group();
  
  ghost = createSprite(200,200,20,20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
}

function draw(){
  background(0);
  
  if(gameState === "PLAY"){
  
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x-3;
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  
  ghost.velocityY++;
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  spawnDoors();
  drawSprites();
  
  if(wsillGroup.isTouching(ghost)){
    ghost.velocityY = 1;
  }
    
  if(invBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "END";
  }
}
  
  if(gameState === "END"){
    stroke("red");
    strokeWeight(10);
    fill("yellow");
    textSize(80);
    text("Game Over!", 80, 250);
    
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50,20,20);
    wsill = createSprite(200,10,20,50);
    invBlock = createSprite(200,15,20,50);
    
    invBlock.width = wsill.width;
    invBlock.height = 2;
    
    door.x = random(120,400);
    wsill.x = door.x;
    invBlock.x = door.x;
    
    door.addImage(doorImg);
    wsill.addImage(wsillImg);
    
    door.velocityY = 1;
    wsill.velocityY = 1;
    invBlock.velocityY = 1;
    
    ghost.depth += 1;
    
    door.lifeTime = 800;
    wsill.lifeTime = 800;
    invBlock.lifeTime = 800;
    
    doorGroup.add(door);
    wsillGroup.add(wsill);
    invBlockGroup.add(invBlock);
  }
  
}