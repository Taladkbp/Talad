import React from 'react'
import { Modal, Text } from 'react-native-paper'
import { View } from 'react-native'


const LoginModal = ({visible, setVisible}) => {

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View className='flex-1 justify-center items-center'>
        <Text> Testing</Text>
      </View>
    </Modal>
  )
}

export default LoginModal