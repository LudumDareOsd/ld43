class MapHandler {

  private sceneRef;
  private map;
  private currentMap:number = 1;

  private tiles;
  private bgtiles;

  private tileLayer;
  private deadlyGroup;
  private backgroundLayer;

  private spawnpoint;

  constructor({ scene: scene }) {
    this.sceneRef = scene;
  }

  create() {
    this.map = this.sceneRef.make.tilemap({ key: 'map1' });
    this.tiles = this.map.addTilesetImage('tilemap01', 'tilemap01');
    this.bgtiles = this.map.addTilesetImage('background-tiles', 'background-tiles');
    this.spawnpoint = this.findObjectsByType('SpawnPoint', 0)[0];
    console.log('new spawnpoint', this.spawnpoint);


    this.deadlyGroup = this.sceneRef.physics.add.staticGroup();
    this.backgroundLayer = this.map.createStaticLayer('Background', this.bgtiles, 0, 0).setScale(2);
    this.tileLayer = this.map.createStaticLayer('Tiles', this.tiles, 0, 0).setScale(2);

    let priests = this.findObjectsByType('Priest', 0);
    let popehats = this.findObjectsByType('PopeHat', 0);
    console.log(priests);
    console.log(popehats);


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
  }

  nextMap() {


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

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
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

