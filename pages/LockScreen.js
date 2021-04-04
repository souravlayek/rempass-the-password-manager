/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import KeyBoardButton from '../components/ui/keyboardButton/KeyBoardButton';
import {Colors} from '../config/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthenticated, setMasterPassword} from '../store/Action';
import {useDispatch, useSelector} from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Button from '../components/Button';
import {performDecription, performEncription} from '../config/helper';

const LockScreen = props => {
  const navigation = props.navigation;
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [masterPass, setMasterPass] = useState('');
  const [loading, setLoading] = useState(true);
  const [enteredPin, setEnteredPin] = useState('');
  const [error, setError] = useState('enter six digit pin');
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [fingerPrintError, setFingerPrintError] = useState('');

  const authenticateFingerprint = () => {
    if (biometricAvailable) {
      if (!state.authenticated) {
        FingerprintScanner.authenticate({
          title: 'Welcome',
          description: 'Enter your finger print',
        })
          .then(() => {
            // props.handlePopupDismissed();
            dispatch(setAuthenticated(true));
          })
          .catch(() => {
            // props.handlePopupDismissed();
            setFingerPrintError('Please try again biometric scan');
          });
        FingerprintScanner.release();
      }
    } else {
      updateFingerPrintHandler();
    }
  };

  const updateFingerPrintHandler = () => {
    FingerprintScanner.isSensorAvailable().then(() =>
      setBiometricAvailable(true),
    );
  };

  const getData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@masterKey');
      if ((await value) !== null) {
        const decriptedData = await performDecription(await value);
        // value previously stored
        setMasterPass(await decriptedData);
        dispatch(setMasterPassword(await decriptedData));
      } else {
      }
    } catch (e) {
      // error reading value
    }
    setLoading(false);
  };
  const setData = async data => {
    try {
      const encriptedData = await performEncription(data);
      await AsyncStorage.setItem('@masterKey', encriptedData);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (!state.firstTime) {
      authenticateFingerprint();
    }
  }, [state, biometricAvailable]);
  useEffect(() => {
    // AsyncStorage.removeItem('@masterKey');
    updateFingerPrintHandler();
    getData();
  }, []);

  useEffect(() => {
    if (enteredPin.length < 6) {
      setError('enter six digit pin');
    } else {
      setError('');
      if (state.firstTime) {
        setMasterPass(enteredPin);
        setData(enteredPin);
        dispatch(setMasterPassword(enteredPin));
        dispatch(setAuthenticated(true));
        setEnteredPin('');
      } else {
        if (masterPass === enteredPin) {
          dispatch(setAuthenticated(true));
          navigation.replace('home');
        }
      }
    }
  }, [enteredPin]);
  const getPinArray = () => {
    let list = enteredPin.split('');
    if (list.length < 6) {
      let length = list.length;
      for (let i = length + 1; i <= 6; i++) {
        list.push(' ');
      }
    }
    return list;
  };
  const setPin = pin => {
    if (enteredPin.length < 6) {
      setEnteredPin(prev => prev + pin);
    }
  };
  useEffect(() => {
    if (state.authenticated) {
      navigation.replace('home');
    }
  }, [state]);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.headingWraper}>
            <Icon name="lock" size={30} color={Colors.activeColor} />
            <Text style={styles.headingMessage}>
              {state.firstTime ? 'Set your pin' : 'Enter your Pin'}
            </Text>
          </View>
          {!state.firstTime && fingerPrintError.length !== 0 && (
            <View>
              <Button
                clicked={authenticateFingerprint}
                text="Tap to Enter Fingerprint"
              />
              <Text style={styles.errorMessage}>{fingerPrintError}</Text>
            </View>
          )}
          <View>
            <View style={styles.PasswordContainer}>
              {getPinArray().map(item => (
                <View key={item + Math.random()} style={styles.passwordBox}>
                  <Text style={styles.passwordText}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.errorBox}>
              {error.length !== 0 && (
                <Text style={styles.errorMessage}>{error}</Text>
              )}
            </View>
          </View>
          <View style={styles.keyBoard}>
            <View style={styles.keyBoardRow}>
              <KeyBoardButton clicked={pin => setPin(pin)} text="7" />
              <KeyBoardButton clicked={pin => setPin(pin)} text="8" />
              <KeyBoardButton clicked={pin => setPin(pin)} text="9" />
            </View>
            <View style={styles.keyBoardRow}>
              <KeyBoardButton clicked={pin => setPin(pin)} text="4" />
              <KeyBoardButton clicked={pin => setPin(pin)} text="5" />
              <KeyBoardButton clicked={pin => setPin(pin)} text="6" />
            </View>
            <View style={styles.keyBoardRow}>
              <KeyBoardButton clicked={pin => setPin(pin)} text="1" />
              <KeyBoardButton clicked={pin => setPin(pin)} text="2" />
              <KeyBoardButton clicked={pin => setPin(pin)} text="3" />
            </View>
            <View style={styles.keyBoardRow}>
              <KeyBoardButton clicked={() => setEnteredPin('')}>
                <Icon name="ban" size={20} color={Colors.fontColor} />
              </KeyBoardButton>
              <KeyBoardButton clicked={pin => setPin(pin)} text="0" />
              <KeyBoardButton
                clicked={() => setEnteredPin(prev => prev.slice(0, -1))}>
                <Icon name="arrow-left" size={20} color={Colors.fontColor} />
              </KeyBoardButton>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default LockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
  },
  keyBoard: {
    padding: 30,
  },
  keyBoardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  PasswordContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: Colors.fontColor,
  },
  passwordText: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: Colors.fontColor,
  },
  errorBox: {
    height: 80,
    width: '100%',
  },
  errorMessage: {
    padding: 30,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Roboto-Medium',
    color: Colors.activeColor,
  },
  headingMessage: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Roboto-Medium',
    color: Colors.activeColor,
    fontSize: 30,
  },
  headingWraper: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
