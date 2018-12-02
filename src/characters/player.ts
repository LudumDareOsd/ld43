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
  private hp = 5;
  private animTimers = {
    turn: 0,
    jump: 0,
  };

  pew: any;
  knifehitwall: any;
  haveFired: boolean = false;
  jumpsound: any;
  hurtsound: any;
  diesound: any;

  constructor(x: number, y: number, private scene: Phaser.Scene, private cursors: any) {
    this.sceneLcl = scene;
    this.sprite = this.scene.physics.add.sprite(x, y, 'player');
    this.sprite.body.offset.x = 9;
    this.sprite.body.setSize(14, 32);
    this.sprite.setScale(2);
    this.sprite.setDepth(6);
    scene.anims.create({ key: 'sacrefice', frames: scene.anims.generateFrameNumbers('player', { frames: [0, 10, 11] }), frameRate: 4, repeat: 0});
    this.knifeManager = new BulletManager(this.scene, 'knife', 5, true, 500, { x: 12, y: 12, width: 10, height: 6 }, this.onFire, this);
    this.pew = this.sceneLcl.sound.add('player_fire_knife', { loop: false });
    this.pew.volume = 0.4;
    this.jumpsound = this.sceneLcl.sound.add('player_jump', { loop: false, volume: 0.3 });
    this.jumpsound.volume = 0.3;
    this.hurtsound = this.sceneLcl.sound.add('player_hurt', { loop: false, volume: 0.8 });
    this.diesound = this.sceneLcl.sound.add('player_death', { loop: false, volume: 0.8 });
    //this.knifehitwall = this.sceneLcl.sound.add('knife_hit', { loop: false });
    //this.knifehitwall.volume = 0.3;
    this.sprite.on('animationcomplete', (e) => {
      if (e.key === 'jump') {
        this.sprite.body.setVelocityY(-330);
        this.jumpTimer = 330;
        this.doublejump = true;
        this.jumpsound.play();
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
      // animationcomplete will trigger the actual jump
      this.sprite.anims.play('jump', true);
      this.animTimers.jump = 100;
    }

    if (this.cursors.up.isDown && this.jumpTimer <= 0 && this.doublejump === true && this.animTimers.jump <= 0) {
      this.sprite.body.setVelocityY(-330);
      this.doublejump = false;
      this.jumpsound.play();
    }

    if (this.space.isDown && !this.haveFired) {

      this.haveFired = true;

      if (this.turnedRight) {
        this.knifeManager.fire(this.sprite.x + 10, this.sprite.y - 6, this.turnedRight);
      } else {
        this.knifeManager.fire(this.sprite.x - 10, this.sprite.y - 6, this.turnedRight);
      }

    } else if (!this.space.isDown) {
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
    knife.setAccelerationY(600);
    //let duns = knife.scene.sound.add('knife_hit', { loop: false });
    //duns.play();
  }

  public sacrefice(player, sacrefice) {
    console.log("sacrefice");
    player.sprite.anims.play('sacrefice');
  }

  public takeDamage() {
    this.hp--;
    this.hurtsound.play();
  }

  public died() {
    this.diesound.play();
  }

  public onFire(context) {
    context.pew.play();
  }

}

export default Player;