import { View, Dimensions, Image, Animated, PanResponder, Text } from 'react-native';
import React, {useState, useRef} from "react";

let People;
let position;
let panResponder;
let currentIndex;
let setCurrentIndex;
let rotate;
let rotateAndTranslate;
let nopeOpacity;
let nextCardOpacity;
People = [
    {id: "1", uri: require('../assets/background.png')},
    {id: "2", uri: require('../assets/possiblebird.png')},
    {id: "3", uri: require('../assets/top-small.png')},
    {id: "4", uri: require('../assets/icon.png')},
    {id: "5", uri: require('../assets/gof.png')},
];
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
export default function SwipeCards() {
    [currentIndex, setCurrentIndex] = useState(0)
    position = new Animated.ValueXY()
    rotate = position.x.interpolate({
        inputRange: [-1*(screen_width / 2), 0, screen_width / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    });
    rotateAndTranslate = {
        transform: [{
            rotate: rotate
        },
            ...position.getTranslateTransform()
        ]
    }
    nopeOpacity = position.y.interpolate({
        inputRange: [-screen_height / 4, 0, screen_height/4],
        outputRange: [0,0,1],
        extrapolate: 'clamp'
    })
    nextCardOpacity = position.y.interpolate({
        inputRange: [-screen_height / 2, 0, screen_height / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    })
    panResponder =
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {

            if (gestureState.dy > 120) {
                Animated.spring(position, {
                    toValue: {x: 0 ,y: screen_height+100}
                }).start(() => {
                    setCurrentIndex(currentIndex+1), () => {
                        position.setValue({x: 0, y:0})
                    }
                })
            } else {
                Animated.spring(position, {
                    toValue: { x:0, y:0},
                    friction: 4
                }).start()
            }
        }
        });

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 60 }}/>
            <View style={{ flex: 1 }}>
                {renderPeople()}
            </View>
            <View style={{ height: 60 }} />
        </View>
    );
}
const renderPeople = () => {
    return People.map((item, i) => {
        if (i < currentIndex) {
            return null
        }else if (i === currentIndex){
            return (
                <Animated.View
                    {...panResponder.panHandlers}
                    key={i}
                    style={[rotateAndTranslate ,
                        {
                            height: screen_height -120,
                            width: screen_width,
                            padding: 10,
                            position:'absolute',
                        }
                    ]}
                >
                    <Animated.View
                        style={{
                            position: "absolute",
                            opacity: nopeOpacity,
                            bottom: 50,
                            left: screen_width / 2,
                            top: (screen_height / 3)*2,
                            width: 112,
                            marginLeft: -56,
                            zIndex: 1000}}
                        >
                            <Text
                                style={{
                                    borderWidth: 1,
                                    borderColor: "red",
                                    color: "red",
                                    fontSize: 32,
                                    fontWeight: "800",
                                    padding: 10
                                }}
                            >
                                NOPE
                            </Text>
                    </Animated.View>
                    <Image
                        style={{
                            flex: 1,
                            height: null,
                            width: null,
                            resizeMode: 'cover',
                            borderRadius: 20,
                        }}
                        source={item.uri}
                    />
                </Animated.View>
            );
        }else {
            return (
                <Animated.View
                    key={i}
                    style={{
                        opacity: nextCardOpacity,
                        height: screen_height - 120,
                        width: screen_width,
                        padding: 10,
                        position: "absolute"
                    }}
                >
                    <Image
                        style={{
                            flex: 1,
                            height: null,
                            width: null,
                            resizeMode: "cover",
                            borderRadius: 20
                        }}
                        source={item.uri}
                    />
                </Animated.View>
            );
        }
    }).reverse();
}