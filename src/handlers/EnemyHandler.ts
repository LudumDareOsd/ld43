import Priest from "../characters/priest";

class EnemyHandler {

  public enemys: Phaser.GameObjects.Group;

  constructor(private scene: Phaser.Scene) {
  }

  public create() {
    this.enemys = this.scene.physics.add.group();
  }

  public add(x, y, type: number) {

    let enemy;

    switch(type) {
      case 0: {
        enemy = new Priest(x, y, this.scene);
      }

      case 1: {

      }
    }

    this.enemys.add(enemy.sprite);
  }
}

export default EnemyHandler;