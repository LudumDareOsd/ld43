import Enemy from "./enemy";

class Priest extends Enemy {

  constructor(x: number, y: number, scene: Phaser.Scene) {
    super(x, y, 'priest', scene);
  }

  public update(time, delta) {

  }
}

export default Priest;