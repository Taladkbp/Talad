import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { View, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../theme/colors';

const LivestreamScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [recording, setRecording] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView className='flex-1 justify-center items-center'>
        <Text className='mb-4 text-center'>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </SafeAreaView>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  function toggleMicrophone() { // Add this function
    setRecording(current => !current)
  }

  return (
    <SafeAreaView className='flex-1'>
      <Camera className='flex-1' type={type}>
        <View className='flex-1 justify-end mb-7'>
          <View className='flex-row justify-center'>
            <TouchableOpacity>
              <Button 
                buttonColor={Colors.primary} 
                mode='contained'
                icon={({ color, size }) => <Ionicons name='radio' color={'#ffffff'} size={22} />}
                >
                Go Live
              </Button>
            </TouchableOpacity>
            <View className='flex-row mx-5'>
              <TouchableOpacity  onPress={toggleMicrophone} className='mx-1'>
                <Ionicons name={recording ? 'mic-off' : 'mic'} size={30} color='white'/>
              </TouchableOpacity>
              <TouchableOpacity  onPress={toggleCameraType} className='mx-1'>
                <Ionicons name='camera-reverse-outline' size={30} color='white' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
    </SafeAreaView>
  )
}

export default LivestreamScreen
