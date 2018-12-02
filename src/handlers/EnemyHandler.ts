import Priest from "../characters/priest";

class EnemyHandler {

  public enemyGroup: Phaser.GameObjects.Group;
  public enemys = [];
  private sceneRef;

  constructor(private scene: Phaser.Scene) {
    this.sceneRef = scene;
  }

  public create() {
    this.enemyGroup = this.scene.physics.add.group();
  }

  public update(time, delta) {
    this.sceneRef.physics.world.wrap(this.enemys, 0);

    for (let enemy of this.enemys) {
      enemy.update(time, delta);
    }
  }

  public add(x, y, type: number) {

    let enemy;

    switch (type) {
      case 0: {
        enemy = new Priest(x, y, this.scene as any);
      }

      case 1: {

      }
    }

    this.enemyGroup.add(enemy.sprite);
    this.enemys.push(enemy);
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