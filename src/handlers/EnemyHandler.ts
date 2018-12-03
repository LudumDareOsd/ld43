import Popehat from "../characters/popehat";
import Priest from "../characters/priest";

class EnemyHandler {

  public sacreficeGroup: Phaser.GameObjects.Group;
  public enemyGroup: Phaser.GameObjects.Group;
  public enemyCollideLevelGroup: Phaser.GameObjects.Group;
  public enemyCollidePlayerGroup: Phaser.GameObjects.Group;
  public enemys = [];
  public sacrefices = [];
  public robes = [];
  private sceneRef;

  constructor(private scene: Phaser.Scene) {
    this.sceneRef = scene;
  }

  public create() {
    this.sacreficeGroup = this.scene.physics.add.group();
    this.enemyGroup = this.scene.physics.add.group();
    this.enemyCollideLevelGroup = this.scene.physics.add.group();
    this.enemyCollidePlayerGroup = this.scene.physics.add.group();
  }

  public update(time, delta) {
    this.sceneRef.physics.world.wrap(this.enemys, 0);

    for (let enemy of this.enemys) {
      enemy.update(time, delta);
    }

    const remove = [];
    for (let sacrefice of this.sacrefices) {
      sacrefice.timer -= delta;

      if (sacrefice.timer <= 0) {
        let bloodManager = this.scene.add.particles('blood') as any;
        bloodManager.setDepth(20);
        this.scene.sound.add('priestexplosion', { loop: false, volume: 0.4 }).play();
        let emitter = bloodManager.createEmitter({
          x: { min: sacrefice.sacrefice.x - 10, max: sacrefice.sacrefice.x + 10 },
          y: { min: sacrefice.sacrefice.y - 15, max: sacrefice.sacrefice.y + 25 },
          quantity: 50,
          scale: { start: 3, end: 1 },
          angle: { min: 240, max: 300 },
          speed: 150,
          gravityY: 200,
          lifespan: { min: 1000, max: 1200 }
        });

        this.scene.time.delayedCall(500, function () {
          emitter.on = false;
          this.scene.time.delayedCall(1000, function () {
            bloodManager.destroy();
          }, [], this);
        }, [], this);

        // let path = new Phaser.Curves.Path(sacrefice.sacrefice.x, sacrefice.sacrefice.y).lineTo(380, 660);
        // let soulparticles = this.scene.add.particles('soul_flares') as any;
        // soulparticles.setDepth(20);
        // let soulemitter = soulparticles.createEmitter({
        //   frame: { frames: [ 'white' ], cycle: true },
        //   scale: { start: 0.5, end: 0 },
        //   emitZone: { type: 'edge', source: path, quantity: 48, yoyo: false }
        // });

        // this.scene.time.delayedCall(2400, function () {
        //   soulemitter.on = false;
        //   this.scene.time.delayedCall(1000, function () {
        //     soulparticles.destroy();
        //   }, [], this);
        // }, [], this);

        sacrefice.sacrefice.anims.play('sackofrobes');
        this.robes.push(sacrefice.sacrefice);
        //sacrefice.sacrefice.destroy();
        sacrefice.manager.destroy();
        remove.push(sacrefice);

        if (this.sceneRef.uiHandler.increaseSouls()) {
          this.sceneRef.player.switchMapFunc();
          this.scene.time.delayedCall(1500, function () {
            this.sceneRef.player.switchMap = false;
            this.sceneRef.map.nextMap();
          }, [], this);
        }

      }
    }

    for (let rem of remove) {
      const index = this.sacrefices.indexOf(rem);

      if (index != -1) {
        this.sacrefices.splice(index, 1);
      }
    }
  }

  public addSacrefice(x: number, y: number, right: boolean) {
    let sprite = this.scene.physics.add.sprite(x, y, 'priest') as any;;

    sprite.setScale(2);
    sprite.setDepth(5);
    sprite.flipX = right;
    sprite.anims.play('sacreficepose', true);

    this.sacreficeGroup.add(sprite);
  }

  public addSacreficeTimer(timer: { timer: number, manager: any, sacrefice: any }) {
    this.sacrefices.push(timer);
  }

  public add(x, y, type: number) {

    // let test = new Popehat(300, 550, this.scene as any);
    // this.enemyCollidePlayerGroup.add(test.sprite);
    // this.enemyGroup.add(test.sprite);
    // this.enemys.push(test);

    let enemy;

    switch (type) {
      case 0: {
        enemy = new Priest(x, y, this.scene as any);
        this.enemyCollideLevelGroup.add(enemy.sprite);
        break;
      }

      case 1: {
        enemy = new Popehat(x, y, this.scene as any);
        this.enemyCollidePlayerGroup.add(enemy.sprite);
        break;
      }

      default: {
        console.log('NO ENEMY WITH TYPE ', type);
      }
    }

    this.enemyGroup.add(enemy.sprite);
    this.enemys.push(enemy);
  }

  public remove(enemy) {
    this.enemys.splice(this.enemys.indexOf(enemy), 1);
  }

  public removeAll() {
    // clear groups aswell or
    this.enemys.forEach((enemy) => {
      enemy.sprite.destroy();
    });
    this.sacreficeGroup.clear();
    this.enemys = [];
  }

  public onTurn(enemyCollider, tile) {
    let enemyToTurn;

    for (let enemy of enemyCollider.scene.enemyHandler.enemys) {
      if (enemy.collider === enemyCollider) {
        enemyToTurn = enemy;
      }
    }

    if (enemyToTurn.checkTurn) {
      enemyToTurn.checkTurn();
    }
  }

  public onHit(enemySprite, knife) {
    let enemyToHit;

    for (let enemy of enemySprite.scene.enemyHandler.enemys) {
      if (enemy.sprite === enemySprite) {
        enemyToHit = enemy;
      }
    }

    enemyToHit.takeDamage();

    knife.setAccelerationY(600);
  }

}

export default EnemyHandler;