import React, { Component } from 'react';
import {View,Image,Text} from 'react-native';
import { gameStyles } from './Styles';

export class PlayersPanel extends Component {
    constructor(props) {
        super(props); 
        this.state = 
            {players : [{name:"player1",gold:15, color:"blue" },
            {name:"player2",gold:15,color:"red" },
            {name:"player2",gold:16,color:"green" },
            {name:"player3",gold:17,color:"orange" }] 
        };
    }
    updateGameState(gameState) {
  }
    playerInfo(player, idx) {
        return (<View key={idx} style={{backgroundColor: player.color, width: "100%"}} >
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
