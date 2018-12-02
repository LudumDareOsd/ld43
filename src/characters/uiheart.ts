import UiGadget from "./uigadget";
import GameScene from "../scenes/GameScene";

class UIHeart extends UiGadget {

    constructor(x: number, y: number, scene: GameScene) {
        super(x, y, 0, scene);
    }

    update(time: number, delta: number) {

    }
}

export default UIHeart;