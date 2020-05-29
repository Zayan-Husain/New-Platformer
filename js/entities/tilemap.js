///////////////tilemap///////////////////
class tilemap extends yentity {
  constructor(map2) {
    super(0, 0);
    this.speed = 4;
    this.type = "tilemap";
    this.grafic_type = "none";
    this.map = map2;
    this.tiles = [];
    this.tilew = 50;
    this.tileh = 50;
    this.tile_space = 20; //tob bottom space around tilmap (padding)
  } //end constructor
  init() {
    var t = this;

    // t.sprite.remove();
  }
  update() {
    var t = this;
    super.update();
  } //end update

  draw_map() {
    var t = this;
    var cur_tile; //current tile val
    var ctx; //current tile x
    var cty; //current tile y
    var map = t.map;
    for (var rows = 0; rows <= map.length - 1; rows++) {
      for (var cols = 0; cols <= map[rows].length - 1; cols++) {
        cur_tile = map[rows][cols];
        ctx = cols * t.tilew + t.tile_space;
        cty = rows * t.tileh + t.tile_space;
        t.gen_tile(ctx, cty, cur_tile);
      }
    }
  } //end draw_map

  gen_tile(x, y, id) {
    var t = this;
    if (id == 0) {
      return;
    }
    if (id == 1) {
      var ytile = new tile(x, y, id);
      t.world.add(ytile);
    }
    if (id == 2) {
      var c = new coin(x, y);
      t.world.add(c);
    }
    if (id == 3) {
      var p = new player(x, y);
      t.world.add(p);
    }
    if (id == 4) {
      var ft = new tile(x, y);
      ft.type = "fake_tile";
      t.world.add(ft);
    }
    if (id == 5) {
      var ft = new tile(x, y);
      ft.type = "tile";
      t.world.add(ft);
      ft.sprite.remove();
    }
    if (id == 6) {
      var s = new yentity(x, y);
      s.type = "sign";
      s.sign_dir = "right";
      s.grafic_type = "none";
      t.world.add(s);
      s.sprite.remove();
    }
    if (id == 7) {
      var s = new yentity(x, y);
      s.type = "sign";
      s.sign_dir = "left";
      s.grafic_type = "none";
      t.world.add(s);
      s.sprite.remove();
    }
    if (id == 8) {
      var e = new enemy(x, y);
      e.type = "enemy";
      t.world.add(e);
    }
    if (id == 9) {
      var l = new yentity(x, y);
      l.type = "ladder";
      l.grafic_type = "none";
      l.debug = true;
      l.h = 50;
      l.sethb_wh(20, 50);
      t.world.add(l);
    }
    if (id == 10) {
      var ec = new coin(x, y);
      ec.type = "end_coin";
      t.world.add(ec);
    }
    if (id == -2) {
      var bc = new coin(x, y);
      bc.type = "bonus_coin";
      t.world.add(bc);
    }
  } //end gen_tile
} //end class
///////////////end tilemap///////////////////
