import {StyleSheet}  from 'react-native';
import {GetWindowWidth, GetWindowHeight} from './Helper';

const windowWidth = GetWindowWidth();
const windowHeight = GetWindowHeight();
export const canvasWidth = windowWidth *4/5;
export const canvasHeight = windowHeight;

export const commonStyles = StyleSheet.create({
  mainContainer : {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
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