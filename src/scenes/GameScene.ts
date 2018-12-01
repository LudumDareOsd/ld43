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

  preload() {
    // Maps will be 30x22 tiles
    this.load.image('tilemap', '/assets/gfx/tilemap01.png');
    this.load.tilemapTiledJSON('map', '/assets/maps/map1.json');
  }

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
    this.player = new Player(this, 100, 100, cursors);
    this.physics.add.existing(this.player);
  }

  private initMap() {
    this.map = this.make.tilemap({key: 'map'});
    const tiles = this.map.addTilesetImage('tilemap01', 'tilemap');
    this.tileLayer = this.map.createStaticLayer(0, tiles, 0, 0).setScale(2);
    // const belowLayer = this.map.createStaticLayer('Below Player', tileset, 0, 0);

    this.tileLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = this.tileLayer.width;
    this.physics.world.bounds.height = this.tileLayer.height;

  }

  private initPhysics() {
    // this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.tileLayer, this.player, null, null, null);
  }
}

export default GameScene;