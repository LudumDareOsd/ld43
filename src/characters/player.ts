import BulletManager from "../handlers/BulletManager";

class Player {

  public sprite;
  public knifeManager: BulletManager;
  private _ = this as any;
  private space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  private turnedRight = true;
  private doublejump = true;
  private jumpTimer = 0;
  private sceneLcl: Phaser.Scene;

  pew: any;
  knifehitwall: any;
  haveFired: boolean = false;

  constructor(x: number, y: number, private scene: Phaser.Scene, private cursors: any) {
    this.sceneLcl = scene;
    this.sprite = this.scene.physics.add.sprite(x, y, 'player');
    this.sprite.setScale(2);
    this.sprite.setDepth(5);
    this.knifeManager = new BulletManager(this.scene, 'knife', 5, 500, { x: 12, y: 12, width: 10, height: 6 });
    this.pew = this.sceneLcl.sound.add('player_fire_knife', { loop: false });
    this.pew.volume = 0.4;
    //this.knifehitwall = this.sceneLcl.sound.add('knife_hit', { loop: false });
    //this.knifehitwall.volume = 0.3;
  }

  public update(time: number, delta: number) {
    this.knifeManager.update(delta);

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

    if (this.space.isDown && !this.haveFired) {

      this.haveFired = true;
      let nbrBulletsLeft = 0;

      if (this.turnedRight) {
        nbrBulletsLeft = this.knifeManager.fire(this.sprite.x + 10, this.sprite.y - 6, this.turnedRight);
      } else {
        nbrBulletsLeft = this.knifeManager.fire(this.sprite.x - 10, this.sprite.y - 6, this.turnedRight);
      }

      if(nbrBulletsLeft > 0)
        this.pew.play();

    } else if(!this.space.isDown){
      this.haveFired = false;
    }
  }

  public stopKnife(knife, tile) {
    knife.setVelocityX(0);
    knife.setVelocityY(0);
    knife.setAccelerationY(300);
    //let duns = knife.scene.sound.add('knife_hit', { loop: false });
    //duns.play();
  }

}

export default Player;