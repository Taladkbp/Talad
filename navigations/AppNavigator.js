import { createStackNavigator } from '@react-navigation/stack';
import UserTabNavigator from './UserTabNavigator';
import AuthNavigator from './AuthNavigator';
import { createContext, useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import BottomSheetContext from '../components/BottomSheetContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current.snapToIndex(1)
  }, []);

  const renderContent = () => {
    return (
      <View>
        <Text>Testing</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetContext.Provider value={handleOpenSheet}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name='UserApp' 
              component={UserTabNavigator}
              />
          <Stack.Screen name='Authentication' component={AuthNavigator}/>
        </Stack.Navigator>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          >
          {renderContent()}
        </BottomSheet>
      </BottomSheetContext.Provider>
    </GestureHandlerRootView>
  )
}

export default AppNavigator