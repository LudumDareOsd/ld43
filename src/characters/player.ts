import Knife from "./objects/knife";

class Player extends Phaser.GameObjects.Sprite {

  private _ = this as any;
  private space = this._.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  private knifes = this._.scene.physics.add.group({
    classType: Knife,
    maxSize: 50,
    runChildUpdate: true
  });
  private turnedRight = true; 

  constructor(scene: Phaser.Scene, x: number, y: number, private cursors: any) {
    super(scene, x, y, '');
  }

  public update(time: number, delta: number) {

    if (this.cursors.left.isDown) {
      this._.body.setVelocityX(-160);
    }
    else if (this.cursors.right.isDown) {
      this._.body.setVelocityX(160);
    }
    else {
      this._.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this._.body.touching.down) {
      this._.body.setVelocityY(-330);
    }

    if (this.space.isDown) {
      this.fire();
    }

    super.update(time, delta);
  }

  private fire() {
    let knife = this.knifes.get();

    if (knife) {
      knife.fire(this.x, this.y);
    }
  }
}

export default Player;