class game_world extends world {
  constructor(name2, wh2) {
    super(name2);
    this.level_tst = ymaps.level_tst;
    this.level_1 = ymaps.level_1;
    this.wh = wh2;
  }

  init() {
    var t = this;
    t.resetw(); //reset world
    var tmap = new tilemap(this.level_1);
    t.add(tmap);

    tmap.draw_map();
  }

  update() {
    var t = this;
    super.update();
  }
}
