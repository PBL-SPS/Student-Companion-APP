import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TouchableScale = ({ children, ...props }) => {
  const pressed = useSharedValue(false);

  const cardAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pressed.value ? withSpring(0.95) : withSpring(1) }],
    };
  });
  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        pressed.value = true;
      }}
      onPressOut={() => {
        pressed.value = false;
      }}
      {...props}

      // activeOpacity={0.6}
    >
      <Animated.View style={cardAnimatedStyles}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default TouchableScale;
