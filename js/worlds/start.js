///////////////start world///////////////////
class start_screen extends world {
  constructor(name2, wh2) {
    super(name2);
    this.wh = wh2;
  }

  init() {
    super.init();
    var t = this;
    //get btn images
    var btn_start_img = loadImage("img/play.png");
    var btn_credits_img = loadImage("img/credits.png");
    t.btn_start = new yentity(this.wh.w / 2, 200, btn_start_img);
    t.btn_credits = new yentity(this.wh.w / 2, 300, btn_credits_img);
    t.btn_start.sethb_wh(200, 30); //set hitbox width height
    t.btn_credits.sethb_wh(247, 49); //set hitbox width height
    t.btn_start.set_wh(200, 30); //set hitbox width height
    t.btn_credits.set_wh(247, 49); //set hitbox width height
    t.add(t.btn_start);
    t.add(t.btn_credits);
  }
  render() {
    super.render();
    camera.off();
  }
  update() {
    super.update();
    var t = this;
    if (t.btn_start.clicked(2)) {
      t.change_world("game_world", true);
    }
    if (t.btn_credits.clicked(2)) {
      t.change_world("credits", true);
    }
  }
} //end world class
///////////////end start world///////////////////
