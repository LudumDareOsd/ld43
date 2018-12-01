abstract class Enemy {
  public sprite;

  constructor(x: number, y: number, texture: string, private scene: Phaser.Scene, ) {
    this.sprite = this.scene.physics.add.sprite(x, y, texture);
    this.sprite.setScale(2);
    this.sprite.setDepth(5);
  }

  abstract update(time: number, delta: number);
}

export default Enemy;