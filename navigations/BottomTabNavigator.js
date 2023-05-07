import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/HomeScreen'
import LivestreamScreen from '../screens/LivestreamScreen'
import ShopScreen from '../screens/ShopScreen'
import AnalyticsScreen from '../screens/AnalyticsScreen'
import LoginScreen from '../screens/LoginScreen'
import ProfileSetupScreen from '../screens/ProfileSetupScreen'
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen'

import { HomeIcon as HomeIconSolid,
    VideoCameraIcon as VideoCameraIconSolid,
    BuildingStorefrontIcon as BuildingStorefrontIconSolid,
    ChartBarSquareIcon as ChartBarSquareIconSolid,
  } from 'react-native-heroicons/solid'

import { HomeIcon as HomeIconOutline,
    VideoCameraIcon as VideoCameraIconOutline,
    BuildingStorefrontIcon as BuildingStorefrontIconOutline,
    ChartBarSquareIcon as ChartBarSquareIconOutline,
  } from 'react-native-heroicons/outline'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = (theme) => {
  return (
    <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? <HomeIconSolid color={color} size={size}/> : <HomeIconOutline color={color} size={size}/>;
          } else if (route.name === 'Livestream') {
            iconName = focused ? <VideoCameraIconSolid color={color} size={size}/> : <VideoCameraIconOutline color={color} size={size}/>;
          } else if (route.name === 'Shop') {
            iconName = focused ? <BuildingStorefrontIconSolid color={color} size={size}/> : <BuildingStorefrontIconOutline color={color} size={size}/>;
          } else if (route.name === 'Analytics') {
            iconName = focused ? <ChartBarSquareIconSolid color={color} size={size}/> : <ChartBarSquareIconOutline color={color} size={size}/>;
          } else if (route.name === 'Login') {
            iconName = focused ? <ChartBarSquareIconSolid color={color} size={size}/> : <ChartBarSquareIconOutline color={color} size={size}/>;
          } else if (route.name === 'PhoneVerification') {
            iconName = focused ? <ChartBarSquareIconSolid color={color} size={size}/> : <ChartBarSquareIconOutline color={color} size={size}/>;
          } else if (route.name === 'ProfileSetup') {
            iconName = focused ? <ChartBarSquareIconSolid color={color} size={size}/> : <ChartBarSquareIconOutline color={color} size={size}/>;
          } 
          
          
          return iconName
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#808080',
      })}>

      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name='Livestream' component={LivestreamScreen}/>
      <Tab.Screen name='Shop' component={ShopScreen}/>
      <Tab.Screen name='Analytics' component={AnalyticsScreen}/>
      <Tab.Screen name='Login' component={LoginScreen}/>
      <Tab.Screen name='PhoneVerification' component={PhoneVerificationScreen}/>
      <Tab.Screen name='ProfileSetup' component={ProfileSetupScreen}/>
      
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
