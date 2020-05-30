class credits_screen extends world {
  constructor(name2, wh2) {
    super(name2);
    this.wh = wh2;
  }
  init() {
    super.init();
    var t = this;
    var btn_start_img = loadImage("img/play.png");
    t.btn_start = new yentity(200, 200, btn_start_img);
    t.btn_start.sethb_wh(200, 30); //set hitbox width height
    t.btn_start.set_wh(200, 30); //set hitbox width height
    t.add(t.btn_start);
  }
  update() {
    super.update();
    var t = this;

    //if start clicked
    if (t.btn_start.clicked(2)) {
      t.change_world("game_world", true);
    }
  } //end update
  render() {
    super.render();
    camera.off();
    this.ytext(this.wh.w / 2, this.wh.h / 2 - 11, "Credits:");
    this.ytext(this.wh.w / 2, this.wh.h / 2 + 11, "Zayan Husain: coding");
    this.ytext(this.wh.w / 2, this.wh.h / 2 + 33, "Yoel: game design");
  }
}
