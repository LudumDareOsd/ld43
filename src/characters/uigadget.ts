import GameScene from "../scenes/GameScene";

export class UiGadget {
  public sprite;

  constructor(protected x: number, protected y: number, texture: string, protected scene: GameScene, ) {
    this.sprite = this.scene.add.sprite(x, y, texture);

    this.sprite.setScale(2);
    this.sprite.setDepth(5);
  }
}

export default UiGadget;