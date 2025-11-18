
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Bubble from './Bubble';

const BUBBLE_COUNT = 15;

const BubbleManager = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: BUBBLE_COUNT }).map((_, index) => (
        <Bubble key={index} />
      ))}
    </View>
  );
};

export default BubbleManager;
