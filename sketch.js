var PLAY=1
var END=0
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime
function preload(){

  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
 createCanvas(450, 400); 
monkey=createSprite(80,315,20,20)
monkey.addAnimation("moving",monkey_running)

monkey.scale=0.1
 
ground=createSprite(400,350,1000,10);
ground.velocityX=-4
ground.x=ground.width/2;

obstacleGroup= new Group();
FoodGroup= new Group();
score = 0;
survivalTime= 0;


}

function draw() {
background("white")
stroke("white")
textSize(20)
fill("white")
text("Score: "+ score, 500,50); 
  
stroke("black")  
textSize(20)
fill("black")  

  
text("survival Time: "+ survivalTime, 100,50);

if(gameState===PLAY){
  
        score = score + Math.round(getFrameRate()/80);
        survivalTime= Math.ceil(frameCount/frameRate());
  
        if (ground.x < 0){
             ground.x = ground.width/2;
            } 
        if(keyDown("space")&& monkey.y >= 300){
             monkey.velocityY = -17  ;

             }
          monkey.velocityY = monkey.velocityY + 0.8
  
      
  
        if(monkey.isTouching(FoodGroup)){
              FoodGroup.destroyEach();

              }
        if(obstacleGroup.collide(monkey)){
              gameState=END
  }
}
  if(gameState===END){   

             ground.velocityX=0
             monkey.velocityY=0
    
         obstacleGroup.setLifetimeEach(-1);  
         obstacleGroup.setVelocityXEach(0);
    
    FoodGroup.setVelocityXEach(0);  
    FoodGroup.setLifetimeEach(-1);
    
  }
    monkey.collide(ground) 
  
monkey.setCollider("circle",0,0,300);
 // monkey.debug=true
    spawnObstacles();
     spawnfood() ;
  
 drawSprites (); 
  
}


function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(500,315,10,40);
   obstacle.velocityX = -3
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
   
   if(rand==1){
        obstacle.addImage(obstaceImage);
   }
     if(rand==2){
       obstacle.addImage(obstaceImage);
     }        
  
    obstacle.scale = 0.2;
  
    obstacleGroup.add(obstacle);
 }



}

function spawnfood() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var food = createSprite(500,220,40,10);
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.1 ;
    food.velocityX = -3;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    
    //adjust the depth
     food.depth = monkey.depth;
     monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(food);
  }
}

