import UiGadget from "./uigadget";
import GameScene from "../scenes/GameScene";

class UISword extends UiGadget {

    constructor(x: number, y: number, scene: GameScene) {
        super(x, y, 2, scene);
    }

    update(time: number, delta: number) {

    }
}

export default UISword;