import Player from '../characters/player';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  private player;
  private map;
  private tileLayer;

  create() {
    this.initPlayer();
    this.initMap();
    this.initPhysics();
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
  }

  private initPlayer() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(100, 100, this, cursors);
  }

  private initMap() {
    this.map = this.make.tilemap({key: 'map'});
    const tiles = this.map.addTilesetImage('tilemap01', 'tilemap');
    this.tileLayer = this.map.createStaticLayer(0, tiles, 0, 0).setScale(2);

    this.tileLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = this.tileLayer.width;
    this.physics.world.bounds.height = this.tileLayer.height;
  }

  private initPhysics() {
    this.physics.add.collider(this.tileLayer, this.player.sprite, null, null, null);
  }
}

export default GameScene;