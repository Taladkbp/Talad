import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigations/AppNavigator';
import {Colors} from './theme/colors'
import { firebase } from '@react-native-firebase/auth';
import AuthProvider  from './auth/AuthProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...Colors,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <AppNavigator/>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};


