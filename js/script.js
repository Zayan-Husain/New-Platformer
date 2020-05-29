var yscreen = { w: 640, h: 480 };
//init engine
var yeng = new yengine();

var tste, tste2;
var current_world;

function setup() {
  createCanvas(yscreen.w, yscreen.h);
  frameRate(60);

  //create worlds
  var ygame_world = new game_world("game_world", yscreen);
  var game_over_world = new game_over("game_over", yscreen);
  yeng.add_world(ygame_world);
  yeng.add_world(game_over_world);

  //set current world
  yeng.set_c_world("game_world");
}

function draw() {
  //clear screen
  background(0); //blak bg
  drawSprites(); //p5.play render

  //update render current world
  current_world = yeng.get_c_world();
  current_world.update();
  current_world.render();
}
