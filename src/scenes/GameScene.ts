import Player from '../characters/player';
import MapHandler from '../handlers/MapHandler';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  private player;
  private map: MapHandler = new MapHandler({scene: this});

  create() {
    this.initPlayer();
    this.map.create();
    this.initPhysics();
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