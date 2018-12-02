import UiGadget from "./uigadget";
import GameScene from "../scenes/GameScene";

class UISoul extends UiGadget {

    constructor(x: number, y: number, scene: GameScene) {
        super(x, y, 'cross', scene); // TODO Change to real img
    }

    update(time: number, delta: number) {
        
    }
}

export default UISoul;