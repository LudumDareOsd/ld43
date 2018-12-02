import Player from '../characters/player';
import MapHandler from '../handlers/MapHandler';
import EnemyHandler from '../handlers/EnemyHandler';

class GameScene extends Phaser.Scene {

  public map: MapHandler = new MapHandler({ scene: this, yOffset: 80 });
  public enemyHandler = new EnemyHandler(this);
  public player;
  private music: any;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload() {
    this.music = this.sound.add('playing_audio', { loop: true, volume: 0.4 });
  }

  create() {
    this.initPlayer();
    this.enemyHandler.create();
    this.map.create();
    this.initPhysics();
    this.music.volume = 0.4;
    this.music.play('', 0, 1, true);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.enemyHandler.update(time, delta);
  }

  private initAnims() {
    this.anims.create({ key: 'idle', frames: this.anims.generateFrameNumbers('player', { start: 8, end: 9 }), frameRate: 3, repeat: 1 });
    this.anims.create({ key: 'run', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }), frameRate: 8, repeat: 1 });
    this.anims.create({ key: 'turn', frames: this.anims.generateFrameNumbers('player', { frames: [6] }), frameRate: 8, repeat: 1 });
    this.anims.create({ key: 'jump', frames: this.anims.generateFrameNumbers('player', { frames: [7] }), frameRate: 16, repeat: 1 });
    this.anims.create({ key: 'jumpup', frames: this.anims.generateFrameNumbers('player', { frames: [0] }), frameRate: 0, repeat: 0 });
    this.anims.create({ key: 'jumpdown', frames: this.anims.generateFrameNumbers('player', { frames: [4] }), frameRate: 0, repeat: 0 });
  }

  private initPlayer() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(100, 100, this, cursors);
  }

  private initPhysics() {
    this.map.init();
  }
}

export default GameScene;