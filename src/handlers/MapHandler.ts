class MapHandler {

  private sceneRef;
  private map;
  public currentMap: number = 1; // Current level
  private maxMap: number = 8;    // Maximum level, when this map is beaten we will see the winscreen

  private tiles;
  private bgtiles;

  private layerYOffset: number = 0;
  private tileLayer;
  private deadlyGroup;
  private backgroundLayer;
  private colliders = [];

  private spawnpoint = { x: 100, y: 100 };

  constructor({ scene: scene, yOffset }) {
    this.sceneRef = scene;
    this.layerYOffset = yOffset;
  }

  public create() {
    console.log('create map');
    // this.sceneRef.physics.world.removeAll();
    this.map = this.sceneRef.make.tilemap({ key: 'map' + this.currentMap });
    this.tiles = this.map.addTilesetImage('tilemap01', 'tilemap01');
    this.bgtiles = this.map.addTilesetImage('background-tiles', 'background-tiles');

    this.deadlyGroup = this.sceneRef.physics.add.staticGroup();
    this.backgroundLayer = this.map.createDynamicLayer('Background', this.bgtiles).setScale(2)
    this.backgroundLayer.setDepth(0);

    this.tileLayer = this.map.createDynamicLayer('Tiles', this.tiles).setScale(2);
    // this.tileLayer.setDepth(8); // above bullets or no?
    this.sceneRef.physics.world.bounds.width = this.tileLayer.width * 2;
    this.sceneRef.physics.world.bounds.height = this.tileLayer.height * 2;

    this.sceneRef.enemyHandler.removeAll();
    this.findObjectsByType('Priest', 0).forEach((element) => {
      this.sceneRef.enemyHandler.add(element.x * 2, element.y * 2, 0);
    });
    this.findObjectsByType('PopeHat', 0).forEach((element) => {
      this.sceneRef.enemyHandler.add(element.x * 2, element.y * 2, 1);
    });

    this.tileLayer.forEachTile((tile) => {
      if (tile.index === 66) {
        // const x = tile.getCenterX();
        // const y = tile.getCenterY();
        const x = tile.x * 32; // times 16 times 2
        const y = tile.y * 32;
        // console.log(x, y);
        const rect = this.sceneRef.add.zone(x + 12, y - 2, 10, 10);
        this.deadlyGroup.add(rect);
      }
    });

    this.tileLayer.setCollisionByExclusion([-1]);
    // map.setCollisionBetween(1, 999, true, 'collisionLayer');
  }

  public init() {
    console.log('init map');
    // player collide with level
    this.colliders.push(this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player.sprite, null, null, null));
    // level collide with player bullets
    this.colliders.push(this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.player.knifeManager.bullets, this.sceneRef.player.stopKnife, null));
    // player collide with level harmful
    this.colliders.push(this.sceneRef.physics.add.collider(this.deadlyGroup, this.sceneRef.player.sprite, this.playerDeadlyCollide.bind(this), null, null));
    // enemies collide with level
    this.colliders.push(this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.enemyHandler.enemyCollideLevelGroup, null, null));
    this.colliders.push(this.sceneRef.physics.add.collider(this.tileLayer, this.sceneRef.enemyHandler.sacreficeGroup, null, null));
    // enemies collides with player bullets
    this.colliders.push(this.sceneRef.physics.add.collider(this.sceneRef.enemyHandler.enemyGroup, this.sceneRef.player.knifeManager.bullets, this.sceneRef.enemyHandler.onHit, null));
    // enemies collides with player
    this.colliders.push(this.sceneRef.physics.add.collider(this.sceneRef.enemyHandler.enemyCollidePlayerGroup, this.sceneRef.player.sprite, this.playerDeadlyCollide.bind(this), null, null));
    this.colliders.push(this.sceneRef.physics.add.collider(this.sceneRef.player.knifeManager.bullets, this.sceneRef.player.sprite, (player, bullet) => {
      bullet.destroy();
      this.sceneRef.player.updateDaggers();
    }, null));
    this.colliders.push(this.sceneRef.physics.add.overlap(this.sceneRef.player.sprite, this.sceneRef.enemyHandler.sacreficeGroup, this.sceneRef.player.sacrefice, null));

    for (let enemy of this.sceneRef.enemyHandler.enemys) {
      if (enemy.fireManager) {
        this.sceneRef.physics.add.collider(this.tileLayer, enemy.fireManager.bullets, (bullet, tile) => { bullet.destroy() }, null);
        this.sceneRef.physics.add.collider(this.sceneRef.player.sprite, enemy.fireManager.bullets, (playerSprite, bullet) => {
          bullet.destroy();
          playerSprite.scene.player.takeDamage();
        }, null);
      }
    }

    this.sceneRef.uiHandler.init(this.findObjectsByType('Priest', 0).length);
    this.sceneRef.player.resetDaggers();
    this.reload();
  }

  // is point on a solid tile
  public collideAtPoint(x, y) {
    const possibleTile = this.map.getTileAt(Math.floor((x / 32)), Math.floor((y / 32)), 1)
    return possibleTile ? (possibleTile.index > -1) : true;
  }

  public reload() {
    const sp = this.findObjectsByType('SpawnPoint', 0)[0];
    this.spawnpoint.x = sp.x * 2; this.spawnpoint.y = sp.y * 2; // map is saved in 1x scale
    console.log('setting player to spawnpoint: ', this.spawnpoint);
    this.sceneRef.player.sprite.setX(this.spawnpoint.x);
    this.sceneRef.player.sprite.setY(this.spawnpoint.y);
    this.sceneRef.player.dying = false;
  }

  public replay() {
    this.currentMap--;
    this.nextMap();
  }

  // go to next map, or victory
  public nextMap() {
    this.currentMap++;
    if (this.currentMap > this.maxMap) {
      this.currentMap = 1;
      this.sceneRef.scene.start('WinScene');
      return;
    }

    for(let enemy of this.sceneRef.enemyHandler.enemys) {
      if(enemy.flyingsound) {
        enemy.flyingsound.stop();
      }

      if(enemy.emitter) {
        enemy.emitter.on = false;
      }
    }

    while(this.sceneRef.enemyHandler.sacreficeGroup.children.size > 0) {
      this.sceneRef.enemyHandler.sacreficeGroup.children.get(0).destroy();
    }

    this.create();
    this.removeColliders();

    while(this.sceneRef.enemyHandler.robes.length > 0) {
      this.sceneRef.enemyHandler.robes[0].destroy();
      this.sceneRef.enemyHandler.robes.splice(0, 1);
    }

    this.sceneRef.player.knifeManager.clear(true);
    this.init()
  }

  private playerDeadlyCollide(player, object) {
    player.body.setVelocityX(0);
    player.body.setVelocityY(0);
    this.sceneRef.player.takeDamage();
  }

  // find objects in a Tiled objectlayer of a "type"
  public findObjectsByType(type, layer) {
    let result = new Array();
    if (!this.map.objects[layer]) {
      return result;
    }
    this.map.objects[layer].objects.forEach(function (element) {
      if (element.type === type) {
        // element.y -= this.map.tileHeight;
        result.push(element);
      }
    });
    return result;
  }

  removeColliders() {
    for (let collider of this.colliders) {
      this.sceneRef.physics.world.removeCollider(collider);
    }
  }

}

export default MapHandler;

