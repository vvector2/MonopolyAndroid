import {LandElement} from "./LandElement";

export class Player {
    constructor(pawn,board,rgbColorString) {
        this.pawn= pawn;
        this.gold = 500;
        this.board = board;
        this.idField = 0;
        this.listOfLand = [];
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

    addNewLand(field, renderer) {
        this.listOfLand.push(field);
        renderer.addRenderObject(new LandElement(field, this.rgbColorString), 1);
        renderer.render()
    }
}