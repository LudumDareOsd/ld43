import Enemy from "./enemy";
import GameScene from "../scenes/GameScene";

class Popehat extends Enemy {

  private flyingsound : any;
  private emitter: any;

  constructor(x: number, y: number, scene: GameScene) {
    super(x, y, 'popehat', scene);
    this.sprite.anims.play('flying', true);
    this.sprite.body.setAllowGravity(false);
    this.sprite.setSize(12, 20);
    this.sprite.setOffset(2, 6);
    this.flyingsound = this.scene.sound.add('popehat_flying', { loop: true, volume: 0.2 });
    this.flyingsound.play('', 0, 1, true);
    this.emitter = this.scene.crossParticles.createEmitter({
      speed: { min: 30, max: 50 },
      scale: { start: 1, end: 0 },
      lifespan: { min: 1000, max: 2000 },
      quantity: 1,
      frequency: 100,
      follow: this.sprite,
    });
    this.emitter.startFollow(this.sprite);
  }

  public update(time, delta) {
    // console.log( this.scene.player.sprite.body.center);
    // this.scene.physics.accelerateToObject(this.sprite, this.scene.player.sprite, 11, 100);
    this.scene.physics.moveToObject(this.sprite, this.scene.player.sprite.body.center, 48);
  }

  protected onDeath() {
    this.sprite.destroy();
    let index = this.scene.enemyHandler.enemys.indexOf(this);
    if(index != -1) {
      this.scene.enemyHandler.enemys.splice(index, 1);
    }
    
    this.flyingsound.stop();
    this.scene.sound.add('popehat_death', { loop: false, volume: 0.1 }).play();
    let emitter = this.scene.crossParticles.createEmitter({
      x: { min: this.sprite.x - 10, max: this.sprite.x + 10 },
      y: { min: this.sprite.y - 15, max: this.sprite.y + 25 },
      quantity: 1,
      scale: { start: 1, end: 0 },
      angle: { min:  0, max: 360 },
      speed: 100,
      gravityY: 100,
      lifespan: { min: 1000, max: 1200 }
    });

    this.scene.time.delayedCall(500, function () {
      emitter.on = false;
      this.emitter.on = false;
    }, [], this);

    this.scene.time
  }

}

export default Popehat;