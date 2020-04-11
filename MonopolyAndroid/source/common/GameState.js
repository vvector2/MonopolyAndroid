import {lands} from "../../resource/dynamicImages";
//
export class GameState {
    constructor(updateCallback) {
        this.state = "roll";
        this.playerGold = [100, 100, 100,100];
        this.field = lands[0];
        this.updateCallback=updateCallback;
    }
    update() {
        this.updateCallback(this);
    }
}