///////////////coin///////////////////
class coin extends yentity {
  constructor(x2, y2, g) {
    super(x2, y2, g);
    this.speed = 4;
    this.type = "coin";
    this.grafic_type = "none";
  } //end constructor
  init() {
    super.init();
    var t = this;
    this.sprite.draw = function () {
      fill(color(255, 240, 0));
      ellipse(0, 0, t.w, t.h);
    }; //end draw
  }
  update() {
    var t = this;
    super.update();
    t.collidePlayer();
  } //end update
  collidePlayer() {
    var t = this;
    var p = t.hit_test("player", 0, 0);
    if (p) {
      t.world.remove(t);
    }
  }
} //end class
///////////////end coin///////////////////
