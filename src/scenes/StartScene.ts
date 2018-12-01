class StartScene extends Phaser.Scene {

	private music : any;

	constructor() {
		super({
				key: 'StartScene'
			});
	}

	preload() {
		this.music = this.sound.add('titleaudio', { loop: true });
	}

	create() {
		this.add.image(0, 0, 'background_title').setOrigin(0, 0);
		let start = this.add.sprite(448, 583, 'startguld').setOrigin(0, 0); start.alpha = 0;
		this.music.play('', 0, 1, true);

		this.add.zone(500, 280, 800, 100).setName('StartGame').setInteractive();

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
		this.music.stop();
    	this.scene.start('GameScene');
	}
}

export default StartScene;