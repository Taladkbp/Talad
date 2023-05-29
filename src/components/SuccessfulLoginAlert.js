import React from 'react'
import { Alert } from 'react-native'

const SuccessfulLoginAlert = () => {
  Alert.alert(
    'Successful Login',
    'You have successfully logged in!',
    [{text:'OK', onPress:()=>console.log('OK Pressed')}],
    {cancelable:false}
  );
};

export default SuccessfulLoginAlert