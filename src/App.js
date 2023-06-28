import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigations/AppNavigator';
import {Colors} from './theme/colors'
import AuthProvider  from './auth/AuthProvider';
import { TokenProvider } from './components/TokenContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...Colors,
  },
};

export default function App() {
  return (
    <AuthProvider>
      <TokenProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
              <AppNavigator/>
          </NavigationContainer>
        </PaperProvider>
      </TokenProvider>
    </AuthProvider>
  );
};


