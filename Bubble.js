
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { height } = Dimensions.get('window');

const Bubble = () => {
  const verticalAnim = useRef(new Animated.Value(0)).current;
  const horizontalAnim = useRef(new Animated.Value(0)).current;
  const randomLeft = useRef(Math.random() * 100).current;
  const randomDuration = useRef(Math.random() * 7000 + 8000).current;
  const randomDelay = useRef(Math.random() * 5000).current; // Random delay up to 5 seconds

  useEffect(() => {
    const verticalAnimation = Animated.loop(
      Animated.timing(verticalAnim, {
        toValue: 1,
        duration: randomDuration,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    );

    const horizontalAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(horizontalAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(horizontalAnim, {
          toValue: -1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(horizontalAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    );

    const parallelAnimation = Animated.parallel([verticalAnimation, horizontalAnimation]);

    const delayedAnimation = Animated.sequence([
      Animated.delay(randomDelay),
      parallelAnimation,
    ]);

    delayedAnimation.start();

    return () => {
      delayedAnimation.stop();
    };
  }, []);

  const translateY = verticalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, -height * 1.5], // Start from bottom, go further up
  });

  const translateX = horizontalAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-20, 20],
  });

  const opacity = verticalAnim.interpolate({
    inputRange: [0, 0.1, 0.8, 1],
    outputRange: [1, 1, 1, 0],
  });

  const scale = verticalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.5],
  });

  const bubbleStyle = {
    position: 'absolute',
    top: 0, // top: 0 with translateY starting from height is equivalent to bottom: 0
    left: `${randomLeft}%`,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ translateY }, { translateX }, { scale }],
    opacity,
  };

  return <Animated.View style={bubbleStyle} />;
};

export default Bubble;
