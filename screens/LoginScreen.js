import React from 'react'
import { SafeAreaView, Button } from 'react-native'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '717021286462-jvsop9p5diouriouadledu59hint4uri.apps.googleusercontent.com',
});

const LoginScreen = () => {
  return (
    <SafeAreaView className='relative'>
      <Button
        title="Facebook Sign-In"
        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
      />
      <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      />
    </SafeAreaView>
  )
}

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default LoginScreen
