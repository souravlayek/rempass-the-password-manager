/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

import 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {performDecription} from './config/helper';
import MainNavigation from './navigation/MainNavigation';
import {initializeCredentials, setAuthenticated} from './store/Action';

const App = () => {
  const [appStateVisible, setAppStateVisible] = useState('');
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      dispatch(setAuthenticated(false));
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };
  const getData = async () => {
    // AsyncStorage.removeItem('@credentials');
    try {
      const value = await AsyncStorage.getItem('@credentials');
      if ((await value) !== null) {
        console.log(value);
        // value previously stored
        dispatch(initializeCredentials(JSON.parse(await value)));
      } else {
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // app state change a
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);
  return <MainNavigation />;
};

export default App;
