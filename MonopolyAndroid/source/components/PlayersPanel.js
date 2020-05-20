import React, { Component } from 'react';
import {View,Image,Text} from 'react-native';
import { gameStyles } from './Styles';
import {getColorByPlayerId} from "../common/Helper";

export class PlayersPanel extends Component {
    constructor(props) {
        super(props); 
        const playersFromOption =  this.props.playersFromOption;
        const players = [];
        for(let i =0; i < playersFromOption.length ; i ++) {
          players.push({name:"player "+ String(i+1), gold:1500, color: getColorByPlayerId(i)});
        }
        this.state = {players: players};
    }
    updateGameState(gameState) {
      const players = this.state.players;
      for(let i =0; i < gameState.playerGold.length ; i ++) 
        players[i].gold = gameState.playerGold[i];
      this.setState({players: players})
    }
    playerInfo(player, idx) {
        return (<View key={idx} style={[gameStyles.playerPanel , { backgroundColor: player.color}]} >
          <Text >{player.name}</Text>
          <View style={{flexDirection:"row", justifyContent : "space-between", alignItems: "center"}}>
            <Image
                source={require('./../../resource/money.png')}></Image>
            <Text >{player.gold}</Text>
          </View>
        </View>)
    }  
    render() {
        let playersInfo = this.state.players.map((player, idx) => this.playerInfo(player, idx))
        return (<View style={gameStyles.playerPanelContainer}>
          {playersInfo}
        </View>)
    }
}
