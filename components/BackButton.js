import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

const BackButton = () => {
  const navigations = useNavigation()

  return (
    <TouchableOpacity
    onPress={navigations.goBack}
    className='absolute top-5 left-3 p-2 bg-gray-100 rounded-full'
    >
      <ArrowLeftIcon height={20} width={20} color="#000000"/>
    </TouchableOpacity>
  )
}

export default BackButton