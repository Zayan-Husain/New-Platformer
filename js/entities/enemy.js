class enemy extends yentity {
  constructor(x2, y2, id) {
    super(x2, y2);
    this.behavior = "patrol";
    this.grafic_type = "none";
    this.dir = "left";
    this.speed = 1.75;
  }
  update() {
    super.update();
    var t = this;
    t.move();
    t.reflect();
  }
  move() {
    if (this.behavior == "patrol") {
      if (this.dir == "left") {
        this.move_by(-this.speed, 0);
      }
      if (this.dir == "right") {
        this.move_by(this.speed, 0);
      }
    }
  } //end move()
  reflect() {
    var s = this.hit_test("sign", 0, 0);
    if (s) {
      this.dir = s.sign_dir;
    }
  }
}
