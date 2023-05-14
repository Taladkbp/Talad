import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import BottomTabNavigator from './UserTabNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='UserApp' component={BottomTabNavigator}/>
      <Stack.Screen name='Authentication' component={AuthNavigator}/>
    </Stack.Navigator>
  )
}

export default AppNavigator