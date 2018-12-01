class MapHandler {

  private sceneRef;
  private map;
  private tileLayer;
  private deadlyLayer;

  constructor({scene: scene}) {
    this.sceneRef = scene;
  }

  create() {
    this.map = this.sceneRef.make.tilemap({key: 'map'});
    const tiles = this.map.addTilesetImage('tilemap01', 'tilemap01');
    this.tileLayer = this.map.createStaticLayer(0, tiles, 0, 0).setScale(2);
    // const belowLayer = this.map.createStaticLayer('Below Player', tileset, 0, 0);

    this.tileLayer.setCollisionByExclusion([-1]);
  }

  init() {
    this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player, null, null, null);
    this.sceneRef.physics.world.bounds.width = this.tileLayer.width;
    this.sceneRef.physics.world.bounds.height = this.tileLayer.height;
  }

}

export default MapHandler;

