import React from 'react'
import { LoginManager } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { Colors } from '../theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

const LogoutButton = () => {
  const handleLogout = async () => {
    await auth().signOut();
    LoginManager.logOut();
  }
  return (
    <TouchableOpacity
    className='flex-row items-center h-14 rounded-md mb-3 pl-4'
    style={{ backgroundColor: Colors.surface}}
    onPress={handleLogout}
    >
      <Text className='text-xl font-bold pl-3'>Log Out</Text>
    </TouchableOpacity>
  )
}

export default LogoutButton