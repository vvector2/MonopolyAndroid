import {Dimensions}  from 'react-native';

export function GetWindowWidth() {
    return Dimensions.get('window').width;
}

export function GetWindowHeight() {
    return Dimensions.get('window').height;
}