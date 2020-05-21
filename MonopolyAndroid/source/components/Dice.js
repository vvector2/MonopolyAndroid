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
                duration: 2000,
                useNativeDriver: true,
            }
        ).start();

    }, [])
    let maxX = Math.floor(props.offset + 320)
    
    let maxY = Math.floor(props.offset * 0.5 + 100)
    return (
        <Animated.View
            style={{
                transform: [{ translateX: anim.interpolate({ inputRange: [0, 90, 100], outputRange: [400, -0.8 * maxX, -1 * maxX] })},
                 { translateY: anim.interpolate({ inputRange: [0, 100], outputRange: [100, -1 * maxY] })},
                { rotateZ: anim.interpolate({ inputRange: [0, 100], outputRange: ["0deg", "900deg"] }) },
                { perspective: 1000 }]
            }}>
            <Image style={{ width: 50, height: 50, position: "absolute" }} source={dices[i]}></Image>
        </Animated.View>
    );
}