class BulletManager {

  public bullets;
  private cd = 100;
  private firecd = 0;
  private collisionbox;

  constructor(private scene: Phaser.Scene, private texture: string, maxSize: number, cd?: number, collisionbox?: { x: number, y: number, width: number, height: number}) {
    this.bullets = (scene.physics.add.group as any)({
      maxSize: maxSize,
      runChildUpdate: true
    });

    if (cd) {
      this.cd = cd;
    }

    if(collisionbox) {
      this.collisionbox = collisionbox;
    }
  }

  public update(delta: number) {
    if (this.firecd > 0) {
      this.firecd -= delta;
    }
  }

  public fire(x: number, y: number, right: boolean) {

    if (this.firecd <= 0) {
      const bullet = this.bullets.get();

      if (bullet) {

        bullet.x = x;
        bullet.y = y;
        bullet.setTexture(this.texture);
        bullet.body.setAllowGravity(false);
        bullet.setScale(2);
        bullet.setBounceX(0);
        bullet.setBounceY(0);

        if (right) {
          bullet.setVelocityX(400);
          bullet.angle = 90;
        } else {
          bullet.setVelocityX(-400);
          bullet.angle = 270;
        }

        if(this.collisionbox) {
          bullet.setSize(this.collisionbox.width, this.collisionbox.height, true);
          bullet.setOffset(this.collisionbox.x, this.collisionbox.y);
        }

        this.firecd = this.cd;
      }
    }
  }
}

export default BulletManager;