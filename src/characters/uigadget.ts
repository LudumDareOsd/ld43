import GameScene from "../scenes/GameScene";

export class UiGadget {
  public sprite;

  constructor(protected x: number, protected y: number, frame: number, protected scene: GameScene, ) {
    this.sprite = this.scene.add.sprite(x, y, 'ui', frame);

    this.sprite.setScale(2);
    this.sprite.setDepth(5);
  }
}

export default UiGadget;