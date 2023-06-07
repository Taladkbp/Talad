import React, {useContext} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BuildingStorefrontIcon, UserCircleIcon } from 'react-native-heroicons/solid';
import { Button } from 'react-native-paper';
import BottomSheetContext from '../components/BottomSheetContext.js';
import { Colors } from '../theme/colors.js';

const TopTabNavigator = () => {
  const openSheet = useContext(BottomSheetContext)
  return (
    <View>
      <View className='flex-row p-2 justify-between'>
        <TouchableOpacity onPress={openSheet}>
          <UserCircleIcon color={Colors.onUserIcon} size={34}/>
        </TouchableOpacity>
        <Button
          buttonColor={Colors.primary}
          mode='contained'
          icon={({ color, size }) => <BuildingStorefrontIcon color={'#ffffff'} size={22} />}
          contentStyle={{ height: 34, justifyContent: 'center' }}
          labelStyle={{ lineHeight: 17, fontSize: 16 }}
        
        >
          Create
        </Button>
      </View>
    </View>
  )
}

export default TopTabNavigator