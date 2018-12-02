import Enemy from "./enemy";

class Priest extends Enemy {

  private turnRight = Math.round(Math.random()) == 0 ? false : true;
  private doTurn = false;

  constructor(x: number, y: number, scene: Phaser.Scene) {
    super(x, y, 'priest', scene);

    this.collider = scene.add.zone(x, y, 10, 10);
    scene.physics.world.enable(this.collider);
    this.collider.body.setAllowGravity(false);

  }

  public update(time, delta) {
    if(this.doTurn) {
      this.turnRight = !this.turnRight;
    }

    if (this.turnRight) {
      this.collider.setPosition(this.sprite.x + 20, this.sprite.y + 32);
    } else {
      this.collider.setPosition(this.sprite.x - 30 , this.sprite.y + 32);
    }

    this.doTurn = true;
  }

  public checkTurn() {
    this.doTurn = false;
  } 
}

export default Priest;