import React, { Component } from 'react';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import {Button, View} from 'react-native'

export default class App extends Component {

  constructor(props){
    super(props);
    this.widthCanvas= 400;
    this.heightCanvas= 400;
  }
 
  handleCanvas = (canvas) => {
    this.init(canvas);
  }
 
  init(canvas) {
    canvas.width = this.widthCanvas;
    canvas.height = this.heightCanvas;
    this.backgroundImg = new CanvasImage(canvas);
    this.backgroundImg.src= "https://image.shutterstock.com/image-photo/glitter-vintage-lights-background-gold-260nw-226746934.jpg";
    this.canvasContext = canvas.getContext("2d");
    this.backgroundImg.addEventListener('load', () => {
      this.canvasContext.drawImage(this.backgroundImg, 0, 0, this.widthCanvas,this.heightCanvas);
    });
  }

  render() {
    return (
      <View >
        <Canvas ref={this.handleCanvas}/>
        <Button title="just a button"/>
      </View>
    );
  }
}