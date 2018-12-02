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
  private animTimers = {
    turn: 0,
    jump: 0,
  };

  pew: any;
  knifehitwall: any;
  haveFired: boolean = false;

  constructor(x: number, y: number, private scene: Phaser.Scene, private cursors: any) {
    this.sceneLcl = scene;
    this.sprite = this.scene.physics.add.sprite(x, y, 'player');
    this.sprite.body.offset.x = 9;
    this.sprite.body.setSize(14, 32);
    this.sprite.setScale(2);
    this.sprite.setDepth(5);
    scene.anims.create({ key: 'idle', frames: scene.anims.generateFrameNumbers('player', { start: 2, end: 2 }), frameRate: 8, repeat: 1});
    scene.anims.create({ key: 'run', frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 5 }), frameRate: 8, repeat: 1});
    scene.anims.create({ key: 'turn', frames: scene.anims.generateFrameNumbers('player', { frames: [6] }), frameRate: 8, repeat: 1});
    scene.anims.create({ key: 'jump', frames: scene.anims.generateFrameNumbers('player', { frames: [7] }), frameRate: 16, repeat: 1});
    scene.anims.create({ key: 'jumpup', frames: scene.anims.generateFrameNumbers('player', { frames: [0] }), frameRate: 0, repeat: 0});
    scene.anims.create({ key: 'jumpdown', frames: scene.anims.generateFrameNumbers('player', { frames: [4] }), frameRate: 0, repeat: 0});
    this.knifeManager = new BulletManager(this.scene, 'knife', 5, 500, { x: 12, y: 12, width: 10, height: 6 });
    this.pew = this.sceneLcl.sound.add('player_fire_knife', { loop: false });
    this.pew.volume = 0.4;
    //this.knifehitwall = this.sceneLcl.sound.add('knife_hit', { loop: false });
    //this.knifehitwall.volume = 0.3;
    this.sprite.on('animationcomplete', (e) => {
      if (e.key === 'jump') {
        // console.log(e);
        this.sprite.body.setVelocityY(-330);
        this.jumpTimer = 330;
        this.doublejump = true;
      }
    }, scene);
  }

  public update(time: number, delta: number) {
    this.sceneLcl.physics.world.wrap(this.sprite, 8);
    this.knifeManager.update(delta);

    if (this.jumpTimer > 0) {
      this.jumpTimer -= delta;
    }

    if (this.cursors.left.isDown) {
      if (this.sprite.flipX === false && this.animTimers.turn <= 0 && this.animTimers.jump <= 0) {
        this.sprite.anims.play('turn', true);
        this.animTimers.turn = 120;
      }
      this.sprite.body.setVelocityX(-160);
      this.turnedRight = false;
      this.sprite.flipX = true;
    }
    else if (this.cursors.right.isDown) {
      if (this.sprite.flipX === true && this.animTimers.turn <= 0 && this.animTimers.jump <= 0) {
        this.sprite.anims.play('turn', true);
        this.animTimers.turn = 120;
      }
      this.sprite.body.setVelocityX(160);
      this.turnedRight = true;
      this.sprite.flipX = false;
    }
    else {
      this.sprite.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.anims.play('jump', true);
      this.animTimers.jump = 100;
    }

    if (this.cursors.up.isDown && this.jumpTimer <= 0 && this.doublejump === true  && this.animTimers.jump <= 0) {
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

    if (Math.abs(this.sprite.body.velocity.x) > 0 && this.animTimers.turn <= 0 && this.animTimers.jump <= 0) {
      this.sprite.anims.play('run', true);
    } else if (this.animTimers.turn <= 0 && this.animTimers.jump <= 0) {
      this.sprite.anims.play('idle', true);
    }
    this.animTimers.turn -= delta; this.animTimers.jump -= delta;

    if (this.sprite.body.velocity.y < 0 && this.animTimers.jump <= 0) {
      this.sprite.anims.play('jumpup', true);
    }
    else if (this.sprite.body.velocity.y > 0 && this.animTimers.jump <= 0) {
      this.sprite.anims.play('jumpdown', true);
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