import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { View, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-paper';

const LivestreamScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className='flex-1 justify-center'>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  return (
    <View className='flex-1 justify-center'>
      <Camera className='flex-1' type={type}>
        <View className='flex-1 flex-row bg-transparent m-16'>
          <TouchableOpacity className='flex-1 self-end items-center' onPress={toggleCameraType}>
            <Text className='text-2xl font-bold text-white'>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}

export default LivestreamScreen
