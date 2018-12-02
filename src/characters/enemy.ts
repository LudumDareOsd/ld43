import GameScene from "../scenes/GameScene";

abstract class Enemy {
  public sprite;
  public fireManager;
  protected hp = 1;

  constructor(protected x: number, protected y: number, texture: string, protected scene: GameScene, ) {
    this.sprite = this.scene.physics.add.sprite(x, y, texture);

    this.sprite.setScale(2);
    this.sprite.setDepth(5);
  }

  abstract update(time: number, delta: number);

  public takeDamage() {
    this.hp--;
    if (this.hp <= 0) {
      // this.scene.enemyHandler.remove(this);
    }
  }
}

export default Enemy;