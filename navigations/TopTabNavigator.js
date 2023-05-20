import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { UserCircleIcon } from 'react-native-heroicons/solid';
import { BuildingStorefrontIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../src/theme/colors.js'
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import BottomSheetContext from '../components/BottomSheetContext.js';


const TopTabNavigator = () => {
  const openSheet = useContext(BottomSheetContext)
  return (
    <SafeAreaView>
      <View className='flex-row p-2 justify-between'>
        <TouchableOpacity onPress={openSheet}>
          <UserCircleIcon color={Colors.onAccent} size={34}/>
        </TouchableOpacity>
        <Button
          buttonColor={Colors.priaccentmary}
          mode='contained'
          icon={({ color, size }) => <BuildingStorefrontIcon color={'#ffffff'} size={22} />}
          contentStyle={{ height: 34, justifyContent: 'center' }}
          labelStyle={{ lineHeight: 17, fontSize: 16 }}
        
        >
          Create
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default TopTabNavigator