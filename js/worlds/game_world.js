class game_world extends world {
  constructor(name2, wh2) {
    super(name2);
    this.level_tst = ymaps.level_tst;
    this.level_1 = ymaps.level_1;
    this.wh = wh2;
    this.currentLevel = "level_1";
  }

  init() {
    var t = this;
    t.resetw(); //reset world
	//remove all p5 sprites
	for(var i=0; i<allSprites.length; i++)
	{
		var s = allSprites[i];

		s.remove();
	}
    var tmap = new tilemap(ymaps[this.currentLevel]);
    t.add(tmap);

    tmap.draw_map();
  }

  update() {
    var t = this;
    super.update();
  }
}
