import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigations/AppNavigator';
import BottomTabNavigator from './navigations/UserTabNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50', // Green color for primary actions and components
    accent: '#FFC107', // Amber color for accents and highlights
    background: '#F5F5F5', // Light gray for the background
    surface: '#FFFFFF', // White for cards and surfaces
    text: '#424242', // Dark gray for the text
    error: '#f44336', // Red color for errors
    onPrimary: '#FFFFFF', // White text on primary color
    onAccent: '#000000', // Black text on accent color
    onBackground: '#424242', // Dark gray text on background color
    onSurface: '#424242', // Dark gray text on surface color
  },
};

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </PaperProvider>
  );
};


registerRootComponent(App);

