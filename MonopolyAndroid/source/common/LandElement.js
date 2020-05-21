import {Element} from "./Element";

export class LandElement extends Element {
    constructor(field,rgbColorStr) {
        super(field.x,field.y,field.w,field.h);
        this.toRender = true;
        this.rgbColorStr = rgbColorStr;
    }
    draw(context) {
        let opacityColor = this.rgbColorStr.substring(0, this.rgbColorStr.length - 2) + "0.5)";
        context.fillStyle = opacityColor;
        context.fillRect(this.x, this.y, this.w, this.h)
        this.toRender = false;
    }
}