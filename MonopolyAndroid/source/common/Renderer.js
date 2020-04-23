import {canvasWidth, canvasHeight} from './Helper';

export class Renderer {
    constructor(canvasPawn,canvasLand,canvasHouse){
        this.listCanvas = [canvasPawn,canvasLand,canvasHouse];
        this.listContext = [this.listCanvas[0].getContext("2d"),
         this.listCanvas[1].getContext("2d"),
         this.listCanvas[2].getContext("2d")];
        this.items= [[],[],[]];
    }
    getCanvas(id){return this.listCanvas[id];}
    getContext(id){return this.listContext[id];}
    addRenderObject(element, zIndex) {
        this.items[zIndex].push(element);
    }
    removeRenderObject(element) {
        for(let i =0; i < 3 ;i++)
            this.items[i] = this.items[i].filter(e => e !== element)
    }
    render() {
        for(let i =0; i < 3 ;i++){
            if(this.items[i].filter(item=> item.toRender).length >0){
                //so we have items to render
                this.listContext[i].clearRect(0, 0, canvasWidth, canvasHeight);
                let itemsToRender = this.items[i];
                itemsToRender.sort((a,b) => a.y - b.y).forEach(x => x.draw(this.listContext[i]));
            }
        }
    }
}