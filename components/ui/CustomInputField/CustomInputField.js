import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Colors} from '../../../config/Constant';

const CustomInputField = ({
  changeHandler,
  label,
  placeholder,
  password,
  value,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onChangeText={text => changeHandler(text)}
        style={styles.InputField}
        placeholder={placeholder}
        secureTextEntry={password}
        value={value}
      />
    </View>
  );
};

export default CustomInputField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 15,
    color: Colors.accent,
    fontFamily: 'Roboto-Medium',
  },
  InputField: {
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: Colors.accent,
    color: Colors.fontColor,
  },
});
