import {Dimensions}  from 'react-native';

export function GetWindowWidth() {
    return Dimensions.get('window').width;
}

export function GetWindowHeight() {
    return Dimensions.get('window').height;
}

const windowWidth = GetWindowWidth();
const windowHeight = GetWindowHeight();
export const canvasWidth = (windowWidth /2) +10;
export const canvasHeight = windowHeight -40;