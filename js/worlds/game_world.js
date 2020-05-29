class game_world extends world {
  constructor(name2, wh2) {
    super(name2);
    this.level_tst = ymaps.level_tst;
    this.level_1 = ymaps.level_1;
    this.wh = wh2;
    this.currentLevel = 0;
    this.lives = 3;
  }

  init() {
    var t = this;
    t.resetw(); //reset world
    //remove all p5 sprites
    allSprites.clear();
    var tmap = new tilemap(ymaps[level_names[this.currentLevel]]);
    t.add(tmap);

    tmap.draw_map();
  }

  update() {
    var t = this;
    super.update();
    t.loseCondition();
  }
  nextLevel() {
    this.currentLevel++;
    if (this.currentLevel > level_names.length - 1) {
      this.currentLevel = 0;
    }
    this.resetw();
    this.init();
  }
  loseCondition() {
    var t = this;
    if (t.lives == 0) {
      t.change_world("game_over", true);
    }
  } //end lose condition
}
