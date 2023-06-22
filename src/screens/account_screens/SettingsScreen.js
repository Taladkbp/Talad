import React, { useContext } from 'react'
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoutButton from '../../components/LogoutButton'
import { Text } from 'react-native-paper';
import BackButton from '../../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../theme/colors';
import BottomSheetBackButton from '../../components/BottomSheetBackButton';

const SettingsScreen = () => {

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: Colors.background}}>
      <View className='flex-row justify-between items-center mb-4 mt-4' >
        <BottomSheetBackButton/>
        <Text className='text-center text-xl font-bold w-1/3'> Settings </Text>
        <View className='w-16'/>
      </View>
      <View className='flex-1 px-5 mt-5'>
        <TouchableOpacity
            className='flex-row items-center h-14 rounded-md mb-3 pl-4'
            style={{ backgroundColor: Colors.surface}}
            onPress={() => {} /* Add logout functionality here */}
        >
          <Text className='text-xl font-bold pl-3'>Logout</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default SettingsScreen