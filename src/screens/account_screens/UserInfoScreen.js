import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import BackButton from '../../components/BackButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../../theme/colors'
import MapView from 'react-native-maps'


const UserInfoScreen = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState(null);

  const showDatePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  // useEffect(() => {
  //   (async () => {
      
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setAddress(address);
  //   })();
  // }, []);


  return (
    <SafeAreaView className='flex-1'>
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
          <Text className='pl-4 text-base'>Birthday: {formatDate(date)}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode='date'
            display='default'
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}
        <MapView
          style={{ width: '100%', height: 250 }}
          region={address}
          onRegionChangeComplete={setAddress}
          zoomEnabled={true}
          zoomControlEnabled={true}
        >
        </MapView>
      </View>
    </SafeAreaView>
  )
}

export default UserInfoScreen