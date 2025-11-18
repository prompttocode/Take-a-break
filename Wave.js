
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);

const Wave = ({ color, height, style }) => {
  const waveAnim = useRef(new Animated.Value(0)).current;
  const waveAmplitude = useRef(Math.random() * 10 + 15).current; // Random amplitude between 15 and 25

  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 4000, // Increased duration for fluidity
        useNativeDriver: true,
        easing: Easing.linear,
      })
    );
    waveAnimation.start();
    return () => waveAnimation.stop();
  }, []);

  const wavePath = `M 0 20 C ${width / 4} ${20 - waveAmplitude}, ${width / 4} ${20 - waveAmplitude}, ${width / 2} 20 S ${width * 0.75} ${20 + waveAmplitude}, ${width} 20 S ${width * 1.25} ${20 - waveAmplitude}, ${width * 1.5} 20 S ${width * 1.75} ${20 + waveAmplitude}, ${width * 2} 20 L ${width * 2} ${height} L 0 ${height} Z`;

  const translateX = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  return (
    <Animated.View style={style}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <AnimatedPath d={wavePath} fill={color} transform={[{ translateX }]} />
      </Svg>
    </Animated.View>
  );
};

export default Wave;
