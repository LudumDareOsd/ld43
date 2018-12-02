class GameOverScene extends Phaser.Scene {

  private music: any;
  private gameoveraudio: any;

  private space: any;

  constructor() {
    super({
      key: 'GameOverScene'
    });
  }

  preload() {
    this.music = this.sound.add('gameoveraudio', { loop: true });
    this.gameoveraudio = this.sound.add('gameover_voice', { loop: false });
  }

  create() {
    this.add.image(0, 0, 'background_gameover').setOrigin(0, 0);
    this.gameoveraudio.on('ended', function (sound) {
      this.music.play('', 0, 1, true);
    }, this);

    this.gameoveraudio.play('', 0, 1, true);

    this.add.zone(0, 0, 960, 720).setName('StartGame').setInteractive();

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.space.isDown = false;

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      if (gameObject.name == 'StartGame') {
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

  playMusic(sound) {
    this.music.play('', 0, 1, true);
  }

  update(time: number, delta: number) {
    if (this.space.isDown) {
      this.music.stop();
      this.scene.start('GameScene');
    }
  }
}

export default GameOverScene;