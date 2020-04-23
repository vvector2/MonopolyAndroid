import {StyleSheet}  from 'react-native';
import {GetWindowWidth,GetWindowHeight,canvasWidth, canvasHeight, boardWidth} from '../common/Helper';
const windowWidth = GetWindowWidth();
const windowHeight = GetWindowHeight();

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
  }
});

export const optionStyle = StyleSheet.create({
  optionsContainer: {
    flex: 3,
    alignItems:'center',
    justifyContent: 'center',
    width : windowWidth * 0.75
  },
  playerOptionContainer : {
    flex: 1,
    marginTop:20,
    marginBottom: 20,
    alignItems:'center',
    flexDirection: 'row',
    alignSelf:"stretch"
  },
  checkBoxStyle : {
    backgroundColor: "transparent",
    borderColor: "transparent"
  }
});

export const gameStyles = StyleSheet.create({
  gameScreen : {
    flexDirection: "row",
    display: "flex",
    flex :1 ,
    justifyContent: "flex-start",
  },
  canvasContainer : {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    width: boardWidth, 
    height: boardWidth,
  },
  decisionContainer : {
    flexDirection: "column",
    margin: 10
  },
  cityImage : {
    width : windowWidth /4,
    height : "60%"
  },
  buttonStyle : {
    height : 20, 
    marginTop : 5,
    width : windowWidth /4 -10,
    backgroundColor: "silver",
  },
  titleButtonStyle: {
    fontSize : 10
  },
  gameActionContainer : {
    alignItems : "center"
  },
  playerPanelContainer : {
  },
  playerPanel : {
    marginTop: 10, 
    marginBottom: 10
  },
  canvas : {
    position: 'absolute',
    zIndex: 1,
    width: canvasWidth, 
    height: canvasHeight
  },
  gameOverPopup : {
    position : "absolute",
    width : windowWidth /2,
    height: windowHeight /2,
    top: windowHeight/4 , 
    left : windowWidth/4,
    alignItems : "center",
    justifyContent : "center",
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: 'silver',
    backgroundColor : "gold", 
    opacity : 0.9
  }
});