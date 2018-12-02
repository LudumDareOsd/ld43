import UIGadget from "../characters/uigadget";
import UISword from "../characters/uisword";
import UISoul from "../characters/uisoul";
import UIHeart from "../characters/uiheart";

class UIHandler {

  public uiHudGroup: Phaser.GameObjects.Group;
  private sceneRef;
  private hud;

  private numSoulsToGet = 7;
  private numBulletsPlayerHas = 5;
  private numHealth = 3;
  public UI_TYPES = {
    HEART: 0,
    SKULL: 1,
    DAGGER: 2,
  };

  constructor(private scene: Phaser.Scene) {
    this.sceneRef = scene;
  }

  public create() {
    this.uiHudGroup = this.scene.physics.add.staticGroup();
  }

  init() {
    this.numSoulsToGet = Math.min(this.sceneRef.map.currentMap, 2);
  }

  refreshUI() {
    this.uiHudGroup.clear(true);

    for(var i = 0; i < this.numBulletsPlayerHas; i++) {
      console.log(i);
      let hudSword = new UIGadget(i * 30 + 40, 720-40, this.UI_TYPES.DAGGER, this.scene as any);
      this.uiHudGroup.add(hudSword.sprite);
    }

    for(var i = 0; i < this.numSoulsToGet; i++) {
      let hudSoul = new UIGadget(i * 30 + 300, 720-40, this.UI_TYPES.SKULL, this.scene as any);
      this.uiHudGroup.add(hudSoul.sprite);
    }

    for(var i = 0; i < this.numHealth; i++) {
      let hudHeart = new UIGadget(i * 30 + 845, 720-40, this.UI_TYPES.HEART, this.scene as any);
      this.uiHudGroup.add(hudHeart.sprite);
    }
  }


  public update(time, delta) {

  }

  public setDaggers(val: number) {
    this.numBulletsPlayerHas = val;
    console.log('now displaying ', this.numBulletsPlayerHas);
    this.refreshUI();
    console.log(this.uiHudGroup.getChildren());
  }
}

export default UIHandler;