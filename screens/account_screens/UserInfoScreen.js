import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../src/theme/colors'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import BackButton from '../../components/BackButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'


const UserInfoScreen = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState('');

  const showDatePicker = () => {
    setShow(true);
  };

  const onChangeDate = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
    setShow(false)
  };

  const formatDate = (date) => {
    if (!date) {
      return 'None';
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  useEffect(() => {
    (async () => {
      /* @hide */
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      /* @end */
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

    })();
  }, []);

  
  return (
    <SafeAreaView className='flex-1'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className='flex-1'
      >
        <ScrollView>
          <BackButton/>
          <View className='flex-row justify-center my-10'>
            <Text className='text-3xl font-bold'> Set up your profile</Text>
          </View>
          <View className='flex-1 px-5 mt-5'>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              className='h-10 border border-gray-300 mb-4'
              style={{ backgroundColor: Colors.surface}}
              placeholder='First Name'
              placeholderTextColor={Colors.onPlaceholder}
            />
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              className='h-10 border border-gray-300 mb-4'
              style={{ backgroundColor: Colors.surface}}
              placeholder='Last Name'
              placeholderTextColor={Colors.onPlaceholder}
            />
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              className='h-10 border border-gray-300 mb-4'
              style={{ backgroundColor: Colors.surface}}
              placeholder='Phone Number'
              placeholderTextColor={Colors.onPlaceholder}
            />
            <TouchableOpacity 
              className='h-10 border border-gray-300 mb-4 justify-center'
              style={{ backgroundColor: Colors.surface}}
              onPress={showDatePicker}> 
              <Text className='pl-4 text-base'>Birthday: {date ? formatDate(date): 'Please enter your birthday'}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID='dateTimePicker'
                value={date || new Date()}
                mode='date'
                display='default'
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
          </View>
          <View className='flex-1'>
            <View className='mt-2 mb-2'>
              <Text className='text-lg font-bold'>Delivery Address:</Text>
            </View>
            <View className='shadow-md rounded-lg bg-white overflow-hidden'>
                {location ? (
                  <MapView
                    style={{ width: '100%', height: 250 }}
                    region={location}
                    onRegionChangeComplete={setLocation}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                  > 
                    <Marker coordinate={location}/>
                  </MapView>
                ) : (
                  <View className='h-60 justify-center items-center'>
                    <ActivityIndicator size="large" color={Colors.primary}/>
                    <Text className='pt-3'>Loading map...</Text>
                  </View>
                )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default UserInfoScreen