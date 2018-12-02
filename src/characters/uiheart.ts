import UiGadget from "./uigadget";
import GameScene from "../scenes/GameScene";

class UIHeart extends UiGadget {

    constructor(x: number, y: number, scene: GameScene) {
        super(x, y, 'knife', scene); // TODO Change to real img
    }

    update(time: number, delta: number) {
        
    }
}

export default UIHeart;