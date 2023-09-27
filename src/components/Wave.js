import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const SIZE = 300;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Wave = ({color}) => {
  const c1y = useSharedValue(0.2);
  const c2y = useSharedValue(0.8);

  const animatedProps = useAnimatedProps(() => {
    const path = [
      'M 0 0.5',
      `C 0.4 ${c1y.value}, 0.6 ${c2y.value}, 1 0.5`,
      'V 1',
      'H 0',
    ].join(' ');

    return {
      d: path,
    };
  });

  useEffect(() => {
    c1y.value = withRepeat(
      withTiming(0.8, {duration: 750, easing: Easing.linear}),
      -1,
      true,
    );
    c2y.value = withDelay(
      200,
      withRepeat(
        withTiming(0.2, {duration: 750, easing: Easing.linear}),
        -1,
        true,
      ),
    );
  }, []);

  return (
    <>
      <Svg style={{width: '100%', height: 411}} viewBox="0 0 1 1">
        <AnimatedPath fill={color} animatedProps={animatedProps} />
      </Svg>
      <View style={styles.countdownContainer}>
        {/* Your CountdownComponent here */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -SIZE / 2}, {translateY: -SIZE / 2}],
  },
});

export default Wave;
