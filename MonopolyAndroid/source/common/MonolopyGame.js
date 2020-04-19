import { Player } from "./Player";
import ImageElement from "./ImageElement";
import {dynamicImages} from "../../resource/dynamicImages";
import {MonopolyBoard} from "./MonopolyBoard";
import { GameState } from "./GameState";
import {getColorByPlayerId} from "./Helper";

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
            let player = new Player(pawn, this.board,COLORS[i],i);
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
            this._buy(event.data);
        else if (event.name =="upgrade")
            this._upgrade(event.data);
        else if (event.name =="endTurn")
            this._endTurn(event.data);
        else if (event.name == "endMove")
            this._endMove();
    }
    _movePawn(data) {
        console.log("move pawn");
        console.log(data);
        this.currentPlayer.moveNext(this.renderer, data.number, this.gameloop.bind(this));
    }
    _handlingPunishForPlayer(field) {
        if(field.own!=null && field.own.id !== this.currentPlayerI){
            this.currentPlayer.gold -= field.punishment; 
            this.gameState.playerGold[this.currentPlayerI] = this.currentPlayer.gold;
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
        if(this.currentPlayer.gold < 200 || field.isBuyable) {
            return false;
        }
        const sectorId = parseInt(field.id / 5 )
        const numberLandInSector = this.currentPlayer.listOfLand
            .filter(x=> x.id  > sectorId * 5 && x.id < (sectorId+1) *5 ).length;
        if (sectorId ===4 || sectorId ===  5){
            return numberLandInSector ===2;
        } else return numberLandInSector ===3;
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
    _buy(data) {
        console.log("buy event");
        const currentFieldId = this.currentPlayer.idField;
        const field = this.board.getfieldById(currentFieldId);
        this.currentPlayer.addNewLand(field,this.renderer);
        console.log(this.currentPlayer.gold);
        this.gameState.playerGold[this.currentPlayerI] = this.currentPlayer.gold;
        this.gameState.showBuyButton = false;
    }
    _upgrade(data){
        console.log("upgrade house");
        const currentFieldId = this.currentPlayer.idField;
        const field = this.board.getfieldById(currentFieldId);
        this.currentPlayer.buyHouse(field,this.renderer);
        this.gameState.playerGold[this.currentPlayerI] = this.currentPlayer.gold;
        this.gameState.showUpgradeButton = false;
    }
    _endTurn(data){
        console.log("end turn event");
        this.currentPlayerI = (this.currentPlayerI + 1 ) % this.numberOfPlayer;
        this.currentPlayer = this.playerList[this.currentPlayerI];
        this.gameState.state = "roll";
    }

    //every event from visual interface come to this place
    gameloop(event) {
        this._resolveEvent(event);
        this.gameState.update();
    }
}