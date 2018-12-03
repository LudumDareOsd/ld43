class LoadScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'LoadScene'
		});
	}

  preload() {
    this.load.image('background_title', 'assets/gfx/title_screen.png');
    this.load.image('background_win', 'assets/gfx/win_screen.png');
    this.load.image('background_gameover', 'assets/gfx/gameover_screen.png');

		(this.load as any).spritesheet('ui', 'assets/gfx/ui.png', { frameWidth: 16, frameHeight: 32 });
		this.load.image('knife', 'assets/gfx/knife.png');
    this.load.image('cross', 'assets/gfx/cross.png');
    this.load.image('blood', 'assets/gfx/blood.png');

    this.load.image('tilemap01', 'assets/gfx/tilemap01.png');
    this.load.image('background-tiles', 'assets/gfx/background-tiles.png');
    this.load.tilemapTiledJSON('map1', 'assets/maps/map1.json');
    this.load.tilemapTiledJSON('map2', 'assets/maps/map2.json');
    this.load.tilemapTiledJSON('map3', 'assets/maps/map3.json');
    this.load.tilemapTiledJSON('map4', 'assets/maps/map4.json');
    this.load.tilemapTiledJSON('map5', 'assets/maps/map5.json');
    this.load.tilemapTiledJSON('map6', 'assets/maps/map6.json');
    this.load.tilemapTiledJSON('map7', 'assets/maps/map7.json');
    this.load.tilemapTiledJSON('map8', 'assets/maps/map8.json');
    this.load.atlas('soul_flares', 'assets/gfx/flares.png', 'assets/gfx/flares.json');

		(this.load as any).spritesheet('player', 'assets/gfx/player.png', { frameWidth: 32, frameHeight: 32 });
		(this.load as any).spritesheet('priest', 'assets/gfx/priest2.png', { frameWidth: 16, frameHeight: 32 });
		(this.load as any).spritesheet('popehat', 'assets/gfx/popehat.png', { frameWidth: 16, frameHeight: 32 });

    this.load.audio('titleaudio', 'assets/sfx/ambient_deep_bass.mp3', null);
    this.load.audio('gameoveraudio', 'assets/sfx/ambient_violin_scary.mp3', null);
    this.load.audio('winaudio', 'assets/sfx/ambient_deep_bass.mp3', null);
    this.load.audio('knife_hit', 'assets/sfx/knife_hit.mp3', null);
    this.load.audio('player_death', 'assets/sfx/player_death2.mp3', null);
    this.load.audio('player_fire_knife', 'assets/sfx/player_fire_knife.mp3', null);
    this.load.audio('player_hurt', 'assets/sfx/player_hurt.mp3', null);
    this.load.audio('player_jump', 'assets/sfx/player_jump2.mp3', null);
    this.load.audio('player_pickup', 'assets/sfx/player_pickup.mp3', null);
    this.load.audio('player_pickup_soul', 'assets/sfx/player_take_soul.mp3', null);
    this.load.audio('popehat_death', 'assets/sfx/popehat_death.mp3', null);
    this.load.audio('popehat_flying', 'assets/sfx/popehat_flying.mp3', null);
    this.load.audio('portal_activated', 'assets/sfx/portal_activated.mp3', null);
    this.load.audio('portal_use', 'assets/sfx/portal_use.mp3', null);
    this.load.audio('priest_death', 'assets/sfx/priest_death.mp3', null);
    this.load.audio('priest_fire', 'assets/sfx/priest_fire.mp3', null);
    this.load.audio('gameover_voice', 'assets/sfx/gameover.mp3', null);
    this.load.audio('player_laugh', 'assets/sfx/player_laugh.mp3', null);
    this.load.audio('priest_chant', 'assets/sfx/priest_chant.mp3', null);
    this.load.audio('win_voice', 'assets/sfx/win.mp3', null);
    this.load.audio('playing_audio', 'assets/sfx/ld43-mainout.mp3', null);
    this.load.audio('priestexplosion', 'assets/sfx/enemy_death.mp3', null);
  }

  create() {
    // needs to be in create not in preload
    this.initAnims();
  }

  // animations are shared between screens, create them only once
  private initAnims() {
    // player
    this.anims.create({ key: 'idle', frames: this.anims.generateFrameNumbers('player', { start: 8, end: 9 }), frameRate: 3, repeat: 1 });
    this.anims.create({ key: 'run', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }), frameRate: 8, repeat: 1 });
    this.anims.create({ key: 'turn', frames: this.anims.generateFrameNumbers('player', { frames: [6] }), frameRate: 8, repeat: 1 });
    this.anims.create({ key: 'jump', frames: this.anims.generateFrameNumbers('player', { frames: [7] }), frameRate: 16, repeat: 1 });
    this.anims.create({ key: 'jumpup', frames: this.anims.generateFrameNumbers('player', { frames: [0] }), frameRate: 0, repeat: 0 });
    this.anims.create({ key: 'jumpdown', frames: this.anims.generateFrameNumbers('player', { frames: [4] }), frameRate: 0, repeat: 0 });
    this.anims.create({ key: 'sacrefice', frames: this.anims.generateFrameNumbers('player', { frames: [0, 10, 11] }), frameRate: 8, repeat: 0});
    this.anims.create({ key: 'dying', frames: this.anims.generateFrameNumbers('player', { frames: [14, 15] }), frameRate: 8, repeat: 0});
    this.anims.create({ key: 'switchmap', frames: this.anims.generateFrameNumbers('player', { frames: [12, 13] }), frameRate: 8, repeat: 0});
    // popehat
    this.anims.create({ key: 'flying', frames: this.anims.generateFrameNumbers('popehat', { start: 0, end: 7 }), frameRate: 10, repeat: -1});
    // priest
    this.anims.create({ key: 'walk', frames: this.anims.generateFrameNumbers('priest', { start: 0, end: 1 }), frameRate: 4, repeat: 1 });
    this.anims.create({ key: 'crossfire', frames: this.anims.generateFrameNumbers('priest', { start: 2, end: 2 }), frameRate: 4, repeat: 0 });
    this.anims.create({ key: 'sacreficepose', frames: this.anims.generateFrameNumbers('priest', { start: 3, end: 3 }), frameRate: 4, repeat: 0 });
    this.anims.create({ key: 'sackofrobes', frames: this.anims.generateFrameNumbers('priest', { frames: [4] }), frameRate: 0, repeat: 0 });
  }

	update(time: number, delta: number) {
    this.scene.start('GameScene');
    //this.scene.start('StartScene');
	}
}

export default LoadScene;