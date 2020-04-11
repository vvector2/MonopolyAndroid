import { Image as CanvasImage } from 'react-native-canvas';
import {Element} from "./Element";

class ImageElement extends Element {    
    constructor(x,y,w,h) {
        super(x,y,w,h);
        this.toRender = true;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
        this.toRender = false;
    }
    async setImage(renderer,canvasId, image) {
        this.canvas = renderer.getCanvas(canvasId);
        this.image = new CanvasImage(this.canvas, this.w, this.h);
        await new Promise(resolve => {
            this.image.addEventListener('load', () => {
                resolve(true);
                this.draw(renderer.getContext(canvasId))
            });
            this.image.src = image;
        });  
    }
}
export default ImageElement;
