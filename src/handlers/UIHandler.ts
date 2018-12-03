import UIGadget from "../characters/uigadget";

class UIHandler {

  public uiHudGroup: Phaser.GameObjects.Group;
  private sceneRef;
  private hud;

  public numSoulsToGet = 7;
  private currentSouls = 0;
  private numBulletsPlayerHas = 5;
  private numHealth = 3;
  private grayfilter: any;
  public UI_TYPES = {
    HEART: 0,
    SKULL: 1,
    GRAYSKULL: 2,
    DAGGER: 3,
  };

  constructor(private scene: Phaser.Scene) {
    this.sceneRef = scene;
  }

  public create() {
    this.uiHudGroup = this.scene.physics.add.staticGroup();
    this.init();
  }

  init(stg?:number) {
    this.currentSouls = 0;
    this.numSoulsToGet = stg ? stg : Math.max(Math.floor(this.sceneRef.map.currentMap * 1.5), 3);
  }

  refreshUI() {
    this.uiHudGroup.clear(true);

    for(var i = 0; i < this.numBulletsPlayerHas; i++) {
      let hudSword = new UIGadget(i * 30 + 40, 720-40, this.UI_TYPES.DAGGER, this.scene as any);
      this.uiHudGroup.add(hudSword.sprite);
    }

    for(var i = 0; i < this.numSoulsToGet; i++) {
      let hudSoul;
      if (i < this.currentSouls) {
        hudSoul = new UIGadget(i * 40 + 300, 720-40, this.UI_TYPES.SKULL, this.scene as any);
      } else {
        hudSoul = new UIGadget(i * 40 + 300, 720-40, this.UI_TYPES.GRAYSKULL, this.scene as any);
      }
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
    this.refreshUI();
  }

  // returns true if reached the current limit or increases the soulscounter
  public increaseSouls() {
    this.currentSouls++;
    this.refreshUI();
    if (this.currentSouls >= this.numSoulsToGet) {
      return true;
    }
    return false;
  }
}

export default UIHandler;