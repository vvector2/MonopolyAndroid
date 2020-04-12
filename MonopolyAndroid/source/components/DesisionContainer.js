import React, { Component } from 'react';
import {View,Text,Image} from 'react-native';
import { gameStyles } from './Styles';
import { Button} from 'react-native-elements';
import {lands} from "../../resource/dynamicImages";

export class DecisionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roll : true ,
            number : 1,
            imgSource: lands[0].src,
            name: lands[0].name};

        this.buyEvent = this.buyEvent.bind(this);
        this.upgradeEvent = this.upgradeEvent.bind(this);
        this.endTurnEvent = this.endTurnEvent.bind(this);
        this.rollEvent = this.rollEvent.bind(this);  
    }
    updateGameState(gameState) {
        console.log("update game state in decision container");
        console.log(gameState);
        this.setState({
            roll: gameState.state =="roll",
            imgSource: gameState.field.src,
            name: gameState.field.name,
            cost: gameState.field.costLand,
            showUpgradeButton:gameState.showUpgradeButton,
            showBuyButton: gameState.showBuyButton});
    }
    buyEvent(){
        this.props.parentCallback({name:"buy", data:{}});
    }
    upgradeEvent(){
        this.props.parentCallback({name:"upgrade", data:{}});
    }
    endTurnEvent(){
        this.props.parentCallback({name:"endTurn", data:{}});
    }
    rollEvent(){
        const result = parseInt((Math.random() * 6)) + 1 
        this.props.parentCallback({name:"move", data:{number:result }});
    }
    getActionContaner() { 
        if (this.state.roll){
            return (
            <View style={gameStyles.gameActionContainer}>
                <Button onPress={this.rollEvent} titleStyle={gameStyles.titleButtonStyle} buttonStyle={gameStyles.buttonStyle}  
                title="Roll"/>
            </View>
            );
        }
        else { 
            return (
            <View style={gameStyles.gameActionContainer}>
                <Button onPress={this.buyEvent}disabled={!this.state.showBuyButton} titleStyle={gameStyles.titleButtonStyle}
                 buttonStyle={gameStyles.buttonStyle} 
                 title="Buy"/>
                <Button onPress={this.upgradeEvent} disabled={!this.state.showUpgradeButton} titleStyle={gameStyles.titleButtonStyle}
                 buttonStyle={gameStyles.buttonStyle}  
                title="Upgrade"/>
                <Button onPress={this.endTurnEvent}  titleStyle={gameStyles.titleButtonStyle} buttonStyle={gameStyles.buttonStyle}  
                title="End turn"/>
            </View>
            );
        }
    }

    render() {
        return (
            <View style={gameStyles.decisionContainer}>
                <View style={gameStyles.cityImage}>
                <Image source={this.state.imgSource} style={{width: '100%', height: '100%'}}/>
                </View>
                <Text >City: {this.state.name}</Text>
                <Text >Cost: {this.state.cost}</Text>
                {this.getActionContaner()}
            </View>
        );
    }
}