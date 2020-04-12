import {Dimensions}  from 'react-native';

export function GetWindowWidth() {
    return Dimensions.get('window').width;
}

export function GetWindowHeight() {
    return Dimensions.get('window').height;
}
export function getColorByPlayerId(id) {
    if(id===0)return "yellow";
    else if (id==1) return "green";
    else if (id==2) return "red";
    else if (id==3) return "blue";
}

const windowWidth = GetWindowWidth();
const windowHeight = GetWindowHeight();
export const canvasWidth = (windowWidth /2) +10;
export const canvasHeight = windowHeight -40;