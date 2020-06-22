import {View, Dimensions, Image, Animated, PanResponder, Text, Button, TouchableWithoutFeedback} from 'react-native';
import React, {useState, useRef} from "react";

import DoubleTap from "./DoubleTap";

let People;
let position;
let panResponder;
let currentIndex;
let setCurrentIndex;
let liked;
let setLiked;
let rotate;
let rotateAndTranslate;
let nopeOpacity;
let nextCardOpacity;
let fadeAnim;
let lastTap = null;
People = [
    {id: "1", uri: require('../assets/background.png')},
    {id: "2", uri: require('../assets/possiblebird.png')},
    {id: "3", uri: require('../assets/top-small.png')},
    {id: "4", uri: require('../assets/icon.png')},
    {id: "5", uri: require('../assets/gof.png')},
];
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

export default function SwipeCards({navigation}) {
    [currentIndex, setCurrentIndex] = useState(0);
    [liked, setLiked] = useState(false);
    position = new Animated.ValueXY()
    fadeAnim = useRef(new Animated.Value(0)).current;
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
    const touchThreshold = 100;
    panResponder =
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (e, gestureState) => {
                const {dx, dy} = gestureState
                return (Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold)
            },
            onPanResponderMove: (evt, gestureState) => {
                position.setValue({x: gestureState.dx, y: gestureState.dy});

            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy > 120) {
                    Animated.spring(position, {
                        toValue: {x: 0, y: screen_height + 100}
                    }).start(() => {
                        setCurrentIndex(currentIndex + 1), () => {
                            position.setValue({x: 0, y: 0})
                        }
                    })
                }
                if (gestureState.dx > 200) {
                    navigation.navigate('Bio')
                    position.setValue({x: 0, y: 0})
                } else {
                    Animated.spring(position, {
                        toValue: {x: 0, y: 0},
                        friction: 4
                    }).start()
                }
            }
        });

    return (
        <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {renderPeople()}
                </View>
            <View style={{ height: 60 }}/>
        </View>
    );
}
const handleDoubleTap = () => {
    console.log("ran")
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
        fadeIn();
        Animated.spring(position, {
            toValue: {x: 0, y: screen_height + 100}
        }).start(() => {
            setCurrentIndex(currentIndex + 1), () => {
                position.setValue({x: 0, y: 0})
            }

        })
        fadeOut()
    } else {
        lastTap = now;
    }
}
const fadeIn = () => {
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 10
    }).start()
}
const fadeOut = () => {
    Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 10,
    }).start()
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
                            <TouchableWithoutFeedback onPress={handleDoubleTap} >
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
                            </TouchableWithoutFeedback>
                            <Animated.View
                                style={{
                                    opacity: fadeAnim,
                                    position: 'absolute',
                                }}
                            >
                                <Image
                                    style={{
                                        display:'none',
                                        height: screen_width/8,
                                        width: screen_width/8,
                                        top: (screen_height-120)/ 2,
                                        marginTop: -(((screen_height-120)/8)/2),
                                        left: screen_width/2,
                                        marginLeft: -((screen_width/8)/2)
                                    }}
                                    source={require('../assets/heart/heart.png')}
                                    />
                            </Animated.View>
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