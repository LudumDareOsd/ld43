import Player from '../characters/player';
import MapHandler from '../handlers/MapHandler';
import EnemyHandler from '../handlers/EnemyHandler';

class GameScene extends Phaser.Scene {

  public map: MapHandler = new MapHandler({ scene: this, yOffset: 80 });
<<<<<<< HEAD
  public enemyHandler = new EnemyHandler(this);
  private player;
=======
  public player;
  private enemyHandler = new EnemyHandler(this);
>>>>>>> ea3f6524c89a76d6df19714a7ab458b7855d5a8a
  private music : any;

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

  private initPlayer() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(100, 100, this, cursors);
  }

  private initPhysics() {
    this.map.init();
  }
}

export default GameScene;