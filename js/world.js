class yengine {
  constructor() {
    window.worlds = [];
  }

  add_world(w) {
    window.worlds[w.name] = w;
  } //end add_world
  get_world(name) {
    return window.worlds[name];
  }
  get_c_world() {
    return window.current_world;
  }
  set_c_world(name, init) {
    //console.log(typeof window.current_world)
    if (typeof window.current_world == "object") {
      window.current_world.change_world(name, init);
    } else {
      window.current_world = window.worlds[name];
      window.current_world.init();
    }
  } //end set_c_world

  create_sprite_frames(name, w, h, frames_r) {
    var retr = []; //return array
    var j = 0;
    for (var i = 0; i <= frames_r.length - 1; i += 2) {
      var obj = {
        name: name + j,
        frame: {
          x: frames_r[i] * w,
          y: frames_r[i + 1] * h,
          width: w,
          height: h,
        },
      };
      retr.push(obj);
      j++;
    } //end for
    return retr;
  } //create_sprite_frames
} //end yengine

class world {
  constructor(name2) {
    this.entitys = [];
    this.entitys_count = 0;
    this.name = name2;
    this.camx;
    this.camy;
  } //end constructor

  init() {} //end init

  resetw() {
    var t = this;
    var e;
    for (var i in t.entitys) {
      e = t.entitys[i];
      t.remove(e);
    }
    t.entitys = [];

    //remove all p5 sprites
    for (var i = 0; i < allSprites.length; i++) {
      var s = allSprites[i];

      s.remove();
    }
  } //end resetw

  add(e) {
    this.entitys[this.entitys.length] = e;
    e.world = this;
    e.init();
    this.entitys_count++;
    e.ecount = this.entitys_count;
  } //end add

  remove(e) {
    if (e.remove) {
      e.remove();
    }
    if (e.sprite) {
      e.sprite.remove();
    }

    var index = this.entitys.indexOf(e);
    this.entitys.splice(index, 1);
    this.entitys_count--;
  } //end remove

  update() {
    //console.log("w update");
    var e;
    for (var i in this.entitys) {
      e = this.entitys[i];
      if (e && e.active) {
        e.update();
      }
    }

    this.camx = camera.position.x;
    this.camy = camera.position.x;
  } //end update

  render() {
    //console.log("w render");
    var e;
    for (var i in this.entitys) {
      e = this.entitys[i];
      if (e && e.active) {
        e.render();
      }
    }
  } //end render

  change_world(name, init) {
    console.log("in " + name + " world");
    var e;
    //disable all entites
    for (var i in this.entitys) {
      e = this.entitys[i];
      e.active = false;
      if (e.sprite) {
        e.sprite.visible = false;
      }
    }
    //save this world data
    window.worlds[this.name] = this;
    window.current_world = window.worlds[name];
    if (init) {
      window.current_world.init();
    }
    //enable current world entites
    var cw = window.current_world;
    for (var i in cw.entitys) {
      e = cw.entitys[i];
      e.active = true;
      if (e.sprite) {
        e.sprite.visible = true;
      }
    }
  } //end change_world
  ytext(x, y, s) {
    fill(255);
    textAlign(CENTER);
    text(s, x, y);
  }
} //end world
