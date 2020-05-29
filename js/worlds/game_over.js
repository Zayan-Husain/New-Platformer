///////////////game_over world///////////////////
class game_over extends world {
  constructor(name2, wh2) {
    super(name2);
    this.wh = wh2;
  }

  init() {
    var t = this;
    allSprites.clear();
    var game_world = yeng.get_world("game_world");
    t.score = game_world.score;
  }
  render() {
    super.render();
    var t = this;
    camera.off();
    this.ui();
  }
  ui() {
    var t = this;
    textSize(30);
    this.ytext(this.wh.w / 2, this.wh.h / 2 - 11, "Game Over!");
    textSize(23);
    this.ytext(this.wh.w / 2, this.wh.h / 2 + 22, "Your score is " + this.score);
  }
} //end world class
///////////////end game_over world///////////////////
