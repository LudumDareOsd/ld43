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

		this.load.image('knife', '/assets/gfx/knife.png');

    this.load.image('tilemap01', '/assets/gfx/tilemap01.png');
    this.load.image('background-tiles', '/assets/gfx/background-tiles.png');
    this.load.tilemapTiledJSON('map', '/assets/maps/map1.json');

		(this.load as any).spritesheet('player', '/assets/gfx/player.png', { frameWidth: 16, frameHeight: 32 });
		(this.load as any).spritesheet('priest', '/assets/gfx/priest.png', { frameWidth: 16, frameHeight: 32 });

    this.load.audio('titleaudio', 'assets/sfx/ambient_deep_bass.mp3', null);
    this.load.audio('gameoveraudio', 'assets/sfx/ambient_violin_scary.mp3', null);
    this.load.audio('winaudio', 'assets/sfx/ambient_deep_bass.mp3', null);
    this.load.audio('knife_hit', 'assets/sfx/knife_hit.mp3', null);
    this.load.audio('player_death', 'assets/sfx/player_death.mp3', null);
    this.load.audio('player_fire_knife', 'assets/sfx/player_fire_knife.mp3', null);
    this.load.audio('player_hurt', 'assets/sfx/player_hurt.mp3', null);
    this.load.audio('player_jump', 'assets/sfx/player_jump.mp3', null);
    this.load.audio('player_pickup', 'assets/sfx/player_pickup.mp3', null);
    this.load.audio('player_pickup_soul', 'assets/sfx/player_take_soul.mp3', null);
    this.load.audio('popehat_death', 'assets/sfx/popehat_death.mp3', null);
    this.load.audio('popehat_flying', 'assets/sfx/popehat_flying.mp3', null);
    this.load.audio('portal_activated', 'assets/sfx/portal_activated.mp3', null);
    this.load.audio('portal_use', 'assets/sfx/portal_use.mp3', null);
    this.load.audio('priest_death', 'assets/sfx/priest_death.mp3', null);
    this.load.audio('priest_fire', 'assets/sfx/priest_fire.mp3', null);
  }

	update(time: number, delta: number) {
    this.scene.start('GameScene');
    //this.scene.start('StartScene');
	}
}

export default LoadScene;