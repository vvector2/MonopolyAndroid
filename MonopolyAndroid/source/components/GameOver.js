import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { Button} from 'react-native-elements';
import {gameStyles} from "./Styles";

export class GameOverComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {playerName : "null"};
    }
    updateGameState(gameState) {
        this.setState({playerName: gameState.playerNameWin});
    }
    render() {
        return (
            <View style={gameStyles.gameOverPopup}>
                <Text>Player {this.state.playerName} Win !</Text>
            </View>
        );
    }
}