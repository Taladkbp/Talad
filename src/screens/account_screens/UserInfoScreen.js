import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler'
import PhoneInput from 'react-native-phone-number-input'
import { CheckBadgeIcon } from 'react-native-heroicons/solid'
import { isValidPhoneNumber } from 'libphonenumber-js';
import MapView, { Marker } from 'react-native-maps';
import BackButton from '../../components/BackButton'
import { Colors } from '../../theme/colors';
import * as Location from 'expo-location';


const UserInfoScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState(null);

  const [show, setShow] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const onChangeBirthday = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setBirthday(currentDate);
    setDateSelected(true);
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  
  const checkPhoneNumberValid = (text) => {
    setPhoneNumber(text);
    const checkValid = isValidPhoneNumber(text)
    setPhoneIsValid(checkValid === true);
  };

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setAddress({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  useEffect(() => {
    setFormValid(firstName !== '' && lastName !== '' && phoneIsValid && dateSelected && address !== null)
  }, [firstName, lastName, phoneIsValid, dateSelected, address])

  const onSubmit = () => {
    if(formValid){
      console.log('Form is valid')
    } else {

    }}

  return (
    <SafeAreaView className='flex-1'>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className='flex-1'>
        <ScrollView>

          <BackButton/>
          <View className='flex-row justify-center my-10'>
            <Text className='text-3xl font-bold'> Set up your profile</Text>
          </View>
          <View className='flex-1 px-5 mt-2'>
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
            <View className='flex-row justify-center mb-4'>
              <PhoneInput
                defaultCode='LA'
                defaultValue={phoneNumber}
                onChangeFormattedText={(text) => {
                  checkPhoneNumberValid(text)
                }}
                withDarkTheme
                withShadow
              />
              <View className='mt-3 ml-1'>
                <CheckBadgeIcon
                  width={35} height={35} 
                  color={phoneIsValid ? '#6A9C78' : 'gray'}
                />
              </View>
            </View>
            <TouchableOpacity 
              className='h-10 border border-gray-300 mb-4 justify-center'
              style={{ backgroundColor: Colors.surface}}
              onPress={showDatePicker}> 
              <Text className='pl-4 text-base'>Birthday: {dateSelected ? formatDate(birthday): 'Select a date'}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID='dateTimePicker'
                value={birthday}
                mode='date'
                display='default'
                onChange={onChangeBirthday}
                maximumDate={new Date()}
              />
            )}
          </View>
          <View className='mt-2 mb-2'>
            <Text className='text-lg font-bold'>Delivery Address:</Text>
          </View>
          <View className='shadow-md rounded-lg bg-white overflow-hidden'>

            {address ? (
              <MapView
                style={{ width: '100%', height: 250 }}
                region={address}
                onRegionChangeComplete={(region) => setAddress(region)}
                zoomEnabled={true}
                zoomControlEnabled={true}
              > 
                <Marker coordinate={address}/>
              </MapView>
            ) : (
              <View className='h-60 justify-center items-center'>
                <ActivityIndicator size="large" color={Colors.primary}/>
                <Text className='pt-2'>Loading map...</Text>
              </View>
            )}
          </View>
          <Button 
            mode='contained'
            className='my-5 mx-20'
            disabled={!formValid}
            onPress={onSubmit}>
              CONFIRM
          </Button> 
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default UserInfoScreen