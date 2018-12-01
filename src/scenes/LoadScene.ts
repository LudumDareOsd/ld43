class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LoadScene'
    });
  }

  preload() {
    this.load.image('tilemap01', '/assets/gfx/tilemap01.png');
    this.load.image('background-tiles', '/assets/gfx/background-tiles.png');
    this.load.tilemapTiledJSON('map', '/assets/maps/test.json');
  }

	update(time: number, delta:number) {
		this.scene.start('StartScene');
	}
}

export default LoadScene;