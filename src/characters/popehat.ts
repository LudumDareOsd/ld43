import Enemy from "./enemy";
import GameScene from "../scenes/GameScene";

class Popehat extends Enemy {

  private flyingsound : any;
  private emitter: any;
  private particles: any;

  constructor(x: number, y: number, scene: GameScene) {
    super(x, y, 'popehat', scene);
    this.sprite.anims.play('flying', true);
    this.sprite.body.setAllowGravity(false);
    this.flyingsound = this.scene.sound.add('popehat_flying', { loop: true, volume: 0.2 });
    this.flyingsound.play('', 0, 1, true);
    this.particles = scene.add.particles('cross');
    this.particles.setDepth(22);
    this.emitter = this.particles.createEmitter({
      speed: { min: 30, max: 50 },
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
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
  }

}

export default Popehat;