import React, { useContext } from 'react'
import { TouchableOpacity, Text } from 'react-native';
import BottomSheetContext from './BottomSheetContext';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

const BottomSheetBackButton = () => {
  const { openSheet, setScreenStack } = useContext(BottomSheetContext);

  const goBack = () => {
    setScreenStack(prevStack => {
      const newStack = prevStack.slice(0, prevStack.length - 1);
      openSheet(newStack[newStack.length - 1]);
      return newStack;
    });
  };

  return (
    <TouchableOpacity
    onPress={goBack}
    className='bg-gray-100 rounded-full p-2 ml-4'
    >
      <ArrowLeftIcon height={20} width={20} color="#000000"/>
    </TouchableOpacity>
  )
}

export default BottomSheetBackButton