import React from 'react'
import { SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'
import { LoginManager } from 'react-native-fbsdk-next'
import { Button } from 'react-native-paper'

const AnalyticsScreen = () => {
  const onFacebookButtonPress = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log("Login success with permissions: " + result.grantedPermissions.toString());
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  return (
    <SafeAreaView className='relative'>
        <View>
            <Text>AnalyticsScreen</Text>
            <Button className='text-lg' onPress={onFacebookButtonPress}>Facebook Login</Button>
        </View>
    </SafeAreaView>
  );
}

export default AnalyticsScreen
