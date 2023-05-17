import React from 'react'
import { View, Text } from 'react-native'
import TopTabNavigator from '../navigations/TopTabNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <TopTabNavigator/>
        <View>
            <Text className='text-lg text-red-900'>Home</Text>
            <Text>Home</Text>
            <Text>Home</Text>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen