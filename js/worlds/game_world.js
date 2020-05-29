class game_world extends world {
  constructor(name2, wh2) {
    super(name2);
    this.level_tst = ymaps.level_tst;
    this.level_1 = ymaps.level_1;
    this.wh = wh2;
    this.currentLevel = 0;
    this.lives = 3;
    this.score = 0;
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
  render() {
    super.render();
    this.ui();
  }
  ui() {
    camera.off();
    this.ytext(this.wh.w / 2, 22, "Score: " + this.score);
    this.ytext(this.wh.w / 2, 44, "Level: " + (this.currentLevel + 1));
    this.ytext(this.wh.w / 2, 66, "Lives: " + this.lives);
    camera.on();
  }
}
