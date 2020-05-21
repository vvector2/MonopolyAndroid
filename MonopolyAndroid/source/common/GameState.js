import {lands} from "../../resource/dynamicImages";
//
export class GameState {
    constructor(updateCallback) {
        this.state = "roll";
        this.playerGold = [];
        this.field = lands[0];
        this.showBuyButton = false;
        this.showUpgradeButton = false;
        this.updateCallback=updateCallback;
        this.playerNameWin = "";
        this.showActions = true;
        this.currentPlayerI = 0;
        this.dices = null;
    }
    update() {
        this.updateCallback(this);
    }
}