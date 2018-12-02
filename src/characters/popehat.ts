import Enemy from "./enemy";
// import GameScene from "../scenes/GameScene";

class Popehat extends Enemy {

  constructor(x: number, y: number, scene: Phaser.Scene) {
    super(x, y, 'popehat', scene);
  }

  public update(time, delta) {
    console.log('update');
    // console.log(this.scene);
  }
}

export default Popehat;