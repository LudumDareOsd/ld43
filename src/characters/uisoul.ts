import UiGadget from "./uigadget";
import GameScene from "../scenes/GameScene";

class UISoul extends UiGadget {

    constructor(x: number, y: number, scene: GameScene) {
        super(x, y, 1, scene);
    }

    update(time: number, delta: number) {

    }
}

export default UISoul;