import Player from "../characters/player";

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  private ground;
  private player;

  preload() {
  }

  create() {
    this.initPlayer();
    this.initPlatform();
    this.initPhysics();
  }

  update(time: number, delta: number) {
  }

  private initPlayer() {
    this.player = new Player(this, 100, 100);
    this.physics.add.existing(this.player);
  }

  private initPlatform() {
    this.ground = this.physics.add.staticGroup();
    this.ground.create(400, 568, '');
    this.ground.create(600, 400, '');
    this.ground.create(100, 250, '');
    this.ground.create(750, 220, '');
  }

  private initPhysics() {
    this.physics.add.collider(this.player, this.ground, null, null, null);
  }
}

export default GameScene;