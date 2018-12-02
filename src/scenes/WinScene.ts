class WinScene extends Phaser.Scene {

	private music : any;
	private winaudio : any;

	private space : any;

	constructor() {
		super({
				key: 'WinScene'
			});
	}

	preload() {
		this.music = this.sound.add('winaudio', { loop: true });
		this.winaudio = this.sound.add('win_voice', { loop: false });
	}

	create() {
		this.add.image(0, 0, 'background_win').setOrigin(0, 0);
		this.winaudio.on('ended', function (sound) {
			this.music.play('', 0, 1, true);
        }, this);

		this.winaudio.play('', 0, 1, true);

		this.add.zone(0, 0, 960, 720).setName('StartGame').setInteractive();

		this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
		if (this.space.isDown) {
			this.music.stop();
			this.scene.start('GameScene');
		}
	}
}

export default WinScene;