import { isValidPhoneNumber } from 'libphonenumber-js';
import React, { useState } from 'react'
import { View } from 'react-native';
import { CheckBadgeIcon } from 'react-native-heroicons/solid';
import { Button, Text } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import auth from '@react-native-firebase/auth';


const PhoneVerificationScreen = () => {
  // Phone number vailidty
  const [value, setValue] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [valid, setValid] = useState(false);

  // Phone number verification
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigations = useNavigation();
  

  const handleTextChange = (text) => {
    setFormattedPhoneNumber(text);
    const checkValid = isValidPhoneNumber(text)
    setValid(checkValid === true);
  }

  const signInWithPhoneNumber = async () => {
    try {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
      console.log('Confirmation:', confirmation);
      setConfirm(confirmation);
      setLoading(false)
      navigations.navigate('Authentication', {
        screen: 'OTPVerification',
        params: { verificationId: confirmation.verificationId },
      });
    } catch (error) {
      setLoading(false)
      console.error('Error during phone number sign-in:', error);
    }
  };

  return (
    <SafeAreaView className='flex justify-center items-center h-screen'>
      <BackButton/>
      <Text className='m-4 text-lg'>
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
          disabled={!valid || loading}
          onPress={() => signInWithPhoneNumber()}
        >
          {loading ? 'Loading...' : 'NEXT'}
        </Button> 
      </View>
    </SafeAreaView>
  );
};


export default PhoneVerificationScreen