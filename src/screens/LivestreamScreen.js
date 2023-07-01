import Ionicons from '@expo/vector-icons/Ionicons';
import { Audio } from 'expo-av';
import { Camera, CameraType } from 'expo-camera';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { AccessToken } from 'react-native-fbsdk-next';
import { Button, Text } from 'react-native-paper';
import { AuthContext } from '../auth/AuthProvider';
import { Colors } from '../theme/colors';
import LoginModal from './login_screens/LoginModal';

const LivestreamScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [recording, setRecording] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(AuthContext);

  const requestCameraPermission = async () => {
    console.log("Requesting camera permission...");
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log("Camera permission status:", status);
    setCameraPermission(status === 'granted');
  };

  const requestMicrophonePermission = async () => {
    // const { status } = await Audio.requestPermissionsAsync();
    // setMicrophonePermission(status === 'granted');
  };

  useEffect(() => {
    requestCameraPermission();
    requestMicrophonePermission();
  }, []);

  // Bring back the || microphonePermission === null
  if (cameraPermission === null) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!cameraPermission) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView className='flex-1 justify-center items-center'>
        <Text className='mb-4 text-center'>We need your permission to show the camera</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={requestCameraPermission}>
            Grant Camera Permission
          </Button>
        <Button
          className='mt-2'
          icon="microphone"
          mode="contained"
          onPress={requestMicrophonePermission}>
            Grant Microphone Permission
        </Button>
      </SafeAreaView>
    );
  }

  const startLiveStream = async () => {
    let data;

    if (!user || !user.providerData.some(provider => provider.providerId === 'facebook.com')) {
      setModalVisible(true)
    } else {
      data = await AccessToken.getCurrentAccessToken();
      console.log(data)
    }
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  const toggleMicrophone = () => { // Add this function
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
                onPress={startLiveStream}
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
      <LoginModal visible={modalVisible} setVisible={setModalVisible}/>
    </SafeAreaView>
  )
}

export default LivestreamScreen
