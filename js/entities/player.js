///////////////player///////////////////
class player extends yentity {
  constructor(x2, y2, g) {
    super(x2, y2, g);
    this.speed = 5;
    this.type = "player";
    this.grafic_type = "none";
    this.speed = 3;
    this.speedx = 0;
    this.speedy = 0;
    this.gravity = 7.6;
    this.vf = 0.5;
    this.hf = 0.55;
    this.original_gravity = this.gravity;
    this.zi = 999;

    this.on_ground;
    this.jump_power = -170;
  } //end constructor

  update() {
    var t = this;
    super.update();
	t.reset_btn();
    t.move();
    t.adjustPosX();
    t.adjustPosY();
    t.camera_control();
  } //end update
  move() {
    var t = this;
    var g = t.hit_test("tile", 0, 1); //collide ground from bottom
    if (keyDown("A")) {
      t.speedx -= t.speed;
    }
    if (keyDown("D")) {
      t.speedx += t.speed;
    }

    if (keyWentUp("A") || keyWentUp("D")) {
      t.speedx = 0;
    }

    if (g) {
      t.speedy = 0;
      t.on_ground = true;
      if (keyDown("SPACE")) {
        t.speedy += this.jump_power;
      }
    } else {
      t.speedy += t.gravity;
      t.on_ground = false;
    }
    t.speedy *= t.vf;
    t.speedx *= t.hf;
  } //end move

  adjustPosX() {
    var t = this;
    var xs = Math.sign(t.speedx);
    for (let i = 0; i < Math.abs(t.speedx); i++) {
      if (!t.hit_test("tile", xs, 0)) {
        t.move_by(xs, 0);
      } else {
        t.speedx = 0;
        break;
      }
    }
  } //end adjustPosX

  adjustPosY() {
    var t = this;
    var ys = Math.sign(t.speedy);
    for (let i = 0; i < Math.abs(t.speedy); i++) {
      if (!t.hit_test("tile", 0, ys)) {
        t.move_by(0, ys);
      } else {
        t.speedy = 0;
        break;
      }
    }
  } //end adjustPosY
  loseCondition() {
    var t = this;
  } //end lose condition
  camera_control() {
    var t = this;
    if (mouseIsPressed) {
      camera.zoom = 0.5;
    } else {
      camera.zoom = 1;
    }
    camera.position.x = t.x;
    camera.position.y = t.y;
  } //end camera_control
  
  reset_btn()
  {
	  var t=this;
	  if (keyWentUp("R")) 
	  {
		  console.log("reset game");
		  t.world.init();
	  }
  }//end reset_btn
} //end class
///////////////end player///////////////////
