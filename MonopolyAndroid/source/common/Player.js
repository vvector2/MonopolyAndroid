import {LandElement} from "./LandElement";
import ImageElement from "./ImageElement";
import {HOUSE_SIZE} from "./MonopolyBoard";
import {dynamicImages} from "../../resource/dynamicImages";

export class Player {
    constructor(pawn,board,rgbColorString, id ) {
        this.pawn= pawn;
        this.gold = 1500;
        this.board = board;
        this.idField = 0;
        this.listOfLand = [];
        this.id = id;
        this.rgbColorString = rgbColorString // rgb string color
    }
    moveNext(renderer,n, endCallack) {
        //console.log("move next data: " + String(n));
        if(n==0) {
            endCallack({name:"endMove", data:{}});
            return;
        }
        this.pawn.toRender = true;
        this.idField = (this.idField + 1 ) %40;
        const cord = this.board.getFieldCenter(this.idField);
        console.log("cord: ");
        console.log(cord);
        this.pawn.x = cord.x - (this.pawn.w /2);
        this.pawn.y = cord.y - (this.pawn.h /2);
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
    buyHouse(field, renderer){
        console.log("buying a house");
        field.punishment += field.costLand;
        this.gold-= 200;

        const cord = this.board.getHouseCoord(field.id);
        const imageElm = new ImageElement(cord.x, cord.y , HOUSE_SIZE.w, HOUSE_SIZE.h);
        imageElm.setImage(renderer,2,dynamicImages.house[this.id]);
        renderer.addRenderObject(imageElm,2)
        renderer.render()
    }
}