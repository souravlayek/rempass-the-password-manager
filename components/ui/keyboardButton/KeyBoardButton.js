import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from '../../../config/Constant';

const KeyBoardButton = ({text, children, style, clicked}) => {
  return (
    <View style={styles.buttonWraper}>
      <TouchableOpacity onPress={() => clicked(text)}>
        <View style={[styles.keyboardButton, style]}>
          {text !== undefined ? (
            <Text style={styles.buttonText}>{text}</Text>
          ) : (
            children
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default KeyBoardButton;

const styles = StyleSheet.create({
  keyboardButton: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 28,
    color: Colors.fontColor,
    fontFamily: 'Roboto-Bold',
  },
  buttonWraper: {
    margin: 20,
  },
});
