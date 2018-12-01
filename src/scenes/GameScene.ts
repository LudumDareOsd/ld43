import Player from '../characters/player';
import MapHandler from '../handlers/MapHandler';
import EnemyHandler from '../handlers/EnemyHandler';

class GameScene extends Phaser.Scene {

  private player;
  private map: MapHandler = new MapHandler({ scene: this });
  private enemyHandler = new EnemyHandler(this);

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create() {
    this.initPlayer();
    this.map.create();
    this.enemyHandler.create();
    this.initPhysics();
    this.enemyHandler.add(100, 100, 0);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
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