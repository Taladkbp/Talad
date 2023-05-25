// Import necessary libraries
import React, { useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BackButton from '../../components/BackButton';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import SuccessfulLoginAlert from '../../components/SuccessfulLoginAlert';

const OTPVerificationScreen = ({ route }) => {
  // State variables
  const [OTP, setOTP] = useState('');
  const isOTPComplete = OTP.length === 6;
  const verificationId = route.params?.verificationId;
  const navigations = useNavigation();

  // Styles for the OTP input field
  const styles = {
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: 'black',
      color: 'black',
      fontSize: 24,
    },
    underlineStyleHighLighted: {
      borderColor: 'black',
    },
  };

  // Function to confirm the OTP entered by the user
  const confirmOTP = async () => {
    try {
      if (verificationId) {
        const credential = auth.PhoneAuthProvider.credential(verificationId, OTP);
        await auth().signInWithCredential(credential);
        console.log("OTP verification successful");
        navigations.navigate('SellerApp', { screen: 'Home' });
        SuccessfulLoginAlert();
      } else {
        console.log('No confirmation object to confirm the code');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Return the component JSX
  return (
    <SafeAreaView className='flex justify-center items-center h-screen'>
      <BackButton/>
      <Text className='text-lg'>Enter 6 Digit OTP Code</Text>
      <OTPInputView
        onCodeChanged={(code) => setOTP(code)} 
        style={{ width: '90%', height: 90 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <Button 
        mode='contained'
        disabled={!isOTPComplete}
        onPress={confirmOTP}
      >
        Confirm
      </Button> 
    </SafeAreaView>
  );
}

export default OTPVerificationScreen;