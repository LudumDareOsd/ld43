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

  preload() {

  }

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
    this.player = new Player(this, 200, 640, cursors);
    this.physics.add.existing(this.player);
  }

  private initPhysics() {
    // this.player.setCollideWorldBounds(true);
    this.map.init();
  }
}

export default GameScene;