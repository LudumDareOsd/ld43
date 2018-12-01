class Knife extends Phaser.GameObjects.Sprite {
  private _ = this as any;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');
  }

  fire(x: number, y: number, right: boolean) {
    this._.body.allowGravity = false;
    if (right) {
      this._.body.setVelocityX(400);
    } else {
      this._.body.setVelocityX(-400);
    }

    this._.x = x;
    this._.y = y;
  }
}

export default Knife;