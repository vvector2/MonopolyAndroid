import {Element} from "./Element";
import {lands} from "../../resource/dynamicImages";

export class Field extends Element {
    constructor(x,y,w,h,id){
        super(x,y,w,h);
        this.id = id;
        const land = lands[id];
        this.name =land.name;
        this.costLand = land.costLand;
        this.costOfHouse = land.costHouse;
        this.src = land.src
    }
}