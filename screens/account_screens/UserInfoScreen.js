import React, { useState } from 'react'
import { Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../src/theme/colors'
import { View } from 'react-native'

const UserInfoScreen = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");


  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row justify-center my-10'>
        <Text> Create a new account</Text>
      </View>
      <View className='flex-1 px-5 mt-5'>
        <Text>First name: </Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          className='h-10 border border-gray-300 '
          style={{ backgroundColor: Colors.surface}}
        />
        <Text>Last name: </Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          className='h-10 border border-gray-300 '
          style={{ backgroundColor: Colors.surface}}
        />
        <Text>Phone number: </Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          className='h-10 border border-gray-300 '
          style={{ backgroundColor: Colors.surface}}
        />
        <Text>Birthday: </Text>
        <TextInput
          value={birthday}
          onChangeText={setBirthday}
          className='h-10 border border-gray-300 '
          style={{ backgroundColor: Colors.surface}}
        />
        <Text>Location: </Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          className='h-10 border border-gray-300 '
          style={{ backgroundColor: Colors.surface}}
        />
      </View>
    </SafeAreaView>
  )
}

export default UserInfoScreen