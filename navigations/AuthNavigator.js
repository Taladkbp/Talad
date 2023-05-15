import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import PhoneVerificationScreen from '../screens/login_screens/PhoneVerificationScreen';
import OTPVerificationScreen from '../screens/login_screens/OTPVerificationScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
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
    </Stack.Navigator>
  )
}

export default AuthNavigator