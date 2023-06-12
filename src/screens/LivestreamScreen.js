import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native-paper';

const LivestreamScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View/>
  }

  if (hasPermission === false) {
    return <Text>Please give access to Camera</Text>
  }

  return (
    <SafeAreaView className='flex-1'>
      <Camera className='flex-1' type={type}/>
    </SafeAreaView>
  )
}

export default LivestreamScreen
