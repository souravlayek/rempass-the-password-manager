/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '../components/ui/IconButton/IconButton';
import {Colors} from '../config/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import EachItem from '../components/EachItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = props => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.authenticated === false) {
      props.navigation.replace('lockScreen');
    }
  }, [state]);
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton clicked={() => props.navigation.navigate('addPage')}>
          <Icon name="plus" size={20} color="#fff" />
        </IconButton>
      ),
    });
  }, []);
  const setData = async data => {
    try {
      await AsyncStorage.setItem('@credentials', JSON.stringify(data));
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (state.credentials) {
      if (state.credentials.length !== 0) {
        setData(state.credentials);
      }
    }
  }, [state]);
  return (
    <View style={styles.container}>
      {state.credentials.length !== 0 ? (
        <FlatList
          style={styles.list}
          data={state.credentials}
          keyExtractor={data => data.id}
          renderItem={data => (
            <EachItem
              data={data.item}
              delete={() => props.delete(data.item.id)}
            />
          )}
        />
      ) : (
        <Text style={{color: 'white'}}>Nothing to show</Text>
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
  },
});
