import { Player } from "./Player";
import ImageElement from "./ImageElement";
import {dynamicImages} from "../../resource/dynamicImages";
import {MonopolyBoard} from "./MonopolyBoard";
import { GameState } from "./GameState";

const PAWN_SIZE = { w: 20, h: 30 };
const COLORS = ["rgba(255,204,0,1)", "rgba(83,253,0,1)", "rgba(253,0,41,1)", "rgba(0,255,210,1)"]
export class MonopolyGame {
    constructor(playersFromSettings,renderer, gameState) {
        this.playerList = [];
        this.renderer = renderer;
        this.board = new MonopolyBoard();
        for(let i =0; i < playersFromSettings.length ; i++) {
            let pawn = new ImageElement(i * 10, 10, PAWN_SIZE.w,PAWN_SIZE.h);
            pawn.setImage(renderer, 0,dynamicImages.pawn[i]);
            renderer.addRenderObject(pawn, 0);
            let player = new Player(pawn, this.board,COLORS[i]);
            this.playerList.push(player);
        }
        this.currentPlayer = this.playerList[0];
        this.currentPlayerI =0;
        this.gameState  = gameState;
    }

    _resolveEvent(event) {
        if(event.name == "move")
            this._movePawn(event.data);
        else if (event.name =="buy")
            this._buy(event.data);
        else if (event.name =="upgrade")
            this._upgrade(event.data);
        else if (event.name =="endturn")
            this._endTurn(event.data);
        else if (event.name == "endMove")
            this._endMove();
    }
    _movePawn(data) {
        console.log("move pawn");
        console.log(data);
        this.currentPlayer.moveNext(this.renderer, data.number, this.gameloop.bind(this));
    }
    _endMove(){
        this.gameState.state = "action";
        const currentFieldId = this.currentPlayer.idField;
        this.gameState.field = this.board.getfieldById(currentFieldId);
        this.gameState.update();
    }
    _buy(data) {
        console.log("buy event");
        const currentFieldId = this.currentPlayer.idField;
        const field = this.board.getfieldById(currentFieldId);
        this.currentPlayer.addNewLand(field,this.renderer);
    }
    _upgrade(data){

    }
    _endTurn(data){

    }

    //every event from visual interface and render come to this place
    gameloop(event) {
        this._resolveEvent(event);
    }
}