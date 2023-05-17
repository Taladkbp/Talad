import React from 'react'
import AccountScreen from '../screens/AccountScreen';
import { UserCircleIcon } from 'react-native-heroicons/solid';
import { BuildingStorefrontIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../src/theme/colors.js'
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';


const TopTabNavigator = () => {
  return (
    <SafeAreaView>
      <View className='flex-row p-2 justify-between'>

        <UserCircleIcon color={Colors.primary} size={34}/>
          <Button
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