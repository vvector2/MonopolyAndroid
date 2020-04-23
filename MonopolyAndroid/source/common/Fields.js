import {Element} from "./Element";
import {lands} from "../../resource/dynamicImages";

export class Field extends Element {
    constructor(x,y,w,h,id){
        super(x,y,w,h);
        this.id = id;
        const land = lands[id];
        this.name =land.name;
        this.src = land.src
        this.punishment = 0;
        this.isBuyable = false;
    }
}
export class FieldLand extends Field {
    constructor(x,y,w,h,id) {
        super(x,y,w,h,id);
        this.punishment = 0;
        this.costLand = parseInt(100 + Math.random() * 20 * (Math.random() > 0.5 ? -1 : 1) );
        this.own = null;
        this.isBuyable = true;
    }
}

export class FieldFactory{
    notBuyAbleLands = [0,10,20,30]
    getField(x,y,w,h,id){
        if(!this.notBuyAbleLands.includes(id)) return new FieldLand(x,y,w,h,id);
        else return new Field(x,y,w,h,id);
    }
}