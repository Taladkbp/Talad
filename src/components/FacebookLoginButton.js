import React from 'react'
import { LoginManager } from 'react-native-fbsdk-next'
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-paper';

const FacebookLoginButton = () => {
  const onFacebookButtonPress = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    if (!data) {
      throw 'Something went wrong obtaining acces token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    await auth().signInWithCredential(facebookCredential);
  };
  return (
    <TouchableOpacity
      onPress={onFacebookButtonPress}
      className='flex-row items-center justify-center bg-blue-600 py-3 rounded-md mb-2'
    >
      <Icon name='facebook-square' size={20} color='white'/>
      <Text className='text-white text-lg ml-2'>Facebook Log-In</Text>
    </TouchableOpacity>
  )
}

export default FacebookLoginButton