import React, { Component }  from 'react';
import {View, Button}  from 'react-native';
import {commonStyles} from "./CommonStyles";
import LinearGradiant from 'react-native-linear-gradient';

export default class Options extends Component {
  render() {
    return (
      <LinearGradiant colors={["#a4900c", "#f4c60d"]} style= {commonStyles.mainContainer}>
        <View style={commonStyles.optionsContainer}>
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
            onPress={() => this.props.navigation.navigate('Game')} />
          </View>
        </View>
      </LinearGradiant>
    );
  }
}