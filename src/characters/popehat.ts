import Enemy from "./enemy";
import GameScene from "../scenes/GameScene";

class Popehat extends Enemy {

  constructor(x: number, y: number, scene: GameScene) {
    super(x, y, 'popehat', scene);
    scene.anims.create({ key: 'flying', frames: scene.anims.generateFrameNumbers('popehat', { start: 0, end: 7 }), frameRate: 10, repeat: -1});
    this.sprite.anims.play('flying', true);
  }

  public update(time, delta) {

    // console.log('update');
    // console.log(this.scene);
  }
}

export default Popehat;