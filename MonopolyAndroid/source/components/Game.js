import React, { Component } from 'react';
import Canvas, { Image as CanvasImage } from 'react-native-canvas';
import { Button, View, ImageBackground } from 'react-native';
import { gameStyles } from "./Styles";
import { DecisionContainer } from "./DesisionContainer";
import { PlayersPanel } from "./PlayersPanel";
import { MonopolyGame } from '../common/MonolopyGame';
import { Renderer } from "./../common/Renderer";
import { canvasWidth, canvasHeight, boardWidth } from "./../common/Helper";
import { GameState } from "../common/GameState";
import { GameOverComponent } from "./GameOver";
import { Dice } from "./Dice";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { gameOver: false, dices: null };
    //players from option container
    this.playersFromOption = this.props.navigation.state.params.players.filter(x => x.visibility);
    console.log(this.playersFromOption);
    this.offset = 0;
    this.decisionContainer = React.createRef();
    this.playersPanel = React.createRef();
    this.gameOverPopup = React.createRef();
    this.passEventToGame = this.passEventToGame.bind(this);
  }
  _updateGameState(gameState) {
    //console.log("game component update fields");
    //console.log(this.decisionContainer.current);
    this.decisionContainer.current.updateGameState(gameState);
    this.playersPanel.current.updateGameState(gameState);
    this.setState({ gameOver: gameState.state === "gameOver" });
    this.setState({ dices: gameState.dices })
    this.offset = Math.floor(Math.random() * 100);
    if (this.state.gameOver)
      this.gameOverPopup.current.updateGameState(gameState);
  }
  componentDidMount() {
    this.setCanvas(this.pawnCanvas);
    this.setCanvas(this.landCanvas);
    this.setCanvas(this.houseCanvas);
    this.startGame(); 
  }
  //handling canvas
  setCanvas = c => { c.width = boardWidth; c.height = boardWidth; }
  handlePawnCanvas = c => {  this.pawnCanvas = c;}
  handleLandCanvas = c => { this.landCanvas = c;}
  handleHouseCanvas = c => { this.houseCanvas = c;}

  startGame() {
    if (this.pawnCanvas != null && this.houseCanvas != null && this.landCanvas != null) {
      const gameState = new GameState(this._updateGameState.bind(this));
      const renderer = new Renderer(this.pawnCanvas, this.landCanvas, this.houseCanvas);
      this.game = new MonopolyGame(this.playersFromOption, renderer, gameState);
    }
  }
  passEventToGame(event) {
    this.game.gameloop(event);
  }
  render() {
    return (
      <View style={gameStyles.gameScreen}>
        <View style={gameStyles.canvasContainer}>
          <ImageBackground source={require('./../../resource/board.jpg')} style={{ width: boardWidth, height: boardWidth }}>
            <Canvas style={gameStyles.canvas} ref={this.handleLandCanvas} />
            <Canvas style={gameStyles.canvas} ref={this.handlePawnCanvas} />
            <Canvas style={gameStyles.canvas} ref={this.handleHouseCanvas} />
          </ImageBackground>
        </View>
        <View>
          <DecisionContainer ref={this.decisionContainer} parentCallback={this.passEventToGame} />
          {this.state.dices != null && (<Dice val={this.state.dices[0]} offset={this.offset}></Dice>)}
          {this.state.dices != null && (<Dice val={this.state.dices[1]} offset={this.offset + 50}></Dice>)}
        </View>
        <PlayersPanel playersFromOption={this.playersFromOption} ref={this.playersPanel} />
        {this.state.gameOver && (<GameOverComponent ref={this.gameOverPopup} />)}
      </View>
    );
  }
}