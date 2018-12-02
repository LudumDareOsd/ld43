import Enemy from "./enemy";
import GameScene from "../scenes/GameScene";

class Popehat extends Enemy {

  private flyingsound : any;

  constructor(x: number, y: number, scene: GameScene) {
    super(x, y, 'popehat', scene);
    scene.anims.create({ key: 'flying', frames: scene.anims.generateFrameNumbers('popehat', { start: 0, end: 7 }), frameRate: 10, repeat: -1});
    this.sprite.anims.play('flying', true);
    this.flyingsound = this.scene.sound.add('popehat_flying', { loop: true, volume: 0.2 });
    this.flyingsound.play('', 0, 1, true);
  }

  public update(time, delta) {
    // console.log( this.scene.player.sprite.body.center);
    this.scene.physics.moveToObject(this.sprite, this.scene.player.sprite.body.center, 48);
  }

}

export default Popehat;