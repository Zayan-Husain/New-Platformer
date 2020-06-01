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
    this.max_jumps = 2000;

    this.dash_power = 150;

    this.combo = "";
    this.do_combo;
    this.combo_timer = new ytimer(5);
    this.climb_timer = new ytimer(5);
    this.all_coins_collected = false;
  } //end constructor

  update() {
    var t = this;
    super.update();
    t.reset_btn();
    t.move();
    t.open_end_gate();
    t.adjustPosX();
    t.adjustPosY();
    t.camera_control();
    t.nextLevel();
    t.touchEnemy();
    t.boundaries();
    t.trigger();
    sessionStorage.clear();
    localStorage.clear();
  } //end update
  move() {
    var t = this;
    var g = t.hit_test("tile", 0, 1); //collide ground from bottom
    var d = keyDown("SHIFT");
    if (d && keyDown("A")) {
      t.speedx -= t.speed;
    }
    if (d && keyDown("D")) {
      t.speedx += t.speed;
    }
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
    t.ladderClimb();
    t.wall_climb();
    if (keyWentUp("SPACE") && t.jumps < t.max_jumps) {
      t.speedy += this.jump_power;
      t.jumps++;
    }
    t.speedy *= t.vf;
    t.speedx *= t.hf;
  } //end move

  trigger() {
    var t = this;
    var tr = t.hit_test("trigger", 0, 0);
    if (tr) {
      console.log("touched trigger!!!");
    }
  }
  wall_climb() {
    var t = this;
    var gl = t.hit_test("tile", 2, 0); //collide ground from bottom
    var gr = t.hit_test("tile", -2, 0); //collide ground from bottom
    if (gl || (gr && t.climb_timer.finished())) {
      t.jumps--;
      if (t.jumps < 0) {
        t.jumps = 0;
      }
    }
  }

  boundaries() {
    if (this.y > 2200) {
      this.lose_life();
    }
  }
  adjustPosX() {
    var t = this;
    var xs = Math.sign(t.speedx);
    for (let i = 0; i < Math.abs(t.speedx); i++) {
      if (!t.hit_test("tile", xs, 0) && !t.hit_test("door", xs, 0) && !t.hit_test("trigger", xs, 0)) {
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
      if (!t.hit_test("tile", 0, ys) && !t.hit_test("door", 0, ys) && !t.hit_test("trigger", 0, ys)) {
        t.move_by(0, ys);
      } else {
        t.speedy = 0;
        break;
      }
    }
  } //end adjustPosY
  nextLevel() {
    var w = this.world;
    if (this.hit_test("end_coin", 0, 0)) {
      w.nextLevel();
    }
  }
  ladderClimb() {
    var t = this;
    var l = t.hit_test("ladder", 0, 0);
    if (!l || keyWentUp("W")) {
      t.gravity = t.original_gravity;
      return;
    }
    if (l && keyDown("W")) {
      t.speedy -= 10;
      t.gravity = 0;
    }
  }
  touchEnemy() {
    var t = this;
    var e = t.hit_test("enemy", 0, 0);
    if (e) {
      t.lose_life();
    }
  }
  lose_life() {
    var t = this;
    t.world.lives--;
    t.world.init();
  }
  camera_control() {
    var t = this;
    if (mouseIsPressed) {
      if (mouseButton == LEFT) {
        camera.zoom = 0.5;
      }
      if (mouseButton == CENTER) {
        camera.zoom = 0.25;
      }
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
  dash(dir) {
    var t = this;

    if (!keyDown("SHIFT")) {
      return;
    } //exit if did combo
    // console.log("dash: " + dir);

    if (dir == "left") {
      t.speedx -= t.dash_power;
    }

    if (dir == "right") {
      t.speedx += t.dash_power;
    }
    t.do_combo = false; //do combo once
  } //end dash
  open_end_gate() {
    if (this.get_by_type("door").length != 0) {
      if (this.all_coins_collected) {
        var ding = new Audio("../.././sounds/ding-sound-effect_1.mp3");
        ding.play();
        for (let i = 0; i < this.get_by_type("door").length; i++) {
          if (this.get_by_type("door")[i]) {
            this.get_by_type("door")[i].type = "opened_door";
          }
        }
      }
    }
  }
} //end class
///////////////end player///////////////////
