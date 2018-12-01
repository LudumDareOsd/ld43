class Knife extends Phaser.GameObjects.Sprite {
  private _ = this as any;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'knife');
  }

  public update(time: number, delta: number) {
  }

  public fire(x: number, y: number, right: boolean) {
    
  }
}

export default Knife;