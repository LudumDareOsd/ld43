class WinScene extends Phaser.Scene {

	private music : any;

	constructor() {
		super({
				key: 'WinScene'
			});
	}

	preload() {
		this.music = this.sound.add('winaudio', { loop: true });
	}

	create() {
		this.add.image(0, 0, 'background_win').setOrigin(0, 0);
		this.music.play('', 0, 1, true);

		this.add.zone(400, 200, 568, 63).setName('StartGame').setInteractive();

		this.input.on('gameobjectdown', (pointer, gameObject) => {
            if(gameObject.name == 'StartGame') {
                document.getElementsByTagName('canvas')[0].style.cursor = "default";
                this.music.stop();
                this.scene.start('GameScene');
            }
		});
		
		this.input.on('pointerover', (event) => {
            document.getElementsByTagName('canvas')[0].style.cursor = "crosshair";
        });

        this.input.on('pointerout', (event) => {
            document.getElementsByTagName('canvas')[0].style.cursor = "default";
        });
	}

	update(time: number, delta:number) {

	}
}

export default WinScene;