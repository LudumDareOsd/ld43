import Player from '../characters/player';
import MapHandler from '../handlers/MapHandler';
import EnemyHandler from '../handlers/EnemyHandler';

class GameScene extends Phaser.Scene {

  private player;
  private map: MapHandler = new MapHandler({ scene: this, yOffset: 80 });
  private enemyHandler = new EnemyHandler(this);

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create() {
    this.initPlayer();
    this.enemyHandler.create();
    this.map.create();
    this.initPhysics();
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