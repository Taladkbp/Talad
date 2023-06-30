import React from 'react'
import { Modal, Text } from 'react-native-paper'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { Colors } from '../../theme/colors'
import FacebookLoginButton from '../../components/FacebookLoginButton'


const LoginModal = ({visible, setVisible}) => {

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View className='flex-1 justify-center items-center px-4 bg-gray-500 bg-opacity-50'>
        <View className='relative bg-white rounded-lg p-6 w-full h-56'>
          <View className='absolute top-3 right-3'>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <XCircleIcon size={30} color={Colors.primary}/>
              </TouchableOpacity>
            </View>
            <View className='mt-4'>
              <Text className='text-center text-2xl font-bold my-2'>Login Required</Text>
              <Text className='text-center mb-4'>Please login to continue</Text>
              <FacebookLoginButton/>
            </View>
          </View>
      </View>
    </Modal>
  )
}

export default LoginModal