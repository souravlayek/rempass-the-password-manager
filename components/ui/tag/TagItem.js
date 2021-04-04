import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from '../../../config/Constant';

const TagItem = ({text, clicked}) => {
  const [active, setActive] = useState(false);
  const handlePress = () => {
    setActive(true);
  };
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
      <View style={active ? styles.activeItem : styles.item}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TagItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.accent,
    padding: 5,
  },
  text: {
    textTransform: 'capitalize',
    color: Colors.fontColor,
    fontFamily: 'Roboto-Regular',
  },
});
