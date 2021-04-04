// In App.js in a new project

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import LockScreen from '../pages/LockScreen';
import HomePage from '../pages/HomePage';
import {Colors} from '../config/Constant';
import AddPage from '../pages/AddPage';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="lockScreen"
          component={LockScreen}
        />
        <Stack.Screen
          options={{
            title: 'Rempass',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.fontColor,
            headerTitleStyle: {
              fontFamily: 'Roboto-Bold',
              alignSelf: 'center',
            },
          }}
          name="home"
          component={HomePage}
        />
        <Stack.Screen
          options={{
            title: 'Rempass',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.fontColor,
            headerTitleStyle: {
              fontFamily: 'Roboto-Bold',
              alignSelf: 'center',
            },
          }}
          name="addPage"
          component={AddPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
