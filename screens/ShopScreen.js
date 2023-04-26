import React from 'react'
import { SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'

const ShopScreen = () => {
  return (
    <SafeAreaView className='relative'>
        <View className='flex flex-row justify-around bg-neutral-400 absolute bottom-0 left-0'>
            <Text>ShopScreen</Text>
        </View>
    </SafeAreaView>
  )
}

export default ShopScreen
