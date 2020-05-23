///////////////tile///////////////////
class tile extends yentity {
  constructor(x2, y2, id) {
    super(x2, y2);
    this.speed = 0;
    this.type = "tile";
    this.tile_id = id;
    this.grafic_type = "none";
    this.w = 50; //width height
    this.h = 50;

    this.hitbw = 50; //hitbox width
    this.hitbh = 50;
  } //end constructor

  init() {
    var t = this;
    super.init();
  }

  update() {
    var t = this;
    super.update();
  } //end update
} //end class
///////////////end tile///////////////////
