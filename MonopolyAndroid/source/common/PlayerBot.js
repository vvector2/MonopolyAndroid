import { Player } from "./Player";

export class PlayerBot extends Player {
    constructor(pawn,board,rgbColorString, id, name="Bot" ) {
        super(pawn,board,rgbColorString, id, name );
        this.isBot=true;
    }

    GetNextEvent(previousEvent,gameState, game) {
        if (previousEvent.name === "endMove"){
            return this.makeDecision(gameState, game);
        }else if (previousEvent.name === "endTurn"){
            return {name: "roll"};
        }else if (previousEvent.name === "buy" ||previousEvent.name === "upgrade" )
            return  {name: "endTurn"};
        return null;
    }

    makeDecision(gameState, game) {
        if(this.gold > 500 && gameState.showBuyButton)
            return {name:"buy", data:{}};
        else if(this.gold > 500 && gameState.showUpgradeButton)
           return {name:"upgrade", data:{}};
        return {name:"endTurn", data:{}};
    }
}