const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var start = false;
var connect3 = false;
var connect4 = false;
var connect5 = false;
var connect6 = false;4
var cut3 = false;
var cut4 = false;
var cut5 = false;
var cut6 = false;

function preload(){
  bolt = loadImage("Sprites/screw.png");
  platformImg = loadImage("Sprites/ground.png");
}

function setup(){
  var canvas = createCanvas(1500, 710);
  engine = Engine.create();
  world = engine.world;

  connectorSprite = createSprite(145,350,10,10);
  connectorSprite1 = createSprite(345,350,10,10);
  connectorSprite2 = createSprite(545,350,10,10);
  connectorSprite3 = createSprite(745,350,10,10);
  connectorSprite4 = createSprite(945,350,10,10);
  connectorSprite5 = createSprite(1145,350,10,10);
  mouseSprite = createSprite(0,0,1,1);

  player = Bodies.circle(250,470,50);
  World.add(world,player);

  connector = new Rope(player,{x: 150,y: 355});
  connector1 = new Rope(player,{x: 350,y: 355});
  connector2 = new Rope(player,{x: 550,y: 355});
  connector3 = new Rope(player,{x: 750,y: 355});
  connector4 = new Rope(player,{x: 950,y: 355});
  connector5 = new Rope(player,{x: 1150,y: 355});

  base = Bodies.rectangle(1300,650,200,10,{isStatic: true});
  left = Bodies.rectangle(1205,600,10,90,{isStatic: true});
  right = Bodies.rectangle(1395,600,10,90,{isStatic: true});
  World.add(world,base);
  World.add(world,left);
  World.add(world,right);
}

function draw(){
  background(128,255,128);
  Engine.update(engine);
  ellipseMode(CENTER);
  imageMode(CENTER);

  if(player.position.x > 400 && connector.sling.bodyA === null && cut3 === false){
    connect3 = true;
  }
  if(player.position.x > 600 && connector1.sling.bodyA === null && cut4 === false){
    connect4 = true;
  }
  if(player.position.x > 800 && connector2.sling.bodyA === null && cut5 === false){
    connect5 = true;
  }
  if(player.position.x > 1000 && connector3.sling.bodyA === null && cut6 === false){
    connect6 = true;
  }

  if(connect3 === false){
    connector2.cut();
  }else{
    connector2.attach(player);
  }
  if(connect4 === false){
    connector3.cut();
  }else{
    connector3.attach(player);
  }
  if(connect5 === false){
    connector4.cut();
  }else{
    connector4.attach(player);
  }
  if(connect6 === false){
    connector5.cut();
  }else{
    connector5.attach(player);
  }

  mouseSprite.x = mouseX;
  mouseSprite.y = mouseY;

  image(bolt,150,355,20,20);
  image(bolt,350,355,20,20);
  image(bolt,550,355,20,20);
  image(bolt,750,355,20,20);
  image(bolt,950,355,20,20);
  image(bolt,1150,355,20,20);

  fill("yellow");
  ellipse(player.position.x,player.position.y,50,50);
  connector.display();
  connector1.display();
  connector2.display();
  connector3.display();
  connector4.display();
  connector5.display();

  image(platformImg,base.position.x,base.position.y,200,10);
  image(platformImg,left.position.x,left.position.y,10,90);
  image(platformImg,right.position.x,right.position.y,10,90);
}

function mouseDragged(){
  if(mouseSprite.isTouching(connectorSprite)){
    connector.cut();
  }
  if(mouseSprite.isTouching(connectorSprite1)){
    connector1.cut();
  }
  if(mouseSprite.isTouching(connectorSprite2)){
    cut3 = true;
    connect3 = false;
  }
  if(mouseSprite.isTouching(connectorSprite3)){
    cut4 = true;
    connect4 = false;
  }
  if(mouseSprite.isTouching(connectorSprite4)){
    cut5 = true;
    connect5 = false;
  }
  if(mouseSprite.isTouching(connectorSprite5)){
    cut6 = true;
    connect6 = false;
  }
}