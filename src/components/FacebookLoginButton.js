import React from 'react'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'
import auth from '@react-native-firebase/auth';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const FacebookLoginButton = () => {
  const navigation = useNavigation();

  const onFacebookButtonPress = async () => {
    try{
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'publish_video',
                                                              'pages_manage_posts', 'pages_read_engagement']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining acces token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      await auth().signInWithCredential(facebookCredential);

      navigation.navigate('SellerApp', {
        screen: 'Home',
      });

      Alert.alert('Success', 'Logged in with Facebook!')
    } catch (error) {
      console.log(error);
    }
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