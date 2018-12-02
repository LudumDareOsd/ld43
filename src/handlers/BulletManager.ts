class BulletManager {

  public bullets;
  private cd = 100;
  private firecd = 0;
  private collisionbox;
  private sceneRef;

  constructor(private scene: Phaser.Scene, private texture: string, maxSize: number, private angle: boolean, cd?: number, collisionbox?: { x: number, y: number, width: number, height: number }, private onFire?: (context: any) => void, private context?: any) {
    this.bullets = (scene.physics.add.group as any)({
      maxSize: maxSize,
      runChildUpdate: true
    });

    if (cd) {
      this.cd = cd;
      this.firecd = Math.floor((Math.random() * cd));
    }

    if (collisionbox) {
      this.collisionbox = collisionbox;
    }

    this.sceneRef = scene;
  }

  public update(delta: number) {
    this.sceneRef.physics.world.wrap(this.bullets, 0);
    if (this.firecd > 0) {
      this.firecd -= delta;
    }
  }

  public fire(x: number, y: number, right: boolean) {

    let nbrBulletsLeft = (this.bullets.maxSize - this.bullets.children.entries.length);

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
          if (this.angle) {
            bullet.angle = 90;
          }
        } else {
          bullet.setVelocityX(-400);
          if (this.angle) {
            bullet.angle = 270;
          }
        }

        if (this.collisionbox) {
          bullet.setSize(this.collisionbox.width, this.collisionbox.height, true);
          bullet.setOffset(this.collisionbox.x, this.collisionbox.y);
        }

        if (this.onFire) {
          this.onFire(this.context);
        }

        this.firecd = this.cd;
      }
    }

    return nbrBulletsLeft;
  }
}

export default BulletManager;