import React, { Component }  from 'react';
import {View, Image, Button}  from 'react-native';
import LinearGradiant from 'react-native-linear-gradient';
import {commonStyles} from "./Styles";


export default class Menu extends Component {
  render() {
    const pathToLogo = "./../../resource/logo.png" ;
    return (
      <LinearGradiant colors={["#a4900c", "#f4c60d"]} style= {commonStyles.mainContainer}>
        <Image source={require(pathToLogo)} />
        <View style={commonStyles.subMenuContainer}>
          <View style={commonStyles.primaryButton} >
            <Button 
            title="Singleplayer" 
            color="silver" 
            onPress={() => this.props.navigation.navigate('Options')} />
          </View>
        </View>
      </LinearGradiant>
    );
  }
}
