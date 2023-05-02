import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View, Platform } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  webClientId: '717021286462-jvsop9p5diouriouadledu59hint4uri.apps.googleusercontent.com',
});

const LoginScreen = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Setting Email and Password for Signup or Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView className='relative'>
      <View>
        <Text>Email:</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text>Password:</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      <Button
        title="Sign In" 
        onPress={() => onSignInButtonPress(email, password, setErrorMessage)}
      />
      <Button
        title="Facebook Sign-In"
        onPress={onFacebookButtonPress}
      />
      <Button
        title="Google Sign-In"
        onPress={onGoogleButtonPress}
      />
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

  return (
    <SafeAreaView className='relative'>
      <Text>Welcome {user.email}</Text>
      <Button
        title="Sign Out"
        onPress={() => onSignOutButtonPress().then(() => console.log('Signed Out'))}
      />
    </SafeAreaView>
  )
}

const onSignInButtonPress = (email, password, setErrorMessage) => {
  if (email.trim() === '' || password.trim() === '') {
    console.log('Please enter an email and password.');
    setErrorMessage('Please enter an email and password.');
    return;
  }

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
}

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
}

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
}

async function onAppleButtonPress() {
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
}

const onSignOutButtonPress = async () => {
  try {
    await auth().signOut();
    console.log('User signed out!');
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export default LoginScreen
