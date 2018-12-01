class MapHandler {

  private sceneRef;
  private map;
  private tileLayer;
  private deadlyLayer;
  private backgroundLayer;

  constructor({ scene: scene }) {
    this.sceneRef = scene;
  }

  create() {
    this.map = this.sceneRef.make.tilemap({ key: 'map' });
    const tiles = this.map.addTilesetImage('tilemap01', 'tilemap01');
    const bgtiles = this.map.addTilesetImage('background-tiles', 'background-tiles');
    this.backgroundLayer = this.map.createStaticLayer('Background', bgtiles, 0, 0).setScale(2);
    this.tileLayer = this.map.createStaticLayer('Tiles', tiles, 0, 0).setScale(2);
    this.deadlyLayer = this.map.createStaticLayer('Deadly', tiles, 0, 0).setScale(2);
    // this.deadlyGroup = this.sceneRef.physics.add.group();

    this.tileLayer.setCollisionByExclusion([-1]);
    this.deadlyLayer.setCollisionByExclusion([-1]);

    // map.setCollisionBetween(1, 999, true, 'collisionLayer');
  }

  init() {
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player.sprite, null, null, null);
    this.sceneRef.physics.add.collider(this.deadlyLayer, this.sceneRef.player.sprite, this.playerDeadlyCollide, null, null);
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player.knifeManager.bullets, this.sceneRef.player.stopKnife, null);
  }

  playerDeadlyCollide(player, tile) {
    // console.log(tile, player);
    console.log('kill');
    player.body.x = 100;
    player.body.y = 100;
    player.body.setVelocityX(0);
    player.body.setVelocityY(0);
    // player.anims.play('hurt');
  }

}

export default MapHandler;

