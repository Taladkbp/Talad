import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import TopTabNavigator from '../navigations/TopTabNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TESTING_KEY } from '@env';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <TopTabNavigator/>
        <View>
            <Text className='text-lg text-red-900'>Home</Text>
            <Text>Home</Text>
            <Text>{TESTING_KEY}</Text>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen