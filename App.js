import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigations/BottomTabNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </PaperProvider>
  );
}


registerRootComponent(App);

