import Knife from "./objects/knife";

class Player {

  public sprite;
  private _ = this as any;
  private space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  private knifes;
  private turnedRight = true;
  private doublejump = true;
  private jumpTimer = 0;

  constructor(x: number, y: number, private scene: Phaser.Scene, private cursors: any) {
    this.sprite = this.scene.physics.add.sprite(x, y, 'player');
    this.sprite.setScale(2);
    this.knifes = this.sprite.scene.physics.add.group([{
      classType: Knife,
      maxSize: 50,
      runChildUpdate: true
    }]);
  }

  public update(time: number, delta: number) {
    if (this.jumpTimer > 0) {
      this.jumpTimer -= delta;
    }

    if (this.cursors.left.isDown) {
      this.sprite.body.setVelocityX(-160);
      this.turnedRight = false;
    }
    else if (this.cursors.right.isDown) {
      this.sprite.body.setVelocityX(160);
      this.turnedRight = true;
    }
    else {
      this.sprite.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.body.setVelocityY(-330);
      this.jumpTimer = 400;
      this.doublejump = true;
    }

    if (this.cursors.up.isDown && this.jumpTimer <= 0 && this.doublejump === true) {
      this.sprite.body.setVelocityY(-330);
      this.doublejump = false;
    }

    if (this.space.isDown) {
      this.fire();
    }
  }

  private fire() {
    let knife = this.knifes.get();

    if (knife) {
      knife.fire(this.sprite.x, this.sprite.y, this.turnedRight);
    }
  }
}

export default Player;