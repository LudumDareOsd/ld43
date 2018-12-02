import Priest from "../characters/priest";

class EnemyHandler {

  public enemyGroup: Phaser.GameObjects.Group;
  public enemys = [];
  public colliderGroup: Phaser.GameObjects.Group;

  constructor(private scene: Phaser.Scene) {
  }

  public create() {
    this.enemyGroup = this.scene.physics.add.group();
    this.colliderGroup = this.scene.add.group([], {});
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

    this.enemyGroup.add(enemy.sprite);
    this.enemys.push(enemy);
    this.colliderGroup.add(enemy.collider)
  }

  public update(time, delta) {
    for(let enemy of this.enemys) {
      enemy.update(time, delta);
    }
  }

  
  public onTurn(enemy, tile) {
    enemy.checkTurn();
  }
}

export default EnemyHandler;