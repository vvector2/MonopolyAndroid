import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { gameStyles } from './Styles';
import { getColorByPlayerId } from "../common/Helper";

export class PlayersPanel extends Component {
  constructor(props) {
    super(props);
    const playersFromOption = this.props.playersFromOption;
    const players = [];
    const changes = [0, 0, 0, 0];
    for (let i = 0; i < playersFromOption.length; i++) {
      players.push({ name: playersFromOption[i].playerName, gold: 1500, color: getColorByPlayerId(i) });
    }
    this.state = { players: players, changes: changes };
    console.log(this.state);
  }
  updateGameState(gameState) {
    const currentPlayerI = gameState.currentPlayerI;
    const players = this.state.players;
    const changes = [];
    for (let i = 0; i < gameState.playerGold.length; i++) {
      changes[i] = gameState.playerGold[i] - players[i].gold;
      players[i].gold = gameState.playerGold[i];
    }
    this.setState({ players: players, changes: changes, currentPlayerI: currentPlayerI })
    setTimeout(() => {
      this.hideIncomeInfo()
    }, 2000);
  }

  hideIncomeInfo() {
    const changes = [0, 0, 0, 0];
    this.setState({ changes: changes });
  }

  playerInfo(player, idx) {
    let bgColor = "rgba(55,55,55,0.3)";
    if(idx == this.state.currentPlayerI) bgColor = "rgba(155,155,155,0.2)"
    return (<View key={idx} style={[gameStyles.playerPanel, { padding: 5, borderRadius: 3, backgroundColor: bgColor}]} >
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 20, height: 20, borderRadius: 5, marginRight: 5, backgroundColor: getColorByPlayerId(idx) }}></View>
        <Text >{player.name}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Image
          source={require('./../../resource/money.png')}></Image>
        <Text >{player.gold}
        </Text>
        {this.state.changes[idx] < 0 &&
          <Text style={{ color: "red", position: "absolute", top: 15, left: 60, zIndex: 10, }}>
            {this.state.changes[idx]}</Text>}
        {this.state.changes[idx] > 0 &&
          <Text style={{ color: "green", position: "absolute", top: -5, left: 40, zIndex: 10, }}>
            {"+" + this.state.changes[idx]}</Text>}
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
