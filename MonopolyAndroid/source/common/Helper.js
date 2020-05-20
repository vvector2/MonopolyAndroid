import {Dimensions}  from 'react-native';

export function GetWindowWidth() {
    return Dimensions.get('window').width;
}

export function GetWindowHeight() {
    return Dimensions.get('window').height;
}

const COLORS = ["rgba(255,204,0,1)", "rgba(83,253,0,1)", "rgba(253,0,41,1)", "rgba(0,255,210,1)"]

export function getColorByPlayerId(id) {
    if(id===0)return COLORS[0];
    else if (id==1) return COLORS[1];
    else if (id==2) return COLORS[2];
    else if (id==3) return COLORS[3];
}

const windowWidth = GetWindowWidth();
const windowHeight = GetWindowHeight();
export const canvasWidth = (windowWidth /2) +10;
export const canvasHeight = windowHeight -40;
export const boardWidth = Math.min(canvasWidth, canvasHeight);