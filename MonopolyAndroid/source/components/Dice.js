import React, { useRef } from 'react';
import { Image, View, ImageBackground, Animated } from 'react-native';
import { dices } from './../../resource/dynamicImages'
export const Dice = (props) => {
    let i = props.val - 1;
    const anim = useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.timing(
            anim,
            {
                toValue: 100,
                duration: 1500,
                useNativeDriver: true,
            }
        ).start();

    }, [])
    let maxX = Math.floor(props.offset + 200)
    
    let maxY = Math.floor(props.offset * 0.5 + 100)
    let roll = Math.floor(Math.random() /10 + 0.85)
    let spin = 5
    return (
        <Animated.View
            style={{
                transform: [{ translateX: anim.interpolate({ inputRange: [0, 60, 100], outputRange: [400, -1 * roll * maxX, -1 * maxX] })},
                 { translateY: anim.interpolate({ inputRange: [0, 60, 100], outputRange: [100, -1 * roll * maxY,-1 * maxY] })},
                { rotateZ: anim.interpolate({ inputRange: [0, 90, 100], outputRange: ["0deg", "0deg", `${spin}deg`] }) },
                { perspective: 1000 }]
            }}>
            <Image style={{ width: 50, height: 50, position: "absolute" }} source={dices[i]}></Image>
        </Animated.View>
    );
}