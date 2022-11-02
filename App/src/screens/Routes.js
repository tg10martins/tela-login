import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'

import Home from './Home'
import RegisterRestaurant from './RegisterRestaurant'

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
                tabBarIcon: () => (
                    <Entypo name='home' size={30} />
                )
            }}    
        />
        <Tab.Screen 
            name="Restaurant" 
            component={RegisterRestaurant} 
            options={{
                tabBarIcon:
                 () => (
                    <Entypo name='bowl' size={30} />
                )
            }}
        />
        <Tab.Screen 
            name="Review" 
            component={Home} 
            options={{
                tabBarIcon: () => (
                    <Entypo name='fingerprint' size={30} />
                )
            }}    
        />
        <Tab.Screen 
            name="User" 
            component={Home} 
            options={{
                tabBarIcon: () => (
                    <Entypo name='user' size={30} />
                )
            }}    
        />
    </Tab.Navigator>
  )
}

export default Routes

const styles = StyleSheet.create({})