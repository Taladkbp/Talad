import BottomSheet from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthNavigator from './AuthNavigator';
import SellerTabNavigator from './SellerTabNavigator';
import BottomSheetContext from '../components/BottomSheetContext';
import AccountScreen from '../screens/account_screens/AccountScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['98%'], []);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current.snapToIndex(0)
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current.close();
  }, []);
  
  const renderContent = ({ handleCloseSheet}) => {
    return (
      <AccountScreen handleCloseSheet={handleCloseSheet}/>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetContext.Provider value={handleOpenSheet}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name='SellerApp' 
            component={SellerTabNavigator}
            />
          <Stack.Screen name='Authentication' component={AuthNavigator}/>
        </Stack.Navigator>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          handleComponent={null}
          >
          {renderContent({ handleCloseSheet})}
        </BottomSheet>
      </BottomSheetContext.Provider>
    </GestureHandlerRootView>
  )
}

export default AppNavigator