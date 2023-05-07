import { isValidPhoneNumber } from 'libphonenumber-js';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { CheckBadgeIcon} from 'react-native-heroicons/solid';
import { Button, Text } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import { SafeAreaView } from 'react-native-safe-area-context'

const PhoneVerificationScreen = () => {
  const [value, setValue] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [valid, setValid] = useState(false);

  const handleTextChange = (text) => {
    setFormattedPhoneNumber(text);
    const checkValid = isValidPhoneNumber(text)
    setValid(checkValid === true);
  }

  return (
    <SafeAreaView className='flex justify-center items-center h-screen'>
      <Text className='m-4'>
        What's your phone number?
      </Text>
      <View className='flex-row'>
        <PhoneInput
          defaultCode='LA'
          defaultValue={value}
          onChangeFormattedText={(text) => {
            handleTextChange(text)
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <View className='my-3 ml-1'>
          <CheckBadgeIcon width={35} height={35} color={valid ? '#6A9C78' : 'gray'}/>
        </View>
      </View>
      <View className='m-4'>
          <Button 
            mode='contained'
            disabled={valid ? false : true}
          >
          NEXT
          </Button> 
      </View>

    </SafeAreaView>

  );
};

export default PhoneVerificationScreen