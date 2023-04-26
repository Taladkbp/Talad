import React from 'react'
import { SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'

const LivestreamScreen = () => {
  return (
    <SafeAreaView className='relative'>
        <View className='flex flex-row justify-around bg-neutral-400 absolute bottom-0 left-0'>
            <Text>LivestreamScreen</Text>
        </View>
    </SafeAreaView>
  )
}

export default LivestreamScreen
