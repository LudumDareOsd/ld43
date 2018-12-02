import Enemy from "./enemy";

class Priest extends Enemy {

  private turnRight = Math.round(Math.random()) == 0 ? false : true;
  private doTurn = false;
  private turnCd = 100;

  constructor(x: number, y: number, scene: Phaser.Scene) {
    super(x, y, 'priest', scene);

    this.collider = scene.add.zone(x, y, 10, 10);
    scene.physics.world.enable(this.collider);
    this.collider.body.setAllowGravity(false);
  }

  public update(time, delta) {
    this.turnCd -= delta;
    
    if(this.doTurn && this.turnCd <= 0) {
      this.turnRight = !this.turnRight;
      this.turnCd = 100;
    }

    if (this.turnRight) {
      this.sprite.body.setVelocityX(50);
      this.collider.setPosition(this.sprite.x + 20, this.sprite.y + 32);
      this.collider.body.setVelocityX(1);
      this.sprite.flipX = true;
    } else {
      this.sprite.body.setVelocityX(-50);
      this.collider.setPosition(this.sprite.x - 30 , this.sprite.y + 32);
      this.collider.body.setVelocityX(1);
      this.sprite.flipX = false;
    }

    this.doTurn = true;
  }

  public checkTurn() {
    this.doTurn = false;
  } 
}

export default Priest;