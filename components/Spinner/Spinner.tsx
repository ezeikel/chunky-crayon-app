import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-regular-svg-icons";
import tw from "twrnc";

const Spinner = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1, // -1 means the animation will repeat infinitely
      false, // If true, the animation will reverse on every repetition
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={tw`justify-content items-center`}>
      <Animated.View style={animatedStyle}>
        <FontAwesomeIcon
          icon={faSpinnerThird}
          style={tw`text-white text-lg animate-spin`}
        />
      </Animated.View>
    </View>
  );
};

export default Spinner;
