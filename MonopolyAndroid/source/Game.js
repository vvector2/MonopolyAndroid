import React, { Component } from 'react';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import {Button, View} from 'react-native';
import {canvasWidth, canvasHeight, commonStyles} from "./CommonStyles";

export default  class Game extends Component {
    constructor(props){
      super(props);
      console.log(canvasWidth);
      this.widthCanvas= canvasWidth;
      this.heightCanvas= canvasHeight;
    }
   
    handleCanvas = (canvas) => {
      this.init(canvas); 
    }
   
    init(canvas) {
      canvas.width = this.widthCanvas;
      canvas.height = this.heightCanvas;
      this.backgroundImg = new CanvasImage(canvas);
      this.backgroundImg.src= "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQubrXNrVlIKT5CDS13G4djhaUl4zE2jx2cOKT-qKk-zKRbAzNd";
      this.canvasContext = canvas.getContext("2d");
      this.backgroundImg.addEventListener('load', () => {
        this.canvasContext.drawImage(this.backgroundImg, 0, 0, this.widthCanvas,this.heightCanvas);
      });
    }
    action() {

    }

    render() {
      return (
        <View >
          <Canvas ref={this.handleCanvas}/>
          <View style={commonStyles.GameButtonsContainer}>
            <View tyle={commonStyles.GameButton}>
              <Button title="Buy"  color="silver" onPress={() => this.action()} />
            </View>
            <View tyle={commonStyles.GameButton}>
              <Button title="Not Buy"  color="silver" onPress={() => this.action()} />
            </View>
          </View>
        </View>
      );
    }
  }