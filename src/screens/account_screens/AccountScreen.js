import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowRightOnRectangleIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';



const AccountScreen = ({ handleCloseSheet }) => {
  const size = 25
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Authentication', {
      screen: 'Login',
    });
    handleCloseSheet()
  };

  const navigateToUserInfo = () => {
    navigation.navigate('Authentication', {
      screen: 'UserInfo',
    });
    handleCloseSheet()
  };

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: Colors.background}}>
        <View className='flex-row justify-between items-center mb-4 mt-4' >
          <View className='w-16'/>
          <Text className='text-center text-xl font-bold w-1/3'> Account </Text>
          <TouchableOpacity 
              onPress={handleCloseSheet} 
              className='mr-6 justify-end items-end'>
              <Text className='text-xl font-bold'>Done</Text> 
          </TouchableOpacity>
        </View>
        <View className='flex-1 px-5 mt-5'>
          <TouchableOpacity
            className='flex-row items-center h-14 rounded-md mb-3 pl-4'
            style={{ backgroundColor: Colors.surface}}
            onPress={navigateToLogin}
          >
            <ArrowRightOnRectangleIcon size={size} color={Colors.onBackground}
            />
            <Text className='text-xl font-bold pl-3'>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='flex-row items-center h-14 rounded-md mb-3 pl-4'
            style={{ backgroundColor: Colors.surface}}
            onPress={navigateToUserInfo}
          >
            <ArrowRightOnRectangleIcon size={size} color={Colors.onBackground}
            />
            <Text className='text-xl font-bold pl-3'>Profile</Text>
          </TouchableOpacity>
        </View>
        
    </SafeAreaView>
  )
}

export default AccountScreen