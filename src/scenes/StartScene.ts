class StartScene extends Phaser.Scene {
	constructor() {
    super({
			key: 'StartScene'
		});
	}

	preload() {
	}

	create() {
	}

	update(time: number, delta:number) {
    this.scene.start('GameScene');
	}
}

export default StartScene;