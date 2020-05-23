///////////////player///////////////////
class player extends yentity {
  constructor(x2, y2, g) {
    super(x2, y2, g);
    this.speed = 4;
    this.type = "player";
    this.grafic_type = "none";
    this.speed = 0.1;
    this.speedx = 0;
    this.speedy = 0;
    this.gravity = 8.6;
    this.vf = 0.5;
    this.hf = 0.05;
    this.original_gravity = this.gravity;
    this.power_up_timer = new ytimer(200);
    this.power_up_type = "none";
    this.power_up_start;
    this.zi = 999;
  } //end constructor

  update() {
    var t = this;
    super.update();
    t.move();
    t.adjustPosX();
    t.adjustPosY();
  } //end update
  move() {
    var t = this;
    var g = t.hit_test("tile", 0, 0);
    if (keyDown("A")) {
      t.speedx -= t.speed;
    }
    if (keyDown("D")) {
      t.speedx += t.speed;
    }
    if (keyDown("SPACE")) {
      t.speedy -= 50;
      if (t.speedy <= -50) {
        t.speedy = -50;
      }
    }
    if (keyWentUp("A") || keyWentUp("D")) {
      t.speedx = 0;
    }
    if (g) {
      t.speedy = 0;
    } else {
      t.speedy += t.gravity;
    }
    t.speedy *= t.vf;
    t.speedx *= t.hf;
  } //end move
  adjustPosX() {
    var t = this;
    var xs = Math.sign(t.speedx);
    for (let i = 0; i < Math.abs(t.speedx); i++) {
      if (!t.hit_test("tike", xs, 0)) {
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
} //end class
///////////////end player///////////////////
