class LoadScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'LoadScene'
		});
	}

	preload() {
		this.load.image('tilemap', '/assets/gfx/tilemap01.png');
		this.load.image('knife', '/assets/gfx/knife.png');
	
		this.load.tilemapTiledJSON('map', '/assets/maps/map1.json');
		(this.load as any).spritesheet('player', '/assets/gfx/player.png', { frameWidth: 16, frameHeight: 32 });
	}

	update(time: number, delta: number) {
		this.scene.start('StartScene');
	}
}

export default LoadScene;