import { Player } from "./Player";
import ImageElement from "./ImageElement";
import { dynamicImages } from "../../resource/dynamicImages";
import { MonopolyBoard } from "./MonopolyBoard";
import { GameState } from "./GameState";
import { getColorByPlayerId } from "./Helper";
import { PlayerBot } from "./PlayerBot";
var Sound = require('react-native-sound');

const PAWN_SIZE = { w: 20, h: 30 };
export class MonopolyGame {
    constructor(playersFromSettings, renderer, gameState) {
        this.doubleTurn = false;
        this.gameOver = false;
        var gameSound = new Sound('menu.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            gameSound.setNumberOfLoops(-1).play();
        });
        this.playerList = [];
        this.renderer = renderer;
        this.board = new MonopolyBoard();
        this.numberOfPlayer = playersFromSettings.length;
        for (let i = 0; i < this.numberOfPlayer; i++) {
            let pawn = new ImageElement(i * 10, 10, PAWN_SIZE.w, PAWN_SIZE.h);
            pawn.setImage(renderer, 0, dynamicImages.pawn[i]);
            renderer.addRenderObject(pawn, 0);
            let player;
            if (playersFromSettings[i].checkedBot)
                player = new PlayerBot(pawn, this.board, getColorByPlayerId(i), i, playersFromSettings[i].playerName);
            else player = new Player(pawn, this.board, getColorByPlayerId(i), i, playersFromSettings[i].playerName);
            this.playerList.push(player);
        }
        this.currentPlayer = this.playerList[0];
        this.currentPlayerI = 0;
        this.gameState = gameState;
        this.gameState.playerGold = this.playerList.map(x => x.gold);
        console.log(playersFromSettings)
    }

    _resolveEvent(event) {
        if (event.name == "move")
            this._movePawn(event.data);
        else if (event.name == "buy")
            this._buy();
        else if (event.name == "upgrade")
            this._upgrade();
        else if (event.name == "endTurn")
            this._endTurn();
        else if (event.name == "endMove")
            this._endMove();
        else if (event.name == "roll")
            this._roll();
    }
    _movePawn(data) {
        this.currentPlayer.moveNext(this.renderer, data.number, this.gameloop.bind(this));
    }
    _handlingPunishForPlayer(field) {
        if (field.own != null && field.own.id !== this.currentPlayerI) {
            this._addGoldToPlayer(this.currentPlayer, -1 * field.punishment)
            this._addGoldToPlayer(field.own, field.punishment)
        }
    }

    _handlingSpecialFields(field) {
        if (field.id === 10) this._addGoldToPlayer(this.currentPlayer, -1 * Math.floor(Math.random() * 200 + 100));
        if (field.id === 20) this.doubleTurn = true;
        if (field.id === 30) this._addGoldToPlayer(this.currentPlayer, Math.floor(Math.random() * 200 + 100));
    }

    _addGoldToPlayer(player, gold) {
        player.gold += Math.floor(gold);
        this.gameState.playerGold[player.id] = Math.floor(player.gold);
    }



    _handlingGameOver(player) {
        if (player.gold < 0) {
            this.playerList = this.playerList.filter(p => p.id != player.id);
            this.currentPlayerI = (this.currentPlayerI - 1);
            this.numberOfPlayer = this.playerList.length;
            this.renderer.removeRenderObject(player.pawn)
            if (this.numberOfPlayer == 1) {
                this.gameOver = true;
                this.gameState.state = "gameOver";
                this.gameState.playerNameWin = this.playerList[0].name;
            }
        }
    }
    _canPlayerUpgradeField(field) {
        // return true;
        if (this.currentPlayer.gold < 200 || !field.isBuyable) {
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


    _endMove() {
        this.gameState.state = "action";
        const currentFieldId = this.currentPlayer.idField;
        const field = this.board.getfieldById(currentFieldId);
        this._handlingPunishForPlayer(field);
        this._handlingGameOver(this.currentPlayer);
        this.gameState.showBuyButton = field.costLand <= this.currentPlayer.gold &&
            field.isBuyable &&
            !this.playerList.filter(x => x.listOfLand.filter(x => x.id === currentFieldId).length > 0).length > 0;
        this.gameState.showUpgradeButton = this._canPlayerUpgradeField(field)
        this.gameState.field = field; 
        this.gameState.showActions = !this.currentPlayer.isBot;
        this._handlingSpecialFields(field);
    }
    _buy() {
        const currentFieldId = this.currentPlayer.idField;
        const field = this.board.getfieldById(currentFieldId);
        
        if(!this._canPlayerBuyField(field) || this.gameState.showBuyButton === false) return false;
        
        this.currentPlayer.addNewLand(field,this.renderer);
        this.gameState.playerGold[this.currentPlayerI] = this.currentPlayer.gold;
        this.gameState.showBuyButton = false;
    }
    _upgrade() {
        const currentFieldId = this.currentPlayer.idField;
        const field = this.board.getfieldById(currentFieldId);

        if (!this._canPlayerUpgradeField(field) || this.gameState.showUpgradeButton === false) return false;

        this.currentPlayer.buyHouse(field, this.renderer);
        this.gameState.playerGold[this.currentPlayerI] = this.currentPlayer.gold;
        this.gameState.showUpgradeButton = false;
    }
    _endTurn() {
        if (this.doubleTurn) {
            this.doubleTurn = false;
        } else {
            this.currentPlayerI = (this.currentPlayerI + 1) % this.numberOfPlayer;
            this.currentPlayer = this.playerList[this.currentPlayerI];
            this.gameState.currentPlayerI = this.currentPlayerI;
        }
        //current player will be player for the next turn
        if(!this.currentPlayer.isBot)
            this.gameState.state = "roll";
        this.gameState.showActions = !this.currentPlayer.isBot;
    }

    _roll() {
        let d1 = Math.floor((Math.random() * 6)) + 1
        let d2 = Math.floor((Math.random() * 6)) + 1
        const gameLoopFunc = this.gameloop.bind(this)
        if (!this.currentPlayer.isBot) {
            this.gameState.dices = [d1, d2];
            this.gameState.update();
            setTimeout(() => {
                this.gameState.dices = null;
                this.gameloop({ name: "move", data: { number: d1 + d2 } });
            }, 3000);
        } else {
        setTimeout(() => gameLoopFunc({name:"move", data:{number:d1 + d2 }}), 0);
        //disabling action
        }
        this.gameState.showActions = false;
    }

    _handlingNextEvent(previousEvent) {
        const nextEvent = this.currentPlayer.GetNextEvent(previousEvent, this.gameState, this);
        if (nextEvent != null) {
            //it put event on queue

            const gameLoopFunc = this.gameloop.bind(this);
            setTimeout(() => gameLoopFunc(nextEvent), 0);
        }
    }

    //every event from visual interface come to this place
    gameloop(event) {
        if (this.gameOver)
            return 0;
        //console.log('event')
        //console.log(event)
        this._resolveEvent(event);
        //console.log(this.gameState)
        this.gameState.update();
        this._handlingNextEvent(event);
    }

}