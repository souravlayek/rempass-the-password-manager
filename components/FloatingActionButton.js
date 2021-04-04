import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';

const FloatingActionButton = props => {
  return (
    <View
      style={[styles.buttonWraper, props.align === 'left' && styles.LeftAlign]}>
      <TouchableNativeFeedback onPress={props.clicked}>
        <View style={styles.floatButton}>{props.children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  buttonWraper: {
    zIndex: 5,
    overflow: 'hidden',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  floatButton: {
    overflow: 'hidden',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LeftAlign: {
    bottom: 10,
    left: 10,
  },
});
