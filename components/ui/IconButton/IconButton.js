import React from 'react';
import {View, TouchableOpacity} from 'react-native';

const IconButton = ({clicked, children}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={clicked}>
      <View style={{padding: 5, margin: 5}}>{children}</View>
    </TouchableOpacity>
  );
};

export default IconButton;
