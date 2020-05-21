import {LandElement} from "./LandElement";
import ImageElement from "./ImageElement";
import {HOUSE_SIZE} from "./MonopolyBoard";
import {dynamicImages} from "../../resource/dynamicImages";

export class Player {
    constructor(pawn,board,rgbColorString, id, name = "Player" ) {
        this.pawn= pawn;
        this.gold = 1500;
        this.board = board;
        this.idField = 0;
        this.listOfLand = [];
        this.id = id;
        this.rgbColorString = rgbColorString // rgb string color
        this.isBot=false;
        this.name = name;
    }
    moveNext(renderer,n, endCallack) {
        if(n==0) {
            console.log("it is time for callback");
            endCallack({name:"endMove", data:{}});
            return;
        }
        this.pawn.toRender = true;
        this.idField = (this.idField + 1 ) %40;
        const cord = this.board.getFieldCenter(this.idField);
        
        const addToX = -5 + this.id % 2 * 10 + this.id;
        const addToY = -10 + parseInt(this.id / 2) * 10;
        this.pawn.x = parseInt(cord.x - (this.pawn.w /2) + addToX);
        this.pawn.y = parseInt(cord.y - (this.pawn.h /2) + addToY);

        //console.log("render x y:" + String(this.pawn.x)+ String(this.pawn.y))
        renderer.render()
        setTimeout(() => this.moveNext(renderer, n-1 ,endCallack), 500)
    }

    addNewLand(field, renderer ) {
        this.listOfLand.push(field);
        field.own = this;
        field.punishment = field.costLand;
        this.gold = this.gold -field.costLand;
        renderer.addRenderObject(new LandElement(field, this.rgbColorString), 1);
        renderer.render()
    }

    async buyHouse(field, renderer){
        console.log("buying a house");
        field.punishment += field.costLand;
        this.gold-= 200;

        const cord = this.board.getHouseCoord(field.id);
        const imageElm = new ImageElement(cord.x, cord.y , HOUSE_SIZE.w, HOUSE_SIZE.h);
        await imageElm.setImage(renderer,2,dynamicImages.house[this.id]);
        renderer.addRenderObject(imageElm,2)
        renderer.render()
    }
    GetNextEvent(previousEvent,gameState,game) {return null};
}