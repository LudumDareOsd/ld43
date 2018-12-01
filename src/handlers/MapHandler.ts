class MapHandler {

  private sceneRef;
  private map;
  private tileLayer;
  private deadlyGroup;
  private backgroundLayer;

  constructor({ scene: scene }) {
    this.sceneRef = scene;
  }

  create() {
    this.map = this.sceneRef.make.tilemap({ key: 'map' });
    const tiles = this.map.addTilesetImage('tilemap01', 'tilemap01');
    const bgtiles = this.map.addTilesetImage('background-tiles', 'background-tiles');
    this.deadlyGroup = this.sceneRef.physics.add.staticGroup();
    this.backgroundLayer = this.map.createStaticLayer('Background', bgtiles, 0, 0).setScale(2);
    this.tileLayer = this.map.createStaticLayer('Tiles', tiles, 0, 0).setScale(2);
    // this.deadlyLayer = this.map.createStaticLayer('Deadly', tiles, 0, 0);


    let asd = this.map.createFromObjects('Enemies', null);
    // console.log(asd);
    // asd.foreach((tile) => {
    //   console.log(tile);
    // });


    this.tileLayer.forEachTile((tile) => {
      // console.log(tile);
      if (tile.index === 66) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        // console.log(x, y);
        const rect = this.sceneRef.add.zone(x+8, y-6, 26, 10);
        this.deadlyGroup.add(rect);
      }

    });

    this.tileLayer.setCollisionByExclusion([-1]);
    // map.setCollisionBetween(1, 999, true, 'collisionLayer');
  }

  init() {
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player.sprite, null, null, null);
    this.sceneRef.physics.add.collider(this.deadlyGroup, this.sceneRef.player.sprite, this.playerDeadlyCollide, null, null);
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player.knifeManager.bullets, this.sceneRef.player.stopKnife, null);
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.enemyHandler.enemyGroup, null, null);
    this.sceneRef.physics.add.overlap(this.tileLayer, this.sceneRef.enemyHandler.enemyGroup, this.sceneRef.enemyHandler.onColliderSwitch);
  }

  loadMap(mapName: string) {
    this.sceneRef.load.tilemapTiledJSON('map', '/assets/maps/'+mapName);
    console.log('loading map', mapName);
  }

  playerDeadlyCollide(player, object) {
    // console.trace('playerDeadlyCollide');
    console.log('playerDeadlyCollide', player, object);
    player.body.x = 100;
    player.body.y = 100;
    player.body.setVelocityX(0);
    player.body.setVelocityY(0);
    // player.anims.play('hurt');
  }

}

export default MapHandler;

