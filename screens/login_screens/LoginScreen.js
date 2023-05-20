import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';

GoogleSignin.configure({
  webClientId: '717021286462-jvsop9p5diouriouadledu59hint4uri.apps.googleusercontent.com',
});

const LoginScreen = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Setting Email and Password for Signup or Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      if (user.phoneNumber) {
        alert(`You have successfully logged in with your phone number: ${user.phoneNumber}`);
      } else {
        alert('You have successfully logged in!');
      }
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  if (!user || !user.phoneNumber) {
    return (
      <SafeAreaView className='flex-1 justify-center px-5'>
      <BackButton/>
      <View>
        <Text>Email:</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          className='border border-gray-300 p-2 rounded-md'
        />
        <Text>Password:</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
          className='border border-gray-300 p-2 rounded-md my-4'
        />
      </View>
      <TouchableOpacity
        onPress={() => onSignInButtonPress(email, password, setErrorMessage)}
        className='flex-row items-center justify-center bg-blue-500 py-3 rounded-md mb-4'
      >
        <Text className='text-white text-lg'>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onFacebookButtonPress}
        className='flex-row items-center justify-center bg-blue-600 py-3 rounded-md mb-2'
      >
        <Icon name='facebook-square' size={20} color='white'/>
        <Text className='text-white text-lg ml-2'>Facebook Log-In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onGoogleButtonPress}
        className='flex-row items-center justify-center bg-red-500 py-3 rounded-md mb-2'
      >
        <Icon name="google" size={20} color="white" />
        <Text className='text-white text-lg ml-2'>Google Log-In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='flex-row items-center justify-center bg-violet-600 py-3 rounded-md mb-4'
      >
        <Icon name="envelope" size={20} color="white" />
        <Text className='text-white text-lg ml-2'>Email Sign Up</Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160, // You must specify a width
            height: 45, // You must specify a height
          }}
          onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
        />
      )}
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
    </SafeAreaView>

    );
  }
}

const onSignInButtonPress = (email, password, setErrorMessage) => {
  if (email.trim() === '' || password.trim() === '') {
    console.log('Please enter an email and password.');
    setErrorMessage('Please enter an email and password.');
    return;
  };

  auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      setErrorMessage('Email address is already in use!')
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      setErrorMessage('Email address is invalid!')
    }

    console.error(error);
  });
};

const onFacebookButtonPress = async () => {
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
  console.log('Signed in with Facebook!')
};

const onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
  console.log('Signed in with Facebook!')
};

const onAppleButtonPress = async () => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
};

const signInWithPhoneNumber = async (phoneNumber, setConfirm) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('Confirmation:', confirmation);
    setConfirm(confirmation);
  } catch (error) {
    console.error('Error during phone number sign-in:', error);
  }
};

const confirmCode = async (code, confirm) => {
  try {
    if (confirm) {
      await confirm.confirm(code);
      console.log('Phone number successfully verified');
    } else {
      console.log('No confirmation object to confirm the code');
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

const onSignOutButtonPress = async () => {
    await auth().signOut();
    console.log('User signed out!');
};

export default LoginScreen
