import {StyleSheet}  from 'react-native';
import {GetWindowWidth, GetWindowHeight} from './Helper';

const windowWidth = GetWindowWidth();
const windowHeight = GetWindowHeight();
export const canvasWidth = windowWidth ;
export const canvasHeight = windowHeight;

export const commonStyles = StyleSheet.create({
  mainContainer : {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GameButtonsContainer : {
    position: 'absolute',
    bottom:windowHeight*0.5,
    left:windowWidth*0.4,
    width: windowWidth*0.2
  },
  GameButton : {
    width: "90%", margin: 10
  },
  primaryButton: {
    width: windowWidth/4
  },
  subMenuContainer : {
    flexDirection:'row',
    justifyContent: 'space-around',
    width: windowWidth ,
    height: windowHeight/4
  },
  optionsContainer: {
    width: windowWidth ,
    height: windowHeight*3/4
  } 
});