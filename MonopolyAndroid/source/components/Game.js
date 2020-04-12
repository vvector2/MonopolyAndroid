import React, { Component } from 'react';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import {Button, View,ImageBackground} from 'react-native';
import {gameStyles} from "./Styles";
import {DecisionContainer} from "./DesisionContainer";
import {PlayersPanel} from "./PlayersPanel";
import {MonopolyGame } from '../common/MonolopyGame';
import {Renderer} from "./../common/Renderer";
import {canvasWidth, canvasHeight} from "./../common/Helper";
import {GameState } from "../common/GameState";


export default  class Game extends Component {
    constructor(props){
      super(props);     
      //players from option container
      this.playersFromOption =this.props.navigation.state.params.players.filter(x=> x.visibility); 
      console.log(this.playersFromOption);

      this.decisionContainer = React.createRef();
      this.playersPanel = React.createRef();
      this.passEventToGame = this.passEventToGame.bind(this);
    }
    _updateGameState(gameState){
      //console.log("game component update fields");
      //console.log(this.decisionContainer.current);
      this.decisionContainer.current.updateGameState(gameState);
      this.playersPanel.current.updateGameState(gameState);
    }

    //handling canvas
    setCanvas = c => {c.width = canvasWidth;c.height = canvasHeight;}
    handlePawnCanvas = c =>{this.setCanvas(c); this.pawnCanvas=c;this.startGame(); }
    handleLandCanvas = c =>{this.setCanvas(c); this.landCanvas=c;this.startGame(); }
    handleHouseCanvas = c =>{this.setCanvas(c); this.houseCanvas=c;this.startGame(); }

    startGame(){
      if (this.pawnCanvas != null && this.houseCanvas !=null && this.landCanvas !=null){
        const gameState  = new GameState(this._updateGameState.bind(this));
        const renderer = new Renderer(this.pawnCanvas,this.landCanvas,this.houseCanvas);
        this.game = new MonopolyGame(this.playersFromOption,renderer,gameState);
      }
    }
    passEventToGame(event) {
      this.game.gameloop(event);
    }
    render() {
      return (
        <View style={gameStyles.gameScreen}>
          <View style={gameStyles.canvasContainer}>
            <ImageBackground source={require('./../../resource/board.jpg')}  style={{width: '100%', height: '100%'}}>
              <Canvas style={gameStyles.canvas} ref={this.handlePawnCanvas} />
              <Canvas style={gameStyles.canvas} ref={this.handleLandCanvas} />
              <Canvas style={gameStyles.canvas} ref={this.handleHouseCanvas} />
            </ImageBackground>
          </View>
          <DecisionContainer ref={this.decisionContainer} parentCallback={this.passEventToGame}/>
          <PlayersPanel playersFromOption={this.playersFromOption}  ref={this.playersPanel}/>
        </View>
      );
    }
  }