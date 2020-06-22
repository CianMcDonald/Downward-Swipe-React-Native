import React from 'react';
import {TouchableWithoutFeedback} from "react-native";

let lastTap = null;

const handleDoubleTap = (props) => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < props.delay) {
        props.onDoubleTap();
    } else {
        lastTap = now;
    }
}
export default function DoubleTap(props) {
    return (
      <TouchableWithoutFeedback onPress={handleDoubleTap()} >
          {props.children}
      </TouchableWithoutFeedback>
    );
}