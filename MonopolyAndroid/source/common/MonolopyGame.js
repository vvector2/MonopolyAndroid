import { Player } from "./Player";
import ImageElement from "./ImageElement";
import {dynamicImages} from "../../resource/dynamicImages";
import {MonopolyBoard} from "./MonopolyBoard";
import { GameState } from "./GameState";
import {getColorByPlayerId} from "./Helper";
import {PlayerBot} from "./PlayerBot";

const PAWN_SIZE = { w: 20, h: 30 };
const COLORS = ["rgba(255,204,0,1)", "rgba(83,253,0,1)", "rgba(253,0,41,1)", "rgba(0,255,210,1)"]
export class MonopolyGame {
    constructor(playersFromSettings,renderer, gameState) {
        this.playerList = [];
        this.renderer = renderer;
        this.board = new MonopolyBoard();
        this.numberOfPlayer = playersFromSettings.length;
        for(let i =0; i < this.numberOfPlayer ; i++) {
            let pawn = new ImageElement(i * 10, 10, PAWN_SIZE.w,PAWN_SIZE.h);
            pawn.setImage(renderer, 0,dynamicImages.pawn[i]);
            renderer.addRenderObject(pawn, 0);
            let player;
            if(playersFromSettings[i].checkedBot)
                player = new PlayerBot(pawn, this.board,COLORS[i],i);
            else player = new Player(pawn, this.board,COLORS[i],i);
            this.playerList.push(player);
        }
        this.currentPlayer = this.playerList[0];
        this.currentPlayerI =0;
        this.gameState  = gameState;
        this.gameState.playerGold = this.playerList.map(x=> x.gold);
    }

    _resolveEvent(event) {
        if(event.name == "move")
            this._movePawn(event.data);
        else if (event.name =="buy")
            this._buy();
        else if (event.name =="upgrade")
            this._upgrade();
        else if (event.name =="endTurn")
            this._endTurn();
        else if (event.name == "endMove")
            this._endMove();
        else if (event.name =="roll")
            this._roll();
    }
    _movePawn(data) {
        this.currentPlayer.moveNext(this.renderer, data.number, this.gameloop.bind(this));
    }
    _handlingPunishForPlayer(field) {
        if(field.own!=null && field.own.id !== this.currentPlayerI){
            this.currentPlayer.gold -= field.punishment; 
            field.own.gold += field.punishment;
            this.gameState.playerGold[this.currentPlayerI] = this.currentPlayer.gold;
            this.gameState.playerGold[field.own.id] = field.own.gold;   
        }
    }

    _handlingGameOver(){
        if(this.currentPlayer.gold < 0) {
            this.playerList = this.playerList.filter(p=> p.id != this.currentPlayerI);
            this.numberOfPlayer = this.playerList.length;
            if(this.numberOfPlayer==1){
                this.gameState.state = "gameOver";
                this.gameState.playerNameWin = getColorByPlayerId(this.playerList[0].id);
            }
        }
    }
    _canPlayerUpgradeField(field) {
        // return true;
        if(this.currentPlayer.gold < 200 || !field.isBuyable) {
            return false;
        }
        //If player have 3 fields in row then can upgrade
        const fieldsInRow1 = this.currentPlayer.listOfLand.filter(f => f.id >= field.id - 2 
            && f.id <= field.id).length
        const fieldsInRow2 = this.currentPlayer.listOfLand.filter(f => f.id >= field.id - 1
            && f.id <= field.id + 1).length
        const fieldsInRow3 = this.currentPlayer.listOfLand.filter(f => f.id >= field.id
                && f.id <= field.id + 2).length
        
        return Math.max(fieldsInRow1, fieldsInRow2, fieldsInRow3) === 3
    }

    _canPlayerBuyField(field) {
        return field.own == null && field.costLand <= this.currentPlayer.gold && field.isBuyable;
    }


    _endMove(){
        this.gameState.state = "action";
        const currentFieldId = this.currentPlayer.idField;
        const field =this.board.getfieldById(currentFieldId);
        this._handlingPunishForPlayer(field);
        this._handlingGameOver();
        this.gameState.showBuyButton = field.costLand <= this.currentPlayer.gold && field.isBuyable;
        this.gameState.showUpgradeButton = this._canPlayerUpgradeField(field)
        this.gameState.field = field; 
    }
    _buy() {
        const currentFieldId = this.currentPlayer.idField;
        const field = this.board.getfieldById(currentFieldId);
        
        if(!this._canPlayerBuyField(field) || this.gameState.showBuyButton === false) return false;
        
        this.currentPlayer.addNewLand(field,this.renderer);
        console.log(this.currentPlayer.gold);
        this.gameState.playerGold[this.currentPlayerI] = this.currentPlayer.gold;
        this.gameState.showBuyButton = false;
    }
    _upgrade(){
        const currentFieldId = this.currentPlayer.idField;
        const field = this.board.getfieldById(currentFieldId);
        
        if(!this._canPlayerUpgradeField(field) || this.gameState.showUpgradeButton === false) return false;
        
        this.currentPlayer.buyHouse(field,this.renderer);
        this.gameState.playerGold[this.currentPlayerI] = this.currentPlayer.gold;
        this.gameState.showUpgradeButton = false;
    }
    _endTurn(){
        this.currentPlayerI = (this.currentPlayerI + 1 ) % this.numberOfPlayer;
        this.currentPlayer = this.playerList[this.currentPlayerI];
        this.gameState.state = "roll";
    }
    
    _roll(){
        let result = 1//Math.floor((Math.random() * 11)) + 2
        if(this.currentPlayer.idField ===3 ) result = 38;
        this.gameloop({name:"move", data:{number:result }});
    }
 
    _handlingNextEvent(previousEvent){
        const nextEvent = this.currentPlayer.GetNextEvent(previousEvent, this.gameState);
        if(nextEvent!=null){
            //it put event on queue
            const gameLoopFunc = this.gameloop.bind(this);
            setTimeout(() => gameLoopFunc(nextEvent), 0);
        }
    }

    //every event from visual interface come to this place
    gameloop(event) {
        console.log("event");
        console.log(event);
        this._resolveEvent(event);
        this.gameState.update();
        this._handlingNextEvent(event);
    }

}