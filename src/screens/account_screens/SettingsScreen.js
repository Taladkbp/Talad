import React, { useContext } from 'react'
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../theme/colors';
import BottomSheetBackButton from '../../components/BottomSheetBackButton';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = ({ handleCloseSheet }) => {

  const navigation = useNavigation();
  const navigateToHome = () => {
    navigation.navigate('SellerApp', {
      screen: 'Home',
    })
    handleCloseSheet()
  };

  const logout = async () => {
    await auth().signOut().then(() => {
      // user has been signed out
      auth().signInAnonymously()
      .then((userCredential) => {
        console.log('User Logged out and signed in anonymously');
        Alert.alert(
          "Success",
          "You have been logged out",
          [
            { text: "OK", onPress: () => navigateToHome()}
          ]
        );
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    });
  }


  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: Colors.background}}>
      <View className='flex-row justify-between items-center mb-4' >
        <BottomSheetBackButton/>
        <Text className='text-center text-xl font-bold w-1/3'> Settings </Text>
        <View className='w-16'/>
      </View>
      <View className='flex-1 px-5 mt-2'>
        <TouchableOpacity
            className='flex-row items-center h-14 rounded-md mb-3 pl-4'
            style={{ backgroundColor: Colors.surface}}
            onPress={logout}
        >
          <Text className='text-xl text-red-700 font-bold pl-3'>Logout</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default SettingsScreen