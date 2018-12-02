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

  constructor(private scene: Phaser.Scene) {
    this.sceneRef = scene;
  }

  public create() {
    this.uiHudGroup = this.scene.physics.add.staticGroup();

    for(var i = 0; i < this.numBulletsPlayerHas; i++) {
        let hudSword = new UISword(i * 30 + 100, 650, this.scene as any);
        this.uiHudGroup.add(hudSword.sprite);
    }

    for(var i = 0; i < this.numSoulsToGet; i++) {
        let hudSoul = new UISoul(i * 30 + 300, 650, this.scene as any);
        this.uiHudGroup.add(hudSoul.sprite);
    }

    for(var i = 0; i < this.numHealth; i++) {
        let hudHeart = new UIHeart(i * 30 + 500, 650, this.scene as any);
        this.uiHudGroup.add(hudHeart.sprite);
    }
    
  }

  public update(time, delta) {
    /*this.sceneRef.physics.world.wrap(this.enemys, 0);

    for (let enemy of this.enemys) {
      enemy.update(time, delta);
    }*/
  }
}

export default UIHandler;