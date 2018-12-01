class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LoadScene'
    });
  }

  preload() {
    this.load.image('tilemap', '/assets/gfx/tilemap01.png');
    this.load.tilemapTiledJSON('map', '/assets/maps/map1.json');
  }

	update(time: number, delta:number) {
		this.scene.start('StartScene');
	}
}

export default LoadScene;