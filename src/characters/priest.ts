import Enemy from "./enemy";
import GameScene from "../scenes/GameScene";
import BulletManager from "../handlers/BulletManager";

class Priest extends Enemy {

  private turnRight = Math.round(Math.random()) == 0 ? false : true;
  private doTurn = false;
  private turnCd = 100;
  private fireCd = 1500;
  private fireing = 0;

  private paralyzed = false;

  constructor(x: number, y: number, scene: GameScene) {
    super(x, y, 'priest', scene);
    this.fireManager = new BulletManager(this.scene, 'cross', 5, false, 3000, { x: 12, y: 12, width: 10, height: 6 }, this.onFire, this);
  }

  public update(time, delta) {
    this.fireing -= delta;
    this.turnCd -= delta;
    let colliderPoint;
    let colliderPointDir;

    if (this.doTurn && this.turnCd <= 0) {
      this.turnRight = !this.turnRight;
      this.turnCd = 100;
    }

    if (this.fireing < 0) {
      if (this.turnRight) {
        this.sprite.anims.play('walk', true);
        this.sprite.body.setVelocityX(50);
        colliderPoint = [this.sprite.x + 15, this.sprite.y + 32];
        colliderPointDir = [this.sprite.x + 18, this.sprite.y];
        this.sprite.flipX = true;
      } else {
        this.sprite.anims.play('walk', true);
        this.sprite.body.setVelocityX(-50);
        colliderPoint = [this.sprite.x - 15, this.sprite.y + 32];
        colliderPointDir = [this.sprite.x - 18, this.sprite.y];
        this.sprite.flipX = false;
      }

      if (!this.scene.map.collideAtPoint(colliderPoint[0], colliderPoint[1]) || this.scene.map.collideAtPoint(colliderPointDir[0], colliderPointDir[1])) {
        this.doTurn = true;
      } else {
        this.doTurn = false;
      }
    } else {
      this.sprite.body.setVelocityX(0);
    }


    this.fireManager.update(delta);
    let firecd = this.fireManager.fire(this.sprite.x + 10, this.sprite.y - 6, this.turnRight);

    if (firecd < 300) {
      this.fireing = 600;
      this.sprite.anims.play('crossfire', true);
    }

  }

  protected onDeath() {
    this.scene.enemyHandler.addSacrefice(this.sprite.x, this.sprite.y, this.turnRight);

    this.sprite.destroy();
    this.scene.enemyHandler.remove(this);
  }

  private onFire(context: any) {
  }

  
}

export default Priest;