import BottomSheet from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback, useMemo, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthNavigator from './AuthNavigator';
import SellerTabNavigator from './SellerTabNavigator';
import BottomSheetContext from '../components/BottomSheetContext';
import AccountScreen from '../screens/account_screens/AccountScreen';
import SettingsScreen from '../screens/account_screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['93%'], []);
  const [content, setContent] = useState('Account');
  const [screenStack, setScreenStack] = useState(['Account']);

  const handleOpenSheet = useCallback((sheetContent) => {
    setContent(sheetContent);
    setScreenStack((prevStack) => [...prevStack, sheetContent]);
    bottomSheetRef.current.snapToIndex(0)
  }, [setContent]);

  const handleCloseSheet = useCallback(() => {
    setScreenStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
    if(screenStack.length > 1) {
      setContent(screenStack[screenStack.length - 2]);
    } else {
      bottomSheetRef.current.close();
    }
  }, [screenStack]);
  
  const renderContent = () => {
      return content === 'Account' ? (
        <AccountScreen handleCloseSheet={handleCloseSheet} />
      ) : (
        <SettingsScreen handleCloseSheet={handleCloseSheet} />
      );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetContext.Provider value={{ openSheet: handleOpenSheet, setScreenStack }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name='SellerApp' 
            component={SellerTabNavigator}
            />
          <Stack.Screen 
            name='Authentication' 
            component={AuthNavigator}
          />
        </Stack.Navigator>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          handleComponent={null}
          >
          {renderContent()}
        </BottomSheet>
      </BottomSheetContext.Provider>
    </GestureHandlerRootView>
  )
}

export default AppNavigator