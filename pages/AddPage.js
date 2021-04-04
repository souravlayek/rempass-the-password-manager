// /* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import IconButton from '../components/ui/IconButton/IconButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../config/Constant';
// import CustomInputField from '../components/ui/CustomInputField/CustomInputField';
import Button from '../components/Button';
import {generatePassword, setCredentials} from '../config/helper';
import {useDispatch} from 'react-redux';
import {setCredential} from '../store/Action';

const AddPage = props => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addMode, setAddMode] = useState(true);
  const handleSubmitRef = useRef(null);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton clicked={() => handleSubmitRef.current()}>
          <Icon name="check" size={20} color="#fff" />
        </IconButton>
      ),
    });
  }, [props.navigation]);
  useEffect(() => {
    if (props.route.params !== undefined) {
      console.log(props.route.params);
      if (props.route.params.mode === 'EDIT') {
        setAddMode(false);
        const editData = props.route.params.data;
        console.log(editData);
        setWebsite(editData.website);
        setUsername(editData.username);
        setPassword(editData.password);
      }
    }
  }, [props]);
  const handleSubmit = async () => {
    const creds = await setCredentials({website, username, password});
    dispatch(setCredential(creds));
    props.navigation.pop();
  };
  handleSubmitRef.current = handleSubmit;
  const setGenaratedPassword = () => {
    const pass = generatePassword();
    setPassword(pass);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputWraper}>
        <Text style={styles.label}>Website</Text>
        <TextInput
          onChangeText={setWebsite}
          style={styles.InputField}
          placeholderTextColor={Colors.accent}
          placeholder="Enter Websites Name"
          value={website}
        />
      </View>
      <View style={styles.inputWraper}>
        <Text style={styles.label}>Email/Username</Text>
        <TextInput
          onChangeText={text => setUsername(text)}
          style={styles.InputField}
          placeholderTextColor={Colors.accent}
          placeholder="Enter username or email"
          value={username}
        />
      </View>
      <View style={styles.inputWraper}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={text => setPassword(text)}
          style={styles.InputField}
          placeholder="Enter Password"
          placeholderTextColor={Colors.accent}
          value={password}
          secureTextEntry
        />
      </View>
      <Button clicked={setGenaratedPassword} text="Generate a Password" />
    </View>
  );
};

export default AddPage;

const styles = StyleSheet.create({
  inputWraper: {
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
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
  },
});
