import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserInfoScreen from '../screens/account_screens/UserInfoScreen.js';
import LoginScreen from '../screens/login_screens/LoginScreen';
import OTPVerificationScreen from '../screens/login_screens/OTPVerificationScreen';
import PhoneVerificationScreen from '../screens/login_screens/PhoneVerificationScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='PhoneVerification'
        component={PhoneVerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='OTPVerification'
        component={OTPVerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='UserInfo'
        component={UserInfoScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator