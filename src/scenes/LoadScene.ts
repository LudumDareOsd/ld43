class LoadScene extends Phaser.Scene {
	constructor() {
    super({
			key: 'LoadScene'
		});
	}

	preload() {
		// this.load.tilemapTiledJSON('map', '/assets/tilemaps/desert.json');
		// this.load.image('Desert', '/assets/tilemaps/tmw_desert_spacing.png');
	}

	create() {
	}

	update(time: number, delta:number) {
		this.scene.start('StartScene');
	}
}

export default LoadScene;