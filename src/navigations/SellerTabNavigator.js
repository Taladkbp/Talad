import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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

import { activeTabColor, inactiveTabColor } from '../theme/colors.js'
import HomeScreen from '../screens/HomeScreen.js'
import LivestreamScreen from '../screens/LivestreamScreen.js'
import ShopScreen from '../screens/ShopScreen.js';
import AnalyticsScreen from '../screens/AnalyticsScreen.js';


const Tab = createBottomTabNavigator()

const SellerTabNavigator = () => {
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
          }
          return iconName
        },
        tabBarActiveTintColor: activeTabColor,
        tabBarInactiveTintColor: inactiveTabColor,
      })}>
      
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name='Livestream' component={LivestreamScreen}/>
      <Tab.Screen name='Shop' component={ShopScreen}/>
      <Tab.Screen name='Analytics' component={AnalyticsScreen}/>
    </Tab.Navigator>
  )
}
export default SellerTabNavigator
