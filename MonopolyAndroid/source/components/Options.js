import React, { Component }  from 'react';
import {View, Button, Text}  from 'react-native';
import {commonStyles, optionStyle} from "./Styles";
import LinearGradiant from 'react-native-linear-gradient';
import { CheckBox } from 'react-native-elements'

export default class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players : [ {visibility: true, checkedBot: false, playerName:"Player 1" },
      {visibility: true, checkedBot: true, playerName:"Bot 2" },
      {visibility: false, checkedBot: true, playerName:"Bot 3" },
      {visibility: false, checkedBot: true, playerName:"Bot 4" }] 
    }
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleShowUpButton = this.handleShowUpButton.bind(this);
  }
  handleCheckBox(i){
    const players = this.state.players;
    players[i].checkedBot=!players[i].checkedBot;
    players[i].playerName = (players[i].checkedBot ? "Bot " : "Player ") + (i+1);
    this.setState({players});
  }
  handleShowUpButton(i){
    const players = this.state.players;
    players[i].visibility=!players[i].visibility;
    this.setState({players});
  }
  render() {
    return (
      <LinearGradiant colors={["#a4900c", "#f4c60d"]} style= {{flex:1, alignItems:"center"}}>
        <View style={optionStyle.optionsContainer}>
          <View style={commonStyles.playerOptionContainer} >
            <Text>{this.state.players[0].playerName}</Text>
          </View>
          <View style={optionStyle.playerOptionContainer}>
            <Text>{this.state.players[1].playerName}</Text>
            <CheckBox
              title='Bot'
              checked={this.state.players[1].checkedBot}
              containerStyle={[optionStyle.checkBoxStyle, this.state.players[1].visibility ? {display:"flex"}: {display:"none"} ]}
              onPress={() =>this.handleCheckBox(1)}/>          
          </View>
          <View style={optionStyle.playerOptionContainer}>
            <Text  style={ this.state.players[2].visibility ? {display:"flex"}: {display:"none"} } >
              {this.state.players[2].playerName}
            </Text>           
            <CheckBox
              title='Bot'
              checked={this.state.players[2].checkedBot}
              containerStyle={[optionStyle.checkBoxStyle, this.state.players[2].visibility ? {display:"flex"}: {display:"none"} ]}
              onPress={() =>this.handleCheckBox(2)}/>            
            <View  style={optionStyle.primaryButton}> 
              <Button title={this.state.players[2].visibility ? "remove" : "Add" }  color="silver" onPress={()=> this.handleShowUpButton(2)}  />
            </View>
          </View>
          <View style={optionStyle.playerOptionContainer}>
            <Text style={ this.state.players[3].visibility ? {display:"flex"}: {display:"none"} } >
              {this.state.players[3].playerName}
            </Text>           
            <CheckBox
              title='Bot'
              checked={this.state.players[3].checkedBot}
              containerStyle={[optionStyle.checkBoxStyle, this.state.players[3].visibility ? {display:"flex"}: {display:"none"} ]}
              onPress={() =>this.handleCheckBox(3)}/> 
            <View style={optionStyle.primaryButton} > 
              <Button title={this.state.players[3].visibility ? "remove" : "Add" } color="silver" onPress={()=> this.handleShowUpButton(3)}  />
            </View>
          </View>
        </View>
        <View style={commonStyles.subMenuContainer}>
          <View style={commonStyles.primaryButton} >
            <Button 
            title="Back" 
            color="silver" 
            onPress={() => this.props.navigation.navigate('Menu')} />
          </View>
          <View style={commonStyles.primaryButton} >
            <Button 
            title="Play"
            color="silver" 
            onPress={() => this.props.navigation.navigate('Game', {players: this.state.players})} />
          </View>
        </View>
      </LinearGradiant>
    );
  }
}