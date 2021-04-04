import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {performDecription} from '../config/helper';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../config/Constant';
import {useDispatch} from 'react-redux';
import {deleteCredential} from '../store/Action';
import {useNavigation} from '@react-navigation/native';

const EachItem = props => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState({});
  const fetchDataFunctionRef = useRef(null);
  const [moreMenu, setMoreMenu] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const fetchData = async () => {
    const message = await performDecription(props.data.value);
    setData(JSON.parse(message));
  };
  fetchDataFunctionRef.current = fetchData;
  const handleDelete = () => {
    dispatch(deleteCredential(props.data.id));
  };
  const handleEdit = () => {
    navigation.navigate('addPage', {
      mode: 'EDIT',
      id: props.data.id,
      data: data,
    });
  };
  const copytoclipboard = () => {
    Clipboard.setString(data.password);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
    setCopied(true);
  };
  const changeVisibility = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  useEffect(() => {
    fetchDataFunctionRef.current();
  }, [props, fetchDataFunctionRef]);
  return (
    <View style={styles.MainContainer}>
      <Pressable
        onLongPress={() => {
          setMoreMenu(true);
        }}>
        <View style={visible || moreMenu ? styles.wraperAlt : styles.wraper}>
          {moreMenu ? (
            <View style={styles.moreWraper}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Warning', 'Do you want to delete this', [
                      {
                        text: 'Yes',
                        style: 'destructive',
                        onPress: () => handleDelete(),
                      },
                      {text: 'No'},
                    ])
                  }>
                  <Icon name="trash" size={30} color={Colors.fontColor} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={handleEdit}>
                  <Icon name="pencil" size={30} color={Colors.fontColor} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => setMoreMenu(false)}>
                  <Icon name="times" size={30} color={Colors.fontColor} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.mainSection}>
                <View style={styles.lockIcon}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={changeVisibility}>
                    <Icon
                      name={visible ? 'unlock-alt' : 'lock'}
                      color={Colors.fontColor}
                      size={46}
                    />
                  </TouchableOpacity>
                </View>
                {visible ? (
                  <View>
                    <Text style={styles.siteName}>{data.password}</Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.siteName}>{data.website}</Text>
                    <Text style={styles.userName}>{data.username}</Text>
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity activeOpacity={0.8} onPress={copytoclipboard}>
                  <Icon
                    name={copied ? 'check' : 'clone'}
                    color={Colors.fontColor}
                    size={35}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default EachItem;

const styles = StyleSheet.create({
  MainContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  wraper: {
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  wraperAlt: {
    paddingHorizontal: 10,
    height: 80,
    borderRadius: 10,
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
  },
  moreWraper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    marginRight: 25,
  },
  userName: {
    fontSize: 15,
    color: Colors.fontColor,
    fontFamily: 'Roboto-Regular',
  },
  siteName: {
    color: Colors.fontColor,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
});
