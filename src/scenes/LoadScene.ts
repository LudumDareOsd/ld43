class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LoadScene'
    });
  }

  preload() {

  }

	update(time: number, delta:number) {
		this.scene.start('StartScene');
	}
}

export default LoadScene;