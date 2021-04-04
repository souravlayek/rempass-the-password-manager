import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from '../config/Constant';

const Button = ({text, children, style, clicked}) => {
  return (
    <View style={styles.buttonWraper}>
      <TouchableOpacity onPress={() => clicked(text)}>
        <View style={[styles.Button, style]}>
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

export default Button;

const styles = StyleSheet.create({
  Button: {
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
    margin: 5,
  },
});
