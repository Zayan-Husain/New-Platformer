///////////////coin///////////////////
class coin extends yentity {
  constructor(x2, y2, g) {
    super(x2, y2, g);
    this.speed = 4;
    this.type = "coin";
    this.grafic_type = "none";
    this.coin_value = 500;
  } //end constructor
  init() {
    super.init();
    var t = this;
    if (this.type == "coin") {
      this.sprite.draw = function () {
        fill(color(255, 240, 0));
        ellipse(0, 0, t.w, t.h);
      }; //end draw
    }
    if (this.type == "bonus_coin") {
      this.sprite.draw = function () {
        fill(color(52, 237, 113));
        ellipse(0, 0, t.w, t.h);
      }; //end draw
      this.coin_value = 750;
    }
    if (this.type == "end_coin") {
      this.sprite.draw = function () {
        fill(color(65, 190, 253));
        ellipse(0, 0, t.w, t.h);
      }; //end draw
      this.coin_value = 0;
    }
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
      this.world.score += this.coin_value;
    }
  }
} //end class
///////////////end coin///////////////////
