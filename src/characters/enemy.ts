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

  protected abstract onDeath();

  public takeDamage() {
    this.hp--;
<<<<<<< HEAD

    if(this.hp <= 0) {
      this.onDeath();
=======
    if (this.hp <= 0) {
      // this.scene.enemyHandler.remove(this);
>>>>>>> ea3f6524c89a76d6df19714a7ab458b7855d5a8a
    }
  }
}

export default Enemy;