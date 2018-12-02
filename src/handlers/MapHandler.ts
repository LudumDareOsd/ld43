class MapHandler {

  private sceneRef;
  private map;
  private currentMap:number = 1;

  private tiles;
  private bgtiles;

  private tileLayer;
  private deadlyGroup;
  private backgroundLayer;

  private spawnpoint = {x: 100, y: 100};

  constructor({ scene: scene }) {
    this.sceneRef = scene;
  }

  create() {
    this.map = this.sceneRef.make.tilemap({ key: 'map1' });
    this.tiles = this.map.addTilesetImage('tilemap01', 'tilemap01');
    this.bgtiles = this.map.addTilesetImage('background-tiles', 'background-tiles');
    this.reload();

    this.deadlyGroup = this.sceneRef.physics.add.staticGroup();
    this.backgroundLayer = this.map.createStaticLayer('Background', this.bgtiles, 0, 0).setScale(2);
    this.tileLayer = this.map.createStaticLayer('Tiles', this.tiles, 0, 0).setScale(2);

    this.findObjectsByType('Priest', 0).forEach((element) => {
      this.sceneRef.enemyHandler.add(element.x*2, element.y*2, 0);
    });
    this.findObjectsByType('PopeHat', 0).forEach((element) => {
      // this.sceneRef.enemyHandler.add(element.x, element.y, 1);
    });


    this.tileLayer.forEachTile((tile) => {
      if (tile.index === 66) {
        // console.log(tile);
        // const x = tile.getCenterX();
        // const y = tile.getCenterY();
        const x = tile.x * 32;
        const y = tile.y * 32;
        // console.log(x, y);
        const rect = this.sceneRef.add.zone(x+3, y-2, 26, 10);
        this.deadlyGroup.add(rect);
      }

    });

    this.tileLayer.setCollisionByExclusion([-1]);
    // map.setCollisionBetween(1, 999, true, 'collisionLayer');

  }

  init() {
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player.sprite, null, null, null);
    this.sceneRef.physics.add.collider(this.deadlyGroup, this.sceneRef.player.sprite, this.playerDeadlyCollide.bind(this), null, null);
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player.knifeManager.bullets, this.sceneRef.player.stopKnife, null);
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.enemyHandler.enemyGroup, null, null);
    this.sceneRef.physics.add.overlap(this.tileLayer, this.sceneRef.enemyHandler.enemyGroup, this.sceneRef.enemyHandler.onTurn);
  }

  reload() {
    const sp = this.findObjectsByType('SpawnPoint', 0)[0];
    this.spawnpoint.x = sp.x*2; this.spawnpoint.y = sp.y*2;
    console.log('setting player to spawnpoint: ', this.spawnpoint);
    this.sceneRef.player.sprite.setX(this.spawnpoint.x);
    this.sceneRef.player.sprite.setY(this.spawnpoint.y);
  }

  nextMap() {

  }

  playerDeadlyCollide(player, object) {
    // console.trace('playerDeadlyCollide');
    console.log('playerDeadlyCollide', player, object);
    this.reload();
    player.body.setVelocityX(0);
    player.body.setVelocityY(0);
    // player.anims.play('hurt');
  }

  // find objects in a Tiled objectlayer of a "type"
  findObjectsByType(type, layer) {
    let result = new Array();
    this.map.objects[layer].objects.forEach(function(element) {
      // console.log(element);
      if(element.type === type) {
        // element.y -= this.map.tileHeight;
        result.push(element);
      }
    });
    return result;
  }

}

export default MapHandler;

