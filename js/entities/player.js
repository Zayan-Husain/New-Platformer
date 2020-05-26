///////////////player///////////////////
class player extends yentity {
  constructor(x2, y2, g) {
    super(x2, y2, g);
    this.speed = 5;
    this.type = "player";
    this.grafic_type = "none";
    this.speed = 1.5;
    this.speedx = 0;
    this.speedy = 0;
    this.gravity = 4.6;
    this.vf = 0.5;
    this.hf = 0.55;
    this.original_gravity = this.gravity;
    this.zi = 999;

    this.on_ground;
    this.jump_power = -170;
    this.jumps = 0;
    this.max_jumps = 9;
    this.dash_count = 0;
    this.max_dash_count = 2;
    this.dash_power = 50;
    this.dash_left = 0;
    this.dash_right = 0;
    this.dir = "";
    this.left_dash_counter;
    this.right_dash_counter;
  } //end constructor

  update() {
    var t = this;
    super.update();
    t.reset_btn();
    t.move();
    t.adjustPosX();
    t.adjustPosY();
    t.camera_control();
    t.dash();
  } //end update
  move() {
    var t = this;
    var g = t.hit_test("tile", 0, 1); //collide ground from bottom
    if (keyDown("A")) {
      t.speedx -= t.speed;
      this.dir = "left";
    }
    if (keyDown("D")) {
      t.speedx += t.speed;
      this.dir = "right";
    }

    if (keyWentUp("A") || keyWentUp("D")) {
      t.speedx = 0;
    }
    if (g) {
      t.speedy = 0;
      t.jumps = 0;
      t.on_ground = true;
    } else {
      t.speedy += t.gravity;
      t.on_ground = false;
    }
    if (keyWentUp("SPACE") && t.jumps < t.max_jumps) {
      t.speedy += this.jump_power;
      t.jumps++;
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

  reset_btn() {
    var t = this;
    if (keyWentUp("R")) {
      console.log("reset game");
      t.world.init();
    }
  } //end reset_btn
  dash() {
    if (keyWentUp("A")) {
      this.dash_left++;
    }
    if (keyWentUp("D")) {
      this.dash_right++;
    }
    if (this.dash_right >= this.max_dash_count) {
      this.dash_right = 0;
      this.speedx += this.dash_power;
    }
  }
} //end class
///////////////end player///////////////////
